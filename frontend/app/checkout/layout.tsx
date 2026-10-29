import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Kuyash Integrated Farm",
  description: "Complete your Kuyash order.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
