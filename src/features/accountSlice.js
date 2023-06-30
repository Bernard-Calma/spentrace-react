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

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {

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
    }
});

export const {

} = accountSlice.actions

export default accountSlice.reducer;