import './App.css';
import { useState } from 'react';
import Main from './container/plan/PlansList';
import Add from './container/add/Add';
import Show from './container/show/Show';
import Header from './container/header/Header';
import Footer from './container/footer/Footer';
import EditPlan from './container/edit/EditPlan';
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
  const [loginMessage, setLoginMessage] = useState("")
  
  // User information
  const [user, setUser] = useState({
    username: "",
    password: "",
    verifyPassword: "",
    loggedIn: false
  })
  
  // Plans
  const [plans, setPlans] = useState([])
  let [openPlan, setOpenPlan] = useState({});

  let [openBill, setOpenBill] = useState({})
  // FUNCTIONS
  // Login
  const handleLogin = (event) => {
    event.preventDefault();
    fetch(server+"/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': "*"
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      if (data.username) {
        delete user.password
        setUser({...user, ...data, loggedIn: true})
      } else {
        setLoginMessage(data.message) 
      }
      return data
    })
    .catch(err => {
      console.error("Error : ", err)
      clearPasswords()
      setLoginMessage(err.message)
    })
    .then(data => {
      getplans(data._id)
      setView("Main")
    })
  }

  const handleSignout = () => {
    console.log("Sign Out Completely")
    fetch(server+"/users/signout")
    .then(res => res.json())
    .then(data => setLoginMessage(data.message))
    setUser({
      username: "",
      password: "",
      verifyPassword: "",
      loggedIn: false
    })
  }

  const handleChangeUser = (event) => {
    event.preventDefault()
    setUser({...user, [event.target.name]: event.target.value})
  }

  const clearPasswords = () => {
    setUser({...user, password: "", verifyPassword: ""})
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
        user.loggedIn ?
        <>
        {
          view === "Main"
          ?
          <>
            <Main
              view={view}
              user = {user}
              plans = {plans}
              server = {server}
              handleChangeView = {handleChangeView}
              handleShowPlan = {handleShowPlan}
              getplans = {getplans}
            />
            <i className="fi fi-rr-exit signout" onClick={handleSignout}></i>
          </>
          : view === "Add"
          ? <Add
              handleChangeView = {handleChangeView}
              user = {user}
              server = {server}
              addPlan = {addPlan}
            />
          : view === "Show"
          ? <Show
              openPlan = {openPlan}
              handleChangeView = {handleChangeView}
            />
          : view === "Edit" ?
            <EditPlan
              openPlan = {openPlan}
              server = {server}
              handleChangeView = {handleChangeView} 
              updatePlans = {updatePlans}
            />
          : view === "Home" ?
            <Home 
              user = {user}
              plans = {plans} 
              view = {view}
              server = {server}
              handleChangeView = {handleChangeView}
              setOpenBill = {setOpenBill}
            />
          : <></>
          }
        </>
        : <LandingPage 
          view = {view}
          user = {user}
          loginMessage = {loginMessage}
          setUser = {setUser}
          handleChangeUser = {handleChangeUser}
          handleChangeView = {handleChangeView}
          handleLogin = {handleLogin}
          clearPasswords = {clearPasswords}
        /> 
      }
      <Footer />
    </div>
  );
}

export default App;
