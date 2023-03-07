import "./Show.css"

const Show = (props) => {
    const getDate = () => {
        // console.log(new Date(Date.now()).toISOString().slice(0,10))
        let billDate =  new Date(props.openBill.date).toISOString().slice(0,10);
        // console.log(typeof(billDate))
        // console.log(parseInt(billDate[lastCharIndex]) + 1)
        const lastCharIndex = billDate.length - 1;
        const lastIndexChange = parseInt(billDate[lastCharIndex]) + 1;
        billDate = billDate.slice(0, lastCharIndex) + lastIndexChange; // Change last index to add 1 by itself
        // console.log(billDate)
        const todayDate = new Date(Date.now()).toISOString().slice(0,10);
        return billDate === todayDate ? "Today": new Date(billDate).toString().slice(4,16);
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