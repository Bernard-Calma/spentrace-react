import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPlans } from "../../features/planSlice";

import Plan from "./Plan";
import AddPlan from "../add/AddPlan";
import EditPlan from "../edit/EditPlan";
import ShowPlan from "../show/ShowPlan";
import Categories from "../../common/Categories";
import "./PlansList.css"
import Icon from "../../common/Icon";
import { changeView } from "../../features/viewSlice";





const PlanList = (props) => {
    const dispatch = useDispatch();
    const {
        planItems,
        totalIncome,
        totalExpense
    } = useSelector(store => store.plan)
    const {
        planView
    } = useSelector(store => store.view)
    const [openPlan, setOpenPlan] = useState({});
    // let [planView, setPlanView] = useState("Plan List");

    const handleChangeView = view => dispatch(changeView({planView: view}));
    
    const handleShowPlan = plan => {
        setOpenPlan(plan);
        handleChangeView("Show Plan");
    }

    useEffect(()=>{
        dispatch(getPlans())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <> 
            {planView === "Plan List"
                ?<section className='containerPlanList'>
                    <Categories 
                        mobileCategories={["date", "name", "amount", "running total"]}
                        fullCategories={["type"]}
                    />
                    <div className="plansContainer">
                        {planItems?.map((plan, index) => 
                            <Plan 
                                key={index}
                                index={index}
                                plan={plan}
                                totalIncome = {totalIncome}
                                totalExpense = {totalExpense}
                                handleChangeView = {() => handleChangeView("Plan List")}
                                handleShowPlan = {() => handleShowPlan(plan)}
                            />
                        )}
                    </div>
                    <div className="containerAdd" style={{textAlign: "center"}}>
                        <Icon className="fi fi-rr-add" onClick={() => dispatch(changeView({planView: "Add Plan"}))}/>
                    </div>
                </section>
            : planView === "Add Plan"
                ? <AddPlan
                    user = {props.user}
                    server = {props.server} 
                    handleChangeView = {() =>handleChangeView("Plan List")}
                />
            : planView === "Show Plan"
                ? <ShowPlan 
                    plan = {openPlan}
                    server = {props.server}
                    return = {() => handleChangeView("Plan List")}
                    edit = {() => handleChangeView("Edit Plan")}
                />
            : planView === "Edit Plan"
                ? <EditPlan
                    plan = {openPlan}
                    server = {props.server}
                    updatePlan = {props.modifyPlans.update}
                    return = {() => handleChangeView("Plan List")}
                />
            : <></>
            } 
        </>
    );
};
export default PlanList;