import type { Metadata } from "next";
import "./mantineGlobals.css";
import "./globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ElapsedAffix } from "./debuger";
import { getDispLang } from "./langSC";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stera",
  description: "Official client for Coloca",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispLang = await getDispLang();
  let HTMLLang = dispLang.toLocaleLowerCase();
  if (dispLang === "enUS") {
    HTMLLang = "en-US";
  }
  if (dispLang === "enGB") {
    HTMLLang = "en-GB";
  }
  return (
    <html lang={dispLang}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
        <meta name="theme-color" content="#0375e4" />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          {children}
          <ElapsedAffix />
        </MantineProvider>
      </body>
    </html>
  );
}
