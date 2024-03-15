import { NextResponse, type NextRequest } from "next/server";
import { updateDBSession } from "./libs/db/session";

import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en-US", "ja"];

function getLocale(req: NextRequest) {
  const headersLocale: string = req.headers.get("accept-language") ?? "en-US";
  const languages = new Negotiator({
    headers: { "accept-language": headersLocale },
  }).languages();
  const defaultLocale = "en-US";
  const selectedLang = match(languages, locales, defaultLocale);
  // return selectedLang.replace(/-/g, "");
  return selectedLang
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

  function setLangCookie() {
    const recLang = getLocale(req);
    res = NextResponse.redirect(new URL(req.url));
    let headers = req.headers
    for (const [key, value] of headers.entries()) {
      res.headers.set(key, value);
    }
    res.cookies.set("dispLang", recLang);
    console.log("[middleware.ts] i18n Refrech Redirect")
    return res;
  }
  // アクセス先のURLが、i18n仕様のものか確認
  if (!req.cookies.has("dispLang")) {
    return setLangCookie();
  } else if (!locales.includes(req.cookies.get("dispLang")!.value!)) {
    return setLangCookie();
  }

  // Customize
  if (["/login", "/signup"].includes(url.pathname)) {
    console.log("[middleware.ts] Auth");
    res = NextResponse.rewrite(new URL(`/auth`, req.nextUrl), {
      request: {
        headers: req.headers,
      },
    });
  }

  // res.headers.set("cache-control", "0");
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
    "/((?!_next/static|_next/image|favicon.ico|sw.js|sw.js.map|workbox-*.js|workbox-*.js.map|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|json)$).*)",
  ],
};
