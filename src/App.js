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
  const [server] = useState(
    // Set server to be local host if on development else use heroku backend server
    process.env.REACT_APP_ENVIRONMENT === 'development' ? "http://localhost:8000" : herokuServer
  )

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
  const checkCookieAuth = () => {
    axios.get(`${server}/`, {withCredentials: true})
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

  // View
  // Handle view change while navigating
  const handleChangeView = (view) => {
    setView(view)
  }
  // ------------------------------ END OF FUNCTIONS ------------------------------

  useEffect(() => {
    checkCookieAuth()
  },[])
  return (
    <div className="App">
      <Header 
        view = {view}
        user = {user}
        handleChangeView = {handleChangeView}
      />
      {
        user.loggedIn 
        ? <Home 
            user = {user}
            view = {view}
            server = {server}
            handleChangeView = {handleChangeView}
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
