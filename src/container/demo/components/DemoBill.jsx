import {
  addDays,
  addWeeks,
  format,
  isAfter,
  isEqual,
  parseISO,
} from "date-fns";
import { useState } from "react";
import { useSelector } from "react-redux";
import AddBill from "./AddBill";

const DemoBill = () => {
  const { billItems } = useSelector((store) => store.demo);
  const [showAddBill, setShowAddBill] = useState(false);

  // Recreate the billItems array with if a bill repeat is not "Never Repeat" it will add another bill in the array
  const [billItemsWithRepeats] = useState(
    [...billItems].flatMap((bill) => {
      if (bill.repeat === "Never Repeat") {
        return [bill];
      }
      // Everyday
      else if (bill.repeat === "Everyday") {
        const bills = [];
        let newDate = parseISO(bill.dueDate);
        while (
          isAfter(parseISO(bill.endDate), newDate) ||
          isEqual(parseISO(bill.endDate), newDate)
        ) {
          bills.push({
            ...bill,
            dueDate: format(newDate, "yyyy-MM-dd"),
          });
          newDate = addDays(newDate, 1);
        }
        return bills;
      }
      // Every Week
      else if (bill.repeat === "Every Week") {
        const bills = [];
        let newDate = parseISO(bill.dueDate);
        while (
          isAfter(parseISO(bill.endDate), newDate) ||
          isEqual(parseISO(bill.endDate), newDate)
        ) {
          bills.push({
            ...bill,
            dueDate: format(newDate, "yyyy-MM-dd"),
          });
          newDate = addWeeks(newDate, 1);
        }
        return bills;
      }
      // Every other week
      else if (bill.repeat === "Every other week") {
        const bills = [];
        let newDate = parseISO(bill.dueDate);
        while (
          isAfter(parseISO(bill.endDate), newDate) ||
          isEqual(parseISO(bill.endDate), newDate)
        ) {
          bills.push({
            ...bill,
            dueDate: format(newDate, "yyyy-MM-dd"),
          });
          newDate = addWeeks(newDate, 2);
        }
        return bills;
      } else return bill;
    })
  );

  // Sort bills by date (newest first) and then by name
  const sortedBills = [...billItemsWithRepeats].sort((a, b) => {
    const dateA = parseISO(a.dueDate);
    const dateB = parseISO(b.dueDate);
    if (dateA > dateB) return 1;
    if (dateA < dateB) return -1;
    return a.name.localeCompare(b.name);
  });

  const handleToggleAddBill = () => {
    setShowAddBill((prev) => !prev);
  };

  return (
    <div className="container demo-bill">
      {showAddBill && (
        <AddBill handleToggleAddTransaction={handleToggleAddBill} />
      )}
      {/*TO DO: Change to months */}
      <h2>Demo Bills</h2>
      <div className="btn add-bill">
        <button className="add-bill_button" onClick={handleToggleAddBill}>
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
        <div className="bills-type">
          <div className="bills-list">
            {" "}
            {sortedBills?.map((bill, index) => (
              <div className="bill-item" key={index}>
                <p className="date">
                  {/* Only a random day of the month */}
                  {format(parseISO(bill.dueDate), "d")}th
                </p>
                <p>{bill.name}</p>
                <p className={`bill-amount`}>
                  $
                  {Math.abs(bill.amount).toLocaleString("en-US", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoBill;

// {/* full access */}
// <div className="demo-bill_body">
//   <div className="container bills-type unpaid">
//     <h3 className="expense">Unpaid Bills</h3>
//     <div className="bills-list">
//       <div className="bill-item">
//         <p className="date">
//           {/* Only a random day of the month */}
//           15th
//         </p>
//         <p>Electricity Bill</p>
//         <p className="bill-amount expense">$100</p>
//       </div>
//       <div className="bill-item">
//         <p className="date">
//           {/* Only a random day of the month */}
//           20th
//         </p>
//         <p>Water Bill</p>
//         <p className="bill-amount expense">$50</p>
//       </div>
//       {/* Add more unpaid bills as needed */}
//     </div>
//   </div>
//   <div className="container bills-type paid">
//     <h3 className="income">Paid Bills</h3>
//     <div className="bills-list">
//       <div className="bill-item">
//         <p className="date">
//           {/* Only a random day of the month */}
//           5th
//         </p>
//         <p>Internet Bill</p>
//         <p className="bill-amount income">$60</p>
//       </div>
//       <div className="bill-item">
//         <p className="date">
//           {/* Only a random day of the month */}
//           10th
//         </p>
//         <p>Phone Bill</p>
//         <p className="bill-amount income">$30</p>
//       </div>
//       {/* Add more paid bills as needed */}
//     </div>
//   </div>
// </div>
