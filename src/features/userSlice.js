import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    username: "",
    loggedIn: false
}

export const getUser = createAsyncThunk("user/getUser", async (thunkAPI) => {
    console.log("Get User")
    try {
        const res = await axios(process.env.REACT_APP_SERVER_URL)
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue("Error Loging In")
    }
})

export const userLogin = createAsyncThunk("user/userLogin", async (user, thunkAPI) => {
    console.log("Login User", user)
    try {
        const res = await axios({
            method: 'POST',
            url: `${process.env.REACT_APP_SERVER_URL}/users/login`,
            data: user,
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
            axios(`${process.env.REACT_APP_SERVER_URL}/users/signout`)
            // .then(res => console.log(res))
            state.loggedIn = false;
            state.username = "";
        }
    },
    extraReducers: builder => {
        builder
            // Login 
            .addCase(userLogin.pending, state => {
                state.loggedIn = false;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loggedIn = true;
                console.log("Action", action)
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