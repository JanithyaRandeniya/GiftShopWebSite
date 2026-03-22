import type { Metadata } from "next";
import { CartProvider } from "@/src/context/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Giftly ✦",
  description: "Beautifully curated gifts for every celebration.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}