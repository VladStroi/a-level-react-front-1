import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stateValues } from '../../common/state-values';
import { api } from '../../services/api';

export const fetchProducts = createAsyncThunk(
  "groupedProductList/getAll",
  async () => {
    const response = await Promise.all([
      api.getProducts(),
      api.getCategories(),
    ]);
    const [products, categories] = response;
    if (products.data.items.length && categories.data.items.length) {
      return products.data.items
        .map((product) => {
          const id = product.category;
          const category = categories.data.items.find((elC) => elC.id === id);
          return { ...product, category };
        })
        .reduce((acc, el) => {
          let categoryIndex = acc.findIndex(
            (accEl) => el.category.id === accEl.categoryId
          );
          let category;
          if (categoryIndex < 0) {
            category = {
              categoryName: el.category.name,
              categoryId: el.category.id,
              products: [],
            };
            acc.push(category);
          } else {
            category = acc[categoryIndex];
          }
          category.products.push(el);
          return acc;
        }, []);
    }
    return response.data;
  }
);

export const groupedProductsSlice = createSlice({
  name: "grouppedProduct",
  initialState: {
    value: 100,
    products: [],
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
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = stateValues.loading;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = stateValues.succeeded;
        state.products = [...action.payload];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = stateValues.failed;
        state.error = action.error.message;
      });
  },
});
export const { toIdleStatus } = groupedProductsSlice.actions;
export const groupedProductsReducer = groupedProductsSlice.reducer;
