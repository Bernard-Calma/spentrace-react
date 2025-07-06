import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  createDemoBudget,
  deleteTransaction,
  editTransaction,
  loadFromLocalStorage,
  updateBalance,
} from "../../features/demoSlice";
import DemoDashboard from "./components/DemoDashboard";
import DemoBill from "./components/DemoBill";
import AddBill from "./components/AddBill";
import {
  TransactionsList,
  AddTransaction,
  CreateBudget,
  Header,
} from "../../common";

import "./demoHome.scss";

const DemoHome = () => {
  const dispatch = useDispatch();
  // ------------------------------ VARIABLES ------------------------------
  // Plans
  const { budgetName, budgetItems, totalExpense, totalIncome } = useSelector(
    (store) => store.demo
  );
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

  const handleCreateDemoBudget = (e, budget) => {
    e.preventDefault();
    dispatch(createDemoBudget(budget));
  };

  const handleAddTransaction = (newTransactionData) => {
    // console.log("Adding transaction with: ", newTransactionData);
    dispatch(addTransaction(newTransactionData));
  };

  const handleDeleteTransaction = (transaction) => {
    dispatch(deleteTransaction(transaction));
  };

  const handleEditTransaction = (newTransactionData) => {
    dispatch(editTransaction(newTransactionData));
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
          handleAddTransaction={handleAddTransaction}
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
      ) : demoView === "home" ? (
        <DemoDashboard
          showAddTransaction={showAddTransaction}
          handleToggleAddTransaction={handleToggleAddTransaction}
        />
      ) : demoView === "transactions-list" ? (
        <TransactionsList
          budgetName={budgetName}
          transactionsList={budgetItems}
          totalExpense={totalExpense}
          totalIncome={totalIncome}
          handleDeleteTransaction={handleDeleteTransaction}
          handleEditTransaction={handleEditTransaction}
        />
      ) : demoView === "bills" ? (
        <DemoBill handleToggleAddBill={handleToggleAddBill} />
      ) : (
        <></>
      )}
    </section>
  );
};

export default DemoHome;
