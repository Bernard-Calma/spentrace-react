import { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import Plan from "../../Components/Plan";
import Categories from "./Categories";
import "./PlansList.css"

const PlanList = (props) => {
    const [plans, setPlans] = useState(props.plans.sort((a, b) => (a.date > b.date) ? 1 : -1))
    let [totalIncome, setTotalIncome] = useState(0);
    let [totalExpense, setTotalExpense] = useState(0);
    let runningTarget = 0;
    let total = 0;

    const getRunningBalanceTarget = () => {
        /**
         * Compute for running balance and target
         * from plan parameter from plans array
         */
        // Set variables back to 0 to prevent adding values from previous computation
        runningTarget = 0;
        total = 0;
        let updatePlans = props.plans
        updatePlans.forEach( plan => {
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
        setPlans(updatePlans)
      }

    useEffect(()=>{
        getRunningBalanceTarget()
    },[props.plans])
    return(
        <main className='mainContainer'>
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
                        handleChangeView = {props.handleChangeView}
                        handleShowPlan = {props.handleShowPlan}
                    />)
                }
                <div className="containerAdd"style={{
                    textAlign: "center"
                }}>
                    <i className="fi fi-rr-add" onClick={props.handleChangeView}></i>
                </div>
            </div>
        </main>
    )
}

export default PlanList;