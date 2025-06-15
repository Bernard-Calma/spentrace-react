import { useState } from "react";
import LabelInput from "../../../common/LabelInput";

const AddTransaction = ({ handleToggleAddTransaction }) => {
  const [newTransaction, setNewTransaction] = useState({
    amount: 0,
    date: "",
    name: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
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
        <form>
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
          <LabelInput
            type="date"
            htmlFor="date"
            text="Transaction Date"
            name="date"
            className="label-input"
            required
          />

          <LabelInput
            type="text"
            htmlFor="name"
            text="Transaction Name"
            name="name"
            placeholder="e.g., Grocery Shopping"
            required
          />

          <LabelInput
            type="text"
            htmlFor="category"
            text="Category"
            name="category"
            placeholder="e.g., Food, Utilities"
            required
          />

          <button className="button">Add Transaction</button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
