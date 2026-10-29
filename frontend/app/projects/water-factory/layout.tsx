import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Water Factory | Kuyash Projects",
  description: "Kuyash is developing a modern water refinery to produce high-quality, safe and refreshing drinking water for homes, businesses and communities across Nigeria.",
  openGraph: {
    title: "Water Factory | Kuyash Projects",
    description: "Pure, safe and refreshing drinking water — produced locally for Nigerian homes, businesses and communities.",
    url: "https://kuyashfarm.com/projects/water-factory",
    siteName: "Kuyash Integrated Farm",
    images: [{ url: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=1200", width: 1200, height: 630, alt: "Kuyash Water Factory" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Water Factory | Kuyash Projects", description: "Pure, safe drinking water produced locally for Nigerian communities." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
