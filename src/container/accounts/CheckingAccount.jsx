import { useState } from "react";

const CheckingAccount = (props) => {
    const [account] = useState(props.account)
    return <div className='accountContainer'>
        <div className='listContainer checking bank'><h2>{account.bank}</h2></div>
        <div className='listContainer checking accountNumber'><h2>{account.accountNumber}</h2></div>
        <div className='listContainer checking accountBalance'>
            {
                account.balance >= 0
                ? <h2 className="positive">${account.balance.toFixed(2)}</h2>
                : <h2 className="negative">-${Math.abs(account.balance.toFixed(2))}</h2>
            }
        </div>
    </div>
}

export default CheckingAccount;