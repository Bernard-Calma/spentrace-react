import { useSelector } from "react-redux";
import MonthlyBill from "./MonthlyBill";

const Paid = (props) => {
    const {
        monthlyBills
    } = useSelector(store => store.bill)

    return (
        <>
            <div className='containerPaid'>
                <p>Paid: </p>
                <p className="positive">${monthlyBills.totalPaid.toFixed(2)}</p>
            </div>
            <MonthlyBill 
                bills = {monthlyBills.paidList}
                handleShowBill = {props.handleShowBill}
                modifyBills = {props.modifyBills}
            />
        </> 
    );
};

export default Paid;