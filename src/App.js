import './App.css';
import { useState } from 'react';

import Header from './container/header/Header';
import Main from './container/main/Main';
import Add from './container/add/Add';
import Footer from './container/footer/Footer';
import Login from './container/login/Login';


const App = () => {
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
  const [view, setView] = useState("Main")

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
      }
    })
    .catch(err => console.error("Error : ", err))
  }
    
  return (
    <div className="App">
      <Header/>
      {
        user.loggedIn ?
        <>
        {
          view === "Main"
          ?<Main
            bills = {bills}
            setView = {setView}
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
        <Login 
          handleLogin = {handleLogin}
          setUser = {setUser}
          user = {user}
        />
      }
      <Footer />
    </div>
  );
}

export default App;
