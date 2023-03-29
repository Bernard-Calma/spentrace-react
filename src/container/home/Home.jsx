import { useEffect, useState } from 'react'
import CircleGraph from '../../Components/CircleGraph'
import './home.css'

const Home = (props) => {
    const [balance, setBalance] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)
    const [nextTarget, setNextTarget] = useState({
        amount: 0,
        date: ''
    })
    const [planList] = useState(props.plans)
    console.log(props)
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
    return(
        <section className="containerHome">
            <div className='homeNavBar'>
                <p onClick={() => props.handleChangeView("Main")}>Budget Tracker</p>
                <p onClick={() => props.handleChangeView("Bills List")}>Bills List</p>
            </div>
            <div className='dashboard'>
                <div className='containerPlansDashboard'>
                    <div className='grapSubTitle'>
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
                    <div className='grapSubTitle'>
                        <h2>Income</h2>
                        <h2>${totalIncome}</h2>
                    </div>
                    <div className='containerNextTarget'>
                        <h2 className='nextTarget'>Date: {new Date(nextTarget.date).toUTCString().slice(0, 11)}</h2>
                        <h2 className='nextTarget'>Next Target: ${Math.abs(nextTarget.amount)}</h2>
                    </div>
                </div>
                <div className='containerBillsDashboard'>
                    <h1>Bills</h1>
                    
                </div>
                
            </div>

        </section>
    )
}

export default Home