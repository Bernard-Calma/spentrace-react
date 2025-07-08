const Plans = () => {
  const plans = [
    {
      name: "Monthly",
      price: "$4.99 / month",
      priceId: "price_1Rg05cQx9Tvdr5ymNn8vzfo4",
    },
    {
      name: "Yearly (15% Off)",
      price: "$20.30 / year",
      priceId: "price_1Rg07yQx9Tvdr5ymbtZU7Ucg",
    },
    {
      name: "Lifetime",
      price: "$59.99 (One-time payment)",
      priceId: "price_1Rg08YQx9Tvdr5ymynfcm5HD",
    },
  ];

  const handleSubmitSelectPlan = (priceId) => {
    // Handle the plan selection logic here, e.g., redirect to Stripe checkout
    console.log(`Selected plan with price ID: ${priceId}`);
    // You can implement the Stripe checkout flow here
  };
  return (
    <div className="container plans">
      <h2>Choose Your Plan</h2>
      <div className="plan-options">
        {plans.map((plan) => (
          <div className="plan-option" key={plan.priceId}>
            <h3>{plan.name}</h3>
            <p>{plan.price}</p>
            <button
              className="button"
              onClick={() => handleSubmitSelectPlan(plan.priceId)}
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
