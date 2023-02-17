import { useState } from "react";
import "./Login.css"

const Login = () => {
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    })

    const handleChange = (event) => {
        setLoginData({...loginData, [event.target.name]: event.target.value})
    }

    return(
        <div className="containerLogin">
            <h1> LOGIN </h1>
            <form className="formLogin" action="POST">
                <label htmlFor="username">
                    Username: 
                    <input type="text" name="username" placeholder="username" value={loginData.username} onChange={handleChange}/>
                </label>
                <label htmlFor="password">
                    Password: 
                    <input type="password" name="password" placeholder="password" value={loginData.password} onChange={handleChange}/>
                </label>
                <button className="btnLogin">Login</button>
            </form>
        </div>
    )
}

export default Login;