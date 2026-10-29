import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Groundnut Oil Production",
  description: "From farm to bottle, Kuyash Integrated Farm processes the finest groundnuts into pure, high-quality oil — naturally rich, nutritious, and trusted by families and businesses.",
  openGraph: {
    title: "Premium Groundnut Oil Production | Kuyash Integrated Farm",
    description: "Pure, natural, nutritious groundnut oil. Cold-pressed and carefully processed from trusted local farms.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Kuyash Groundnut Oil Production",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
