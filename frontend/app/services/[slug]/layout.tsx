import type { Metadata } from "next";
import { SERVICE_CONTENT } from "@/lib/data/services";
import { SERVICES } from "@/lib/constants";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const content = SERVICE_CONTENT[slug];

  if (!service || !content) {
    return { title: "Service | Kuyash Integrated Farm" };
  }

  return {
    title: `${service.title} | Kuyash Integrated Farm`,
    description: service.description,
    openGraph: {
      title: `${service.title} | Kuyash Integrated Farm`,
      description: service.description,
      url: `https://kuyashfarm.com/services/${slug}`,
      siteName: "Kuyash Integrated Farm",
      images: [{ url: `${content.heroImage}&w=1200`, width: 1200, height: 630, alt: service.title }],
      type: "website",
    },
    twitter: { card: "summary_large_image", title: `${service.title} | Kuyash Integrated Farm`, description: service.description },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
