import LabelInput from "../../../common/LabelInput";
import { userLogin } from "../../../features/userSlice";
import "./Login.css"

import {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
const Login = (props) => {
    const dispatch = useDispatch()

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const handleChange = e => {
        e.preventDefault()
        setUser({...user, [e.target.name]: e.target.value})
    }
    
    return(
        <div className="containerLogin">
            <h1 className="loginTitle"> LOGIN </h1>
            <form 
                className="formLogin" 
                onSubmit={e => {
                    e.preventDefault()
                    dispatch(userLogin(user))
                }}
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
                {props.errorMessage !== ""
                    ? <p className="loginMessage">{props.errorMessage}</p> 
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