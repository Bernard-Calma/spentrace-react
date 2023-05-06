import { useState } from "react";

const Loan = (props) => {
    const [account] = useState(props.account);
    const [paid] = useState((account.loanAmount - account.balance) / account.loanAmount  * 100);
    const addComma = numToString => {
        numToString = numToString.toFixed(2).toString();
        for (let i = numToString.length - 6; i >= 0; i -= 3  ) {
            numToString = numToString.slice(0,i) + ',' + numToString.slice(i);
        };
        return numToString;
    };

    return (
        <div className='bankContainer'>
            <h2 className="bank name" onClick={props.handleShowAcc}>{account.bank}</h2>
            <h2 className="bank balance">${addComma(account.balance)}</h2>
            <h2 className="bank min payment">${account.minPayment.toFixed(2)}</h2>
            <h2 className="bank due date">{new Date(account.dueDate).getUTCDate()}</h2>
            <h2 className="bank paid">{paid.toFixed(2)}%</h2>
            <h2 className="bank full loan amount">${addComma(account.loanAmount)}</h2>
            <h2 className="bank full interest">{account.interest ? `${account.interest}%` : '-' }</h2>  
        </div>
    );
};

export default Loan;