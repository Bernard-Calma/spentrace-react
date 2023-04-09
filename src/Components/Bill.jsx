import { useState } from "react"

const Bill = (props) => {
    const [dueDate] = useState( ()=> {
        const date = new Date(props.bill.dueDate)
        return date.toLocaleDateString('us', {weekday: 'short'}) + " " + date.getDate()
    })
    return(
        <div className = {props.bill.expense ? "billContainer expense" : "billContainer income"}>
            <div className="billDataContainer date"><p className="planData date">{dueDate}</p></div>
            <div className="billDataContainer name"><p className="planData name" onClick={() => props.setHomeView(props.bill)}>{props.bill.name}</p></div>
            <div className="billDataContainer"><p className="planData amount">${props.bill.amount.toFixed(2)}</p></div>
            <div className="billDataContainer"><p className="planData paid">{props.bill.category? props.bill.category : "Add"}</p></div>
        </div>
    )
}

export default Bill