import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import planReducer from "./features/planSlice";
import billReducer from "./features/billSlice";
import viewReducer from "./features/viewSlice";
import accountReducer from "./features/accountSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        plan: planReducer,
        bill: billReducer,
        view: viewReducer,
        account: accountReducer
    }
});