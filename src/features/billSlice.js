import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
    
const initialState = {
    billItems: [],
    totalBillsPaid: 0,
    totalBillsUnpaid: 0,
    nextUnpaidBill: {},
    month: new Date().getUTCMonth(),
    monthText: monthNames[new Date().getUTCMonth()],
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

        // set a temp unpaid bill
        const firstBill = state.billItems[0]
        // console.log(firstBill.paid.indexOf(false))
        let firstFalseIndex = firstBill.paid.indexOf(false)
        // If firstfalseindex is negative (bill is not on repeat)
        firstFalseIndex = firstFalseIndex === -1 ? 0 : firstFalseIndex
        let unpaidBill = {
            name: firstBill.name,
            amount: firstBill.amount,
            dueDate: firstBill.dueDate[firstFalseIndex],
            paid: firstBill.paid[firstFalseIndex]
        }
        // console.log(unpaidBill)
        // Get the first bill that has a due date for the current year and month that is not paid
        state.billItems.forEach(bill => {
            bill.dueDate.forEach((dueDate, index) => {
                let billMonth = new Date(dueDate).getMonth()
                if (billMonth === currentMonth) {
                    if(!bill.paid[index] && billMonth === currentMonth && new Date(dueDate).getFullYear() === new Date().getFullYear()) {
                        if(dueDate < unpaidBill.dueDate) {
                            // console.log(bill)
                            unpaidBill = {
                                name: bill.name,
                                amount: bill.amount,
                                dueDate: dueDate,
                                paid: bill.paid[index]
                            };
                        }
                    };
                };
            });
        });

        state.totalBillsPaid = totalPaid;
        state.totalBillsUnpaid = totalUnpaid
        state.nextUnpaidBill = unpaidBill;
        },
        setMonth: (state, {payload}) => {
            console.log(payload)
            state.month = payload;
            state.monthText = monthNames[payload];
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
    getNextBill,
    setMonth
} = billSlice.actions

export default billSlice.reducer