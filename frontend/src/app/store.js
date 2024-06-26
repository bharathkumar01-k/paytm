import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./users/usersSlice";
import loggedInUserReducer from "./users/loggedInUserSlice"
import currentUserReducer from "./users/currentUserDetailsSlice";
import toUserReducer from "./users/toUserDetailsSlice";

export const store = configureStore({
    reducer: {
        users:userReducer,
        loggedInUser:loggedInUserReducer,
        currentUser:currentUserReducer,
        toUser:toUserReducer
    }
})