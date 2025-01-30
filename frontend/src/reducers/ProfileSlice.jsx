import { createSlice } from "@reduxjs/toolkit";
import { updateProfile, updatePassword } from "../actions/userAction"; // Import actions

const initialState = {
  loading: false,
  isUpdated: false,  // For profile update
  isPasswordUpdated: false,  // For password update
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    resetUpdate: (state) => {
      state.isUpdated = false;
      state.isPasswordUpdated = false;  // Reset password update state
    },
  },
  extraReducers: (builder) => {
    builder
      // Update Profile Actions
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;  // Set profile update status
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Password Actions
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isPasswordUpdated = action.payload;  // Set password update status
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});



export const { clearErrors, resetUpdate } = profileSlice.actions;
export default profileSlice.reducer;
