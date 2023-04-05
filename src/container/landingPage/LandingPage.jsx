import { useState } from "react";
import axios from "axios";

import Login from "./login/Login";
import Register from "./login/Register";
import "./landingPage.css"
// Landing Page Image
import mainPageImage from "../../img/MainPage.png"
import mobilePage from "../../img/MobilePage.png"


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

    const clearPasswords = () => {
        setLoginUser({...loginUser, password: "", verifyPassword: ""})
    }

    // Register
    const handleSubmitRegister = (event) => {
        event.preventDefault();
        // console.log(loginUser)
        // USERNAME CHECK
        let checkSpaceUserName = loginUser.username.match(" ")
        if(checkSpaceUserName) {
            clearPasswords()
            setErrorMessage("Username must not contain any spaces.")
            return
        }
        // PASSWORD CHECK
        let verifyPasswordMatch = loginUser.password === loginUser.verifyPassword
        let checkSpacePassword = loginUser.password.match(" ") || loginUser.verifyPassword.match(" ")
        let checkPasswordLength = loginUser.password.length > 5
        // console.log(checkPasswordLength)
        if (!checkPasswordLength) {
            clearPasswords()
            setErrorMessage("Password should be at least 6 characters.")
        } else if (checkSpacePassword) {
            clearPasswords()
            setErrorMessage("Password must not contain any spaces.")
        } else if (!verifyPasswordMatch){
            clearPasswords()
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
            //     } else {
            //         setErrorMessage("Registration Complete")
            //     }
            // })
            setLoginUser({...loginUser, password: "", verifyPassword: ""})
            props.setUser({
                userID: 0,
                username: loginUser.username,
                loggedIn: true
            })
        }
    }

      // Login
    const handleLogin = (event) => {
        event.preventDefault();
        axios.post(props.server+"/users/login", loginUser)
        .then(res => {
            const data = res.data
            props.setUser({
                userID: data._id,
                username: data.username,
                loggedIn: true
            })
        })
        .catch(error => {
            setErrorMessage(error.response.data.message )
        })
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
                    errorMessage = {errorMessage}
                    handleChangeUser = {handleChangeUser}
                    handleLogin = {handleLogin}
                    setLandingPageView = {setLandingPageView}
                />
            :   <Register 
                    loginUser = {loginUser}
                    errorMessage = {errorMessage}
                    handleChangeUser = {handleChangeUser}
                    setLandingPageView = {setLandingPageView}
                    handleSubmitRegister = {handleSubmitRegister}
                    clearPasswords = {clearPasswords}
                />
            }
        </div>
    )
}

export default LandingPage;