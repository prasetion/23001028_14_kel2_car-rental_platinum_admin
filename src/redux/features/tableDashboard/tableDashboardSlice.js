import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const tableDashboard = createAsyncThunk("tableDashboard/tableDashboard", async(payload) => {
    try {
        const res = await axios.get("https://api-car-rental.binaracademy.org/admin/v2/order?sort=created_at%3Adesc&page=1&pageSize=729", payload)
        return res.data
    } catch (error) {
        throw error.response
    }
})

const initialState = {
    success: "",
    loading: false,
    error: ""
}


export const tableDashboardSlice = createSlice({
    name: "tableDashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(tableDashboard.pending, (state) => {
            state.loading = true
        })
        builder.addCase(tableDashboard.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload
        })
        builder.addCase(tableDashboard.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
    }
})