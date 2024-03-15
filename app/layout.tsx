import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import MainNavbar from "@/components/shared/navbar";
import { useSession } from "next-auth/react";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
const poppins = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Bathouse - Home",
  description: "Beta version of Bathouse website.",
  icons: {
    icon: [
      {
        url: "/favicon-blue.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-white.png",
        media: "(prefers-color-scheme: dark)",
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
      <html lang="en">
        <body className={poppins.className}>
          <div className="relative min-h-screen">
            <Image
              src="/background-houses.png"
              alt=""
              layout="fill"
              objectFit="cover"
              className="relative opacity-[20%]"
            />
            <Providers>
              {/* <MainNavbar /> */}
              {children}
            </Providers>
          </div>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
