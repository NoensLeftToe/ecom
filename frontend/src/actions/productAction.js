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

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
