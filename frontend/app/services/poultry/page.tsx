"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Bird,
  Wheat,
  ShieldCheck,
  Thermometer,
  Truck,
  Heart,
  Wind,
  Syringe,
  Layers,
  FlameKindling,
} from "lucide-react";
import { ease as EASE } from "@/lib/tokens";
import { Container } from "@/components/ui";

const FADE_UP = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: EASE },
} as const;

/* ── Products ── */
const PRODUCTS = [
  {
    label: "Broiler Chicken",
    scientific: "Live & Dressed",
    description:
      "Tender, full-flavoured broilers raised to market weight in controlled housing. Preferred by households, processors and restaurants for consistent size and quality.",
    specs: [
      { label: "Market Weight", value: "1.5 – 2.5kg" },
      { label: "Rearing Period", value: "6 – 8 weeks" },
      { label: "System", value: "Deep litter, ventilated" },
      { label: "Availability", value: "Year-round" },
    ],
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=1400",
    href: "/shop/poultry",
  },
  {
    label: "Table Eggs",
    scientific: "Fresh Layer Eggs",
    description:
      "Fresh eggs from healthy, well-nourished layers. Collected daily, candled and graded before dispatch — consistent shell quality and yolk colour, batch after batch.",
    specs: [
      { label: "Sizes", value: "Medium, Large, Jumbo" },
      { label: "Collection", value: "Daily" },
      { label: "Grading", value: "Candled & sorted" },
      { label: "Supply", value: "Wholesale & retail" },
    ],
    image: "https://images.unsplash.com/photo-1569288052389-dac9b01ac769?q=80&w=1400",
    href: "/shop/poultry",
  },
  {
    label: "Guinea Fowl",
    scientific: "Numida meleagris",
    description:
      "Lean, distinctively flavoured birds popular in Nigerian cuisine. Hardier than broilers, requiring less medication and producing a leaner carcass valued by health-conscious buyers.",
    specs: [
      { label: "Market Weight", value: "1.2 – 1.8kg" },
      { label: "Rearing Period", value: "12 – 16 weeks" },
      { label: "System", value: "Semi-free range" },
      { label: "Availability", value: "Seasonal" },
    ],
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=1400",
    href: "/shop/poultry",
  },
];

/* ── Production journey (zigzag) ── */
const JOURNEY = [
  {
    stage: "Stage 01",
    title: "Day-Old Chick Sourcing",
    body: "Every flock begins with certified day-old chicks sourced from licensed, high-performance hatcheries. Breeds are selected for growth rate, feed conversion and disease resistance under Nigerian conditions. No compromises at the foundation.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200",
    alt: "Day-old chicks at Kuyash",
  },
  {
    stage: "Stage 02",
    title: "Biosecure Housing & Nutrition",
    body: "Birds are housed in ventilated, deep-litter pens designed to minimise stress and disease pressure. Feed is formulated on-site at our integrated feed mill — non-GMO grains, balanced protein, no growth promoters. The same standard from day one to dispatch.",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=1200",
    alt: "Poultry housing at Kuyash",
  },
  {
    stage: "Stage 03",
    title: "Veterinary Supervision",
    body: "Licensed veterinarians conduct regular flock health assessments. Vaccination schedules are strictly maintained. Any sign of respiratory, intestinal or metabolic stress triggers immediate intervention — before it becomes an outbreak.",
    image: "https://images.unsplash.com/photo-1589923188651-268a9765e432?q=80&w=1200",
    alt: "Poultry health management",
  },
  {
    stage: "Stage 04",
    title: "Harvest & Cold-Chain Dispatch",
    body: "Birds are harvested humanely, processed under hygienic conditions and chilled within hours of slaughter. Eggs are collected daily, candled, graded and packed. Delivery runs on a cold chain — freshness is not a marketing claim, it is an operational standard.",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c3?q=80&w=1200",
    alt: "Poultry processing and dispatch",
  },
];

/* ── Differentiators ── */
const DIFFERENTIATORS = [
  {
    icon: Wheat,
    title: "On-Site Feed Mill — Non-GMO",
    body: "We formulate and produce our own poultry feed. No dependency on third-party suppliers, no unknown ingredients. Balanced protein, local grains, no artificial growth promoters.",
  },
  {
    icon: ShieldCheck,
    title: "Biosecurity, Not Just Hygiene",
    body: "Controlled entry, footbaths, dedicated staff per housing block, regular disinfection cycles. Biosecurity is a protocol, not a checkbox. Our disease incidence rate reflects that.",
  },
  {
    icon: Thermometer,
    title: "Vet-Supervised from Day One",
    body: "Licensed veterinarians are on the farm, not on call. Vaccination schedules run to the day. Mortality is tracked per flock. Intervention happens before clinical signs, not after.",
  },
  {
    icon: Truck,
    title: "Cold-Chain Delivery — Same Day",
    body: "Processed birds are chilled and dispatched the same day. Eggs are graded and packed daily. We do not hold perishables overnight. Your order arrives at peak freshness.",
  },
];

/* ── Benefits ── */
const BENEFITS = [
  "50,000-bird layer and broiler unit — one of the largest in Nasarawa State",
  "Day-old chicks sourced only from certified, high-performance hatcheries",
  "Non-GMO feed formulated on-site at our integrated feed mill",
  "Veterinary-supervised health management, zero tolerance for disease",
  "Biosecure housing with controlled ventilation and automated feeders",
  "Cold-chain logistics — products arrive fresh within 24 hours",
  "Broilers, layers and guinea fowl available for wholesale and retail",
  "Full traceability from hatchery intake to customer delivery",
];

/* ── Stats ── */
const STATS = [
  { value: "50,000+", label: "Bird Capacity", sub: "Layers & broilers" },
  { value: "100%", label: "On-Site Feed", sub: "Non-GMO, formulated in-house" },
  { value: "Zero", label: "Antibiotic Growth Promoters", sub: "Natural rearing" },
  { value: "24hr", label: "Cold-Chain Delivery", sub: "Same-day dispatch" },
];

export default function PoultryPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">

        {/* ══════════════════════════════════════
            HERO — editorial split (image right, text left)
            Different from Fisheries' full-bleed bottom-anchor
        ══════════════════════════════════════ */}
        <section className="relative bg-dark2 overflow-hidden min-h-[92vh] flex items-center">
          {/* full-bleed bg image — warm and low opacity */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=2070"
              alt=""
              fill
              className="object-cover object-center opacity-20"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-dark2 via-dark2/95 to-dark2/40" />

          {/* right-side feature image — tablet and up */}
          <div className="absolute right-0 top-0 bottom-0 w-[46%] hidden md:block overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=1200"
              alt="Kuyash poultry farm"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark2 via-dark2/40 to-transparent" />
          </div>

          {/* text — left side */}
          <div className="relative z-10 w-full">
            <Container>
              <div className="max-w-full md:max-w-[52%] lg:max-w-[48%] py-28 md:py-32">

                {/* back nav */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="mb-10"
                >
                  <Link
                    href="/#services"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-sans text-sm text-white backdrop-blur-md hover:bg-white/10 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" /> All Services
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-5">
                    Poultry Farming · Nasarawa State, Nigeria
                  </p>
                  <h1
                    className="font-serif font-bold text-white leading-[1.03] mb-7"
                    style={{ fontSize: "clamp(2.8rem, 5vw, 4.8rem)" }}
                  >
                    Raised Right.<br />
                    <span className="text-gold">Delivered Fresh.</span>
                  </h1>
                  <p
                    className="font-sans text-white/60 leading-[1.85] mb-10 max-w-md"
                    style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)" }}
                  >
                    Kuyash operates a 50,000-bird poultry unit producing broilers, table eggs and guinea fowl — raised in biosecure housing, fed from our own on-site mill and delivered cold-chain the same day.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/shop/poultry"
                      className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-dark font-semibold text-sm px-6 py-3.5 rounded-full transition-colors duration-200"
                    >
                      Shop Poultry <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 border border-white/25 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm px-6 py-3.5 rounded-full backdrop-blur-sm transition-colors duration-200"
                    >
                      Wholesale Enquiry
                    </Link>
                  </div>
                </motion.div>

                {/* quick stats row */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
                  className="mt-16 flex flex-wrap gap-6 border-t border-white/10 pt-8"
                >
                  {[
                    { v: "50,000+", l: "Bird Capacity" },
                    { v: "3", l: "Product Types" },
                    { v: "100%", l: "In-House Feed" },
                  ].map((s, i) => (
                    <div key={i}>
                      <p className="font-serif font-bold text-white text-xl leading-none mb-0.5">{s.v}</p>
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">{s.l}</p>
                    </div>
                  ))}
                </motion.div>

              </div>
            </Container>
          </div>
        </section>

        {/* ══════════════════════════════════════
            OVERVIEW — full-width editorial prose
            Different from Fisheries: no portrait image left,
            instead a wide text panel with a secondary inset
        ══════════════════════════════════════ */}
        <section className="bg-white py-24 border-b border-border">
          <Container>
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-20 items-start">

              <motion.div {...FADE_UP}>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-5">The Operation</p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.05] mb-8"
                  style={{ fontSize: "clamp(2rem, 3.2vw, 3rem)" }}
                >
                  Poultry Production<br />at Commercial Scale
                </h2>
                <p className="font-sans text-sm leading-[1.9] text-gray-500 mb-5 max-w-xl">
                  Most poultry sold in Nigerian markets comes from fragmented, unmonitored backyard operations. The birds are stressed, the feed is inconsistent, and by the time the product reaches a buyer, its provenance is unknown. At Kuyash, we do it differently — not because it is fashionable, but because product consistency and biosecurity are non-negotiable at our scale.
                </p>
                <p className="font-sans text-sm leading-[1.9] text-gray-500 mb-10 max-w-xl">
                  Our 50,000-bird unit in Nasarawa State runs layer, broiler and guinea fowl production concurrently — in controlled, biosecure housing, fed from our own on-site feed mill using non-GMO grains and balanced nutrition. Every flock is under licensed veterinary supervision from intake to dispatch. What you buy from Kuyash is traceable, consistent and genuinely fresh.
                </p>

                {/* three horizontal feature rows */}
                <div className="space-y-3">
                  {[
                    {
                      icon: Bird,
                      title: "Three Product Lines, One Operation",
                      sub: "Broilers, table eggs and guinea fowl managed concurrently — giving buyers a single-source supply for multiple product needs.",
                    },
                    {
                      icon: Wheat,
                      title: "On-Site Feed Mill",
                      sub: "We manufacture our own feed. Non-GMO grain base, balanced protein ratios, zero growth promoters. The same batch every cycle.",
                    },
                    {
                      icon: Heart,
                      title: "Animal Welfare as Operational Policy",
                      sub: "Stocking density, ventilation, light cycles and litter management are all managed to minimise stress. Healthier birds produce better product.",
                    },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.09, ease: EASE }}
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

              {/* right — image + operations at a glance panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="hidden lg:flex flex-col gap-4"
              >
                <div className="relative rounded-3xl overflow-hidden border border-border" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=1200"
                    alt="Kuyash poultry house interior"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* operations spec panel — poultry-specific */}
                <div className="bg-dark2 border border-white/8 rounded-2xl px-6 py-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted mb-4">Operations at a Glance</p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {[
                      { label: "Bird Capacity", value: "50,000+" },
                      { label: "Feed Source", value: "On-site mill" },
                      { label: "Products", value: "Broilers · Eggs · Guinea Fowl" },
                      { label: "Vet Oversight", value: "Licensed, resident" },
                      { label: "Cold-Chain", value: "Same-day dispatch" },
                      { label: "GMO Feed", value: "None" },
                    ].map((item, i) => (
                      <div key={i} className="border-b border-white/6 pb-2.5">
                        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/35 mb-0.5">{item.label}</p>
                        <p className="font-sans text-xs font-semibold text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            PRODUCTS — three visible cards, all simultaneously
            Genuinely different from Fisheries tab-switcher
        ══════════════════════════════════════ */}
        <section className="bg-cream py-24 border-b border-border">
          <Container>
            <motion.div {...FADE_UP} className="mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-4">What We Produce</p>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <h2
                  className="font-serif font-bold text-dark leading-[1.05]"
                  style={{ fontSize: "clamp(1.9rem, 3vw, 2.9rem)" }}
                >
                  Three Products.<br />One Farm Standard.
                </h2>
                <Link
                  href="/shop/poultry"
                  className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-brand hover:text-dark transition-colors shrink-0"
                >
                  View All Products <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-5">
              {PRODUCTS.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                  className="group bg-white border border-border hover:border-brand-border rounded-3xl overflow-hidden transition-all duration-300 flex flex-col"
                >
                  {/* image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <Image
                      src={p.image}
                      alt={p.label}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width:640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="font-serif font-bold text-white text-lg leading-tight">{p.label}</p>
                      <p className="font-mono text-[9px] italic text-white/55 mt-0.5">{p.scientific}</p>
                    </div>
                  </div>
                  {/* body */}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="font-sans text-xs text-gray-500 leading-relaxed mb-5 flex-1">{p.description}</p>
                    <div className="grid grid-cols-2 gap-2 mb-5">
                      {p.specs.slice(0, 4).map((spec, j) => (
                        <div key={j} className="bg-cream rounded-lg px-3 py-2.5">
                          <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted mb-0.5">{spec.label}</p>
                          <p className="font-sans text-xs font-semibold text-dark leading-tight">{spec.value}</p>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={p.href}
                      className="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white font-semibold text-xs px-5 py-2.5 rounded-full transition-colors w-fit"
                    >
                      Order {p.label} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            OPERATIONS STRIP — compact dark band
            Poultry-specific, not a full section
        ══════════════════════════════════════ */}
        <section className="bg-dark border-b border-white/5 py-9">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 shrink-0">
                Kuyash Poultry Unit · Nasarawa State
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
                {STATS.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                  >
                    <p className="font-serif font-bold text-white text-lg leading-none mb-1">{s.value}</p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            PRODUCTION JOURNEY — zigzag narrative
            Completely different from Fisheries' horizontal timeline
        ══════════════════════════════════════ */}
        <section className="bg-white py-24 border-b border-border">
          <Container>
            <motion.div {...FADE_UP} className="mb-16">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-4">Production Journey</p>
              <h2
                className="font-serif font-bold text-dark leading-[1.05]"
                style={{ fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}
              >
                How Every Bird Gets<br />to Your Table
              </h2>
            </motion.div>

            <div className="space-y-20">
              {JOURNEY.map((step, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.65, ease: EASE }}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:[direction:rtl]" : ""}`}
                  >
                    {/* image */}
                    <div className={`relative rounded-3xl overflow-hidden border border-border ${!isEven ? "lg:[direction:ltr]" : ""}`} style={{ aspectRatio: "16/10" }}>
                      <Image
                        src={step.image}
                        alt={step.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width:1024px) 100vw, 50vw"
                      />
                      <div className="absolute top-5 left-5">
                        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white bg-dark/70 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5">
                          {step.stage}
                        </span>
                      </div>
                    </div>

                    {/* text */}
                    <div className={!isEven ? "lg:[direction:ltr]" : ""}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-3">{step.stage}</p>
                      <h3
                        className="font-serif font-bold text-dark leading-tight mb-5"
                        style={{ fontSize: "clamp(1.5rem, 2.2vw, 2rem)" }}
                      >
                        {step.title}
                      </h3>
                      <p className="font-sans text-sm text-gray-500 leading-[1.9]">{step.body}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            FLOCK HEALTH PROTOCOL
            Uniquely poultry — no other Kuyash service has this
        ══════════════════════════════════════ */}
        <section className="bg-dark2 py-20">
          <Container>
            <div className="grid lg:grid-cols-[1fr_1.6fr] gap-14 items-center">

              <motion.div {...FADE_UP}>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-5">Flock Health Protocol</p>
                <h2
                  className="font-serif font-bold text-white leading-[1.05] mb-5"
                  style={{ fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}
                >
                  Biosecurity<br />Is a System,<br />Not a Checklist.
                </h2>
                <p className="font-sans text-sm text-white/50 leading-relaxed max-w-sm">
                  Every housing block runs under a documented biosecurity protocol. These are the parameters we maintain and monitor — not aspirational targets, operational minimums.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: Wind,
                    label: "Ventilation",
                    value: "Controlled",
                    detail: "Automated fans maintain optimal air exchange rates per housing block. Ammonia levels monitored daily.",
                  },
                  {
                    icon: Layers,
                    label: "Stocking Density",
                    value: "Below Max",
                    detail: "We stock below Nigerian NAFDAC maximums. Less stress, lower mortality, better feed conversion.",
                  },
                  {
                    icon: Syringe,
                    label: "Vaccination Schedule",
                    value: "Day-precise",
                    detail: "Newcastle, Gumboro, Marek's and IB vaccines administered on a fixed, vet-verified schedule per breed.",
                  },
                  {
                    icon: FlameKindling,
                    label: "Brooding Temperature",
                    value: "32–34°C",
                    detail: "Chick brooders maintained at exact temperature gradients from day one. Mortality in the first week is the truest quality indicator.",
                  },
                  {
                    icon: ShieldCheck,
                    label: "Disinfection Cycle",
                    value: "Per flock",
                    detail: "Full house washdown and disinfection between every flock. No bird enters a house that has not completed a full biosecure cleanout.",
                  },
                  {
                    icon: Thermometer,
                    label: "Mortality Tracking",
                    value: "Daily, per flock",
                    detail: "Every death is recorded and reviewed. Patterns trigger immediate veterinary investigation before the problem spreads.",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}
                      className="group bg-dark border border-white/8 hover:border-brand-border rounded-2xl p-5 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-9 h-9 rounded-xl bg-dark2 border border-white/10 group-hover:bg-brand group-hover:border-brand flex items-center justify-center transition-colors duration-200">
                          <Icon className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-brand border border-brand-border rounded-full px-2.5 py-1">
                          {item.value}
                        </span>
                      </div>
                      <p className="font-sans text-xs font-semibold text-white mb-1">{item.label}</p>
                      <p className="font-mono text-[10px] text-white/35 leading-relaxed">{item.detail}</p>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            WHY KUYASH — differentiators + benefits
            Large claim cards (not icon grids)
        ══════════════════════════════════════ */}
        <section className="bg-cream py-24 border-b border-border">
          <Container>
            <div className="grid lg:grid-cols-[1fr_1fr] gap-16">

              <motion.div {...FADE_UP}>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-5">Why Kuyash</p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.05] mb-10"
                  style={{ fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}
                >
                  Not the Cheapest.<br />The Most Reliable.
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
                        className="bg-white border border-border hover:border-brand-border rounded-2xl p-5 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 w-10 h-10 rounded-xl bg-cream border border-brand-border flex items-center justify-center">
                            <Icon className="w-5 h-5 text-brand" />
                          </div>
                          <div>
                            <p className="font-serif font-bold text-dark text-sm mb-1">{d.title}</p>
                            <p className="font-sans text-xs text-gray-500 leading-relaxed">{d.body}</p>
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
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-5">What You Get</p>
                <div className="space-y-2.5">
                  {BENEFITS.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.055, ease: EASE }}
                      className="flex items-start gap-3 bg-white border border-border hover:border-brand-border rounded-xl px-5 py-4 transition-colors duration-150"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-brand mt-0.5" />
                      <p className="font-sans text-sm text-gray-600 leading-relaxed">{b}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            GALLERY — editorial full-width strip
            Different from Fisheries' mosaic grid
        ══════════════════════════════════════ */}
        <section className="bg-white py-24 border-b border-border">
          <Container>
            <div className="flex items-end justify-between mb-10">
              <motion.div {...FADE_UP}>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-3">Inside the Farm</p>
                <h2
                  className="font-serif font-bold text-dark leading-tight"
                  style={{ fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}
                >
                  Life at the Poultry Unit
                </h2>
              </motion.div>
            </div>
          </Container>

          {/* editorial mosaic — varied ratios, full-bleed */}
          {/* Row 1: one wide landscape spanning 2 cols + one portrait */}
          <div className="grid grid-cols-3 gap-1">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative col-span-2 overflow-hidden aspect-[16/9]"
            >
              <Image
                src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=1600"
                alt="Kuyash poultry house"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="66vw"
              />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="group relative overflow-hidden aspect-[9/16] sm:aspect-auto"
              style={{ aspectRatio: "9/16" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=800"
                alt="Kuyash broiler chicken"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300" />
            </motion.div>
          </div>
          {/* Row 2: one portrait + one square + one portrait */}
          <div className="grid grid-cols-3 gap-1 mt-1">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative overflow-hidden aspect-[4/3]"
            >
              <Image
                src="https://images.unsplash.com/photo-1569288052389-dac9b01ac769?q=80&w=800"
                alt="Fresh eggs from Kuyash"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="group relative overflow-hidden aspect-[4/3]"
            >
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800"
                alt="Day-old chicks at Kuyash"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="group relative overflow-hidden aspect-[4/3]"
            >
              <Image
                src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=800"
                alt="Guinea fowl at Kuyash"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300" />
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FAQ — brief accordion
        ══════════════════════════════════════ */}
        <section className="bg-cream py-20 border-b border-border">
          <Container>
            <div className="grid lg:grid-cols-[320px_1fr] gap-14">

              <motion.div {...FADE_UP}>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-4">Common Questions</p>
                <h2
                  className="font-serif font-bold text-dark leading-tight mb-5"
                  style={{ fontSize: "clamp(1.7rem, 2.5vw, 2.4rem)" }}
                >
                  Before You Order
                </h2>
                <p className="font-sans text-sm text-gray-500 leading-relaxed">
                  Answers to what buyers and distributors most commonly ask about our poultry operation.
                </p>
              </motion.div>

              <div className="space-y-3">
                {[
                  {
                    q: "Do you sell live birds or dressed birds only?",
                    a: "We supply both — live birds for buyers with their own processing, and dressed birds chilled and ready for retail or food service. Contact us to specify your preferred format when ordering.",
                  },
                  {
                    q: "What is the minimum order quantity for wholesale?",
                    a: "Wholesale pricing applies from 50 birds (broilers) or 10 crates of eggs. For guinea fowl, minimums are 20 birds. Reach out via the enquiry form or call us directly to discuss your volume requirements.",
                  },
                  {
                    q: "Are your birds antibiotic-free?",
                    a: "We do not use antibiotic growth promoters at any stage. Therapeutic antibiotics are administered only under veterinary prescription when medically necessary, and withdrawal periods are strictly observed before dispatch.",
                  },
                  {
                    q: "How do you handle delivery?",
                    a: "Same-day cold-chain delivery for processed birds and eggs. We cover our primary service areas in Nasarawa State and surrounding regions. Contact us to confirm delivery coverage for your location.",
                  },
                ].map((item, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}
                      className={`border rounded-2xl overflow-hidden transition-colors duration-200 ${isOpen ? "border-brand-border" : "border-border hover:border-brand-border"}`}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className={`w-full flex items-center justify-between gap-5 px-6 py-5 text-left ${isOpen ? "bg-brand-bg" : "bg-white"}`}
                      >
                        <p className="font-serif font-bold text-dark text-sm">{item.q}</p>
                        <ChevronDown className={`w-4 h-4 text-muted shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
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
                              <p className="font-sans text-sm text-gray-600 leading-relaxed">{item.a}</p>
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
            CTA — centred with full-bleed warm image
            Different from Fisheries' two-column split
        ══════════════════════════════════════ */}
        <section className="relative py-32 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=2070"
            alt=""
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-dark/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-transparent to-dark/60" />

          <div className="relative z-10">
            <Container>
              <div className="max-w-2xl mx-auto text-center">
                <motion.div {...FADE_UP}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-5">Ready to Order</p>
                  <h2
                    className="font-serif font-bold text-white leading-[1.04] mb-6"
                    style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}
                  >
                    Fresh Poultry.<br />
                    <span className="text-gold">Direct From Our Farm.</span>
                  </h2>
                  <p className="font-sans text-white/55 text-sm leading-relaxed mb-10 max-w-lg mx-auto">
                    Whether you are a household buyer, a restaurant sourcing weekly supply, or a distributor looking for a reliable bulk supplier — we are ready to discuss your requirements. Farm-to-table delivery across our service areas.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/shop/poultry"
                      className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-dark font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200"
                    >
                      Shop Poultry Products <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200"
                    >
                      Wholesale Enquiry
                    </Link>
                  </div>

                  {/* contact strip */}
                  <div className="mt-14 inline-flex flex-wrap justify-center gap-6 border border-white/15 bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-5">
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
