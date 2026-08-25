import { createSlice } from "@reduxjs/toolkit";
import { fetchAuthProfile, logoutAuth } from "@/feature/api/apiSlice";

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthState {
  user: UserProfile | null;
  isLoggedIn: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Synchronously clear auth state (e.g. after logout redirect)
    clearAuth(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ── fetchAuthProfile ──────────────────────────────────────────────────────
    builder
      .addCase(fetchAuthProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAuthProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchAuthProfile.rejected, (state) => {
        // Rejected = unauthenticated, not a hard error — stay silent
        state.user = null;
        state.isLoggedIn = false;
        state.status = "failed";
        state.error = null;
      });

    // ── logoutAuth ────────────────────────────────────────────────────────────
    builder.addCase(logoutAuth.fulfilled, (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.status = "idle";
      state.error = null;
    });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
