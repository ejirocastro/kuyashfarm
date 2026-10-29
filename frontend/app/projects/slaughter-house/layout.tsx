import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slaughterhouse & Meat Processing | Kuyash Projects",
  description: "Kuyash Integrated Farm is developing a modern slaughterhouse and meat processing facility to deliver safe, hygienic and reliable meat supply across Nigeria.",
  openGraph: {
    title: "Slaughterhouse & Meat Processing | Kuyash Projects",
    description: "A modern meat processing facility ensuring safe, hygienic and reliable supply — from our farms to your table.",
    url: "https://kuyashfarm.com/projects/slaughter-house",
    siteName: "Kuyash Integrated Farm",
    images: [{ url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200", width: 1200, height: 630, alt: "Slaughterhouse & Meat Processing" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Slaughterhouse & Meat Processing | Kuyash Projects", description: "Modern meat processing facility — from farm to market." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
