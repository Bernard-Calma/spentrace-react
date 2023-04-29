import axios from 'axios'
import { useState } from 'react'
import BackButton from '../../Components/Buttons/BackButton'
import './EditPlan.css'

const EditAccount = (props) => {
    const [editAccount, setEditAccount] = useState(props.openAcc)

    const handleChange=(e)=>{
        // e.target.style.backgroundColor = "" // remove color for empty input
        if (e.target.name === "expense") setEditAccount({...editAccount, [e.target.name]: e.target.value === "Expense" ? true : false})
        else setEditAccount({...editAccount, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(editAccount)
        axios({
            method: "PUT",
            url: `${props.server}/accounts/${props.openAcc._id}`,
            data: editAccount,
            withCredentials: true,
        })
        .then(res => {
            // console.log(res)
            props.update(res.data)
        })
        props.return()
    }

    return (
        <div className="editContainer">
            <div className='editHeader'>
                <BackButton handleChangeView = {props.return}/>
                <h2 className='editTitle'>Edit</h2>
            </div>
            <form className='addForm' onSubmit={handleSubmit}>
            <label htmlFor="repeat" className='formInput acc'>Account Type: {editAccount.accType}</label>
            {editAccount.accType &&
            <>
                <label htmlFor="bank" className='formInput acc'>
                    Bank: 
                    <input type="text" name="bank" id="addAccountBank" value={editAccount.bank} onChange={handleChange} required/>
                </label>
                <label htmlFor="accNumber" className='formInput acc'>
                    Account Number: 
                    <input type="text" name="accNumber" id="addAccountAccNumber" value={editAccount.accNumber} onChange={handleChange}/>
                </label>
                <label htmlFor="accOpen" className='formInput acc'>
                    Account Opened: 
                    <input type="date" name="accOpen" id="addAccountAccOpen" value={editAccount.accOpen ? new Date(editAccount.accOpen).toISOString().slice(0,10) : ''} onChange={handleChange}/>
                </label>
                {editAccount.accType !== "Credit Card" &&
                    <label htmlFor="balance" className='formInput acc'>
                        Balance: 
                        <input type="number" name="balance" step="0.01" id="addAccountBalance" value={editAccount.balance} onChange={handleChange} required/>
                    </label>
                }
                {editAccount.accType === "Credit Card"
                ? <>
                    <label htmlFor="creditLimit" className='formInput acc'>
                        Credit Limit: 
                        <input type="number" name="creditLimit" id="addAccountCreditLimit" value={editAccount.creditLimit} onChange={handleChange} required/>
                    </label>
                    <label htmlFor="availableCredit" className='formInput acc'>
                        Available Credit: 
                        <input type="number" name="availableCredit" step="0.01" id="addAvailableCredit" value={editAccount.availableCredit} onChange={handleChange}/>
                    </label> 
                </>
                : editAccount.accType === "Loan"
                ? <> 
                    <label htmlFor="loanAmount" className='formInput acc'>
                        Loan Amount: 
                        <input type="number" name="loanAmount" id="addLoanAmount" value={editAccount.loanAmount} onChange={handleChange} required/>
                    </label>
                </>
                : <> </>
                }
                {(editAccount.accType === "Credit Card" || editAccount.accType === "Loan") &&
                <>
                    <label htmlFor="dueDate" className='formInput acc'>
                        Due Date: 
                        <input type="date" name="dueDate" id="addAccDueDate" value={editAccount.dueDate ? new Date(editAccount.dueDate).toISOString().slice(0,10) : ''} onChange={handleChange}/>
                    </label>
                    <label htmlFor="minPayment" className='formInput acc'>
                        Minimum Payment: 
                        <input type="number" name="minPayment" step="0.01" id="addAccountMinPayment" value={editAccount.minPayment} onChange={handleChange}/>
                    </label>
                    <label htmlFor="interest" className='formInput acc'>
                        Interest: 
                        <input type="number" name="interest" step="0.01" id="addAccInterest" value={editAccount.interest} onChange={handleChange}/>
                    </label>
                </>
                }
            </> 
            }
            <input type="submit" name="submit" id="submit"/>
        </form>
        </div>
    )
}

export default EditAccount