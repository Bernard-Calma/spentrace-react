import './App.css';
import { useState } from 'react';

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
  // User information
  const [user, setUser] = useState({
    username: "",
    password: "",
    verifyPassword: "",
    loggedIn: false
  })

  let [openBill, setOpenBill] = useState({});

  const [loginMessage, setLoginMessage] = useState("")
  
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
      // console.log(data)
      if (data.username) {
        delete user.password
        setUser({...user, ...data, loggedIn: true})
        setView("Main")
      } else {
        setLoginMessage(data.message)
      }
    })
    .catch(err => {
      console.error("Error : ", err)
      clearPasswords()
      setLoginMessage(err.message)
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

  // HANDLE VIEW CHANGE WHEN NAVIGATING
  const handleChangeView = (view) => {
    // console.log("View changed to ", view)
    setView(view)
  }

  // HANLDE VIEW CHANGE WHEN OPENING A BILL
  const handleShowBill = (bill) => {
    setOpenBill(bill)
    handleChangeView("Show")
  }

  // CLEAR PASSWORDS
  const clearPasswords = () => {
    setUser({...user, password: "", verifyPassword: ""})
  }
  return (
    <div className="App">
      <Header 
          handleChangeView = {handleChangeView}
          view = {view}
          openBill = {openBill}
          user = {user}
      />
      {
        user.loggedIn ?
        <>
        {
          view === "Main"
          ?
          <>
            <Main
              handleChangeView = {handleChangeView}
              view={view}
              handleShowBill = {handleShowBill}
              user = {user}
            />
            <i className="fi fi-rr-exit signout" onClick={handleSignout}></i>
          </>
          : view === "Add"
          ? <Add
              handleChangeView = {handleChangeView}
              user = {user}
              server = {server}
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
          setUser = {setUser}
          user = {user}
          handleChange = {handleChange}
          handleChangeView = {handleChangeView}
          handleLogin = {handleLogin}
          loginMessage = {loginMessage}
          clearPasswords = {clearPasswords}
        /> 
      }
      <Footer />
    </div>
  );
}

export default App;
