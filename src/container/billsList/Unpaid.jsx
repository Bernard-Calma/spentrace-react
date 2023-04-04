import { useState, useEffect } from "react";
import MonthlyBill from "./MonthlyBill";

const Unpaid = (props) => {
    let [totalUnpaid, setTotalUnpaid] = useState(0);
    const [billsUnpaid, setBillsUnpaid] = useState([])
 
    const getTotalPaid = () => {
        let unpaid = 0;
        let unpaidList = []
        props.bills.forEach(element => {
            if (!element.paid) {
                unpaid += element.amount
                unpaidList.push(element)
            }
        });
        setTotalUnpaid(unpaid)
        setBillsUnpaid(unpaidList)
    }

    useEffect(()=> {
        getTotalPaid()
    },[props.bills])
    return  <>
        <div className='containerPaid'>
                    <p>Paid: </p>
                    <p>${totalUnpaid.toFixed(2)}</p>
        </div>
        <MonthlyBill
            handleShowBill = {props.handleShowBill}
            month = {props.month}
            bills = {billsUnpaid}
        />
    </> 

}

export default Unpaid;