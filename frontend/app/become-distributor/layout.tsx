import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Distributor | Kuyash Integrated Farm",
  description: "Partner with Kuyash Integrated Farm as a distributor and bring quality farm products to your community. Apply to join our distribution network today.",
  openGraph: {
    title: "Become a Distributor | Kuyash Integrated Farm",
    description: "Join the Kuyash distribution network and bring quality farm products to your community.",
    url: "https://kuyashfarm.com/become-distributor",
    siteName: "Kuyash Integrated Farm",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Become a Distributor | Kuyash Integrated Farm", description: "Join the Kuyash distribution network." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
