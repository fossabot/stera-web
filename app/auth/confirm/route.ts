"use server";

import { createDBServerClient } from "@/libs/db/createClient";
import { type EmailOtpType } from "@supabase/supabase-js";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  if (token_hash && type) {
    const supabase = createDBServerClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      redirectTo.searchParams.delete("next");
      return NextResponse.redirect(redirectTo);
    } else {
      console.log(error);
      setCookie("error", error, {cookies})
    }
  } else {
    console.log(`[/auth/confirm/route.ts] token_hash or type was not provided`);
    console.log(`[/auth/confirm/route.ts] token_hash: ${token_hash}`);
    console.log(`[/auth/confirm/route.ts] type: ${type}`);
    setCookie("error", "token_hash or type was not provided", {cookies})
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = "/error";
  return NextResponse.redirect(redirectTo);
}
