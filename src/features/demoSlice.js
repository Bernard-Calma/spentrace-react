import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadFromLocalStorage = createAsyncThunk(
  "demo/loadFromLocalStorage",
  async (_, thunkAPI) => {
    try {
      const data = localStorage.getItem("demo-state");
      return data ? JSON.parse(data) : undefined;
    } catch (err) {
      console.warn("LocalStorage load failed:", err);
      return thunkAPI.rejectWithValue("Failed to load demo state");
    }
  }
);

const initialState = {
  budgetName: "",
  owner: "",
  budgetItems: [],
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
  nextTarget: {},
  openBudgetItem: {},
  isLoading: true,
};

const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    getBudgets: (state, action) => {
      state.planItems = action.payload;
      state.isLoading = false;
    },
    createBudget: (state, { payload }) => {
      state.budgetName = payload.budgetName;
      state.owner = payload.owner;
      state.isLoading = false;
    },
    addTransaction: (state, { payload }) => {
      const { amount } = payload;
      state.budgetItems.push({ id: state.newBudgetId++, ...payload });
      state.isLoading = false;

      // Update totals
      if (amount < 0) {
        state.totalExpense += Math.abs(amount);
      } else {
        state.totalIncome += amount;
      }
      state.balance = state.totalIncome - state.totalExpense;
    },
    editTransaction: (state, { payload }) => {
      const { id, amount } = payload;
      const itemIndex = state.budgetItems.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        // Update totals first
        const oldAmount = state.budgetItems[itemIndex].amount;
        if (oldAmount < 0) {
          state.totalExpense -= Math.abs(oldAmount);
        } else {
          state.totalIncome -= oldAmount;
        }

        // Update the item
        state.budgetItems[itemIndex] = payload;

        // Update totals again after the change
        if (amount < 0) {
          state.totalExpense += Math.abs(amount);
        } else {
          state.totalIncome += amount;
        }
        state.balance = state.totalIncome - state.totalExpense;
      }

      state.isLoading = false;
    },
    deleteTransaction: (state, { payload }) => {
      //update totals first before removing the item
      if (payload.amount < 0) {
        state.totalExpense -= Math.abs(payload.amount);
      } else {
        state.totalIncome -= payload.amount;
      }
      state.budgetItems = state.budgetItems.filter(
        (item) => item.id !== payload.id
      );

      state.isLoading = false;
    },
    setOpenBudgetItem: (state, action) => {
      state.openBudgetItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFromLocalStorage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadFromLocalStorage.fulfilled, (state, action) => {
        if (action.payload) {
          state.budgetItems = action.payload.budgetItems || [];
          state.totalIncome = action.payload.totalIncome || 0;
          state.totalExpense = action.payload.totalExpense || 0;
          state.balance = action.payload.balance || 0;
          state.nextTarget = action.payload.nextTarget || {};
          state.openBudget = action.payload.openBudget || {};
          state.newBudgetId = action.payload.newBudgetId || 0;
        }
        state.isLoading = false;
      })
      .addCase(loadFromLocalStorage.rejected, (state, action) => {
        console.warn("Failed to load demo state:", action.payload);
        state.isLoading = false;
      });
  },
});

export const {
  getBudgets,
  createBudget,
  addTransaction,
  setOpenBudgetItem,
  editTransaction,
  deleteTransaction,
} = demoSlice.actions;
export default demoSlice.reducer;
