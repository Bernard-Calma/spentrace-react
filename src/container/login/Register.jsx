const Register = (props) => {
    
    return(
        <div className="containerRegister">
            <div className="registerHeader">
                <h1 className = "return" onClick={() => props.handleChangeView("")}>◄</h1>
                <h1 className="loginTitle">REGISTER</h1>
            </div>
            <form className="formRegister" action="">
                <label htmlFor="username">
                    Username: 
                    <input type="text" name="username" placeholder="username" value={props.user.username} onChange={props.handleChange}/>
                </label>
                <label htmlFor="password">
                    Password: 
                    <input type="password" name="password" placeholder="password" value={props.user.password} onChange={props.handleChange}/>
                </label>
                <label htmlFor="verifyPassword">
                    Verify Password: 
                    <input type="password" name="verifyPassword" placeholder="verify password" value={props.user.password} onChange={props.handleChange}/>
                </label>
                <button className="btnLogin">Register</button>
            </form>
        </div>
    )
}

export default Register