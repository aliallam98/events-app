import { Toaster, toast } from "sonner";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

import { ClerkProvider } from "@clerk/nextjs";
import { EdgeStoreProvider } from "../lib/edgestore";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Evently",
  description: "Evently is a platform for event management.",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <EdgeStoreProvider>
            <Toaster
            />
            <Navbar />
            {children}
            <Footer />
          </EdgeStoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
