import { useState } from "react"

const Bill = (props) => {
    const [monthNames] = useState(["January","February","March","April","May","June","July","August","September","October","November","December"])
    return(
        <div className = {props.bill.expense ? "billContainer expense" : "billContainer income"}>
            <div className="billDataContainer date"><p className="billData date">{`${new Date(props.bill.dueDate).toDateString().slice(4, 11)}`}</p></div>
            <div className="billDataContainer name"><p className="billData name" onClick={props.handleShowBill}>{props.bill.name}</p></div>
            <div className="billDataContainer"><p className="billData amount">${props.bill.amount.toFixed(2)}</p></div>
            <div className="billDataContainer"><p className="billData paid">{props.bill.category? props.bill.category : "Add"}</p></div>
        </div>
    )
}

export default Bill