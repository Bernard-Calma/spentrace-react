import './App.css';

import Header from './container/header/header';
import Main from './container/main/Main';
import Footer from './container/footer/Footer';
import { useState } from 'react';

const App = () => {
  const [bills, setBills] = useState([
    {
      date: "01/01/01",
      amount: 30,
      type: "Expense"
    },
    {
      date: "02/02/02",
      amount: 30,
      type: "Income"
    },
  ])
  return (
    <div className="App">
      <Header/>
      <Main
        bills = {bills}
      />
      <Footer/>
    </div>
  );
}

export default App;
