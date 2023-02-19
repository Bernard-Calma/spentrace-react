import BackButton from "../../Components/Buttons/BackButton"

const Register = (props) => {

    return(
        <div className="containerRegister">
            <div className="registerHeader">
                <BackButton handleChangeView = {props.handleChangeView}/>
                <h1 className="loginTitle">REGISTER</h1>
            </div>
            <h1>Registration is closed for now.</h1>
            <h1>Use "test1" user to test</h1>
            {/* <form className="formRegister" action="">
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
            </form> */}
        </div>
    )
}

export default Register