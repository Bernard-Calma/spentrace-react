import { useDispatch, useSelector } from "react-redux";

// Landing Page Images
import mobilePage from "../../assets/img/MobilePage.png";

// Conponents
import Login from "./login/Login";
import Register from "./login/Register";
import { useEffect, useState } from "react";
import { clearError } from "../../features/userSlice";

import "./landingpage.scss";

const LandingPage = () => {
  const dispatch = useDispatch();
  const [view, setView] = useState("Login");

  useEffect(() => {
    dispatch(clearError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);
  return (
    <div className="container landing-page">
      <div className="landing-page_header">
        <h1 className="app-title">
          Spen<span>trace</span>
        </h1>
        <p>Smart tracking. Smarter Spending,</p>
      </div>
      <div className="container login">
        <div className="introduction">
          <h2>Why Spentrace?</h2>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>✅ Track your expenses and income effortlessly</li>
            <li>📅 See upcoming bills in a single view</li>
            <li>🎯 Know exactly how much you need to earn next</li>
          </ul>
        </div>
        <img src={mobilePage} alt="Main Page" className="mobilePageImage" />
        {view === "Login" ? (
          <Login handleChangeView={() => setView("Register")} />
        ) : (
          <Register handleChangeView={() => setView("Login")} />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
