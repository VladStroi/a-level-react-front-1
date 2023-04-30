import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./pages/product/product-list-slice";
import { categoryReducer } from "./pages/category/category-list-slice";

export default configureStore({
    reducer: {
        productList: productReducer,
        categoryList: categoryReducer,
    }
})