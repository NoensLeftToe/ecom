import { configureStore } from "@reduxjs/toolkit";
import productReducers from "./reducers/productReducer"; // Import the product reducer file
import userReducer from "./reducers/UserReducer";
import profileReducer from "./reducers/ProfileSlice"
import forgotPasswordReducer from "./reducers/forgotPasswordReducer"
const store = configureStore({
  reducer: {
    productList: productReducers.productList, // For the list of products
    productDetails: productReducers.productDetails, // For product details
    user:userReducer,
    profile: profileReducer, 
    forgotPassword: forgotPasswordReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;