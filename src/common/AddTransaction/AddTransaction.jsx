import { useState } from "react";
import { useDispatch } from "react-redux";
import { format, parseISO } from "date-fns";
import { LabelInput } from "../";

const AddTransaction = ({
  handleAddTransaction,
  handleToggleAddTransaction,
}) => {
  const dispatch = useDispatch();
  const [newTransaction, setNewTransaction] = useState({
    amount: 0,
    date: parseISO(format(new Date(), "yyyy-MM-dd")), // Default to current date,
    name: "",
    type: "expense", // Default type is expense
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Format date using date-fns
    if (name === "date") {
      setNewTransaction({
        ...newTransaction,
        date: parseISO(value),
      });
      return;
    }
    // Limit amount to two decimal places and max value of 1000000
    if (name === "amount") {
      if (value === "") {
        setNewTransaction((prev) => ({
          ...prev,
          [name]: 0,
        }));
      } else {
        const formattedValue = parseFloat(value).toFixed(2);
        setNewTransaction((prev) => ({
          ...prev,
          [name]: Math.min(formattedValue, 1000000.99),
        }));
      }
    } else {
      setNewTransaction((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmitNewTransaction = (e) => {
    e.preventDefault();
    // Modify amount to be negative for expenses
    const transactionAmount =
      newTransaction.type === "expense"
        ? -Math.abs(newTransaction.amount)
        : Math.abs(newTransaction.amount);
    const newTransactionData = {
      ...newTransaction,
      amount: transactionAmount,
    };
    // console.log("New Transaction Data:", {
    //   ...newTransactionData,
    //   date: format(newTransactionData.date, "yyyy-MM-dd"),
    // });
    handleAddTransaction({
      ...newTransactionData,
      date: format(newTransactionData.date, "yyyy-MM-dd"),
    });
    // Reset form after submission
    setNewTransaction({
      amount: 0,
      date: "",
      name: "",
      category: "",
    });
    handleToggleAddTransaction();
  };

  return (
    <div className="overlay">
      <div className="container add-transaction">
        <button
          className="button btn-close"
          onClick={handleToggleAddTransaction}
        >
          <span className="close-icon">&times;</span>
        </button>
        <h2 className="title">Add Transaction</h2>
        <form onSubmit={handleSubmitNewTransaction}>
          <LabelInput
            className="input-amount"
            type="number"
            htmlFor="amount"
            step="0.01"
            text="$"
            name="amount"
            value={newTransaction.amount}
            onChange={handleChange}
            required
          />
          {/* Radio to set if tranasction is expense or income */}
          <div className="radio-group transaction-type">
            <label>
              <input
                type="radio"
                name="type"
                value="expense"
                checked={newTransaction.type === "expense"}
                onChange={() =>
                  setNewTransaction((prev) => ({
                    ...prev,
                    type: "expense",
                  }))
                }
              />
              Expense
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="income"
                checked={newTransaction.type === "income"}
                onChange={() =>
                  setNewTransaction((prev) => ({
                    ...prev,
                    type: "income",
                  }))
                }
              />
              Income
            </label>
          </div>
          <LabelInput
            type="date"
            htmlFor="date"
            text="Transaction Date"
            name="date"
            className="label-input"
            value={format(newTransaction.date, "yyyy-MM-dd")}
            onChange={handleChange}
            required
          />

          <LabelInput
            type="text"
            htmlFor="name"
            text="Transaction Name"
            name="name"
            placeholder="e.g., Grocery Shopping"
            value={newTransaction.name}
            onChange={handleChange}
            required
          />

          <LabelInput
            type="text"
            htmlFor="category"
            text="Category"
            name="category"
            placeholder="e.g., Food, Utilities"
            value={newTransaction.category}
            onChange={handleChange}
          />
          <button className="button" type="submit">
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
