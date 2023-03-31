import { useState } from 'react'
import BackButton from '../../Components/Buttons/BackButton'
import './EditPlan.css'

const EdditBill = (props) => {
    const [editBill, setEditBill] = useState(props.openBill)
    const [repeatOptions] = useState(['never', 'every week', 'every 2 weeks', 'every month', 'every 2 months'])

    const handleChange=(e)=>{
        // e.target.style.backgroundColor = "" // remove color for empty input
        if (e.target.name === "autoPay") setEditBill({...editBill, [e.target.name]: !editBill.autoPay})
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
                <BackButton handleChangeView = {() => props.handleChangeView("Bills List")}/>
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
                    {editBill.autoPay 
                    ?   <input type="checkbox" name="autoPay" id="addBillAmount" onChange={handleChange} checked/>
                    :   <input type="checkbox" name="autoPay" id="addBillAmount" onChange={handleChange} />}
                    
                </label>
                <label htmlFor="repeat" className='editFormInput'>
                    Repeat: 
                    <select name="repeat" id="aeditBillRepeat" size='5' required onChange={handleChange}>
                        {
                            repeatOptions.map((option, index) => 
                                editBill.repeat === option 
                                ?<option key={index} value={option} className='repeatOption' selected>{option}</option>
                                :<option key={index} value={option} className='repeatOption' >{option}</option>
                            )
                        }
                    </select>
                </label>
                <textarea name="notes" id="editNotes" className='editBillFormNotes' placeholder='enter notes here' value={editBill.notes} onChange = {handleChange}></textarea>
                <input type="submit" name="submit" id="editFormSubmit" />
            </form>
        </div>
    )
}

export default EdditBill