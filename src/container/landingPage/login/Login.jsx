import {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import { userLogin } from "../../../features/userSlice";
import LabelInput from "../../../common/LabelInput";

const Login = ({view, handleChangeView}) => {
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

    const handleDemoLogin = () => {
        setUser({
            username: "demoUser",
            password: "demoPass",
            errorMessage: ""
        });
        dispatch(userLogin({
            username: "demoUser",
            password: "demoPass"
        }));
    }

    return(
        <div className="container login-register">
            <h2 className="title">Login</h2>
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
                <button className="btnLogin">Sign in</button>
            </form>
            <p className="registerText">Don't have an account yet? 
                <span 
                    onClick={() => handleChangeView()} 
                    className="registerText registerLink"
                > Register Here
                </span> 
            </p>
            <p>or<span 
                    onClick={handleDemoLogin} 
                    className="registerText registerLink"
                > Try Demo
                </span></p>
                
          </div>
    );
};

export default Login;