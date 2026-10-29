import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Kuyash Integrated Farm",
  description: "Sign in to your Kuyash account to manage your orders, track deliveries and access the Kuyash Academy.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
