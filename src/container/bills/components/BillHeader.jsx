const BillsHeader = ({
  currentMonth,
  currentYear,
  handlePrevMonth,
  handleNextMonth,
}) => {
  return (
    <div className="bills-header">
      <button onClick={handlePrevMonth}>&lt;</button>
      <h3>
        {new Date(currentYear, currentMonth).toLocaleString("default", {
          month: "long",
        })}{" "}
        {currentYear}
      </h3>
      <button onClick={handleNextMonth}>&gt;</button>
    </div>
  );
};

export default BillsHeader;
