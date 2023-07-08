import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlan, getPlans } from '../../features/planSlice';
import { changeView } from '../../features/viewSlice';

import BackButton from '../../Components/Buttons/BackButton';
import LabelInput from '../../common/LabelInput';

import './Add.css';

const AddPlan = () => {
    const dispatch = useDispatch();
    const {
        username
    } = useSelector(store => store.user)
    const {
        isLoading
    } = useSelector(store => store.plan)
    const [newPlan, setNewPlan] = useState({
        userId: username,
        amount: 0,
    });
    const handleChange = e => {
        // Handle input changes
        // If expense or income changed return true or false
        if (e.target.name === "expense") setNewPlan({...newPlan, [e.target.name]: e.target.value === "Expense" ? true : false});
        else setNewPlan({...newPlan, [e.target.name]: e.target.value});
    };

    const handleChangeAmount = e => {
        // Handle all restrictions in amount
        if (!e.target.value) console.log("000")
        if (
            // Amount must be lower than 10000.
            parseInt(e.target.value) <= 9999 && 
            // Amount length should not exceed 7 characters
            e.target.value.length <= 7)
            setNewPlan({...newPlan, amount: e.target.value});
    }

    const handleSubmitAdd = e => {
        e.preventDefault();
        dispatch(addPlan(newPlan));
        dispatch(getPlans())
        dispatch(changeView({planView: "Plan List"}))
    };

    return (
        <div className="addContainer">
            <div className='addHeader'>
                <BackButton 
                    handleChangeView = {() => dispatch(changeView({planView: "Plan List"}))}
                />
                <h2 className='addTitle'>ADD NEW PLAN</h2>
            </div>
            
            <form className='addForm' onSubmit={handleSubmitAdd}>
                
                <input 
                    type="number" 
                    className='amount' 
                    name="amount" 
                    id="addAmount" 
                    placeholder='0.00' 
                    min="-5000" 
                    max="5000" 
                    value={newPlan.amount}
                    onChange={handleChangeAmount}
                    step={0.01}
                    required
                    />

                <LabelInput 
                    htmlFor="date" 
                    className='formInput'
                    text="Date: "
                    type="date" 
                    name="date" 
                    id="addDate" 
                    onChange={handleChange} 
                    required
                />
                
                <LabelInput 
                    htmlFor="name" 
                    className='formInput'
                    text="Name: "
                    type="text" 
                    name="name" 
                    id="addName" 
                    onChange={handleChange} 
                    required
                />

                
                
                <div className='radio'>
                    <LabelInput 
                        htmlFor="type" 
                        className='formInput'
                        text="Income: "
                        type="radio" 
                        name="expense" 
                        id="addTypeIncome" 
                        value="Income" 
                        onChange={handleChange} 
                        required
                    />

                    <LabelInput 
                        htmlFor="type" 
                        className='formInput'
                        text="Expense: "
                        type="radio" 
                        name="expense" 
                        id="addTypeExpense" 
                        value="Expense" 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <span className = "expenseMessage" hidden>Select a transaction type above.</span>
                <textarea 
                    name="notes" 
                    id="addNotes" 
                    className='formNotes'
                    placeholder='enter notes here' 
                    onChange={handleChange}
                />
                <LabelInput 
                    className = {isLoading ? `${isLoading} disabled` : `${isLoading}`}
                    disabled = {isLoading}
                    type="submit" 
                    name="submit" 
                    id="submit" />
            </form>
        </div>
    );
};

export default AddPlan;