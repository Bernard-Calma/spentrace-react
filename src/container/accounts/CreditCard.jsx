import { useState } from "react";

const CreditCard = (props) => {
    const [account] = useState(props.account)
    return <div className='bankContainer'>
        <div className='listContainer credit bank'><h2>{account.bank}</h2></div>
        <div className='listContainer credit accountNumber'><h2>{account.accountNumber}</h2></div>
        <div className='listContainer credit availableCredit'><h2>${account.availableCredit.toFixed(2)}</h2></div>
        <div className='listContainer credit creditBalance'><h2>${account.balance.toFixed(2)}</h2></div>
        <div className='listContainer credit minimumPayment'><h2>${account.minimumPayment.toFixed(2)}</h2></div>
        <div className='listContainer credit dueDate'><h2>{account.dueDate}</h2></div>
        <div className='listContainer credit interest'><h2>{account.interest}%</h2></div>
        <div className='listContainer credit usage'>
            {
                account.balance / account.creditLimit * 100 <= 30
                ? <h2 className="positive">{account.balance / account.creditLimit * 100}%</h2>
                : <h2 className="negative">{account.balance / account.creditLimit * 100}%</h2>
            }
            </div>
    </div>
}

export default CreditCard;