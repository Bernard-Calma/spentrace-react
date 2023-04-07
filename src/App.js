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
  
  // Plans
  const [plans, setPlans] = useState([])
  let [openPlan, setOpenPlan] = useState({});

  let [openBill, setOpenBill] = useState({})
  // FUNCTIONS
  const checkCookieAuth = () => {
    axios.get(`${server}/`, {withCredentials: true})
    .then(res => {
      if (res.data) {
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
    // console.log("View changed to ", view)
    setView(view)
  }

  const handleShowPlan = (plan) => {
    setOpenPlan(plan)
    handleChangeView("Show")
  }

  // Plans
  const getplans = (id) => {
    fetch(process.env.REACT_APP_SERVER_URL+"/plans/" + id)
    .then(res => res.json())
    .then(data => {
      setPlans(data)
    })
  }

  const updatePlans = (newPlan) => {
    /**
     * This function udpates state
     * instead of doing an API call
     * to provide better performance
     * 
     * Return newplan if id matches inside current plans array.
     */
    let newPlansList = plans.map((plan)=> plan._id === newPlan._id ? newPlan : plan)
    setPlans(newPlansList); 
  }

  const addPlan = (newplan) => {
    setPlans([...plans, newplan])
  }

  useEffect(() => {
    checkCookieAuth()
  },[])

  return (
    <div className="App">
      <Header 
        view = {view}
        user = {user}
        plans = {plans}
        setPlans = {setPlans}
        handleChangeView = {handleChangeView}
        openPlan = {openPlan}
        openBill = {openBill}
      />
      {
        user.loggedIn 
        ? <Home 
            user = {user}
            plans = {plans} 
            view = {view}
            server = {server}
            handleChangeView = {handleChangeView}
            setOpenBill = {setOpenBill}
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
