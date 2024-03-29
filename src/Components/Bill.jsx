import { useState } from "react"
import { useDispatch } from "react-redux";
import { changeView } from "../features/viewSlice";
import { setOpenBill } from "../features/billSlice";

import BillPaidCheckBox from "./BillPaidCheckBox"

const Bill = (props) => {
    const dispatch = useDispatch();
    const [days] = useState([
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday", 
        'Sunday'
    ]);
    const [dueDate] = useState(new Date(props.bill.dueDate));
    
    const handleShowBill = () => {
        dispatch(setOpenBill(props.bill));
        dispatch(changeView({billView: "Show Bill"}))
    }

    return(
        <div className = {props.bill.expense ? "billContainer expense" : "billContainer income"}>
            <div className={`billDataContainer date`}>  
                <BillPaidCheckBox 
                        server = {props.server}
                        bill = {props.bill}
                        // updateBill = {props.modifyBills.update}
                />
                <p className={`billData date ${(Date.parse(new Date(props.bill.dueDate)) - Date.parse(new Date()) < 0 && !props.bill.paid) && 'negative'}`}>
                    {`${dueDate.getUTCDate()}`}
                    <span className="billData day">
                        {` - ${days[dueDate.getDay()]}`}
                    </span>
                </p>
            </div>

            <div className="billDataContainer name">
                <p className="billData name" onClick={handleShowBill}>{props.bill.name}</p>
            </div>

            <div className="billDataContainer">
                <p className="billData amount">${props.bill.amount.toFixed(2)}</p>
            </div>

            <div className="billDataContainer">
                <p className="billData paid">{props.bill.category? props.bill.category : "Add"}</p>
            </div>
        </div>
    );
};

export default Bill;