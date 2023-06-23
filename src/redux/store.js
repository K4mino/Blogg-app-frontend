import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { postReducer } from "./slices/posts";

export const store = configureStore({
    reducer: {
        posts:postReducer,
        auth:authReducer
    }  
})