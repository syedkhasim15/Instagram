import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./userDataSlice";

const store = configureStore({
    reducer: {
        userReducer : userDataSlice
    }
})

export default store