import { useState } from "react";
import AddPlan from "../add/AddPlan";

const EmptyDashboard = (props) => {
    const [view, setView] = useState("Empty")

    return <div className="containerEmptyDashboard">
        {
            view === "Empty"
            ? <div className="containerEmptyPlan">
                <h2>ADD YOUR FIRST PLAN</h2>
                <i className="fi fi-rr-add addEmptyDashboard" onClick={() => setView("Add")}></i>
            </div>
            : <AddPlan 
                user = {props.user}
            />
        }
    </div>
}

export default EmptyDashboard;