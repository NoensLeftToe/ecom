import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer"; // Importing the productReducer

const store = configureStore({
  reducer: {
    products: productReducer, // This manages the state for products
   
  },
});

export default store;
