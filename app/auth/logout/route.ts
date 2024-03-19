"use server";

import { createDBServerClient } from "@/libs/db/createClient";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createDBServerClient();
  let redirectTo = new URL("/?factor=successLogout", request.nextUrl);
  // COMPROMISE ANY!!! using type ANY for error handling
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error: any) {
    redirectTo.pathname = "/error";
    setCookie("error", error, { cookies });
  }
  return NextResponse.redirect(redirectTo);
}
