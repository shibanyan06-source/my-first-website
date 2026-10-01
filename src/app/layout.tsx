import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { profile } from "@/content/profile";
import "./globals.css";

const siteUrl = process.env.SITE_URL;
const shareImage = siteUrl
  ? new URL(
      `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/share-image.png`,
      siteUrl,
    ).toString()
  : undefined;
export const metadata: Metadata = {
  title: profile.title,
  description: profile.description,
  ...(siteUrl
    ? { metadataBase: new URL(siteUrl), alternates: { canonical: siteUrl } }
    : {}),
  openGraph: {
    title: profile.title,
    description: profile.description,
    locale: "ja_JP",
    type: "website",
    siteName: "Yuka",
    ...(shareImage
      ? {
          images: [
            {
              url: shareImage,
              width: 1200,
              height: 630,
              alt: "Yuka — People, data & stories.",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: profile.title,
    description: profile.description,
    ...(shareImage ? { images: [shareImage] } : {}),
  },
};
export const viewport: Viewport = { themeColor: "#f7f4ec" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
