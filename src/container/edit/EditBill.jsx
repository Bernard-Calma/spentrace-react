import { useState } from 'react'
import BackButton from '../../Components/Buttons/BackButton'
import './EditPlan.css'

const EdditBill = (props) => {
    const [editBill, setEditBill] = useState(props.openBill)

    const handleChange=(e)=>{
        // e.target.style.backgroundColor = "" // remove color for empty input
        if (e.target.name === "expense") setEditBill({...editBill, [e.target.name]: e.target.value === "Expense" ? true : false})
        else setEditBill({...editBill, [e.target.name]: e.target.value})
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        console.log("Edit Submitted", editBill)
        // fetch(props.server+"/bill/" + props.openBill._id, {
        //     method: "POST",
        //     headers: {
        //     "Content-Type": "application/json",
        // },
        //     body: JSON.stringify(editBill)
        // }).then(res => res.json())
        // .then(data => props.updateBills(data))
        // props.handleChangeView("Bills List")
    }

    return (
        <div className="editContainer">
            <div className='editHeader'>
                <BackButton handleChangeView = {() => props.handleChangeView("Main")}/>
                <h2 className='navTitle'>Edit</h2>
            </div>
            
            <form className='editBillForm' onSubmit={handleSubmitEdit}>
                <label htmlFor="dueDate" className='editFormInput'>
                    Date: 
                    <input type="date" name="dueDate" id="editDate" value={new Date(editBill.dueDate).toISOString().slice(0,10)} onChange = {handleChange} required/>
                </label>
                <label htmlFor="name" className='editFormInput'>
                    Name: 
                    <input type="text" name="name" id="editName" value={editBill.name} onChange = {handleChange} required/>
                </label>
                <label htmlFor="amount" className='editFormInput'>
                    Amount: 
                    <input type="number" name="amount" id="editAmount" value={editBill.amount} onChange = {handleChange} required/>
                </label>
                <label htmlFor="category" className='editFormInput'>
                    Category: 
                    <input type="number" name="category" id="editCategory" value={editBill.category} onChange = {handleChange} required/>
                </label>
                <label htmlFor="autoPay" className='editFormInput'>
                    Autopay: 
                    <input type="checkbox" name="autopay" id="addBillAmount" onChange={handleChange} />
                </label>
                <label htmlFor="repeat" className='editFormInput'>
                    Repeat: 
                    <select name="repeat" id="aeditBillRepeat" size='5' required onChange={handleChange}>
                        <option value='never' className='repeatOption'>Never</option>
                        <option value='every week' className='repeatOption'>Every Week</option>
                        <option value='every 2 weeks' className='repeatOption'>Every 2 Weeks</option>
                        <option value='every month' className='repeatOption'>Every Month</option>
                        <option value='every 2 months' className='repeatOption'>Every 2 Months</option>
                    </select>
                </label>
                <textarea name="notes" id="editNotes" className='editBillFormNotes' placeholder='enter notes here' value={editBill.notes} onChange = {handleChange}></textarea>
                <input type="submit" name="submit" id="editFormSubmit" />
            </form>
        </div>
    )
}

export default EdditBill