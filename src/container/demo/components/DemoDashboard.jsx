import { useSelector } from "react-redux";
import { format, parseISO } from "date-fns";

import { Calendar, TotalBalance, ListPreview } from "../../../common";

const DemoDashboard = ({ handleToggleAddTransaction }) => {
  const { budgetName, budgetItems, totalExpense, totalIncome } = useSelector(
    (store) => store.demo
  );

  // Sort budget items by date (newest first) and then by name
  // Format the date to "MMM dd" (e.g., "Jan 01")
  const sortedTransactions = [...budgetItems]
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;
      return a.name.localeCompare(b.name);
    })
    .map((item) => ({
      ...item,
      date: format(parseISO(item.date), "MMM dd"),
    }));
  return (
    <div className="container dashboard">
      <h1 className="title">{budgetName}</h1>
      <div className="dashboard-header">
        <TotalBalance
          className="totals"
          totalIncomeProp={totalIncome}
          totalExpenseProp={totalExpense}
        />
        <button
          className="add-transaction-button"
          onClick={handleToggleAddTransaction}
        >
          {/* <Lock size={16} /> */}
          Add Transaction
        </button>
      </div>

      <div className="container summaries">
        <ListPreview
          listItemProp={sortedTransactions}
          length={5}
          changeViewProp={{ demoView: "transactions-list" }}
        />

        <Calendar itemListProp={budgetItems} />
      </div>
    </div>
  );
};

export default DemoDashboard;
