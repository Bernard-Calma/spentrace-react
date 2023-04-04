import axios from 'axios'
import { useEffect, useState } from 'react'
import CircleGraph from '../../Components/CircleGraph'
import AddBill from '../add/AddBill'
import BillsList from '../billsList/BillsList'
import EdditBill from '../edit/EditBill'
import ShowBill from '../show/ShowBill'
import DashBoard from './Dashboard'
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

    const handleGetBills = () => {
        try {
            axios.get(`${props.server}/bills/${props.user._id}`)
            .then(res => setBills(res.data))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getBalance()
        getTarget()
        handleGetBills()
    }, [])

    // Bills Information
    const [bills, setBills] = useState([])
    const [openBill, setOpenBill] = useState()
    const [totalBillsPaid, setTotalBillsPaid] = useState(0)
    const [totalBillsUnpaid, setTotalBillsUnpaid] = useState(0)
    const [nextUnpaidBill , setNextUnpaidBill] = useState({})

    
    const setBillsPaid = () => {
        let totalPaid = 0;
        let totalUnpaid = 0;
        bills.forEach(bill => {
            bill.paid ? totalPaid += bill.amount : totalUnpaid += bill.amount
            setTotalBillsPaid(totalPaid)
            setTotalBillsUnpaid(totalUnpaid)
        })
    }

    const getNextUpaidBill = () => {
        let unpaidBill = bills[0]
        bills.forEach(bill => {
            if(!bill.paid) return unpaidBill = bill
        })
        setNextUnpaidBill(unpaidBill)
    }

    
    // Bills
    const updateBills = (newBill) => {
        let newBillsList = bills.map((bill)=> bill._id === newBill._id ? newBill : bill)
        setBills(newBillsList); 
    }

    useEffect(() => {
        setBillsPaid()
        getNextUpaidBill()
        
    }, [])

    return(
        <section className="containerHome">
            <div className='homeNavBar'>
                <p onClick={() => props.handleChangeView("Main")}>Budget Tracker</p>
                <p onClick={() => props.handleChangeView("Bills List")}>Bills List</p>
            </div>
            {
                props.view === "Home" ?
                <DashBoard 
                    totalExpense = {totalExpense}
                    totalIncome = {totalIncome}
                    balance = {balance}
                    nextTarget = {nextTarget}
                    totalBillsPaid = {totalBillsPaid}
                    totalBillsUnpaid = {totalBillsUnpaid}
                    nextUnpaidBill = {nextUnpaidBill}
                />
                : props.view === "Bills List" ?
                <BillsList
                  handleChangeView = {props.handleChangeView}
                  handleShowPlan = {props.handleShowPlan}
                  setBills = {setBills}
                  setOpenBill = {setOpenBill}
                  server = {props.server}
                  user = {props.user}
                  bills = {bills}
                />  
                : props.view === "Add Bill"
                ? <AddBill
                    handleChangeView = {props.handleChangeView}
                    user = {props.user}
                    server = {props.server}
                  />
                : props.view === "Show Bill"
                ? <ShowBill
                    handleChangeView = {props.handleChangeView}
                    openBill = {openBill}
                />
                : props.view === "Edit Bill" ?
                <EdditBill
                  openBill = {openBill}
                  server = {props.server}
                  handleChangeView = {props.handleChangeView} 
                  updateBills = {updateBills}
                />
                : <></>
                
            }

        </section>
    )
}

export default Home