import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { addTransaction } from "../../../features/budgetSlice";

import {
  AddTransaction,
  ListPreview,
  TotalBalance,
  Calendar,
} from "../../../common";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { budgetName, owner, budgetItems, totalIncome, totalExpense } =
    useSelector((store) => store.budget);

  const [showAddTransaction, setShowAddTransaction] = useState(false);

  // Sort budget items by date (newest first) and then by name
  // Format the date to "MMM dd" (e.g., "Jan 01")
  const sortedTransactions = [...budgetItems]
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;
      return a.name.localeCompare(b.name);
    })
    .map((item) => ({
      ...item,
      date: format(parseISO(item.date), "MMM dd"),
    }));

  const handleToggleAddTransaction = () => {
    setShowAddTransaction((prev) => !prev);
  };

  const handleAddTransaction = (newTransactionData) => {
    dispatch(addTransaction(newTransactionData));
  };
  return (
    <div className="container dashboard">
      {showAddTransaction && (
        <AddTransaction
          handleAddTransaction={handleAddTransaction}
          handleToggleAddTransaction={handleToggleAddTransaction}
        />
      )}
      <div className="budget-info">
        <h1 className="title">{budgetName}</h1>
        <p>Owner: {owner}</p>
      </div>

      <div className="dashboard-header">
        <TotalBalance
          className="totals"
          totalIncomeProp={totalIncome}
          totalExpenseProp={totalExpense}
        />
        <button
          className="add-transaction-button"
          onClick={handleToggleAddTransaction}
        >
          {/* <Lock size={16} /> */}
          Add Transaction
        </button>
      </div>

      <div className="container summaries">
        <ListPreview
          listItemProp={sortedTransactions}
          length={5}
          changeViewProp={{ view: "transactions-list" }}
        />
        <Calendar />
      </div>
    </div>
  );
};

export default Dashboard;
