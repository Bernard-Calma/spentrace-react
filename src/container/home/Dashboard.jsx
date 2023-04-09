import { useEffect, useState } from "react";

import CircleGraph from "../../Components/CircleGraph";

const DashBoard = (props) => {
    // VARIABLES
    const [balance, setBalance] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)
    const [nextTarget, setNextTarget] = useState({
        amount: 0,
        date: '',
        name: ''
    })
    // ------------------------------ END OF VARIABLES ------------------------------

    // FUNCTIONS
    const getBalance = () =>{ 
        let runningBalance = 0
        let totalIncome = 0
        let totalExpense = 0
        for (const plan of props.plans) {
            if (plan.expense) {
                runningBalance -= plan.amount
                totalExpense += plan.amount
            } else {
                runningBalance += plan.amount
                totalIncome += plan.amount
            }
        }
        setBalance(runningBalance)
        setTotalIncome(totalIncome)
        setTotalExpense(totalExpense)
    }

    const getTarget = () => {
        let balance = 0
        let nextTarget = {
            amount: 0,
            date: ""
        }
        for (const plan of props.plans) {
            plan.expense ? balance -= plan.amount :  balance += plan.amount
            if (balance < 0) {
                nextTarget.amount = balance;
                nextTarget.name = plan.name
                nextTarget.date = plan.date
                setNextTarget(nextTarget)
                return
            }
        }
    }
    // ------------------------------ END OF FUNCTIONS ------------------------------

    useEffect(() => {
        getBalance()
        getTarget()
    },[props.plans])
    return  <div className='dashboard'>
        <div className='containerPlansDashboard'>
            <div className='graphSubTitle'>
                <h2>Expense</h2>
                <h2>${totalExpense.toFixed(2)}</h2>
            </div>       
            {/* PLAN GRAPH */}
            <CircleGraph
                data = {[totalExpense, totalIncome]}
                colors = {['red', 'green']}
                width = {250}
                height = {250}
                value = {balance}
            />
            <div className='graphSubTitle'>
                <h2>Income</h2>
                <h2>${totalIncome.toFixed(2)}</h2>
            </div>
            {
                // Show add if balance is positive
                nextTarget.amount === 0
                ?<div className="containerEmptyPlan">
                    <h2>Add an expense</h2>
                    <i className="fi fi-rr-add addEmptyDashboard" onClick={() => props.handleChangeView("Add Plan")}></i>
                </div>
                :<div className='containerNextTarget'>
                    <h2 className='nextTarget'>Next Target: ${Math.abs(nextTarget.amount).toFixed(2)}</h2>
                    <h2 className='nextTarget'>{nextTarget.name} - {new Date(nextTarget.date).toUTCString().slice(0, 11)}</h2>
                </div>
            }
            
        </div> 
        <h1 className='dashboardBillMonth'>{new Date().toLocaleString('en-us',{month: "long"})}</h1>
        {/* TODO: ADD FUNCTION TO SWITCH MONTHS */}
        <div className='cotnainerBillsDashboard'>
            <div className='graphSubTitle'>
                <h2>Paid</h2>
                <h2>${props.totalBillsPaid}</h2>
            </div>    
            <CircleGraph 
                data = {[props.totalBillsUnpaid, props.totalBillsPaid]}
                colors = {['red', 'green']}  
                width = {250}
                height = {250}
                value = {props.totalBillsUnpaid - props.totalBillsPaid}
            />
            <div className='graphSubTitle'>
                <h2>Unpaid</h2>
                <h2>${props.totalBillsUnpaid}</h2>
            </div>
            <div className='containerNextTarget'>
                <h2 className='nextTarget'>Next Bill: ${Math.abs(props.nextUnpaidBill?.amount).toFixed(2)}</h2>
                <h2 className='nextTarget'>{props.nextUnpaidBill?.name} - {new Date(props.nextUnpaidBill?.dueDate).toUTCString().slice(0, 11)}</h2>
            </div>
        </div>               
    </div>
}

export default DashBoard;