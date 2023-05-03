import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stateValues } from '../../common/state-values';
import { api } from '../../services/api';

export const fetchProducts = createAsyncThunk(
  "productsList/getAll",
  async (params) => {
    const response = await api.getProducts(params);
    return response.data;
  },
);

export const productsSlice = createSlice({
  name: "productsList",
  initialState: {
    products: [],
    totalCount: 0,
    error: undefined,
    status: stateValues.idle,
  },
  reducers: {
    toIdleStatus: (state) => {
      state.status = stateValues.idle;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = stateValues.loading;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = stateValues.succeeded;
        state.products = action.payload.items;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = stateValues.failed;
        state.error = action.error.message;
      });
  },
});

export const { toIdleStatus } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
