import { NextResponse, type NextRequest } from "next/server"
import { updateDBSession } from "./libs/db/session"


export async function middleware(req: NextRequest) {
  const url = req.nextUrl
  console.log(`[middleware.ts] Access: ${url}`)
  const reqCookies = req.cookies
  // https://github.com/vercel/next.js/discussions/34822
  function authPage(login: boolean) {
    console.log(reqCookies.get("authmode")?.value)
    if (reqCookies.has("authmode")) return NextResponse.rewrite(new URL(`/auth`, req.url));
    const res = NextResponse.redirect(url)
    res.cookies.set({
      name: 'authmode',
      value: login ? 'login' : 'signup',
      path: '/',
    })
    return res;
  }

  if (url.pathname === "/login") return authPage(true);
  if (url.pathname === "/signup") return authPage(false);
  return await updateDBSession(req)
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
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}