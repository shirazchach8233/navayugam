import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansMalayalam = Noto_Sans_Malayalam({
  variable: "--font-malayalam",
  subsets: ["malayalam"],
});

export const metadata: Metadata = {
  title: "Navayugam | നവയുഗം",
  description: "Navayugam website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ml"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansMalayalam.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
