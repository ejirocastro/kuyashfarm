import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | Kuyash Integrated Farm",
  description: "Create a Kuyash account to shop for farm-fresh products, track your orders and access the Kuyash Academy.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
