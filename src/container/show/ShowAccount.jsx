import axios from "axios"
import "./Show.css"
import Edit from "../../common/Icon";
import Delete from "../../common/Icon";
import ParagraphSpan from "../../common/ParagraphSpan";

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
                <i className="fi fi-rr-angle-small-left" onClick={props.return}/>
                <div>
                    <Edit className="fi fi-rr-edit" onClick={props.edit}/>
                    <Delete className="fi fi-rr-trash" onClick={handleDelete}/>
                </div>
            </div>
            <div className="containerShowInner accounts">
                <ParagraphSpan className="show label accType" label="Account Type" value={props.openAcc.accType}/>
                <ParagraphSpan className="show label bank" label="Bank" value={props.openAcc.bank}/>
                <ParagraphSpan className="show label accNumber" label="Account Number" value={props.openAcc.accNumber ? props.openAcc.accNumber : '-'}/>
                <ParagraphSpan className="show label accOpen" label="Account Opened" value={props.openAcc.accOpen ? new Date(props.openAcc.accOpen).toISOString().slice(0,10) : '-'}/>
                {props.openAcc.accType !== 'Credit Card' && <ParagraphSpan className="show label balance" label="Balance" value= {props.openAcc.balance >= 0 ? `$${props.addComma(props.openAcc.balance)}` : `-$${props.addComma(Math.abs(props.openAcc.balance))}`}/>}
                {props.openAcc.accType === 'Credit Card'
                    ? <>
                        <ParagraphSpan className="show label creditLimit" label="Credit Limit" value={`$${props.addComma(props.openAcc.creditLimit)}`}/>
                        <ParagraphSpan className="show label availableCredit" label="Available Credit" value={props.openAcc.availableCredit >= 0 ? `$${props.addComma(props.openAcc.availableCredit)}` : `-$${Math.abs(props.openAcc.availableCredit).toFixed(2)}`} />
                    </>
                : props.openAcc.accType === 'Loan'
                    ? <ParagraphSpan className="show label loanAmount" label="Loan Amount" value={`$${props.addComma(props.openAcc.loanAmount)}`}/>
                    : <></>
                }
                {(props.openAcc.accType === 'Credit Card' || props.openAcc.accType === 'Loan') &&
                    <>
                        <ParagraphSpan className="show label dueDate" label="Due Date" value={props.openAcc.dueDate ? getDate(props.openAcc.dueDate) : '-'}/>
                        <ParagraphSpan className="show label minPayment" label="Minimum Payment" value={props.openAcc.minPayment ? `$${props.addComma(props.openAcc.minPayment.toFixed(2))}` : '-'}/>
                        <ParagraphSpan className="show label interest" label="Interest" value={props.openAcc.interest ? `${props.openAcc.interest}%` : '-'}/>
                    </>
                }
            </div>        
        </div>
    )
}

export default ShowAccount;