import { useState, useEffect } from "react";
import MonthlyBill from "./MonthlyBill";

const Unpaid = (props) => {
    let [totalUnpaid, setTotalUnpaid] = useState(0);
    const [billsUnpaid, setBillsUnpaid] = useState([]);
 
    const getTotalUnpaid = () => {
        let unpaid = 0;
        let unpaidList = [];
        props.bills.forEach(element => {
            if (!element.paid) {
                unpaid += element.amount;
                unpaidList.push(element);
            };
        });
        setTotalUnpaid(unpaid);
        setBillsUnpaid(unpaidList);
    }

    useEffect(()=> {
        getTotalUnpaid();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.bills]);
    return (
        <>
            <div className='containerPaid'>
                        <p>Unpaid: </p>
                        <p className="negative">${totalUnpaid.toFixed(2)}</p>
            </div>
            <div className="categoriesContainer billsCategory">
                <div className="listContainer billDataContainer">
                    <h2 className="billData date">Date</h2>
                </div>

                <div className="listContainer billDataContainer">
                    <h2 className="billData name">Name</h2>
                </div>

                <div className="listContainer billDataContainer">
                    <h2 className="billData amount">Amount</h2>
                </div>

                <div className="listContainer billDataContainer">
                    <h2 className="billData category">Category</h2>
                </div>
            </div>

            <div className="billAddContainer">
                    <i 
                        className="fi fi-rr-add btnAddBill" 
                        onClick={() => props.changeBillsView("Add Bill")}
                    />
            </div>
            <MonthlyBill
                bills = {billsUnpaid}
                month = {props.month}
                server = {props.server}
                handleShowBill = {props.handleShowBill}
                modifyBills = {props.modifyBills}
            />
        </> 
    );
};

export default Unpaid;