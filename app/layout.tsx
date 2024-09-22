import type { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import { Inter } from "next/font/google";
import "@styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "1645.Auktion - Petzold KG",
  icons: {
    icon: "/assets/images/hammer.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <PlausibleProvider domain="timed-auction.vercel.app">
        <body className={inter.className}>{children}</body>
      </PlausibleProvider>
    </html>
  );
}
