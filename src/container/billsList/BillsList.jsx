import { useEffect, useState } from 'react'
import Bill from '../../Components/Plan'
import './billsList.css'

const BillsList = (props) => {
    const [bills, setBills] = useState([

    ])
    const totalExpense = 0;
    const totalIncome = 0;

    const handleGetBills = () => {
        fetch(props.server+"/bills/test")
        .then(res => res.json())
        .then(data => setBills(data))
    }

    useEffect(()=>{
        handleGetBills()
    },[])
    return(
        <section className='containerBillsList'>
            <h1>Bills List</h1>
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