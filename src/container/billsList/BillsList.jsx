import axios from 'axios'
import { useEffect, useState } from 'react'
import Bill from '../../Components/Bill'
import './billsList.css'

const BillsList = (props) => {
    const [monthNames] = useState(["January","February","March","April","May","June","July","August","September","October","November","December"])
    let [month, setMonth] = useState(new Date().getMonth())
    let [monthText, setMonthText] = useState(monthNames[month])
    const totalExpense = 0;
    const totalIncome = 0;

    // Paid
    let [totalPaid, setTotalPaid] = useState(0);
    let [totalUnpaid, setTotalUnpaid] = useState(0);

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

    const getTotalPaid = () => {
        let paid = 0;
        let unpaid = 0;
        props.bills.forEach(element => {
            if (element.paid) paid += element.amount
            else unpaid += element.amount
        });
        setTotalPaid(paid)
        setTotalUnpaid(unpaid)
    }

    useEffect(()=> {
        getTotalPaid()
    },[])
    return(
        <section className='containerBillsList'>
            <div className='billsListHeader'>
                <i className="fi fi-rr-arrow-small-left btnPrevious" onClick={handlePrevMonth}></i>
                <h1 className='month'>{monthText}</h1>
                <i className="fi fi-rr-arrow-small-right btnNext" onClick={handleNextMonth}></i>
            </div>

            <div className="billsContainer">
                <div className='containerPaid'>
                    <p>Unaid: </p>
                    <p>${totalPaid.toFixed(2)}</p>
                </div>
                {
                    props.bills?.map((bill, index) => 
                        new Date(bill.dueDate).getMonth() === month ?
                        <>
                            <Bill 
                            key={index}
                            index={index}
                            bill={bill}
                            totalIncome = {totalIncome}
                            totalExpense = {totalExpense}
                            handleChangeView = {props.handleChangeView}
                            handleShowBill = {handleShowBill}
                            />
                        </>
                        : <></>)
                }
                <div className='containerPaid'>
                    <p>Paid: </p>
                    <p>${totalUnpaid.toFixed(2)}</p>
                </div>
            </div>
        </section>
    )
}

export default BillsList