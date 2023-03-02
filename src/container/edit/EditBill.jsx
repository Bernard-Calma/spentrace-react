import BackButton from '../../Components/Buttons/BackButton'
import './EditBill.css'

const EditBill = (props) => {
    return (
        <div className="editContainer">
            <div className='editHeader'>
                <BackButton handleChangeView = {() => props.handleChangeView("Main")}/>
                <h2 className='navTitle'>Edit</h2>
            </div>
            
            <form className='editForm'>
                <label htmlFor="date" className='editFormInput'>
                    Date: 
                    <input type="date" name="date" id="editDate" value={new Date(props.openBill.date).toISOString().slice(0,10)}/>
                </label>
                <label htmlFor="name" className='editFormInput'>
                    Name: 
                    <input type="text" name="name" id="editName" value={props.openBill.name}/>
                </label>
                <label htmlFor="amount" className='editFormInput'>
                    Amount: 
                    <input type="number" name="amount" id="editAmount" value={props.openBill.amount}/>
                </label>
                <div className='radio'>
                    <label htmlFor="type" className='editFormInput'>
                        Income: 
                        {
                            props.openBill.expense
                            ?<input type="radio" name="type" id="editTypeIncome" />
                            :<input type="radio" name="type" id="editTypeIncome" checked/>
                        }
                    </label>
                        <label htmlFor="type" className='editFormInput'>
                        Expense: 
                        {
                            props.openBill.expense
                            ?<input type="radio" name="type" id="editTypeIncome" checked/>
                            :<input type="radio" name="type" id="editTypeIncome"/>
                        }
                </label>
                </div>
                <textarea name="notes" id="editNotes" className='editFormNotes' placeholder='enter notes here'>{props.openBill.notes}</textarea>
                <input type="submit" name="submit" id="editFormSubmit" />
            </form>
        </div>
    )
}

export default EditBill