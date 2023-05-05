import axios from 'axios'
import { useState } from 'react'
import BackButton from '../../Components/Buttons/BackButton'
import './EditPlan.css'
import LabelInput from '../../common/LabelInput';

const EditAccount = (props) => {
    const [editAccount, setEditAccount] = useState(props.openAcc);

    const handleChange= e => {
        // e.target.style.backgroundColor = "" // remove color for empty input
        if (e.target.name === "expense") setEditAccount({...editAccount, [e.target.name]: e.target.value === "Expense" ? true : false});
        else setEditAccount({...editAccount, [e.target.name]: e.target.value});
    }

    const handleSubmit = async e => {
        e.preventDefault();
        // console.log(editAccount)
        await axios({
            method: "PUT",
            url: `${props.server}/accounts/${props.openAcc._id}`,
            data: editAccount,
            withCredentials: true,
        })
        .then(res => {
            // console.log(res)
            props.update(res.data);
        });
        props.return();
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
                    <LabelInput 
                        tmlFor="bank" 
                        className='formInput acc'
                        text="Bank: "
                        type="text" 
                        name="bank" 
                        id="addAccountBank" 
                        value={editAccount.bank} 
                        onChange={handleChange} 
                        required
                    />

                    <LabelInput 
                        htmlFor="accNumber" 
                        className='formInput acc'
                        text="Account Number: "
                        type="text" 
                        name="accNumber" 
                        id="addAccountAccNumber" 
                        value={editAccount.accNumber} 
                        onChange={handleChange}
                    />

                    <LabelInput
                        htmlFor="accOpen" 
                        className='formInput acc'
                        text="Account Opened: "
                        type="date" 
                        name="accOpen" 
                        id="addAccountAccOpen" 
                        value={editAccount.accOpen ? new Date(editAccount.accOpen).toISOString().slice(0,10) : ''} 
                        onChange={handleChange}
                    />

                    {editAccount.accType !== "Credit Card" &&
                        <LabelInput 
                            htmlFor="balance" 
                            className='formInput acc'
                            text="Balance: "
                            type="number" 
                            name="balance" 
                            step="0.01" 
                            id="addAccountBalance" 
                            value={editAccount.balance} 
                            onChange={handleChange} 
                            required
                        />
                    }
                    {editAccount.accType === "Credit Card"
                        ? <>
                            <LabelInput 
                                htmlFor="creditLimit" 
                                className='formInput acc'
                                text="Credit Limit: "
                                type="number" 
                                name="creditLimit" 
                                id="addAccountCreditLimit" 
                                value={editAccount.creditLimit} 
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
                                value={editAccount.availableCredit} 
                                onChange={handleChange}
                            />
                        </>
                    : editAccount.accType === "Loan"
                        ?<LabelInput 
                            htmlFor="loanAmount" 
                            className='formInput acc'
                            text="Loan Amount: "
                            type="number"
                            name="loanAmount" 
                            id="addLoanAmount"
                            value={editAccount.loanAmount} 
                            onChange={handleChange} 
                            required
                        />
                    : <> </>
                    }
                    {(editAccount.accType === "Credit Card" || editAccount.accType === "Loan") &&
                        <>
                            <LabelInput 
                                htmlFor="dueDate" 
                                className='formInput acc'
                                text="Due Date: "
                                type="date"
                                name="dueDate" 
                                id="addAccDueDate" 
                                value={editAccount.dueDate ? new Date(editAccount.dueDate).toISOString().slice(0,10) : ''} 
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
                                value={editAccount.minPayment} 
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
                                value={editAccount.interest}
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