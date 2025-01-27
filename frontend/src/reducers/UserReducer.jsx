import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../actions/userAction";

// Initial State
const initialUserState = {
  user: {}, // Current user data
  loading: false,
  isAuthenticated: false,
  error: null,
};

// User Slice (Login and Register)
const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    clearErrors(state) {
      state.error = null; // Clear the error from the state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearErrors } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
