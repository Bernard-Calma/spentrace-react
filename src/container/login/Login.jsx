import "./Login.css"

const Login = (props) => {
    return(
        <div className="containerLogin">
            <h1> LOGIN </h1>
            <form className="formLogin" onSubmit={props.handleLogin}>
                <label htmlFor="username">
                    Username: 
                    <input type="text" name="username" placeholder="username" value={props.user.username} onChange={props.handleChange}/>
                </label>
                <label htmlFor="password">
                    Password: 
                    <input type="password" name="password" placeholder="password" value={props.user.password} onChange={props.handleChange}/>
                </label>
                <button className="btnLogin">Login</button>
            </form>
            <p onClick={() => props.handleChangeView("Register")}>Register Here</p>
        </div>
    )
}

export default Login;