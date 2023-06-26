// import "./Plan.css"
import { useDispatch } from "react-redux";
import { setOpenPlan } from "../../features/planSlice";
import { changeView } from "../../features/viewSlice";

const Plan = props => {
    const dispatch = useDispatch();
    const getDate = () => {
        // Get today and plan's month and date and compare
        let dateToday = new Date(Date.now()).toDateString().slice(4,7) + " " + new Date(Date.now()).getUTCDate();
        let datePlan = new Date(props.plan.date).toDateString().slice(4,7) + " " + (new Date(props.plan.date).getUTCDate());
        return dateToday === datePlan ? "Today": datePlan;
    }

    return (
        <div className = "planContainer">
            <p className={`plan date ${Date.parse(new Date(props.plan.date)) - Date.parse(new Date()) < 0 && 'negative'}`}>{getDate()}</p>
            <p className="plan name" onClick={() => {
                dispatch(setOpenPlan(props.plan))
                dispatch(changeView({planView: "Show Plan"}))
                }}>{props.plan.name}</p>
            <p className={`plan amount ${props.plan.expense ? 'negativeMobileOnly' : 'positiveMobileOnly'}`}>${props.plan.amount.toFixed(2)}</p>
            <p className={`plan running total ${props.plan.runningTotal > 0 ? "positive" : "negative"}`}>{props.plan.runningTotal < 0 ? "-$"+Math.abs(props.plan.runningTotal).toFixed(2) : `$${props.plan.runningTotal?.toFixed(2)}`}</p>
            <p className="plan full type">{props.plan.expense ? "Expense" : "Income"}</p>   
        </div>
    );
};

export default Plan;