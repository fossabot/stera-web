import type { Metadata, Viewport } from "next";
import "./mantineGlobals.css";
import "./globals.css";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ElapsedAffix } from "./debugger";
import { getDispLang } from "./langSC";
// const inter = Inter({ subsets: ["latin"] });
import { Hind } from "next/font/google";
import { Noto_Sans_JP } from "next/font/google";
import { Notifications } from "@mantine/notifications";
import ProgressBarProviders from "./components/ProgressBarProvider";

const classHind = Hind({
  subsets: ["latin"],
  display: "swap",
  weight: "300",
  variable: "--font-hind",
});

const classNotoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

const APP_NAME = "Stera";
const APP_DEFAULT_TITLE = "Stera Federated SNS";
const APP_TITLE_TEMPLATE = "%s - Stera";
const APP_DESCRIPTION = "One of the Federated SNS";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispLang = await getDispLang();
  let HTMLLang = dispLang.toLocaleLowerCase();
  const displayVersionAffix =
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";
  return (
    <html lang={dispLang}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
        <meta name="theme-color" content="#0375e4" />
        <link rel="icon" href="/favicon.ico"/>
        <ColorSchemeScript />
      </head>
      <body className={`${classNotoSansJP.className}`}>
        <MantineProvider>
          <ProgressBarProviders />
          <Notifications position="top-center" autoClose={4000} />
          {children}
          {displayVersionAffix ? <ElapsedAffix /> : null}
        </MantineProvider>
      </body>
    </html>
  );
}
