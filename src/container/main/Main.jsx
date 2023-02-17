import { useEffect, useState } from "react";
import Bill from "../../Components/Bill";
import NavBar from "../../Components/NavBar";
import "./Main.css"

const Main = (props) => {

    const [bills, setBills] = useState([])
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    const getBills = () => {
        console.log("GetBills")
        fetch("http://localhost:8000/plans")
        .then((res) => res.json())
        .then((data) => {
            console.log("setBills")
            setBills(data)
        })
    }

    const getTotalIncome = () => {
        console.log("Get Total Incom")
        var totalIncome = 0
        for (var bill of bills) {
            if (!bill.expense) {
                totalIncome += bill.amount;
            }
        }
        setTotalIncome(totalIncome);
        console.log("Total Income: ", totalIncome)
    }

    const getTotalExpense = () => {
        var totalExpense = 0
        for (var bill of bills) {
            if (bill.expense) {
                totalExpense += bill.amount;
            }
        }
        setTotalExpense(totalExpense);
        console.log("Total Expense: ", totalExpense)
    }

    const getRunningTotal = (bill) => {

    }

    useEffect(()=>{
        getBills();
        getTotalIncome();
        getTotalExpense();
    }, [])
    return(
        <main className='mainContainer'>
            <NavBar 
                setView = {props.setView}
            />
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
                    />
                )
            }
        </main>
    )
}

export default Main;