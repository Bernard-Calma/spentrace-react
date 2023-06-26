import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    view: "Login",
    homeView: "Home",
    planView: "Plan List",
    isLoading: false
}

const viewSlice = createSlice({
    name: "view",
    initialState,
    reducers: {
        changeView: (state, {payload}) => {
            // console.log(payload)
            const {view, homeView, planView} = payload
            state.view = view ? view: state.view;
            state.homeView = homeView ? homeView : state.homeView;
            state.planView = planView ? planView : state.planView;
        }
    }
})

export const {
    changeView
} = viewSlice.actions

export default viewSlice.reducer