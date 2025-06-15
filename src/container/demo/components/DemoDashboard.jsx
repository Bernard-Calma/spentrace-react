import { useSelector } from "react-redux";
import Calendar from "./Calendar";
import { useState } from "react";
import AddTransaction from "./AddTransaction";

const DemoDashboard = () => {
  const { budgetName, totalIncome, totalExpense, budgetItems } = useSelector(
    (store) => store.demo
  );

  const [showAddTransaction, setShowAddTransaction] = useState(false);

  const sortedTransactions = [...budgetItems].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return a.name.localeCompare(b.name);
  });

  const handleToggleAddTransaction = () => {
    setShowAddTransaction((prev) => !prev);
  };

  return (
    <div className="container dashboard">
      <h1 className="title">{budgetName}</h1>
      {showAddTransaction && (
        <AddTransaction
          handleToggleAddTransaction={handleToggleAddTransaction}
        />
      )}
      <div className="header">
        <div className="totals">
          <div className="total">
            <p className="text-gray-500 text-sm">Total Income</p>
            <p className="income">${totalIncome.toFixed(2)}</p>
          </div>
          <div className="total">
            <p className="text-gray-500 text-sm">Total Expense</p>
            <p className="expense">${totalExpense.toFixed(2)}</p>
          </div>
        </div>
        <button
          className="add-transaction-button"
          onClick={handleToggleAddTransaction}
        >
          {/* <Lock size={16} /> */}
          Add Transaction
        </button>
      </div>

      <div className="container summaries">
        <div className="container summary">
          <h2 className="subtitle">
            Recent Transactions <span>View All</span>
          </h2>
          <ul className="summary-content transactions-list">
            {sortedTransactions.map((t, idx) =>
              idx <= 4 ? (
                <li key={idx} className="transaction-item">
                  <div className="transaction-item_details">
                    <p className="transaction-item_name">{t.name}</p>
                    <p className="transaction-item_date">{t.date}</p>
                  </div>
                  <p
                    className={`transaction-item_amount ${
                      t.amount < 0 ? "expense" : "income"
                    }`}
                  >
                    {t.amount < 0 ? "-" : "+"}${Math.abs(t.amount).toFixed(2)}
                  </p>
                </li>
              ) : null
            )}
            <div>
              <p className="transactions-list_more">
                {sortedTransactions.length >= 5
                  ? `view +${sortedTransactions.length - 5} more`
                  : ""}
              </p>
            </div>
          </ul>
        </div>

        <Calendar />
      </div>
    </div>
  );
};

export default DemoDashboard;
