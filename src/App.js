import { useEffect, useState } from 'react';
import axios from 'axios'

import './App.css';
import Header from './container/header/Header';
import Footer from './container/footer/Footer';
import LandingPage from './container/landingPage/LandingPage';
import Home from './container/home/Home';

const App = () => { 
  // VARIABLES

  // Server
  const herokuServer = process.env.REACT_APP_SERVER_URL 
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

  // FUNCTIONS
  // Authenticate app if user session exist in server side


  // View
  // Handle view change while navigating
  const handleChangeView = view => setView(view)

  // Access homeView in Home and pass to Header
  const [appView, setAppView] = useState("")
  const handleChangeHomeView = view => setAppView(view)
  
  
  // ------------------------------ END OF FUNCTIONS ------------------------------

  useEffect(() => {
    const checkCookieAuth = () => {
      axios.get(`http://192.168.1.80:8000`)
      .then(res => {
        if (res.data._id) {
          const userData = res.data
          setUser({
            id: userData._id,
            username: userData.username,
            loggedIn: true
          })
        }
      })
    }
    checkCookieAuth()
  },[server])
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
