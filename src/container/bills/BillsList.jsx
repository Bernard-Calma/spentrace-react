import {  useState } from 'react'
import AddBill from '../add/AddBill'
import ShowBill from '../show/ShowBill'
import './billsList.css'
import MonthHeader from './MonthHeader'
import Paid from './Paid'
import Unpaid from './Unpaid'

const BillsList = (props) => {
    const [monthNames] = useState(["January","February","March","April","May","June","July","August","September","October","November","December"])
    const [bills, setBills] = useState([...props.bills])
    let [month, setMonth] = useState(new Date().getMonth())
    let [monthText, setMonthText] = useState(monthNames[month])
    let [billsView, setBillsView] = useState("Bills List")
    let [openBill, setOpenBill] = useState({})


    const changeBillsView = view => setBillsView(view);

    const handleShowBill = (bill) => {
        setOpenBill(bill)
        setBillsView("Show Bill")
    }

    const handlePrevMonth = () => {
        if (month === 0) setMonth(11)
        else setMonth(month -= 1)
        setMonthText(monthNames[month])
    }
    
    const handleNextMonth = () => {
        if (month === 11) setMonth(0)
        else setMonth(month += 1)
        setMonthText(monthNames[month])
    }

    const getMonthlyBill = (month) => {
        let monthBills = []
        monthBills = bills.filter(bill => new Date(bill.dueDate).getMonth() === month)
        return monthBills
    }

    const handleAddBill = newBill => setBills([...bills, newBill])


    return(<>{
        billsView === "Bills List"
        ? <section className='containerBillsList'>
        <MonthHeader 
            monthText = {monthText}
            handlePrevMonth = {handlePrevMonth}
            handleNextMonth = {handleNextMonth}
        />
        <div className="billsContainer">
            <Unpaid 
                month = {month}
                bills = {getMonthlyBill(month)}
                handleShowBill = {handleShowBill}
                setHomeView = {props.setHomeView}
            />
            <Paid 
                month = {month}
                bills = {getMonthlyBill(month)}
                handleShowBill = {handleShowBill}
                setHomeView = {props.setHomeView}
            />
        </div>
        </section>
        : billsView === "Add Bill"
        ?<AddBill 
            user = {props.user}
            server = {props.server}
            bills = {props.bills}
            changeBillsView = {() => changeBillsView("Bills List")}
            handleAddBill = {handleAddBill}
        />
        : billsView === "Show Bill"
        ? <ShowBill 
            openBill = {openBill}
            changeBillsView = {() => changeBillsView("Bills List")}
        />
        : <></>
    }</>)
}

export default BillsList