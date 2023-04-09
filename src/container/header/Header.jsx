import NavBar from "../../Components/NavBar";
import "./header.css"

const Header = (props) => {
    return(
        <div className='header'>
            <h1 
                className="title" 
                onClick={props.handleChangeHomeView}
            >Spentrace</h1> 
            <NavBar 
                handleChangeView = {props.handleChangeView}
                view = {props.view}
                openPlan = {props.openPlan}
                user = {props.user}
                plans = {props.plans}
                setPlans = {props.setPlans}
                openBill = {props.openBill}
            />
        </div>
    )
}

export default Header;