import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  planItems: [],
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
  nextTarget: {},
  openPlan: {},
  newPlanId: 0,
  isLoading: true,
};

const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {},
});

export const {} = demoSlice.actions;
export default demoSlice.reducer;
