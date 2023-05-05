import axios from "axios"
import "./Show.css"

const ShowAccount = (props) => {
    const getDate = date => {
        let dateToday = new Date();
        dateToday = `${dateToday.getFullYear()} ${dateToday.getMonth()} ${dateToday.getDate()}`;
        let dueDate = new Date(date);
        dueDate = `${dueDate.getFullYear()} ${dueDate.getMonth()} ${dueDate.getDate()}`;
        // console.log("Date Today: ", dateToday);
        // console.log("Due Date: ", dueDate);
        return dateToday === dueDate ? "Today": new Date(date).toDateString();
    };

    const handleDelete = async () => {
        // console.log("Delete");
        await axios({
            method: "DELETE",
            url: `${props.server}/accounts/${props.openAcc._id}`,
            withCredentials: true
        })
        .then(res => {
            // console.log(res);
            props.delete(res.data);
        })
        .catch(err => console.log(err));
        props.return();
    }
    return(
        <div className="containerShowBill">
            <div className="showHeader">
                <i 
                    className="fi fi-rr-angle-small-left" 
                    onClick={props.return}
                />
                <div>
                    <i 
                        className="fi fi-rr-edit" 
                        onClick={props.edit}
                    />
                    <i 
                        className="fi fi-rr-trash" 
                        onClick={handleDelete}
                    />
                </div>
            </div>
            <div className="containerShowInner">
                <p className='showInfo accType'>
                    <span>Account Type: </span>
                    {props.openAcc.accType}
                </p>
                <p className='showInfo bank'>
                    <span>Bank: </span>
                    {props.openAcc.bank}
                </p>
                <p className='showInfo accNumber'>
                    <span>Account Number: </span>
                    {props.openAcc.accNumber ? props.openAcc.accNumber : '-'}
                </p>
                <p className='showInfo accOpen'>
                    <span>Account Opened: </span>
                    {props.openAcc.accOpen ? new Date(props.openAcc.accOpen).toISOString().slice(0,10) : '-'}
                </p>
                
                {props.openAcc.accType !== 'Credit Card' &&
                    <p className='showInfo balance'>
                        <span>Balance: </span> 
                        {props.openAcc.balance >= 0 ? `$${props.openAcc.balance.toFixed(2)}` : `-$${Math.abs(props.openAcc.balance).toFixed(2)}`}
                    </p>
                }

                {props.openAcc.accType === 'Credit Card'
                    ? <>
                        <p className='showInfo creditLimit'> 
                            <span>Credit Limit: </span>
                            ${props.addComma(props.openAcc.creditLimit)}
                        </p>
                        <p className="showInfo availableCredit">
                            <span>Available Credit: </span>
                            {props.openAcc.availableCredit >= 0 ? `$${props.addComma(props.openAcc.availableCredit)}` : `-$${Math.abs(props.openAcc.availableCredit).toFixed(2)}`} 
                        </p>
                    </>
                : props.openAcc.accType === 'Loan'
                    ? <p className='showInfo loanAmount'>
                        <span>Loan Amount: </span>
                        ${props.addComma(props.openAcc.loanAmount)}
                    </p>
                    : <></>
                }
                {(props.openAcc.accType === 'Credit Card' || props.openAcc.accType === 'Loan') &&
                    <>
                        <p className='showInfo dueDate'>
                            <span>Due Date: </span>
                            {props.openAcc.dueDate ? getDate(props.openAcc.dueDate) : '-'}
                        </p>
                        <p className='showInfo minPayment'>
                            <span>Minimum Payment: </span>
                            {props.openAcc.minPayment ? `$${props.addComma(props.openAcc.minPayment.toFixed(2))}` : '-'}
                        </p>
                        <p className='showInfo interest'>
                            <span>Interest: </span>
                            {props.openAcc.interest ? `${props.openAcc.interest}%` : '-'}
                        </p>
                    </>
                }
            </div>        
        </div>
    )
}

export default ShowAccount;