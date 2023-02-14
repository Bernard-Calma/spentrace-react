import './App.css';
import { useState } from 'react';

import Header from './container/header/Header';
import Main from './container/main/Main';
import Add from './container/add/Add';
import Footer from './container/footer/Footer';


const App = () => {
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
  return (
    <div className="App">
      <Header/>
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
      <Footer/>
    </div>
  );
}

export default App;
