import { useState } from "react";
import axios from "axios";

// Landing Page Images
import mainPageImage from "../../img/MainPage.png"
import mobilePage from "../../img/MobilePage.png"

import Login from "./login/Login";
import Register from "./login/Register";
import "./landingPage.css"

const LandingPage = (props) =>{
    // VARIABLES
    // User
    const [loginUser, setLoginUser] = useState({
        username: "",
        password: "",
        verifyPassword: "",
    });
    // View
    let [landingPageView, setLandingPageView] = useState("Login");
    let [errorMessage, setErrorMessage] = useState("");
    // ------------------------------ END OF VARIABLES ------------------------------

    // FUNCTIONS
    // Handle input changes
    const handleChangeUser = event => setLoginUser({
        ...loginUser, 
        [event.target.name]: event.target.value
    });

    const clearPasswords = () => setLoginUser({
        ...loginUser, 
        password: "", 
        verifyPassword: ""
    });
    

    const handleChangeView = view => {
        // Clear inputs when switching from login and register
        setLoginUser({
            email: "",
            username: "",
            password: "",
            verifyPassword: "",
        });
        clearPasswords();
        setLandingPageView(view);
    };

    // Register
    const handleSubmitRegister = event => {
        event.preventDefault();
        // USERNAME CHECK
        let checkSpaceUserName = loginUser.username.match(" ");
        if(checkSpaceUserName) {
            clearPasswords();
            setErrorMessage("Username must not contain any spaces.");
            return
        };
        // PASSWORD CHECK
        let verifyPasswordMatch = loginUser.password === loginUser.verifyPassword;
        let checkSpacePassword = loginUser.password.match(" ") || loginUser.verifyPassword.match(" ");
        let checkPasswordLength = loginUser.password.length > 5;
        if (!checkPasswordLength) {
            clearPasswords();
            setErrorMessage("Password should be at least 6 characters.");
        } else if (checkSpacePassword) {
            clearPasswords();
            setErrorMessage("Password must not contain any spaces.");
        } else if (!verifyPasswordMatch){
            clearPasswords();
            setErrorMessage("Password does not match.");
        } else {
            axios({
                method: "POST",
                url: `${props.server}/users/register`,
                data: loginUser,
                withCredentials: true
            })
            .then(res => {
                const data = res.data;
                props.setUser({
                    id: data._id,
                    username: data.username,
                    loggedIn: true
                });
            }) 
            .catch(error => {
                console.log("Registration Error: ", error);
                clearPasswords();
                setErrorMessage(error.response.data.message );
            });
        };
    };

    // Login
    const handleLogin = event => {
        event.preventDefault();
        axios({
            method: 'POST',
            url: props.server+"/users/login",
            data: loginUser,
            withCredentials: true
        })
        .then(res => {
            // console.log(res);
            props.setUser({
                username: res.data.user,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log("Login Error: ", err);
            clearPasswords();
            setErrorMessage("Invalid username or password");
        })
    }
    // ------------------------------ END OF FUNCTIONS ------------------------------

    return(
        <div className="containerLandingPage">
            <div className="introduction">
                <div className="mobilePageImage">
                    <p>Spentrace will help you list your earnings and expenses then provides how much you need to earn for your next bills.</p>
                    <img 
                        src={mobilePage} 
                        alt="Main Page"
                    />
                </div>
                <img 
                    src={mainPageImage} 
                    alt="Main Page" 
                    className="mainPageImage"
                />
            </div>
            {landingPageView === "Login"
                ? <Login 
                    loginUser = {loginUser}
                    errorMessage = {errorMessage}
                    handleChangeUser = {handleChangeUser}
                    handleChangeView = {handleChangeView}
                    handleLogin = {handleLogin}   
                />
                : <Register 
                    loginUser = {loginUser}
                    errorMessage = {errorMessage}
                    handleChangeUser = {handleChangeUser}
                    handleChangeView = {handleChangeView}
                    handleSubmitRegister = {handleSubmitRegister}
                    clearPasswords = {clearPasswords}
                />
            }
        </div>
    );
};

export default LandingPage;