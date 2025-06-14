import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { getUser } from './features/userSlice';

import Footer from './container/footer/Footer';
import LandingPage from './container/landingPage/LandingPage';
import Home from './container/home/Home';

import './app.scss';
import DemoHome from './container/demo/DemoHome';

const App = () => { 
  const dispatch = useDispatch()
  // ------------------------------ VARIABLES ------------------------------
  // User information
  const {
    loggedIn,
    demo
  } = useSelector(store => store.user)
  // ------------------------------ END OF VARIABLES ------------------------------

  useEffect(() => {
    // Check if current session has user
    dispatch(getUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div className="App">
      {/* Render DemoHome if demo is true */}
      {/* This allows for a demo experience without requiring login */}
      {
        demo && <DemoHome />
      }
      {/* Render Landing Page or Home based on loggedIn state */}
      { loggedIn
        ? <Home/> 
        : !demo
          ? <LandingPage/> 
          // If demo is true, render DemoHome instead of LandingPage
          // This allows for a demo experience without requiring login
          // and still provides the landing page experience for regular users
          // who are not logged in or using the demo.
        : <></> 
      }
      <Footer />
    </div>
  );
}

export default App;
