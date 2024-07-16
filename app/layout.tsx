import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProductsProvider } from "./context/ProductsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Products App",
  description: "Made by SamiFraca",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProductsProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ProductsProvider>
  );
}
