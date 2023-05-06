import axios from "axios"
import "./Show.css"
import Edit from "../../common/Icon";
import Delete from "../../common/Icon";
import BackButton from "../../Components/Buttons/BackButton";

const ShowBill = (props) => {
    const getDate = () => {
        let dateToday = new Date();
        dateToday = `${dateToday.getFullYear()} ${dateToday.getMonth()} ${dateToday.getDate()}`;
        let dueDate = new Date(props.openBill.dueDate);
        dueDate = `${dueDate.getFullYear()} ${dueDate.getMonth()} ${dueDate.getDate()}`;
        // console.log("Date Today: ", dateToday);
        // console.log("Due Date: ", dueDate);
        return dateToday === dueDate ? "Today": new Date(props.openBill.dueDate).toDateString();
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
                <i className="fi fi-rr-angle-small-left" onClick={props.return}/>
                <div>
                    <Edit className="fi fi-rr-edit" onClick={props.edit}/>
                    <Delete className="fi fi-rr-trash" onClick={handleDelete}/>
                </div>
            </div>

            <div className="containerShowInner">
                <p className='showInfo date'>
                    <span>Date: </span>
                    {getDate()}
                </p>
                <p className='showInfo name'>
                    <span>Name: </span>
                    {props.openBill.name}
                </p>
                <p className='showInfo amount'>
                    <span>Amount:</span>
                    ${props.openBill.amount.toFixed(2)}
                </p>
                <p className='showInfo amount'>
                    <span>Caregory:</span>
                    ${props.openBill.category? props.openBill.category : "None"}
                </p>
                <p className='showInfo type'>
                    <span>Autopay:</span>
                    {props.openBill.autoPay ? "Yes" : "No"}
                </p>
                <p className='showInfo type'>
                    <span>Repeat:</span>
                    {props.openBill.repeat}
                </p>
                <p className="showInfo">
                    <span>Notes: </span>
                    {props.openBill.notes
                        ? "" 
                        : "-"}
                </p>
                <p className='showInfo notes'>{props.openBill.notes}</p>
            </div>
        </div>
    );
};

export default ShowBill;