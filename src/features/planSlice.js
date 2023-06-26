import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

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
            url: `${serverURL}/plans`,
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

export const addPlan = createAsyncThunk("plan/add", async (newPlan, thunkAPI) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${serverURL}/plans/`,
            data: newPlan,
            withCredentials: true
        })
        // console.log(res.data);
        return res.data
    } catch (err) {
        console.log("Add plan Error: ", err)
        return thunkAPI.rejectWithValue("Error getting plans")
    }
})

export const deletePlan = createAsyncThunk("plan/delete", async (plan, thunkAPI) => {
    console.log(plan)
    try {
        const res = await axios({
            method: "DELETE",
            url: `${serverURL}/plans/${plan._id}`,
            withCredentials: true,
        })
        console.log(res.data);
        return res.data
    } catch (err) {
        console.log("Delete plan Error: ", err)
        return thunkAPI.rejectWithValue("Error getting plans")
    }
})

export const modifyPlan = createAsyncThunk("plan/modify", async (plan, thunkAPI) => {
    console.log(thunkAPI.dispatch().plan)
    try {
        const res = await axios({
            method: "PUT",
            url: `${serverURL}/plans/${plan._id}`,
            data: plan,
            withCredentials: true,
        })
        console.log(res.data);
        return res.data
    } catch (err) {
        console.log("Modify plan Error: ", err)
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
        setOpenPlan: (state, {payload}) => {
            state.openPlan = payload;
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
            // Add Plan
            .addCase(addPlan.pending, state => {
                // console.log("Pending")
                state.isLoading = true;
            })
            .addCase(addPlan.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                // console.log(payload)
                state.planItems = [...state.planItems, payload].sort((a, b) => (a.date > b.date) ? 1 : -1)
            })
            .addCase(addPlan.rejected, state => {
                // console.log("Rejected: ", state)
                state.isLoading = false;
            })
            // Delete Plan
            .addCase(deletePlan.pending, state => {
            // console.log("Pending")
            state.isLoading = true;
            })
            .addCase(deletePlan.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                // console.log(payload)
                state.planItems = state.planItems.filter(plan => payload._id !== plan._id).sort((a, b) => (a.date > b.date) ? 1 : -1)
            })
            .addCase(deletePlan.rejected, state => {
                // console.log("Rejected: ", state)
                state.isLoading = false;
            })
            // Modify Plan
            .addCase(modifyPlan.pending, state => {
            // console.log("Pending")
            state.isLoading = true;
            })
            .addCase(modifyPlan.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                // console.log(payload)
                state.planItems = state.planItems.map(plan => plan._id === payload._id ? payload : plan).sort((a, b) => (a.date > b.date) ? 1 : -1);
            })
            .addCase(modifyPlan.rejected, state => {
                // console.log("Rejected: ", state)
                state.isLoading = false;
            })
    }  
})

export const {
    getBalance,
    setOpenPlan
} = planSlice.actions

export default planSlice.reducer;