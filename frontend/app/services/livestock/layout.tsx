import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Livestock",
  description: "Raising healthy cattle, sheep and goats with modern animal husbandry practices.",
  openGraph: {
    title: "Livestock | Kuyash Integrated Farm",
    description: "Raising healthy cattle, sheep and goats with modern animal husbandry practices.",
    url: "https://kuyashfarm.com/services/livestock",
    siteName: "Kuyash Integrated Farm",
    images: [{ url: "/images/backgrounds/khalahari.jpg", width: 1200, height: 630, alt: "Livestock" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Livestock | Kuyash Integrated Farm", description: "Raising healthy cattle, sheep and goats with modern animal husbandry practices." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
