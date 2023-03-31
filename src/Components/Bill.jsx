import { useState } from "react"

const Bill = (props) => {
    const [dueDate] = useState( ()=> {
        const date = new Date(props.bill.dueDate)
        return date.toLocaleDateString('us', {weekday: 'short'}) + " " + date.getDate()
    })
    return(
        <div className = {props.bill.expense ? "planContainer expense" : "planContainer income"}>
            <div className="dataContainer date"><p className="planData date">{dueDate}</p></div>
            <div className="dataContainer name"><p className="planData name" onClick={() => props.handleShowBill(props.bill)}>{props.bill.name}</p></div>
            <div className="dataContainer"><p className="planData amount">${props.bill.amount.toFixed(2)}</p></div>
            <div className="dataContainer"><p className="planData paid">{props.bill.paid?"Paid":"Unpaid"}</p></div>
            <div className="dataContainer"><p className="planData paid">{props.bill.category? props.bill.category : "Add"}</p></div>
        </div>
    )
}

export default Bill