import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    view: "Login",
    homeView: "Home",
    planView: "Plan List",
    billView: "Bill List",
    emptyView: "Empty Dashboard",
    accountView: {
        view: "Account List",
        checkingView: true,
        savingsView: true,
        creditCardsView: true,
        loansView: true
    },
    isLoading: false
}

const viewSlice = createSlice({
    name: "view",
    initialState,
    reducers: {
        changeView: (state, {payload}) => {
            // console.log(payload)
            const {view, billView, homeView, planView, emptyView} = payload
            state.view = view ? view: state.view;
            state.homeView = homeView ? homeView : state.homeView;
            state.planView = planView ? planView : state.planView;
            state.billView = billView ? billView : state.billView;
            state.emptyView = emptyView ? emptyView : state.emptyView;
        }
    }
})

export const {
    changeView
} = viewSlice.actions

export default viewSlice.reducer