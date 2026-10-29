import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Kuyash Integrated Farm. Reach us for partnership opportunities, wholesale enquiries, investor relations, or general questions.",
  openGraph: {
    title: "Contact Us | Kuyash Integrated Farm",
    description: "Get in touch with Kuyash Integrated Farm. We're here to help with any enquiry.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Kuyash Integrated Farm — golden hour fields",
      },
    ],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
