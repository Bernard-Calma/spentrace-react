import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    view: "Login",
    isLoading: false
}

const viewSlice = createSlice({
    name: "view",
    initialState,
    reducers: {
        changeView: (state, payload) => {
            state.view = payload;
        }
    }
})

export const {
    changeView
} = viewSlice.actions

export default viewSlice.reducer