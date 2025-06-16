import { format } from "date-fns";
import { useSelector } from "react-redux";

const ShowTransaction = ({ handleToggleTransaction }) => {
  const { openBudgetItem } = useSelector((store) => store.demo);
  return (
    <div className="overlay">
      <div className="container transaction-show">
        <button
          className="close-button"
          onClick={() => handleToggleTransaction()}
        >
          Close
        </button>
        <h2 className="showTransactionTitle">{openBudgetItem.name}</h2>
        <div className="showTransactionDetails">
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
          <p>Date: {format(openBudgetItem.date, "MMMM dd, yyyy")}</p>
          <p>Category: {openBudgetItem.category}</p>
          <p>Notes: {openBudgetItem.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowTransaction;
