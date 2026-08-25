import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBrowserClient } from "@supabase/ssr";


export const fetchAuthProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      );

      const {
        data: { user: supabaseUser },
      } = await supabase.auth.getUser();

      if (supabaseUser) {
        return {
          _id: supabaseUser.id,
          name:
            supabaseUser.user_metadata?.full_name ||
            supabaseUser.email?.split("@")[0] ||
            "User",
          email: supabaseUser.email || "",
          role: "user",
        };
      }
    } catch {

    }

    try {
      const profileRes = await fetch("/api/auth/profile", {
        credentials: "include",
      });

      if (profileRes.ok) {
        return await profileRes.json();
      }
      if (profileRes.status === 401) {
        const refreshRes = await fetch("/api/auth/refresh-token", {
          method: "POST",
          credentials: "include",
        });

        if (refreshRes.ok) {
          const retryRes = await fetch("/api/auth/profile", {
            credentials: "include",
          });

          if (retryRes.ok) {
            return await retryRes.json();
          }
        }
      }

      // Not authenticated via either method
      return rejectWithValue("Unauthenticated");
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch auth profile",
      );
    }
  },
);

// Logout 
export const logoutAuth = createAsyncThunk("auth/logout", async () => {
  return null;
});
