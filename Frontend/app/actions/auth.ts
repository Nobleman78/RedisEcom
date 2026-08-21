"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



export async function loginAction(formData: FormData){
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    redirect("/login?error=Email+and+password+are+required");
  }

  let data;
  let setCookieHeader: string[] = [];

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    // Capture Set-Cookie headers from backend so we can forward them
    setCookieHeader = res.headers.getSetCookie?.() ?? [];
    data = await res.json();

    if (!res.ok) {
      const msg = encodeURIComponent(data.message ?? "Login failed");
      redirect(`/login?error=${msg}`);
    }
  } catch {
    redirect("/login?error=Could+not+reach+the+server");
  }

  // Forward the httpOnly cookies (accessToken & refreshToken) set by the backend
  const cookieStore = await cookies();
  for (const raw of setCookieHeader) {
    const parts = raw.split(";").map((s) => s.trim());
    const [nameVal, ...attrs] = parts;
    const eqIdx = nameVal.indexOf("=");
    const name = nameVal.substring(0, eqIdx);
    const value = nameVal.substring(eqIdx + 1);

    const options: Record<string, string | boolean | number | Date> = {};
    for (const attr of attrs) {
      const [k, v] = attr.split("=").map((s) => s.trim());
      const key = k.toLowerCase();
      if (key === "httponly") options.httpOnly = true;
      else if (key === "secure") options.secure = true;
      else if (key === "samesite")
        options.sameSite = v as "strict" | "lax" | "none";
      else if (key === "max-age") options.maxAge = Number(v);
      else if (key === "path") options.path = v;
    }

    cookieStore.set(
      name,
      value,
      options as Parameters<typeof cookieStore.set>[2],
    );
  }

  redirect("/");
}

// ─── Signup ──────────────────────────────────────────────────────────────────

export async function signupAction(formData: FormData): Promise<void> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    redirect("/registration?error=All+fields+are+required");
  }

  let data;
  let setCookieHeader: string[] = [];

  try {
    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
      cache: "no-store",
    });

    setCookieHeader = res.headers.getSetCookie?.() ?? [];
    data = await res.json();

    if (!res.ok) {
      const msg = encodeURIComponent(data.message ?? "Registration failed");
      redirect(`/registration?error=${msg}`);
    }
  } catch {
    redirect("/registration?error=Could+not+reach+the+server");
  }

  // Forward the httpOnly cookies (accessToken & refreshToken) set by the backend
  const cookieStore = await cookies();
  for (const raw of setCookieHeader) {
    const parts = raw.split(";").map((s) => s.trim());
    const [nameVal, ...attrs] = parts;
    const eqIdx = nameVal.indexOf("=");
    const name = nameVal.substring(0, eqIdx);
    const value = nameVal.substring(eqIdx + 1);

    const options: Record<string, string | boolean | number | Date> = {};
    for (const attr of attrs) {
      const [k, v] = attr.split("=").map((s) => s.trim());
      const key = k.toLowerCase();
      if (key === "httponly") options.httpOnly = true;
      else if (key === "secure") options.secure = true;
      else if (key === "samesite")
        options.sameSite = v as "strict" | "lax" | "none";
      else if (key === "max-age") options.maxAge = Number(v);
      else if (key === "path") options.path = v;
    }

    cookieStore.set(
      name,
      value,
      options as Parameters<typeof cookieStore.set>[2],
    );
  }

  redirect("/");
}

// ─── Logout ──────────────────────────────────────────────────────────────────

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value ?? "";
  const supabase = await createClient();

  try {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
      cache: "no-store",
    });
  } catch {
    // Even if backend fails, still clear cookies
  }

  await supabase.auth.signOut();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  redirect("/login");
}

export async function loginWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    redirect("/login?error=Google+login+failed");
  }

  redirect(data.url);
}
