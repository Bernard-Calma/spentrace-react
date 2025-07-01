import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDemoBudget,
  loadFromLocalStorage,
  updateBalance,
} from "../../features/demoSlice";
import DemoDashboard from "./components/DemoDashboard";
import CreateBudget from "../../common/CreateBudget";

import "./demoHome.scss";
import TransactionsList from "./components/TransactionsList";
import Header from "../../common/Header/Header";
import AddTransaction from "./components/AddTransaction";
import DemoBill from "./components/DemoBill";
import AddBill from "./components/AddBill";

const DemoHome = () => {
  const dispatch = useDispatch();
  // ------------------------------ VARIABLES ------------------------------
  // Plans
  const { budgetName, budgetItems } = useSelector((store) => store.demo);
  // Views
  const { demoView } = useSelector((store) => store.view);

  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showAddBill, setShowAddBill] = useState(false);

  const handleToggleAddTransaction = () => {
    setShowAddTransaction((prev) => !prev);
  };

  const handleToggleAddBill = () => {
    console.log("Toggle Add Bill");
    setShowAddBill((prev) => !prev);
  };

  const handleCreateDemoBudget = (e, budgetName, owner) => {
    e.preventDefault();
    dispatch(createDemoBudget({ budgetName, owner }));
  };

  // ------------------------------ END OF FUNCTIONS ------------------------------
  useEffect(() => {
    dispatch(loadFromLocalStorage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(updateBalance());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budgetItems]);

  return (
    <section className="container demo-home">
      {demoView !== "bills" ? (
        <div className="mobile-only add-transaction">
          <button
            className="button add-transaction-button"
            onClick={handleToggleAddTransaction}
          >
            +
          </button>
        </div>
      ) : (
        <div className="mobile-only add-transaction">
          <button
            className="button add-transaction-button"
            onClick={handleToggleAddBill}
          >
            +
          </button>
        </div>
      )}

      <Header />
      {showAddTransaction ? (
        <AddTransaction
          handleToggleAddTransaction={handleToggleAddTransaction}
        />
      ) : showAddBill ? (
        <AddBill
          handleToggleAddBill={handleToggleAddBill}
          showAddBill={showAddBill}
        />
      ) : (
        <></>
      )}

      {budgetName === "" || !budgetName ? (
        <CreateBudget handleSubmitCreateBudget={handleCreateDemoBudget} />
      ) : demoView === "Demo" ? (
        <DemoDashboard
          showAddTransaction={showAddTransaction}
          handleToggleAddTransaction={handleToggleAddTransaction}
        />
      ) : demoView === "transactions-list" ? (
        <TransactionsList budgetName={budgetName} />
      ) : demoView === "bills" ? (
        <DemoBill handleToggleAddBill={handleToggleAddBill} />
      ) : (
        <></>
      )}
    </section>
  );
};

export default DemoHome;
