import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeView } from '../../features/viewSlice'
import { modifyBill } from '../../features/billSlice'

import BackButton from '../../Components/Buttons/BackButton'
import LabelInput from '../../common/LabelInput';

import './EditPlan.css'
import { getPlans } from '../../features/planSlice'

const EdditBill = () => {
    const dispatch = useDispatch();
    const {
        openBill        
    } = useSelector(store => store.bill)
    
    const [editBill, setEditBill] = useState({...openBill});
    const [repeatOptions] = useState(['never', 'every week', 'every 2 weeks', 'every month', 'every 2 months']);

    const handleChange = e => {
        // e.target.style.backgroundColor = "" // remove color for empty input
        if (e.target.name === "autoPay") setEditBill({...editBill, [e.target.name]: !editBill.autoPay})
        else if (e.target.name === "paid") setEditBill({...editBill, [e.target.name]: !editBill.paid})
        else setEditBill({...editBill, [e.target.name]: e.target.value});
    }

    const handleSubmitEdit = async e => {
        // console.log("Edit", editBill)
        e.preventDefault();
        dispatch(modifyBill(editBill));
        dispatch(getPlans());
        dispatch(changeView({billView: "Bills List"}));
    };

    return (
        <div className="editContainer">
            <div className='editHeader'>
                <BackButton handleChangeView = {() => dispatch(changeView({billView: "Bills List"}))}/>
                <h2 className='editTitle'>Edit</h2>
            </div>
            
            <form className='editForm' onSubmit={handleSubmitEdit}> 
                <LabelInput 
                    htmlFor="dueDate" 
                    className='formInput'
                    text="Date: "
                    type="date" 
                    name="dueDate" 
                    id="editDate" 
                    value={new Date(editBill.dueDate).toISOString().slice(0,10)} 
                    onChange = {handleChange} 
                    required
                />

                <LabelInput 
                    htmlFor="name" 
                    className='formInput'
                    text="Name: "
                    type="text" 
                    name="name" 
                    id="editName" 
                    value={editBill.name} 
                    onChange = {handleChange}
                    required
                />

                <LabelInput 
                    htmlFor="amount" 
                    className='formInput'
                    text="Amount: "
                    type="number" 
                    name="amount" 
                    id="editAmount" 
                    step={0.01}
                    value={editBill.amount} 
                    onChange = {handleChange}
                    required
                />

                <LabelInput 
                    htmlFor="category" 
                    className='formInput'
                    text="Category: "
                    type="text" 
                    name="category" 
                    id="editCategory" 
                    value={editBill.category} 
                    onChange = {handleChange}
                />
                    
                <label htmlFor="repeat" className='formInput'>
                    Repeat: 
                    <select 
                        name="repeat" 
                        id="addBillRepeat" 
                        size='1' 
                        required 
                        onChange={handleChange} 
                        value={editBill.repeat}
                    >
                        {repeatOptions.map((option, index) => <option key={index} value={option} className='repeatOption'>{option}</option>)}
                    </select>
                </label>
                {!(editBill.repeat === "never") && 
                    <LabelInput 
                        htmlFor="endRepeat" 
                        className='formInput'
                        text="Repeat Until: "
                        type="date" 
                        name="endRepeat" 
                        id="addBillEndRepeat" 
                        value={new Date(editBill.endRepeat).toISOString().slice(0,10)} 
                        onChange={handleChange} 
                        required
                    />
                }
                <div className='billCheckBoxes'>
                    <LabelInput 
                        htmlFor="autoPay" 
                        className='formInput'
                        text="Autopay: "
                        type="checkbox"
                        name="autoPay"
                        id="editBillAutoPay"
                        onChange={handleChange}
                        checked = {editBill.autoPay ? "checked" : ''}
                    />
                </div>

                <textarea 
                    name="notes" 
                    id="editNotes" 
                    className='formNotes' 
                    placeholder='enter notes here' 
                    value={editBill.notes} 
                    onChange = {handleChange}
                />
                <LabelInput type="submit" name="submit" id="submit"/>
            </form>
        </div>
    );
};

export default EdditBill;