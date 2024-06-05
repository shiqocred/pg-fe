import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/providers/toast-provider";
import ModalProvider from "@/providers/modal-provider";
import { CookiesProvider } from "next-client-cookies/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | PG699 Comitted Generation",
    default: "PG699 Comitted Generation", // a default is required when creating a template
  },
  description: "Panggung Gembira Comitted Generation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CookiesProvider>
          <ToastProvider />
          <ModalProvider />
          {children}
        </CookiesProvider>
      </body>
    </html>
  );
}
