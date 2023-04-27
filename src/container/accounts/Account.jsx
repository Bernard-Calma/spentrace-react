import axios from "axios";
import { useEffect, useState } from "react";

const Account = (props) => {
    const getBalanceText = (balance) => {
        return balance >= 0 ? `$${Number(balance).toFixed(2)}` : `-$${Math.abs(balance).toFixed(2)}`
    } 
    const [balance, setBalance] = useState(props.account.balance)
    const [balanceText, setBalanceText] = useState(getBalanceText(props.account.balance))
    
    const handleChange = (e) => {
        // console.log(typeof(e.target.value))
        let value = e.target.value
        // setBalance(Number(value.replace('$','')))
        setBalanceText(e.target.value)
    }

    const handleUpdateBalance = (e) => {
        axios({
            method: "PATCH",
            url: `${props.server}/accounts/${props.account._id}`,
            data: {balance: e.target.value},
            withCredentials: true
        })
        .then(res => {
            console.log(res.data)
            props.update(res.data)
        })
        .catch(err => console.log(err))
    }

    const updateBalance = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        if(e.target.value == 0) {
            setBalance(0)
            setBalanceText(getBalanceText(0))
            handleUpdateBalance(e)
        }
        else if(!Number(e.target.value)) {
            console.log("Number Check")
            setBalanceText(getBalanceText(balance))
        }
        else {
            console.log("update")
            setBalance(Number(e.target.value))
            setBalanceText(getBalanceText(e.target.value))
            handleUpdateBalance(e)
        }
    }
    useEffect(() => {
        setBalanceText(getBalanceText(props.account.balance))
    },[props.account.balance])
    return <div className='bankContainer'>
        <div className='listContainer account bank'><h2 onClick={props.handleShowAcc}>{props.account.bank}</h2></div>
        <div className='listContainer account accountNumber'><h2>{props.account.accNumber}</h2></div>
        <div className='listContainer account accountBalance'>
            <input type="text" 
                className={balance > 0 ? "positive" : "negative"}
                onChange={handleChange}
                // Remove $ when clicked
                onFocus={(e) => setBalanceText(e.target.value.slice(1))}
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