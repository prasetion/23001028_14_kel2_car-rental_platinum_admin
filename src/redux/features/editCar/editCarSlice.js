import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editCar = createAsyncThunk("editCar", async ({id, cars}) => {
    try {
        const token = localStorage.getItem("accessToken")

        const config = {
            headers: {
              access_token: `${token}`,
            },
          };

        const res = await axios.put(`https://api-car-rental.binaracademy.org/admin/car/${id}`, cars, config)
        console.log(res)
    } catch (err) {
        console.log(err)
    }
})

const initialState = {
    car: [],
    success: "",
    loading: false,
    error: null,
}

const editCarSlice = createSlice({
    name: "editCar",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(editCar.pending, (state) => {
            state.loading = true
        })
        .addCase(editCar.fulfilled, (state, action) => {
            state.loading = false
            state.delete = action.payload
        })
        .addCase(editCar.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default editCarSlice.reducer