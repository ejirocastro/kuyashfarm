import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Kuyash Integrated Farm",
  description: "Learn about Kuyash Integrated Farm Ltd — our story, mission, vision and commitment to sustainable agriculture in Nasarawa State, Nigeria.",
  openGraph: {
    title: "About Us | Kuyash Integrated Farm",
    description: "Learn about Kuyash Integrated Farm Ltd — our story, mission, vision and commitment to sustainable agriculture in Nasarawa State, Nigeria.",
    url: "https://kuyashfarm.com/about",
    siteName: "Kuyash Integrated Farm",
    images: [{ url: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1200", width: 1200, height: 630, alt: "Kuyash Integrated Farm" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "About Us | Kuyash Integrated Farm", description: "Our story, mission and commitment to sustainable agriculture in Nigeria." },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
