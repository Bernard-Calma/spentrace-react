import { useEffect, useState } from "react";
import Bill from "../../Components/Bill";
import Categories from "./Categories";
import NavBar from "../../Components/NavBar";
import Show from "../show/Show";
import "./Main.css"

const Main = (props) => {

    const [bills, setBills] = useState([])
    let [totalIncome, setTotalIncome] = useState(0);
    let [totalExpense, setTotalExpense] = useState(0);
 
    const getBills = () => {
        console.log("GetBills")
        fetch("http://localhost:8000/plans/" + props.user._id, {
            credentials: "include",
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000"
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            // console.log("setBills", totalIncome)
            var runningTarget = 0;
            var total = 0;
            for (var bill of data) {
                if (bill.amount < 0) bill.amount = Math.abs(bill.amount) // added due to -$500 entry
                if (bill.expense === true) {
                    setTotalExpense(totalExpense += bill.amount)
                    runningTarget += bill.amount;
                    total -= Math.abs(bill.amount); // added due to -$500 entry
                } else if (bill.expense === false) {
                    setTotalIncome(totalIncome += bill.amount)
                    runningTarget -= bill.amount;
                    total += bill.amount;
                } 
                // console.log(bill.amount)
                if (runningTarget < 0) {
                    bill.target = 0;
                } else {
                    bill.target = runningTarget;
                }
                bill.runningTotal = total;
                
            }
            setBills(data)
            
        })
        
    }

    useEffect(()=>{
        getBills()
        
    }, [])

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
                            handleView = {props.handleView}
                        />
                    )
                }
            </div>
        </main>
    )
}

export default Main;