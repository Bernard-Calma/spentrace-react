import NavBar from "../../Components/NavBar";
import "./header.css"

const Header = (props) => {
    return(
        <div className='header'>
            <h1 
                className="title" 
                onClick={() => props.handleChangeView("Home")}
            >Spentrace</h1> 
            <NavBar 
                handleChangeView = {props.handleChangeView}
                view = {props.view}
                openPlan = {props.openPlan}
                user = {props.user}
                plans = {props.plans}
                setPlans = {props.setPlans}
            />
        </div>
    )
}

export default Header;