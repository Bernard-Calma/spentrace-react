import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import planReducer from "./features/planSlice";
import billReducer from "./features/billSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        plan: planReducer,
        bill: billReducer
    }
});