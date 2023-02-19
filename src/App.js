import './App.css';
import { useState } from 'react';

import Main from './container/main/Main';
import Add from './container/add/Add';
import Login from './container/login/Login';
import Register from './container/login/Register';


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

  const handleChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value})
  }

  const handleLogin = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      if (data.username) {
        delete user.password
        setUser({...user, ...data, loggedIn: true})
        setView("Main")
      }
    })
    .catch(err => console.error("Error : ", err))
  }

  const handleChangeView = (view) => {
    setView(view)
  }
    
  return (
    <div className="App">
      {
        user.loggedIn ?
        <>
        {
          view === "Main"
          ?<Main
            bills = {bills}
            handleChangeView = {handleChangeView}
          />
          : view === "Add"
          ? <Add
            bills = {bills}
            setBills = {setBills}
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
          />
          
          }
        </>
        
      }
    </div>
  );
}

export default App;
