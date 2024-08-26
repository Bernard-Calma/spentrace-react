import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { getUser } from './features/userSlice';

import Header from './common/Header';
import Footer from './container/footer/Footer';
import LandingPage from './container/landingPage/LandingPage';
import Home from './container/home/Home';

import './App.css';

const App = () => { 
  const dispatch = useDispatch()
  // ------------------------------ VARIABLES ------------------------------
  // User information
  const {
    loggedIn
  } = useSelector(store => store.user)
  // ------------------------------ END OF VARIABLES ------------------------------

  // useEffect(() => {
  //   // Check if current session has user
  //   dispatch(getUser());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[]);

  return (
    <div className="App">
      <Header/>
      { loggedIn 
        ? <Home/> 
        : <LandingPage/> 
      }
      <Footer />
    </div>
  );
}

export default App;
