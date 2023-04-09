import { useEffect, useState } from "react";

import Plan from "../../Components/Plan";
import AddPlan from "../add/AddPlan";
import ShowPlan from "../show/ShowPlan";
import Categories from "./Categories";
import "./PlansList.css"

const PlanList = (props) => {
    const [plans, setPlans] = useState(props.plans)
    let [planView, setPlanView] = useState("Plan List")
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
        let updatePlans = props.plans
        props.plans.forEach( plan => {
          if (plan.expense === true) {
              setTotalExpense(totalExpense += plan.amount)
              runningTarget += plan.amount;
              total -= plan.amount;
          } else if (plan.expense === false) {
              setTotalIncome(totalIncome += plan.amount)
              runningTarget -= plan.amount;
              total += plan.amount;
          } 
          if (runningTarget < 0) {
              plan.target = 0;
          } else {
              plan.target = runningTarget;
          }
          plan.runningTotal = total;  
        })
        setPlans(updatePlans.sort((a, b) => (a.date > b.date) ? 1 : -1))
      }

      const addNewPlan = (newPlan) => {
        setPlans([...plans, newPlan].sort((a, b) => (a.date > b.date) ? 1 : -1))
    }
    
    const handleChangeView = (view) => {
        setPlanView(view)
    }

    useEffect(()=>{
        getRunningBalanceTarget()
    },[plans])

    return <> {
        planView === "Plan List"
        ?<div className='containerPlanList'>
            <Categories />
            <div className="plansContainer">
                {
                    plans?.map((plan, index) => 
                        <Plan 
                        key={index}
                        index={index}
                        plan={plan}
                        totalIncome = {totalIncome}
                        totalExpense = {totalExpense}
                        handleChangeView = {() => handleChangeView("Plan List")}
                        handleShowPlan = {() => handleChangeView(index)}
                    />)
                }
                <div className="containerAdd"style={{
                    textAlign: "center"
                }}>
                    <i className="fi fi-rr-add" onClick={() =>handleChangeView("Add Plan")}></i>
                </div>
            </div>
        </div>
        : planView === "Plan List"
        ?<AddPlan
            user = {props.user}
            server = {props.server}
            addNewPlan = {addNewPlan}
            handleChangeView = {() =>handleChangeView("Plan List")}
        />
        :<>
            <ShowPlan 
                plan = {plans[planView]}
                return = {() => handleChangeView("Plan List")}
            />
        </>
    } </>
}
export default PlanList;