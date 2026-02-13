import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Barrio Energy | Data Centers & Energy Infrastructure",
  description: "Acquiring, developing, and leasing industrial commercial properties for data centers, battery storage, and industrial loads in Texas ERCOT.",
  keywords: "energy, data centers, ERCOT, Texas, battery storage, solar, energy advisory",
  openGraph: {
    title: "Barrio Energy",
    description: "Data Centers & Energy Infrastructure in Texas ERCOT",
    type: "website",
  },
  icons: {
    icon: [{ url: "/images/asset-1.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0a0a0a] text-white antialiased">{children}</body>
    </html>
  );
}
