import { format } from "date-fns";
import { useSelector } from "react-redux";

const ShowTransaction = ({ handleToggleTransaction }) => {
  const { openBudgetItem } = useSelector((store) => store.demo);
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

        <h2 className="transaction-title">{openBudgetItem.name}</h2>
        <div className="transaction-details">
          <p>
            Amount:{" "}
            <span className={openBudgetItem.amount < 0 ? "expense" : "income"}>
              $
              {Math.abs(openBudgetItem.amount).toLocaleString("en-US", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </p>
          <p>
            Date: <span>{format(openBudgetItem.date, "MMMM dd, yyyy")}</span>
          </p>
          <p>
            Category: <span>{openBudgetItem.category || "Uncategorized"}</span>
          </p>
          <p>Notes:</p>
          <div className="notes-container">
            <p className="notes">
              {openBudgetItem.notes || "No notes available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowTransaction;
