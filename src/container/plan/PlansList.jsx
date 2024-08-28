import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPlans } from "../../features/planSlice";
import { changeView } from "../../features/viewSlice";

import Plan from "./Plan";
import AddPlan from "../add/AddPlan";
import EditPlan from "../edit/EditPlan";
import ShowPlan from "../show/ShowPlan";
import Categories from "../../common/Categories";
import Icon from "../../common/Icon";

import "./PlansList.css"

const PlanList = () => {
    const dispatch = useDispatch();
    const {
        planItems,
        totalIncome,
        totalExpense
    } = useSelector(store => store.plan)
    const {
        planView
    } = useSelector(store => store.view)

    // useEffect(()=>{
    //     dispatch(getPlans())
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[planView]);

    return <> 
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
                        />
                    )}
                </div>
                <div className="containerAdd" style={{textAlign: "center"}}>
                    <Icon className="fi fi-rr-add" onClick={() => dispatch(changeView({planView: "Add Plan"}))}/>
                </div>
            </section>
            : planView === "Add Plan" ? <AddPlan/>
            : planView === "Show Plan" ? <ShowPlan/>
            : planView === "Edit Plan" ? <EditPlan/>
            : <></>
        } 
    </>
};
export default PlanList;