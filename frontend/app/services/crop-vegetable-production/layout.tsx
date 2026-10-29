import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crop & Vegetable Production | Kuyash Integrated Farm",
  description: "Kuyash grows a wide range of crops and vegetables using modern, sustainable farming practices in Nasarawa State, Nigeria.",
  openGraph: {
    title: "Crop & Vegetable Production | Kuyash Integrated Farm",
    description: "Fresh, sustainably grown crops and vegetables from Kuyash Integrated Farm.",
    url: "https://kuyashfarm.com/services/crop-vegetable-production",
    siteName: "Kuyash Integrated Farm",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Crop & Vegetable Production | Kuyash Integrated Farm", description: "Sustainably grown crops and vegetables from Kuyash Farm." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
