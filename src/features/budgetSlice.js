import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const initialState = {
  budgetId: "",
  budgetName: "",
  owner: "",
  collaborators: {
    pending: [],
    accepted: [],
  },
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
  isLoading: true,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    createBudget: (state, { payload }) => {
      //   console.log("Creating budget with:", payload);
      state.budgetId = 1; // This should be replaced with actual logic to generate a unique ID
      state.budgetName = payload.budgetName;
      state.owner = payload.owner;
      state.collaborators = {
        ...state.collaborators,
        pending: payload.collaborators,
      };
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {},
});

export const { createBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
