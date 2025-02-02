import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Add to Cart
export const addItemsToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ id, quantity }, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`);

      const item = {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      };

      localStorage.setItem(
        "cartItems",
        JSON.stringify([...getState().cart.cartItems, item])
      );

      return item;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add item");
    }
  }
);

// Remove from Cart
export const removeItemsFromCart = createAsyncThunk(
  "cart/removeCartItem",
  async (id, { getState }) => {
    const updatedCart = getState().cart.cartItems.filter((item) => item.product !== id);

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    return id;
  }
);

// Save Shipping Info
export const saveShippingInfo = createAsyncThunk(
  "cart/saveShippingInfo",
  async (data) => {
    localStorage.setItem("shippingInfo", JSON.stringify(data));
    return data;
  }
);
