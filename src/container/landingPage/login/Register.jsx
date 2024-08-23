import { useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { setError, userRegister } from "../../../features/userSlice";
import { changeView } from "../../../features/viewSlice";

import BackButton from "../../../Components/Buttons/BackButton"
import LabelInput from "../../../common/LabelInput";

const Register = () => {
    const dispatch = useDispatch()
    const {errorMessage} = useSelector(store => store.user)
    // console.log(useSelector(store => store.user))
    const [newUser, setNewUser] = useState({
        email: "",
        username: "",
        password: "",
        verifyPassword: "",
        errorMessage: "",
    })

    const handleChange = e => setNewUser({...newUser, [e.target.name]: e.target.value})
    const clearPasswords = () => setNewUser({
        ...newUser, 
        password: "", 
        verifyPassword: ""
    });

    const handleRegister = e => {
        e.preventDefault();
            // USERNAME CHECK
            let checkSpaceUserName = newUser.username.match(" ");
            if(checkSpaceUserName) {
                clearPasswords();
                dispatch(setError("Username must not contain any spaces."));
                return
            };
            // PASSWORD CHECK
            let verifyPasswordMatch = newUser.password === newUser.verifyPassword;
            let checkSpacePassword = newUser.password.match(" ") || newUser.verifyPassword.match(" ");
            let checkPasswordLength = newUser.password.length > 5;
            if (!checkPasswordLength) {
                clearPasswords();
                dispatch(setError("Password should be at least 6 characters."));
            } else if (checkSpacePassword) {
                clearPasswords();
                dispatch(setError("Password must not contain any spaces."));
            } else if (!verifyPasswordMatch){
                clearPasswords();
                dispatch(setError("Password does not match."));
            } else {
                dispatch(userRegister(newUser))
                clearPasswords();
            };
    }
    return(
        <div className="containerRegister">
            <div className="registerHeader">
                <BackButton handleChangeView = {() => dispatch(changeView({view: "Login"}))} />
                <h1 className="registerTitle">REGISTER</h1>
            </div>
            <form className="formRegister" onSubmit={handleRegister}>
                <LabelInput 
                    htmlFor="email"
                    text="Email"
                    type="email" 
                    name="email" 
                    placeholder="email" 
                    value={newUser.email} 
                    onChange={handleChange} 
                    required
                />

                <LabelInput 
                    htmlFor="username"
                    text="Username"
                    type="text" 
                    name="username" 
                    placeholder="username" 
                    value={newUser.username} 
                    onChange={handleChange} 
                    required
                />

                <LabelInput 
                    htmlFor="password"
                    text="Password"
                    type="password" 
                    name="password" 
                    placeholder="password" 
                    value={newUser.password} 
                    onChange={handleChange} 
                    required
                />

                <LabelInput 
                    htmlFor="verifyPassword"
                    text="Verify Password"
                    type="password" 
                    name="verifyPassword" 
                    placeholder="verify password" 
                    value={newUser.verifyPassword} 
                    onChange={handleChange} 
                    required
                />
                {errorMessage !== ""
                    ? <p className="loginMessage">{errorMessage}</p> 
                    : <></>
                }
                <button className="btnLogin">Register</button>
            </form>
        </div>
    );
};

export default Register;