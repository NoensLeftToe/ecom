import { createSlice } from "@reduxjs/toolkit";
import { CLEAR_ERRORS } from "../constants/orderConstants";

const newOrderSlice = createSlice({
  name: "newOrder",
  initialState: {},
  reducers: {
    createOrderRequest: (state) => {
      state.loading = true;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    createOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

const myOrdersSlice = createSlice({
  name: "myOrders",
  initialState: { orders: [] },
  reducers: {
    myOrdersRequest: (state) => {
      state.loading = true;
    },
    myOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    myOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

const allOrdersSlice = createSlice({
  name: "allOrders",
  initialState: { orders: [] },
  reducers: {
    allOrdersRequest: (state) => {
      state.loading = true;
    },
    allOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    allOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

const orderSlice = createSlice({
  name: "order",
  initialState: {},
  reducers: {
    updateOrderRequest: (state) => {
      state.loading = true;
    },
    deleteOrderRequest: (state) => {
      state.loading = true;
    },
    updateOrderSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    deleteOrderSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    updateOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderReset: (state) => {
      state.isUpdated = false;
    },
    deleteOrderReset: (state) => {
      state.isDeleted = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: { order: {} },
  reducers: {
    orderDetailsRequest: (state) => {
      state.loading = true;
    },
    orderDetailsSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    orderDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  clearErrors,
} = newOrderSlice.actions;
export const { myOrdersRequest, myOrdersSuccess, myOrdersFail } = myOrdersSlice.actions;
export const { allOrdersRequest, allOrdersSuccess, allOrdersFail } = allOrdersSlice.actions;
export const {
  updateOrderRequest,
  deleteOrderRequest,
  updateOrderSuccess,
  deleteOrderSuccess,
  updateOrderFail,
  deleteOrderFail,
  updateOrderReset,
  deleteOrderReset,
} = orderSlice.actions;
export const { orderDetailsRequest, orderDetailsSuccess, orderDetailsFail } = orderDetailsSlice.actions;

export const newOrderReducer = newOrderSlice.reducer;
export const myOrdersReducer = myOrdersSlice.reducer;
export const allOrdersReducer = allOrdersSlice.reducer;
export const orderReducer = orderSlice.reducer;
export const orderDetailsReducer = orderDetailsSlice.reducer;

