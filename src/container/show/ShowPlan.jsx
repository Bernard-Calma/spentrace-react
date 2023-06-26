import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import "./Show.css"
import Edit from "../../common/Icon";
import Delete from "../../common/Icon";
import ParagraphSpan from "../../common/ParagraphSpan";
import { changeView } from "../../features/viewSlice";
import { deletePlan } from "../../features/planSlice";

const ShowPlan = (props) => {
    const {
        openPlan
    } = useSelector(store => store.plan)
    const dispatch = useDispatch();
    const getDate = () => {
        let dateToday = new Date(Date.now()).toDateString().slice(4,7) + " " + new Date(Date.now()).getUTCDate();
        let datePlan = new Date(openPlan.date).toDateString().slice(4,7) + " " + (new Date(openPlan.date).getUTCDate());
        return dateToday === datePlan ? "Today": datePlan;
    }

    const handleDelete = async () => {
        await axios({
            method: "DELETE",
            url: `${props.server}/plans/${openPlan._id}`,
            withCredentials: true,
        })
        .then(res => props.deletePlan(res.data))
        .catch(err => console.log(err));
        props.return();
    }

    return(
        <div className="containerShow">
            <div className="showHeader">
                <i className="fi fi-rr-angle-small-left" onClick={() => dispatch(changeView({planView: "Plan List"}))}/>
                <div>
                    <Edit className="fi fi-rr-edit" onClick={props.edit}/>
                    <Delete className="fi fi-rr-trash" onClick={() => dispatch(deletePlan(openPlan))}/>
                </div>
            </div>

            <div className="containerShowInner plans">
                <ParagraphSpan className="show label date" label="Date" value={getDate()}/>
                <ParagraphSpan className="show label name" label="Name" value={openPlan.name}/>
                <ParagraphSpan className="show label amount" label="Amount" value={`$${openPlan.amount.toFixed(2)}`}/>
                <ParagraphSpan className="show label type" label="Type" value={openPlan.expense ? "Expense" : "Income"}/>
                <ParagraphSpan className="show label" label="Notes" value={openPlan.notes ? '': '-'}/>
                <p className={`${openPlan.notes ? 'show label notes': 'show label'}`}>{openPlan.notes}</p>
            </div>
        </div>
    );
};

export default ShowPlan;