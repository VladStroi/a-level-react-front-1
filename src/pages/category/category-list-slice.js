import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stateValues } from '../../common/state-values';
import { api } from '../../services/api';

export const fetchCategory = createAsyncThunk(
  "categoryList/getAll",
  async () => {
    const response = await api.getCategories();
    return response.data;
  },
);

export const categorySlice = createSlice({
  name: "categoryList",
  initialState: {
    categories: [],
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
      .addCase(fetchCategory.pending, (state, action) => {
        state.status = stateValues.loading;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = stateValues.succeeded;
        state.categories = action.payload.items;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = stateValues.failed;
        state.error = action.error.message;
      });
  },
});

export const { toIdleStatus } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
