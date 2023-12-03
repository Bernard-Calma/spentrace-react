import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeView } from '../../features/viewSlice'
import { editAccount, getAccounts } from '../../features/accountSlice'

import BackButton from '../../Components/Buttons/BackButton'
import LabelInput from '../../common/LabelInput';

import './EditPlan.css'

const EditAccount = () => {
    const dispatch = useDispatch();
    const {
        openAcc
    } = useSelector(store => store.account)
    const [account, setEditAccount] = useState(openAcc);

    const handleChange= e => {
        // e.target.style.backgroundColor = "" // remove color for empty input
        if (e.target.name === "expense") setEditAccount({...account, [e.target.name]: e.target.value === "Expense" ? true : false});
        else setEditAccount({...account, [e.target.name]: e.target.value});
    }

    const handleSubmit = async e => {
        e.preventDefault();
        // console.log(account)
        dispatch(editAccount(account))
        dispatch(changeView({
            accountView: {
                view: "Account List"
            }
        }))
        dispatch(getAccounts())
    }

    return (
        <div className="editContainer">
            <div className='editHeader'>
                <BackButton handleChangeView = {() => dispatch(changeView({
                    accountView: {
                        view: "Account List"
                    }
                }))}/>
                <h2 className='editTitle'>Edit</h2>
            </div>
            <form className='addForm' onSubmit={handleSubmit}>
                <label htmlFor="repeat" className='formInput acc'>Account Type: {account.accType}</label>
                {account.accType &&
                <>
                    <LabelInput 
                        tmlFor="bank" 
                        className='formInput acc'
                        text="Bank: "
                        type="text" 
                        name="bank" 
                        id="addAccountBank" 
                        value={account.bank} 
                        onChange={handleChange} 
                        required
                    />

                    <LabelInput
                        htmlFor="accOpen" 
                        className='formInput acc'
                        text="Account Opened: "
                        type="date" 
                        name="accOpen" 
                        id="addAccountAccOpen" 
                        value={account.accOpen ? new Date(account.accOpen).toISOString().slice(0,10) : ''} 
                        onChange={handleChange}
                    />

                    {account.accType !== "Credit Card" &&
                        <LabelInput 
                            htmlFor="balance" 
                            className='formInput acc'
                            text="Balance: "
                            type="number" 
                            name="balance" 
                            step={0.01}
                            id="addAccountBalance" 
                            value={account.balance} 
                            onChange={handleChange} 
                            required
                        />
                    }
                    {account.accType === "Credit Card"
                        ? <>
                            <LabelInput 
                                htmlFor="creditLimit" 
                                className='formInput acc'
                                text="Credit Limit: "
                                type="number" 
                                name="creditLimit" 
                                id="addAccountCreditLimit" 
                                value={account.creditLimit} 
                                onChange={handleChange} 
                                required
                            />
                                
                            <LabelInput 
                                htmlFor="availableCredit" 
                                className='formInput acc'
                                text="Available Credit: "
                                type="number" 
                                name="availableCredit" 
                                step="0.01" 
                                id="addAvailableCredit" 
                                value={account.availableCredit} 
                                onChange={handleChange}
                            />
                        </>
                    : account.accType === "Loan"
                        ?<LabelInput 
                            htmlFor="loanAmount" 
                            className='formInput acc'
                            text="Loan Amount: "
                            type="number"
                            name="loanAmount" 
                            id="addLoanAmount"
                            value={account.loanAmount} 
                            onChange={handleChange} 
                            required
                        />
                    : <> </>
                    }
                    {(account.accType === "Credit Card" || account.accType === "Loan") &&
                        <>
                            <LabelInput 
                                htmlFor="dueDate" 
                                className='formInput acc'
                                text="Due Date: "
                                type="date"
                                name="dueDate" 
                                id="addAccDueDate" 
                                value={account.dueDate ? new Date(account.dueDate).toISOString().slice(0,10) : ''} 
                                onChange={handleChange}
                            />

                            <LabelInput 
                                htmlFor="minPayment" 
                                className='formInput acc'
                                text="Minimum Payment: "
                                type="number"
                                name="minPayment"
                                step="0.01"
                                id="addAccountMinPayment" 
                                value={account.minPayment} 
                                onChange={handleChange}
                            />

                            <LabelInput 
                                htmlFor="interest"
                                className='formInput acc'
                                text="Interest: "
                                type="number"
                                name="interest"
                                step="0.01"
                                id="addAccInterest"
                                value={account.interest}
                                onChange={handleChange}
                            />
                        </>
                    }
                </> 
                }
                <LabelInput type="submit" name="submit" id="submit"/>
            </form>
        </div>
    );
};

export default EditAccount;