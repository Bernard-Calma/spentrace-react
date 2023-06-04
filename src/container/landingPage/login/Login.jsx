import LabelInput from "../../../common/LabelInput";
import "./Login.css"
const Login = (props) => {
    return(
        <div className="containerLogin">
            <h1 className="loginTitle"> LOGIN </h1>
            <form 
                className="formLogin" 
                onSubmit={props.handleLogin}
            >
                <LabelInput 
                    type="text"
                    name="username"
                    placeholder="username" 
                    value={props.loginUser.username} 
                    onChange={props.handleChangeUser} 
                    required
                />
                <LabelInput 
                    type="password" 
                    name="password" 
                    placeholder="password" 
                    value={props.loginUser.password} 
                    onChange={props.handleChangeUser} 
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