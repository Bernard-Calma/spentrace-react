import "./Bill.css"

const Bill = (props) => {
    const getDate = () => {
        // console.log(new Date(Date.now()).toISOString().slice(0,10))
        let billDate =  new Date(props.bill.date).toISOString().slice(0,10);
        // console.log(typeof(billDate))
        // console.log(parseInt(billDate[lastCharIndex]) + 1)
        const lastCharIndex = billDate.length - 1;
        const lastIndexChange = parseInt(billDate[lastCharIndex]) + 1;
        billDate = billDate.slice(0, lastCharIndex) + lastIndexChange; // Change last index to add 1 by itself
        // console.log(billDate)
        const todayDate = new Date(Date.now()).toISOString().slice(0,10);
        return billDate === todayDate ? "Today": billDate.slice(5);
    }
    return (
        <div className="billContainer">
            <div className="dataContainer"><p className="billData date">{getDate()}</p></div>
            <div className="dataContainer"><p className="billData name">{props.bill.name}</p></div>
            <div className="dataContainer"><p className="billData">${props.bill.amount}</p></div>
            <div className="dataContainer"><p className="billData">{props.bill.expense ? "Expense" : "Income"}</p></div>
            <div className="dataContainer"><p className="billData">{props.bill.runningTotal < 0 ? "-$"+Math.abs(props.bill.runningTotal) : "$"+props.bill.runningTotal}</p></div>
            <div className="dataContainer"><p className="billData">${props.bill.target}</p></div>
        </div>
    )
}

export default Bill 