import axios from "axios";
import { useState } from "react";
import BackButton from "../../Components/Buttons/BackButton"

const Register = (props) => {
    let [registerMessage, setRegisterMessage] = useState("")
    const handleSubmitRegister = (e) => {
        e.preventDefault();
        // console.log(props.user)
        // USERNAME CHECK
        let checkSpaceUserName = props.user.username.match(" ")
        if(checkSpaceUserName) {
            props.clearPasswords()
            setRegisterMessage("Username must not contain any spaces.")
            return
        }
        // PASSWORD CHECK
        let verifyPasswordMatch = props.user.password === props.user.verifyPassword
        let checkSpacePassword = props.user.password.match(" ") || props.user.verifyPassword.match(" ")
        let checkPasswordLength = props.user.password.length > 5
        // console.log(checkPasswordLength)
        if (!checkPasswordLength) {
            props.clearPasswords()
            setRegisterMessage("Password should be at least 6 characters.")
        } else if (checkSpacePassword) {
            props.clearPasswords()
            setRegisterMessage("Password must not contain any spaces.")
        } else if (!verifyPasswordMatch){
            props.clearPasswords()
            setRegisterMessage("Password does not match.")
        } else {
            // console.log("Register Sucessfully")
            axios({
                method: "POST",
                url: `${props.server}/users/register`,
                data: props.user,
                withCredentials: true,
            })
            .then(res => {
                setRegisterMessage("Registration Complete")
                props.setUser({...res.data.user, loggedIn: true})
                props.handleChangeView("Main")
                   
            })
            .catch(error => {
                console.log(error)
                setRegisterMessage(error.response.data.message)
            })
        }
    }
    return(
        <div className="containerRegister">
            <div className="registerHeader">
                <BackButton handleChangeView = {props.handleChangeView}/>
                <h1 className="registerTitle">REGISTER</h1>
            </div>
            <form className="formRegister" onSubmit={handleSubmitRegister}>
                <label htmlFor="email">
                    Email: 
                    <input type="text" name="email" placeholder="username" value={props.user.email} onChange={props.handleChangeUser} required/>
                </label>
                <label htmlFor="username">
                    Username: 
                    <input type="text" name="username" placeholder="username" value={props.user.username} onChange={props.handleChangeUser} required/>
                </label>
                <label htmlFor="password">
                    Password: 
                    <input type="password" name="password" placeholder="password" value={props.user.password} onChange={props.handleChangeUser} required/>
                </label>
                <label htmlFor="verifyPassword">
                    Verify Password: 
                    <input type="password" name="verifyPassword" placeholder="verify password" value={props.user.verifyPassword} onChange={props.handleChangeUser} required/>
                </label>
                {
                    registerMessage !== ""? <p className="loginMessage">{registerMessage}</p> : <></>
                }
                <button className="btnLogin">Register</button>
            </form>
        </div>
    )
}

export default Register