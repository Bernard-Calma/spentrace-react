import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    username: "",
    loggedIn: false
}

export const userLogin = createAsyncThunk("user/userLogin", async (loginUser, thunkAPI) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${process.env.REACT_APP_SERVER_URL}/users/login`,
            data: loginUser,
            withCredentials: true
        })
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue("Error Loging In")
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: state => {
            console.log("Logout!")
            state.loggedIn = false;
            state.username = "";
        }
    },
    extraReducers: builder => {
        builder
            .addCase(userLogin.pending, state => {
                state.loggedIn = false;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loggedIn = true;
                console.log(action.payload)
                state.username = action.payload;
            })
            .addMatcher(userLogin.rejected, state => {
                state.loggedIn = false;
            })
    }
})

export const {
    logout,
} = userSlice.actions;

export default userSlice.reducer;