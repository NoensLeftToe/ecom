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

// Register action using createAsyncThunk
export const register = createAsyncThunk(
  'user/register', // Action name
  async (userData, { rejectWithValue }) => {
    try {
      console.log("🔹 Sending register request:", userData); // Debug

      const config = { headers: { "Content-Type": "multipart/form-data" } };
      // Send the form data to the backend API
      const { data } = await axios.post("/api/v1/register", userData, config);

      console.log("✅ Register successful! Response:", data);
      return data.user; // Return the user data upon success
    } catch (error) {
      console.error("❌ Register failed! Error:", error.response?.data?.message);
      // Use rejectWithValue to pass the error message to the reducer
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

//load user

export const loadUser = createAsyncThunk(
  'user/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/v1/me');
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);


// Clear errors action
export const clearErrors = () => ({
  type: 'user/clearErrors',
});
