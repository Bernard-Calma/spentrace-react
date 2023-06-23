import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    planItems: [],
    totalIncome: 0,
    totalExpense: 0,
    openPlan: {},
    isLoading: true
}

export const getPlans = createAsyncThunk("plan/getPlans", async (thunkAPI) => {
    console.log("Get Plans.")
    try {
        
        const res = await axios({ 
                    method: "GET",
                    url: `${process.env.REACT_APP_SERVER_URL}/plans`,
                    withCredentials: true 
                })
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
        load: () => {
            console.log("Test")
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getPlans.pending, state => {
                console.log("Pending")
                state.isLoading = true;
            })
            .addCase(getPlans.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log("Fulfilled: ", action)
                state.planItems = action.payload;
            })
            .addCase(getPlans.rejected, state => {
                console.log("Rejected: ", state)
                state.isLoading = false;
            })
    }  
})

export const {

} = planSlice.actions

export default planSlice.reducer;