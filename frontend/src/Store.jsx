import { configureStore } from "@reduxjs/toolkit";
import productReducers from "./reducers/productReducer"; // Import the product reducer file

const store = configureStore({
  reducer: {
    productList: productReducers.productList, // For the list of products
    productDetails: productReducers.productDetails, // For product details
  },
});

export default store;
