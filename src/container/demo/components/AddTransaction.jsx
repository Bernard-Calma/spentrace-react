import { useState } from "react";
import LabelInput from "../../../common/LabelInput";
import { useDispatch } from "react-redux";
import { addTransaction } from "../../../features/demoSlice";

const AddTransaction = ({ handleToggleAddTransaction }) => {
  const dispatch = useDispatch();
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

  const handleSubmitNewTransaction = (e) => {
    e.preventDefault();
    // Here you would typically dispatch an action to add the transaction
    console.log("New Transaction Submitted:", newTransaction);
    dispatch(addTransaction(newTransaction));
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
          <LabelInput
            type="date"
            htmlFor="date"
            text="Transaction Date"
            name="date"
            className="label-input"
            value={newTransaction.date}
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
            required
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
