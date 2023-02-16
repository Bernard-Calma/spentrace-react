import "./Login.css"

const Login = () => {
    return(
        <div className="containerLogin">
            <h1> LOGIN </h1>
            <form className="formLogin">
                <label htmlFor="username">
                    Username: 
                    <input type="text" name="username" placeholder="username"/>
                </label>
                <label htmlFor="password">
                    Password: 
                    <input type="password" name="password" placeholder="password"/>
                </label>
                <button className="btnLogin">Login</button>
            </form>
        </div>
    )
}

export default Login;