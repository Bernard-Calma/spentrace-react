import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    accList: {
        checking: [],
        savings: [],
        creditCard: [],
        loan: []
    },
    isLoading: false
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {

    }
});

export default accountSlice.reducer;