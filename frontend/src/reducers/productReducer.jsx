import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getProduct, getProductDetails } from "../actions/productAction";

// Initial state for product list
const initialStateProducts = {
  products: [],
  loading: false,
  error: null,
  productsCount: 0,
  resultPerPage: 0,
  filteredProductsCount: 0,
};

// Initial state for product details
const initialStateProductDetails = {
  product: {},
  loading: false,
  error: null,
};

// Initial state for new review
const initialStateNewReview = {
  loading: false,
  success: false,
  error: null,
};

// ✅ New Review Async Action
export const newReview = createAsyncThunk(
  "newReview/submit",
  async (reviewData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.put(`/api/v1/review`, reviewData, config);
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Review submission failed");
    }
  }
);

// ✅ Product List Slice
const productListSlice = createSlice({
  name: "productList",
  initialState: initialStateProducts,
  reducers: {
    clearErrors(state) {
      state.error = null;
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
        state.productsCount = action.payload.productCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.filteredProductsCount = action.payload.filteredProductsCount;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Product Details Slice
const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: initialStateProductDetails,
  reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.product = {};
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ New Review Reducer
const newReviewReducer = createSlice({
  name: "newReview",
  initialState: initialStateNewReview,
  reducers: {
    reset: (state) => {
      state.success = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(newReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(newReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export actions
export const { clearErrors } = productListSlice.actions;
export const { clearErrors: clearProductDetailsErrors } = productDetailsSlice.actions;
export const { reset, clearErrors: clearNewReviewErrors } = newReviewReducer.actions;

// ✅ Export reducers separately for `configureStore`
export const productListReducer = productListSlice.reducer;
export const productDetailsReducer = productDetailsSlice.reducer;
export const newReviewReducerFunction = newReviewReducer.reducer;
