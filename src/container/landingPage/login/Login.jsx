import LabelInput from "../../../common/LabelInput";
import { userLogin } from "../../../features/userSlice";
import "./Login.css"

import {useState} from "react"
import {useDispatch} from "react-redux"
const Login = (props) => {
    const dispatch = useDispatch()

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
            return
        } else {
            dispatch(userLogin(user))
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
                {user.errorMessage !== ""
                    ? <p className="loginMessage">{user.errorMessage}</p> 
                    : <></>
                }
                <button className="btnLogin">Login</button>
            </form>
            <p className="registerText">Don't have an account yet? 
                <span 
                    onClick={() => props.handleChangeView("Register")} 
                    className="registerText registerLink"
                > Register Here
                </span>
            </p>
        </div>
    );
};

export default Login;