import './App.css';
import { useState } from 'react';
import Main from './container/main/Main';
import Add from './container/add/Add';
import Show from './container/show/Show';
import Header from './container/header/Header';
import Footer from './container/footer/Footer';
import EditPlan from './container/edit/EditPlan';
import LandingPage from './container/landingPage/LandingPage';
import Home from './container/home/Home';
import BillsList from './container/billsList/BillsList';
import AddBill from './container/add/AddBill';
import ShowBill from './container/show/ShowBill';
import EdditBill from './container/edit/EditBill';

const App = () => { 
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
  
  // plans Information
  const [plans, setPlans] = useState([])
  let [openPlan, setOpenPlan] = useState({});

  // Bills Information
  const [bills, setBills] = useState([])
  const [openBill, setOpenBill] = useState()

  const handleChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value})
  }

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

  // Handle view change while navigating
  const handleChangeView = (view) => {
    // console.log("View changed to ", view)
    setView(view)
  }

  const handleShowPlan = (plan) => {
    setOpenPlan(plan)
    handleChangeView("Show")
  }

  // CLEAR PASSWORDS
  const clearPasswords = () => {
    setUser({...user, password: "", verifyPassword: ""})
  }

  // UPDATE planS
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

  const updateBills = (newBill) => {
    let newBillsList = bills.map((bill)=> bill._id === newBill._id ? newBill : bill)
    setPlans(newBillsList); 
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
          : view === "Show Bill"
          ? <ShowBill
              handleChangeView = {handleChangeView}
              openBill = {openBill}
            />
          : view === "Edit" ?
            <EditPlan
              openPlan = {openPlan}
              server = {server}
              handleChangeView = {handleChangeView} 
              updatePlans = {updatePlans}
            />
          : view === "Edit Bill" ?
            <EdditBill
              openBill = {openBill}
              server = {server}
              handleChangeView = {handleChangeView} 
              updateBills = {updateBills}
            />
          : view === "Home" ?
            <Home 
              handleChangeView = {handleChangeView}   
              plans = {plans} 
            />
          : view === "Bills List" ?
            <BillsList
              handleChangeView = {handleChangeView}
              handleShowPlan = {handleShowPlan}
              setBills = {setBills}
              setOpenBill = {setOpenBill}
              server = {server}
              user = {user}
              bills = {bills}
            />  
            : view === "Add Bill"
            ? <AddBill
                handleChangeView = {handleChangeView}
                user = {user}
                server = {server}
                addPlan = {addPlan}
              />
            : <></>
          }
        </>
        : <LandingPage 
          view = {view}
          user = {user}
          loginMessage = {loginMessage}
          setUser = {setUser}
          handleChange = {handleChange}
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
