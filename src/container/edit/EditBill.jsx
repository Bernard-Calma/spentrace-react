import { useState } from 'react'
import BackButton from '../../Components/Buttons/BackButton'
import './EditBill.css'

const EditBill = (props) => {
    const [editBill, setEditBill] = useState(props.openBill)
    
    const handleChange=(e)=>{
        // e.target.style.backgroundColor = "" // remove color for empty input
        if (e.target.name === "expense") setEditBill({...editBill, [e.target.name]: e.target.value === "Expense" ? true : false})
        else setEditBill({...editBill, [e.target.name]: e.target.value})
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        // console.log(editBill)
        // Add style to input when empty
        // let inputs = e.target.querySelectorAll("input") // list of all inputs
        // let expenseMessage = e.target.querySelector("span")
        // let allInputFilled = true;
        // for (let input of inputs){
        //     if (input.value === "" && input.type !== "submit") {
        //         input.style.backgroundColor = "rgb(255, 61, 61)"
        //         allInputFilled = false;
        //     }
        // } 
        // if (!inputs[3].checked && !inputs[4].checked) { // check if income and expense is selected, if not show message
        //     expenseMessage.removeAttribute("hidden")
        //     allInputFilled = false;
        // } else expenseMessage.setAttribute("hidden", true)
        // if (allInputFilled === false) return
        fetch(process.env.REACT_APP_SERVER_URL+"/plans/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
        },
            body: JSON.stringify(editBill)
        }).then(res => res.json())
        // .then(data => console.log(data))
        props.handleChangeView("Main")
    }

    return (
        <div className="editContainer">
            <div className='editHeader'>
                <BackButton handleChangeView = {() => props.handleChangeView("Main")}/>
                <h2 className='navTitle'>Edit</h2>
            </div>
            
            <form className='editForm' onSubmit={handleSubmitEdit}>
                <label htmlFor="date" className='editFormInput'>
                    Date: 
                    <input type="date" name="date" id="editDate" value={new Date(editBill.date).toISOString().slice(0,10)} onChange = {handleChange} required/>
                </label>
                <label htmlFor="name" className='editFormInput'>
                    Name: 
                    <input type="text" name="name" id="editName" value={editBill.name} onChange = {handleChange} required/>
                </label>
                <label htmlFor="amount" className='editFormInput'>
                    Amount: 
                    <input type="number" name="amount" id="editAmount" value={editBill.amount} onChange = {handleChange} required/>
                </label>
                <div className='radio'>
                    <label htmlFor="expense" className='editFormInput'>
                        Income: 
                        {
                            editBill.expense
                            ?<input type="radio" name="expense" id="editTypeIncome"  value="Income" onChange = {handleChange} required/>
                            :<input type="radio" name="expense" id="editTypeIncome" value="Income" checked onChange = {handleChange} required/>
                        }
                    </label>
                        <label htmlFor="expense" className='editFormInput'>
                        Expense: 
                        {
                            editBill.expense
                            ?<input type="radio" name="expense" id="editTypeIncome" value="Expense" checked onChange = {handleChange} required/>
                            :<input type="radio" name="expense" id="editTypeIncome" value="Expense" onChange = {handleChange} required/>
                        }
                </label>
                </div>
                <textarea name="notes" id="editNotes" className='editFormNotes' placeholder='enter notes here' value={editBill.notes} onChange = {handleChange}></textarea>
                <input type="submit" name="submit" id="editFormSubmit" />
            </form>
        </div>
    )
}

export default EditBill