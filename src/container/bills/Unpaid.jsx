import { useSelector } from "react-redux";
import MonthlyBill from "./MonthlyBill";
import Categories from "../../common/Categories";
import Add from "../../common/Icon";

const Unpaid = (props) => {
    const {
        monthlyBills
    } = useSelector( store => store.bill)
 
    return (
        <>
            <div className='containerPaid'>
                    <p>Unpaid: </p>
                    <p className="negative">${monthlyBills.totalUnpaid.toFixed(2)}</p> 
            </div>
            <Categories 
                mobileCategories = {["date", "name", "amount", "category"]}
            />
            <div className="billAddContainer">
                    <Add className="fi fi-rr-add btnAddBill" onClick={() => props.changeBillsView("Add Bill")}/>
            </div>
            <MonthlyBill 
                bills = {monthlyBills.unpaidList}
                handleShowBill = {props.handleShowBill}
                modifyBills = {props.modifyBills}
            />
        </> 
    );
};

export default Unpaid;