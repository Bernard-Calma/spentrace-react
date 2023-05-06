import { useEffect, useState } from "react";

import Plan from "./Plan";
import AddPlan from "../add/AddPlan";
import EditPlan from "../edit/EditPlan";
import ShowPlan from "../show/ShowPlan";
import Categories from "./Categories";
import "./PlansList.css"
import Icon from "../../common/Icon";

const PlanList = (props) => {
    const [openPlan, setOpenPlan] = useState({});
    let [planView, setPlanView] = useState("Plan List");
    let [totalIncome, setTotalIncome] = useState(0);
    let [totalExpense, setTotalExpense] = useState(0);

    const getRunningBalanceTarget = () => {
        /**
         * Compute for running balance and target
         * from plan parameter from plans array
         */
        // Set variables back to 0 to prevent adding values from previous computation
        let runningTarget = 0;
        let total = 0;
        props.plans.forEach( plan => {
          if (plan.expense === true) {
              setTotalExpense(totalExpense += plan.amount);
              runningTarget += plan.amount;
              total -= plan.amount;
          } else if (plan.expense === false) {
              setTotalIncome(totalIncome += plan.amount);
              runningTarget -= plan.amount;
              total += plan.amount;
          };
          if (runningTarget < 0) {
              plan.target = 0;
          } else {
              plan.target = runningTarget;
          }
          plan.runningTotal = total;  
        });
      };

    const handleChangeView = view => setPlanView(view);
    
    const handleShowPlan = plan => {
        setOpenPlan(plan);
        handleChangeView("Show Plan");
    }

    useEffect(()=>{
        getRunningBalanceTarget();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.plans]);

    return (
        <> 
            {planView === "Plan List"
                ?<section className='containerPlanList'>
                    <Categories 
                        mobileCategories={["date", "name", "amount", "running total"]}
                        fullCategories={["type"]}
                    />
                    <div className="plansContainer">
                        {props.plans?.map((plan, index) => 
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
                        <Icon className="fi fi-rr-add" onClick={() =>handleChangeView("Add Plan")}/>
                    </div>
                </section>
            : planView === "Add Plan"
                ? <AddPlan
                    user = {props.user}
                    server = {props.server}
                    addNewPlan = {props.modifyPlans.add}
                    handleChangeView = {() =>handleChangeView("Plan List")}
                />
            : planView === "Show Plan"
                ? <ShowPlan 
                    plan = {openPlan}
                    server = {props.server}
                    deletePlan = {props.modifyPlans.delete}
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