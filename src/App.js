import { useEffect, useState } from 'react';

import './App.css';
import Header from './container/header/Header';
import Footer from './container/footer/Footer';
import LandingPage from './container/landingPage/LandingPage';
import Home from './container/home/Home';
import axios from 'axios';

const App = () => { 
  // ------------------------------ VARIABLES ------------------------------
  // Server
  const [server] = useState(process.env.REACT_APP_SERVER_URL)
  // View
  const [view, setView] = useState("Login")
  // User information
  const [user, setUser] = useState({
    id: "",
    username: "",
    loggedIn: false
  })
  // ------------------------------ END OF VARIABLES ------------------------------

  // ------------------------------ FUNCTIONS ------------------------------
  // View
  // Handle view change while navigating
  const handleChangeView = view => setView(view)
  // Access homeView in Home and pass to Header
  const [appView, setAppView] = useState("")
  const handleChangeHomeView = view => setAppView(view)
  // Check if current session has user
  const checkUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: server
    })
    .then(res => { 
      if(res.data.passport.user) {
        const user = res.data.passport.user
        setUser({...user, username: user.username, loggedIn: true})
      } else {
        console.log(res.response.message)
      }
    }).catch(err => console.log("Login"))
  }
  // ------------------------------ END OF FUNCTIONS ------------------------------
  useEffect(() => {
    checkUser()
  },[])
  return (
    <div className="App">
      <Header 
        view = {view}
        user = {user}
        server = {server}
        setUser = {setUser}
        handleChangeView = {handleChangeView}
        handleChangeHomeView = {() => handleChangeHomeView("Home")}
      />
      {
        user.loggedIn 
        ? <Home 
            user = {user}
            server = {server}
            appView = {appView}
          
            handleChangeView = {handleChangeView}
            handleChangeHomeView = {() => handleChangeHomeView("")}
          />
        : <LandingPage 
            setUser = {setUser}
            server = {server}
          /> 
      }
      <Footer />
    </div>
  );
}

export default App;
