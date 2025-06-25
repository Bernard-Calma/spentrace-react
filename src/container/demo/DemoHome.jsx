import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeView, toggleNavBar } from "../../features/viewSlice";
import { loadFromLocalStorage, updateBalance } from "../../features/demoSlice";
import DemoDashboard from "./components/DemoDashboard";
import CreateBudget from "./components/CreateBudget";

import "./demoHome.scss";
import TransactionsList from "./components/TransactionsList";
import Header from "../../common/Header/Header";
import AddTransaction from "./components/AddTransaction";

const DemoHome = () => {
  const dispatch = useDispatch();
  // ------------------------------ VARIABLES ------------------------------
  // Plans
  const { budgetName, budgetItems } = useSelector((store) => store.demo);
  // Views
  const { demoView } = useSelector((store) => store.view);
  const { homeView, planView, billView, accountView } = useSelector(
    (store) => store.view
  );

  const [showAddTransaction, setShowAddTransaction] = useState(false);

  const handleToggleAddTransaction = () => {
    setShowAddTransaction((prev) => !prev);
  };

  const hadleChangeView = (view) => {
    // planView: homeView === "Plan" ? "Plan List" : planView
    // This same login accross all cases is to keep the current view on each mainViews
    // e.g if bill view is add if you change the main view and go back to bill view it will still be on add.
    switch (view) {
      case "Plan List":
        dispatch(
          changeView({
            homeView: "Plan",
            planView: homeView === "Plan" ? "Plan List" : planView,
          })
        );
        break;
      case "Bills List":
        dispatch(
          changeView({
            homeView: "Bills List",
            billView: homeView === "Bills List" ? "Bills List" : billView,
          })
        );
        break;
      case "Account List":
        dispatch(
          changeView({
            homeView: "Account List",
            accountView: {
              view:
                homeView === "Account List" ? "Account List" : accountView.view,
            },
          })
        );
        break;
      default:
        break;
    }
    dispatch(toggleNavBar());
  };
  // ------------------------------ END OF FUNCTIONS ------------------------------
  useEffect(() => {
    dispatch(loadFromLocalStorage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(updateBalance());
  }, [budgetItems]);

  return (
    <section className="container demo-home">
      <div className="mobile-only add-transaction">
        <button
          className="button add-transaction-button"
          onClick={handleToggleAddTransaction}
        >
          +
        </button>
      </div>

      <Header />
      {showAddTransaction && (
        <AddTransaction
          handleToggleAddTransaction={handleToggleAddTransaction}
        />
      )}
      {budgetName === "" || !budgetName ? (
        <CreateBudget />
      ) : demoView === "Demo" ? (
        <DemoDashboard
          showAddTransaction={showAddTransaction}
          handleToggleAddTransaction={handleToggleAddTransaction}
        />
      ) : demoView === "transactions-list" ? (
        <TransactionsList budgetName={budgetName} />
      ) : (
        <></>
      )}
    </section>
  );
};

export default DemoHome;
