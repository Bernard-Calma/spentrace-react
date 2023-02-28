import './App.css';
import { useState } from 'react';

import Main from './container/main/Main';
import Add from './container/add/Add';
import Login from './container/login/Login';
import Register from './container/login/Register';
import NavBar from './Components/NavBar';
import Categories from './Components/Categories';
import Show from './container/show/Show';


const App = () => {
  const [view, setView] = useState("Main")
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
    fetch("http://192.168.1.80:8000/users/login", {
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
      {
        user.loggedIn ?
        <>
        <NavBar 
          handleChangeView = {handleChangeView}
          view = {view}
          openBill = {openBill}
        />
        {
          view === "Main"
          ?
          <>
            <Categories />
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
          />
          : view === "Show"
          ? <Show
            openBill = {openBill}
            handleChangeView = {handleChangeView}
          />
          :<></>
        }
        </>
        :
        <>
          { view === "Register"
          ?
          <Register 
            setUser = {setUser}
            user = {user}
            handleChange = {handleChange}
            handleChangeView = {handleChangeView}
          />
          :
          <Login 
            handleChange = {handleChange}
            handleLogin = {handleLogin}
            handleChangeView = {handleChangeView}
            setUser = {setUser}
            user = {user}
            loginMessage = {loginMessage}
          />
          
          }
        </>
        
      }
    </div>
  );
}

export default App;
