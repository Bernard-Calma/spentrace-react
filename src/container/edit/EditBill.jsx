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
        if(editBill !== props.openBill){
            console.log("Edit Submitted", editBill)
            axios.patch(`${props.server}/bills/${editBill._id}`, editBill)
            // .then(res => console.log(res))
            .catch(err => console.log(err))
        }
        props.handleChangeView("Bills List")
    }

    return (
        <div className="editContainer">
            <div className='editHeader'>
                <BackButton handleChangeView = {() => props.handleChangeView("Bills List")}/>
                <h2 className='navTitle'>Edit</h2>
            </div>
            
            <form className='editBillForm' onSubmit={handleSubmitEdit}>
                <label htmlFor="dueDate" className='formInput'>
                    Date: 
                    <input type="date" name="dueDate" id="editDate" value={new Date(editBill.dueDate).toISOString().slice(0,10)} onChange = {handleChange} required/>
                </label>
                <label htmlFor="name" className='formInput'>
                    Name: 
                    <input type="text" name="name" id="editName" value={editBill.name} onChange = {handleChange} required/>
                </label>
                <label htmlFor="amount" className='formInput'>
                    Amount: 
                    <input type="number" name="amount" id="editAmount" value={editBill.amount} onChange = {handleChange} required/>
                    Paid: 
                    {editBill.paid 
                    ?   <input type="checkbox" name="paid" id="editBillPaid" onChange={handleChange} checked/>
                    :   <input type="checkbox" name="paid" id="editBillPaid" onChange={handleChange} />}
                </label>
                <label htmlFor="category" className='formInput'>
                    Category: 
                    <input type="test" name="category" id="editCategory" value={editBill.category} onChange = {handleChange}/>
                </label>
                <label htmlFor="autoPay" className='formInput'>
                    Autopay: 
                    {editBill.autoPay 
                    ?   <input type="checkbox" name="autoPay" id="editBillAutoPay" onChange={handleChange} checked/>
                    :   <input type="checkbox" name="autoPay" id="editBillAutoPay" onChange={handleChange} />}
                    
                </label>
                <label htmlFor="repeat" className='formInput'>
                    Repeat: 
                    <select name="repeat" id="aeditBillRepeat" size='5' required onChange={handleChange} value={editBill.repeat}>
                        {
                            repeatOptions.map((option, index) => 
                                <option key={index} value={option} className='repeatOption' >{option}</option>
                        )}
                    </select>
                </label>
                <textarea name="notes" id="editNotes" className='formNotes' placeholder='enter notes here' value={editBill.notes} onChange = {handleChange}></textarea>
                <input type="submit" name="submit" id="editFormSubmit" />
            </form>
        </div>
    )
}

export default EdditBill