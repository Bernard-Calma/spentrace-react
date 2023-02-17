import { useState } from "react";
import "./Login.css"

const Login = (props) => {
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    })

    const handleChange = (event) => {
        props.setUser({...props.user, [event.target.name]: event.target.value})
    }

    return(
        <div className="containerLogin">
            <h1> LOGIN </h1>
            <form className="formLogin" onSubmit={props.handleLogin}>
                <label htmlFor="username">
                    Username: 
                    <input type="text" name="username" placeholder="username" value={props.user.username} onChange={handleChange}/>
                </label>
                <label htmlFor="password">
                    Password: 
                    <input type="password" name="password" placeholder="password" value={props.user.password} onChange={handleChange}/>
                </label>
                <button className="btnLogin">Login</button>
            </form>
        </div>
    )
}

export default Login;