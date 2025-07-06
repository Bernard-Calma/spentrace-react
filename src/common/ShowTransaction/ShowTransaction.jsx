import { format, parseISO } from "date-fns";
import { useDispatch } from "react-redux";

import "./showTransaction.scss";

const ShowTransaction = ({
  handleToggleTransaction,
  handleEditTransaction,
  transaction,
}) => {
  const dispatch = useDispatch();
  const handleDeleteTransaction = () => {
    handleToggleTransaction();
  };
  return (
    <div className="overlay">
      <div className="container transaction-show">
        <div className="transaction-show-header">
          <h1 className="subtitle">Transaction Details</h1>
          <button
            className="button close-button"
            onClick={() => handleToggleTransaction()}
          >
            Close
          </button>
        </div>

        <h2 className="transaction-title">{transaction.name}</h2>
        <div className="transaction-details">
          <p>
            Amount:{" "}
            <span className={transaction.amount < 0 ? "expense" : "income"}>
              $
              {Math.abs(transaction.amount).toLocaleString("en-US", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </p>
          <p>
            Date:{" "}
            <span>{format(parseISO(transaction.date), "MMM dd, yyyy")}</span>
          </p>
          <p>
            Category: <span>{transaction.category || "Uncategorized"}</span>
          </p>
          <p>Notes:</p>
          <div className="notes-container">
            <p className="notes">{transaction.notes || "No notes available"}</p>
          </div>
        </div>
        <div className="transaction-actions">
          <button
            className="button edit-button"
            onClick={handleEditTransaction}
          >
            Edit Transaction
          </button>
          <button
            className="button delete-button"
            onClick={handleDeleteTransaction}
          >
            Delete Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowTransaction;
