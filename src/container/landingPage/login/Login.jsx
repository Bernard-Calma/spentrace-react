import {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import { userLogin } from "../../../features/userSlice";
import { changeView } from "../../../features/viewSlice";

import LabelInput from "../../../common/LabelInput";

import "./Login.css"

const Login = () => {
    const dispatch = useDispatch()
    const {
        errorMessage
    } = useSelector(store => store.user)

    const [user, setUser] = useState({
        username: "",
        password: "",
        errorMessage: "",
    })

    const handleChange = e => setUser({...user, [e.target.name]: e.target.value})
    
    const handleLogin = e => {
        e.preventDefault();
        // USERNAME CHECK
        let checkForSpace = user.username.match(" ") || user.password.match(" ");
        if(checkForSpace) {
            setUser({...user, 
                password: "",
                errorMessage: "Invalid Username or Password"});
            return;
        } else {
            dispatch(userLogin(user));
            setUser({...user, password: ""});
        }
    }

    return(
        <div className="containerLogin">
            <h1 className="loginTitle"> LOGIN </h1>
            <form 
                className="formLogin" 
                onSubmit={handleLogin}
            >
                <LabelInput 
                    type="text"
                    name="username"
                    placeholder="username" 
                    value={user.username} 
                    onChange={handleChange} 
                    required
                />
                <LabelInput 
                    type="password" 
                    name="password" 
                    placeholder="password" 
                    value={user.password} 
                    onChange={handleChange} 
                    required
                />
                {
                    errorMessage && 
                        <p className="loginMessage">{errorMessage}</p> 
                }
                <button className="btnLogin">Login</button>
            </form>
            <p className="registerText">Don't have an account yet? 
                <span 
                    onClick={() => dispatch(changeView({view: "Register"}))} 
                    className="registerText registerLink"
                > Register Here
                </span>
            </p>
        </div>
    );
};

export default Login;