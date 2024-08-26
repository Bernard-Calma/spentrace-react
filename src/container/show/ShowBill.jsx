import { useSelector, useDispatch } from "react-redux";
import { changeView } from "../../features/viewSlice";
import { deleteBill } from "../../features/billSlice";

import Edit from "../../common/Icon";
import Delete from "../../common/Icon";
import ParagraphSpan from "../../common/ParagraphSpan";

import "./Show.css"

const ShowBill = () => {
    const dispatch = useDispatch();
    const {
        openBill
    } = useSelector(store => store.bill)

    const handleDelete = () => {
        dispatch(deleteBill(openBill))
        dispatch(changeView({billView: "Bills List"}))
    }

    return(
        <div className="containerShowBill">
            <div className="showHeader">
                <i className="fi fi-rr-angle-small-left" onClick={() => dispatch(changeView({billView: "Bills List"}))}/>
                <div>
                    <Edit className="fi fi-rr-edit" onClick={() => dispatch(changeView({billView: "Edit Bill"}))}/>
                    <Delete className="fi fi-rr-trash" onClick={handleDelete}/>
                </div>
            </div>

            <div className="containerShowInner bills">
                <ParagraphSpan className="show label date" label="Date" value={openBill.dueDate.slice(0, -12)}/>
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