import { useEffect, useState } from "react"
import "./Bill.css"

const Bill = (props) => {
    const [runningTotal, setRunningTotal] = useState(0)
    const [target, setTarget] = useState(0)

    const [date, setDate] = useState(new Date(props.bill.date).toLocaleDateString())
    useEffect( ()=> {
        
    },[])
    return (
        <div className="billContainer">
            <div className="dataContainer"><p className="billData">{date}</p></div>
            <div className="dataContainer"><p className="billData">${props.bill.amount.toFixed(2)}</p></div>
            <div className="dataContainer"><p className="billData">{props.bill.expense ? "Income" : "Expense"}</p></div>
            <div className="dataContainer"><p className="billData">${runningTotal.toFixed(2)}</p></div>
            <div className="dataContainer"><p className="billData">${target.toFixed(2)}</p></div>
        </div>
    )
}

export default Bill