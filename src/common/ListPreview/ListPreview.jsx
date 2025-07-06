import { changeView } from "../../features/viewSlice";
import { useDispatch } from "react-redux";

import "./listPrevierw.scss"; // Import the styles

// listItemProp: Array of transaction objects
// length: Number of transactions to display
// changeViewProp: Function to change the view, typically from Redux
// changeViewProp format: { subView: "viewName" }
const ListPreview = ({ listItemProp, length, changeViewProp }) => {
  const dispatch = useDispatch();
  const sortedTransactions = [...listItemProp].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return a.name.localeCompare(b.name);
  });
  return (
    <div className="container list-preview">
      <h2 className="subtitle">
        Recent Transactions{" "}
        <span onClick={() => dispatch(changeView(changeViewProp))}>
          View All
        </span>
      </h2>
      <ul className="summary-content transactions-list">
        {sortedTransactions.map((t, idx) =>
          idx <= length - 1 ? (
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
          {sortedTransactions.length >= length ? (
            <p
              className="transactions-list_more"
              onClick={() => dispatch(changeView(changeViewProp))}
            >{`view +${sortedTransactions.length - length} more`}</p>
          ) : (
            <p className="transactions-list_more empty" />
          )}
        </div>
      </ul>
    </div>
  );
};

export default ListPreview;
