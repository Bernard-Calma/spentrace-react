import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    billsItem: [],
    totalBillsPaid: 0,
    totalBillsUnpaid: 0,
    nextUnpaidBill: {},
    isLoading: false
}

const billSlice = createSlice({
    name: "bill",
    initialState,
    reducers: {

    }
})

export default billSlice.reducer