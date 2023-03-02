import './App.css';
import { useState } from 'react';

import Main from './container/main/Main';
import Add from './container/add/Add';
import Login from './container/login/Login';
import Register from './container/login/Register';
import NavBar from './Components/NavBar';
import Categories from './container/main/Categories';
import Show from './container/show/Show';
import OpenNav from './Components/MinimizeNav';
import Header from './container/header/Header';
import Footer from './container/footer/Footer';


const App = () => {
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
  let [showNav, setShowNav] = useState(false)

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
    
  const handleShowNav = () => {
    setShowNav(!showNav);
  }

  return (
    <div className="App">
      <Header 
          handleChangeView = {handleChangeView}
          view = {view}
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
      <Footer />
    </div>
  );
}

export default App;
