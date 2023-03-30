import { useState } from 'react'
import BackButton from '../../Components/Buttons/BackButton'
import './Add.css'

const AddBill = (props) => {
    let [newPlan, setNewPlan] = useState({userId:props.user._id})

    const handleChange=(e)=>{
        if (e.target.name === "expense") setNewPlan({...newPlan, [e.target.name]: e.target.value === "Expense" ? true : false})
        else setNewPlan({...newPlan, [e.target.name]: e.target.value})
    }

    const handleSubmitAdd = (e) => {
        e.preventDefault();
        fetch(props.server+"/plans/", {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
        },
            body: JSON.stringify(newPlan)
        }).then(res => res.json())
        .then(data => props.addPlan(data))
        props.handleChangeView("Main")
    }
    return (
        <div className="addContainer">
            <div className='addHeader'>
                <BackButton handleChangeView = {() => props.handleChangeView("Bills List")}/>
                <h2 className='navTitle'>Add new bill</h2>
            </div>
            
            <form className='addBillForm' onSubmit={handleSubmitAdd}>
                <label htmlFor="dueDate" className='addBillFormInput'>
                    Due Date: 
                    <input type="date" name="dueDate" id="addBillDate" onChange={handleChange} required/>
                </label>
                <label htmlFor="name" className='addBillFormInput'>
                    Name: 
                    <input type="text" name="name" id="addBillName" onChange={handleChange} required/>
                </label>
                <label htmlFor="amount" className='addBillFormInput'>
                    Amount: 
                    <input type="number" name="amount" id="addBillAmount" onChange={handleChange} required/>
                </label>
                <label htmlFor="category" className='addBillFormInput'>
                    Category: 
                    <input type="text" name="category" id="addBillAmount" onChange={handleChange} />
                </label>
                <label htmlFor="autoPay" className='addBillFormInput'></label>
                <label htmlFor="autoPay" className='addBillFormInput'>
                    Autopay: 
                    <input type="checkbox" name="autoPay" id="addBillAmount" onChange={handleChange} />
                </label>
                <label htmlFor="repeat" className='addBillFormInput'>
                    Repeat: 
                    <select name="repeat" id="addBillRepeat" size='5' required>
                        <option value='never' className='repeatOption'>Never</option>
                        <option value='every week' className='repeatOptiom'>Every Week</option>
                        <option value='every 2 weeks' className='repeatOptiom'>Every 2 Weeks</option>
                        <option value='every month' className='repeatOptiom'>Every Month</option>
                        <option value='every 2 months' className='repeatOptiom'>Every 2 Months</option>
                    </select>
                </label>
                <span className = "expenseMessage" hidden>Select a transaction type above.</span>
                <textarea name="notes" id="addBillNotes" className='addBillFormNotes' placeholder='enter notes here' onChange={handleChange}></textarea>
                <input type="submit" name="submit" id="addBillFormSubmit" />
            </form>
        </div>
    )
}

export default AddBill