import { useState } from "react";
import BackButton from "../../Components/Buttons/BackButton";
import axios from "axios";

const AddAccount = (props) => {
    const accountType = ['','Checking', 'Savings', 'Credit Card', 'Loan']
    const [newAccount, setNewAccount] = useState({
        accType: '',
        bank: '',
        accNumber: '',
        accOpen: '',
        balance: '',
        creditLimit: '',
        availableCredit: '',
        dueDate: '',
        minPayment: '',
        interest: '',
        loanAmount: ''

    })

    const handleChange = (e) => {
        e.preventDefault()
        setNewAccount({...newAccount, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios({
            method: "POST",
            url: `${props.server}/accounts`,
            data: newAccount,
            withCredentials: true
        })
        .then(res => {
            console.log(res.data)
            props.handleAddAccount(res.data)
            props.back()
        })
        .catch(err => console.log(err))
    }
    return <div className="addContainer">
        <div className='addHeader'>
            <BackButton handleChangeView = {props.return}/>
            <h2 className='addTitle'>ADD NEW ACCOUNT</h2>
        </div>  
        <form className='addForm' onSubmit={handleSubmit}>
            <label htmlFor="repeat" className='formInput acc'>
                Account Type: 
                <select name="accType" id="accountType" size='1' value={newAccount.accountType} required onChange={handleChange}>
                    { accountType.map((option, index) => 
                        <option key={index} value={option} className='accType' >{option}</option>
                    )}
                </select>
            </label>
            {newAccount.accType &&
            <>
                <label htmlFor="bank" className='formInput acc'>
                    Bank: 
                    <input type="text" name="bank" id="addAccountBank" value={newAccount.bank} onChange={handleChange} required/>
                </label>
                <label htmlFor="accNumber" className='formInput acc'>
                    Account Number: 
                    <input type="text" name="accNumber" id="addAccountAccNumber" value={newAccount.accNumber} onChange={handleChange}/>
                </label>
                <label htmlFor="accOpen" className='formInput acc'>
                    Account Opened: 
                    <input type="date" name="accOpen" id="addAccountAccOpen" value={newAccount.accOpen} onChange={handleChange}/>
                </label>
                {newAccount.accType !== "Credit Card" &&
                    <label htmlFor="balance" className='formInput acc'>
                        Balance: 
                        <input type="number" name="balance" id="addAccountBalance" value={newAccount.balance} onChange={handleChange} required/>
                    </label>
                }
                {newAccount.accType === "Credit Card"
                ? <>
                    <label htmlFor="creditLimit" className='formInput acc'>
                        Credit Limit: 
                        <input type="number" name="creditLimit" id="addAccountCreditLimit" value={newAccount.creditLimit} onChange={handleChange} required/>
                    </label>
                    <label htmlFor="availableCredit" className='formInput acc'>
                        Available Credit: 
                        <input type="number" name="availableCredit" id="addAvailableCredit" value={newAccount.availableCredit} onChange={handleChange}/>
                    </label> 
                </>
                : newAccount.accType === "Loan"
                ? <> 
                    <label htmlFor="loanAmount" className='formInput acc'>
                        Loan Amount: 
                        <input type="number" name="loanAmount" id="addLoanAmount" value={newAccount.loanAmount} onChange={handleChange} required/>
                    </label>
                </>
                : <> </>
                }
                {(newAccount.accType === "Credit Card" || newAccount.accType === "Loan") &&
                <>
                    <label htmlFor="dueDate" className='formInput acc'>
                        Due Date: 
                        <input type="date" name="dueDate" id="addAccDueDate" value={newAccount.dueDate} onChange={handleChange}/>
                    </label>
                    <label htmlFor="minPayment" className='formInput acc'>
                        Minimum Payment: 
                        <input type="number" name="minPayment" id="addAccountMinPayment" value={newAccount.minPayment} onChange={handleChange}/>
                    </label>
                    <label htmlFor="interest" className='formInput acc'>
                        Interest: 
                        <input type="number" name="interest" id="addAccInterest" value={newAccount.interest} onChange={handleChange}/>
                    </label>
                </>
                }
            </> 
            }
            <input type="submit" name="submit" id="submit"/>
        </form>
    </div>
}

export default AddAccount;