import { useState } from 'react'
import BackButton from '../../Components/Buttons/BackButton'
import './Add.css'

const Add = (props) => {
    let [newBill, setNewBill] = useState()

    const handleChange=(e)=>{
        e.target.style.backgroundColor = ""
        if (e.target.name === "expense") setNewBill({...newBill, [e.target.name]: e.target.value === "Expense" ? true : false})
        setNewBill({...newBill, [e.target.name]: e.target.value})
    }

    const handleSubmitAdd = (e) => {
        e.preventDefault();
        console.log(newBill)
        let inputs = e.target.querySelectorAll("input") // list of all inputs
        let expenseMessage = e.target.querySelector("span")
        let allInputFilled = true;
        for (let input of inputs){
            if (input.value === "" && input.type !== "submit") {
                input.style.backgroundColor = "rgb(255, 61, 61)"
                allInputFilled = false;
            }
        } 
        if (!inputs[3].checked && !inputs[4].checked) { // check if income and expense is selected, if not show message
            expenseMessage.removeAttribute("hidden")
            allInputFilled = false;
        } else expenseMessage.setAttribute("hidden", true)
        if (allInputFilled === false) return
        fetch("http://192.168.1.80:8000/plans/", {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
        },
            body: JSON.stringify(newBill)
        }).then(res => res.json())
        .then(data => console.log(data))
    }
    return (
        <div className="addContainer">
            <div className='addHeader'>
                <BackButton handleChangeView = {() => props.handleChangeView("Main")}/>
                <h2 className='navTitle'>Add new bill</h2>
            </div>
            
            <form className='addForm' onSubmit={handleSubmitAdd}>
                <label htmlFor="date" className='addFormInput'>
                    Date: 
                    <input type="date" name="date" id="addDate" onChange={handleChange}/>
                </label>
                <label htmlFor="name" className='addFormInput'>
                    Name: 
                    <input type="text" name="name" id="addName" onChange={handleChange}/>
                </label>
                <label htmlFor="amount" className='addFormInput'>
                    Amount: 
                    <input type="number" name="amount" id="addAmount" onChange={handleChange}/>
                </label>
                <div className='radio'>
                    <label htmlFor="type" className='addFormInput'>
                        Income: 
                        <input type="radio" name="expense" id="addTypeIncome" value="Income" onChange={handleChange}/>
                    </label>
                        <label htmlFor="type" className='addFormInput'>
                        Expense: 
                        <input type="radio" name="expense" id="addTypeExpense" value="Expense" onChange={handleChange}/>
                </label>
                </div>
                <span className = "expenseMessage" hidden>Select a transaction type above.</span>

                <textarea name="notes" id="addNotes" className='addFormNotes' placeholder='enter notes here' onChange={handleChange}></textarea>
                <input type="submit" name="submit" id="addFormSubmit" />
            </form>
        </div>
    )
}

export default Add