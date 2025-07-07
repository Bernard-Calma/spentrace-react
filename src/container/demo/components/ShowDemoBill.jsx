import { format, parseISO } from "date-fns";
import { useDispatch } from "react-redux";
import { deleteBill, editBill } from "../../../features/demoSlice";
import { useState } from "react";
import { SelectInput, LabelInput } from "../../../common";

const ShowDemoBill = ({ bill, handleToggleTransaction }) => {
  const dispatch = useDispatch();
  const [billToEdit, setbillToEdit] = useState({
    ...bill,
    dueDate: parseISO(bill.dueDate),
    endDate: parseISO(bill.endDate),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Format date using date-fns
    if (name === "dueDate") {
      setbillToEdit({
        ...billToEdit,
        dueDate: parseISO(value),
      });
      return;
    } else if (name === "endDate") {
      setbillToEdit({
        ...billToEdit,
        endDate:
          billToEdit.dueDate < parseISO(value)
            ? parseISO(value)
            : billToEdit.dueDate,
      });
      return;
    }
    // Limit amount to two decimal places and max value of 1000000
    else if (name === "amount") {
      if (value === "") {
        setbillToEdit((prev) => ({
          ...prev,
          [name]: 0,
        }));
      } else {
        const formattedValue = parseFloat(value).toFixed(2);
        setbillToEdit((prev) => ({
          ...prev,
          [name]: Math.min(formattedValue, 1000000.99),
        }));
      }
    } else if (name === "repeat") {
      setbillToEdit({
        ...billToEdit,
        repeat: value,
        endDate: value !== "Never Repeat" ? billToEdit.dueDate : null,
      });
    } else {
      setbillToEdit((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmitEditBill = (e) => {
    e.preventDefault();
    console.log("Edit Bill:", {
      ...billToEdit,
      dueDate: format(billToEdit.dueDate, "yyyy-MM-dd"),
      endDate: format(billToEdit.endDate, "yyyy-MM-dd"),
    });
    dispatch(
      editBill({
        ...billToEdit,
        dueDate: format(billToEdit.dueDate, "yyyy-MM-dd"),
        endDate: format(billToEdit.endDate, "yyyy-MM-dd"),
      })
    );
    handleToggleTransaction();
  };

  const handleSubmitDeleteBill = (e) => {
    e.preventDefault();
    dispatch(deleteBill(bill));
    handleToggleTransaction();
  };

  return (
    <div className="overlay">
      <div className="container add-transaction">
        <button className="button btn-close" onClick={handleToggleTransaction}>
          <span className="close-icon">&times;</span>
        </button>
        <h2 className="title">Bill Information</h2>
        <form>
          <LabelInput
            className="input-amount"
            type="number"
            htmlFor="amount"
            step="0.01"
            text="$"
            name="amount"
            value={billToEdit.amount}
            onChange={handleChange}
            required
          />
          <LabelInput
            type="date"
            htmlFor="dueDate"
            text="Due Date"
            name="dueDate"
            value={format(billToEdit.dueDate, "yyyy-MM-dd")}
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
            value={billToEdit.repeat}
            onChange={handleChange}
            name="repeat"
            text="Repeat"
          />

          {billToEdit.repeat !== "Never Repeat" && (
            <LabelInput
              type="date"
              htmlFor="endDate"
              text="Repeat until"
              name="endDate"
              value={format(billToEdit.endDate, "yyyy-MM-dd")}
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
            value={billToEdit.name}
            onChange={handleChange}
            required
          />

          <LabelInput
            type="text"
            htmlFor="category"
            text="Category"
            name="category"
            placeholder="e.g., Food, Utilities"
            value={billToEdit.category}
            onChange={handleChange}
          />
          <div className="transaction-actions">
            <button
              className="button edit-button"
              onClick={handleSubmitEditBill}
            >
              Edit Transaction
            </button>
            <button
              className="button delete-button"
              onClick={handleSubmitDeleteBill}
            >
              Delete Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShowDemoBill;
