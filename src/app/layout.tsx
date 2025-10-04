import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Primary font: Arimo (sans)
const arimo = Arimo({
  variable: "--font-arimo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PsrInfinity Mall",
  description: "PsrInfinity in Hyderabad is coming soon. White, gold, and black CTA theme.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Add Google Fonts link for Libertinus Serif Display in app/head.tsx */}
      <body className={`${arimo.variable} font-sans antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
