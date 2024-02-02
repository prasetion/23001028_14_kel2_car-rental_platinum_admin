import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCarId = createAsyncThunk("getCarId", async ({idCar, cars}) => {
    try {
        const token = localStorage.getItem("access_token")

        const config = {
            headers: {
              access_token: `${token}`,
            },
          };
        
        const res = await axios.get(`https://api-car-rental.binaracademy.org/admin/car/${idCar}`, config, cars)
        // setCars(res.data)
        console.log(res.data)
    } catch (err) {
        console.log(err)
    }
})

const initialState = {
    carById: {},
    success: "",
    loading: false,
    error: null,
}

const getCarIdSlice = createSlice({
    name: "getCarId",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCarId.pending, (state) => {
            state.loading = true
        })
        .addCase(getCarId.fulfilled, (state, action) => {
            state.loading = false
            state.create = action.payload
        })
        .addCase(getCarId.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default getCarIdSlice.reducer