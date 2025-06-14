import { useDispatch, useSelector } from "react-redux";
import LabelInput from "../../../common/LabelInput";
import { useState } from "react";
import { createBudget } from "../../../features/demoSlice";

const DemoDashboard = () => {
  const dispatch = useDispatch();
  const [budget, setBudget] = useState({
    budgetName: "",
    owner: "",
    collaborators: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudget((prevBudget) => ({
      ...prevBudget,
      [name]: value,
    }));
  };

  const handleSubmitCreateBudget = (e) => {
    e.preventDefault();
    dispatch(createBudget(budget));
  };

  const { budgetItems } = useSelector((state) => state.demo);
  if (!budgetItems || budgetItems.length === 0) {
    return (
      <div className="empty-dashboard">
        <h2>🧾 Create Your Budget</h2>
        <form onSubmit={handleSubmitCreateBudget}>
          <LabelInput
            type="text"
            htmlFor="budgetName"
            text="Budget Name"
            name="budgetName"
            placeholder="e.g., January Budget"
            value={budget.budgetName}
            onChange={handleChange}
            required
          />
          <LabelInput
            type="text"
            htmlFor="owner"
            text="Owner"
            name="owner"
            placeholder="Your name or email"
            value={budget.owner}
            onChange={handleChange}
            required
          />
          <LabelInput
            type="email"
            htmlFor="collaboratrors"
            text="Invite Collaborators (subscription required)"
            name="collaboratrors"
            placeholder="Enter email to invite"
            disabled
            value={budget.collaborators.join(", ")}
            onChange={handleChange}
          />
          <p className="text-required">
            Upgrade to invite others to this budget.
          </p>
          <button className="button">Create Budget</button>
        </form>
      </div>
    );
  } else if (budgetItems.length > 0) {
    return (
      <div className="demo-dashboard">
        <h1>Demo Dashboard</h1>
        <p>You have {budgetItems.length} budget items.</p>
        <ul>
          {budgetItems.map((item, index) => (
            <li key={index}>
              {item.name}: ${item.amount}
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default DemoDashboard;
