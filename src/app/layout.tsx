import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Calistoga, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

const display = Calistoga({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sg",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chiprion.example.com"),
  title: {
    default: "Chiprion — Engineering the Next Generation of Silicon",
    template: "%s · Chiprion",
  },
  description:
    "Semiconductor engineering education, VLSI training and chip design services. From RTL to silicon: design, verification, physical implementation, DFT, SoC and embedded engineering.",
  keywords: [
    "VLSI training",
    "semiconductor engineering",
    "RTL design",
    "UVM verification",
    "physical design",
    "DFT",
    "ASIC",
    "SoC",
  ],
};

export const viewport: Viewport = {
  themeColor: "#FAFAF9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-void font-body text-paper antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
