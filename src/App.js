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
  let [totalIncome, setTotalIncome] = useState(0);
  let [totalExpense, setTotalExpense] = useState(0);
  let runningTarget = 0;
  let total = 0;
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
  const getBills = () => {
    fetch(process.env.REACT_APP_SERVER_URL+"/plans/" + user._id)
    .then(res => res.json())
    .then(data => {
        // Set variables back to 0 to prevent adding values from previous computation
        runningTarget = 0;
        total = 0;
        for (var bill of data) {
            getRunningBalanceTarget(bill)
        }
        setBills(data)  
    })
  }

  const getRunningBalanceTarget = (bill) => {
    /**
     * Compute for running balance and target
     * from bill parameter from bills array
     */
    if (bill.expense === true) {
        setTotalExpense(totalExpense += bill.amount)
        runningTarget += bill.amount;
        total -= bill.amount;
    } else if (bill.expense === false) {
        setTotalIncome(totalIncome += bill.amount)
        runningTarget -= bill.amount;
        total += bill.amount;
    } 
    if (runningTarget < 0) {
        bill.target = 0;
    } else {
        bill.target = runningTarget;
    }
    bill.runningTotal = total;  
  }

  const updateBills = (newBill) => {
    /**
     * This function udpates state
     * instead of doing an API call
     * to provide better performance
     * 
     * Return newBill if id matches inside current bills array.
     */
    let newBillsList = bills.map((bill)=> bill.id === newBill.id ? newBill : bill)
    setBills(newBillsList);
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
