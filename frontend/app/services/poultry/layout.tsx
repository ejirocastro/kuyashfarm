import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Poultry Farming | Kuyash Integrated Farm",
  description: "Kuyash raises healthy chickens and poultry using modern, hygienic farming practices to supply fresh, quality poultry products across Nigeria.",
  openGraph: {
    title: "Poultry Farming | Kuyash Integrated Farm",
    description: "Fresh, quality poultry products from Kuyash Integrated Farm, Nasarawa State, Nigeria.",
    url: "https://kuyashfarm.com/services/poultry",
    siteName: "Kuyash Integrated Farm",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Poultry Farming | Kuyash Integrated Farm", description: "Quality poultry products from Kuyash Farm." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
