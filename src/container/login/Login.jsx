import "./Login.css"
const Login = (props) => {
    return(
        <div className="containerLogin">
            <h1 className="loginTitle"> LOGIN </h1>
            <form className="formLogin" onSubmit={props.handleLogin}>
                <input type="text" name="username" placeholder="username" value={props.user.username} onChange={props.handleChangeUser}/>
                <input type="password" name="password" placeholder="password" value={props.user.password} onChange={props.handleChangeUser}/>
                {
                    props.loginMessage !== ""? <p className="loginMessage">{props.loginMessage}</p> : <></>
                }
                <button className="btnLogin">Login</button>
            </form>
            <p className="registerText">Don't have an account yet? <span onClick={() => props.handleChangeView("Register")} className="registerText registerLink">Register Here</span></p>
        </div>
    )
}

export default Login;