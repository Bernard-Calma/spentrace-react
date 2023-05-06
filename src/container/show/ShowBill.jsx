import axios from "axios"
import "./Show.css"
import Edit from "../../common/Icon";
import Delete from "../../common/Icon";
import BackButton from "../../Components/Buttons/BackButton";
import ParagraphSpan from "../../common/ParagraphSpan";

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

            <div className="containerShowInner bills">
                <ParagraphSpan className="show label date" label="Date" value={getDate()}/>
                <ParagraphSpan className="show label name" label="Name" value={props.openBill.name}/>
                <ParagraphSpan className="show label amount" label="Amount" value={`$${props.openBill.amount.toFixed(2)}`}/>
                <ParagraphSpan className="show label category" label="Caregory" value={props.openBill.category? props.openBill.category : "None"}/>
                <ParagraphSpan className="show label autopay" label="Autopay" value={props.openBill.autoPay ? "Yes" : "No"}/>
                <ParagraphSpan className="show label Repeat" label="Repeat" value={props.openBill.repeat}/>
                <ParagraphSpan className="show label" label="Notes" value={props.openBill.notes ? "" : "-"}/>
                <p className={`${props.openBill.notes ? 'show label notes': 'show label'}`}>{props.openBill.notes}</p>
            </div>
        </div>
    );
};

export default ShowBill;