import { configureStore } from "@reduxjs/toolkit";
import { loadDemoState, saveDemoState } from "./utils/localStorage";
import userReducer from "./features/userSlice";
import planReducer from "./features/planSlice";
import billReducer from "./features/billSlice";
import viewReducer from "./features/viewSlice";
import accountReducer from "./features/accountSlice";
import demoReducer from "./features/demoSlice";

const preloadedState = {
  demo: loadDemoState(),
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    plan: planReducer,
    bill: billReducer,
    view: viewReducer,
    account: accountReducer,
    demo: demoReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  // Save the demo state to localStorage whenever the store changes
  saveDemoState(state.demo);
});
