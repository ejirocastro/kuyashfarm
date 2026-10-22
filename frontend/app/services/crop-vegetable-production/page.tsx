"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import {
  CROPS,
  CROP_PROCESS,
  CROP_FEATURES,
  CROP_BENEFITS,
  CROP_STATS,
  type Crop,
} from "@/lib/data/crop-production";

// ─── motion preset ────────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.55, delay, ease: EASE },
});

// ─── sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6b9d7a] mb-3">
      {text}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-serif font-bold text-[#080f0a] leading-[1.06]"
      style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
    >
      {children}
    </h2>
  );
}

function CropCard({ crop, active, onClick }: { crop: Crop; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group w-full text-left rounded-2xl border transition-all duration-200 overflow-hidden ${
        active
          ? "border-[#2d5f3f] shadow-md"
          : "border-[#e8ede9] hover:border-[#c6dece]"
      }`}
    >
      {/* image strip */}
      <div className="relative h-32 overflow-hidden">
        <Image
          src={crop.image}
          alt={crop.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
        />
        <div className={`absolute inset-0 transition-colors duration-200 ${active ? "bg-[#2d5f3f]/30" : "bg-[#080f0a]/10 group-hover:bg-[#080f0a]/20"}`} />
        {/* category pill */}
        <div className="absolute top-2 left-2">
          <span className="text-[9px] font-mono uppercase tracking-[0.15em] bg-[#080f0a]/70 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
            {crop.category === "field-crops" ? "Field" : crop.category === "vegetables" ? "Vegetable" : "Fruit"}
          </span>
        </div>
      </div>

      {/* text */}
      <div className={`px-4 py-3 transition-colors duration-200 ${active ? "bg-[#eef5f1]" : "bg-white"}`}>
        <div className="flex items-center justify-between">
          <p className={`font-serif font-bold text-sm ${active ? "text-[#2d5f3f]" : "text-[#080f0a]"}`}>
            {crop.name}
          </p>
          <span className="text-lg leading-none">{crop.icon}</span>
        </div>
        <p className="text-[10px] font-sans text-gray-400 mt-0.5 line-clamp-1">{crop.tagline}</p>
      </div>
    </button>
  );
}

function CropDetail({ crop }: { crop: Crop }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={crop.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="h-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">

          {/* left — text */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">{crop.icon}</span>
              <div>
                <SectionLabel text={crop.category === "field-crops" ? "Field Crop" : crop.category === "vegetables" ? "Vegetable" : "Fruit"} />
                <h3
                  className="font-serif font-bold text-[#080f0a] leading-tight"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}
                >
                  {crop.name}
                </h3>
              </div>
            </div>

            <p className="font-sans text-sm text-gray-500 leading-relaxed mb-7 max-w-lg">
              {crop.description}
            </p>

            {/* key metrics row */}
            <div className="grid grid-cols-3 gap-3 mb-7">
              {[
                { label: "Season", value: crop.season },
                { label: "Cycle", value: `~${crop.cycleWeeks < 52 ? crop.cycleWeeks + " wks" : Math.round(crop.cycleWeeks / 52) + " yrs"}` },
                { label: "Yield / ha", value: crop.yieldPerHa },
              ].map((m) => (
                <div key={m.label} className="bg-[#faf8f5] border border-[#e8ede9] rounded-xl px-4 py-3">
                  <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#6b9d7a] mb-1">{m.label}</p>
                  <p className="font-sans font-semibold text-[#080f0a] text-xs leading-snug">{m.value}</p>
                </div>
              ))}
            </div>

            {/* growing notes */}
            <div>
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#6b9d7a] mb-3">Growing Notes</p>
              <ul className="space-y-2.5">
                {crop.growingNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#6b9d7a] shrink-0 mt-0.5" />
                    <p className="font-sans text-sm text-gray-600 leading-relaxed">{note}</p>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* right — image */}
          <div className="relative aspect-video lg:aspect-4/3 rounded-2xl overflow-hidden border border-[#e8ede9]">
            <Image
              src={crop.image}
              alt={crop.name}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 420px"
              priority
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  "field-crops": "Field Crops",
  "vegetables": "Vegetables",
  "fruits": "Fruits",
};

export default function CropProductionPage() {
  const [activeCrop, setActiveCrop] = useState<Crop>(CROPS[0]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(CROPS.map((c) => c.category)))];

  const filteredCrops =
    activeCategory === "all" ? CROPS : CROPS.filter((c) => c.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf8f5]">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative h-[88vh] min-h-[600px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070"
            alt="Kuyash Crop Production"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#080f0a]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080f0a]/90 via-[#080f0a]/20 to-transparent" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* content pinned to bottom */}
          <div className="absolute inset-x-0 bottom-0 z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <Link
                href="/#services"
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm text-white font-sans backdrop-blur-md hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> All Services
              </Link>

              <SectionLabel text="Kuyash Integrated Farm" />
              <h1
                className="font-serif font-bold text-white leading-[1.04] max-w-3xl mb-5"
                style={{ fontSize: "clamp(2.6rem, 6vw, 4.8rem)" }}
              >
                Crop &amp; Vegetable<br />Production
              </h1>
              <p
                className="font-sans text-white/70 leading-relaxed max-w-xl mb-10"
                style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)" }}
              >
                56 hectares of integrated land producing 10 crops — grains, vegetables and fruits — through precision irrigation, data-driven agronomy and an integrated farm cycle that wastes nothing.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/shop/vegetables"
                  className="inline-flex items-center gap-2 bg-[#2d5f3f] hover:bg-[#3d7052] text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200"
                >
                  Shop Our Produce <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#crops"
                  className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 hover:bg-white/5 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200"
                >
                  See All Crops <ChevronDown className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── STATS STRIP ──────────────────────────────────────────────── */}
        <section className="bg-[#080f0a]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#1a3d2b]">
              {CROP_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}
                  className="px-4 md:px-8 py-6 md:py-10"
                >
                  <p
                    className="font-serif font-bold text-white mb-1"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-sans text-sm font-semibold text-white/75 mb-1">{stat.label}</p>
                  <p className="font-sans text-xs text-white/35 leading-relaxed">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CROPS SHOWCASE ───────────────────────────────────────────── */}
        <section id="crops" className="bg-white py-24 border-b border-[#e8ede9]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

            <motion.div className="mb-12" {...fadeUp()}>
              <SectionLabel text="What We Grow" />
              <SectionHeading>10 Crops, One Integrated Farm</SectionHeading>
              <p className="font-sans text-sm text-gray-500 leading-relaxed mt-4 max-w-xl">
                From staple grains and high-value vegetables to permanent fruit orchards, every crop on the Kuyash farm plays a role in the integrated system.
              </p>
            </motion.div>

            {/* category filter */}
            <div className="flex gap-2 flex-wrap mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] font-mono uppercase tracking-[0.18em] px-4 py-2 rounded-full border transition-colors duration-200 ${
                    activeCategory === cat
                      ? "bg-[#2d5f3f] border-[#2d5f3f] text-white"
                      : "bg-white border-[#e8ede9] text-gray-500 hover:border-[#c6dece] hover:text-[#2d5f3f]"
                  }`}
                >
                  {cat === "all" ? "All Crops" : CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-8">

              {/* crop detail panel — top on mobile, right on desktop */}
              <div className="bg-[#faf8f5] border border-[#e8ede9] rounded-2xl p-6 lg:p-9 min-h-[480px] order-first lg:order-last">
                <CropDetail crop={activeCrop} />
              </div>

              {/* crop grid — below detail on mobile, left on desktop */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 lg:self-start order-last lg:order-first">
                {filteredCrops.map((crop) => (
                  <CropCard
                    key={crop.id}
                    crop={crop}
                    active={activeCrop.id === crop.id}
                    onClick={() => setActiveCrop(crop)}
                  />
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── FARMING PROCESS ──────────────────────────────────────────── */}
        <section className="bg-[#faf8f5] py-24 border-b border-[#e8ede9]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

            <motion.div className="mb-14" {...fadeUp()}>
              <SectionLabel text="Seed to Harvest" />
              <SectionHeading>How We Grow</SectionHeading>
              <p className="font-sans text-sm text-gray-500 leading-relaxed mt-4 max-w-xl">
                Six repeatable stages underpin every crop we produce — from the soil audit that opens each season to the packhouse dispatch that closes it.
              </p>
            </motion.div>

            <div className="space-y-3">
              {CROP_PROCESS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.phase}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
                    className="group flex items-start gap-4 bg-white border border-[#e8ede9] hover:border-[#c6dece] rounded-2xl px-4 sm:px-6 py-5 transition-all duration-200"
                  >
                    <div className="shrink-0 flex flex-col items-center gap-1.5 pt-0.5">
                      <div className="w-10 h-10 rounded-xl bg-[#eef5f1] border border-[#c6dece] group-hover:bg-[#2d5f3f] group-hover:border-[#2d5f3f] flex items-center justify-center transition-colors duration-200">
                        <Icon className="w-5 h-5 text-[#2d5f3f] group-hover:text-white transition-colors duration-200" />
                      </div>
                      <span className="text-[9px] font-mono text-[#6b9d7a] tracking-[0.15em]">{step.phase}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-bold text-[#080f0a] text-base mb-1">{step.title}</h3>
                      <p className="font-sans text-sm text-gray-500 leading-relaxed">{step.description}</p>
                    </div>

                    <div className="shrink-0 hidden sm:block text-right">
                      <p className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#6b9d7a] mb-0.5">Duration</p>
                      <p className="font-sans text-xs font-semibold text-[#080f0a] whitespace-nowrap">{step.duration}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FEATURES + BENEFITS ──────────────────────────────────────── */}
        <section className="bg-[#faf8f5] py-24 border-b border-[#e8ede9]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* features */}
              <motion.div {...fadeUp()}>
                <SectionLabel text="Why Kuyash" />
                <SectionHeading>What Sets Us Apart</SectionHeading>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CROP_FEATURES.map((feat, i) => {
                    const Icon = feat.icon;
                    return (
                      <motion.div
                        key={feat.title}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}
                        className="group bg-white border border-[#e8ede9] hover:border-[#c6dece] rounded-2xl p-5 transition-all duration-200"
                      >
                        <div className="w-9 h-9 rounded-lg bg-[#eef5f1] group-hover:bg-[#2d5f3f] border border-[#c6dece] group-hover:border-[#2d5f3f] flex items-center justify-center mb-4 transition-colors duration-200">
                          <Icon className="w-4 h-4 text-[#2d5f3f] group-hover:text-white transition-colors duration-200" />
                        </div>
                        <h3 className="font-serif font-bold text-[#080f0a] text-sm mb-1.5">{feat.title}</h3>
                        <p className="font-sans text-xs text-gray-500 leading-relaxed">{feat.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* benefits */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              >
                <SectionLabel text="Benefits" />
                <SectionHeading>What You Get</SectionHeading>
                <div className="mt-8 space-y-3">
                  {CROP_BENEFITS.map((b, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-white border border-[#e8ede9] rounded-xl px-5 py-4"
                    >
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-[#6b9d7a] mt-0.5" />
                      <p className="font-sans text-sm text-gray-600 leading-relaxed">{b}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── GALLERY ──────────────────────────────────────────────────── */}
        <section className="bg-white py-24 border-b border-[#e8ede9]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

            <motion.div className="mb-12" {...fadeUp()}>
              <SectionLabel text="From Our Fields" />
              <SectionHeading>The Farm in Colour</SectionHeading>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {CROPS.slice(0, 10).map((crop, i) => (
                <motion.button
                  key={crop.id}
                  onClick={() => {
                    setActiveCrop(crop);
                    document.getElementById("crops")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.04, ease: EASE }}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-[#e8ede9] hover:border-[#c6dece] transition-all duration-300"
                >
                  <Image
                    src={crop.image}
                    alt={crop.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-108"
                    sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,20vw"
                  />
                  <div className="absolute inset-0 bg-[#080f0a]/0 group-hover:bg-[#080f0a]/35 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div>
                      <p className="font-serif font-bold text-white text-sm leading-tight">{crop.name}</p>
                      <p className="font-mono text-[9px] text-white/60 uppercase tracking-[0.15em]">View details</p>
                    </div>
                  </div>
                  {/* emoji badge */}
                  <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-base shadow-sm">
                    {crop.icon}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="bg-[#080f0a] py-24 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <motion.div {...fadeUp()}>
              <SectionLabel text="Ready to Order?" />
              <h2
                className="font-serif font-bold text-white leading-[1.06] max-w-2xl mb-5"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
              >
                Fresh from the Field<br />to Your Door
              </h2>
              <p className="font-sans text-white/50 text-sm leading-relaxed max-w-md mb-10">
                Order directly from the farm — grains, vegetables and fruits harvested to order and delivered across Nigeria within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <Link
                  href="/shop/vegetables"
                  className="inline-flex items-center gap-2 bg-[#2d5f3f] hover:bg-[#4a7c59] text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200"
                >
                  Shop Vegetables <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/shop/fruits"
                  className="inline-flex items-center gap-2 bg-[#2d5f3f] hover:bg-[#4a7c59] text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200"
                >
                  Shop Fruits <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/shop/grains"
                  className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200"
                >
                  Shop Grains
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
