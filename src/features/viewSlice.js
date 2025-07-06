import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  view: "Login",
  homeView: "Home",
  planView: "Plan List",
  billView: "Bills List",
  emptyView: "Empty Dashboard",
  demoView: "Demo",
  accountView: {
    view: "Account List",
    checkingView: true,
    savingsView: true,
    creditCardsView: true,
    loansView: true,
  },
  showNav: false,
  isLoading: false,
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    changeView: (state, { payload }) => {
      console.log(payload);
      const {
        view,
        billView,
        homeView,
        planView,
        emptyView,
        accountView,
        demoView,
      } = payload;
      // Change the view based on the payload
      // If the payload is not provided, keep the current state
      // This allows for partial updates to the state
      // e.g. changeView({ view: "Login" }) will only change the view to "Login"
      // To change sub-views, you can pass the specific view you want to change
      // e.g. changeView({ planView: "Add Plan" }) will only change the planView to "Add Plan"
      state.view = view ? view : state.view;
      state.homeView = homeView ? homeView : state.homeView;
      state.planView = planView ? planView : state.planView;
      state.billView = billView ? billView : state.billView;
      state.demoView = demoView ? demoView : state.demoView;
      state.emptyView = emptyView ? emptyView : state.emptyView;
      state.accountView = { ...state.accountView, ...accountView };
    },
    toggleAccountsCategory: (state, { payload }) => {
      let accountView = state.accountView;
      accountView = { ...accountView, [payload]: !accountView[payload] };
      state.accountView = { ...state.accountView, ...accountView };
    },
    showNav: (state) => {
      state.showNav = true;
    },
    hideNav: (state) => {
      state.showNav = false;
    },
    toggleNavBar: (state) => {
      state.showNav = !state.showNav;
    },
  },
});

export const {
  changeView,
  toggleAccountsCategory,
  showNav,
  hideNav,
  toggleNavBar,
} = viewSlice.actions;

export default viewSlice.reducer;
