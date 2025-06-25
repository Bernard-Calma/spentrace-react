import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { format } from "date-fns";

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
    editTransaction: (state, { payload }) => {
      const { id, amount } = payload;
      const editTransaction = null;

      state.budgetItems.map((item) => {
        console.log(item);
      });

      for (let index of state.budgetItems) {
        console.log(state.budgetItems[index]);
        if (state.budgetItems[index].id === id) {
          console.log(state.budgetItems[index]);
        }
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
      .addCase(loadFromLocalStorage.fulfilled, (state, { payload }) => {
        // Set state if payload.budgetItems exist.
        if (payload.budgetItems.length !== -1) {
          state.budgetItems = [...payload.budgetItems];
          let totalIncome = 0;
          let totalExpense = 0;

          for (let transaction of [...payload.budgetItems]) {
            if (transaction.type === "expense") {
              totalExpense += transaction.amount;
            } else {
              totalIncome += transaction.amount;
            }
          }

          state.totalIncome = totalIncome;
          state.totalExpense = totalExpense;
          state.balance = totalIncome + totalExpense;
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
