// userActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log("🔹 Sending login request:", { email, password }); // Debug
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post("/api/v1/login", { email, password }, config);
      console.log("✅ Login successful! Response:", data);
      return data.user;
    } catch (error) {
      console.error("❌ Login failed! Error:", error.response?.data?.message);
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);


// Clear errors action
export const clearErrors = () => ({
  type: 'user/clearErrors',
});
