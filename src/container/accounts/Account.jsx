import { useState } from "react";

const Account = (props) => {
    const [account] = useState(props.account)
    return <div className='bankContainer'>
        <div className='listContainer account bank'><h2 onClick={props.handleShowAcc}>{account.bank}</h2></div>
        <div className='listContainer account accountNumber'><h2>{account.accNumber}</h2></div>
        <div className='listContainer account accountBalance'>
            {
                account.balance >= 0
                ? <h2 className="positive">${account.balance.toFixed(2)}</h2>
                : <h2 className="negative">-${Math.abs(account.balance).toFixed(2)}</h2>
            }
        </div>
    </div>
}

export default Account;