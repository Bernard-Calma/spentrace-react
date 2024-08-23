import { useDispatch, useSelector } from "react-redux";
// Landing Page Images
import mainPageImage from "../../assets/img/MainPage.png"
import mobilePage from "../../assets/img/MobilePage.png"

// Conponents
import Login from "./login/Login";
import Register from "./login/Register";
import "./landingPage.css"
import { useEffect } from "react";
import { clearError } from "../../features/userSlice";

const LandingPage = () =>{
    const dispatch = useDispatch();
    const { view } = useSelector(store => store.view)
    
    useEffect(() => {
        dispatch(clearError())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[view])
    return(
        <div className="containerLandingPage">
            <div className="introduction">
                <div className="mobilePageImage">
                    <p>Spentrace will help you track your earnings and expenses then provides how much you need to earn for your next bills.</p>
                    <img 
                        src={mainPageImage} 
                        alt="Main Page" 
                        className="mainPageImage"
                    />
                                  
                </div>
                    <img
                        src={mobilePage} 
                        alt="Main Page"
                        className="mobilePageImage"
                    />
            </div>
            {view === "Login" 
                ? <Login/> 
                : <Register/>
            }
        </div>
    );
};

export default LandingPage;