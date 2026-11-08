import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: { absolute: "Kuyash Integrated Farm | Growing Food. Building Futures." },
  description: "Kuyash Integrated Farm Ltd grows crops, raises livestock, farms fish, produces palm oil and trains the next generation of farmers — all from Nasarawa State, Nigeria.",
  openGraph: {
    title: "Kuyash Integrated Farm | Growing Food. Building Futures.",
    description: "Sustainable agriculture, food production and rural development from Nasarawa State, Nigeria.",
    url: "https://kuyashfarm.com",
    images: [{ url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200", width: 1200, height: 630, alt: "Kuyash Integrated Farm" }],
  },
};
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { HeroStatsBar } from "@/components/sections/HeroStatsBar";
import { OriginStory } from "@/components/sections/OriginStory";
import { Services } from "@/components/sections/Services";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { KuyashModel } from "@/components/sections/KuyashModel";
import { InfrastructureStrip } from "@/components/sections/InfrastructureStrip";
import { ProcessStrip } from "@/components/sections/ProcessStrip";
import { PeopleSection } from "@/components/sections/PeopleSection";
import { GrowingWithOthers } from "@/components/sections/GrowingWithOthers";
import { AcademyFeature } from "@/components/sections/AcademyFeature";
import { ImpactNumbers } from "@/components/sections/ImpactNumbers";
import { VisitFarm } from "@/components/sections/VisitFarm";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HeroStatsBar />
        <OriginStory />
        <Services />
        <FeaturedProducts />
        <KuyashModel />
        <InfrastructureStrip />
        <ProcessStrip />
        <PeopleSection />
        <GrowingWithOthers />
        <AcademyFeature />
        <ImpactNumbers />
        <VisitFarm />
      </main>
      <Footer />
    </>
  );
}
