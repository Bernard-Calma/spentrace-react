import {  useState } from 'react'
import Bill from '../../Components/Bill'
import './billsList.css'
import MonthHeader from './MonthHeader'
import Paid from './Paid'
import Unpaid from './Unpaid'

const BillsList = (props) => {
    const [monthNames] = useState(["January","February","March","April","May","June","July","August","September","October","November","December"])
    let [month, setMonth] = useState(new Date().getMonth())
    let [monthText, setMonthText] = useState(monthNames[month])

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
    return(
        <section className='containerBillsList'>
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
                />
                <Paid 
                    month = {month}
                    bills = {getMonthlyBill(month)}
                    handleShowBill = {handleShowBill}
                />
            </div>
        </section>
    )
}

export default BillsList