import { format, parseISO, set } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import TotalBalance from "../../../common/TotalBalance";
import { useEffect, useState } from "react";
import ShowTransaction from "./ShowTransaction";
import { setOpenBudgetItem } from "../../../features/demoSlice";
import EditTransaction from "./EditTransaction";

const TransactionsList = ({ budgetName }) => {
  const dispatch = useDispatch();
  const { budgetItems, totalIncome } = useSelector((store) => store.demo);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [showTransaction, setShowTransaction] = useState(false);
  const [showEditTransaction, setShowEditTransaction] = useState(false);
  const [deficitTransaction, setDeficitDate] = useState(null);

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

  useEffect(() => {
    // Function to calculate the date when income will not cover expenses
    const calculateDeficitDate = () => {
      let runningIncomeTotal = totalIncome;
      let deficitDate = null;

      // Get the transaction where running income will be negative
      for (let transaction of sortedTransactions) {
        if (transaction.type === "expense") {
          runningIncomeTotal += transaction.amount;
          if (runningIncomeTotal < 0) {
            deficitDate = new Date(transaction.date);

            console.log("Transaction: ", transaction);
            break;
          }
        }

        console.log("Running Income Total: ", runningIncomeTotal);
      }

      setDeficitDate(deficitDate);
    };

    // Sort transactions by date and name
    const sortTransaction = () => {
      setSortedTransactions(
        [...budgetItems].sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (dateA.getTime() === dateB.getTime()) {
            return a.name.localeCompare(b.name);
          }
          return dateA - dateB;
        })
      );
    };

    sortTransaction();
    calculateDeficitDate();
  }, [budgetItems]);

  // Get date where income will be not enough to cover expenses

  return (
    <div className="container transactions-list">
      {showTransaction && !showEditTransaction ? (
        <ShowTransaction
          handleToggleTransaction={handleToggleTransaction}
          handleEditTransaction={() => {
            setShowEditTransaction(true);
          }}
        />
      ) : (
        showEditTransaction && (
          <EditTransaction
            handleToggleTransaction={handleToggleTransaction}
            handleToggleAddTransaction={() => setShowEditTransaction(false)}
          />
        )
      )}

      <h1 className="title">{budgetName}</h1>
      <h2 className="subtitle">Transactions List</h2>
      <TotalBalance className="totals" />
      <div className="budget-items">
        {sortedTransactions.map((tx, index) => (
          <>
            <div
              key={index}
              className={`transaction-item ${
                tx.amount > 0 ? "income" : getDueDateStyle(tx.date)
              }`}
              onClick={() => handleToggleTransaction(tx)}
            >
              <span>
                {/* If date is today show today string instead */}
                {format(parseISO(tx.date), "yyyy-MM-dd") ===
                format(new Date(), "yyyy-MM-dd")
                  ? "Today "
                  : `${format(parseISO(tx.date), "MMMM dd")} `}
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
          </>
        ))}
      </div>
    </div>
  );
};

export default TransactionsList;
