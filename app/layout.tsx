import type { Metadata } from "next";
import { Barlow_Condensed, IBM_Plex_Sans } from "next/font/google";
import { SITE } from "@/lib/site-config";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: `${SITE.appName} | ${SITE.title}`,
  description: SITE.description,
  openGraph: {
    title: `${SITE.appName} | ${SITE.title}`,
    description: SITE.description,
    type: "website",
    url: SITE.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.appName} | ${SITE.title}`,
    description: SITE.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
