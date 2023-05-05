import BackButton from "../../../Components/Buttons/BackButton"
import LabelInput from "../../../common/LabelInput";

const Register = props => {
    return(
        <div className="containerRegister">
            <div className="registerHeader">
                <BackButton handleChangeView = {() => props.handleChangeView("Login")} />
                <h1 className="registerTitle">REGISTER</h1>
            </div>
            <form className="formRegister" onSubmit={props.handleSubmitRegister}>
                <LabelInput 
                    htmlFor="email"
                    text="Email"
                    type="email" 
                    name="email" 
                    placeholder="email" 
                    value={props.loginUser.email} 
                    onChange={props.handleChangeUser} 
                    required
                />

                <LabelInput 
                    htmlFor="username"
                    text="Username"
                    type="text" 
                    name="username" 
                    placeholder="username" 
                    value={props.loginUser.username} 
                    onChange={props.handleChangeUser} 
                    required
                />

                <LabelInput 
                    htmlFor="password"
                    text="Password"
                    type="password" 
                    name="password" 
                    placeholder="username" 
                    value={props.loginUser.password} 
                    onChange={props.handleChangeUser} 
                    required
                />

                <LabelInput 
                    htmlFor="verifyPassword"
                    text="Verify Password"
                    type="password" 
                    name="password" 
                    placeholder="verify password" 
                    value={props.loginUser.verifyPassword} 
                    onChange={props.handleChangeUser} 
                    required
                />
                {props.errorMessage !== ""
                    ? <p className="loginMessage">{props.errorMessage}</p> 
                    : <></>
                }
                <button className="btnLogin">Register</button>
            </form>
        </div>
    );
};

export default Register;