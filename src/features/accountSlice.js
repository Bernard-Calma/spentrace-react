import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    accList: {
        checking: [],
        savings: [],
        creditCard: [],
        loan: []
    },
    isLoading: false
}

export const getAccounts = createAsyncThunk("account/getAccounts", async (payload, thunkAPI) => {
    console.log("Get Accounts")
    try {
        const res = await axios({ 
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}/accounts`,
            withCredentials: true 
        })
        return res.data
    } catch (err) {
        console.log("Get Plans Error: ", err)
        return thunkAPI.rejectWithValue("Error getting bills")
    }
})

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
        .addCase(getAccounts.pending, state => {
            console.log("Pending")
            state.isLoading = true;
        })
        .addCase(getAccounts.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            console.log("Fulfilled: ", payload)
            // state.billItems = payload;
        })
        .addCase(getAccounts.rejected, state => {
            console.log("Rejected: ", state)
            state.isLoading = false;
        })
    }
});

export const {

} = accountSlice.actions

export default accountSlice.reducer;