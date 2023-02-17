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

    const handleLogin = (event) => {
        event.preventDefault();
        fetch("http://localhost:8000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("data", data)
        })
    }

    return(
        <div className="containerLogin">
            <h1> LOGIN </h1>
            <form className="formLogin" onSubmit={handleLogin}>
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