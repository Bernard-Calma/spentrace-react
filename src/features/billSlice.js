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
    billItems: [/** 
        * Paste one or more documents here
        */
        {
          "name": "Palengke",
          "amount": 100,
          "dueDate": ["2024-08-27T00:00:00.000Z"],
          "category": "PH Bills",
          "autoPay": false,
          "paid": [
            false
          ],
          "repeat": "never",
          "notes": "test",
          "user": "66c86b028f4ca56a799a0256",
          "createdAt": {
            "$date": "2024-08-25T09:35:05.776Z"
          },
          "updatedAt": {
            "$date": "2024-08-25T10:41:28.610Z"
          },
          "__v": 0
        }],
    totalBillsPaid: 0,
    totalBillsUnpaid: 0,
    nextUnpaidBill: {},
    month: new Date().getUTCMonth(),
    year: new Date().getFullYear(),
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
    // console.log("Get Bills")
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

export const addBill = createAsyncThunk("bill/addBill", async (payload, thunkAPI) => {
    // console.log("Add Bill")
    let newBill = {
        ...payload,
        userID: thunkAPI.getState().user.username
    }
    try 
    {
        let parseDueDate = Date.parse(payload.dueDate);
        let parseEndDate = Date.parse(payload.endRepeat);
        // console.log(parseDueDate);
        // console.log(parseEndDate);
        // If repeat until is lesser that due date, alert that repeat should be further than due date
        if(parseDueDate >= parseEndDate) {
            alert("End date should be further than due date");
            newBill = {...newBill, endRepeat: ""};
        } else {
            console.log(newBill)
            const res = await axios({
                method: "POST",
                url: `${process.env.REACT_APP_SERVER_URL}/bills/`,
                data: newBill,
                withCredentials: true
            })
            return res.data
            // console.log(res.data)
        };
    } catch (err) {
        console.log("Get Plans Error: ", err)
        return thunkAPI.rejectWithValue("Error getting bills")
    }
})

export const deleteBill = createAsyncThunk("bill/deteleBill", async (payload, thunkAPI) => {
    // console.log("Delete Bill")
    try {
        const res = await axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_SERVER_URL}/bills/${payload._id}`,
            withCredentials: true
        })
        return res.data;
    } catch (err) {
        console.log("Get Plans Error: ", err)
        return thunkAPI.rejectWithValue("Error getting bills")
    
    }
})

export const modifyBill = createAsyncThunk("bill/modifyBill", async (payload, thunkAPI) => {
    // console.log("Modify Bill")
    try 
    {
        const res = await axios({
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}/bills/${payload._id}`,
            data: payload,
            withCredentials: true
        })
        return res.data
    } catch (err) {
        console.log("Get Plans Error: ", err)
        return thunkAPI.rejectWithValue("Error getting bills")
    }
})

export const billPaidToggle = createAsyncThunk("bill/billPaidToggle", async (payload, thunkAPI) => {
    // console.log("Bill Paid toggle")
    try 
    {
        const res = await axios({
            method: "PATCH",
            url: `${process.env.REACT_APP_SERVER_URL}/bills/${payload._id}`,
            data: {
                paidIndex: payload.dueDateIndex
            },
            withCredentials: true
        })
        return res.data
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
                state.month++;
                
            } else {
                state.monthText = monthNames[0];
                state.month = 0;
                state.year++;
            }
        },
        handlePreviousMonth: state => {
            // console.log(state.month)
            if (state.month > 0) {
                state.monthText = monthNames[state.month - 1];
                state.month--;
            } else {
                state.monthText = monthNames[11];
                state.month = 11;
                state.year--;
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
                    if(new Date(dueDate).getMonth() === state.month && new Date(dueDate).getFullYear() === state.year) 
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
        },
    },
    extraReducers: builder => {
        builder
        // Get bills
        .addCase(getBills.pending, state => {
            // console.log("Pending")
            state.isLoading = true;
        })
        .addCase(getBills.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            // console.log("Fulfilled: ", action)
            state.billItems = payload;
        })
        .addCase(getBills.rejected, state => {
            // console.log("Rejected: ", state)
            state.isLoading = false;
        })
        // Add bill
        .addCase(addBill.pending, state => {
            // console.log("Pending")
            state.isLoading = true;
        })
        .addCase(addBill.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            // console.log("Fulfilled: ", action)
            state.billItems = [...state.billItems, payload].sort((a, b) => (a.date > b.date) ? 1 : -1);
        })
        .addCase(addBill.rejected, state => {
            // console.log("Rejected: ", state)
            state.isLoading = false;
        })
        // Delete bill
        .addCase(deleteBill.pending, state => {
            // console.log("Pending")
            state.isLoading = true;
        })
        .addCase(deleteBill.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            // console.log("Fulfilled: ", action)
            state.billItems = [...state.billItems, payload].filter(account => payload._id !== account._id).sort((a, b) => (a.date > b.date) ? 1 : -1);
        })
        .addCase(deleteBill.rejected, state => {
            // console.log("Rejected: ", state)
            state.isLoading = false;
        })
        // Modify bill
        .addCase(modifyBill.pending, state => {
            // console.log("Pending")
            state.isLoading = true;
        })
        .addCase(modifyBill.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            // console.log("Fulfilled: ", action)
            state.billItems = state.billItems.map(account => account._id === payload._id ? payload : account).sort((a, b) => (a.date > b.date) ? 1 : -1);
        })
        .addCase(modifyBill.rejected, state => {
            // console.log("Rejected: ", state)
            state.isLoading = false;
        })
        // Modify bill
        .addCase(billPaidToggle.pending, state => {
            // console.log("Pending")
            state.isLoading = true;
        })
        .addCase(billPaidToggle.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            // console.log("Fulfilled: ", action)
            state.billItems = state.billItems.map(account => account._id === payload._id ? payload : account).sort((a, b) => (a.date > b.date) ? 1 : -1);
        })
        .addCase(billPaidToggle.rejected, state => {
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