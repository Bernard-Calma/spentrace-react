import { useState } from "react";

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const transactions = [
    { date: "2025-06-01", name: "Groceries", amount: -45.0 },
    { date: "2025-06-03", name: "Internet Bill", amount: -60.0 },
    { date: "2025-06-05", name: "Salary", amount: 1500.0 },
    { date: "2025-06-14", name: "Dining", amount: -22.5 },
    { date: today.toISOString().split("T")[0], name: "Fuel", amount: -30.0 },
  ];

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const getDayExpenses = (day) => {
    const dateStr = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    )
      .toISOString()
      .split("T")[0];
    return transactions
      .filter((t) => t.date === dateStr && t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const renderCalendar = () => {
    const cells = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();
      const totalExpenses = getDayExpenses(day);
      cells.push(
        <div key={day} className={`calendar-day${isToday ? " today" : ""}`}>
          <div className="day-number">{day}</div>
          <div className={`day-total ${totalExpenses > 0 ? "expense" : ""}`}>
            ${totalExpenses.toFixed(2)}
          </div>
        </div>
      );
    }
    // Pad to always have 42 cells (6 weeks)
    while (cells.length < 42) {
      cells.push(
        <div key={`pad-${cells.length}`} className="calendar-day empty"></div>
      );
    }
    return cells;
  };

  return (
    <div className="summary calendar-box">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2 className="section-title">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="summary-content calendar">
        <div className="calendar-grid">{renderCalendar()}</div>
      </div>
    </div>
  );
};

export default Calendar;
