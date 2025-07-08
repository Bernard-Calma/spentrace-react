import { Feature } from "./";

const Features = ({ handleChangeSubscribeView }) => {
  const features = [
    { title: "Recurring Bills" },
    { title: "Budget Planning Tools" },
    { title: "Custom Categories" },
    { title: "Multi-device Sync" },
    { title: "Invite Collaborators" },
    { title: "Export to CSV" },
  ];

  return (
    <div className="container features">
      <h1>Unlock More Features</h1>
      <p>Register and subscribe to access these premium features.</p>

      <div className="features-list">
        {features.map((feature, i) => (
          <Feature key={i} feature={feature} />
        ))}
      </div>
      <div
        className="subscribe-action"
        onClick={() => handleChangeSubscribeView("plans")}
      >
        <button className="button subscribe-button">Subscribe Now</button>
      </div>
    </div>
  );
};

export default Features;
