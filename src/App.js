import { useEffect, useState } from 'react';

import './App.css';
import Header from './common/Header';
import Footer from './container/footer/Footer';
import LandingPage from './container/landingPage/LandingPage';
import Home from './container/home/Home';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux"
import { store } from './store';
import { getUser } from './features/userSlice';

const App = () => { 
  // ------------------------------ VARIABLES ------------------------------
  // Server
  const [server] = useState(process.env.REACT_APP_SERVER_URL);
  // View
  const [view, setView] = useState("Login");
  const [appView, setAppView] = useState("");
  // User information
  const {user, loggedIn} = useSelector(store => store.user)
  console.log(user)
  // const [user, setUser] = useState({
  //   username: "",
  //   loggedIn: false
  // });
  // Reducers
  const dispatch = useDispatch()
  // ------------------------------ END OF VARIABLES ------------------------------

  // ------------------------------ FUNCTIONS ------------------------------
  // View
  // Handle view change while navigating
  const handleChangeView = view => setView(view);
  // Access homeView in Home and pass to Header
  const handleChangeHomeView = view => setAppView(view);
  // ------------------------------ END OF FUNCTIONS ------------------------------
  useEffect(() => {
    // Check if current session has user
    dispatch(getUser());
  },[loggedIn]);

  return (
    <div className="App">
      <Header 
        view = {view}
        user = {user}
        server = {server}
        // setUser = {setUser}
        handleChangeView = {handleChangeView}
        handleChangeHomeView = {() => handleChangeHomeView("Home")}
      />
      {loggedIn 
        ? <Home 
            user = {user}
            server = {server}
            appView = {appView}
            handleChangeView = {handleChangeView}
            handleChangeHomeView = {() => handleChangeHomeView("")}
          />
        : <LandingPage 
            // setUser = {setUser}
            server = {server}
          /> 
      }
      <Footer />
    </div>
  );
}

export default App;
