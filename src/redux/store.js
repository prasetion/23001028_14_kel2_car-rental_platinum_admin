import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/login/loginSlice"
import carListReducer from "./features/listcar/carListSlice"
import deleteCarSlice from "./features/deletecar/deleteCarSlice";

export const store = configureStore({
    reducer: {
        login: loginSlice,
        carList: carListReducer,
        deleteCar: deleteCarSlice
    },
})