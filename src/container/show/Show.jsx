import "./Show.css"

const Show = (props) => {
    const getDate = () => {
        let dateToday = new Date(Date.now()).toDateString().slice(4,7) + " " + new Date(Date.now()).getDate()
        let dateBill = new Date(props.openBill.date).toDateString().slice(4,7) + " " + (new Date(props.openBill.date).getDate() + 1) // Add 1 to provide accurate day
        return dateToday === dateBill ? "Today": dateBill;
    }

    return(
        <div className="containerShow">
            <i class="fi fi-rr-angle-small-left" onClick={()=>props.handleChangeView("Main")}></i>
            <div className="containerShowInner">
                <p className='showInfo date'> <span>Date:</span> {getDate()}</p>
                <p className='showInfo name'> <span>Name:</span> {props.openBill.name}</p>
                <p className='showInfo amount'> <span>Amount:</span> ${props.openBill.amount.toFixed(2)}</p>
                <p className='showInfo type'> <span>Type:</span> {props.openBill.expense ? "Expense" : "Income"}</p>
                <p className="showInfo"><span>Notes:</span> </p>
                <p className='showInfo notes'> {props.openBill.notes}</p>
            </div>
            
        </div>
    )
}

export default Show;