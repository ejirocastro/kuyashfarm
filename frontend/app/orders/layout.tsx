import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders | Kuyash Integrated Farm",
  description: "View and track your Kuyash orders.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
