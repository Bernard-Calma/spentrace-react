import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeView, toggleNavBar } from "../../features/viewSlice";

import Loading from "../../Components/Loading";
import Icon from "../../common/Icon";
import { loadFromLocalStorage } from "../../features/demoSlice";
import DemoDashboard from "./components/DemoDashboard";

import "./demoHome.scss";

const DemoHome = () => {
  const dispatch = useDispatch();
  // ------------------------------ VARIABLES ------------------------------
  // Plans
  const { budgetItems, isLoading } = useSelector((store) => store.demo);
  const { view, homeView, planView, billView, accountView, showNav } =
    useSelector((store) => store.view);

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

  return (
    <section className="container demo-home">
      {budgetItems.length === 0 ? (
        <>{isLoading ? <Loading /> : <DemoDashboard />}</>
      ) : (
        <>
          <Icon
            className="fi fi-rr-bars-staggered"
            onClick={() => dispatch(toggleNavBar())}
          />
          <div className={`homeNavBar ${showNav}`}>
            <p
              className={`navItem ${homeView === "Plan" ? "selected" : ""}`}
              onClick={() => hadleChangeView("Plan List")}
            >
              Budget
            </p>
            <p
              className={`navItem ${
                homeView === "Account List" ? "selected" : ""
              }`}
              onClick={() => hadleChangeView("Account List")}
            >
              Accounts
            </p>
          </div>
          <div className="containerHomeView">
            {/* {homeView === "Home" || view === "Home"
                            ? <DashBoard planItems = {planItems}/>
                            : homeView === "Plan" ? <PlanList/>
                            : homeView === "Bills List" ? <BillsList/>  
                            : homeView === "Account List" ? < AccountList/>  
                            : <></>
                        } */}
          </div>
        </>
      )}
    </section>
  );
};

export default DemoHome;
