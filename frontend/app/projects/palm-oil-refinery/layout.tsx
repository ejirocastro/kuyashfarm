import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Palm Oil Refinery | Kuyash Projects",
  description: "Kuyash is developing a palm oil refinery to process and add value to palm produce, strengthening local supply chains across Nigeria.",
  openGraph: {
    title: "Palm Oil Refinery | Kuyash Projects",
    description: "Developing local palm oil processing capacity to turn palm produce into dependable, value-added products for Nigerian markets.",
    url: "https://kuyashfarm.com/projects/palm-oil-refinery",
    siteName: "Kuyash Integrated Farm",
    images: [{ url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200", width: 1200, height: 630, alt: "Palm Oil Refinery" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Palm Oil Refinery | Kuyash Projects", description: "Developing local palm oil processing capacity in Nigeria." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
