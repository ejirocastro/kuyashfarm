"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Sprout,
  Sun,
  Droplets,
  BarChart3,
  Package,
  Cpu,
} from "lucide-react";
import {
  CROPS,
  CROP_PROCESS,
  CROP_BENEFITS,
  CROP_STATS,
  type Crop,
} from "@/lib/data/crop-production";
import { ease as EASE, fadeUp as _fadeUp, listItem } from "@/lib/tokens";
import { Container, SectionLabel, Heading } from "@/components/ui";

const EASE_ARR = EASE;
const fadeUp = (delay = 0) => _fadeUp(delay);

const CATEGORY_LABELS: Record<string, string> = {
  "field-crops": "Field Crops",
  "vegetables": "Vegetables",
  "fruits": "Fruits",
};

// ─── Crop selector card ───────────────────────────────────────────────────────

function CropCard({
  crop,
  active,
  onClick,
}: {
  crop: Crop;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group w-full text-left rounded-2xl border transition-all duration-200 overflow-hidden ${
        active
          ? "border-brand shadow-md ring-1 ring-brand/20"
          : "border-border hover:border-brand-border"
      }`}
    >
      <div className="relative h-28 overflow-hidden">
        <Image
          src={crop.image}
          alt={crop.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
        />
        <div
          className={`absolute inset-0 transition-colors duration-200 ${
            active ? "bg-brand/25" : "bg-dark/15 group-hover:bg-dark/25"
          }`}
        />
        <div className="absolute top-2 left-2">
          <span className="text-[9px] font-mono uppercase tracking-[0.15em] bg-dark/65 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
            {CATEGORY_LABELS[crop.category] ?? crop.category}
          </span>
        </div>
      </div>
      <div
        className={`px-3 py-2.5 transition-colors duration-200 ${
          active ? "bg-brand-bg" : "bg-white"
        }`}
      >
        <p
          className={`font-serif font-bold text-sm leading-tight ${
            active ? "text-brand" : "text-dark"
          }`}
        >
          {crop.name}
        </p>
        <p className="text-[9px] font-sans text-gray-400 mt-0.5 line-clamp-1 leading-snug">
          {crop.tagline}
        </p>
      </div>
    </button>
  );
}

// ─── Crop detail panel ────────────────────────────────────────────────────────

function CropDetail({ crop }: { crop: Crop }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={crop.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3, ease: EASE_ARR }}
      >
        {/* image */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border mb-7">
          <Image
            src={crop.image}
            alt={crop.name}
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 460px"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-dark/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60 mb-1">
              {CATEGORY_LABELS[crop.category]}
            </p>
            <h3
              className="font-serif font-bold text-white leading-tight"
              style={{ fontSize: "clamp(1.3rem, 2vw, 1.7rem)" }}
            >
              {crop.name}
            </h3>
          </div>
        </div>

        {/* meta row */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { label: "Season", value: crop.season },
            {
              label: "Cycle",
              value:
                crop.cycleWeeks < 52
                  ? `~${crop.cycleWeeks} wks`
                  : `~${Math.round(crop.cycleWeeks / 52)} yrs`,
            },
            { label: "Yield / ha", value: crop.yieldPerHa },
          ].map((m) => (
            <div
              key={m.label}
              className="bg-cream border border-border rounded-xl px-3 py-2.5"
            >
              <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted mb-0.5">
                {m.label}
              </p>
              <p className="font-sans font-semibold text-dark text-xs leading-snug">
                {m.value}
              </p>
            </div>
          ))}
        </div>

        {/* description */}
        <p className="font-sans text-sm text-gray-500 leading-relaxed mb-5">
          {crop.description}
        </p>

        {/* growing notes */}
        <div>
          <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted mb-3">
            Growing Notes
          </p>
          <ul className="space-y-2">
            {crop.growingNotes.map((note, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-muted shrink-0 mt-0.5" />
                <p className="font-sans text-xs text-gray-600 leading-relaxed">
                  {note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CropProductionPage() {
  const [activeCrop, setActiveCrop] = useState<Crop>(CROPS[0]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    "all",
    ...Array.from(new Set(CROPS.map((c) => c.category))),
  ];
  const filteredCrops =
    activeCategory === "all"
      ? CROPS
      : CROPS.filter((c) => c.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative h-[90vh] min-h-[640px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070"
            alt="Kuyash Crop Production — Nasarawa farmland"
            fill
            className="object-cover object-center"
            priority
          />
          {/* layered overlays for depth */}
          <div className="absolute inset-0 bg-dark/50" />
          <div className="absolute inset-0 bg-linear-to-t from-dark/85 via-dark/15 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-dark/40 to-transparent" />

          {/* back nav — fixed top position, independent of headline */}
          <div className="absolute top-24 left-0 right-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_ARR }}
              >
                <Link
                  href="/#services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-sans text-sm text-white backdrop-blur-md hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> All Services
                </Link>
              </motion.div>
            </div>
          </div>

          {/* headline + CTAs — bottom anchored */}
          <div className="absolute inset-x-0 bottom-0 z-10 pb-20 pt-36">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1, ease: EASE_ARR }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-5">
                    Crop & Vegetable Production · Nasarawa State, Nigeria
                  </p>
                  <h1
                    className="font-serif font-bold text-white leading-[1.03] mb-6"
                    style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)" }}
                  >
                    56 Hectares.<br />
                    <span className="text-white/55">Ten Crops. One System.</span>
                  </h1>
                  <p
                    className="font-sans text-white/60 leading-[1.9] max-w-lg mb-9"
                    style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)" }}
                  >
                    Grains, vegetables and fruits grown on integrated land in Nasarawa — drip-irrigated, sensor-monitored and dispatched cold-chain within 24 hours of harvest.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/shop/vegetables"
                      className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-colors duration-200"
                    >
                      Shop Our Produce <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href="#crops"
                      className="inline-flex items-center gap-2 border border-white/25 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm px-6 py-3.5 rounded-full backdrop-blur-sm transition-colors duration-200"
                    >
                      Explore Crops <ChevronDown className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS STRIP ──────────────────────────────────────────────── */}
        <section className="bg-dark border-b border-dark2">
          <Container>
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-dark2">
              {CROP_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  {...listItem(i * 0.07)}
                  className="px-4 md:px-8 py-7 md:py-10"
                >
                  <p
                    className="font-serif font-bold text-white mb-1"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-sans text-sm font-semibold text-white/70 mb-1">
                    {stat.label}
                  </p>
                  <p className="font-sans text-xs text-white/35 leading-relaxed">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── CROPS SHOWCASE ───────────────────────────────────────────── */}
        <section id="crops" className="bg-white py-24 border-b border-border">
          <Container>
            <motion.div className="mb-10" {...fadeUp()}>
              <SectionLabel>What We Grow</SectionLabel>
              <Heading>10 Crops, One Integrated Farm</Heading>
              <p className="font-sans text-sm text-gray-500 leading-relaxed mt-4 max-w-xl">
                From staple grains and high-value vegetables to permanent fruit orchards — every crop plays a role in the same closed-loop system.
              </p>
            </motion.div>

            {/* category filters */}
            <div className="flex gap-2 flex-wrap mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] font-mono uppercase tracking-[0.18em] px-4 py-2 rounded-full border transition-colors duration-200 ${
                    activeCategory === cat
                      ? "bg-brand border-brand text-white"
                      : "bg-white border-border text-gray-500 hover:border-brand-border hover:text-brand"
                  }`}
                >
                  {cat === "all" ? "All Crops" : CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>

            {/* card grid LEFT, detail panel RIGHT */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-8 items-start">
              {/* card grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredCrops.map((crop) => (
                  <CropCard
                    key={crop.id}
                    crop={crop}
                    active={activeCrop.id === crop.id}
                    onClick={() => setActiveCrop(crop)}
                  />
                ))}
              </div>

              {/* detail panel */}
              <div className="bg-cream border border-border rounded-2xl p-6 lg:sticky lg:top-24">
                <CropDetail crop={activeCrop} />
              </div>
            </div>
          </Container>
        </section>

        {/* ── FARMING PROCESS ──────────────────────────────────────────── */}
        <section className="bg-dark2 py-24 border-b border-dark/40">
          <Container>
            <motion.div className="mb-14" {...fadeUp()}>
              <SectionLabel className="text-muted">Seed to Harvest</SectionLabel>
              <Heading className="text-white">How We Grow</Heading>
              <p className="font-sans text-sm text-white/50 leading-relaxed mt-4 max-w-xl">
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
                    transition={{ duration: 0.45, delay: i * 0.06, ease: EASE_ARR }}
                    className="group flex items-start gap-4 bg-white/5 border border-white/8 hover:border-muted/40 rounded-2xl px-4 sm:px-6 py-5 transition-all duration-200"
                  >
                    <div className="shrink-0 flex flex-col items-center gap-1.5 pt-0.5">
                      <div className="w-10 h-10 rounded-xl bg-brand/20 border border-brand/30 group-hover:bg-brand group-hover:border-brand flex items-center justify-center transition-colors duration-200">
                        <Icon className="w-5 h-5 text-muted group-hover:text-white transition-colors duration-200" />
                      </div>
                      <span className="text-[9px] font-mono text-white/30 tracking-[0.15em]">
                        {step.phase}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-bold text-white text-base mb-1">
                        {step.title}
                      </h3>
                      <p className="font-sans text-sm text-white/50 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="shrink-0 hidden sm:block text-right">
                      <p className="text-[9px] font-mono uppercase tracking-[0.15em] text-white/30 mb-0.5">
                        Duration
                      </p>
                      <p className="font-sans text-xs font-semibold text-white/70 whitespace-nowrap">
                        {step.duration}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ── WHY KUYASH ───────────────────────────────────────────────── */}
        <section className="bg-cream py-24 border-b border-border">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* left: narrative + checklist */}
              <motion.div {...fadeUp()}>
                <SectionLabel>Why Kuyash</SectionLabel>
                <Heading>What You Get When You Order From the Farm</Heading>
                <p className="font-sans text-sm text-gray-500 leading-relaxed mt-4 mb-8 max-w-md">
                  Most Nigerian produce travels through three to five intermediaries before it reaches a buyer. We cut that chain entirely — farm to your door, same day.
                </p>
                <div className="space-y-3">
                  {CROP_BENEFITS.map((b, i) => (
                    <motion.div
                      key={i}
                      {...listItem(i * 0.05)}
                      className="flex items-start gap-3 bg-white border border-border rounded-xl px-5 py-4"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-muted mt-0.5" />
                      <p className="font-sans text-sm text-gray-600 leading-relaxed">
                        {b}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* right: differentiator stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE_ARR }}
                className="lg:pt-14"
              >
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    {
                      icon: Droplets,
                      label: "Water Saved",
                      value: "60%",
                      note: "Drip vs flood irrigation",
                    },
                    {
                      icon: Package,
                      label: "Farm-to-Door",
                      value: "24 hrs",
                      note: "Cold-chain from harvest",
                    },
                    {
                      icon: Sprout,
                      label: "Crop Varieties",
                      value: "10",
                      note: "Grains, veg & fruits",
                    },
                    {
                      icon: BarChart3,
                      label: "Sensor Coverage",
                      value: "200+",
                      note: "IoT soil sensors on-farm",
                    },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.label}
                        {...listItem(i * 0.07)}
                        className="bg-white border border-border rounded-2xl p-5"
                      >
                        <div className="w-9 h-9 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center mb-4">
                          <Icon className="w-4 h-4 text-brand" />
                        </div>
                        <p
                          className="font-serif font-bold text-dark mb-0.5"
                          style={{ fontSize: "clamp(1.6rem, 2.5vw, 2rem)" }}
                        >
                          {item.value}
                        </p>
                        <p className="font-sans text-xs font-semibold text-dark mb-0.5">
                          {item.label}
                        </p>
                        <p className="font-sans text-[11px] text-gray-400 leading-snug">
                          {item.note}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* integrated cycle callout */}
                <div className="bg-dark rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center shrink-0 mt-0.5">
                      <Cpu className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-serif font-bold text-white text-sm mb-2">
                        The Integrated Cycle
                      </p>
                      <p className="font-sans text-xs text-white/50 leading-relaxed">
                        Crop residues feed our livestock. Livestock manure composts back into vegetable beds. Cassava peels become animal feed. Nothing leaves the system as waste — an integrated loop that cuts input costs and builds soil year on year.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ── GALLERY ──────────────────────────────────────────────────── */}
        <section className="bg-white py-24 border-b border-border">
          <Container>
            <motion.div className="mb-10" {...fadeUp()}>
              <SectionLabel>From Our Fields</SectionLabel>
              <Heading>The Farm in Colour</Heading>
              <p className="font-sans text-sm text-gray-500 leading-relaxed mt-3 max-w-md">
                Ten crops across three categories — grains, vegetables, fruits — grown together on a single integrated system in Nasarawa State.
              </p>
            </motion.div>

            {/* masonry-style grid: 5 col with two featured large tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 auto-rows-[160px] gap-3">
              {CROPS.slice(0, 10).map((crop, i) => {
                const isFeatured = i === 0 || i === 5;
                return (
                  <motion.button
                    key={crop.id}
                    onClick={() => {
                      setActiveCrop(crop);
                      document
                        .getElementById("crops")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    {...listItem(i * 0.04)}
                    className={`group relative rounded-2xl overflow-hidden border border-border hover:border-brand-border transition-all duration-300 ${
                      isFeatured ? "lg:row-span-2" : ""
                    }`}
                  >
                    <Image
                      src={crop.image}
                      alt={crop.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,20vw"
                    />
                    <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div>
                        <p className="font-serif font-bold text-white text-sm leading-tight">
                          {crop.name}
                        </p>
                        <p className="font-mono text-[9px] text-white/55 uppercase tracking-[0.15em]">
                          {CATEGORY_LABELS[crop.category]}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="relative py-28 overflow-hidden bg-dark">
          {/* background image */}
          <Image
            src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=2070"
            alt=""
            fill
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-linear-to-br from-dark via-dark/80 to-dark2/60" />

          <div className="relative z-10">
            <Container>
              <div className="max-w-2xl">
                <motion.div {...fadeUp()}>
                  <SectionLabel className="text-muted">Ready to Order?</SectionLabel>
                  <h2
                    className="font-serif font-bold text-white leading-[1.06] mb-5"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
                  >
                    Fresh from the Field<br />
                    <span className="text-white/50">to Your Door</span>
                  </h2>
                  <p className="font-sans text-white/50 text-sm leading-relaxed max-w-md mb-10">
                    Order directly from the farm — grains, vegetables and fruits harvested to order and cold-chain delivered across Nigeria within 24 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row items-start gap-3">
                    <Link
                      href="/shop/vegetables"
                      className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200"
                    >
                      Shop Produce <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm px-7 py-3.5 rounded-full backdrop-blur-sm transition-colors duration-200"
                    >
                      Wholesale Enquiry
                    </Link>
                  </div>
                </motion.div>
              </div>
            </Container>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
