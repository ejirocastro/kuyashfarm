import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soap & Tissue Factory | Kuyash Projects",
  description: "Kuyash produces high-quality soaps and tissue products using modern technology, natural ingredients and sustainable practices for homes and businesses across Nigeria.",
  openGraph: {
    title: "Soap & Tissue Factory | Kuyash Projects",
    description: "Clean living for a healthier tomorrow — quality soaps and tissue products made in Nigeria.",
    url: "https://kuyashfarm.com/projects/soap-tissue-factory",
    siteName: "Kuyash Integrated Farm",
    images: [{ url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200", width: 1200, height: 630, alt: "Kuyash Soap & Tissue Factory" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Soap & Tissue Factory | Kuyash Projects", description: "Quality soaps and tissue products made locally in Nigeria." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
