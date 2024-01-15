import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const login = createAsyncThunk("login/login", async(payload) => {
    try {
        const res = await axios.post("https://api-car-rental.binaracademy.org/admin/auth/login", payload)
        localStorage.setItem("access_token", res.data.access_token)
        localStorage.setItem("email", res.data.email)
        return res.data
    } catch (error) {
        throw error.response.data
    }
})

const initialState = {
    success: "",
    loading: false,
    error: "",
    email: ""
}


export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.success = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default loginSlice.reducer