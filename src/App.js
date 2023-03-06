import './App.css';
import { useState } from 'react';

import Main from './container/main/Main';
import Add from './container/add/Add';
import Login from './container/login/Login';
import Register from './container/login/Register';
import Show from './container/show/Show';
import Header from './container/header/Header';
import Footer from './container/footer/Footer';
import EditBill from './container/edit/EditBill';
import LandingPage from './container/landingPage/LandingPage';
console.log("test");
const App = () => {
  console.log("Development/Production: " + process.env.NODE_ENV)
  console.log("test");
  const [view, setView] = useState("Login")
  const [user, setUser] = useState({
    username: "",
    password: "",
    loggedIn: false
  })
  const [bills, setBills] = useState([
    {
      date: "01/01/01",
      amount: 30.00,
      type: "Expense"
    },
    {
      date: "02/02/02",
      amount: 30.00,
      type: "Income"
    },
  ])
  let [openBill, setOpenBill] = useState({});
  const [loginMessage, setLoginMessage] = useState("")
  const handleChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value})
  }
  const handleLogin = (event) => {
    event.preventDefault();
    fetch(process.env.REACT_APP_SERVER_URL+"/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
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
      setLoginMessage(err.message)
    })
  }

  // HANDLE VIEW CHANGE WHEN NAVIGATING
  const handleChangeView = (view) => {
    console.log("View changed to ", view)
    setView(view)
  }

  // HANLDE VIEW CHANGE WHEN OPENING A BILL
  const handleView = (bill) => {
    setOpenBill(bill)
    handleChangeView("Show")
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
              bills = {bills}
              handleChangeView = {handleChangeView}
              view={view}
              handleView = {handleView}
              user = {user}
            />
          </>
          : view === "Add"
          ? <Add
              bills = {bills}
              setBills = {setBills}
              handleChangeView = {handleChangeView}
              user = {user}
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
        /> 
      }
      <Footer />
    </div>
  );
}

export default App;
