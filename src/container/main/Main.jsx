import { useEffect, useState } from "react";
import Bill from "../../Components/Bill";
import NavBar from "../../Components/NavBar";
import "./Main.css"

const Main = (props) => {

    const [bills, setBills] = useState([])
    let [totalIncome, setTotalIncome] = useState(0);
    let [totalExpense, setTotalExpense] = useState(0);


    const getBills = () => {
        console.log("GetBills")
        fetch("http://192.168.1.80:8000/plans")
        .then((res) => res.json())
        .then((data) => {
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
            <div className='categoriesContainer'>
                <div className='listContainer'><h2>Date</h2></div>
                <div className='listContainer'><h2>Name</h2></div>
                <div className='listContainer'><h2>Amount</h2></div>
                <div className='listContainer'><h2>Type</h2></div>
                <div className='listContainer'><h2>Running Total</h2></div>
                <div className='listContainer'><h2>Target</h2></div>
            </div>
            {
                bills.map((bill, index) =>
                    <Bill 
                        key={index}
                        index={index}
                        bill={bill}
                        totalIncome = {totalIncome}
                        totalExpense = {totalExpense}
                    />
                )
            }
        </main>
    )
}

export default Main;