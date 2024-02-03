import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createCar = createAsyncThunk("createCar", async ({ form }) => {
    try {
        const token = localStorage.getItem("access_token")

        const config = {
            headers: {
              access_token: `${token}`,
            },
          };

          const res = await axios.post("https://api-car-rental.binaracademy.org/admin/car", form, config)
          console.log(res)
          return res
    } catch (err) {
        console.log(err)
    }

})

const initialState = {
    id: "",
    status: [],
    loading: false,
    error: null,
}

const createCarSlice = createSlice({
    name: "createCar",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createCar.pending, (state) => {
            state.loading = true
        })
        .addCase(createCar.fulfilled, (state, action) => {
            state.loading = false
            state.createCar = action.payload.data
            state.status = action.payload
        })
        .addCase(createCar.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default createCarSlice.reducer