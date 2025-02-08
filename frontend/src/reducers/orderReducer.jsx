import { createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getOrderDetails,
} from "../actions/orderAction";

// ✅ New Order Slice
const newOrderSlice = createSlice({
  name: "newOrder",
  initialState: { order: null, loading: false, error: null },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ My Orders Slice (Fix: Used `extraReducers`)
const myOrdersSlice = createSlice({
  name: "myOrders",
  initialState: { orders: [], loading: false, error: null },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(myOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(myOrders.fulfilled, (state, action) => {
        console.log("🟢 Orders received from API:", action.payload); // ✅ Debugging
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(myOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Get All Orders Slice (Admin)
const allOrdersSlice = createSlice({
  name: "allOrders",
  initialState: { orders: [], loading: false, error: null },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Update/Delete Order Slice (Admin)
const orderSlice = createSlice({
  name: "order",
  initialState: { loading: false, error: null, isUpdated: false, isDeleted: false },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    resetUpdate: (state) => {
      state.isUpdated = false;
    },
    resetDelete: (state) => {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Order Details Slice
const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: { order: {}, loading: false, error: null },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export Reducers
export const newOrderReducer = newOrderSlice.reducer;
export const myOrdersReducer = myOrdersSlice.reducer;
export const allOrdersReducer = allOrdersSlice.reducer;
export const orderReducer = orderSlice.reducer;
export const orderDetailsReducer = orderDetailsSlice.reducer;

// ✅ Export Actions
export const { clearErrors } = newOrderSlice.actions;
export const { clearErrors: clearMyOrdersErrors } = myOrdersSlice.actions;
export const { clearErrors: clearAllOrdersErrors } = allOrdersSlice.actions;
export const { clearErrors: clearOrderErrors, resetUpdate, resetDelete } = orderSlice.actions;
export const { clearErrors: clearOrderDetailsErrors } = orderDetailsSlice.actions;
