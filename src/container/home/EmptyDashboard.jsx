import { useDispatch, useSelector } from "react-redux";
import { changeView } from "../../features/viewSlice";

import AddPlan from "../add/AddPlan";

const EmptyDashboard = () => {
    const dispatch = useDispatch();
    const {
        emptyView
    } = useSelector(store => store.view)
    return <div className="containerEmptyDashboard">
        { emptyView === "Empty Dashboard"
            ? <div className="containerEmptyPlan">
                <h2>ADD YOUR FIRST PLAN</h2>
                <i 
                    className="fi fi-rr-add addEmptyDashboard" 
                    onClick={() => dispatch(changeView(
                        {
                            emptyView: "Add Bill"
                        }))}
                />
            </div>
            : <AddPlan/>
        }
    </div>
}

export default EmptyDashboard;