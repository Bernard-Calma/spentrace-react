import axios from 'axios'
import { useEffect, useState } from 'react'
import AddBill from '../add/AddBill'
import BillsList from '../billsList/BillsList'
import EdditBill from '../edit/EditBill'
import ShowBill from '../show/ShowBill'
import DashBoard from './Dashboard'
import './home.css'

const Home = (props) => {
    let [homeView, setHomeView] = useState('Home')
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

    // Bills Information
    const [bills, setBills] = useState([])
    const [openBill, setOpenBill] = useState()
    const [totalBillsPaid, setTotalBillsPaid] = useState(0)
    const [totalBillsUnpaid, setTotalBillsUnpaid] = useState(0)
    const [nextUnpaidBill , setNextUnpaidBill] = useState({})

    // Plan Functions
    const getPlanList = () => {
        axios.get(`${props.server}/plans/`, { withCredentials: true })
        .then(res => console.log("All Plans: ", res))
    }
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

        
    // Bills
    const handleGetBills = () => {
        try {
            axios.get(`${props.server}/bills/${props.user._id}`, { withCredentials: true })
            .then(res => {
                setBills(res.data)
                // Get paid and unpaid graph
                let totalPaid = 0;
                let totalUnpaid = 0;
                res.data.forEach(bill => {
                    bill.paid ? totalPaid += bill.amount : totalUnpaid += bill.amount
                    setTotalBillsPaid(totalPaid)
                    setTotalBillsUnpaid(totalUnpaid)
                })
            })
        } catch (err) {
            console.log(err)
        }
    }

    const updateBills = (newBill) => {
        let newBillsList = bills.map((bill)=> bill._id === newBill._id ? newBill : bill)
        setBills(newBillsList); 
    }

    const getNextUpaidBill = () => {
        let unpaidBill = bills[0]
        bills.forEach(bill => {
            if(!bill.paid) return unpaidBill = bill
        })
        setNextUnpaidBill(unpaidBill)
    }

    // useEffect(()=>{
    //     getPlanList()
    //     getBalance()
    //     getTarget()
    // }, [])
    // useEffect(() => {
    //     handleGetBills()
    //     getNextUpaidBill()

    // }, [])


    return(
        <section className="containerHome">
            <div className='homeNavBar'>
                <p onClick={() => props.handleChangeView("Main")}>Budget Tracker</p>
                <p onClick={() => setHomeView("Bills List")}>Bills List</p>
            </div>
            {
                homeView === "Home" ?
                <DashBoard 
                    totalExpense = {totalExpense}
                    totalIncome = {totalIncome}
                    balance = {balance}
                    nextTarget = {nextTarget}
                    totalBillsPaid = {totalBillsPaid}
                    totalBillsUnpaid = {totalBillsUnpaid}
                    nextUnpaidBill = {nextUnpaidBill}
                />
                : homeView === "Bills List" ?
                <BillsList
                  handleChangeView = {props.handleChangeView}
                  handleShowPlan = {props.handleShowPlan}
                  setHomeView = {setHomeView}
                  setBills = {setBills}
                  setOpenBill = {setOpenBill}
                  server = {props.server}
                  user = {props.user}
                  bills = {bills}
                />  
                : homeView === "Add Bill"
                ? <AddBill
                    handleChangeView = {props.handleChangeView}
                    user = {props.user}
                    server = {props.server}
                  />
                : homeView === "Show Bill"
                ? <ShowBill
                    setHomeView = {props.handleChangeView}
                    openBill = {openBill}
                />
                : homeView === "Edit Bill" ?
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