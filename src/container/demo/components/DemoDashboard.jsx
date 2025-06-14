import { useSelector } from "react-redux";

const DemoDashboard = () => {
  const { budgetName, totalIncome, totalExpense, budgetItems } = useSelector(
    (store) => store.demo
  );
  return (
    <div className="container dashboard">
      <h1 className="title">{budgetName}</h1>

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
        <button className="add-transaction-button">
          {/* <Lock size={16} /> */}
          Add Transaction
        </button>
      </div>

      <div className="container summaries">
        <div className="container summary">
          <h2 className="subtitle">
            Recent Transactions <span>View All</span>
          </h2>
          <ul className="divide-y divide-gray-200">
            {budgetItems.map((t, idx) => (
              <li key={idx} className="py-2 flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.date}</p>
                </div>
                <p
                  className={`text-sm font-semibold ${
                    t.amount < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {t.amount < 0 ? "-" : "+"}${Math.abs(t.amount).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="container summary">
          <h2 className="subtitle">
            {/* <CalendarDays size={18} />  */}
            Calendar Summary
          </h2>
          <div className="coming-soon">(Calendar View Coming Soon)</div>
        </div>
      </div>
    </div>
  );
};

export default DemoDashboard;
