import BackButton from "../../../Components/Buttons/BackButton"

const Register = (props) => {
    return(
        <div className="containerRegister">
            <div className="registerHeader">
                <BackButton handleChangeView = {props.handleChangeView}/>
                <h1 className="registerTitle">REGISTER</h1>
            </div>
            <form className="formRegister" onSubmit={props.handleSubmitRegister}>
                <label htmlFor="username">
                    Username: 
                    <input type="text" name="username" placeholder="username" value={props.loginUser.username} onChange={props.handleChangeUser} required/>
                </label>
                <label htmlFor="password">
                    Password: 
                    <input type="password" name="password" placeholder="password" value={props.loginUser.password} onChange={props.handleChangeUser} required/>
                </label>
                <label htmlFor="verifyPassword">
                    Verify Password: 
                    <input type="password" name="verifyPassword" placeholder="verify password" value={props.loginUser.verifyPassword} onChange={props.handleChangeUser} required/>
                </label>
                {
                    props.errorMessage !== ""? <p className="loginMessage">{props.errorMessage}</p> : <></>
                }
                <button className="btnLogin">Register</button>
            </form>
        </div>
    )
}

export default Register