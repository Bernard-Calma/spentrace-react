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
        verifyPassword: "",
    })
    let [landingPageView, setLandingPageView] = useState("Login")
    let [errorMessage, setErrorMessage] = useState("")

    const handleChangeUser = (event) => {
        setLoginUser({...loginUser, [event.target.name]: event.target.value})
    }

    // Register
    const handleSubmitRegister = (e) => {
        e.preventDefault();
        // console.log(loginUser)
        // USERNAME CHECK
        let checkSpaceUserName = loginUser.username.match(" ")
        if(checkSpaceUserName) {
            props.clearPasswords()
            setErrorMessage("Username must not contain any spaces.")
            return
        }
        // PASSWORD CHECK
        let verifyPasswordMatch = loginUser.password === loginUser.verifyPassword
        let checkSpacePassword = loginUser.password.match(" ") || loginUser.verifyPassword.match(" ")
        let checkPasswordLength = loginUser.password.length > 5
        // console.log(checkPasswordLength)
        if (!checkPasswordLength) {
            props.clearPasswords()
            setErrorMessage("Password should be at least 6 characters.")
        } else if (checkSpacePassword) {
            props.clearPasswords()
            setErrorMessage("Password must not contain any spaces.")
        } else if (!verifyPasswordMatch){
            props.clearPasswords()
            setErrorMessage("Password does not match.")
        } else {
            console.log("Register Sucessfully")
            // fetch("http://localhost:8000/users/register", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(loginUser)
            // }).then(res => res.json())
            // .then(data => {
            //     // console.log(data)
            //     if(data.error){
            //         setRegisterMessage("Username is already taken")
            //         props.clearPasswords()
            //     } else {
            //         setRegisterMessage("Registration Complete")
            //     }
            // })
        }
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
                    errorMessage = {errorMessage}
                    handleChangeUser = {handleChangeUser}
                    setLandingPageView = {setLandingPageView}
                    handleSubmitRegister = {handleSubmitRegister}
                    clearPasswords = {props.clearPasswords}
                />
            }
        </div>
    )
}

export default LandingPage;