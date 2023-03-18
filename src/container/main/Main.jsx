import { useEffect, useState } from "react";
import Bill from "../../Components/Bill";
import Categories from "./Categories";
import "./main.css"

const Main = (props) => {
    const [bills, setBills] = useState(props.bills.sort((a, b) => (a.date > b.date) ? 1 : -1))
    let [totalIncome, setTotalIncome] = useState(0);
    let [totalExpense, setTotalExpense] = useState(0);
    let runningTarget = 0;
    let total = 0;

    const getRunningBalanceTarget = () => {
        /**
         * Compute for running balance and target
         * from bill parameter from bills array
         */
        // Set variables back to 0 to prevent adding values from previous computation
        runningTarget = 0;
        total = 0;
        let updateBills = props.bills
        for (var bill of updateBills) {
          if (bill.expense === true) {
              setTotalExpense(totalExpense += bill.amount)
              runningTarget += bill.amount;
              total -= bill.amount;
          } else if (bill.expense === false) {
              setTotalIncome(totalIncome += bill.amount)
              runningTarget -= bill.amount;
              total += bill.amount;
          } 
          if (runningTarget < 0) {
              bill.target = 0;
          } else {
              bill.target = runningTarget;
          }
          bill.runningTotal = total;  
        }
        console.log("Update Bills:", updateBills)
        setBills(updateBills)
      }

    useEffect(()=>{
        getRunningBalanceTarget()
    },[props.bills])
    return(
        <main className='mainContainer'>
            <Categories />
            <div className="billsContainer">
                {
                    bills?.map((bill, index) => 
                        <Bill 
                        key={index}
                        index={index}
                        bill={bill}
                        totalIncome = {totalIncome}
                        totalExpense = {totalExpense}
                        handleChangeView = {props.handleChangeView}
                        handleShowBill = {props.handleShowBill}
                    />)
                }
            </div>
        </main>
    )
}

export default Main;