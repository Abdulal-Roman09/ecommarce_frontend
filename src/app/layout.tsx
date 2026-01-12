import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import LogOutSuccessToast from "@/components/shared/LogOutSuccessToast";
import LoginSuccessToast from "@/components/shared/LoginSuccessToeast";
import { ThemeProvider } from "@/provider/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster position="top-right" richColors />
        <LoginSuccessToast />
        <LogOutSuccessToast />
      </body>
    </html>
  );
}
