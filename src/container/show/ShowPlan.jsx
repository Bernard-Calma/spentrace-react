import axios from "axios"
import "./Show.css"
import Edit from "../../common/Icon";
import Delete from "../../common/Icon";
import BackButton from "../../Components/Buttons/BackButton";

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

            <div className="containerShowInner">
                <p className='showInfo date'>
                    <span>Date: </span>
                    {getDate()}
                </p>
                <p className='showInfo name'>
                    <span>Name: </span>
                    {props.plan.name}
                </p>
                <p className='showInfo amount'>
                    <span>Amount: </span>
                    ${props.plan.amount.toFixed(2)}
                </p>
                <p className='showInfo type'>
                    <span>Type: </span>
                    {props.plan.expense ? "Expense" : "Income"}
                </p>
                <p className="showInfo">
                    <span>Notes: </span>
                    {props.plan.notes
                        ? ''
                        : '-'
                    }
                </p>
                <p className='showInfo notes'> {props.plan.notes}</p>
            </div>

        </div>
    );
};

export default ShowPlan;