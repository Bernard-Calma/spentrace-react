import axios from "axios"
import "./Show.css"
import { useState } from "react"

const ShowBill = (props) => {
    const dueDate = props.openBill.dueDate
    console.log(new Date(dueDate.year, dueDate.month, dueDate.day))
    const getDate = () => {
        let dateToday = new Date(Date.now()).toDateString().slice(4,7) + " " + new Date(Date.now()).getDate()
        let dateBill = new Date(dueDate.year, dueDate.month + 1, dueDate.day)
        return dateToday === dateBill ? "Today": dateBill;
    }

    const handleDelete = () => { 
        axios({
            method: "DELETE",
            url: `${props.server}/bills/${props.openBill._id}`,
            withCredentials: true
        })
        .then(res => props.deleteBill(res.data))
        .catch(err => console.log(err));
        props.return();
    }
    return(
        <div className="containerShowBill">
            <div className="showHeader">
                <i className="fi fi-rr-angle-small-left" onClick={props.return}></i>
                <div>
                    <i className="fi fi-rr-edit" onClick={props.edit}></i>
                    <i className="fi fi-rr-trash" onClick={handleDelete}></i>
                </div>
            </div>
            <div className="containerShowInner">
                <p className='showInfo date'> <span>Date:</span> {getDate().toDateString()}</p>
                <p className='showInfo name'> <span>Name:</span> {props.openBill.name}</p>
                <p className='showInfo amount'> <span>Amount:</span> ${props.openBill.amount.toFixed(2)}</p>
                <p className='showInfo amount'> <span>Caregory:</span> ${props.openBill.category? props.openBill.category : "None"}</p>
                <p className='showInfo type'> <span>Autopay:</span> {props.openBill.autoPay ? "Yes" : "No"}</p>
                <p className='showInfo type'> <span>Repeat:</span> {props.openBill.repeat}</p>
                <p className="showInfo"><span>Notes:</span> </p>
                <p className='showInfo notes'> {props.openBill.notes}</p>
            </div>
            
        </div>
    )
}

export default ShowBill;