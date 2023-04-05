import Login from "./login/Login";
import Register from "./login/Register";
import "./landingPage.css"
// Landing Page Image
import mainPageImage from "../../img/MainPage.png"
import mobilePage from "../../img/MobilePage.png"
import { useState } from "react";

const LandingPage = (props) =>{
    const [loginUser, setLoginUser] = useState({
        username: "",
        password: "",
        passwordCheck: "",
        errorMessage: "",
    })
    let [landingPageView, setLandingPageView] = useState("Login")

    const handleChangeUser = (event) => {
        setLoginUser({...loginUser, [event.target.name]: event.target.value})
    }
    return(
        <div className="containerLandingPage">
            <div className="introduction">
                <div className="mobilePageImage">
                    <p>Spentrace will help you list your earnings and expenses then provides how much you need to earn for your next bills.</p>
                    <img src={mobilePage} alt="Main Page"/>
                </div>
                <img src={mainPageImage} alt="Main Page" className="mainPageImage"/>
            </div>
            { landingPageView === "Login"
            ?   <Login 
                    loginUser = {loginUser}
                    handleChangeUser = {handleChangeUser}
                    handleLogin = {props.handleLogin}
                    setLandingPageView = {setLandingPageView}
                />
            :   <Register 
                    loginUser = {loginUser}
                    setUser = {props.setUser}
                    handleChangeUser = {props.handleChangeUser}
                    handleChangeView = {props.handleChangeView}
                    clearPasswords = {props.clearPasswords}
                />
            }
        </div>
    )
}

export default LandingPage;