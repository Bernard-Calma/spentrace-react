import { useDispatch, useSelector } from "react-redux";

const TotalBalance = ({ className }) => {
  const { totalIncome, totalExpense } = useSelector((store) => store.demo);
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
