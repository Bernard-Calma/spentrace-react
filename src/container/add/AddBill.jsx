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
            
            <form className='addForm' onSubmit={handleSubmitAdd}>
                <label htmlFor="dueDate" className='addFormInput'>
                    Due Date: 
                    <input type="date" name="dueDate" id="addBillDate" onChange={handleChange} required/>
                </label>
                <label htmlFor="name" className='addFormInput'>
                    Name: 
                    <input type="text" name="name" id="addBillName" onChange={handleChange} required/>
                </label>
                <label htmlFor="amount" className='addFormInput'>
                    Amount: 
                    <input type="number" name="amount" id="addBillAmount" onChange={handleChange} />
                </label>
                <label htmlFor="category" className='addFormInput'>
                    Category: 
                    <input type="number" name="category" id="addBillAmount" onChange={handleChange} />
                </label>
                <label htmlFor="autoPay" className='addFormInput'></label>
                <label htmlFor="autoPay" className='addFormInput'>
                    Autopay: 
                    <input type="checkbox" name="autoPay" id="addBillAmount" onChange={handleChange} />
                </label>
                <label htmlFor="repeat" className='addFormInput'>
                    Repeat: 
                    <select name="repeat" id="addBillRepeat" size='5'>
                        <option value='never'>Never</option>
                        <option value='every week'>Every Week</option>
                        <option value='every 2 weeks'>Every 2 Weeks</option>
                        <option value='every month'>Every Month</option>
                        <option value='every 2 months'>Every 2 Months</option>
                    </select>
                </label>
                <span className = "expenseMessage" hidden>Select a transaction type above.</span>

                <textarea name="notes" id="addBillNotes" className='addFormNotes' placeholder='enter notes here' onChange={handleChange}></textarea>
                <input type="submit" name="submit" id="addBillFormSubmit" />
            </form>
        </div>
    )
}

export default AddBill