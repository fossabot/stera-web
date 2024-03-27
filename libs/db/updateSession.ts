import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { VAR_DB_KEY, VAR_DB_URL } from "../common/commonVar";

export async function updateDBSession(
  request: NextRequest,
  response: NextResponse
) {
  const supabase = createServerClient(VAR_DB_URL!, VAR_DB_KEY!, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value,
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({
          name,
          value,
          ...options,
        });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value: "",
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({
          name,
          value: "",
          ...options,
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;
  if (user) {
    if (user.user_metadata.initialized !== "true")
      if (pathname !== "/auth/init" && pathname !== "/auth/logout") {
        response = NextResponse.redirect(
          new URL("/auth/init", request.nextUrl)
        );
      }
    if (pathname === "/") {
      response = NextResponse.rewrite(new URL("/auth/init", request.nextUrl));
    }
  }

  return response;
}
