import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editCar = createAsyncThunk("editCar", async ({id, cars}) => {
    try {
        const token = localStorage.getItem("access_token")

        const config = {
            headers: {
              access_token: `${token}`,
            },
          };

        const res = await axios.put(`https://api-car-rental.binaracademy.org/admin/car/${id}`, cars, config)
        console.log(res)
        return res.data
    } catch (err) {
        console.log(err)
    }
})

const initialState = {
    carById: [],
    success: "",
    loading: false,
    error: null,
}

const editCarSlice = createSlice({
    name: "editCar",
    initialState,
    reducers: {
        setCars: (state, action) => {
            state.name = action.payload.name
            state.category = action.payload.category
            state.price = action.payload.price
            state.status = action.payload.status
            state.image = action.payload.image
        }

    },
    extraReducers: (builder) => {
        builder
        .addCase(editCar.pending, (state) => {
            state.loading = true
        })
        .addCase(editCar.fulfilled, (state, action) => {
            state.loading = false
            state.editCar = action.payload
            state.carById = action.payload
        })
        .addCase(editCar.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})


export const { setCars } = editCarSlice.actions
export default editCarSlice.reducer