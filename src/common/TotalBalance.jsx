import { useEffect, useState } from "react";

const TotalBalance = ({ totalIncomeProp, totalExpenseProp, className }) => {
  // ------------------------------ VARIABLES ------------------------------
  const [totalIncome, setTotalIncome] = useState(totalIncomeProp || 0);
  const [totalExpense, setTotalExpense] = useState(totalExpenseProp || 0);
  // ------------------------------ END OF VARIABLES ------------------------------

  useEffect(() => {
    // Update total income and expense if props change
    if (totalIncomeProp !== undefined) {
      setTotalIncome(totalIncomeProp);
    }
    if (totalExpenseProp !== undefined) {
      setTotalExpense(totalExpenseProp);
    }
  }, [totalIncomeProp, totalExpenseProp]);

  return (
    <div className={`total-balance ${className}`}>
      <div className="total">
        <p className="text-gray-500 text-sm">Total Income</p>
        <p className="income">${totalIncome.toFixed(2)}</p>
      </div>
      <div className="total">
        <p className="text-gray-500 text-sm">Total Expense</p>
        <p className="expense">${totalExpense.toFixed(2)}</p>
      </div>
      <div className="total">
        <p>Balance</p>
        <p
          className={`${totalIncome + totalExpense > 0 ? "income" : "expense"}`}
        >
          ${(totalIncome + totalExpense).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default TotalBalance;
