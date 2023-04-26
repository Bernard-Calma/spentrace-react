import { useState } from "react";

const Account = (props) => {
    const getBalanceText = (balance) => {
        return balance >= 0 ? `$${Number(balance).toFixed(2)}` : `-$${Math.abs(balance).toFixed(2)}`
    } 

    const [account] = useState(props.account)
    const [balance, setBalance] = useState(props.account.balance)
    const [balanceText, setBalanceText] = useState(getBalanceText(props.account.balance))
    
    const handleChange = (e) => {
        // console.log(typeof(e.target.value))
        let value = e.target.value
        // setBalance(Number(value.replace('$','')))
        setBalanceText(e.target.value)
    }

    const updateBalance = (e) => {
        e.preventDefault()
        // console.log(e.target.value)
        if(e.target.value == 0) {
            setBalance(0)
            setBalanceText(getBalanceText(0))
        }
        else if(!Number(e.target.value)) setBalanceText(getBalanceText(balance))
        else {
            setBalance(Number(e.target.value))
            setBalanceText(getBalanceText(e.target.value))
        }
    }
    return <div className='bankContainer'>
        <div className='listContainer account bank'><h2 onClick={props.handleShowAcc}>{account.bank}</h2></div>
        <div className='listContainer account accountNumber'><h2>{account.accNumber}</h2></div>
        <div className='listContainer account accountBalance'>
            <input type="text" 
                className={balance > 0 ? "positive" : "negative"}
                onChange={handleChange}
                 onBlur={updateBalance}  
                value = {balanceText}
                style={style}
            />
            {/* {
                account.balance >= 0
                ? <h2 className="positive">${account.balance.toFixed(2)}</h2>
                : <h2 className="negative">-${Math.abs(account.balance).toFixed(2)}</h2>
            } */}
        </div>
    </div>
}

export default Account;

const style = {
    backgroundColor: "unset",
    border: "none",
    width: "100%",
    textAlign: "center",
    fontFamily: "Russo One",
    fontSize: 25,
}