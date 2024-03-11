import type { Metadata } from "next";
import "./mantineGlobals.css";
import "./globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ElapsedAffix } from "./debuger";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stera",
  description: "Official client for Coloca",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
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
