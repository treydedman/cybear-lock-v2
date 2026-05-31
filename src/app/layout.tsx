import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/components/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CyBear Lock",
  description: "The Secure Way to Forget Your Passwords",
  openGraph: {
    title: "CyBear Lock",
    description:
      "A fast, simple, and secure password manager designed to take the hassle out of remembering your login details.",
    images: ["/cybear-og.png"],
    url: "https://cybear-lock-v2.vercel.app",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
