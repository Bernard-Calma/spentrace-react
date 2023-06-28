import { useSelector, useDispatch } from "react-redux";
import { changeView } from "../../features/viewSlice";

import MonthlyBill from "./MonthlyBill";
import Categories from "../../common/Categories";
import Add from "../../common/Icon";

const Unpaid = (props) => {
    const dispatch = useDispatch();
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
                    <Add className="fi fi-rr-add btnAddBill" onClick={() => dispatch(changeView({billView: "Add Bill"}))}/>
            </div>
            <MonthlyBill 
                bills = {monthlyBills.unpaidList}
                modifyBills = {props.modifyBills}
            />
        </> 
    );
};

export default Unpaid;