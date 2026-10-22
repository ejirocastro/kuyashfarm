import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { HeroStatsBar } from "@/components/sections/HeroStatsBar";
import { IdentityStrip } from "@/components/sections/IdentityStrip";
import { OriginStory } from "@/components/sections/OriginStory";
import { FiveSides } from "@/components/sections/FiveSides";
import { Services } from "@/components/sections/Services";
import { KuyashModel } from "@/components/sections/KuyashModel";
import { ProcessStrip } from "@/components/sections/ProcessStrip";
import { PeopleSection } from "@/components/sections/PeopleSection";
import { GrowingWithOthers } from "@/components/sections/GrowingWithOthers";
import { ImpactNumbers } from "@/components/sections/ImpactNumbers";
import { ThereIsMoreToGrow } from "@/components/sections/ThereIsMoreToGrow";
import { VisitFarm } from "@/components/sections/VisitFarm";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1. Who we are */}
        <Hero />
        <HeroStatsBar />
        {/* 2. Instant identity */}
        <IdentityStrip />
        {/* 3. Where we started */}
        <OriginStory />
        {/* 3. How we work */}
        <ProcessStrip />
        {/* 4. What we grow */}
        <FiveSides />
        {/* 5. Our services */}
        <Services />
        {/* 6. How it all connects */}
        <KuyashModel />
        {/* 7. The people */}
        <PeopleSection />
        {/* 8. Growing with others */}
        <GrowingWithOthers />
        {/* 9. Our impact */}
        <ImpactNumbers />
        {/* 10. Stay current */}
        <ThereIsMoreToGrow />
        {/* 11. Come visit */}
        <VisitFarm />
      </main>
      <Footer />
    </>
  );
}
