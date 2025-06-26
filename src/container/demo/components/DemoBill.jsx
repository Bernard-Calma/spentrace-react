const DemoBill = () => {
  return (
    <div className="container demo-bill">
      {/*TO DO: Change to months */}
      <h2>Demo Bills</h2>
      <div className="btn add-bill">
        <button className="add-bill_button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Bill
        </button>
      </div>
      <div className="demo-bill_body">
        <div className="container bills-type unpaid">
          <h3 className="expense">Unpaid Bills</h3>
          <div className="bills-list">
            <div className="bill-item">
              <p className="date">
                {/* Only a random day of the month */}
                15th
              </p>
              <p>Electricity Bill</p>
              <p className="bill-amount expense">$100</p>
            </div>
            <div className="bill-item">
              <p className="date">
                {/* Only a random day of the month */}
                20th
              </p>
              <p>Water Bill</p>
              <p className="bill-amount expense">$50</p>
            </div>
            {/* Add more unpaid bills as needed */}
          </div>
        </div>
        <div className="container bills-type paid">
          <h3 className="income">Paid Bills</h3>
          <div className="bills-list">
            <div className="bill-item">
              <p className="date">
                {/* Only a random day of the month */}
                5th
              </p>
              <p>Internet Bill</p>
              <p className="bill-amount income">$60</p>
            </div>
            <div className="bill-item">
              <p className="date">
                {/* Only a random day of the month */}
                10th
              </p>
              <p>Phone Bill</p>
              <p className="bill-amount income">$30</p>
            </div>
            {/* Add more paid bills as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoBill;
