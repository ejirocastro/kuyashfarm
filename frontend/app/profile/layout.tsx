import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | Kuyash Integrated Farm",
  description: "Manage your Kuyash account profile and settings.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
