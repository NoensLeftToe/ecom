import { configureStore } from "@reduxjs/toolkit";
import { productListReducer, productDetailsReducer, newReviewReducerFunction } from "./reducers/productReducer"; // Import the updated product reducers
import userReducer from "./reducers/UserReducer";
import profileReducer from "./reducers/ProfileSlice";
import forgotPasswordReducer from "./reducers/forgotPasswordReducer";
import cartReducer from "./reducers/cartReducer";
import { newOrderReducer, myOrdersReducer, orderDetailsReducer } from "./reducers/orderReducer";

const store = configureStore({
  reducer: {
    productList: productListReducer, // ✅ Updated product list reducer
    productDetails: productDetailsReducer, // ✅ Updated product details reducer
    newReview: newReviewReducerFunction, // ✅ Added new review reducer

    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
