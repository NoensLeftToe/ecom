import { createSlice } from "@reduxjs/toolkit";
import { getProduct } from "../actions/productAction.js";

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
        state.loading = false;
        state.products = action.payload.products;
        state.productsCount = action.payload.productsCount;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearErrors } = productSlice.actions;

// Export reducer
export default productSlice.reducer;
