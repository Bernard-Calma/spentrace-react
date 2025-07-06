import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Footer from "./container/footer/Footer";
import LandingPage from "./container/landingPage/LandingPage";
import Home from "./container/home/Home";

import "./app.scss";
import DemoHome from "./container/demo/DemoHome";
import Subscribe from "./container/subscribe/Subscribe";
import CreateBudget from "./common/CreateBudget/CreateBudget";
import { createBudget } from "./features/budgetSlice";

const App = () => {
  // ------------------------------ VARIABLES ------------------------------
  const dispatch = useDispatch();
  // User information
  const { loggedIn, demo } = useSelector((store) => store.user);
  // View information
  const { view } = useSelector((store) => store.view);
  // Budget information
  const { budgetId } = useSelector((store) => store.budget);
  // ------------------------------ END OF VARIABLES ------------------------------

  const handleCreateBudget = (e, newBudget) => {
    e.preventDefault();
    // console.log("Creating budget with: ", newBudget);
    dispatch(createBudget(newBudget));
  };

  useEffect(() => {
    // Check if current session has user
    // dispatch(getUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {loggedIn ? (
        <>
          {budgetId ? (
            <Home />
          ) : (
            <CreateBudget handleSubmitCreateBudget={handleCreateBudget} />
          )}
        </>
      ) : view === "subscribe" ? (
        <Subscribe />
      ) : !demo ? (
        <LandingPage />
      ) : (
        /* This allows for a demo experience without requiring login */
        <DemoHome />
        // If demo is true, render DemoHome instead of LandingPage
        // This allows for a demo experience without requiring login
        // and still provides the landing page experience for regular users
        // who are not logged in or using the demo.
      )}
      <Footer />
    </div>
  );
};

export default App;
