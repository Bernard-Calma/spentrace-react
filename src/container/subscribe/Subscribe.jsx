import { useState } from "react";
import { Features, Plans } from "./components";
import "./subscribe.scss";

const Subscribe = () => {
  // ------------------------------ VARIABLES ------------------------------
  const [subscribeView, setSubscribeView] = useState("features");

  // ------------------------------ FUNCTIONS ------------------------------
  const handleChangeSubscribeView = (view) => {
    setSubscribeView(view);
  };

  return (
    <div className="container subscribe">
      {subscribeView === "features" ? (
        <Features handleChangeSubscribeView={handleChangeSubscribeView} />
      ) : (
        <Plans />
      )}
    </div>
  );
};

export default Subscribe;
