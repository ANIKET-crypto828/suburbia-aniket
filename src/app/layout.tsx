import type { Metadata } from "next";
import { Bowlby_One_SC, DM_Mono } from "next/font/google";

import "./globals.css";
import { SVGFilters } from "@/components/SVGFilters";
import { createClient } from "@prismicio/client";

const bowlby = Bowlby_One_SC({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bowlby-sc",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient("suburbia-aniket");
  const settings = await client.getSingle("settings");

  return {

  title: settings.data.site_title,
  description: settings.data.meta_description,
  openGraph: {
    images: settings.data.fallback_og_image.url ?? undefined,
  },
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bowlby.variable} ${dmMono.variable} antialiased font-mono font-medium text-zinc-800`}
      >
        <main>{children}</main>
        <SVGFilters />
      </body>
    </html>
  );
}
