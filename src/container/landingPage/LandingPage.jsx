import Login from "../login/Login";
import Register from "../login/Register";
import "./landingPage.css"
// MainPage Image
import mainPageImage from "../../img/MainPage.png"
import mobilePage from "../../img/MobilePage.png"

const LandingPage = (props) =>{
    return(
        <div className="containerLandingPage">
            <div className="introduction">
                <div className="mobilePageImage">
                    <p>Spentrace will help you list your earnings and expenses then provides how much you need to earn for your next bills.</p>
                    <img src={mobilePage} alt="Main Page"/>
                </div>
                <img src={mainPageImage} alt="Main Page" className="mainPageImage"/>
            </div>
            { props.view === "Register"
            ?
            <Register 
                setUser = {props.setUser}
                user = {props.user}
                handleChange = {props.handleChange}
                handleChangeView = {props.handleChangeView}
                clearPasswords = {props.clearPasswords}
            />
            :
            <Login 
                handleChange = {props.handleChange}
                handleLogin = {props.handleLogin}
                handleChangeView = {props.handleChangeView}
                setUser = {props.setUser}
                user = {props.user}
                loginMessage = {props.loginMessage}
            />
            }
        </div>
    )
}

export default LandingPage;