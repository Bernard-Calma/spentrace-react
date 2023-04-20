import axios from 'axios'
import { useState } from 'react'
import BackButton from '../../Components/Buttons/BackButton'
import './EditPlan.css'

const EdditBill = (props) => {
    const [editBill, setEditBill] = useState(props.openBill)
    const [repeatOptions] = useState(['never', 'every week', 'every 2 weeks', 'every month', 'every 2 months'])

    const handleChange=(e)=>{
        // e.target.style.backgroundColor = "" // remove color for empty input
        if (e.target.name === "autoPay") setEditBill({...editBill, [e.target.name]: !editBill.autoPay})
        if (e.target.name === "paid") setEditBill({...editBill, [e.target.name]: !editBill.paid})
        else setEditBill({...editBill, [e.target.name]: e.target.value})
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        axios({
            method: "PUT",
            url: `${props.server}/bills/${editBill._id}`,
            data: editBill,
            withCredentials: true
        })
        .then(res => props.updateBill(res.data))
        props.return()
    }

    return (
        <div className="editContainer">
            <div className='editHeader'>
                <BackButton handleChangeView = {props.return}/>
                <h2 className='editTitle'>Edit</h2>
            </div>
            
            <form className='editForm' onSubmit={handleSubmitEdit}>
                <label htmlFor="dueDate" className='formInput'>
                    Date: 
                    <input type="date" name="dueDate" id="editDate" value={new Date(`${editBill.dueDate.month + 1}-${editBill.dueDate.day}-${editBill.dueDate.year}`).toISOString().slice(0,10)} onChange = {handleChange} required/>
                </label>
                <label htmlFor="name" className='formInput'>
                    Name: 
                    <input type="text" name="name" id="editName" value={editBill.name} onChange = {handleChange} required/>
                </label>
                <label htmlFor="amount" className='formInput'>
                    Amount: 
                    <input type="number" name="amount" id="editAmount" value={editBill.amount} onChange = {handleChange} required/>
                </label>
                <label htmlFor="category" className='formInput'>
                    Category: 
                    <input type="text" name="category" id="editCategory" value={editBill.category} onChange = {handleChange}/>
                </label>
                <label htmlFor="repeat" className='formInput'>
                    Repeat: 
                    <select name="repeat" id="addBillRepeat" size='1' required onChange={handleChange} value={editBill.repeat}>
                        {
                            repeatOptions.map((option, index) => 
                                <option key={index} value={option} className='repeatOption' >{option}</option>
                        )}
                    </select>
                </label>
                {
                    !(editBill.repeat === "never") && 
                    <label htmlFor="endRepeat" className='formInput'>
                    Repeat Until: 
                        <input type="date" name="endRepeat" id="addBillEndRepeat" onChange={handleChange} required/>
                    </label>
                }
                <div className='billCheckBoxes'>
                    <label htmlFor="autoPay" className='formInput'>
                        Autopay: 
                        {editBill.autoPay 
                        ?   <input type="checkbox" name="autoPay" id="editBillAutoPay" onChange={handleChange} checked/>
                        :   <input type="checkbox" name="autoPay" id="editBillAutoPay" onChange={handleChange} />}
                    </label>
                    <label htmlFor="autoPay" className='formInput'>
                        Paid: 
                        {
                            editBill.paid 
                            ? <input type="checkbox" name="paid" id="editBillPaid" onChange={handleChange} checked/>
                            : <input type="checkbox" name="paid" id="editBillPaid" onChange={handleChange} />
                        }
                    </label>
                </div>

                <textarea name="notes" id="editNotes" className='formNotes' placeholder='enter notes here' value={editBill.notes} onChange = {handleChange}></textarea>
                <input type="submit" name="submit" id="submit" />
            </form>
        </div>
    )
}

export default EdditBill