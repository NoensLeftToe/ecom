import { createAsyncThunk } from "@reduxjs/toolkit";
import { CLEAR_ERRORS } from "../constants/productConstants";
import axios from "axios";

// AbortController to handle overlapping API requests
let controller;

// Helper function to dynamically build URLs with query parameters
const buildURL = (baseURL, params) => {
  const searchParams = new URLSearchParams(params);
  return `${baseURL}?${searchParams.toString()}`;
};

// Async action to fetch products
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (
    { keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0 },
    { rejectWithValue }
  ) => {
    try {
      // Abort previous request if it exists
      if (controller) controller.abort();
      controller = new AbortController();

      const baseURL = "/api/v1/products";
      const params = {
        keyword,
        page: currentPage,
        "price[gte]": price[0],
        "price[lte]": price[1],
        "ratings[gte]": ratings,
      };

      if (category) params.category = category;

      const link = buildURL(baseURL, params);

      console.log("Request URL:", link);

      const { data } = await axios.get(link, { signal: controller.signal });
      console.log("API Response:", data);

      return data; // Automatically becomes the payload for fulfilled state
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message); // Handles errors in rejected state
    }
  }
);

// Async action to fetch product details
export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      // Abort previous request if it exists
      if (controller) controller.abort();
      controller = new AbortController();

      const { data } = await axios.get(`/api/v1/product/${id}`, {
        signal: controller.signal,
      });

      console.log("API Response:", data);

      return data.product; // Automatically becomes the payload for fulfilled state
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message); // Handles errors in rejected state
    }
  }
);



export const createProduct = createAsyncThunk(
  "createProduct/create",
  async (productData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config);
      
      return data; // { success: true, product: {...} }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create product");
    }
  }
);



// Async thunk for new review submission
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


export const getAdminProduct = createAsyncThunk(
  "products/getAdminProduct",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/products");
      return data.products; // Assuming API response contains { products: [...] }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch admin products");
    }
  }
);

// ✅ Update Product (Redux Toolkit Version)
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const { data } = await axios.put(
        `/api/v1/admin/product/${id}`,
        productData,
        config
      );

      return data.success; // This becomes the payload in fulfilled state
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// ✅ Delete Product (Redux Toolkit Version)
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

      return data.success; // This becomes the payload in fulfilled state
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
