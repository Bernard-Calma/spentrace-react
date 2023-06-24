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
        return res.data;
    } catch (err) {
        console.log("Get Plans Error: ", err)
        return thunkAPI.rejectWithValue("Error Loging In")
    }
})

const planSlice = createSlice({
    name: "plan",
    initialState,
    reducers: {
        getBalance: state => {
            let runningBalance = 0;
            let totalIncome = 0;
            let totalExpense = 0;
            // next target
            let balance = 0;
            let nextTarget = {
                amount: 0,
                date: ""
            };
            for (const plan of state.planItems) {
                if (plan.expense) {
                    runningBalance -= plan.amount
                    totalExpense += plan.amount
                } else {
                    runningBalance += plan.amount
                    totalIncome += plan.amount
                };
                // next target
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
    modifyPlan,
    getBalance,
    getTarget
} = planSlice.actions

export default planSlice.reducer;