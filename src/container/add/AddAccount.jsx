import { useState } from "react";
import { useDispatch } from "react-redux";
import BackButton from "../../Components/Buttons/BackButton";
import axios from "axios";
import LabelInput from "../../common/LabelInput";
import { changeView } from "../../features/viewSlice";

const AddAccount = (props) => {
    const dispatch = useDispatch();
    const accountType = ['','Checking', 'Savings', 'Credit Card', 'Loan'];
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
    });

    const handleChange = e => setNewAccount({...newAccount, [e.target.name]: e.target.value});
    

    const handleSubmit = e => {
        e.preventDefault();
        axios({
            method: "POST",
            url: `${props.server}/accounts`,
            data: newAccount,
            withCredentials: true
        })
        .then(res => {
            // console.log(res.data)
            props.add(res.data);
            props.return();
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="addContainer">
            <div className='addHeader'>
                <BackButton handleChangeView = {() => dispatch(changeView({
                    accountView: {
                        view: "Account List"
                    }
                }))}/>
                <h2 className='addTitle'>ADD NEW ACCOUNT</h2>
            </div>  
            <form className='addForm'onSubmit={handleSubmit}>
                <label 
                    htmlFor="repeat" 
                    className='formInput acc'
                > Account Type: 
                    <select 
                        name="accType" 
                        id="accountType" 
                        size='1' 
                        value={newAccount.accountType} 
                        onChange={handleChange}
                        required
                    >
                        {accountType.map((option, index) => <option key={index} value={option} className='accType'>{option}</option>)}
                    </select>
                </label>
                {newAccount.accType &&
                    <>
                        <LabelInput 
                            htmlFor="bank" 
                            className='formInput acc'
                            text="Bank: "
                            type="text" 
                            name="bank" 
                            id="addAccountBank" 
                            value={newAccount.bank} 
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
                            value={newAccount.accNumber} 
                            onChange={handleChange}
                        />

                        <LabelInput 
                            htmlFor="accOpen" 
                            className='formInput acc'
                            text="Account Opened: "
                            type="date" 
                            name="accOpen" 
                            id="addAccountAccOpen" 
                            value={newAccount.accOpen} 
                            onChange={handleChange}
                        />

                        {newAccount.accType !== "Credit Card" &&
                            <LabelInput 
                                htmlFor="balance" 
                                className='formInput acc'
                                text="Balance: "
                                type="number" 
                                step="0.01" 
                                name="balance" 
                                id="addAccountBalance" 
                                value={newAccount.balance} 
                                onChange={handleChange} 
                                required
                            />
                        }

                        {newAccount.accType === "Credit Card"
                            ? <>
                                <LabelInput 
                                    htmlFor="creditLimit" 
                                    className='formInput acc'
                                    text="Credit Limit: "
                                    type="number" 
                                    step="0.01" 
                                    name="creditLimit" 
                                    id="addAccountCreditLimit" 
                                    value={newAccount.creditLimit} 
                                    onChange={handleChange} 
                                    required
                                />
                                
                                <LabelInput 
                                    htmlFor="availableCredit" 
                                    className='formInput acc'
                                    text="Available Credit: "
                                    type="number" 
                                    step="0.01" 
                                    name="availableCredit" 
                                    id="addAvailableCredit" 
                                    value={newAccount.availableCredit} 
                                    onChange={handleChange}
                                />
                            </>
                            : newAccount.accType === "Loan"
                            ?<LabelInput 
                                htmlFor="loanAmount" 
                                className='formInput acc'
                                text="Loan Amount: "
                                type="number" 
                                step="0.01" 
                                name="loanAmount" 
                                id="addLoanAmount" 
                                value={newAccount.loanAmount} 
                                onChange={handleChange} 
                                required
                            />
 
                            : <> </>
                        }
                        {(newAccount.accType === "Credit Card" || newAccount.accType === "Loan") &&
                            <>
                                <LabelInput 
                                    htmlFor="dueDate" 
                                    className='formInput acc'
                                    text="Due Date: "
                                    type="date" 
                                    name="dueDate" 
                                    id="addAccDueDate" 
                                    value={newAccount.dueDate} 
                                    onChange={handleChange}
                                />
                                
                                <LabelInput 
                                    htmlFor="minPayment" 
                                    className='formInput acc'
                                    text="Minimum Payment: "
                                    type="number" 
                                    step="0.01" 
                                    name="minPayment" 
                                    id="addAccountMinPayment" 
                                    value={newAccount.minPayment} 
                                    onChange={handleChange}
                                />
                                
                                <LabelInput 
                                    htmlFor="interest" 
                                    className='formInput acc'
                                    text="Interest: "
                                    type="number" 
                                    step="0.01" 
                                    name="interest" 
                                    id="addAccInterest" 
                                    value={newAccount.interest} 
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

export default AddAccount;