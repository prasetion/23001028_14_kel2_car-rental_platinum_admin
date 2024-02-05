import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCarList = createAsyncThunk(
    "carList/getCarList",
    async({ name, category, page }) => {
        try {
            const token = localStorage.getItem("access_token");
            const config = {
                headers: {
                    access_token: `${token}`,
                },
            };
            const res = await axios.get(
                `https://api-car-rental.binaracademy.org/admin/v2/car?name=${name}&category=${category}&page=${page}&pageSize=10`,
                config
            );
            console.log(res.data);
            return res.data
        } catch (error) {
            console.log(error);
            return error.response.data;
        }
    }
);

const initialState = {
    cars: [],
    page: "",
    count: [],
    name: "",
    category: "",
    loading: false,
    error: "",
};

const carListSlice = createSlice({
    name: "carList",
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.name = action.payload.name;
            state.category = action.payload.category;
            state.page = action.payload.page
            state.count = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCarList.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getCarList.fulfilled, (state, action) => {
            state.loading = false;
            state.cars = action.payload.cars;
            state.page = action.payload.page
            state.count = action.payload
        });
        builder.addCase(getCarList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const { setFilter } = carListSlice.actions;
export default carListSlice.reducer;