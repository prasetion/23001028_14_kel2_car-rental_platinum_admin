import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteCar = createAsyncThunk("deleteCar", async ({id}) => {
    try {

        const token = localStorage.getItem("access_token");

        const config = {
            headers: {
              access_token: `${token}`,
            },
          };


        const res = await axios.delete(`https://api-car-rental.binaracademy.org/admin/car/${id}`, config) 
        window.location.reload()
        // console.log(res)
    } catch (err) {
        console.log(err)
    }
})

const initialState = {
    id: "",
    loading: false,
    error: null
}

const deleteCarSlice = createSlice({
    name: "deleteCar",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(deleteCar.pending, (state) => {
            state.loading = true
        })
        .addCase(deleteCar.fulfilled, (state, action) => {
            state.loading = false
            state.delete = action.payload
        })
        .addCase(deleteCar.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default deleteCarSlice.reducer