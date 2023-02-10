import './App.css';

import Header from './container/header/Header';
import Main from './container/main/Main';
import Footer from './container/footer/Footer';
import { useState } from 'react';
import NavBar from './Components/NavBar';

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
  return (
    <div className="App">
      <Header/>
      <NavBar />
      <Main
        bills = {bills}
      />
      <Footer/>
    </div>
  );
}

export default App;
