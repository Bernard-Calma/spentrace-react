import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const initialState = {
  budgetId: "",
  budgetName: "",
  budgetItems: [],
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
    addTransaction: (state, { payload }) => {
      // console.log("Adding transaction:", payload);
      // amount coming in as a positive number, negative for expenses
      const { amount } = payload;
      // Attach a unique ID if not present, using budgetItems length
      payload.id = state.budgetItems.length + 1;

      // Update totals
      if (amount < 0) {
        state.totalExpense += Math.abs(amount);
      } else {
        state.totalIncome += amount;
      }
      state.balance = state.totalIncome - state.totalExpense;
      state.budgetItems = [...state.budgetItems, payload];
      state.isLoading = false;
    },
    deleteTransaction: (state, { payload }) => {
      // Update totals first before removing the item
      if (payload.amount < 0) {
        state.totalExpense -= Math.abs(payload.amount);
      } else {
        state.totalIncome -= payload.amount;
      }
      state.balance = state.totalIncome - state.totalExpense;
      state.budgetItems = state.budgetItems.filter(
        (transaction) => transaction.id !== payload.id
      );
      state.isLoading = false;
    },
    editTransaction: (state, { payload }) => {
      state.budgetItems = state.budgetItems.map((transaction) => {
        if (transaction.type === "income") {
          state.totalIncome += Math.abs(transaction.amount - payload.amount);
        } else {
          state.totalExpense += Math.abs(transaction.amount - payload.amount);
        }
        return transaction.id === payload.id ? payload : transaction;
      });
      state.balance = state.totalIncome - state.totalExpense;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  createBudget,
  addTransaction,
  deleteTransaction,
  editTransaction,
} = budgetSlice.actions;

export default budgetSlice.reducer;
