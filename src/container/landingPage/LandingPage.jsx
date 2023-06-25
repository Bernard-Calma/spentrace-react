import { useSelector } from "react-redux";
// Landing Page Images
import mainPageImage from "../../assets/img/MainPage.png"
import mobilePage from "../../assets/img/MobilePage.png"

// Conponents
import Login from "./login/Login";
import Register from "./login/Register";
import "./landingPage.css"

const LandingPage = () =>{
    const { view } = useSelector(store => store.view)
    return(
        <div className="containerLandingPage">
            <div className="introduction">
                <div className="mobilePageImage">
                    <p>Spentrace will help you list your earnings and expenses then provides how much you need to earn for your next bills.</p>
                    <img 
                        src={mobilePage} 
                        alt="Main Page"
                    />
                </div>
                <img 
                    src={mainPageImage} 
                    alt="Main Page" 
                    className="mainPageImage"
                />
            </div>
            {view === "Login" ? <Login/> : <Register/>}
        </div>
    );
};

export default LandingPage;