import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {CLEAR_ERRORS,} from"../constants/userConstants"
// Login
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `/api/v1/login`,
        { email, password },
        config
      );
      return data.user; // Payload returned to the reducer
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Register
export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post(`/api/v1/register`, userData, config);
      return data.user; // Payload returned to the reducer
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
