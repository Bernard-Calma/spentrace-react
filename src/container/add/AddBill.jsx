import { useState } from 'react'
import BackButton from '../../Components/Buttons/BackButton'
import './Add.css'
import axios from 'axios'

const AddBill = (props) => {
    const [repeatOptions] = useState(['never', 'every week', 'every 2 weeks', 'every month', 'every 2 months'])
    let [newBill, setNewBill] = useState({
        autopay: false,
        repeat: "never",
        paid: false,
        userId: props.user.id
    })

    const handleChange=(e)=>{
        if (e.target.name === "autopay") setNewBill({...newBill, [e.target.name]: e.target.checked})
        else if (e.target.name === "paid") setNewBill({...newBill, [e.target.name]: e.target.checked})
        else setNewBill({...newBill, [e.target.name]: e.target.value})
        
    }

    const handleSubmitAdd = (e) => {
        // console.log(newBill)
        e.preventDefault();
        axios({
            method: "POST",
            url: `${props.server}/bills/`,
            data: newBill,
            withCredentials: true
        })
        .then(res => props.handleAddBill(res.data))
        props.changeBillsView()
    }
    return (
        <div className="addContainer">
            <div className='addHeader'>
                <BackButton handleChangeView = {() => props.changeBillsView("Bills List")}/>
                <h2 className='addTitle'>ADD NEW BILL</h2>
            </div>            
            <form className='addForm' onSubmit={handleSubmitAdd}>
                <label htmlFor="dueDate" className='formInput'>
                    Due Date: 
                    <input type="date" name="dueDate" id="addBillDate" onChange={handleChange} required/>
                </label>
                <label htmlFor="name" className='formInput'>
                    Name: 
                    <input type="text" name="name" id="addBillName" onChange={handleChange} required/>
                </label>
                <label htmlFor="amount" className='formInput'>
                    Amount: 
                    <input type="number" name="amount" id="addBillAmount" onChange={handleChange} required/>
                </label>
                <label htmlFor="category" className='formInput'>
                    Category: 
                    <input type="text" name="category" id="addBillCatagory" onChange={handleChange} />
                </label>
                <label htmlFor="repeat" className='formInput'>
                    Repeat: 
                    <select name="repeat" id="addBillRepeat" size='1' required onChange={handleChange}>
                        {
                            repeatOptions.map((option, index) => 
                                <option key={index} value={option} className='repeatOption' >{option}</option>
                        )}
                    </select>
                </label>
                <label htmlFor="autoPay" className='formInput'>
                    Autopay: 
                    <input type="checkbox" name="autopay" id="addBillAmount" onChange={handleChange} />
                </label>
                <label htmlFor="autoPay" className='formInput'>
                    Paid: 
                    <input type="checkbox" name="paid" id="addBillAmount" onChange={handleChange} />
                </label>
                <span className = "expenseMessage" hidden>Select a transaction type above.</span>
                <textarea name="notes" id="addBillNotes" className='formNotes' placeholder='enter notes here' onChange={handleChange}></textarea>
                <input type="submit" name="submit" id="submit" />
            </form>
        </div>
    )
}

export default AddBill