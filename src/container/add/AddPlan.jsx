import { useState } from 'react'
import axios from 'axios'
import BackButton from '../../Components/Buttons/BackButton'
import './Add.css'

const AddPlan = (props) => {
    const [newPlan, setNewPlan] = useState({userId: props.user.id})

    const handleChange=(e)=>{
        // Handle input changes
        // If expense or income changed return true or false
        if (e.target.name === "expense") setNewPlan({...newPlan, [e.target.name]: e.target.value === "Expense" ? true : false})
        else setNewPlan({...newPlan, [e.target.name]: e.target.value})
    }

    const handleSubmitAdd = (e) => {
        e.preventDefault();
        axios({
            method: "POST",
            url: `${props.server}/plans/`,
            data: newPlan,
            withCredentials: true
        })
        .then(res => props.addNewPlan(res.data))
        props.handleChangeView("Main")
    }
    return (
        <div className="addContainer">
            <div className='addHeader'>
                <BackButton 
                    handleChangeView = {props.handleChangeView}
                />
                <h2 className='addTitle'>ADD NEW PLAN</h2>
            </div>
            
            <form className='addForm' onSubmit={handleSubmitAdd}>
                <label htmlFor="date" className='addFormInput'>
                    Date: 
                    <input type="date" name="date" id="addDate" onChange={handleChange} required/>
                </label>
                <label htmlFor="name" className='addFormInput'>
                    Name: 
                    <input type="text" name="name" id="addName" onChange={handleChange} required/>
                </label>
                <label htmlFor="amount" className='addFormInput'>
                    Amount: 
                    <input type="number" name="amount" id="addAmount" onChange={handleChange} />
                </label>
                <div className='radio'>
                    <label htmlFor="type" className='addFormInput'>
                        Income: 
                        <input type="radio" name="expense" id="addTypeIncome" value="Income" onChange={handleChange} required/>
                    </label>
                        <label htmlFor="type" className='addFormInput'>
                        Expense: 
                        <input type="radio" name="expense" id="addTypeExpense" value="Expense" onChange={handleChange} required/>
                    </label>
                </div>
                <span className = "expenseMessage" hidden>Select a transaction type above.</span>

                <textarea name="notes" id="addNotes" className='addFormNotes' placeholder='enter notes here' onChange={handleChange}></textarea>
                <input type="submit" name="submit" id="addFormSubmit" />
            </form>
        </div>
    )
}

export default AddPlan