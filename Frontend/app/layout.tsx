import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Modal from "@/components/emailmodal/Modal";
import Navbar from "@/components/nav/Navbar";
import PostLoginCartHandler from "@/components/ui/PostLoginCartHandler";
import Follow from "@/components/ui/Follow";
import Providers from "./Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Never Never - Premium Mens Wear",
  description: "Premium Mens Wear online store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.className}`}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <Modal />
          {/* Handles auto-add-to-cart after a guest logs in */}
          <PostLoginCartHandler />

          <main className="grow">{children}</main>

          <Follow />
        </Providers>
      </body>
    </html>
  );
}
