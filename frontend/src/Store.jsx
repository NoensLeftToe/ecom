import { configureStore } from "@reduxjs/toolkit";
import productReducers from "./reducers/productReducer"; // Import the product reducer file
// import userReducer from "./reducers/UserReducer";

const store = configureStore({
  reducer: {
    productList: productReducers.productList, // For the list of products
    productDetails: productReducers.productDetails, // For product details
    // user:userReducer,
 
  },
});

export default store;
