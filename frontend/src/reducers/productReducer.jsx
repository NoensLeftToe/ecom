import { createSlice } from "@reduxjs/toolkit";
import { getProduct, getProductDetails, createProduct, newReview, getAdminProduct, deleteProduct, updateProduct, getAllReviews, deleteReviews } from "../actions/productAction";

// ✅ Initial states
const initialStateProducts = {
  products: [],
  loading: false,
  error: null,
  productsCount: 0,
  resultPerPage: 0,
  filteredProductsCount: 0,
};

const initialStateProductDetails = {
  product: {},
  loading: false,
  error: null,
};

const initialStateNewReview = {
  loading: false,
  success: false,
  error: null,
};

const initialStateCreateProduct = {
  loading: false,
  success: false,
  error: null,
  product: {},
};

const initialStateProduct = {
  loading: false,
  isDeleted: false,
  isUpdated: false,
  error: null,
};

// ✅ Initial State for Reviews
const initialStateProductReviews = {
  reviews: [],
  loading: false,
  error: null,
};


const initialStateReview = {
  loading: false,
  isDeleted: false,
  error: null,
};

// ✅ Product List Slice
const productListSlice = createSlice({
  name: "productList",
  initialState: initialStateProducts,
  reducers: {
    clearErrors: (state) => {
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
      })

      .addCase(getAdminProduct.pending, (state) => {
        state.loading = true;
        state.products = [];
      })
      .addCase(getAdminProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAdminProduct.rejected, (state, action) => {
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
    clearErrors: (state) => {
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

// ✅ Create Product Slice
const createProductSlice = createSlice({
  name: "createProduct",
  initialState: initialStateCreateProduct,
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
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.product = action.payload.product;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ New Review Slice (Fixed)
const newReviewSlice = createSlice({
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

const productSlice = createSlice({
  name: "product",
  initialState: initialStateProduct,
  reducers: {
    resetDeleteProduct: (state) => {
      state.isDeleted = false;
    },
    resetUpdateProduct: (state) => {
      state.isUpdated = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Delete product cases
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ✅ Update product cases
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const productReviewsSlice = createSlice({
  name: "productReviews",
  initialState: initialStateProductReviews,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});




const reviewSlice = createSlice({
  name: "review",
  initialState: initialStateReview,
  reducers: {
    deleteReviewReset: (state) => {
      state.isDeleted = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
      })
      .addCase(deleteReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


// ✅ Export actions
export const { clearErrors } = productListSlice.actions;
export const { clearErrors: clearProductDetailsErrors } = productDetailsSlice.actions;
export const { reset, clearErrors: clearNewReviewErrors } = newReviewSlice.actions;
export const { reset: resetCreateProduct, clearErrors: clearCreateProductErrors } = createProductSlice.actions;
export const { resetDeleteProduct, resetUpdateProduct,clearErrors: clearProductErrors } = productSlice.actions;
export const { deleteReviewReset, clearErrors: clearReviewErrors } = reviewSlice.actions;

// ✅ Export reducers separately for `configureStore`
export const productListReducer = productListSlice.reducer;
export const productDetailsReducer = productDetailsSlice.reducer;
export const newReviewReducer = newReviewSlice.reducer; // ✅ Fixed export
export const createProductReducer = createProductSlice.reducer;
export const productReducer = productSlice.reducer;
export const productReviewsReducer = productReviewsSlice.reducer;
export const reviewReducer = reviewSlice.reducer;
