import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fish Farming",
  description: "Sustainable aquaculture producing fresh tilapia, catfish and more year-round.",
  openGraph: {
    title: "Fish Farming | Kuyash Integrated Farm",
    description: "Sustainable aquaculture producing fresh tilapia, catfish and more year-round.",
    url: "https://kuyashfarm.com/services/fish-farming",
    siteName: "Kuyash Integrated Farm",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Fish Farming | Kuyash Integrated Farm", description: "Sustainable aquaculture producing fresh tilapia, catfish and more year-round." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
