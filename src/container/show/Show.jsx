import "./Show.css"

const Show = (props) => {
    const getDate = () => {
        let dateToday = new Date(Date.now()).toDateString().slice(4,7) + " " + new Date(Date.now()).getDate()
        let datePlan = new Date(props.openPlan.date).toDateString().slice(4,7) + " " + (new Date(props.openPlan.date).getDate() + 1) // Add 1 to provide accurate day
        return dateToday === datePlan ? "Today": datePlan;
    }

    return(
        <div className="containerShow">
            <i className="fi fi-rr-angle-small-left" onClick={()=>props.handleChangeView("Main")}></i>
            <div className="containerShowInner">
                <p className='showInfo date'> <span>Date:</span> {getDate()}</p>
                <p className='showInfo name'> <span>Name:</span> {props.openPlan.name}</p>
                <p className='showInfo amount'> <span>Amount:</span> ${props.openPlan.amount.toFixed(2)}</p>
                <p className='showInfo type'> <span>Type:</span> {props.openPlan.expense ? "Expense" : "Income"}</p>
                <p className="showInfo"><span>Notes:</span> </p>
                <p className='showInfo notes'> {props.openPlan.notes}</p>
            </div>
            
        </div>
    )
}

export default Show;