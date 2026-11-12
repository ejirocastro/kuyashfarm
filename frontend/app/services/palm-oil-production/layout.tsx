import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Palm Oil Production",
  description: "Processing fresh palm fruit into high-quality crude palm oil for food and industry.",
  openGraph: {
    title: "Palm Oil Production | Kuyash Integrated Farm",
    description: "Processing fresh palm fruit into high-quality crude palm oil for food and industry.",
    url: "https://kuyashfarm.com/services/palm-oil-production",
    siteName: "Kuyash Integrated Farm",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Palm Oil Production | Kuyash Integrated Farm", description: "Processing fresh palm fruit into high-quality crude palm oil for food and industry." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
