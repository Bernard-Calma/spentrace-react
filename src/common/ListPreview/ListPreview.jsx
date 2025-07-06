import { format, parseISO } from "date-fns";
import { changeView } from "../../features/viewSlice";
import { useDispatch } from "react-redux";

const ListPreview = ({ listItemProp, length }) => {
  const dispatch = useDispatch();
  const sortedTransactions = [...listItemProp].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return a.name.localeCompare(b.name);
  });
  return (
    <div className="container summary">
      <h2 className="subtitle">
        Recent Transactions{" "}
        <span
          onClick={() =>
            dispatch(changeView({ demoView: "transactions-list" }))
          }
        >
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
        <div
          onClick={() =>
            dispatch(changeView({ demoView: "transactions-list" }))
          }
        >
          <p className="transactions-list_more">
            {sortedTransactions.length >= length
              ? `view +${sortedTransactions.length - length} more`
              : ""}
          </p>
        </div>
      </ul>
    </div>
  );
};

export default ListPreview;
