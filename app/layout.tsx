import type { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import { Inter } from "next/font/google";
import "@styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "1656.Auktion - Petzold KG",
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
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="738e00f5-fd51-428e-9b3e-19dd895acbe3"
        ></script>
      </head>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
