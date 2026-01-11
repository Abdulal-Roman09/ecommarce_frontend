import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import LogOutSuccessToast from "@/components/shared/LogOutSuccessToast";
import LoginSuccessToast from "@/components/shared/LoginSuccessToeast";

export const metadata: Metadata = {
  title: "Ecommarce",
  description: "Modern ecommerce platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" richColors />
        <LoginSuccessToast />
        <LogOutSuccessToast />
      </body>
    </html>
  );
}
