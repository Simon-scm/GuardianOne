import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GuardianOne - Your Personal Security AI",
  description: "A privacy-first, independent Security AI that protects the user — not corporations, not BigTech, not advertisers.",
  keywords: ["security", "privacy", "AI", "protection", "on-device"],
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

