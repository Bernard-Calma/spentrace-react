import axios from 'axios'
import { useEffect, useState } from 'react'
import Bill from '../../Components/Bill'
import './billsList.css'

const BillsList = (props) => {
    const [bills, setBills] = useState([])
    let [month] = useState( new Date().toLocaleString('en-us',{month: "long"}))
    const totalExpense = 0;
    const totalIncome = 0;

    const handleGetBills = () => {
        try {
            axios.get(`${props.server}/bills/${props.user._id}`)
            .then(res => setBills(res.data))
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        handleGetBills()
    },[])
    return(
        <section className='containerBillsList'>
            <h1 className='month'>{month}</h1>
            <div className="billsContainer">
                {
                    bills?.map((bill, index) => 
                        <Bill 
                        key={index}
                        index={index}
                        bill={bill}
                        totalIncome = {totalIncome}
                        totalExpense = {totalExpense}
                        handleChangeView = {props.handleChangeView}
                        handleShowBill = {props.handleShowBill}
                    />)
                }
            </div>
        </section>
    )
}

export default BillsList