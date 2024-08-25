import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { changeView } from '../../features/viewSlice';
import { getPlans, modifyPlan } from '../../features/planSlice';

import BackButton from '../../Components/Buttons/BackButton'
import LabelInput from '../../common/LabelInput';

import './EditPlan.css'

const EditPlan = () => {
    const dispatch = useDispatch();
    const {
        openPlan
    } = useSelector(store => store.plan)
    const [editPlan, setEditPlan] = useState(openPlan);

    const handleChange=(e)=>{
        // e.target.style.backgroundColor = "" // remove color for empty input
        if (e.target.name === "expense") setEditPlan({...editPlan, [e.target.name]: e.target.value === "Expense" ? true : false});
        else setEditPlan({...editPlan, [e.target.name]: e.target.value});
    }

    const handleSubmitEdit = e => {
        e.preventDefault();
        // console.log(editPlan)
        dispatch(modifyPlan(editPlan));
        dispatch(getPlans())
        dispatch(changeView({planView: "Show Plan"}));
    }

    return (
        <div className="editContainer">
            <div className='editHeader'>
                <BackButton handleChangeView = {() => dispatch(changeView({planView: "Show Plan"}))}/>
                <h2 className='editTitle'>EDIT</h2>
            </div>
            
            <form 
                className='editForm' 
                onSubmit={handleSubmitEdit}
            >
                <LabelInput 
                    htmlFor="date" 
                    className='formInput'
                    text="Date:  "
                    type="date" 
                    name="date" 
                    id="editDate" 
                    value={new Date(editPlan.date).toISOString().slice(0,10)} 
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
                    value={editPlan.name} 
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
                    value={editPlan.amount} 
                    step={0.01}
                    onChange = {handleChange} 
                    required
                />
                <div className='radio'>
                    {editPlan.expense
                        ? <>
                            <LabelInput 
                                htmlFor="type" 
                                className='formInput'
                                text="Income: "
                                type="radio" 
                                name="expense" 
                                id="addTypeIncome" 
                                value="Income" 
                                onChange={handleChange} 
                                required
                            />

                            <LabelInput 
                                htmlFor="type" 
                                className='formInput'
                                text="Expense:"
                                type="radio" 
                                name="expense" 
                                id="addTypeExpense" 
                                value="Expense" 
                                checked 
                                onChange={handleChange} 
                                required
                            />
                        </>
                        : <>
                            <LabelInput 
                                htmlFor="type" 
                                className="formInput"
                                text="Income: "
                                type="radio" 
                                name="expense" 
                                id="addTypeIncome" 
                                value="Income" 
                                checked 
                                onChange={handleChange} 
                            />

                            <LabelInput 
                                htmlFor="type" 
                                className='formInput'
                                text="Expense: "
                                type="radio" 
                                name="expense" 
                                id="addTypeExpense" 
                                value="Expense" 
                                onChange={handleChange} 
                                required
                            />
                        </>
                    }
                </div>
                <textarea 
                    name="notes" 
                    id="editNotes" 
                    className='formNotes' 
                    placeholder='enter notes here' 
                    value={editPlan.notes} 
                    onChange = {handleChange}
                />
                <LabelInput type="submit" name="submit" id="submit"/>
            </form>
        </div>
    );
};

export default EditPlan;