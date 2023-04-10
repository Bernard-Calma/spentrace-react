import {  useState } from 'react'
import AddBill from '../add/AddBill'
import './billsList.css'
import MonthHeader from './MonthHeader'
import Paid from './Paid'
import Unpaid from './Unpaid'

const BillsList = (props) => {
    const [monthNames] = useState(["January","February","March","April","May","June","July","August","September","October","November","December"])
    let [month, setMonth] = useState(new Date().getMonth())
    let [monthText, setMonthText] = useState(monthNames[month])
    let [billsView, setBillsView] = useState("Bills List")

    const changeBillsView = view => setBillsView(view);

    const handleShowBill = (bill) => {
        props.setOpenBill(bill)
        props.handleChangeView("Show Bill")
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
        monthBills = props.bills.filter(bill => new Date(bill.dueDate).getMonth() === month)
        return monthBills
    }
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
                changeBillsView = {() => changeBillsView("Add Bill")}
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
        />
        : <>
            
        </>
    }</>)
}

export default BillsList