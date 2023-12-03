import { useState } from "react";

const CreditCard = (props) => {
    const [balance] = useState(props.account.creditLimit - props.account.availableCredit);
    return (
        <div className='bankContainer'>
            <h2 className="bank name" onClick={props.handleShowAcc}>{props.account.bank}</h2>
            <h2 className="bank available credit">{props.account.availableCredit >= 0 ? `$${props.addComma(props.account.availableCredit.toFixed(2))}` : `-$${Math.abs(props.addComma(props.account.availableCredit)).toFixed(2)}`}</h2>
            <h2 className="bank min payment">{props.account.minPayment ? `$${props.account.minPayment.toFixed(2)}` : '-'}</h2>
            {(balance / props.account.creditLimit * 100) <= 30
                ? <h2 className="bank usage positive">{(balance / props.account.creditLimit * 100).toFixed(2)}%</h2>
                : <h2 className="bank usage negative">{(balance / props.account.creditLimit * 100).toFixed(2)}%</h2>
            }
            <h2 className="bank full balance">${props.addComma(balance)}</h2>
            <h2 className="bank full due date">{props.account.dueDate ? `${new Date(props.account.dueDate).getUTCDate()}` : '-'}</h2>
            <h2 className="bank full interest">{props.account.interest ? `${props.account.interest}%` : '-'}</h2>

        </div>
    );
};

export default CreditCard;