import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import TotalBalance from "../../../common/TotalBalance";
import { useState } from "react";
import ShowTransaction from "./ShowTransaction";
import { setOpenBudgetItem } from "../../../features/demoSlice";

const TransactionsList = ({ budgetName }) => {
  const dispatch = useDispatch();
  const { budgetItems, openBudgetItem } = useSelector((store) => store.demo);

  const [showTransaction, setShowTransaction] = useState(false);
  const handleToggleTransaction = (transaction) => {
    if (transaction) {
      dispatch(setOpenBudgetItem(transaction));
    } else {
      dispatch(setOpenBudgetItem({}));
    }

    setShowTransaction((prev) => !prev);
  };

  const getDueDateStyle = (date) => {
    const current = new Date();
    const dueDate = new Date(date);
    const diffTime = dueDate - current;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "past-due"; // due today or past due
    if (diffDays <= 3) return "upcoming"; // due in 3 days
    return "";
  };

  const sortedTransactions = [...budgetItems].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA.getTime() === dateB.getTime()) {
      return a.name.localeCompare(b.name);
    }
    return dateA - dateB;
  });

  return (
    <div className="container transactions-list">
      {showTransaction && (
        <ShowTransaction handleToggleTransaction={handleToggleTransaction} />
      )}
      <h1 className="title">{budgetName}</h1>
      <h2 className="subtitle">Transactions List</h2>
      <TotalBalance className="totals" />
      <div className="budget-items">
        {sortedTransactions.map((tx, index) => (
          <div
            key={index}
            className={`transaction-item ${
              tx.amount > 0 ? "income" : getDueDateStyle(tx.date)
            }`}
            onClick={() => handleToggleTransaction(tx)}
          >
            <span>
              {/* If date is today show today string instead */}
              {format(tx.date, "yyyy-MM-dd") ===
              format(new Date(), "yyyy-MM-dd")
                ? "Today "
                : `${format(tx.date, "MMMM dd")} `}
              - {tx.name}
            </span>
            <span className={tx.amount < 0 ? "expense" : "income"}>
              $
              {Math.abs(tx.amount).toLocaleString("en-US", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsList;
