import "./Show.css"

const Show = (props) => {

    return(
        <div className="containerShow">
            <div className="containerShowInner">
                <p className="closeBtn" onClick={()=>props.handleChangeView("Main")}>X</p>
                <p className='showInfo date'> Date: {new Date(props.openBill.date).toISOString().slice(0,10)}</p>
                <p className='showInfo name'> Name: {props.openBill.name}</p>
                <p className='showInfo amount'> Amount: ${props.openBill.amount.toFixed(2)}</p>
                <p className='showInfo type'> Type: {props.openBill.expense ? "Expense" : "Income"}</p>
                <p className="showInfo">Notes: </p>
                <p className='showInfo notes'> {props.openBill.notes}</p>
            </div>
            
        </div>
    )
}

export default Show;