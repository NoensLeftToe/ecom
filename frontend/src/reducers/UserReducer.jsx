import { createSlice } from "@reduxjs/toolkit";
import { login, register, loadUser, logout , forgotPassword, getAllUsers, getUserDetails} from "../actions/userAction";

// ✅ Initial states
const initialStateUser = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const initialStateForgotPassword = {
  loading: false,
  message: null,
  success: null,
  error: null,
};

const initialStateAllUsers = {
  users: [],
  loading: false,
  error: null,
};

const initialStateUserDetails = {
  user: {},
  loading: false,
  error: null,
};

// ✅ User Slice
const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Forgot Password Slice
const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: initialStateForgotPassword,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ All Users Slice
const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: initialStateAllUsers,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ User Details Slice
const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: initialStateUserDetails,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export actions
export const { clearErrors } = userSlice.actions;
export const { clearErrors: clearForgotPasswordErrors } = forgotPasswordSlice.actions;
export const { clearErrors: clearAllUsersErrors } = allUsersSlice.actions;
export const { clearErrors: clearUserDetailsErrors } = userDetailsSlice.actions;

// ✅ Export reducers separately for `configureStore`
export const userReducer = userSlice.reducer;
export const forgotPasswordReducer = forgotPasswordSlice.reducer;
export const allUsersReducer = allUsersSlice.reducer;
export const userDetailsReducer = userDetailsSlice.reducer;
