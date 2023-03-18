import { useEffect, useState } from 'react'
import './home.css'

const Home = (props) => {
    const [balance, setBalance] = useState(0)
    const [nextTarget, setNextTarget] = useState({
        amount: 0,
        date: ''
    })

    const getBalance = () =>{ 
        let runningBalance = 0
        for (const bill of props.bills) {
            bill.expense ? runningBalance -= bill.amount :  runningBalance += bill.amount
        }
        setBalance(runningBalance)
    }

    const getTarget = () => {
        let balance = 0
        let nextTarget = {
            amount: 0,
            date: ""
        }
        for (const bill of props.bills) {
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
            <div className='dashboard'>
                <p>Balance: ${balance}</p>
                <p>Next Target: ${Math.abs(nextTarget.amount)} Date: {new Date(nextTarget.date).toUTCString().slice(0, 11)}</p>
            </div>
            <p onClick={() => props.handleChangeView("Main")}>Budget Tracker</p>
            <p>Bills List</p>
        </section>
    )
}

export default Home