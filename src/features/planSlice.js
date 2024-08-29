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
    newPlanId: 0,
    isLoading: true
}

// Local Functions
// Calculate next balance start
const setRunningTotal = newPlanItems => {
    let runningTarget = 0;
    let total = 0;
    const plansArray = newPlanItems.sort((a, b) => (a.date > b.date) ? 1 : -1);
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
}
// Calculate next balance ends

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
        const plansArray = res.data.sort((a,b) => new Date(a.date) - new Date(b.date) || a.name.localeCompare(b.name));
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
        setOpenPlan: (state, {payload}) => {
            state.openPlan = payload;
        },
        addPlan: (state, {payload}) => {
            // Set a new planToAdd variable cotaining payload key:value pair
            const planToAdd = {
                name: payload.name,
                amount: parseInt(payload.amount),
                date: payload.date,
                expense: payload.expense,
                notes: payload.notes
            }

            state.planItems = setRunningTotal([...state.planItems, planToAdd]).sort((a,b) => new Date(a.date) - new Date(b.date) || a.name.localeCompare(b.name));
            state.isLoading = false;

            // Add a way to catch network error
            axios({
                method: "POST",
                url: `${serverURL}/plans/`,
                data: planToAdd,
                withCredentials: true
            })
        },
        deletePlan: (state, {payload}) => {
            if(payload._id) {
                state.planItems = setRunningTotal(state.planItems.filter(plan => payload._id !== plan._id).sort((a,b) => new Date(a.date) - new Date(b.date) || a.name.localeCompare(b.name)))
                axios({
                    method: "DELETE",
                    url: `${serverURL}/plans/${payload._id}`,
                    withCredentials: true,
                })
            } else {
                // For new plans without any id
                // Return If statement conditions are true
                // Properties that doesn't match
                // _id, name, amount, date, expense, notes
                state.planItems = setRunningTotal(state.planItems.filter(plan => (
                    payload._id !== plan._id ||
                    payload.name !== plan.name ||
                    payload.amount !== plan.amount ||
                    payload.date !== plan.date ||
                    payload.expense !== plan.expense ||
                    payload.notes !== plan.notes
                )).sort((a,b) => new Date(a.date) - new Date(b.date) || a.name.localeCompare(b.name)))
                axios({
                    method: "DELETE",
                    url: `${serverURL}/plans`,
                    withCredentials: true,
                    data: payload
                })
            }
            
        },
        modifyPlan: (state, {payload}) => {
            if(payload._id) {
                state.planItems = setRunningTotal(state.planItems.map(plan => plan._id === payload._id ? payload : plan).sort((a,b) => new Date(a.date) - new Date(b.date) || a.name.localeCompare(b.name)));
                axios({
                    method: "PUT",
                    url: `${serverURL}/plans/${payload._id}`,
                    withCredentials: true,
                    data: {newData: payload},
                })
            } else {
                state.planItems = setRunningTotal(state.planItems.map(plan => (
                    plan._id !== state.openPlan._id ||
                    plan.name !== state.openPlan.name ||
                    plan.amount !== state.openPlan.amount ||
                    plan.date !== state.openPlan.date ||
                    plan.expense !== state.openPlan.expense ||
                    plan.notes !== state.openPlan.notes
                ) ? plan : payload).sort((a,b) => new Date(a.date) - new Date(b.date) || a.name.localeCompare(b.name)));
                axios({
                    method: "PUT",
                    url: `${serverURL}/plans/${state.openPlan._id || "-1"}`,
                    data: {
                        originalPlan: state.openPlan,
                        newData: payload
                    },
                    withCredentials: true,
                })
            }

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
    }  
})

export const {
    getBalance,
    setOpenPlan,
    addPlan,
    deletePlan,
    modifyPlan
} = planSlice.actions

export default planSlice.reducer;