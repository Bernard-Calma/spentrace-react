import { useState } from "react";
import BackButton from "../../Components/Buttons/BackButton";

const AddAccount = (props) => {
    const accountType = ['','Checking', 'Savings', 'Credit Card', 'Loan']
    const [newAccount, setNewAccount] = useState({})

    const handleChange = (e) => {
        e.preventDefault()
        if (accountType !== "Credit Card" || accountType !== "Loan") {
            delete newAccount.creditLimit
            delete newAccount.availableCredit
            delete newAccount.dueDate
            delete newAccount.minPayment
            delete newAccount.interest
        }
        setNewAccount({...newAccount, [e.target.name]: e.target.value})
    }
    return <div className="addContainer">
        <div className='addHeader'>
            <BackButton handleChangeView = {props.back}/>
            <h2 className='addTitle'>ADD NEW ACCOUNT</h2>
        </div>  
        <form className='addForm'>
            <label htmlFor="repeat" className='formInput acc'>
                Account Type: 
                <select name="accountType" id="accountType" size='1' required onChange={handleChange}>
                    {
                        accountType.map((option, index) => 
                            <option key={index} value={option} className='accountType' >{option}</option>
                    )}
                </select>
            </label>
            {
                newAccount.accountType &&
                <>
                    <label htmlFor="bank" className='formInput acc'>
                        Bank: 
                        <input type="text" name="bank" id="addAccountBank" value={newAccount.bank} onChange={handleChange} required/>
                    </label>
                    <label htmlFor="accNumber" className='formInput acc'>
                        Account Number: 
                        <input type="text" name="accNumber" id="addAccountAccNumber" value={newAccount.accNumber} onChange={handleChange}/>
                    </label>
                    <label htmlFor="accOpened" className='formInput acc'>
                        Account Opened: 
                        <input type="date" name="accOpened" id="addAccountAccOpened" value={newAccount.accOpen} onChange={handleChange}/>
                    </label>
                    {
                        newAccount.accountType !== "Credit Card" &&
                        <label htmlFor="balance" className='formInput acc'>
                            Balance: 
                            <input type="number" name="balance" id="addAccountBalance" value={newAccount.balance} onChange={handleChange} required/>
                        </label>
                    }
                    {
                    newAccount.accountType === "Credit Card"
                    ? <>
                        <label htmlFor="creditLimit" className='formInput acc'>
                            Credit Limit: 
                            <input type="number" name="creditLimit" id="addAccountCreditLimit" value={newAccount.creditLimit} onChange={handleChange} requiired/>
                        </label>
                        <label htmlFor="availableCredit" className='formInput acc'>
                            Available Credit: 
                            <input type="number" name="availableCredit" id="addAvailableCredit" value={newAccount.availableCredit} onChange={handleChange} requiired/>
                        </label> 
                    </>
                    : newAccount.accountType === "Loan"
                    ? <> 
                        <label htmlFor="loanAmount" className='formInput acc'>
                            Loan Amount: 
                            <input type="number" name="loanAmount" id="addLoanAmount" value={newAccount.loanAmount} onChange={handleChange} requiired/>
                        </label>
                    </>
                    : <> </>
                    }
                    {
                        (newAccount.accountType === "Credit Card" || newAccount.accountType === "Loan") &&
                        <>
                        <label htmlFor="dueDate" className='formInput acc'>
                            Due Date: 
                            <input type="date" name="dueDate" id="addAccDueDate" value={newAccount.dueDate} onChange={handleChange}/>
                        </label>
                        <label htmlFor="minPayment" className='formInput acc'>
                            Minimum Payment: 
                            <input type="number" name="minPayment" id="addAccountMinPayment" value={newAccount.minPayment} onChange={handleChange} requiired/>
                        </label>
                        <label htmlFor="interest" className='formInput acc'>
                            Interest: 
                            <input type="number" name="interest" id="addAccInterest" value={newAccount.interest} onChange={handleChange} requiired/>
                        </label>
                        </>
                    }
                    
                </> 
            }
        </form>
    </div>
}

export default AddAccount;