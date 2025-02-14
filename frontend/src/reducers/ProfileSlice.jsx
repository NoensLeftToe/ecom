import { createSlice } from "@reduxjs/toolkit";
import { updateProfile, updatePassword, updateUser, deleteUser } from "../actions/userAction"; // Import async actions

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isUpdated: false,
  isDeleted: false,
  message: null,
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
    },
    resetDelete: (state) => {
      state.isDeleted = false;
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
        state.isUpdated = action.payload;
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
        state.isUpdated = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update User Actions (Admin)
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete User Actions
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors, resetUpdate, resetDelete } = profileSlice.actions;
export default profileSlice.reducer;
