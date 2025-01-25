import { createSlice } from "@reduxjs/toolkit";
import { getProduct, getProductDetails } from "../actions/productAction";

const initialStateProducts = {
  products: [], // List of products
  loading: false,
  error: null,
  productsCount: 0, // Total number of products
};

const initialStateProductDetails = {
  product: {}, // Single product details
  loading: false,
  error: null,
};

// Product List Slice (for `getProduct`)
const productListSlice = createSlice({
  name: "productList",
  initialState: initialStateProducts,
  reducers: {
    clearErrors(state) {
      state.error = null; // Clear the error from the state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.products = []; // Reset the products list
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products; // List of products
        state.productsCount = action.payload.productCount; // Total products count
        state.resultPerPage = action.payload.resultPerPage;
        state.filteredProductsCount = action.payload.filteredProductsCount;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle the error
      });
  },
});

// Product Details Slice (for `getProductDetails`)
const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: initialStateProductDetails,
  reducers: {
    clearErrors(state) {
      state.error = null; // Clear the error from the state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.product = {}; // Reset the single product details
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload; // Single product details
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle the error
      });
  },
});

// Export actions
export const { clearErrors } = productListSlice.actions;
export const { clearErrors: clearProductDetailsErrors } = productDetailsSlice.actions;

// Export reducers
export default {
  productList: productListSlice.reducer,
  productDetails: productDetailsSlice.reducer,
};
