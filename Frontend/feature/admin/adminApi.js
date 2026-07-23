// It uses the existing `GET /api/auth/profile` endpoint which is protected by
// `protectRoute` (reads access token from httpOnly cookie). We must include
// credentials so the cookie is sent with the request.

const PROFILE_URL = "/api/auth/profile";

export async function getProfile() {
  const res = await fetch(PROFILE_URL, { credentials: "include" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to fetch profile: ${res.status} ${text}`);
  }
  return res.json();
}

export async function verifyAdmin() {
  const user = await getProfile();
  return {
    isAdmin: user?.role === "admin",
    user,
  };
}

const userService = {
  getProfile,
  verifyAdmin,
};
export default userService;
