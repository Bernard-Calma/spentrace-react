import axios from "axios";
import { useEffect, useState } from "react";

const Account = (props) => {
    const getBalanceText = (balance) => {
        return balance >= 0 ? `$${Number(balance).toFixed(2)}` : `-$${Math.abs(balance).toFixed(2)}`;
    };
    const [balance, setBalance] = useState(props.account.balance);
    const [balanceText, setBalanceText] = useState(getBalanceText(props.account.balance));
    
    const handleChange = e => setBalanceText(e.target.value)

    const handleUpdateBalance = async e => {
        await axios({
            method: "PATCH",
            url: `${props.server}/accounts/${props.account._id}`,
            data: {balance: e.target.value},
            withCredentials: true
        })
        .then(res => {
            // console.log(res.data);
            props.update(res.data);
        })
        .catch(err => console.log(err));
    };

    const updateBalance = e => {
        e.preventDefault();
        // console.log(e.target.value);
        if(e.target.value === '0') {
            setBalance(0);
            setBalanceText(getBalanceText(0));
            handleUpdateBalance(e);
        }
        else if(!Number(e.target.value)) {
            // console.log("Number Check");
            setBalanceText(getBalanceText(balance));
        }
        else {
            // console.log("update");
            setBalance(Number(e.target.value));
            setBalanceText(getBalanceText(e.target.value));
            handleUpdateBalance(e);
        };
    };
    useEffect(() => {
        setBalanceText(getBalanceText(props.account.balance));
    },[props.account.balance]);

    return (
        <div className='bankContainer'>
            <h2 className="account bank" onClick={props.handleShowAcc}>{props.account.bank}</h2>
            <h2 className="account account number">{props.account.accNumber ? `...${props.account.accNumber.slice(-4)}` : '-'}</h2>
            <input 
                type="text" 
                className={`account balance ${balance > 0 ? "positive" : "negative"}`}
                onChange={handleChange}
                // Remove $ when clicked
                onFocus={(e) => setBalanceText(e.target.value.slice(1))}
                onBlur={updateBalance}  
                value = {balanceText}
            />
        </div> 
    );
};

export default Account;