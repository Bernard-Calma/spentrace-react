const Plans = () => {
  return (
    <div className="container plans">
      <h2>Choose Your Plan</h2>
      <div className="plan-options">
        <div className="plan-option">
          <h3>Monthly</h3>
          <p>$4.99 / month</p>
          <button className="button">Select</button>
        </div>
        <div className="plan-option">
          <h3>Yearly (15% Off)</h3>
          <p>$20.30 / year</p>
          <button className="button">Select</button>
        </div>
        <div className="plan-option">
          <h3>Lifetime </h3>
          <p>$59.99 (One-time payment)</p>
          <button className="button">Select</button>
        </div>
      </div>
    </div>
  );
};

export default Plans;
