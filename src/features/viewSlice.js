import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    view: "Login",
    homeView: "Home",
    isLoading: false
}

const viewSlice = createSlice({
    name: "view",
    initialState,
    reducers: {
        changeView: (state, {payload}) => {
            console.log(payload)
            const {view, homeView} = payload
            state.view = view;
            state.homeView = homeView
        }
    }
})

export const {
    changeView
} = viewSlice.actions

export default viewSlice.reducer