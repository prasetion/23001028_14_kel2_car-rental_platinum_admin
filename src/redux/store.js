import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/login/loginSlice"
import listOrderChartSlice from "./features/listOrderChart/listOrderChartSlice"
import { tableDashboardSlice } from "./features/tableDashboard/tableDashboardSlice";

export const store = configureStore({
    reducer: {
        login: loginSlice,
        listOrderChart: listOrderChartSlice,
        tableDashboard: tableDashboardSlice,
    },
})