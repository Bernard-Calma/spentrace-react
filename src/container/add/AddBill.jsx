import { useState } from 'react'
import BackButton from '../../Components/Buttons/BackButton'
import './Add.css'
import axios from 'axios'

const AddBill = (props) => {
    let [newBill, setNewBill] = useState({
        autopay: false,
        repeat: "never",
        userId: props.user.id
    })
    const handleChange=(e)=>{
        if (e.target.name === "autopay") setNewBill({...newBill, [e.target.name]: e.target.checked})
        else setNewBill({...newBill, [e.target.name]: e.target.value})
        
    }

    const handleSubmitAdd = (e) => {
        e.preventDefault();
        console.log(newBill)
        axios({
            method: "POST",
            url: `${props.server}/bills/`,
            data: newBill,
            withCredentials: true
        })
        .then(res => props.addNewBill(res.data))
        props.handleChangeView("Main")
    }
    return (
        <div className="addContainer">
            <div className='addHeader'>
                <BackButton handleChangeView = {props.handleChangeView}/>
                <h2 className='addTitle'>ADD NEW BILL</h2>
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
                    <input type="number" name="amount" id="addBillAmount" onChange={handleChange} required/>
                </label>
                <label htmlFor="category" className='addFormInput'>
                    Category: 
                    <input type="text" name="category" id="addBillAmount" onChange={handleChange} />
                </label>
                <label htmlFor="repeat" className='addFormInput'>
                    Repeat: 
                    <select name="repeat" id="addBillRepeat" size='1' required onChange={handleChange}>
                        <option value='never' className='repeatOption'>Never</option>
                        <option value='every week' className='repeatOption'>Every Week</option>
                        <option value='every 2 weeks' className='repeatOption'>Every 2 Weeks</option>
                        <option value='every month' className='repeatOption'>Every Month</option>
                        <option value='every 2 months' className='repeatOption'>Every 2 Months</option>
                    </select>
                </label>
                <label htmlFor="autoPay" className='addFormInput'>
                    Autopay: 
                    <input type="checkbox" name="autopay" id="addBillAmount" onChange={handleChange} />
                </label>
                <span className = "expenseMessage" hidden>Select a transaction type above.</span>
                <textarea name="notes" id="addBillNotes" className='addFormNotes' placeholder='enter notes here' onChange={handleChange}></textarea>
                <input type="submit" name="submit" id="addFormSubmit" />
            </form>
        </div>
    )
}

export default AddBill