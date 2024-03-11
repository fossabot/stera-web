import { NextResponse, type NextRequest } from "next/server";
import { updateDBSession } from "./libs/db/session";

import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en-US", "ja"];

function getLocale(req: NextRequest) {
  const headersLocale: string =
    req.headers.get("accept-language") ?? "en-US";
  const languages = new Negotiator({
    headers: { "accept-language": headersLocale },
  }).languages();
  const defaultLocale = "en-US";
  const selectedLang = match(languages, locales, defaultLocale);
  return selectedLang.replace(/-/g, "");
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = req.nextUrl;
  console.log(`[middleware.ts] Access NextURL: ${url}`);
  console.log(`[middleware.ts] Access Pathname: ${req.nextUrl.pathname}`);

  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });
  let locale = getLocale(req);

  // アクセス先のURLが、i18n仕様のものか確認
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (!pathnameHasLocale) {
    const rewriteUrl = `/${locale}${pathname}`;
    console.log(`[middleware.ts] Rewrite to -> ${rewriteUrl}`);
    res = NextResponse.rewrite(new URL(rewriteUrl, req.url));
  }

  // Customize
  if (["/login", "/signup"].includes(url.pathname)) {
    console.log("[middleware.ts] Auth");
    const locale = getLocale(req);
    res = NextResponse.rewrite(new URL(`/${locale}/auth`, req.nextUrl));
  }
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
