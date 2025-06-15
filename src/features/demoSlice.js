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
  budgetItems: [
    { date: "2025-06-01", name: "Groceries", amount: -45544.0 },
    { date: "2025-06-03", name: "Internet Bill", amount: -60.0 },
    { date: "2025-06-05", name: "Salary", amount: 1500.0 },
    { date: "2025-06-05", name: "Salary", amount: -875.0 },
    { date: "2025-06-14", name: "Dining", amount: -22.5 },
    {
      date: new Date().toISOString().split("T")[0],
      name: "Fuel",
      amount: -30.0,
    },
  ],
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
      const { date, name, amount } = payload;
      state.budgetItems.push({ date, name, amount });
      state.isLoading = false;

      // Update totals
      if (amount < 0) {
        state.totalExpense += Math.abs(amount);
      } else {
        state.totalIncome += amount;
      }
      state.balance = state.totalIncome - state.totalExpense;
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

export const { getBudgets, createBudget, addTransaction } = demoSlice.actions;
export default demoSlice.reducer;
