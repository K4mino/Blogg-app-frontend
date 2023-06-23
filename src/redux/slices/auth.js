import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async(params) => {
    const { data } = await axios.post('/auth/login', params)
    return data
})

export const fetchMe = createAsyncThunk('auth/fetchMe', async() => {
    const { data } = await axios.get('/auth/me')
    return data
})

export const fetchRegisterData = createAsyncThunk('auth/fetchRegisterData', async(params) => {
    const { data } = await axios.post('/auth/register', params)

    return data
})


const initialState = {
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout: (state) => {
            state.data= null
            localStorage.removeItem('token')
        }
    },
    extraReducers:{
        [fetchUserData.pending]:(state,) => {
            state.data = null
            state.status = 'loading'
        },
        [fetchUserData.fulfilled]:(state, action) => {
            state.data = action.payload
            state.status = 'fulfilled'
        },
        [fetchUserData.rejected]:(state,) => {
            state.data = null
            state.status = 'error'
        },
        [fetchMe.pending]:(state,) => {
            state.data = null
            state.status = 'loading'
        },
        [fetchMe.fulfilled]:(state, action) => {
            state.data = action.payload
            state.status = 'fulfilled'
        },
        [fetchMe.rejected]:(state,) => {
            state.data = null
            state.status = 'error'
        },
        [fetchRegisterData.pending]:(state,) => {
            state.data = null
            state.status = 'loading'
        },
        [fetchRegisterData.fulfilled]:(state, action) => {
            state.data = action.payload._doc
            state.status = 'fulfilled'
        },
        [fetchRegisterData.rejected]:(state,) => {
            state.data = null
            state.status = 'error'
        }
    }
})

export const selectIsAuth = ((state) => Boolean(state.auth.data))

export const {logout} = authSlice.actions;

export const authReducer = authSlice.reducer