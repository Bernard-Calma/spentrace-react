import { useState, useEffect } from "react";
import MonthlyBill from "./MonthlyBill";

const Paid = (props) => {
    let [totalPaid, setTotalPaid] = useState(0);
    let [billsPaid, setBillsPaid] = useState([])
 
    const getTotalPaid = () => {
        let paid = 0;
        const paidList = []
        props.bills.forEach(element => {
            if (element.paid) {
                paid += element.amount
                paidList.push(element)
            }
        });
        setTotalPaid(paid)
        setBillsPaid(paidList)
    }

    useEffect(()=> {
        getTotalPaid()
    },[props.bills])
    return <>
        <div className='containerPaid'>
                    <p>Paid: </p>
                    <p>${totalPaid.toFixed(2)}</p>
        </div>
        <MonthlyBill 
            handleShowBill = {props.handleShowBill}
            month = {props.month}
            bills = {billsPaid}
        />
    </> 

}

export default Paid;