import './Add.css'

const newBill = (props) => {
    return (
        <div className="addContainer">
            <h2 className='navTitle'>Add new bill</h2>
            <form action="" className='addForm'>
                <label htmlFor="date" className='addFormInput'>
                    Date: 
                    <input type="date" name="date" id="addDate" />
                </label>
                <label htmlFor="name" className='addFormInput'>
                    Name: 
                    <input type="text" name="name" id="addName" />
                </label>
                <label htmlFor="amount" className='addFormInput'>
                    Amount: 
                    <input type="text" name="amount" id="addAmount" />
                </label>
                <div className='radio'>
                    <label htmlFor="type" className='addFormInput'>
                        Income: 
                        <input type="radio" name="type" id="addTypeIncome" value="Income"/>
                    </label>
                        <label htmlFor="type" className='addFormInput'>
                        Expense: 
                        <input type="radio" name="type" id="addTypeExpense" valie="Expense" />
                </label>
                </div>
                <textarea name="notes" id="addNotes" className='addFormNotes' placeholder='enter notes here'></textarea>
                <input type="submit" name="submit" id="addFormSubmit" />
            </form>
        </div>
    )
}

export default newBill