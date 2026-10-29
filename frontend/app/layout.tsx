import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/providers/ClientProviders";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Kuyash Integrated Farm", template: "%s | Kuyash Integrated Farm" },
  description: "Kuyash Integrated Farm Ltd — growing crops, raising livestock, processing palm oil and building a sustainable agricultural future in Nasarawa State, Nigeria.",
  metadataBase: new URL("https://kuyashfarm.com"),
  openGraph: {
    siteName: "Kuyash Integrated Farm",
    type: "website",
    locale: "en_NG",
    images: [{ url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200", width: 1200, height: 630, alt: "Kuyash Integrated Farm" }],
  },
  twitter: { card: "summary_large_image", site: "@kuyashfarm" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
