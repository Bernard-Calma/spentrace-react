import { useEffect, useState } from "react";

import CircleGraph from "../../Components/CircleGraph";

const DashBoard = (props) => {
    // VARIABLES
    // Plans
    const [balance, setBalance] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)
    const [nextTarget, setNextTarget] = useState({
        amount: 0,
        date: '',
        name: ''
    })
    // Bills
    const [totalBillsPaid, setTotalBillsPaid] = useState(0)
    const [totalBillsUnpaid, setTotalBillsUnpaid] = useState(0)
    const [nextUnpaidBill , setNextUnpaidBill] = useState({})
    // ------------------------------ END OF VARIABLES ------------------------------

    // FUNCTIONS
    // Plans
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
        props.plans.forEach( plan => {
            plan.expense ? balance -= plan.amount :  balance += plan.amount
            if (balance < 0) {
                nextTarget.amount = balance;
                nextTarget.name = plan.name
                nextTarget.date = plan.date
                setNextTarget(nextTarget)
                return
            }
        })
    }
    // Bills
    const getBillsPaid = () => {
        // Get paid and unpaid graph
        let totalPaid = 0;
        let totalUnpaid = 0;
        const currentMonth = new Date().getMonth()
        props.bills.forEach(bill => {
            let billMonth = new Date(bill.dueDate).getMonth()
            if (billMonth === currentMonth) {
                bill.paid ? totalPaid += bill.amount   : totalUnpaid += bill.amount
                setTotalBillsPaid(totalPaid)
                setTotalBillsUnpaid(totalUnpaid)
            }

        })
    }

    const getNextUpaidBill = () => {
        let unpaidBill = props.bills[0]
        const currentMonth = new Date().getMonth()
        props.bills.forEach(bill => {
            let billMonth = new Date(bill.dueDate).getMonth()
            if (billMonth === currentMonth) {
                if(!bill.paid && billMonth === currentMonth) return unpaidBill = bill
            }
        })
        setNextUnpaidBill(unpaidBill)
    }
    // ------------------------------ END OF FUNCTIONS ------------------------------

    useEffect(() => {
        getBalance()
        getTarget()
        getBillsPaid()
        getNextUpaidBill()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.plans])
    return  <div className='dashboard'>
        <h1 className='dashboardBillMonth'>{new Date().toLocaleString('en-us',{month: "long"})} Budget</h1>
        <div className='containerDashboard'>
            <div className="dashboardGraph">
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
        {
            props.bills.length === 0
            ?<div className="containerEmptyPlan">
                    <h2>ADD YOUR FIRST BILL</h2>
                    <i className="fi fi-rr-add addEmptyDashboard" onClick={() => props.changeHomeView("Bills List")}></i>
            </div>
            :<>
                <h1 className='dashboardBillMonth'>{new Date().toLocaleString('en-us',{month: "long"})} Bills</h1>
                <div className='containerDashboard'>
                    <div className="dashboardGraph">
                        <div className='graphSubTitle'>
                            <h2>Paid</h2>
                            <h2>${totalBillsPaid}</h2>
                        </div>    
                        <CircleGraph 
                            data = {[totalBillsUnpaid, totalBillsPaid]}
                            colors = {['red', 'green']}  
                            width = {250}
                            height = {250}
                            value = {totalBillsUnpaid - totalBillsPaid}
                        />
                        <div className='graphSubTitle'>
                            <h2>Unpaid</h2>
                            <h2>${totalBillsUnpaid}</h2>
                        </div>
                    </div>

                    {
                        totalBillsUnpaid === 0 
                        ?<div className='containerNextTarget'>
                            <h2 className='nextTarget'>All Bills are paid this month.</h2>
                        </div>
                        :<div className='containerNextTarget'>
                            <h2 className='nextTarget'>Next Bill: ${Math.abs(nextUnpaidBill?.amount).toFixed(2)}</h2>
                            <h2 className='nextTarget'>{nextUnpaidBill?.name} - {new Date(nextUnpaidBill?.dueDate).toUTCString().slice(0, 11)}</h2>
                        </div>
                    }
                </div>              
            </>
        } 
    </div>
}

export default DashBoard;