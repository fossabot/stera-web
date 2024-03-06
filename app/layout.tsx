import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider } from "primereact/api";

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
      <head></head>
      <body><PrimeReactProvider>{children}</PrimeReactProvider></body>
    </html>
  );
}
