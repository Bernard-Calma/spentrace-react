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
    monthlyBills: {
        totalPaid: 0,
        totalUnpaid: 0,
        paidList: [],
        unpaidList: [],
    },
    openBill: {},
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
        handleNextMonth: state => {
            // console.log(state.month)
            if (state.month < 11) {
                state.monthText = monthNames[state.month + 1];
                state.month += 1;
            } else {
                state.monthText = monthNames[0];
                state.month = 0;
            }
        },
        handlePreviousMonth: state => {
            // console.log(state.month)
            if (state.month > 0) {
                state.monthText = monthNames[state.month - 1];
                state.month -= 1;
            } else {
                state.monthText = monthNames[11];
                state.month = 11;
            }
        },
        setMonthlyBills: state => {
            let paid = 0;
            let unpaid = 0;
            const paidList = [];
            const unpaidList = [];
            let monthlyBillsList = [];
            // Get monthly bills
            state.billItems.forEach(bill => {
                // Iterate each due date
                bill.dueDate.forEach((dueDate, index) => {
                    // add a single bill with specific due date
                    // NOTE TO DO: CHANGE CURRENT YEAR FOR USER TO SELECT ANY YEAR AND SHOW BILLS ACCORDING TO YEAR
                    if(new Date(dueDate).getMonth() === state.month && new Date(dueDate).getFullYear() === new Date().getFullYear()) 
                    monthlyBillsList.push({...bill, dueDate: dueDate, paid: bill.paid[index], dueDateIndex: index});
                });
            });      
            monthlyBillsList = monthlyBillsList.sort((a, b) => (a.dueDate > b.dueDate) ? 1 : -1);
            // Get monthy paid list
            monthlyBillsList.forEach(element => {
                if (element.paid) {
                    paid += element.amount;
                    paidList.push(element);
                };
            });
            // Get monthly unpaid list
            monthlyBillsList.forEach(element => {
                if (!element.paid) {
                    unpaid += element.amount;
                    unpaidList.push(element);
                };
            });

            state.monthlyBills = {
                totalPaid: paid,
                totalUnpaid: unpaid,
                paidList: paidList,
                unpaidList: unpaidList,
            }
        },
        setOpenBill: (state, {payload}) => {
            state.openBill = {...payload, dueDate: new Date(payload.dueDate).toUTCString()}
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
    handleNextMonth,
    handlePreviousMonth,
    setMonthlyBills,
    setOpenBill
} = billSlice.actions

export default billSlice.reducer