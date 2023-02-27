const Show = (props) => {

    return(
        <div>
            <p className='addFormInput'> Date: {new Date(props.openBill.date).toISOString().slice(0,10)}</p>
            <p className='addFormInput'> Name: {props.openBill.name}</p>
            <p className='addFormInput'> Amount: {props.openBill.amount}</p>
            <p className='addFormInput'> Type: {props.openBill.expense ? "Expense" : "Income"}</p>
            <p className='addFormInput'> Notes: {props.openBill.notes}</p>
        </div>
    )
}

export default Show;