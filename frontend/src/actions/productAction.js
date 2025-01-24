import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to fetch products
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/products");
      console.log("API Response: ", data);
      return data; // Automatically becomes the payload for fulfilled state
    } catch (error) {
      return rejectWithValue(error.response.data.message); // Handles errors in rejected state
    }
  }
);

export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/products/${productId}`);
      return response.data; // Assuming your response includes the product details
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
