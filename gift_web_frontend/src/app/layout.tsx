import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Giftly – Make Every Moment Special",
  description: "Discover beautifully curated gifts for birthdays, anniversaries & special celebrations.",
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