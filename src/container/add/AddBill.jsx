import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBill } from '../../features/billSlice';

import BackButton from '../../Components/Buttons/BackButton';
import './Add.css';
import LabelInput from '../../common/LabelInput';
import { changeView } from '../../features/viewSlice';

const AddBill = () => {
    const dispatch = useDispatch();
    const [repeatOptions] = useState(['never', 'every week', 'every 2 weeks', 'every month', 'every 2 months']);
    let [newBill, setNewBill] = useState({
        autopay: false,
        repeat: "never",
        paid: false,
    })

    const handleChange= e =>{
        if (e.target.name === "autopay") setNewBill({...newBill, [e.target.name]: e.target.checked});
        else if (e.target.name === "paid") setNewBill({...newBill, [e.target.name]: e.target.checked});
        else setNewBill({...newBill, [e.target.name]: e.target.value});
    };

    const handleSubmitAdd = async e => {
        // console.log(newBill);
        e.preventDefault();
        dispatch(addBill(newBill))
        dispatch(changeView({billView: "Bill List"}))
    };

    return (
        <div className="addContainer">
            <div className='addHeader'>
                <BackButton handleChangeView = {() => dispatch(changeView({billView: "Bills List"}))}/>
                <h2 className='addTitle'>ADD NEW BILL</h2>
            </div>            
            <form className='addForm'onSubmit={handleSubmitAdd}>
                <LabelInput 
                    htmlFor="dueDate" 
                    className='formInput'
                    text="Due Date: "
                    type="date" 
                    name="dueDate" 
                    id="addBillDate" 
                    value={newBill.dueDate}
                    onChange={handleChange} 
                    required
                />
                
                <LabelInput 
                    htmlFor="name" 
                    className='formInput'
                    text="Name: "
                    type="text" 
                    name="name" 
                    id="addBillName" 
                    onChange={handleChange} 
                    required
                />

                <LabelInput 
                    htmlFor="amount" 
                    className='formInput'
                    text="Amount: "
                    type="number" 
                    name="amount" 
                    id="addBillAmount"
                    step={0.01} 
                    onChange={handleChange} 
                    required
                />

                <LabelInput 
                    htmlFor="category" 
                    className='formInput'
                    text="Category: "
                    type="text" 
                    name="category" 
                    id="addBillCatagory" 
                    onChange={handleChange} 
                    required
                />

                <label htmlFor="repeat" className='formInput'> 
                    Repeat: 
                    <select 
                        name="repeat" 
                        id="addBillRepeat" 
                        size='1' 
                        onChange={handleChange}
                        required 
                    >
                        {repeatOptions.map((option, index) => <option key={index} value={option} className='repeatOption'>{option}</option>)}
                    </select>
                </label>

                {!(newBill.repeat === "never") && 
                    <LabelInput 
                        htmlFor="endRepeat" 
                        className='formInput'
                        text="Repeat Until: "
                        type="date" 
                        name="endRepeat" 
                        id="addBillEndRepeat" 
                        value={newBill?.endRepeat} 
                        onChange={handleChange} 
                        required
                    />
                }

                <div className='billCheckBoxes'>
                    <LabelInput
                        htmlFor="autoPay" 
                        className="formInput"
                        text="Autopay: "
                        type="checkbox" 
                        name="autopay" 
                        id="addBillAmount" 
                        onChange={handleChange} 
                    />
                </div>

                <span className = "expenseMessage" hidden>Select a transaction type above.</span>
                <textarea 
                    name="notes" 
                    id="addBillNotes" 
                    className='formNotes' 
                    placeholder='enter notes here' 
                    onChange={handleChange}
                />
                <LabelInput type="submit" name="submit" id="submit"/>
            </form>
        </div>
    );
};

export default AddBill;