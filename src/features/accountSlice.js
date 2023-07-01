import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    accList: {
        checking: [],
        savings: [],
        creditCard: [],
        loan: []
    },
    openAcc: {},
    isLoading: false
}

export const getAccounts = createAsyncThunk("account/getAccounts", async (payload, thunkAPI) => {
    // console.log("Get Accounts")
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

export const addAccount = createAsyncThunk("account/addAccount", async (payload, thunkAPI) => {
    // console.log("Add Account")
    try {
        const res = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_SERVER_URL}/accounts`,
            data: payload,
            withCredentials: true
        })
        // console.log(res.data)
        return res.data
    } catch (err) {
        console.log("Add Account Error: ", err)
        return thunkAPI.rejectWithValue("Error getting bills")
    }
})

export const deleteAccount = createAsyncThunk("account/deleteAccount", async (payload, thunkAPI) => {
    // console.log("Delete Account")
    try {
        const res = await axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_SERVER_URL}/accounts/${payload._id}`,
            withCredentials: true
        })
        // console.log(res.data)
        return res.data
    } catch (err) {
        console.log("Delete Account Error: ", err)
        return thunkAPI.rejectWithValue("Error getting bills")
    }
})

export const editAccount = createAsyncThunk("account/editAccount", async (payload, thunkAPI) => {
    console.log("Edit Account")
    try {
        const res = await axios({
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}/accounts/${payload._id}`,
            data: payload,
            withCredentials: true,
        })
        console.log(res.data)
        return res.data
    } catch (err) {
        console.log("Edit Account Error: ", err)
        return thunkAPI.rejectWithValue("Error getting bills")
    }
})

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setOpenAcc: (state, {payload}) => {state.openAcc = payload}
    },
    extraReducers: builder => {
        builder
        .addCase(getAccounts.pending, state => {
            // console.log("Pending")
            state.isLoading = true;
        })
        .addCase(getAccounts.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            // console.log("Fulfilled: ", payload)
            const accountsCategories = {
                checking: [],
                savings: [],
                creditCard: [],
                loan: []
            }
            payload.forEach(account => {
                switch (account.accType) {
                    case "Checking":
                        accountsCategories.checking.push(account)
                        break;
                    case "Savings":
                        accountsCategories.savings.push(account)
                        break;
                    case "Credit Card":
                        accountsCategories.creditCard.push(account)
                        break;
                    case "Loan":
                        accountsCategories.loan.push(account)
                        break;
                    default:
                        break;
                }
            });
            // console.log(accountsCategories)
            state.accList = {
                checking: accountsCategories.checking.sort((a,b) => b.balance - a.balance),
                savings: accountsCategories.savings.sort((a,b) => b.balance - a.balance),
                creditCard: accountsCategories.creditCard.sort((a,b) => b.availableCredit - a.availableCredit),
                loan: accountsCategories.loan.sort((a,b) => ((a.loanAmount - a.balance) / a.loanAmount) - ((b.loanAmount - b.balance) / b.loanAmount)),
            
            };
        })
        .addCase(getAccounts.rejected, state => {
            console.log("Rejected: ", state)
            state.isLoading = false;
        })
        // Add Account
        .addCase(addAccount.pending, state => {
            // console.log("Pending")
            state.isLoading = true;
        })
        .addCase(addAccount.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            // console.log("Fulfilled: ", action)
            state.accList = [...state.accList, payload];
        })
        .addCase(addAccount.rejected, state => {
            // console.log("Rejected: ", state)
            state.isLoading = false;
        })
        // Delete Account
        .addCase(deleteAccount.pending, state => {
            // console.log("Pending")
            state.isLoading = true;
        })
        .addCase(deleteAccount.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            // console.log("Fulfilled: ", action)
            state.accList = state.accList.filter(account => payload._id !== account._id);
        })
        .addCase(deleteAccount.rejected, state => {
            // console.log("Rejected: ", state)
            state.isLoading = false;
        })
        // Edit Account
        .addCase(editAccount.pending, state => {
            // console.log("Pending")
            state.isLoading = true;
        })
        .addCase(editAccount.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            // console.log("Fulfilled: ", action)
            state.accList = state.accList.map(account => account._id === payload._id ? payload : account);
        })
        .addCase(editAccount.rejected, state => {
            // console.log("Rejected: ", state)
            state.isLoading = false;
        })
    }
});

export const {
    setOpenAcc
} = accountSlice.actions

export default accountSlice.reducer;