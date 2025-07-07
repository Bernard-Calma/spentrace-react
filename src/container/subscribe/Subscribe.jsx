import { Feature } from "./components";
import "./subscribe.scss";

const Subscribe = () => {
  // Simulated user data for preview/demo purposes
  const isDemo = true; // set false to simulate registered user
  const isSubscribed = false; // set true to simulate subscribed user

  const features = [
    { title: "Recurring Bills", unlocked: !isDemo },
    { title: "Budget Planning Tools", unlocked: isSubscribed },
    { title: "Custom Categories", unlocked: !isDemo },
    { title: "Multi-device Sync", unlocked: isSubscribed },
    { title: "Invite Collaborators", unlocked: isSubscribed },
    { title: "Export to CSV", unlocked: isSubscribed },
  ];

  return (
    <div className="container subscribe max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        {isSubscribed ? "You’ve Unlocked Everything!" : "Unlock More Features"}
      </h1>

      <p className="text-center text-gray-600 mb-6">
        {isSubscribed
          ? "Thank you for supporting Spentrace."
          : "Register and subscribe to access these premium features."}
      </p>

      <div className="features-list">
        {features.map((feature, i) => (
          <Feature key={i} feature={feature} />
        ))}
      </div>

      {!isSubscribed && (
        <div className="subscribe-action">
          <a
            href="/subscribe"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Subscribe Now
          </a>
        </div>
      )}
    </div>
  );
};

export default Subscribe;
