import { useEffect, useState } from "react";

import "./calendar.scss";

const Calendar = ({ itemListProp }) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [itemList, setItemList] = useState(itemListProp || []);

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
    return itemList
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
        <div key={day} className={"calendar-day"}>
          <div className={`day-number ${isToday ? " today" : ""}`}>{day}</div>
          {totalExpenses > 999 ? (
            <div className={`day-total ${totalExpenses > 0 ? "expense" : ""}`}>
              ${(totalExpenses / 1000).toFixed(1)}K
            </div>
          ) : (
            <div className={`day-total ${totalExpenses > 0 ? "expense" : ""}`}>
              ${totalExpenses.toFixed(0)}
            </div>
          )}
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

  // Update itemList when prop changes
  useEffect(() => {
    setItemList(itemListProp || []);
  }, [itemListProp]);

  return (
    <div className="summary calendar-box">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2 className="subtitle">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="summary-content calendar">
        <div className="calendar-weekdays">
          {weekdays.map((day) => (
            <div key={day} className="calendar-weekday">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-grid">{renderCalendar()}</div>
      </div>
    </div>
  );
};

export default Calendar;
