import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingIconsBackground from "@/components/background";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: {
    default: "Vault Launcher",
    template: "%s | Vault Launcher",
  },
  description:
    "Vault is a fast, modern, open-source game launcher for Windows. Coming soon.",
  applicationName: "Vault Launcher",
  authors: [{ name: "Parcoil", url: "https://vault.parcoil.com" }],
  keywords: [
    "vault",
    "game launcher",
    "game manager",
    "game library",
    "game launcher app",
    "pc gaming",
    "steam games",
    "game downloader",
    "open source",
    "vault launcher",
  ],
  creator: "Parcoil",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://vault.parcoil.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${geistMono.variable} antialiased transition-colors w-screen overflow-x-hidden`}
      >
        <head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest"></link>
        </head>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="fixed inset-0 -z-10">
            <FloatingIconsBackground />
          </div>
          <Navbar />
          <TooltipProvider> {children}</TooltipProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
