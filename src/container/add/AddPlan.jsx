import { useState } from 'react';
import axios from 'axios';
import './Add.css';
import BackButton from '../../Components/Buttons/BackButton';
import LabelInput from '../../common/LabelInput';

const AddPlan = (props) => {
    const [newPlan, setNewPlan] = useState({userId: props.user.username});
    const [submitStatus, setSubmitStatus] = useState(false)
    const handleChange = e => {
        // Handle input changes
        // If expense or income changed return true or false
        if (e.target.name === "expense") setNewPlan({...newPlan, [e.target.name]: e.target.value === "Expense" ? true : false});
        else setNewPlan({...newPlan, [e.target.name]: e.target.value});
    };

    const handleChangeAmount = e => {
        if (parseInt(e.target.value) <= 9999 && e.target.value.length <= 7)
            setNewPlan({...newPlan, [e.target.name]: e.target.value});
    }

    const handleSubmitAdd = async e => {
        e.preventDefault();
        await axios({
            method: "POST",
            url: `${props.server}/plans/`,
            data: newPlan,
            withCredentials: true
        })
        .then(res => {
                setSubmitStatus(true)
                props.addNewPlan(res.data)
            }
             );
        props.handleChangeView("Main");
    };

    return (
        <div className="addContainer">
            <div className='addHeader'>
                <BackButton 
                    handleChangeView = {props.handleChangeView}
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
                    className = {submitStatus && "disabled"}
                    disabled = {submitStatus}
                    type="submit" 
                    name="submit" 
                    id="submit" />
            </form>
        </div>
    );
};

export default AddPlan;