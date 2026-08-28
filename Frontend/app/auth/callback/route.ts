import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error);
      return NextResponse.redirect(`${origin}/login`);
    }

    const googleLoginResponse = await fetch(
      "https://redis-ecom.vercel.app/api/auth/google-login",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${data.session.access_token}`,
        },
      },
    );

    if (!googleLoginResponse.ok) {
      return NextResponse.redirect(`${origin}/login?error=Google+login+failed`);
    }

    const response = NextResponse.redirect(`${origin}/`);
    for (const cookie of googleLoginResponse.headers.getSetCookie?.() ?? []) {
      response.headers.append("Set-Cookie", cookie);
    }
    return response;
  }

  // Redirect after successful login
  return NextResponse.redirect(`${origin}/`);
}