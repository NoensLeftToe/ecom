import { configureStore } from "@reduxjs/toolkit";
import { productListReducer, productDetailsReducer, newReviewReducer, createProductReducer , productReducer, productReviewsReducer, reviewReducer} from "./reducers/productReducer"; // Import the updated product reducers
import { userReducer, allUsersReducer, userDetailsReducer} from "./reducers/UserReducer"; 
import profileReducer from "./reducers/ProfileSlice";
import forgotPasswordReducer from "./reducers/forgotPasswordReducer";
import cartReducer from "./reducers/cartReducer";
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from "./reducers/orderReducer";

const store = configureStore({
  reducer: {
    productList: productListReducer, // ✅ Updated product list reducer
    productDetails: productDetailsReducer, // ✅ Updated product details reducer
    newReview: newReviewReducer, // ✅ Added new review reducer
    createProduct: createProductReducer,
    product : productReducer,
    productReviews: productReviewsReducer,
    review : reviewReducer,
    user: userReducer,
    userDetails : userDetailsReducer,

    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    allUsers : allUsersReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order:orderReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;