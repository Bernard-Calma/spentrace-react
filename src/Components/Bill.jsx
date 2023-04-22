import { useState } from "react"
import BillPaidCheckBox from "./BillPaidCheckBox"

const Bill = (props) => {
     const [days] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", 'Sunday'])
    const [dueDate] = useState(new Date(props.bill.dueDate))
    return(
        <div className = {props.bill.expense ? "billContainer expense" : "billContainer income"}>
            <div className="billDataContainer date">  
                {
                    <BillPaidCheckBox 
                        paid = {props.bill.paid}
                    />
                }
                <p className="billData date">
                    {`${dueDate.getUTCDate()}`}
                    <span className="billData day">
                        {` - ${days[dueDate.getDay()]}`}
                    </span>
                </p>
            </div>
            <div className="billDataContainer name"><p className="billData name" onClick={props.handleShowBill}>{props.bill.name}</p></div>
            <div className="billDataContainer"><p className="billData amount">${props.bill.amount.toFixed(2)}</p></div>
            <div className="billDataContainer"><p className="billData paid">{props.bill.category? props.bill.category : "Add"}</p></div>
        </div>
    )
}

export default Bill