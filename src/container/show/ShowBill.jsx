import "./Show.css"

const ShowBill = (props) => {
    const getDate = () => {
        let dateToday = new Date(Date.now()).toDateString().slice(4,7) + " " + new Date(Date.now()).getDate()
        let dateBill = new Date(props.openBill.dueDate).toDateString().slice(4,7) + " " + (new Date(props.openBill.dueDate).getDate() + 1) // Add 1 to provide accurate day
        return dateToday === dateBill ? "Today": dateBill;
    }

    return(
        <div className="containerShowBill">
            <i className="fi fi-rr-angle-small-left" onClick={()=>props.handleChangeView("Main")}></i>
            <div className="containerShowBillInner">
                <p className='showInfo date'> <span>Date:</span> {getDate()}</p>
                <p className='showInfo name'> <span>Name:</span> {props.openBill.name}</p>
                <p className='showInfo amount'> <span>Amount:</span> ${props.openBill.amount.toFixed(2)}</p>
                <p className='showInfo amount'> <span>Caregory:</span> ${props.openBill.category? props.openBill.category : "None"}</p>
                <p className='showInfo type'> <span>Autopay:</span> {props.openBill.autoPay ? "Yes" : "No"}</p>
                <p className='showInfo type'> <span>Repeat:</span> {props.openBill.repeat}</p>
                <p className="showInfo"><span>Notes:</span> </p>
                <p className='showInfo notes'> {props.openBill.notes}</p>
            </div>
            
        </div>
    )
}

export default ShowBill;