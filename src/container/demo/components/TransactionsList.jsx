import { format, parseISO } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import TotalBalance from "../../../common/TotalBalance";
import { useEffect, useState } from "react";
import { setOpenTransaction } from "../../../features/demoSlice";
import EditTransaction from "./EditTransaction";
import { ShowTransaction } from "../../../common";

const TransactionsList = ({ budgetName }) => {
  const dispatch = useDispatch();
  const { budgetItems, totalExpense, totalIncome, openTransaction } =
    useSelector((store) => store.demo);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [showTransaction, setShowTransaction] = useState(false);
  const [showEditTransaction, setShowEditTransaction] = useState(false);
  // Object to hold the transaction where income will not cover expenses
  const [deficitObject, setDeficitObject] = useState();

  const handleToggleTransaction = (transaction) => {
    if (transaction) {
      dispatch(setOpenTransaction(transaction));
    } else {
      dispatch(setOpenTransaction({}));
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

    // Function to calculate the date when income will not cover expenses
    const calculateDeficitDate = () => {
      let runningIncomeTotal = totalIncome;

      // Get the transaction where running income will be negative
      for (let transaction of [...budgetItems].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA.getTime() === dateB.getTime()) {
          return a.name.localeCompare(b.name);
        }
        return dateA - dateB;
      })) {
        if (transaction.type === "expense") {
          runningIncomeTotal += transaction.amount;
          if (runningIncomeTotal < 0) {
            setDeficitObject({
              transactionId: transaction.id,
              date: transaction.date,
              amount: runningIncomeTotal,
            });
            break;
          }
        }
      }
    };

    sortTransaction();
    calculateDeficitDate();
  }, [budgetItems]);

  // Get date where income will be not enough to cover expenses

  return (
    <div className="container transactions-list">
      {showTransaction && !showEditTransaction ? (
        <ShowTransaction
          transaction={openTransaction}
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
      <TotalBalance
        className="totals"
        totalIncomeProp={totalIncome}
        totalExpenseProp={totalExpense}
      />
      <div className="budget-items">
        {sortedTransactions.map((tx, index) => (
          <>
            {/*If deficit object exist add a line*/}
            {deficitObject && deficitObject.transactionId === tx.id && (
              <div className="deficit-warning">
                <p>
                  Balance starts to be negative starting at{" "}
                  <span className="deficit-amount">
                    $
                    {Math.abs(deficitObject.amount).toLocaleString("en-US", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </p>
              </div>
            )}
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
