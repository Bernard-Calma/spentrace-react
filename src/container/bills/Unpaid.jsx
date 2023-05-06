import { useState, useEffect } from "react";
import MonthlyBill from "./MonthlyBill";
import Categories from "../../common/Categories";
import Add from "../../common/Icon";

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
            <Categories 
                mobileCategories = {["date", "name", "amount", "category"]}
            />
            <div className="billAddContainer">
                    <Add className="fi fi-rr-add btnAddBill" onClick={() => props.changeBillsView("Add Bill")}/>
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