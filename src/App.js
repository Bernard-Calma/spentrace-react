import './App.css';
import { useEffect, useState } from 'react';

import Main from './container/main/Main';
import Add from './container/add/Add';
import Show from './container/show/Show';
import Header from './container/header/Header';
import Footer from './container/footer/Footer';
import EditBill from './container/edit/EditBill';
import LandingPage from './container/landingPage/LandingPage';

const App = () => {
  // Server
  const herokuServer = process.env.REACT_APP_SERVER_URL 
  const [server] = useState(
    // Set server to be local host if on development else use heroku backend server
    process.env.NODE_ENV === 'development' ? "http://localhost:8000" : herokuServer
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
  
  // Bills Information
  const [bills, setBills] = useState([])
  let [openBill, setOpenBill] = useState({});

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
      getBills(data._id)
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

  const handleShowBill = (bill) => {
    setOpenBill(bill)
    handleChangeView("Show")
  }

  // CLEAR PASSWORDS
  const clearPasswords = () => {
    setUser({...user, password: "", verifyPassword: ""})
  }

  // UPDATE BILLS
  const getBills = (id) => {
    fetch(process.env.REACT_APP_SERVER_URL+"/plans/" + id)
    .then(res => res.json())
    .then(data => {
      setBills(data)
    })
  }

  const updateBills = (newBill) => {
    /**
     * This function udpates state
     * instead of doing an API call
     * to provide better performance
     * 
     * Return newBill if id matches inside current bills array.
     */
    console.log(newBill)
    let newBillsList = bills.map((bill)=> bill._id === newBill._id ? newBill : bill)
    setBills(newBillsList); 
    console.log("Bills changed.")
  }

  const addBill = (newBill) => {
    setBills([...bills, newBill])
    console.log("add bill")
  }

  return (
    <div className="App">
      <Header 
        view = {view}
        user = {user}
        bills = {bills}
        setBills = {setBills}
        handleChangeView = {handleChangeView}
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
              bills = {bills}
              handleChangeView = {handleChangeView}
              handleShowBill = {handleShowBill}
              getBills = {getBills}
            />
            <i className="fi fi-rr-exit signout" onClick={handleSignout}></i>
          </>
          : view === "Add"
          ? <Add
              handleChangeView = {handleChangeView}
              user = {user}
              server = {server}
              addBill = {addBill}
            />
          : view === "Show"
          ? <Show
              openBill = {openBill}
              handleChangeView = {handleChangeView}
            />
          : view === "Edit" ?
            <EditBill
              openBill = {openBill}
              handleChangeView = {handleChangeView} 
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
