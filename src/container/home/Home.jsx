import axios from 'axios'
import { useEffect, useState } from 'react'
import CircleGraph from '../../Components/CircleGraph'
import './home.css'

const Home = (props) => {
    // Plans
    const [balance, setBalance] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)
    const [nextTarget, setNextTarget] = useState({
        amount: 0,
        date: '',
        name: ''
    })
    const [planList] = useState(props.plans)
    const getBalance = () =>{ 
        let runningBalance = 0
        let totalIncome = 0
        let totalExpense = 0
        for (const plan of planList) {
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
        for (const bill of planList) {
            bill.expense ? balance -= bill.amount :  balance += bill.amount
            if (balance < 0) {
                nextTarget.amount = balance;
                nextTarget.name = bill.name
                nextTarget.date = bill.date
                setNextTarget(nextTarget)
                return
            }
        }
    }

    useEffect(()=>{
        getBalance()
        getTarget()
    }, [])

    // Bills
    const [totalBillsPaid, setTotalBillsPaid] = useState(0)
    const [totalBillsUnpaid, setTotalBillsUnpaid] = useState(0)
    const [nextUnpaidBill , setNextUnpaidBill] = useState({})
    const setBills = () => {
        let totalPaid = 0;
        let totalUnpaid = 0;
        props.bills.forEach(bill => {
            bill.paid ? totalPaid += bill.amount : totalUnpaid += bill.amount
            setTotalBillsPaid(totalPaid)
            setTotalBillsUnpaid(totalUnpaid)
        })
    }

    const getNextUpaidBill = () => {
        let unpaidBill = props.bills[0]
        props.bills.forEach(bill => {
            if(!bill.paid) return unpaidBill = bill
        })
        setNextUnpaidBill(unpaidBill)
    }

    useEffect(() => {
        setBills()
        getNextUpaidBill()
        
    }, [])

    return(
        <section className="containerHome">
            <div className='homeNavBar'>
                <p onClick={() => props.handleChangeView("Main")}>Budget Tracker</p>
                <p onClick={() => props.handleChangeView("Bills List")}>Bills List</p>
            </div>
            <div className='dashboard'>
                <div className='containerPlansDashboard'>
                    <div className='graphSubTitle'>
                        <h2>Expense</h2>
                        <h2>${totalExpense}</h2>
                    </div>       
                    <CircleGraph 
                        data = {[totalExpense, totalIncome]}
                        colors = {['red', 'green']}
                        width = {250}
                        height = {250}
                        value = {balance}
                    />
                    <div className='graphSubTitle'>
                        <h2>Income</h2>
                        <h2>${totalIncome}</h2>
                    </div>
                    <div className='containerNextTarget'>
                        <h2 className='nextTarget'>Next Target: ${Math.abs(nextTarget.amount).toFixed(2)}</h2>
                        <h2 className='nextTarget'>{nextTarget.name} - {new Date(nextTarget.date).toUTCString().slice(0, 11)}</h2>
                    </div>
                </div> 
                <h1 className='dashboardBillMonth'>{new Date().toLocaleString('en-us',{month: "long"})}</h1>
                {/* TODO: ADD FUNCTION TO SWITCH MONTHS */}
                <div className='cotnainerBillsDashboard'>
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
                    <div className='containerNextTarget'>
                        <h2 className='nextTarget'>Next Bill: ${Math.abs(nextUnpaidBill?.amount).toFixed(2)}</h2>
                        <h2 className='nextTarget'>{nextUnpaidBill?.name} - {new Date(nextUnpaidBill?.dueDate).toUTCString().slice(0, 11)}</h2>
                    </div>
                </div>               
            </div>

        </section>
    )
}

export default Home