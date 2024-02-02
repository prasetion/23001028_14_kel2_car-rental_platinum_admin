import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCarList = createAsyncThunk(
  "carList/getCarList",
  async ({ name, category }) => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          access_token: `${token}`,
        },
      };
      const res = await axios.get(
        `https://api-car-rental.binaracademy.org/admin/v2/car?name=${name}&category=${category}&page=&pageSize=100`,
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
//   page: [],
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
    //   state.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCarList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCarList.fulfilled, (state, action) => {
      state.loading = false;
      state.cars = action.payload.cars;
    });
    builder.addCase(getCarList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message;
    });
  },
});

export const { setFilter } = carListSlice.actions;
export default carListSlice.reducer;
