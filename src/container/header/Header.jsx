import NavBar from "../../Components/NavBar";
import "./header.css"

const Header = (props) => {
    return(
        <div className='header'>
            <h1 className="title">Spentrace</h1> 
            <NavBar 
                handleChangeView = {props.handleChangeView}
                view = {props.view}
                openBill = {props.openBill}
                user = {props.user}
                bills = {props.bills}
                setBills = {props.setBills}
            />
        </div>
    )
}

export default Header;