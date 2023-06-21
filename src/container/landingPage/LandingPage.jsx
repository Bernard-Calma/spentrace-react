import { useState } from "react";
// Landing Page Images
import mainPageImage from "../../assets/img/MainPage.png"
import mobilePage from "../../assets/img/MobilePage.png"

// Conponents
import Login from "./login/Login";
import Register from "./login/Register";
import "./landingPage.css"

const LandingPage = (props) =>{
    let [landingPageView, setLandingPageView] = useState("Login");
    const handleChangeView = view => setLandingPageView(view);

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
            {landingPageView === "Login"
                ? <Login 
                    handleChangeView = {handleChangeView}
                />
                : <Register 
                    handleChangeView = {handleChangeView}
                />
            }
        </div>
    );
};

export default LandingPage;