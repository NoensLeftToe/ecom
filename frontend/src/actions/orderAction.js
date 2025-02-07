import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CLEAR_ERRORS } from "../constants/orderConstants";

// Create Order
export const createOrder = createAsyncThunk("order/create", async (order, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/order/new", order, config);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// My Orders
export const myOrders = createAsyncThunk("order/myOrders", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("/api/v1/orders/me");
    return data.orders;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Get All Orders (admin)
export const getAllOrders = createAsyncThunk("order/getAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("/api/v1/admin/orders");
    return data.orders;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Update Order
export const updateOrder = createAsyncThunk("order/update", async ({ id, order }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/v1/admin/order/${id}`, order, config);
    return data.success;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Delete Order
export const deleteOrder = createAsyncThunk("order/delete", async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
    return data.success;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Get Order Details
export const getOrderDetails = createAsyncThunk("order/details", async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/v1/order/${id}`);
    return data.order;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Clearing Errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });
