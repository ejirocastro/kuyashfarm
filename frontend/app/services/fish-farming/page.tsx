"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SERVICES } from "@/lib/constants";
import { SERVICE_CONTENT } from "@/lib/data/services";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Droplets,
  Fish,
  Thermometer,
  Waves,
  Activity,
  CheckCircle2,
  PlayCircle,
  MapPin,
  PackageCheck,
} from "lucide-react";
import { ease as EASE } from "@/lib/tokens";
import { Container } from "@/components/ui";

const SLUG = "fish-farming";

const FADE_UP = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: EASE },
} as const;

/* ── Animated counter ── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ── Water quality live indicator ── */
const WATER_PARAMS = [
  { label: "Dissolved O₂", value: "7.2 mg/L", status: "optimal", bar: 88 },
  { label: "pH Level", value: "7.1", status: "optimal", bar: 92 },
  { label: "Temperature", value: "27°C", status: "optimal", bar: 78 },
  { label: "Ammonia", value: "0.02 mg/L", status: "safe", bar: 20 },
];

/* ── Species data ── */
const SPECIES = [
  {
    name: "African Catfish",
    scientific: "Clarias gariepinus",
    image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?q=80&w=1400",
    description:
      "Nigeria's most commercially important freshwater fish. Our catfish are pond-raised in earthen and concrete tanks, reaching 800g–1.5kg in 5–6 months. Firm, full-flavoured flesh preferred across Nigerian households, processors and food service.",
    specs: [
      { label: "Market Weight", value: "800g – 1.5kg" },
      { label: "Growth Cycle", value: "5–6 months" },
      { label: "System", value: "Earthen & concrete ponds" },
      { label: "Availability", value: "Year-round" },
    ],
    accent: "from-dark2/90",
  },
  {
    name: "Nile Tilapia",
    scientific: "Oreochromis niloticus",
    image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=1400",
    description:
      "The world's second most farmed fish. Our tilapia are raised in RAS tanks and earthen ponds — fast-growing, disease-resistant and mild-flavoured. Preferred by restaurants, processors and health-conscious consumers for its lean, white flesh.",
    specs: [
      { label: "Market Weight", value: "400g – 900g" },
      { label: "Growth Cycle", value: "4–5 months" },
      { label: "System", value: "RAS + earthen ponds" },
      { label: "Availability", value: "Year-round" },
    ],
    accent: "from-dark/90",
  },
];


/* Week annotations aligned with farmingProcess phase indices */
const PHASE_WEEKS = ["Week 1–2", "Week 3", "Week 4–20", "Week 20–24", "Week 24"];

export default function FishFarmingPage() {
  const [showVideo, setShowVideo] = useState(false);
  const [openProcess, setOpenProcess] = useState<number | null>(0);
  const [activeSpecies, setActiveSpecies] = useState(0);

  const service = SERVICES.find((s) => s.slug === SLUG)!;
  const content = SERVICE_CONTENT[SLUG];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">

        {/* ══════════════════════════════════════
            HERO — full-bleed, bottom-anchored
        ══════════════════════════════════════ */}
        <section className="relative h-screen min-h-[640px] overflow-hidden bg-dark2">
          <AnimatePresence mode="wait">
            {showVideo && content.heroVideo ? (
              <motion.video key="video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }} autoPlay loop muted playsInline
                className="absolute inset-0 h-full w-full object-cover">
                <source src={content.heroVideo} type="video/mp4" />
              </motion.video>
            ) : (
              <motion.div key="img" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }} className="absolute inset-0">
                <Image src={content.heroImage} alt="Kuyash Fisheries" fill className="object-cover scale-105" priority />
              </motion.div>
            )}
          </AnimatePresence>

          {/* layered gradient: show water image above, dark below for text */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/55 to-transparent" />
          {/* subtle vignette on sides */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark/30 via-transparent to-dark/30" />

          {/* back nav */}
          <div className="absolute top-24 left-0 right-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link href="/#services"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-sans text-sm text-white backdrop-blur-md hover:bg-white/10 transition-colors">
                <ArrowLeft className="h-4 w-4" /> All Services
              </Link>
            </div>
          </div>

          {/* hero body — bottom anchored, two columns */}
          <div className="absolute inset-x-0 bottom-0 z-10 pb-14 pt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_380px] gap-8 lg:gap-10 items-end">

                {/* headline */}
                <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.1, ease: EASE }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-5">
                    Fisheries &amp; Aquaculture · Nasarawa State, Nigeria
                  </p>
                  <h1 className="font-serif font-bold text-white leading-[1.03] mb-6"
                    style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}>
                    Raised in Clean Water.<br />
                    <span className="text-white/60">Delivered Fresh.</span>
                  </h1>
                  <p className="font-sans text-white/65 leading-relaxed max-w-lg mb-8"
                    style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)" }}>
                    Kuyash operates commercial catfish and tilapia production using recirculating aquaculture systems and earthen pond farming — producing 10,000+ fish per cycle, antibiotic-free, year-round.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href={content.shopHref}
                      className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-colors duration-200">
                      Order Fish <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href="/contact"
                      className="inline-flex items-center gap-2 border border-white/25 bg-white/8 hover:bg-white/14 text-white font-semibold text-sm px-6 py-3.5 rounded-full backdrop-blur-sm transition-colors duration-200">
                      Bulk Supply Enquiry
                    </Link>
                    {content.heroVideo && (
                      <button onClick={() => setShowVideo(!showVideo)}
                        className="inline-flex items-center gap-2 border border-white/15 text-white/70 hover:text-white font-semibold text-sm px-5 py-3.5 rounded-full transition-colors duration-200">
                        <PlayCircle className="h-4 w-4" />
                        {showVideo ? "View Photo" : "Watch Video"}
                      </button>
                    )}
                  </div>
                </motion.div>

                {/* stats panel */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.35, ease: EASE }}
                  className="bg-dark/55 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-white/8">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                      </span>
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
                        Current Production Status
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-y divide-white/8">
                    {[
                      { icon: Fish, value: "10,000+", label: "Fish / Cycle" },
                      { icon: Droplets, value: "95%", label: "Water Recycled" },
                      { icon: Thermometer, value: "100%", label: "Antibiotic-Free" },
                      { icon: Waves, value: "30%", label: "Less Feed Waste" },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div key={i} className="px-5 py-5">
                          <Icon className="w-4 h-4 text-muted mb-2.5" />
                          <p className="font-serif font-bold text-white text-lg leading-none mb-1">{item.value}</p>
                          <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/40">{item.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

              </div>
            </div>
          </div>

          {/* scroll cue */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">Scroll</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
              <ChevronDown className="w-4 h-4 text-white/25" />
            </motion.div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════
            WATER QUALITY PARAMETERS
            Unique to this page — no other service has this
        ══════════════════════════════════════ */}
        <section className="bg-dark border-b border-white/5 py-10">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                  Monitored Parameters · RAS Production System
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
                {WATER_PARAMS.map((param, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="text-center sm:text-left">
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/35 mb-1">{param.label}</p>
                    <p className="font-sans font-semibold text-white text-sm mb-1.5">{param.value}</p>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden w-20 mx-auto sm:mx-0">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${param.bar}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: EASE }}
                        className={`h-full rounded-full ${param.status === "optimal" ? "bg-green-400" : "bg-muted"}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            OPERATION OVERVIEW — editorial split
        ══════════════════════════════════════ */}
        <section className="bg-white py-28 border-b border-border">
          <Container>
            <div className="grid lg:grid-cols-[1fr_1.15fr] gap-20 items-center">

              <motion.div
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.75, ease: EASE }}
                className="relative rounded-3xl overflow-hidden border border-border"
                style={{ aspectRatio: "3/4" }}>
                <Image src="https://images.unsplash.com/photo-1497290756760-23ac55edf36f?q=80&w=2067"
                  alt="Kuyash aquaculture operation" fill className="object-cover" />
                {/* location chip */}
                <div className="absolute top-5 left-5 inline-flex items-center gap-2 bg-dark/75 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                  <MapPin className="w-3 h-3 text-muted" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/70">Nasarawa State</span>
                </div>
                {/* production count chip */}
                <div className="absolute bottom-5 left-5 right-5 bg-dark/80 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4">
                  <div className="grid grid-cols-3 gap-4 divide-x divide-white/10">
                    {[
                      { label: "Fish / Cycle", num: 10000, suffix: "+" },
                      { label: "Species", num: 2, suffix: "" },
                      { label: "Water Recycled", num: 95, suffix: "%" },
                    ].map((item, i) => (
                      <div key={i} className={i > 0 ? "pl-4" : ""}>
                        <p className="font-serif font-bold text-white text-lg leading-none mb-0.5">
                          <Counter to={item.num} suffix={item.suffix} />
                        </p>
                        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div {...FADE_UP}>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-5">Our Operation</p>
                <h2 className="font-serif font-bold text-dark leading-[1.06] mb-7"
                  style={{ fontSize: "clamp(2rem, 3.2vw, 3rem)" }}>
                  Commercial Aquaculture<br />Built for Nigerian Markets
                </h2>
                <p className="font-sans text-sm leading-[1.85] text-gray-500 mb-5 max-w-lg">
                  Most fish sold in Nigerian markets travel hours in open air before reaching a buyer. At Kuyash, the journey is different — from pond to cold-chain within two hours, dispatched the same day. That gap in freshness is not marketing; it is what recirculating aquaculture systems and controlled indoor production actually make possible.
                </p>
                <p className="font-sans text-sm leading-[1.85] text-gray-500 mb-8 max-w-lg">
                  Our operation in Nasarawa State runs catfish and tilapia concurrently across earthen ponds and RAS tanks — 10,000+ fish per cycle, year-round, without antibiotics or growth hormones. Every parameter that affects fish health is tracked continuously: dissolved oxygen, pH, temperature, ammonia. The fish do not wait for a manual check.
                </p>
                {/* distinguishing pillars */}
                <div className="space-y-4 mb-10">
                  {[
                    {
                      icon: Waves,
                      title: "Recirculating Aquaculture Systems",
                      sub: "Closed-loop RAS technology recycles 95% of water — producing fish year-round regardless of season or rainfall.",
                    },
                    {
                      icon: Activity,
                      title: "IoT Water Quality Monitoring",
                      sub: "Dissolved oxygen, pH, temperature and ammonia tracked continuously. Automated alerts prevent fish stress before it starts.",
                    },
                    {
                      icon: PackageCheck,
                      title: "Same-Day Cold-Chain Delivery",
                      sub: "Fish are chilled within 2 hours of harvest and dispatched the same day — maximising freshness at your location.",
                    },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div key={i}
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: i * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-xl bg-cream border border-border hover:border-brand-border transition-colors">
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
                <Link href="/contact"
                  className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-brand hover:text-dark transition-colors">
                  Enquire about bulk supply <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            SPECIES — full-bleed tab-switcher
        ══════════════════════════════════════ */}
        <section className="bg-dark relative overflow-hidden">
          {/* background image fades per species */}
          <AnimatePresence mode="wait">
            <motion.div key={activeSpecies} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }} className="absolute inset-0">
              <Image src={SPECIES[activeSpecies].image} alt={SPECIES[activeSpecies].name}
                fill className="object-cover opacity-25" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-dark/50" />

          <div className="relative z-10 py-28">
            <Container>
              <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center">

                {/* left — species selector + detail */}
                <motion.div {...FADE_UP}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-6">What We Raise</p>
                  <h2 className="font-serif font-bold text-white leading-tight mb-10"
                    style={{ fontSize: "clamp(1.9rem, 3vw, 2.9rem)" }}>
                    Two Species.<br />One Standard of Quality.
                  </h2>

                  {/* tab buttons */}
                  <div className="flex gap-3 mb-10">
                    {SPECIES.map((s, i) => (
                      <button key={i} onClick={() => setActiveSpecies(i)}
                        className={`font-sans font-semibold text-sm px-5 py-2.5 rounded-full border transition-all duration-200 ${
                          activeSpecies === i
                            ? "bg-brand border-brand text-white"
                            : "border-white/20 text-white/60 hover:text-white hover:border-white/35"
                        }`}>
                        {s.name}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div key={activeSpecies}
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: EASE }}>
                      <p className="font-mono text-[10px] italic text-muted mb-3 tracking-wide">
                        {SPECIES[activeSpecies].scientific}
                      </p>
                      <p className="font-sans text-sm text-white/65 leading-[1.9] mb-8 max-w-lg">
                        {SPECIES[activeSpecies].description}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {SPECIES[activeSpecies].specs.map((spec, i) => (
                          <div key={i} className="bg-white/5 border border-white/8 rounded-xl px-4 py-3.5">
                            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted mb-1">{spec.label}</p>
                            <p className="font-sans text-sm font-semibold text-white">{spec.value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-8">
                        <Link href={content.shopHref}
                          className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors">
                          Order {SPECIES[activeSpecies].name} <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* right — species image */}
                <AnimatePresence mode="wait">
                  <motion.div key={activeSpecies}
                    initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="relative rounded-3xl overflow-hidden border border-white/10 hidden lg:block"
                    style={{ aspectRatio: "4/5" }}>
                    <Image src={SPECIES[activeSpecies].image} alt={SPECIES[activeSpecies].name}
                      fill className="object-cover" sizes="45vw" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${SPECIES[activeSpecies].accent} to-transparent opacity-60`} />
                    <div className="absolute bottom-6 left-6">
                      <p className="font-serif font-bold text-white text-2xl">{SPECIES[activeSpecies].name}</p>
                      <p className="font-mono text-[10px] italic text-white/50 mt-0.5">{SPECIES[activeSpecies].scientific}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>
            </Container>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FARMING PROCESS — sticky accordion
        ══════════════════════════════════════ */}
        <section className="bg-white py-24 border-b border-border">
          <Container>
            <div className="grid lg:grid-cols-[320px_1fr] gap-16">

              <motion.div {...FADE_UP} className="lg:sticky lg:top-28 lg:self-start">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-5">How We Farm</p>
                <h2 className="font-serif font-bold text-dark leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}>
                  Five Stages.<br />Zero Shortcuts.
                </h2>
                <p className="font-sans text-sm text-gray-500 leading-relaxed mb-8">
                  Every cycle follows a disciplined, repeatable process — from pond preparation to cold-chain dispatch.
                </p>
                <div className="inline-flex items-center gap-2 bg-cream border border-border rounded-xl px-4 py-3">
                  <Activity className="w-4 h-4 text-brand" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">24-week cycle</span>
                </div>
              </motion.div>

              <div className="space-y-3">
                {content.farmingProcess.map((phase, i) => {
                  const Icon = phase.icon;
                  const isOpen = openProcess === i;
                  return (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                        isOpen ? "border-brand-border shadow-sm" : "border-border hover:border-brand-border"
                      }`}>
                      <button onClick={() => setOpenProcess(isOpen ? null : i)}
                        className={`w-full flex items-center gap-5 px-6 py-5 text-left ${isOpen ? "bg-brand-bg" : "bg-cream"}`}>
                        <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 border ${
                          isOpen ? "bg-brand border-brand" : "bg-white border-brand-border"
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
                            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">Timeline</p>
                            <p className="font-sans text-sm font-semibold text-dark">{PHASE_WEEKS[i]}</p>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                        </div>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: EASE }}
                            className="overflow-hidden">
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
            TECHNOLOGY — bento grid
        ══════════════════════════════════════ */}
        <section className="bg-dark2 py-24">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-end mb-14">
              <motion.div {...FADE_UP}>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-4">Technology</p>
                <h2 className="font-serif font-bold text-white leading-tight"
                  style={{ fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}>
                  Systems That Keep<br />Every Fish Thriving
                </h2>
              </motion.div>
              <motion.p {...FADE_UP} className="font-sans text-sm text-white/50 leading-relaxed max-w-md lg:ml-auto">
                From sensor-driven water management to AI-powered yield forecasting — Kuyash uses precision aquaculture technology to deliver consistent, traceable fish at scale.
              </motion.p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {content.technology.map((tech, i) => {
                const Icon = tech.icon;
                const isLarge = i === 0;
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.09, ease: EASE }}
                    className={`group bg-dark border border-white/8 hover:border-brand-border rounded-2xl p-7 transition-all duration-300 ${isLarge ? "lg:col-span-2" : ""}`}>
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-11 h-11 rounded-xl bg-brand-bg border border-brand-border group-hover:bg-brand group-hover:border-brand flex items-center justify-center transition-colors duration-200">
                        <Icon className="w-5 h-5 text-brand group-hover:text-white transition-colors" />
                      </div>
                      {tech.metrics && (
                        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-brand border border-brand-border rounded-full px-3 py-1">
                          {tech.metrics}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif font-bold text-white text-lg mb-2">{tech.title}</h3>
                    <p className="font-sans text-sm text-white/50 leading-relaxed">{tech.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            CREDIBILITY — why kuyash + benefits
        ══════════════════════════════════════ */}
        <section className="bg-white py-24 border-b border-border">
          <Container>
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16">

              <motion.div {...FADE_UP}>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-5">Why Kuyash</p>
                <h2 className="font-serif font-bold text-dark leading-[1.06] mb-10"
                  style={{ fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}>
                  Quality You Can<br />Trace Back to the Pond
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      icon: Droplets,
                      title: "95% Water Recycled — Not Discharged",
                      description: "Our RAS closed loop recirculates nearly all water through biological filters. We are not drawing and dumping. That is what makes year-round production possible in a water-stressed region.",
                    },
                    {
                      icon: Thermometer,
                      title: "Zero Antibiotics. No Exceptions.",
                      description: "We control disease through water quality and stocking density — not medication. Every batch leaves the farm antibiotic-free and verifiable. No compromise for yield.",
                    },
                    {
                      icon: Activity,
                      title: "IoT Monitoring, Not Manual Spot Checks",
                      description: "Dissolved oxygen, pH, ammonia and temperature are tracked 24/7 by sensors. Automated alerts escalate before fish experience stress — not after.",
                    },
                    {
                      icon: PackageCheck,
                      title: "Chilled Within 2 Hours of Harvest",
                      description: "Fish enter cold chain before the temperature of handling can degrade flesh quality. Same-day dispatch. This is what farm-fresh actually means.",
                    },
                  ].map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div key={i}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className="group bg-cream border border-border hover:border-brand-border rounded-2xl p-5 transition-all duration-200">
                        <div className="w-9 h-9 rounded-xl bg-white border border-brand-border group-hover:bg-brand group-hover:border-brand flex items-center justify-center mb-4 transition-colors duration-200">
                          <Icon className="w-4 h-4 text-brand group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="font-serif font-bold text-dark text-sm mb-1.5">{feature.title}</h3>
                        <p className="font-sans text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-5">What You Receive</p>
                <div className="space-y-2.5">
                  {content.benefits.map((benefit, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.055 }}
                      className="flex items-start gap-3 bg-cream border border-border hover:border-brand-border rounded-xl px-5 py-4 transition-colors duration-150">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-brand mt-0.5" />
                      <p className="font-sans text-sm text-gray-600 leading-relaxed">{benefit}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            GALLERY — editorial mosaic
        ══════════════════════════════════════ */}
        <section className="bg-cream py-24 border-b border-border">
          <Container>
            <div className="flex items-end justify-between mb-12">
              <motion.div {...FADE_UP}>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-3">Inside Our Farm</p>
                <h2 className="font-serif font-bold text-dark leading-tight"
                  style={{ fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}>
                  Life at the Fish Farm
                </h2>
              </motion.div>
            </div>

            {/* mosaic: 2 large + 4 small */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 auto-rows-[220px]">
              {content.gallery.map((image, i) => {
                const isLarge = i === 0 || i === 3;
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                    className={`group relative overflow-hidden rounded-2xl border border-border hover:border-brand-border transition-all duration-300 ${
                      isLarge ? "sm:col-span-2 sm:row-span-2" : "col-span-1"
                    }`}>
                    <Image src={image} alt={`Kuyash fisheries ${i + 1}`} fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw" />
                    <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/25 transition-colors duration-300" />
                    <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="font-mono text-[10px] text-white/80 bg-dark/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        0{i + 1}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            CTA — editorial close with sub-CTAs
        ══════════════════════════════════════ */}
        <section className="bg-dark py-32 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=2074"
              alt="" fill className="object-cover opacity-15" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-dark2/60 via-transparent to-transparent" />

          <div className="relative z-10">
            <Container>
              <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">

                <motion.div {...FADE_UP} className="max-w-2xl">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-5">Ready to Order</p>
                  <h2 className="font-serif font-bold text-white leading-[1.04] mb-6"
                    style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}>
                    Fresh Fish.<br />
                    Direct From Our Farm.
                  </h2>
                  <p className="font-sans text-white/50 text-sm leading-relaxed max-w-lg mb-10">
                    Whether you are a household buyer, a restaurant sourcing weekly supply, or a food processor looking for consistent bulk volumes — our team is ready to discuss your needs. Farm-to-table delivery across our service areas.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href={content.shopHref}
                      className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200">
                      Shop Fishery Products <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href="/contact"
                      className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200">
                      Enquire About Bulk Supply
                    </Link>
                  </div>
                </motion.div>

                {/* side info panel */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 min-w-[220px] hidden lg:block">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted mb-5">Contact</p>
                  <div className="space-y-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/35 mb-0.5">Phone</p>
                      <p className="font-sans text-sm font-semibold text-white">+234 902 899 1521</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/35 mb-0.5">Email</p>
                      <p className="font-sans text-sm font-semibold text-white">kuyashfarmltd@gmail.com</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/35 mb-0.5">Location</p>
                      <p className="font-sans text-sm font-semibold text-white">Nasarawa State, Nigeria</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/35 mb-0.5">Response</p>
                      <p className="font-sans text-sm font-semibold text-white">Within 24 hours</p>
                    </div>
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
