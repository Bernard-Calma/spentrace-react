import { useEffect, useState } from "react";

import Plan from "../../Components/Plan";
import AddPlan from "../add/AddPlan";
import EditPlan from "../edit/EditPlan";
import ShowPlan from "../show/ShowPlan";
import Categories from "./Categories";
import "./PlansList.css"

const PlanList = (props) => {
    const [plans, setPlans] = useState([...props.plans])
    const [openPlan, setOpenPlan] = useState({})
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
        let updatePlans = plans
        plans.forEach( plan => {
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

    const addNewPlan = newPlan => setPlans([...plans, newPlan].sort((a, b) => (a.date > b.date) ? 1 : -1))
    const updatePlan = updatedPlan => setPlans(plans.map(plan => plan._id === updatedPlan._id ? updatedPlan : plan))
    const deletePlan = targetPlan => setPlans(plans.filter(plan => targetPlan._id !== plan._id))

    const handleChangeView = view => setPlanView(view)
    
    const handleShowPlan = (plan) => {
        setOpenPlan(plan)
        handleChangeView("Show Plan")
    }

    useEffect(()=>{
        getRunningBalanceTarget()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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
                            handleShowPlan = {() => handleShowPlan(plan)}
                        />)
                }
                <div className="containerAdd"style={{
                    textAlign: "center"
                }}>
                    <i className="fi fi-rr-add" onClick={() =>handleChangeView("Add Plan")}></i>
                </div>
            </div>
        </div>
        : planView === "Add Plan"
        ?<AddPlan
            user = {props.user}
            server = {props.server}
            addNewPlan = {addNewPlan}
            handleChangeView = {() =>handleChangeView("Plan List")}
        />
        : planView === "Show Plan"
        ?<ShowPlan 
            plan = {openPlan}
            server = {props.server}
            deletePlan = {props.modifyPlans.delete}
            return = {() => handleChangeView("Plan List")}
            edit = {() => handleChangeView("Edit Plan")}
        />
        : planView === "Edit Plan"
        ?<EditPlan
            plan = {openPlan}
            server = {props.server}
            updatePlan = {updatePlan}
            return = {() => handleChangeView("Plan List")}
        />
        : <> </>
    } </>
}
export default PlanList;