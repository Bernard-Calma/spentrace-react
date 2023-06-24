import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    billItems: [],
    totalBillsPaid: 0,
    totalBillsUnpaid: 0,
    nextUnpaidBill: {},
    isLoading: false
}

export const getBills = createAsyncThunk("bill/getBills", async (payload, thunkAPI) => {
    // console.log("Getbills")
    try {
        const res = await axios({
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}/bills`,
            withCredentials: true
        })
        return res.data.sort((a, b) => (a.date > b.date) ? 1 : -1)
    } catch (err) {
        console.log("Get Plans Error: ", err)
        return thunkAPI.rejectWithValue("Error getting bills")
    
    }
})

const billSlice = createSlice({
    name: "bill",
    initialState,
    reducers: {
        getNextBill: state => {
            // console.log("nextGetBill")
            // Get paid and unpaid graph
            let totalPaid = 0;
            let totalUnpaid = 0;
            const currentMonth = new Date().getMonth();
            state.billItems.forEach(bill => {
                bill.dueDate.forEach((dueDate, index) => {
                    let billMonth = new Date(dueDate).getMonth()
                    // If month and year is current
                    if (billMonth === currentMonth && new Date(dueDate).getFullYear() === new Date().getFullYear()) {
                        bill.paid[index] ? totalPaid += bill.amount : totalUnpaid += bill.amount;
                    };
                });
            })
            state.totalBillsPaid = totalPaid;
            state.totalBillsUnpaid = totalUnpaid
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getBills.pending, state => {
            // console.log("Pending")
            state.isLoading = true;
        })
        .addCase(getBills.fulfilled, (state, action) => {
            state.isLoading = false;
            // console.log("Fulfilled: ", action)
            state.billItems = action.payload;
        })
        .addCase(getBills.rejected, state => {
            // console.log("Rejected: ", state)
            state.isLoading = false;
        })
    }
})

export const {
    getNextBill
} = billSlice.actions

export default billSlice.reducer