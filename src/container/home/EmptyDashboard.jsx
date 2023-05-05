import { useState } from "react";
import AddPlan from "../add/AddPlan";

const EmptyDashboard = (props) => {
    const [emptyView, setEmptyView] = useState("Empty")
    const handleChangeView = view => setEmptyView(view)
    
    return <div className="containerEmptyDashboard">
        { emptyView === "Empty"
            ? <div className="containerEmptyPlan">
                <h2>ADD YOUR FIRST PLAN</h2>
                <i 
                    className="fi fi-rr-add addEmptyDashboard" 
                    onClick={() => setEmptyView("Add")}
                />
            </div>
            : <AddPlan 
                user = {props.user}
                server = {props.server}
                handleChangeView = {() =>handleChangeView("Empty")}
                addNewPlan = {props.addNewPlan}
            />
        }
    </div>
}

export default EmptyDashboard;