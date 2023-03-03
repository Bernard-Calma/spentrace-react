import { useState } from 'react'
import BackButton from '../../Components/Buttons/BackButton'
import './Add.css'

const Add = (props) => {
    let [newBill, setNewBill] = useState()

    const handleChange=(e)=>{
        if (e.target.name === "expense") setNewBill({...newBill, [e.target.name]: e.target.value === "Expense" ? true : false})
        setNewBill({...newBill, [e.target.name]: e.target.value})
    }

    const handleSubmitAdd = (e) => {
        e.preventDefault();
        fetch("http://192.168.1.80:8000/plans/", {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
        },
            body: JSON.stringify(newBill)
        })
    }
    return (
        <div className="addContainer">
            <div className='addHeader'>
                <BackButton handleChangeView = {() => props.handleChangeView("Main")}/>
                <h2 className='navTitle'>Add new bill</h2>
            </div>
            
            <form className='addForm' onSubmit={handleSubmitAdd}>
                <label htmlFor="date" className='addFormInput'>
                    Date: 
                    <input type="date" name="date" id="addDate" onChange={handleChange}/>
                </label>
                <label htmlFor="name" className='addFormInput'>
                    Name: 
                    <input type="text" name="name" id="addName" onChange={handleChange}/>
                </label>
                <label htmlFor="amount" className='addFormInput'>
                    Amount: 
                    <input type="number" name="amount" id="addAmount" onChange={handleChange}/>
                </label>
                <div className='radio'>
                    <label htmlFor="type" className='addFormInput'>
                        Income: 
                        <input type="radio" name="expense" id="addTypeIncome" value="Income" onChange={handleChange}/>
                    </label>
                        <label htmlFor="type" className='addFormInput'>
                        Expense: 
                        <input type="radio" name="expense" id="addTypeExpense" value="Expense" onChange={handleChange}/>
                </label>
                </div>
                <textarea name="notes" id="addNotes" className='addFormNotes' placeholder='enter notes here' onChange={handleChange}></textarea>
                <input type="submit" name="submit" id="addFormSubmit" />
            </form>
        </div>
    )
}

export default Add