import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stateValues } from "../common/state-values";
import axios from "axios";
import { KeyboardReturnRounded } from "@mui/icons-material";

export const fetchCategory = createAsyncThunk(
  "productList/getALL",
  async () => {
    const response = await axios.get("http://localhost:3010/product");
    console.log(response.data);
    return response.data
  }
);



export const counterSlice = createSlice({
  name: "categoryList",
  initialState: {
    categories: [],
    error: null,
    status: stateValues.idle,
  },
  reducers: {
    toIdleStatus: (state) => {
      state.status = stateValues.idle;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategory.pending, (state, action) => {
        state.status = stateValues.loading;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = stateValues.succeeded;
        state.categories = [...action.payload];
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = stateValues.failed;
        state.error = action.error.message;
      });
  },
});
export const { toIdleStatus } = counterSlice.actions;
export default counterSlice.reducer;
