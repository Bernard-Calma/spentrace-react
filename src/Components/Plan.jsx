import "./Plan.css"

const Plan = (props) => {
    const getDate = () => {
        // Get today and plan's month and date and compare
        let dateToday = new Date(Date.now()).toDateString().slice(4,7) + " " + new Date(Date.now()).getDate()
        let datePlan = new Date(props.plan.date).toDateString().slice(4,7) + " " + (new Date(props.plan.date).getDate() + 1) // Add 1 to provide accurate day
        return dateToday === datePlan ? "Today": datePlan;
    }

    return (
        <div className = {props.plan.expense ? "planContainer expense" : "planContainer income"}>
            <div className="dataContainer date"><p className={`planData date ${Date.parse(new Date(props.plan.date)) - Date.parse(new Date()) < 0 && 'negative'}`}>{getDate()}</p></div>
            <div className="dataContainer name"><p className="planData name" onClick={() => props.handleShowPlan(props.plan)}>{props.plan.name}</p></div>
            <div className="dataContainer"><p className="planData amount">${props.plan.amount}</p></div>
            <div className="dataContainer type"><p className="planData type">{props.plan.expense ? "Expense" : "Income"}</p></div>
            <div className="dataContainer"><p className={`planData ${props.plan.runningTotal > 0 ? "positive" : "negative"}`}>{props.plan.runningTotal < 0 ? "-$"+Math.abs(props.plan.runningTotal) : "$"+props.plan.runningTotal}</p></div>
            {/* <div className="dataContainer"><p className="planData">${props.plan.target}</p></div> */}
        </div>
    )
}

export default Plan 