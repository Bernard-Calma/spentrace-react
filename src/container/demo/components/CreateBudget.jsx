import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBudget } from "../../../features/demoSlice";
import LabelInput from "../../../common/LabelInput";

const CreateBudget = () => {
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
  return (
    <div className="create-budget">
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
};

export default CreateBudget;
