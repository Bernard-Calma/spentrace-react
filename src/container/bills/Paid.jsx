import { useState, useEffect } from "react";
import MonthlyBill from "./MonthlyBill";

const Paid = (props) => {
    let [totalPaid, setTotalPaid] = useState(0);
    const [billsPaid, setBillsPaid] = useState([])
 
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.bills])
    return <>
        <div className='containerPaid'>
                    <p>Paid: </p>
                    <p>${totalPaid.toFixed(2)}</p>
        </div>
        <MonthlyBill 
            bills = {billsPaid}
            month = {props.month}
            server = {props.server}
            handleShowBill = {props.handleShowBill}
            
            
        />
    </> 

}

export default Paid;