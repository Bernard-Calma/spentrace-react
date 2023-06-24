import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    planItems: [],
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    nextTarget: {},
    openPlan: {},
    isLoading: true
}

export const getPlans = createAsyncThunk("plan/getPlans", async (params, thunkAPI) => {
    // console.log("Get Plans.")
    // console.log("Thunk: ",thunkAPI)
    try {
        const res = await axios({ 
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}/plans`,
            withCredentials: true 
        })
        // console.log(thunkAPI.getState().plan.planItems)
        /**
        * Compute for running balance and target
        * from plan parameter from plans array
        */
        // Set variables back to 0 to prevent adding values from previous computation
        let runningTarget = 0;
        let total = 0;
        const plansArray = res.data
        plansArray.forEach(plan => {
          if (plan.expense === true) {
              runningTarget += plan.amount;
              total -= plan.amount;
          } else if (plan.expense === false) {
              runningTarget -= plan.amount;
              total += plan.amount;
          };
          if (runningTarget < 0) {
              plan.target = 0;
          } else {
              plan.target = runningTarget;
          }
          plan.runningTotal = total;  
        });
        return plansArray;
    } catch (err) {
        console.log("Get Plans Error: ", err)
        return thunkAPI.rejectWithValue("Error getting plans")
    }
})

const planSlice = createSlice({
    name: "plan",
    initialState,
    reducers: {
        getBalance: state => {
            // variables for balance
            let runningBalance = 0;
            let totalIncome = 0;
            let totalExpense = 0;
            // variables for next target
            let balance = 0;
            let nextTarget = {
                amount: 0,
                date: ""
            };
            for (const plan of state.planItems) {
                // computation for balance
                if (plan.expense) {
                    runningBalance -= plan.amount
                    totalExpense += plan.amount
                } else {
                    runningBalance += plan.amount
                    totalIncome += plan.amount
                };
                // computation for next target
                plan.expense ? balance -= plan.amount :  balance += plan.amount
                // console.log(balance)
                if (balance <= 0 && nextTarget.amount === 0) {
                    nextTarget.amount = balance;
                    nextTarget.name = plan.name;
                    nextTarget.date = plan.date;
                    state.nextTarget = nextTarget;
                };
            };
            state.balance = runningBalance;
            state.totalIncome = totalIncome;
            state.totalExpense = totalExpense
        },
        modifyPlan: state => {

        }
    },
    extraReducers: builder => {
        builder
            .addCase(getPlans.pending, state => {
                // console.log("Pending")
                state.isLoading = true;
            })
            .addCase(getPlans.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log("Fulfilled: ", action)
                state.planItems = action.payload;
            })
            .addCase(getPlans.rejected, state => {
                // console.log("Rejected: ", state)
                state.isLoading = false;
            })
    }  
})

export const {
    getBalance
} = planSlice.actions

export default planSlice.reducer;