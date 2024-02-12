import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import MainNavbar from "@/components/shared/navbar";
import { useSession } from "next-auth/react";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bathouse - Home",
  description: "Beta version of Bathouse website.",
  icons: {
    icon: [
      {
        url: '/favicon-blue.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon-white.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en" >
       
        <body className={inter.className}>
          <Providers>
            <MainNavbar />
            {children}
          </Providers>
        </body>

      </html>
    </SessionProvider>
  );
}
