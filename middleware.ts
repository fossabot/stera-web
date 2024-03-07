import { NextResponse, type NextRequest } from "next/server";
import { updateDBSession } from "./libs/db/session";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  console.log(`[middleware.ts] Access: ${url}`);
  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });
  // Customize
  if (["/login", "/signup"].includes(url.pathname))
    res = NextResponse.rewrite(new URL("/auth", req.nextUrl));
  //
  return await updateDBSession(req, res);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
