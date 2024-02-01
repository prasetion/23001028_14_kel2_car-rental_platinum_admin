import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/login/loginSlice"
import carListReducer from "./features/listcar/carListSlice"
import deleteCarSlice from "./features/deletecar/deleteCarSlice";
import listOrderChartSlice from "./features/listOrderChart/listOrderChartSlice"
import { tableDashboardSlice } from "./features/tableDashboard/tableDashboardSlice";

export const store = configureStore({
    reducer: {
        login: loginSlice,
        carList: carListReducer,
        deleteCar: deleteCarSlice,
        listOrderChart: listOrderChartSlice,
        tableDashboard: tableDashboardSlice,
    },
})