import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    planItems: [],
    totalIncome: 0,
    totalExpense: 0,
    openPlan: {}

}

const planSlice = createSlice({
    name: "plan",
    initialState,
    reducers: {

    }
})

export default planSlice.reducer;