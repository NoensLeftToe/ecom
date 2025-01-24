import { createSlice } from "@reduxjs/toolkit";
import { getProduct } from "../actions/productAction";

const initialState = {
  products: [],
  loading: false,
  error: null,
  productsCount: 0,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearErrors(state) {
      state.error = null; // Clear the error from the state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.products = [];
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        console.log("Payload in fulfilled case: ", action.payload);
        state.loading = false;
        state.products = action.payload.products;
        state.productsCount = action.payload.productCount; // Use 'productCount' as per API response
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    clearErrors(state) {
      state.error = null; // Clear the error
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true; // Start loading when request is sent
        state.product = {}; // Clear previous product data
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false; // Stop loading when request is successful
        state.product = action.payload; // Assign the product data from payload
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false; // Stop loading if there was an error
        state.error = action.payload; // Assign the error message
      });
  },
});

// Export actions
export const { clearErrors } = productSlice.actions;

// Export reducer
export default productSlice.reducer;
