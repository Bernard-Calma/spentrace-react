import { useState } from "react";

const CheckingAccount = (props) => {
    const [account] = useState(props.account)
    return <div className='accountContainer'>
        <div className='listContainer bank'><h2>{account.bank}</h2></div>
        <div className='listContainer accountNumber'><h2>{account.accountNumber}</h2></div>
        <div className='listContainer accountBalance'><h2>{account.balance}</h2></div>
        <div className='listContainer type'><h2>{account.type}</h2></div>
    </div>
}

export default CheckingAccount;