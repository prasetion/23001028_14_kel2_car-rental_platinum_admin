import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/login/loginSlice"
import carListReducer from "./features/listcar/carListSlice"
import deleteCarSlice from "./features/deletecar/deleteCarSlice";
import listOrderChartSlice from "./features/listOrderChart/listOrderChartSlice"
import { tableDashboardSlice } from "./features/tableDashboard/tableDashboardSlice";
import createCarSlice from "./features/createCar/createCarSlice";
import editCarSlice from "./features/editCar/editCarSlice";
import getCarIdSlice from "./features/getCarId/getCarIdSlice";

export const store = configureStore({
    reducer: {
        login: loginSlice,
        carList: carListReducer,
        deleteCar: deleteCarSlice,
        listOrderChart: listOrderChartSlice,
        tableDashboard: tableDashboardSlice,
        createCar: createCarSlice,
        editCar: editCarSlice,
        getCarId: getCarIdSlice
    },
})