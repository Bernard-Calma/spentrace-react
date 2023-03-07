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
            fetch("http://localhost:8000/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(props.user)
            }).then(res => res.json())
            .then(data => {
                // console.log(data)
                if(data.error){
                    setRegisterMessage("Username is already taken")
                    props.clearPasswords()
                } else {
                    setRegisterMessage("Registration Complete")
                }
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
                <label htmlFor="username">
                    Username: 
                    <input type="text" name="username" placeholder="username" value={props.user.username} onChange={props.handleChange} required/>
                </label>
                <label htmlFor="password">
                    Password: 
                    <input type="password" name="password" placeholder="password" value={props.user.password} onChange={props.handleChange} required/>
                </label>
                <label htmlFor="verifyPassword">
                    Verify Password: 
                    <input type="password" name="verifyPassword" placeholder="verify password" value={props.user.verifyPassword} onChange={props.handleChange} required/>
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