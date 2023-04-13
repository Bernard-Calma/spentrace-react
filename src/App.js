import { useState } from 'react';

import './App.css';
import Header from './container/header/Header';
import Footer from './container/footer/Footer';
import LandingPage from './container/landingPage/LandingPage';
import Home from './container/home/Home';

const App = () => { 
  // ------------------------------ VARIABLES ------------------------------
  // Server
  const [server] = useState(process.env.REACT_APP_SERVER_URL)
  // User information
  const [user, setUser] = useState({
    id: "",
    username: "",
    loggedIn: false
  })
  // ------------------------------ END OF VARIABLES ------------------------------

  return (
    <div className="App">
      <Header 
        user = {user}
        server = {server}
        setUser = {setUser}
      />
      {
        user.loggedIn 
        ? <Home 
            user = {user}
            server = {server}
          />
        : <LandingPage 
            setUser = {setUser}
            server = {server}
          /> 
      }
      <Footer />
    </div>
  );
}

export default App;
