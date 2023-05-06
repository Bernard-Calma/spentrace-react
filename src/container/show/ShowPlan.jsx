import axios from "axios"
import "./Show.css"
import Edit from "../../common/Icon";
import Delete from "../../common/Icon";
import BackButton from "../../Components/Buttons/BackButton";
import ParagraphSpan from "../../common/ParagraphSpan";

const ShowPlan = (props) => {
    const getDate = () => {
        let dateToday = new Date(Date.now()).toDateString().slice(4,7) + " " + new Date(Date.now()).getDate();
        let datePlan = new Date(props.plan.date).toDateString().slice(4,7) + " " + (new Date(props.plan.date).getDate() + 1); // Add 1 to provide accurate day
        return dateToday === datePlan ? "Today": datePlan;
    }

    const handleDelete = async () => {
        await axios({
            method: "DELETE",
            url: `${props.server}/plans/${props.plan._id}`,
            withCredentials: true,
        })
        .then(res => props.deletePlan(res.data))
        .catch(err => console.log(err));
        props.return();
    }

    return(
        <div className="containerShow">
            <div className="showHeader">
                <i className="fi fi-rr-angle-small-left" onClick={props.return}/>
                <div>
                    <Edit className="fi fi-rr-edit" onClick={props.edit}/>
                    <Delete className="fi fi-rr-trash" onClick={handleDelete}/>
                </div>
            </div>

            <div className="containerShowInner plans">
                <ParagraphSpan className="show label date" label="Date" value={getDate()}/>
                <ParagraphSpan className="show label name" label="Name" value={props.plan.name}/>
                <ParagraphSpan className="show label amount" label="Amount" value={`$${props.plan.amount.toFixed(2)}`}/>
                <ParagraphSpan className="show label type" label="Type" value={props.plan.expense ? "Expense" : "Income"}/>
                <ParagraphSpan className="show label" label="Notes" value={props.plan.notes ? '': '-'}/>
                <p className='show label notes'>{props.plan.notes}</p>
            </div>
        </div>
    );
};

export default ShowPlan;