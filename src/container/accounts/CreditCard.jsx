import { useState } from "react";

const CreditCard = (props) => {
    const [account] = useState(props.account);
    const [balance] = useState(account.creditLimit - account.availableCredit);
    return (
        <div className='bankContainer'>
            <h2 className="bank bank" onClick={props.handleShowAcc}>{account.bank}</h2>
            <h2 className="bank available credit">{account.availableCredit >= 0 ? `$${props.addComma(account.availableCredit.toFixed(2))}` : `-$${Math.abs(props.addComma(account.availableCredit)).toFixed(2)}`}</h2>
            <h2 className="bank min payment">{account.minPayment ? `$${account.minPayment.toFixed(2)}` : '-'}</h2>
            {(balance / account.creditLimit * 100) <= 30
                ? <h2 className="bank usage positive">{(balance / account.creditLimit * 100).toFixed(2)}%</h2>
                : <h2 className="bank usage negative">{(balance / account.creditLimit * 100).toFixed(2)}%</h2>
            }
            <h2 className="bank full account number">{account.accNumber ? account.accNumber : '-'}</h2>
            <h2 className="bank full balance">${props.addComma(balance)}</h2>
            <h2 className="bank full due date">{account.dueDate ? `${new Date(account.dueDate).getUTCDate()}` : '-'}</h2>
            <h2 className="bank full interest">{account.interest ? `${account.interest}%` : '-'}</h2>
            
        </div>
    );
};

export default CreditCard;