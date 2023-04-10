import { useState } from "react"

const Bill = (props) => {
    const [dueDate] = useState( ()=> {
        const date = new Date(props.bill.dueDate)
        return date.toLocaleDateString('us', {weekday: 'short'}) + " " + date.getDate()
    })
    return(
        <div className = {props.bill.expense ? "billContainer expense" : "billContainer income"}>
            <div className="billDataContainer date"><p className="billData date">{dueDate}</p></div>
            <div className="billDataContainer name"><p className="billData name" onClick={props.handleShowBill}>{props.bill.name}</p></div>
            <div className="billDataContainer"><p className="billData amount">${props.bill.amount.toFixed(2)}</p></div>
            <div className="billDataContainer"><p className="billData paid">{props.bill.category? props.bill.category : "Add"}</p></div>
        </div>
    )
}

export default Bill