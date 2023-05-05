import { configureStore } from '@reduxjs/toolkit';
import { groupedProductsReducer } from './pages/grouped-product/grouped-product-list-slice';
import { categoryReducer } from "./pages/category/category-list-slice";
import { productsReducer } from './pages/products/products-slice';
import { currenciesReducer } from './common/currency/currency-slice';
import { orderReducer } from './order/order-slice';

export const rootStore = configureStore({
  reducer: {
    currency: currenciesReducer,
    categoriesList: categoryReducer,
    productsList: productsReducer,
    groupedProducts: groupedProductsReducer,
    shoppingCart: orderReducer
  },
});
