import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    username: "",
    loggedIn: false,
    errorMessage: "",
    loading: false,
}

export const getUser = createAsyncThunk("user/getUser", async (thunkAPI) => {
    // console.log("Get User")
    try {
        const res = await axios({
            method: "GET",
            withCredentials: true,
            url: process.env.REACT_APP_SERVER_URL
          })
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue("Error Loging In")
    }
})

export const userLogin = createAsyncThunk("user/userLogin", async (user, thunkAPI) => {
    // console.log("Login User", user)
    try {
        if (!thunkAPI.getState().user.loggedIn) {
            const res = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_SERVER_URL}/users/login`,
                data: user,
                withCredentials: true
            })
            return res.data.user;
        }
    } catch ({response}) {
        const {message} = response.data
        // console.log("error: ", message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const userRegister = createAsyncThunk("user/userRegister", async (newUser, thunkAPI) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_SERVER_URL}/users/register`,
            data: newUser,
            withCredentials: true
        })
        return res.data
    } catch (err) {
        // console.log("Registration Error: ", err);
        return thunkAPI.rejectWithValue(err.response.data.message)
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
        },
        clearError: state => {
            state.errorMessage = "";
        }
    },
    extraReducers: builder => {
        builder
            // Login 
            .addCase(userLogin.pending, state => {
                state.loggedIn = false;
                state.loading = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.loggedIn = true;
                // console.log("fulfilled Action", action)
                state.username = action.payload;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.loading = true;
                state.loggedIn = false;
                // console.log("Register Action", action)
            })
            .addCase(userLogin.rejected, (state, {payload}) => {
                state.loading = false;
                console.log("Error:", payload)
                state.errorMessage = "Invalid username or password."
                state.loggedIn = false;
            })
    }
})

export const {
    logout,
    clearError
} = userSlice.actions;

export default userSlice.reducer;