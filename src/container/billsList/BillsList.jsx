import axios from 'axios'
import { useEffect, useState } from 'react'
import Bill from '../../Components/Bill'
import './billsList.css'

const BillsList = (props) => {
    
    let [month] = useState( new Date().toLocaleString('en-us',{month: "long"}))
    const totalExpense = 0;
    const totalIncome = 0;

    const handleGetBills = () => {
        try {
            axios.get(`${props.server}/bills/${props.user._id}`)
            .then(res => props.setBills(res.data))
        } catch (err) {
            console.log(err)
        }
    }

    const handleShowBill = (bill) => {
        props.setOpenBill(bill)
        props.handleChangeView("Show Bill")
    }

    useEffect(()=>{
        handleGetBills()
    },[])
    return(
        <section className='containerBillsList'>
            <h1 className='month'>{month}</h1>
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