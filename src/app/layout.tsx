import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Barrio Energy",
  description: "Energy infrastructure and data center solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
