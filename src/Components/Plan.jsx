import "./Plan.css"

const Plan = (props) => {
    const getDate = () => {
        // Get today and bill's month and date and compare
        let dateToday = new Date(Date.now()).toDateString().slice(4,7) + " " + new Date(Date.now()).getDate()
        let dateBill = new Date(props.bill.date).toDateString().slice(4,7) + " " + (new Date(props.bill.date).getDate() + 1) // Add 1 to provide accurate day
        return dateToday === dateBill ? "Today": dateBill;
    }

    return (
        <div className = {props.bill.expense ? "planContainer expense" : "planContainer income"}>
            <div className="dataContainer date"><p className="planData date">{getDate()}</p></div>
            <div className="dataContainer name"><p className="planData name" onClick={() => props.handleShowBill(props.bill)}>{props.bill.name}</p></div>
            <div className="dataContainer"><p className="planData amount">${props.bill.amount}</p></div>
            <div className="dataContainer type"><p className="planData type">{props.bill.expense ? "Expense" : "Income"}</p></div>
            <div className="dataContainer"><p className="planData">{props.bill.runningTotal < 0 ? "-$"+Math.abs(props.bill.runningTotal) : "$"+props.bill.runningTotal}</p></div>
            {/* <div className="dataContainer"><p className="planData">${props.bill.target}</p></div> */}
        </div>
    )
}

export default Plan 