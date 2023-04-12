import axios from "axios";
import NavBar from "../../Components/NavBar";
import "./header.css"

const Header = (props) => {
    const handleSignOut = () => {
        console.log("Sign Out")
        axios({
            method: "GET",
            url: `${props.server}/users/signout`,
            withCredentials: true
        })
        .then(res => props.setUser({
            id: "",
            username: "",
            loggedIn: false
        }))
        .catch(error => console.log(error))
        props.handleChangeHomeView("Login")
    }
    return(
        <div className='header'>
            <h1 
                className="title" 
                onClick={props.handleChangeHomeView}
            >Spentrace</h1> 
            <i className="fi fi-rr-sign-out-alt" onClick={handleSignOut}></i>
        </div>
    )
}

export default Header;