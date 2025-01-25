import { createAsyncThunk } from "@reduxjs/toolkit";
import {CLEAR_ERRORS,} from"../constants/productConstants";
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

// Async action to fetch product details
export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`);
      console.log("API Response: ", data);
      return data.product; // Automatically becomes the payload for fulfilled state
    } catch (error) {
      return rejectWithValue(error.response.data.message); // Handles errors in rejected state
    }
  }
);
// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
