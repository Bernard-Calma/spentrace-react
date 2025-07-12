import { Feature } from "./";

const Features = ({ handleChangeSubscribeView }) => {
  const registeredFeatures = [
    { title: "Track Expenses" },
    { title: "Multi-device Sync" },
    { title: "Custom Categories" },
    { title: "Recurring Bills" },
    { title: "Access Reports" },
  ];

  const subscribedFeatures = [
    { title: "Create Custom Budgets" },
    { title: "Invite Collaborators" },
    { title: "Receive Notifications" },
    { title: "Budget Planning Tools" },
    { title: "Export to CSV" },
  ];

  return (
    <div className="container features">
      <h1>Unlock More Features</h1>
      <div className="features-section">
        <div className="features-list">
          <h2>Registered Features</h2>
          <p>Register to access these additional features.</p>
          {registeredFeatures.map((feature, i) => (
            <Feature key={i} feature={feature} />
          ))}
          <div
            className="subscribe-action"
            onClick={() => handleChangeSubscribeView("plans")}
          >
            <button className="button subscribe-button">Register Now</button>
          </div>
        </div>

        <div className="features-list">
          <h2>Subscribed Features</h2>
          <p>Subscribe to unlock these premium features.</p>
          {subscribedFeatures.map((feature, i) => (
            <Feature key={i} feature={feature} />
          ))}
          <div
            className="subscribe-action"
            onClick={() => handleChangeSubscribeView("plans")}
          >
            <button className="button subscribe-button">Subscribe Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
