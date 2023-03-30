import { useState } from 'react'
import BackButton from '../../Components/Buttons/BackButton'
import './Add.css'
import axios from 'axios'

const AddBill = (props) => {
    let [newBill, setNewBill] = useState({
        autopay: false,
        userId: props.user._id
    })
    const handleChange=(e)=>{
        if (e.target.name === "autopay") setNewBill({...newBill, [e.target.name]: e.target.checked})
        else setNewBill({...newBill, [e.target.name]: e.target.value})
        
    }

    const handleSubmitAdd = (e) => {
        e.preventDefault();
        axios.post(`${props.server}/bills`, newBill)
        .catch(err => console.log(err))
        props.handleChangeView("Bills List")
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
                    <input type="checkbox" name="autopay" id="addBillAmount" onChange={handleChange} />
                </label>
                <label htmlFor="repeat" className='addBillFormInput'>
                    Repeat: 
                    <select name="repeat" id="addBillRepeat" size='5' required onChange={handleChange}>
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