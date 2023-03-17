import { useEffect, useState } from "react";
import Bill from "../../Components/Bill";
import Categories from "./Categories";
import "./main.css"

const Main = (props) => {

    const [bills, setBills] = useState([])
    let [totalIncome, setTotalIncome] = useState(0);
    let [totalExpense, setTotalExpense] = useState(0);
    let runningTarget = 0;
    let total = 0;
 
    const getBills = () => {
        fetch(process.env.REACT_APP_SERVER_URL+"/plans/" + props.user._id)
        .then(res => res.json())
        .then(data => {
            // Set variables back to 0 to prevent adding values from previous computation
            runningTarget = 0;
            total = 0;
            for (var bill of data) {
                getRunningBalanceTarget(bill)
            }
            setBills(data)  
        })
    }

    const getRunningBalanceTarget = (bill) => {
        /**
         * Compute for running balance and target
         * from bill parameter from bills array
         */
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

    const updateBills = (newBill) => {
        /**
         * This function udpates state
         * instead of doing an API call
         * to provide better performance
         * 
         * Return newBill if id matches inside current bills array.
         */
        let newBillsList = bills.map((bill)=> bill.id === newBill.id ? newBill : bill)
        setBills(newBillsList);
    }

    useEffect(()=>{
        getBills()       
    },[])

    return(
        <main className='mainContainer'>
            <Categories />
            <div className="billsContainer">
                {
                    bills.map((bill, index) =>
                        <Bill 
                            key={index}
                            index={index}
                            bill={bill}
                            totalIncome = {totalIncome}
                            totalExpense = {totalExpense}
                            handleChangeView = {props.handleChangeView}
                            handleShowBill = {props.handleShowBill}
                        />
                    )
                }
            </div>
        </main>
    )
}

export default Main;