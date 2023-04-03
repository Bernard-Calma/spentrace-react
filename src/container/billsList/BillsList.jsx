import axios from 'axios'
import { useEffect, useState } from 'react'
import Bill from '../../Components/Bill'
import './billsList.css'

const BillsList = (props) => {
    
    const [monthNames] = useState(["January","February","March","April","May","June","July","August","September","October","November","December"])
    let [month, setMonth] = useState()
    const totalExpense = 0;
    const totalIncome = 0;

    const handleShowBill = (bill) => {
        props.setOpenBill(bill)
        props.handleChangeView("Show Bill")
    }
    useEffect(() => {
        monthNames.forEach((month, index) => {
            if(new Date().getMonth() === index) setMonth(month);
        })
    }, [])
    return(
        <section className='containerBillsList'>
            <div className='billsListHeader'>
                <i className="fi fi-rr-arrow-small-left btnPrevious"></i>
                <h1 className='month'>{month}</h1>
                <i className="fi fi-rr-arrow-small-right btnNext"></i>
            </div>

            <div className="billsContainer">
                {
                    props.bills?.map((bill, index) => 
                        <Bill 
                        key={index}
                        index={index}
                        bill={bill}
                        totalIncome = {totalIncome}
                        totalExpense = {totalExpense}
                        handleChangeView = {props.handleChangeView}
                        handleShowBill = {handleShowBill}
                    />)
                }
            </div>
        </section>
    )
}

export default BillsList