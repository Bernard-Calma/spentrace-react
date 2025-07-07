import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBill } from "../../../features/demoSlice";
import { format, parseISO } from "date-fns";
import { SelectInput, LabelInput } from "../../../common";
import { tr } from "date-fns/locale";

const AddDemoBill = ({ handleToggleAddBill }) => {
  const dispatch = useDispatch();
  const [newBill, setNewBill] = useState({
    amount: 0,
    dueDate: parseISO(format(new Date(), "yyyy-MM-dd")), // Default to current date,
    name: "",
    repeat: "Never Repeat",
    endDate: null, // Default to current date,
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Format date using date-fns
    if (name === "dueDate") {
      setNewBill({
        ...newBill,
        dueDate: parseISO(value),
      });
      return;
    } else if (name === "endDate") {
      setNewBill({
        ...newBill,
        endDate:
          newBill.dueDate < parseISO(value) ? parseISO(value) : newBill.dueDate,
      });
      return;
    }
    // Limit amount to two decimal places and max value of 1000000
    else if (name === "amount") {
      if (value === "") {
        setNewBill((prev) => ({
          ...prev,
          [name]: 0,
        }));
      } else {
        const formattedValue = parseFloat(value).toFixed(2);
        setNewBill((prev) => ({
          ...prev,
          [name]: Math.min(formattedValue, 1000000.99),
        }));
      }
    } else if (name === "repeat") {
      setNewBill({
        ...newBill,
        repeat: value,
        endDate: value !== "Never Repeat" ? newBill.dueDate : null,
      });
    } else {
      setNewBill((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmitnewBill = (e) => {
    e.preventDefault();
    // console.log("New Bill Data:", {
    //   ...newBill,
    //   dueDate: format(newBill.dueDate, "yyyy-MM-dd"),
    //   endDate: format(newBill.endDate, "yyyy-MM-dd"),
    // });
    dispatch(
      addBill({
        ...newBill,
        dueDate: format(newBill.dueDate, "yyyy-MM-dd"),
        endDate: format(newBill.endDate, "yyyy-MM-dd"),
      })
    );
    // Reset form after submission
    setNewBill({
      amount: 0,
      dueDate: parseISO(format(new Date(), "yyyy-MM-dd")), // Default to current date,
      name: "",
      repeat: "Never Repeat",
      endDate: null, // Default to current date,
      category: "",
    });
    handleToggleAddBill();
  };

  return (
    <div className="overlay">
      <div className="container add-transaction">
        <button className="button btn-close" onClick={handleToggleAddBill}>
          <span className="close-icon">&times;</span>
        </button>
        <h2 className="title">Add new bill</h2>
        <form onSubmit={handleSubmitnewBill}>
          <LabelInput
            className="input-amount"
            type="number"
            htmlFor="amount"
            step="0.01"
            text="$"
            name="amount"
            value={newBill.amount}
            onChange={handleChange}
            required
          />
          <LabelInput
            type="date"
            htmlFor="dueDate"
            text="Due Date"
            name="dueDate"
            value={format(newBill.dueDate, "yyyy-MM-dd")}
            onChange={handleChange}
            required
          />

          <SelectInput
            options={[
              "Never Repeat",
              "Everyday",
              "Every Week",
              "Every other week",
              "Every Month",
            ]}
            value={newBill.repeat}
            onChange={handleChange}
            name="repeat"
            text="Repeat"
            disabled={true}
          />

          {newBill.repeat !== "Never Repeat" && (
            <LabelInput
              type="date"
              htmlFor="endDate"
              text="Repeat until"
              name="endDate"
              value={format(newBill.endDate, "yyyy-MM-dd")}
              onChange={handleChange}
              required
            />
          )}

          <LabelInput
            type="text"
            htmlFor="name"
            text="Transaction Name"
            name="name"
            placeholder="e.g., Grocery Shopping"
            value={newBill.name}
            onChange={handleChange}
            required
          />

          <LabelInput
            type="text"
            htmlFor="category"
            text="Category"
            name="category"
            placeholder="e.g., Food, Utilities"
            value={newBill.category}
            onChange={handleChange}
            disabled={true}
          />
          <button className="button" type="submit">
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDemoBill;
