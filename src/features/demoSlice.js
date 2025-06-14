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
  reducers: {
    getBudgets: (state, action) => {
      state.planItems = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFromLocalStorage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadFromLocalStorage.fulfilled, (state, action) => {
        if (action.payload) {
          state.planItems = action.payload.planItems || [];
          state.totalIncome = action.payload.totalIncome || 0;
          state.totalExpense = action.payload.totalExpense || 0;
          state.balance = action.payload.balance || 0;
          state.nextTarget = action.payload.nextTarget || {};
          state.openPlan = action.payload.openPlan || {};
          state.newPlanId = action.payload.newPlanId || 0;
        }
        state.isLoading = false;
      })
      .addCase(loadFromLocalStorage.rejected, (state, action) => {
        console.warn("Failed to load demo state:", action.payload);
        state.isLoading = false;
      });
  },
});

export const { getBudgets } = demoSlice.actions;
export default demoSlice.reducer;
