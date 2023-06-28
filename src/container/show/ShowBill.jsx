import axios from "axios"
import { useSelector } from "react-redux";

import Edit from "../../common/Icon";
import Delete from "../../common/Icon";
import ParagraphSpan from "../../common/ParagraphSpan";

import "./Show.css"

const ShowBill = (props) => {
    const {
        openBill
    } = useSelector(store => store.bill)

    const handleDelete = () => {
        axios({
            method: "DELETE",
            url: `${props.server}/bills/${openBill._id}`,
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
                <ParagraphSpan className="show label date" label="Date" value={Date(openBill.dueDate).slice(0,10)}/>
                <ParagraphSpan className="show label name" label="Name" value={openBill.name}/>
                <ParagraphSpan className="show label amount" label="Amount" value={`$${openBill.amount.toFixed(2)}`}/>
                <ParagraphSpan className="show label category" label="Caregory" value={openBill.category? openBill.category : "None"}/>
                <ParagraphSpan className="show label autopay" label="Autopay" value={openBill.autoPay ? "Yes" : "No"}/>
                <ParagraphSpan className="show label Repeat" label="Repeat" value={openBill.repeat}/>
                <ParagraphSpan className="show label" label="Notes" value={openBill.notes ? "" : "-"}/>
                <p className={`${openBill.notes ? 'show label notes': 'show label'}`}>{openBill.notes}</p>
            </div>
        </div>
    );
};

export default ShowBill;