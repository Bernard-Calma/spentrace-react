import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { getUser } from './features/userSlice';

import Header from './common/Header';
import Footer from './container/footer/Footer';
import LandingPage from './container/landingPage/LandingPage';
import Home from './container/home/Home';

import './App.css';
import Loading from './Components/Loading';
import { getBills } from './features/billSlice';

const App = () => { 
  const dispatch = useDispatch()
  // ------------------------------ VARIABLES ------------------------------
  // User information
  const {
    loggedIn,
    loading
  } = useSelector(store => store.user)
  // ------------------------------ END OF VARIABLES ------------------------------

  useEffect(() => {
    // Check if current session has user
    dispatch(getUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[loggedIn]);

  return (
    <div className="App">
      <Header/>
      { loading
          ? <div className='containerLoading'>
              <Loading />
          </div>
          : <>
            { loggedIn 
            ? <Home/> 
            : <LandingPage/> }
          </>
      }
      <Footer />
    </div>
  );
}

export default App;
