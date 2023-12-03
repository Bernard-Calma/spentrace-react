import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateBalance } from "../../features/accountSlice";

const Account = (props) => {
    const dispatch = useDispatch();
    const getBalanceText = (balance) => {
        return balance >= 0 ? `$${Number(balance).toFixed(2)}` : `-$${Math.abs(balance).toFixed(2)}`;
    };
    const [balance, setBalance] = useState(props.account.balance);
    const [balanceText, setBalanceText] = useState(getBalanceText(props.account.balance));
    
    const handleChange = e => setBalanceText(e.target.value)

    const handleUpdateBalance = async e => {
        dispatch(updateBalance({
            id: props.account._id,
            newBalance: e.target.value
        }))
    };

    const updateBalanceTemp = e => {
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
        setBalance(props.account.balance)
    },[props.account.balance]);

    return (
        <div className='bankContainer'>
            <h2 className="bank name" onClick={props.handleShowAcc}>{props.account.bank}</h2>
            <input 
                type="text" 
                className={`bank balance ${balance > 0 ? "positive" : "negative"}`}
                onChange={handleChange}
                // Remove $ when clicked
                onFocus={(e) => setBalanceText(e.target.value.slice(1))}
                onBlur={updateBalanceTemp}  
                value = {balanceText}
            />
        </div> 
    );
};

export default Account;