import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { changeView } from "../../features/viewSlice";

import Edit from "../../common/Icon";
import Delete from "../../common/Icon";
import ParagraphSpan from "../../common/ParagraphSpan";

import "./Show.css"

const ShowAccount = (props) => {
    const dispatch = useDispatch();
    const {
        openAcc
    } = useSelector(store => store.account)
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
            url: `${props.server}/accounts/${openAcc._id}`,
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
                <i className="fi fi-rr-angle-small-left" onClick={() => dispatch(changeView({
                    accountView: {
                        view: "Account List"
                    }
                }))}/>
                <div>
                    <Edit className="fi fi-rr-edit" onClick={() => dispatch(changeView({
                    accountView: {
                        view: "Edit"
                    }
                }))}/>
                    <Delete className="fi fi-rr-trash" onClick={handleDelete}/>
                </div>
            </div>
            <div className="containerShowInner accounts">
                <ParagraphSpan className="show label accType" label="Account Type" value={openAcc.accType}/>
                <ParagraphSpan className="show label bank" label="Bank" value={openAcc.bank}/>
                <ParagraphSpan className="show label accNumber" label="Account Number" value={openAcc.accNumber ? openAcc.accNumber : '-'}/>
                <ParagraphSpan className="show label accOpen" label="Account Opened" value={openAcc.accOpen ? new Date(openAcc.accOpen).toISOString().slice(0,10) : '-'}/>
                {openAcc.accType !== 'Credit Card' && <ParagraphSpan className="show label balance" label="Balance" value= {openAcc.balance >= 0 ? `$${props.addComma(openAcc.balance)}` : `-$${props.addComma(Math.abs(openAcc.balance))}`}/>}
                {openAcc.accType === 'Credit Card'
                    ? <>
                        <ParagraphSpan className="show label creditLimit" label="Credit Limit" value={`$${props.addComma(openAcc.creditLimit)}`}/>
                        <ParagraphSpan className="show label availableCredit" label="Available Credit" value={openAcc.availableCredit >= 0 ? `$${props.addComma(openAcc.availableCredit)}` : `-$${Math.abs(openAcc.availableCredit).toFixed(2)}`} />
                    </>
                : openAcc.accType === 'Loan'
                    ? <ParagraphSpan className="show label loanAmount" label="Loan Amount" value={`$${props.addComma(openAcc.loanAmount)}`}/>
                    : <></>
                }
                {(openAcc.accType === 'Credit Card' || openAcc.accType === 'Loan') &&
                    <>
                        <ParagraphSpan className="show label dueDate" label="Due Date" value={openAcc.dueDate ? getDate(openAcc.dueDate) : '-'}/>
                        <ParagraphSpan className="show label minPayment" label="Minimum Payment" value={openAcc.minPayment ? `$${props.addComma(openAcc.minPayment.toFixed(2))}` : '-'}/>
                        <ParagraphSpan className="show label interest" label="Interest" value={openAcc.interest ? `${openAcc.interest}%` : '-'}/>
                    </>
                }
            </div>        
        </div>
    )
}

export default ShowAccount;