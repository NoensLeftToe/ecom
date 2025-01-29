// userReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { login } from '../actions/userAction'; // Import the login action

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Custom reducer for clearing errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // When login request is pending
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      // When login is successful
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      // When login fails
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { clearErrors } = userSlice.actions;

export default userSlice.reducer;
