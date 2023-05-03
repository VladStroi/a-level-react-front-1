import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stateValues } from '../../common/state-values';
import { api } from '../../services/api';

export const fetchCurrencies = createAsyncThunk(
  "currencies/getAll",
  async () => {
    const response = await api.getCurrencies();
    return response.data;
  },
);

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState: {
    currencies: [],
    currentCurrency: undefined,
    error: undefined,
    status: stateValues.idle,
  },
  reducers: {
    changeCurrency: (state, action) => {
      state.currentCurrency = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.status = stateValues.loading;
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.status = stateValues.succeeded;
        state.currencies = action.payload.items;
        state.currentCurrency = action.payload.items[0];
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.status = stateValues.failed;
        state.error = action.error.message;
      });
  },
});

export const { changeCurrency } = currenciesSlice.actions;
export const currenciesReducer = currenciesSlice.reducer;
