import { useState, useEffect } from "react";
import MonthlyBill from "./MonthlyBill";

const Unpaid = (props) => {
    let [totalUnpaid, setTotalUnpaid] = useState(0);
    const [billsUnpaid, setBillsUnpaid] = useState([])
 
    const getTotalUnpaid = () => {
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
        getTotalUnpaid()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.bills])
    return  <>
        <div className='containerPaid'>
                    <p>Unpaid: </p>
                    <p>${totalUnpaid.toFixed(2)}</p>
        </div>
        <div className="billsCategory">
            <div className="billDataContainer"><p className="billData date">Date</p></div>
            <div className="billDataContainer"><p className="billData name">Name</p></div>
            <div className="billDataContainer"><p className="billData amount">Amount</p></div>
            <div className="billDataContainer"><p className="billData category">Category</p></div>
        </div>
        <div className="billAddContainer">
                <i className="fi fi-rr-add btnAddBill" onClick={() => props.changeBillsView("Add Bill")}></i>
        </div>
        <MonthlyBill
            month = {props.month}
            bills = {billsUnpaid}
            handleShowBill = {props.handleShowBill}
        />
    </> 

}

export default Unpaid;