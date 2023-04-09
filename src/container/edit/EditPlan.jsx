import { useState } from 'react'
import BackButton from '../../Components/Buttons/BackButton'
import './EditPlan.css'

const EditPlan = (props) => {
    const [editPlan, setEditPlan] = useState(props.plan)

    const handleChange=(e)=>{
        // e.target.style.backgroundColor = "" // remove color for empty input
        if (e.target.name === "expense") setEditPlan({...editPlan, [e.target.name]: e.target.value === "Expense" ? true : false})
        else setEditPlan({...editPlan, [e.target.name]: e.target.value})
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        fetch(props.server+"/plans/" + props.plan._id, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
        },
            body: JSON.stringify(editPlan)
        }).then(res => res.json())
        .then(data => props.updatePlans(data))
        props.handleChangeView("Main")
    }

    return (
        <div className="editContainer">
            <div className='editHeader'>
                <BackButton handleChangeView = {props.return}/>
                <h2 className='editTitle'>Edit</h2>
            </div>
            
            <form className='editForm' onSubmit={handleSubmitEdit}>
                <label htmlFor="date" className='formInput'>
                    Date: 
                    <input type="date" name="date" id="editDate" value={new Date(editPlan.date).toISOString().slice(0,10)} onChange = {handleChange} required/>
                </label>
                <label htmlFor="name" className='formInput'>
                    Name: 
                    <input type="text" name="name" id="editName" value={editPlan.name} onChange = {handleChange} required/>
                </label>
                <label htmlFor="amount" className='formInput'>
                    Amount: 
                    <input type="number" name="amount" id="editAmount" value={editPlan.amount} onChange = {handleChange} required/>
                </label>
                <div className='radio'>
                    {
                        editPlan.expense ?
                        <>
                            <label htmlFor="type" className='formInput'>
                                Income: 
                                <input type="radio" name="expense" id="addTypeIncome" value="Income" onChange={handleChange} required/>
                            </label>
                                <label htmlFor="type" className='formInput'>
                                Expense: 
                                <input type="radio" name="expense" id="addTypeExpense" value="Expense" checked onChange={handleChange} required/>
                            </label>
                        </>
                        :
                        <>
                            <label htmlFor="type" className='formInput'>
                                Income: 
                                <input type="radio" name="expense" id="addTypeIncome" value="Income" checked onChange={handleChange} required/>
                            </label>
                                <label htmlFor="type" className='formInput'>
                                Expense: 
                                <input type="radio" name="expense" id="addTypeExpense" value="Expense" onChange={handleChange} required/>
                            </label>
                        </>
                    }
                </div>
                <textarea name="notes" id="editNotes" className='formNotes' placeholder='enter notes here' value={editPlan.notes} onChange = {handleChange}></textarea>
                <input type="submit" name="submit" id="submit" />
            </form>
        </div>
    )
}

export default EditPlan