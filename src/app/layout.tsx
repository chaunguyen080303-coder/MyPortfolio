import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeBoot } from "@/components/ThemeBoot";
import { getContent } from "@/data";
import { themeBootScript } from "@/lib/theme";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const content = getContent("en");

export const metadata: Metadata = {
  metadataBase: new URL(content.siteUrl),
  title: {
    default: `${content.profile.name} · ${content.profile.title}`,
    template: `%s · ${content.profile.name}`,
  },
  description: content.profile.tagline,
  applicationName: content.profile.title,
  authors: [{ name: content.profile.name }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: content.siteUrl,
    siteName: content.profile.title,
    title: `${content.profile.name} · ${content.profile.title}`,
    description: content.profile.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${content.profile.name} · ${content.profile.title}`,
    description: content.profile.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="min-h-dvh font-sans antialiased">
        <ThemeBoot />
        {children}
      </body>
    </html>
  );
}
