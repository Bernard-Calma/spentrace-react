import { useSelector } from "react-redux";
import LabelInput from "../../../common/LabelInput";

const DemoDashboard = () => {
  const { budgetItems } = useSelector((state) => state.demo);
  if (!budgetItems || budgetItems.length === 0) {
    return (
      <div className="empty-dashboard">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          🧾 Create Your Budget
        </h2>

        <form className="form">
          <LabelInput
            type="text"
            htmlFor="budgetName"
            text="Budget Name"
            name="budgetName"
            placeholder="e.g., January Budget"
          />

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Owner
            </label>
            <input
              type="text"
              placeholder="Your name or email"
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Invite Collaborators (subscription required)
            </label>
            <input
              type="email"
              placeholder="Enter email to invite"
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">
              Upgrade to invite others to this budget.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Notes
            </label>
            <textarea
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
              rows="3"
            ></textarea>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Create Budget
            </button>
          </div>
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
