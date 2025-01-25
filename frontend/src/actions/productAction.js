import { createAsyncThunk } from "@reduxjs/toolkit";
import {CLEAR_ERRORS,} from"../constants/productConstants";
import axios from "axios";

// Async action to fetch products
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async ({ keyword = "", currentPage = 1, price=[0,25000], category, ratings = 0 }, { rejectWithValue }) => {
    try {
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      
      if(category){
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
      }
      
      console.log("Keyword in getProduct action:", keyword);
      const { data } = await axios.get(link);
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
