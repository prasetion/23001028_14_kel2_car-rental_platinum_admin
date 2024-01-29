import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const listOrderChart = createAsyncThunk("listOrderChart/listOrderChart", async({ payload, param }) => {
    try {
        const res = await axios.get(`https://api-car-rental.binaracademy.org/admin/order/reports?${param}`, payload);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
});

const initialState = {
    success: "",
    loading: false,
    error: ""
}

export const listOrderChartSlice = createSlice({
    name: "listOrderChart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listOrderChart.pending, (state) => {
            state.loading = true
        })
        builder.addCase(listOrderChart.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload
        })
        builder.addCase(listOrderChart.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
    }
})

export default listOrderChartSlice.reducer