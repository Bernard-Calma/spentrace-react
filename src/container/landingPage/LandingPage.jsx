import Login from "../login/Login";
import Register from "../login/Register";
import "./landingPage.css"

const LandingPage = (props) =>{
    return(
        <div className="containerLandingPage">
            <div className="introduction">
                <p>Spentrace can help you list your earnings and expenses and provide how much you need to earn for your next bills</p>
            </div>
            { props.view === "Register"
            ?
            <Register 
                setUser = {props.setUser}
                user = {props.user}
                handleChange = {props.handleChange}
                handleChangeView = {props.handleChangeView}
            />
            :
            <Login 
                handleChange = {props.handleChange}
                handleLogin = {props.handleLogin}
                handleChangeView = {props.handleChangeView}
                setUser = {props.setUser}
                user = {props.user}
                loginMessage = {props.loginMessage}
            />
            }
        </div>
    )
}

export default LandingPage;