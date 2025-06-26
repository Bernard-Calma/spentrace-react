import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/userSlice";
import { changeView } from "../../features/viewSlice";

import Icon from "../Icon";

import "./header.scss";

const Header = () => {
  const { loggedIn } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <header>
      <h1
        className="title"
        onClick={() => dispatch(changeView({ demoView: "Demo" }))}
      >
        Spen<span>trace</span>
      </h1>
      <div className="nav-container">
        <nav className="hidden md:flex gap-3 ml-6 text-sm text-gray-600">
          {/* Demo Only */}
          <p onClick={() => dispatch(changeView({ demoView: "Demo" }))}>Home</p>
          <p
            onClick={() =>
              dispatch(changeView({ demoView: "transactions-list" }))
            }
          >
            Transactions
          </p>
          <p onClick={() => dispatch(changeView({ demoView: "bills" }))}>
            Bills
          </p>
          {/* Full Access */}
          {/* Budget, Bills, Accounts */}
          {/* TO-DO: Add nav for budget, bills and accounts */}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {loggedIn && (
          <Icon
            className="fi fi-rr-sign-out-alt"
            onClick={() => dispatch(logout())}
          />
        )}

        {/* Mobile menu icon */}
        {/* <button className="md:hidden">
          <Menu className="h-6 w-6 text-gray-800" />
        </button> */}
      </div>
    </header>
  );
};

export default Header;
