"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SERVICE_CONTENT } from "@/lib/data/services";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Beef,
  Wheat,
  Heart,
  ShieldCheck,
  Stethoscope,
  Users,
  Truck,
  Leaf,
} from "lucide-react";
import { ease as EASE } from "@/lib/tokens";
import { Container } from "@/components/ui";

const SLUG = "livestock";

const FADE_UP = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: EASE },
} as const;

/* ── Herd composition strip ── */
const HERD = [
  { label: "Cattle", value: "500+", detail: "Beef & dairy breeds" },
  { label: "Sheep", value: "500+", detail: "Mutton production" },
  { label: "Goats", value: "300+", detail: "Meat & browser stock" },
  { label: "Mortality Rate", value: "−40%", detail: "Below regional average" },
];

/* ── Breed profiles — three animals, editorial layouts ── */
const BREEDS = [
  {
    name: "Cattle",
    breed: "Bunaji × Sokoto Gudali",
    description:
      "Kuyash runs a dual-purpose herd suited to the Nigerian savannah climate. The Bunaji provides heat tolerance and disease resistance; the Sokoto Gudali contributes frame size and beef yield. Both breeds are established across northern Nigeria — no exotic imports, no climate mismatch.",
    specs: [
      { label: "Purpose", value: "Beef & dairy" },
      { label: "Market Weight", value: "180 – 280 kg" },
      { label: "Rearing Period", value: "12 – 18 months" },
      { label: "System", value: "Pasture + paddock" },
    ],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070",
    wide: true,
  },
  {
    name: "Sheep",
    breed: "Yankasa",
    description:
      "The Yankasa is Nigeria's most widely kept sheep breed — hardy, prolific and well-adapted to our environment. Kuyash maintains a Yankasa flock managed for consistent mutton production and reproductive performance.",
    specs: [
      { label: "Purpose", value: "Mutton" },
      { label: "Market Weight", value: "30 – 50 kg" },
      { label: "Rearing Period", value: "8 – 12 months" },
      { label: "Litter Size", value: "1 – 2 lambs" },
    ],
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4a?q=80&w=1400",
    wide: false,
  },
  {
    name: "Goats",
    breed: "Red Sokoto",
    description:
      "The Red Sokoto is prized across West Africa for its quality skin and lean, distinctively flavoured meat. Well-suited to semi-arid browse environments, our goats are managed as a complementary enterprise alongside cattle and sheep.",
    specs: [
      { label: "Purpose", value: "Meat & skin" },
      { label: "Market Weight", value: "20 – 35 kg" },
      { label: "Rearing Period", value: "8 – 10 months" },
      { label: "System", value: "Semi-free browse" },
    ],
    image: "https://images.unsplash.com/photo-1486218119243-13301543a212?q=80&w=1400",
    wide: false,
  },
];

/* ── Husbandry practices accordion ── */
const HUSBANDRY = [
  {
    phase: "01",
    title: "Breed Selection & Sourcing",
    week: "Foundation",
    description:
      "Every animal entering the Kuyash herd is sourced from verified, traceable stock. We select breeds established in Nigerian conditions — Bunaji and Sokoto Gudali cattle, Yankasa sheep, Red Sokoto goats — not exotic high-input breeds that perform poorly under local temperature, feed and disease pressure. Foundation quality determines everything that follows.",
    icon: Users,
  },
  {
    phase: "02",
    title: "Housing & Grazing Management",
    week: "Permanent",
    description:
      "Animals graze on managed pasture and return to ventilated paddocks at night. Housing provides shade, air movement and protection from predators without confining animals unnecessarily. Stocking density is kept below carrying capacity — overgrazing destroys pasture and raises disease pressure. We rotate paddocks to allow recovery.",
    icon: Leaf,
  },
  {
    phase: "03",
    title: "Nutrition & Feed Management",
    week: "Daily",
    description:
      "Grazing provides the nutritional base. During dry season or high-production periods, we supplement with locally sourced concentrates — grains, groundnut cake, crop residues. Mineral licks address deficiencies common in Nasarawa State soils. No imported compound feeds with unknown composition. What goes in is known and deliberate.",
    icon: Wheat,
  },
  {
    phase: "04",
    title: "Veterinary Care & Health Management",
    week: "Weekly",
    description:
      "Licensed veterinarians conduct scheduled health assessments and maintain vaccination records per animal. Core vaccines — CBPP, PPR, Brucellosis and anthrax — are administered on a fixed calendar. Parasite management follows a rotation protocol to prevent resistance. Sick animals are isolated immediately and treated under direct veterinary instruction.",
    icon: Stethoscope,
  },
  {
    phase: "05",
    title: "Harvest & Dispatch",
    week: "Per cycle",
    description:
      "Animals reach target weight before slaughter decisions are made — not calendar-driven, weight-driven. Handling at harvest is calm and low-stress: stressed animals produce inferior meat through the cortisol-glycogen mechanism. Processing is done under hygienic conditions and meat is chilled promptly. Delivery runs on a cold chain.",
    icon: Truck,
  },
];

/* ── Differentiators ── */
const DIFFERENTIATORS = [
  {
    icon: ShieldCheck,
    title: "Climate-Matched Breeds, Not Exotic Imports",
    body: "Bunaji, Yankasa and Red Sokoto breeds are established in Nigerian conditions. They tolerate heat, resist local disease pressure and perform without climate-controlled housing. That is not a compromise — it is correct agronomy.",
  },
  {
    icon: Heart,
    title: "Pasture-First Nutrition",
    body: "Managed grazing provides the nutritional base. We supplement only where soil mineral deficiencies or seasonal gaps require it. Animals are not grain-finished as a default practice — that is a cost-driver without quality benefit in this context.",
  },
  {
    icon: Stethoscope,
    title: "Veterinary Oversight, Not Reactive Treatment",
    body: "Licensed vets on a scheduled visit protocol — not called only when animals are sick. Vaccination calendars, parasite rotation and health records are maintained per animal. Intervention before clinical signs, not after visible losses.",
  },
  {
    icon: Beef,
    title: "Weight-Driven Harvest Decisions",
    body: "Animals are harvested when they reach target market weight — not on a fixed date. This produces consistent carcass quality and means buyers receive a predictable product every time, regardless of the season.",
  },
];

/* ── Benefits ── */
const BENEFITS = [
  "Beef, mutton and goat meat from climate-matched, traceable Nigerian breeds",
  "Pasture-raised on managed grazing land in Nasarawa State",
  "Licensed veterinary supervision from intake through dispatch",
  "Vaccination and health records maintained per animal",
  "Weight-driven harvest — consistent carcass quality, batch after batch",
  "Cold-chain delivery — meat chilled and dispatched same day",
  "Dairy available from our Bunaji herd during lactation season",
  "Wholesale supply available for processors, butcheries and food service",
];

export default function LivestockPage() {
  const [openHusbandry, setOpenHusbandry] = useState<number | null>(0);
  const content = SERVICE_CONTENT[SLUG];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">

        {/* ══════════════════════════════════════
            HERO — cinematic full-bleed
            Earthy, unhurried — different from fish/poultry
        ══════════════════════════════════════ */}
        <section className="relative h-screen min-h-[640px] overflow-hidden bg-dark2">
          <Image
            src={content.heroImage}
            alt="Kuyash Livestock"
            fill
            className="object-cover object-center scale-105"
            priority
          />
          {/* gradient: heavy at bottom for text, lighter at top */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/10" />
          {/* warm side vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark/40 via-transparent to-transparent" />

          {/* back nav — fixed top position, independent of headline */}
          <div className="absolute top-24 left-0 right-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
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
          <div className="absolute inset-x-0 bottom-0 z-10 pb-16 pt-36">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-5">
                    Livestock & Animal Husbandry · Nasarawa State, Nigeria
                  </p>
                  <h1
                    className="font-serif font-bold text-white leading-[1.03] mb-6"
                    style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)" }}
                  >
                    Raising Livestock.<br />
                    <span className="text-white/55">Building Agricultural Value.</span>
                  </h1>
                  <p
                    className="font-sans text-white/60 leading-[1.9] max-w-lg mb-9"
                    style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)" }}
                  >
                    Kuyash operates a mixed livestock unit — cattle, sheep and goats — on managed pasture in Nasarawa State. Climate-matched breeds, scheduled veterinary oversight, weight-driven harvest.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={content.shopHref}
                      className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-colors duration-200"
                    >
                      Order Livestock Products <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 border border-white/25 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm px-6 py-3.5 rounded-full backdrop-blur-sm transition-colors duration-200"
                    >
                      Wholesale Enquiry
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">Scroll</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4 text-white/25" />
            </motion.div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════
            HERD COMPOSITION STRIP
            Unique to this page — equivalent of water quality strip on fish
        ══════════════════════════════════════ */}
        <section className="bg-dark border-b border-white/5 py-9">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-muted opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-muted" />
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                  Active Herd · Nasarawa State
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
                {HERD.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                  >
                    <p className="font-serif font-bold text-white text-lg leading-none mb-0.5">{item.value}</p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40 mb-0.5">{item.label}</p>
                    <p className="font-sans text-[10px] text-white/25">{item.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            OPERATION OVERVIEW — wide editorial prose
            No portrait split — different from fish and poultry
        ══════════════════════════════════════ */}
        <section className="bg-white py-28 border-b border-border">
          <Container>
            <div className="grid lg:grid-cols-[1fr_1.3fr] gap-20 items-start">

              <motion.div {...FADE_UP}>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-5">The Operation</p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.05] mb-8"
                  style={{ fontSize: "clamp(2rem, 3.2vw, 3rem)" }}
                >
                  Livestock Farming<br />in the Nigerian Savannah
                </h2>
                <p className="font-sans text-sm leading-[1.95] text-gray-500 mb-5 max-w-lg">
                  Most livestock in Nigerian markets is sourced from long-distance trading networks — animals travel days under stress before slaughter, and provenance is unknown. At Kuyash, the animals are raised on our land in Nasarawa State, managed under a documented protocol, and processed at known weights for a predictable, traceable product.
                </p>
                <p className="font-sans text-sm leading-[1.95] text-gray-500 mb-10 max-w-lg">
                  Our unit runs cattle, sheep and goats concurrently on managed pasture. Each species serves a distinct market: cattle for beef and dairy, Yankasa sheep for mutton, Red Sokoto goats for meat and skin. Breeds are selected for performance under Nigerian climate conditions — not for imported-species prestige.
                </p>

                <div className="space-y-3">
                  {[
                    {
                      icon: Users,
                      title: "Three Species, One Integrated Operation",
                      sub: "Cattle, sheep and goats managed concurrently — different markets, shared infrastructure, single-source supply for buyers with multiple needs.",
                    },
                    {
                      icon: Leaf,
                      title: "Pasture on Managed Rotation",
                      sub: "Animals graze on rotated paddocks — not continuous open range. Pasture rest periods maintain grass quality and reduce internal parasite load.",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Traceable from Birth to Dispatch",
                      sub: "Every animal has a health record from intake through dispatch. Vaccination dates, weight records and veterinary assessments are logged per head.",
                    },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: i * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-xl bg-cream border border-border hover:border-brand-border transition-colors"
                      >
                        <div className="shrink-0 w-9 h-9 rounded-lg bg-white border border-brand-border flex items-center justify-center">
                          <Icon className="w-4 h-4 text-brand" />
                        </div>
                        <div>
                          <p className="font-sans text-sm font-semibold text-dark mb-0.5">{item.title}</p>
                          <p className="font-sans text-xs text-gray-500 leading-relaxed">{item.sub}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* right — large editorial image with float chip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.75, ease: EASE }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden border border-border" style={{ aspectRatio: "4/5" }}>
                  <Image
                    src="https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1400"
                    alt="Kuyash livestock herd"
                    fill
                    className="object-cover"
                    sizes="45vw"
                  />
                  {/* location chip */}
                  <div className="absolute top-5 left-5 inline-flex items-center gap-2 bg-dark/70 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/70">Nasarawa State · 56 ha</span>
                  </div>
                </div>

                {/* herd count float */}
                <div className="absolute -bottom-5 -left-5 bg-dark2 border border-white/10 rounded-2xl px-5 py-4 hidden lg:block">
                  <div className="flex items-center gap-4 divide-x divide-white/10">
                    {[
                      { v: "1,300+", l: "Head of Stock" },
                      { v: "3", l: "Species" },
                    ].map((s, i) => (
                      <div key={i} className={i > 0 ? "pl-4" : ""}>
                        <p className="font-serif font-bold text-white text-lg leading-none mb-0.5">{s.v}</p>
                        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            BREED PROFILES — asymmetric editorial grid
            One wide cattle image left + two stacked right
            Completely different from poultry's three equal cards
        ══════════════════════════════════════ */}
        <section className="bg-dark relative overflow-hidden py-28">
          <div className="absolute inset-0 bg-gradient-to-br from-dark2/40 via-transparent to-transparent" />

          <div className="relative z-10">
            <Container>
              <motion.div {...FADE_UP} className="mb-14">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-4">What We Raise</p>
                <h2
                  className="font-serif font-bold text-white leading-[1.05]"
                  style={{ fontSize: "clamp(1.9rem, 3vw, 2.9rem)" }}
                >
                  Three Species.<br />Nigerian Breeds, Every One.
                </h2>
              </motion.div>

              {/* asymmetric grid: cattle wide left, sheep + goat stacked right */}
              <div className="grid lg:grid-cols-[1.5fr_1fr] gap-5">

                {/* cattle — wide */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, ease: EASE }}
                  className="group relative rounded-3xl overflow-hidden border border-white/10"
                  style={{ aspectRatio: "4/5" }}
                >
                  <Image
                    src={BREEDS[0].image}
                    alt="Kuyash cattle herd"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="55vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/50 border border-white/15 rounded-full px-3 py-1 mb-4 inline-block">
                      {BREEDS[0].breed}
                    </span>
                    <h3 className="font-serif font-bold text-white text-2xl mb-3">{BREEDS[0].name}</h3>
                    <p className="font-sans text-xs text-white/60 leading-[1.85] max-w-sm mb-5">{BREEDS[0].description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {BREEDS[0].specs.map((spec, i) => (
                        <div key={i} className="bg-white/8 border border-white/10 rounded-xl px-3 py-2.5">
                          <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted mb-0.5">{spec.label}</p>
                          <p className="font-sans text-xs font-semibold text-white">{spec.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* sheep + goat stacked */}
                <div className="flex flex-col gap-5">
                  {BREEDS.slice(1).map((breed, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.55, delay: i * 0.12, ease: EASE }}
                      className="group relative rounded-3xl overflow-hidden border border-white/10 flex-1"
                      style={{ minHeight: "240px" }}
                    >
                      <Image
                        src={breed.image}
                        alt={`Kuyash ${breed.name}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/35 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/50 border border-white/15 rounded-full px-3 py-1 mb-3 inline-block">
                          {breed.breed}
                        </span>
                        <h3 className="font-serif font-bold text-white text-lg mb-2">{breed.name}</h3>
                        <p className="font-sans text-xs text-white/55 leading-relaxed mb-3 max-w-xs">{breed.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {breed.specs.slice(0, 2).map((spec, j) => (
                            <div key={j} className="bg-white/10 border border-white/10 rounded-lg px-2.5 py-1.5">
                              <p className="font-mono text-[8px] text-muted">{spec.label}: <span className="text-white font-semibold">{spec.value}</span></p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

              </div>
            </Container>
          </div>
        </section>

        {/* ══════════════════════════════════════
            HUSBANDRY ACCORDION — sticky left panel
            Same pattern as fish but content is entirely livestock
        ══════════════════════════════════════ */}
        <section className="bg-cream py-24 border-b border-border">
          <Container>
            <div className="grid lg:grid-cols-[320px_1fr] gap-16">

              <motion.div {...FADE_UP} className="lg:sticky lg:top-28 lg:self-start">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-5">Animal Husbandry</p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}
                >
                  Five Practices.<br />Applied Daily.
                </h2>
                <p className="font-sans text-sm text-gray-500 leading-relaxed mb-8">
                  Livestock quality is determined by the daily decisions made long before slaughter. These are the practices Kuyash follows — from breed intake to cold-chain dispatch.
                </p>
                <div className="inline-flex items-center gap-2 bg-white border border-border rounded-xl px-4 py-3">
                  <Leaf className="w-4 h-4 text-brand" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">Pasture-based system</span>
                </div>
              </motion.div>

              <div className="space-y-3">
                {HUSBANDRY.map((phase, i) => {
                  const Icon = phase.icon;
                  const isOpen = openHusbandry === i;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                        isOpen ? "border-brand-border shadow-sm" : "border-border hover:border-brand-border"
                      }`}
                    >
                      <button
                        onClick={() => setOpenHusbandry(isOpen ? null : i)}
                        className={`w-full flex items-center gap-5 px-6 py-5 text-left ${isOpen ? "bg-brand-bg" : "bg-white"}`}
                      >
                        <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 border ${
                          isOpen ? "bg-brand border-brand" : "bg-cream border-brand-border"
                        }`}>
                          <Icon className={`w-5 h-5 ${isOpen ? "text-white" : "text-brand"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-[9px] text-muted tracking-[0.15em]">{phase.phase}</span>
                            <h3 className="font-serif font-bold text-dark text-base truncate">{phase.title}</h3>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                          <div className="text-right hidden sm:block">
                            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">Cadence</p>
                            <p className="font-sans text-sm font-semibold text-dark">{phase.week}</p>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                        </div>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 pt-2 border-t border-brand-border bg-brand-bg">
                              <p className="font-sans text-sm text-gray-600 leading-relaxed">{phase.description}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            PRODUCTS — four cards with spec grids
            Reworked from the original template cards
        ══════════════════════════════════════ */}
        <section className="bg-white py-24 border-b border-border">
          <Container>
            <motion.div {...FADE_UP} className="mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-4">What We Produce</p>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <h2
                  className="font-serif font-bold text-dark leading-[1.05]"
                  style={{ fontSize: "clamp(1.9rem, 3vw, 2.9rem)" }}
                >
                  Four Products.<br />One Traceable Source.
                </h2>
                <Link
                  href={content.shopHref}
                  className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-brand hover:text-dark transition-colors shrink-0"
                >
                  View All Products <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  label: "Beef",
                  sub: "Live & dressed weight",
                  description: "From our Bunaji × Sokoto Gudali herd. Full-flavoured, well-finished beef from animals raised on managed pasture and harvested at target weight — not date-driven.",
                  specs: [
                    { label: "Liveweight", value: "180 – 280 kg" },
                    { label: "Breed", value: "Bunaji × Gudali" },
                    { label: "System", value: "Pasture-raised" },
                    { label: "Supply", value: "Wholesale & retail" },
                  ],
                  image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?q=80&w=800",
                },
                {
                  label: "Mutton",
                  sub: "Yankasa sheep",
                  description: "Fresh mutton from our Yankasa flock. Lean, well-flavoured and in consistent supply — the most commercially significant sheep breed in northern Nigeria.",
                  specs: [
                    { label: "Market Weight", value: "30 – 50 kg" },
                    { label: "Breed", value: "Yankasa" },
                    { label: "System", value: "Pasture + paddock" },
                    { label: "Supply", value: "Year-round" },
                  ],
                  image: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=800",
                },
                {
                  label: "Goat Meat",
                  sub: "Red Sokoto",
                  description: "Lean, distinctively flavoured goat meat from our Red Sokoto herd. A staple of Nigerian cuisine, raised on browse and pasture, managed for consistent carcass weight.",
                  specs: [
                    { label: "Market Weight", value: "20 – 35 kg" },
                    { label: "Breed", value: "Red Sokoto" },
                    { label: "System", value: "Semi-free browse" },
                    { label: "Supply", value: "Year-round" },
                  ],
                  image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800",
                },
                {
                  label: "Dairy",
                  sub: "Bunaji cow milk",
                  description: "Fresh milk from our Bunaji dairy cows during lactation. Collected daily, unprocessed and available for local distribution. Contact us for seasonal availability.",
                  specs: [
                    { label: "Source", value: "Bunaji cows" },
                    { label: "Collection", value: "Daily" },
                    { label: "Format", value: "Raw, unprocessed" },
                    { label: "Supply", value: "Seasonal" },
                  ],
                  image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=800",
                },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.09, ease: EASE }}
                  className="group bg-cream border border-border hover:border-brand-border rounded-3xl overflow-hidden transition-all duration-300 flex flex-col"
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <Image
                      src={p.image}
                      alt={p.label}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/55 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="font-serif font-bold text-white text-lg leading-tight">{p.label}</p>
                      <p className="font-mono text-[9px] italic text-white/55 mt-0.5">{p.sub}</p>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="font-sans text-xs text-gray-500 leading-relaxed mb-4 flex-1">{p.description}</p>
                    <div className="grid grid-cols-2 gap-1.5 mb-4">
                      {p.specs.map((spec, j) => (
                        <div key={j} className="bg-white rounded-lg px-3 py-2">
                          <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted mb-0.5">{spec.label}</p>
                          <p className="font-sans text-xs font-semibold text-dark leading-tight">{spec.value}</p>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={content.shopHref}
                      className="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white font-semibold text-xs px-5 py-2.5 rounded-full transition-colors w-fit"
                    >
                      Enquire <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            WHY KUYASH — differentiators + benefits
        ══════════════════════════════════════ */}
        <section className="bg-dark2 py-24">
          <Container>
            <div className="grid lg:grid-cols-[1fr_1fr] gap-16">

              <motion.div {...FADE_UP}>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-5">Why Kuyash</p>
                <h2
                  className="font-serif font-bold text-white leading-[1.05] mb-10"
                  style={{ fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}
                >
                  Traceable Animals.<br />Consistent Product.
                </h2>
                <div className="space-y-4">
                  {DIFFERENTIATORS.map((d, i) => {
                    const Icon = d.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                        className="bg-dark border border-white/8 hover:border-brand-border rounded-2xl p-5 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 w-10 h-10 rounded-xl bg-dark2 border border-white/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-muted" />
                          </div>
                          <div>
                            <p className="font-serif font-bold text-white text-sm mb-1">{d.title}</p>
                            <p className="font-sans text-xs text-white/50 leading-relaxed">{d.body}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-5">What You Receive</p>
                <div className="space-y-2.5">
                  {BENEFITS.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.055, ease: EASE }}
                      className="flex items-start gap-3 bg-dark border border-white/8 hover:border-brand-border rounded-xl px-5 py-4 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-brand mt-0.5" />
                      <p className="font-sans text-sm text-white/70 leading-relaxed">{b}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            GALLERY — editorial mosaic
            Different from fish (dark mosaic) and poultry (full-bleed rows)
            Cream background, varied proportions
        ══════════════════════════════════════ */}
        <section className="bg-cream py-24 border-b border-border">
          <Container>
            <div className="flex items-end justify-between mb-12">
              <motion.div {...FADE_UP}>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-3">Inside the Farm</p>
                <h2
                  className="font-serif font-bold text-dark leading-tight"
                  style={{ fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}
                >
                  Life at the Livestock Unit
                </h2>
              </motion.div>
            </div>

            {/* mosaic: 3-col with one tall spanning left */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {/* tall left spanning 2 rows */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative rounded-2xl overflow-hidden border border-border row-span-2"
                style={{ aspectRatio: "3/5", minHeight: "400px" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1400"
                  alt="Kuyash cattle"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300" />
              </motion.div>

              {/* top right two: 4/3 tiles */}
              {[
                { src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1400", alt: "Pasture view" },
                { src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1400", alt: "Farm landscape" },
                { src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1400", alt: "Livestock feeding" },
                { src: "/images/backgrounds/khalahari.jpg", alt: "Kuyash savannah grazing" },
              ].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.06 + i * 0.06 }}
                  className="group relative rounded-2xl overflow-hidden border border-border"
                  style={{ aspectRatio: "4/3" }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width:768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            CTA — centred, full-bleed warm image
            Different from fish's two-column split
        ══════════════════════════════════════ */}
        <section className="relative py-32 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=2070"
            alt=""
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-dark/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-transparent to-dark/50" />

          <div className="relative z-10">
            <Container>
              <div className="max-w-2xl mx-auto text-center">
                <motion.div {...FADE_UP}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-5">Ready to Order</p>
                  <h2
                    className="font-serif font-bold text-white leading-[1.04] mb-6"
                    style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}
                  >
                    Premium Livestock.<br />
                    <span className="text-muted">Direct From Nasarawa.</span>
                  </h2>
                  <p className="font-sans text-white/55 text-sm leading-relaxed mb-10 max-w-lg mx-auto">
                    Whether you are a household buyer, a butchery sourcing weekly supply, or a food processor looking for consistent bulk volumes — our team is ready to discuss your needs. Farm-to-table delivery across our service areas.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
                    <Link
                      href={content.shopHref}
                      className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200"
                    >
                      Shop Livestock Products <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200"
                    >
                      Wholesale Enquiry
                    </Link>
                  </div>

                  {/* contact strip */}
                  <div className="inline-flex flex-wrap justify-center gap-6 border border-white/15 bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-5">
                    {[
                      { label: "Phone", value: "+234 902 899 1521" },
                      { label: "Email", value: "kuyashfarmltd@gmail.com" },
                      { label: "Location", value: "Nasarawa State, Nigeria" },
                    ].map((c, i) => (
                      <div key={i} className="text-center">
                        <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/45 mb-1">{c.label}</p>
                        <p className="font-sans text-sm font-semibold text-white">{c.value}</p>
                      </div>
                    ))}
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
