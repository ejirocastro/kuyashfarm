"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, TrendingUp, Link2, Leaf,
  ShieldCheck, Settings, Users, Globe, CheckCircle2,
  Handshake,
} from "lucide-react";

// ─── brand tokens ─────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;
const BRAND  = "#2d5f3f";
const DARK   = "#080f0a";
const CREAM  = "#faf8f5";
const BORDER = "#e8ede9";
const MUTED  = "#6b9d7a";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: EASE },
});

// ─── data ─────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    icon: Settings,
    label: "Processing & Value Addition",
    sub: "Turning raw palm produce into high-quality, usable products.",
  },
  {
    icon: Link2,
    label: "Local Supply Chains",
    sub: "Strengthening farmers, communities and the economy.",
  },
  {
    icon: Leaf,
    label: "Responsible Operations",
    sub: "Building a more sustainable and resilient future.",
  },
];

const PROCESS_STEPS = [
  {
    num: "1",
    label: "Fresh Fruit Bunches",
    sub: "Sourced from our farms and trusted local growers.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600",
  },
  {
    num: "2",
    label: "Crude Palm Oil (CPO)",
    sub: "Extracted through mechanical pressing and clarification.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600",
  },
  {
    num: "3",
    label: "Refining Process",
    sub: "Filtering, bleaching and deodorizing for high quality and purity.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600",
  },
  {
    num: "4",
    label: "Refined Palm Oil",
    sub: "Ready for local and regional markets.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600",
  },
];

const BENEFITS = [
  { icon: TrendingUp, label: "Economic Growth",         sub: "Creates jobs and supports local businesses." },
  { icon: Leaf,       label: "Value Addition",          sub: "Increases the value of local produce." },
  { icon: Users,      label: "Farmer Support",          sub: "Builds stronger supply chains and better incomes." },
  { icon: ShieldCheck,label: "Food Security",           sub: "Improves availability of quality edible oil in Nigeria." },
  { icon: Settings,   label: "Industrial Development",  sub: "Strengthens Nigeria's agro-processing sector." },
  { icon: Globe,      label: "Sustainable Future",      sub: "Promotes responsible and efficient use of resources." },
];

const SUSTAINABILITY = [
  { icon: Leaf,       label: "Environmental Stewardship", sub: "Minimising impact and promoting eco-friendly practices." },
  { icon: Users,      label: "Community Development",     sub: "Supporting farmers and local communities through shared growth." },
  { icon: ShieldCheck,label: "Ethical Operations",        sub: "Upholding the highest standards of integrity and transparency." },
];

const STATUS_STEPS = [
  { label: "Planning & Design",      detail: "In Progress",  done: true },
  { label: "Infrastructure",         detail: "In Progress",  done: true },
  { label: "Equipment Installation", detail: "Upcoming",     done: false },
  { label: "Commissioning",          detail: "Upcoming",     done: false },
];

const RELATED = [
  { label: "Water Factory",          href: "/projects/water-factory" },
  { label: "Soap & Tissue Factory",  href: "/projects/soap-tissue-factory" },
  { label: "Slaughter House",        href: "/projects/slaughter-house" },
];

// ─── page ─────────────────────────────────────────────────────────────────────

export default function PalmOilRefineryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ backgroundColor: CREAM }}>

        {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
        <section className="relative h-[88vh] min-h-[600px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2070"
            alt="Palm Oil Refinery"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* overlays */}
          <div className="absolute inset-0" style={{ backgroundColor: `${DARK}4d` }} />
          <div className="absolute inset-0 bg-linear-to-t from-[#080f0a]/85 via-[#080f0a]/10 to-transparent" />

          {/* top-right label */}
          <div className="absolute top-24 right-8 md:right-16 flex flex-col items-end gap-1.5 z-10">
            {["Processing", "Value Addition", "Nigeria"].map((kw) => (
              <span key={kw} className="font-serif text-sm font-semibold text-white/70 tracking-wide">{kw}</span>
            ))}
          </div>

          {/* bottom content */}
          <div className="absolute inset-x-0 bottom-0 z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <Link
                href="/#projects"
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm text-white font-sans backdrop-blur-md hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> All Projects
              </Link>

              <p className="text-[10px] font-mono uppercase tracking-[0.28em] mb-3" style={{ color: MUTED }}>
                Ongoing Project &nbsp;/&nbsp; Processing &amp; Value Addition
              </p>

              <h1
                className="font-serif font-bold text-white leading-[1.04] max-w-2xl mb-5"
                style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}
              >
                From Palm Harvest<br />
                <span style={{ color: "#e8d5a3" }}>to Refined Value.</span>
              </h1>

              <p className="font-sans text-white/65 leading-relaxed max-w-lg mb-9" style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)" }}>
                Developing local processing capacity to turn palm produce into dependable, value-added products for Nigerian markets.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="#about"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-[#080f0a] transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#e8d5a3" }}
                >
                  Explore the Project <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border border-white/25 text-white hover:bg-white/10 transition-colors duration-200"
                >
                  Discuss a Partnership
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 2. THREE-PILLAR STRIP ─────────────────────────────────────────── */}
        <section className="bg-white border-y" style={{ borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x" style={{ "--tw-divide-opacity": 1 } as React.CSSProperties}>
              {PILLARS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.label}
                    {...fadeUp(i * 0.1)}
                    className="flex items-start gap-4 px-0 sm:px-8 py-8 first:pl-0 last:pr-0"
                    style={{ borderColor: BORDER }}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "#eef5f1" }}>
                      <Icon className="w-4 h-4" style={{ color: BRAND }} />
                    </div>
                    <div>
                      <p className="font-serif font-semibold text-sm mb-1" style={{ color: DARK }}>{p.label}</p>
                      <p className="font-sans text-xs leading-relaxed" style={{ color: "#6b7280" }}>{p.sub}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3. ABOUT THE PROJECT ─────────────────────────────────────────── */}
        <section id="about" className="bg-white py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* left */}
              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3" style={{ color: MUTED }}>The Project</p>
                <h2
                  className="font-serif font-bold leading-[1.08] mb-6"
                  style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", color: DARK }}
                >
                  Building capacity for the next<br />
                  stage of production
                </h2>
                <div className="space-y-4 font-sans text-sm leading-relaxed mb-8" style={{ color: "#4a5568" }}>
                  <p>
                    The palm oil refinery project is part of our integrated farm vision, focused on adding value to locally sourced palm produce and creating opportunities across the value chain.
                  </p>
                  <p>
                    This project will enable us to process crude palm oil into refined palm oil and other valuable by-products, supporting local farmers, creating jobs and contributing to Nigeria&apos;s food and industrial growth.
                  </p>
                </div>
                <Link
                  href="/shop/all"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: BRAND }}
                >
                  Our Products <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              {/* right — image with caption */}
              <motion.div {...fadeUp(0.15)} className="space-y-3">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1200"
                    alt="Palm oil processing equipment"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
                <p className="font-sans text-xs italic pl-1" style={{ color: "#9ca3af" }}>
                  Modern processing technology for high-quality refined palm oil.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 4. PROCESSING PROCESS ────────────────────────────────────────── */}
        <section className="py-20 overflow-hidden" style={{ backgroundColor: CREAM }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start">

              {/* left — copy */}
              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3" style={{ color: MUTED }}>Our Process</p>
                <h2
                  className="font-serif font-bold leading-[1.08] mb-5"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", color: DARK }}
                >
                  Our Processing Process
                </h2>
                <p className="font-sans text-sm leading-relaxed mb-8" style={{ color: "#4a5568" }}>
                  The refinery will follow a safe, efficient and environmentally responsible process to produce high-quality refined palm oil and valuable by-products.
                </p>
                <Link
                  href="#about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors duration-200 hover:bg-white"
                  style={{ borderColor: BRAND, color: BRAND }}
                >
                  Learn More About Our Process <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>

              {/* right — 4-step flow */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 items-center">
                {PROCESS_STEPS.map((step, i) => (
                  <motion.div key={step.num} {...fadeUp(i * 0.1)} className="flex flex-col items-center text-center">
                    <div className="flex items-center w-full mb-4">
                      {/* circle image */}
                      <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-4 border-white shadow-md shrink-0 mx-auto">
                        <Image
                          src={step.image}
                          alt={step.label}
                          fill
                          className="object-cover"
                          sizes="100px"
                        />
                      </div>
                      {/* arrow between steps */}
                      {i < PROCESS_STEPS.length - 1 && (
                        <div className="hidden lg:flex items-center justify-center w-full">
                          <ArrowRight className="w-5 h-5 shrink-0" style={{ color: MUTED }} />
                        </div>
                      )}
                    </div>
                    <p className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] mb-1" style={{ color: MUTED }}>
                      {step.num}.
                    </p>
                    <p className="font-serif font-semibold text-sm mb-1" style={{ color: DARK }}>{step.label}</p>
                    <p className="font-sans text-xs leading-snug" style={{ color: "#6b7280" }}>{step.sub}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. WHY IT MATTERS ────────────────────────────────────────────── */}
        <section className="bg-white py-20 border-t" style={{ borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start">

              {/* left */}
              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3" style={{ color: MUTED }}>Key Benefits</p>
                <h2
                  className="font-serif font-bold leading-[1.08] mb-5"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", color: DARK }}
                >
                  Why It Matters
                </h2>
                <p className="font-sans text-sm leading-relaxed" style={{ color: "#4a5568" }}>
                  The palm oil refinery will create long-term value for farmers, businesses and communities — through a responsible process to produce high-quality refined palm oil and valuable by-products.
                </p>
              </motion.div>

              {/* right — 2×3 benefits grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {BENEFITS.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <motion.div key={b.label} {...fadeUp(i * 0.08)}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: "#eef5f1" }}>
                        <Icon className="w-4 h-4" style={{ color: BRAND }} />
                      </div>
                      <p className="font-serif font-semibold text-sm mb-1" style={{ color: BRAND }}>{b.label}</p>
                      <p className="font-sans text-xs leading-relaxed" style={{ color: "#6b7280" }}>{b.sub}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. SUSTAINABILITY ────────────────────────────────────────────── */}
        <section className="relative py-24 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1920"
            alt="Sustainable palm plantation"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ backgroundColor: `${DARK}cc` }} />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* left */}
              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-4 text-white/50">Sustainability</p>
                <h2
                  className="font-serif font-bold text-white leading-[1.06] mb-6"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
                >
                  Responsible Today.<br />
                  Sustainable Tomorrow.
                </h2>
                <p className="font-sans text-white/65 leading-relaxed mb-8 max-w-md text-sm">
                  We are committed to environmentally responsible practices, ethical sourcing and community development, ensuring our operations create lasting positive impact.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors duration-200"
                >
                  Our Sustainability Commitment <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              {/* right — 3 sustainability pillars */}
              <motion.div {...fadeUp(0.15)} className="space-y-6">
                {SUSTAINABILITY.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div key={s.label} {...fadeUp(i * 0.1)} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-serif font-semibold text-white text-sm mb-1">{s.label}</p>
                        <p className="font-sans text-white/55 text-xs leading-relaxed">{s.sub}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 7. PROJECT STATUS ────────────────────────────────────────────── */}
        <section className="bg-white py-20 border-t" style={{ borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_260px] gap-12 items-start">

              {/* left — copy */}
              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3" style={{ color: MUTED }}>Project Status</p>
                <h2
                  className="font-serif font-bold leading-[1.08] mb-4"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", color: DARK }}
                >
                  Ongoing Development
                </h2>
                <p className="font-sans text-sm leading-relaxed" style={{ color: "#4a5568" }}>
                  The palm oil refinery project is currently in the development and planning phase. We are working with partners and stakeholders to ensure the project meets the highest standards of quality, safety and sustainability.
                </p>
              </motion.div>

              {/* centre — timeline */}
              <motion.div {...fadeUp(0.1)} className="flex flex-col items-start justify-center py-4">
                {/* horizontal on lg, vertical on mobile */}
                <div className="hidden lg:flex items-center w-full gap-0">
                  {STATUS_STEPS.map((step, i) => (
                    <div key={step.label} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0"
                          style={{
                            backgroundColor: step.done ? BRAND : "white",
                            borderColor: step.done ? BRAND : "#d1d5db",
                          }}
                        >
                          {step.done && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        <p className="font-sans text-[10px] font-semibold mt-3 text-center max-w-[90px] leading-snug" style={{ color: DARK }}>
                          {step.label}
                        </p>
                        <p className="font-mono text-[9px] uppercase tracking-wide mt-1" style={{ color: step.done ? BRAND : "#9ca3af" }}>
                          {step.detail}
                        </p>
                      </div>
                      {i < STATUS_STEPS.length - 1 && (
                        <div
                          className="flex-1 h-0.5 mx-2"
                          style={{ backgroundColor: i < STATUS_STEPS.filter(s => s.done).length - 1 ? BRAND : "#e5e7eb" }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* mobile vertical timeline */}
                <div className="flex lg:hidden flex-col gap-0 w-full">
                  {STATUS_STEPS.map((step, i) => (
                    <div key={step.label} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center border-2 shrink-0"
                          style={{
                            backgroundColor: step.done ? BRAND : "white",
                            borderColor: step.done ? BRAND : "#d1d5db",
                          }}
                        >
                          {step.done && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                        {i < STATUS_STEPS.length - 1 && (
                          <div className="w-0.5 h-8 my-1" style={{ backgroundColor: "#e5e7eb" }} />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className="font-sans text-sm font-semibold" style={{ color: DARK }}>{step.label}</p>
                        <p className="font-mono text-[10px] uppercase tracking-wide" style={{ color: step.done ? BRAND : "#9ca3af" }}>
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* right — partnership card */}
              <motion.div
                {...fadeUp(0.2)}
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{ backgroundColor: BRAND }}
              >
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                  <Handshake className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-serif font-bold text-white text-base leading-snug mb-2">
                    Interested in Partnership?
                  </p>
                  <p className="font-sans text-white/65 text-xs leading-relaxed">
                    We welcome investors, suppliers and partners who share our vision for a stronger agricultural future.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-white transition-opacity hover:opacity-90 self-start"
                  style={{ color: BRAND }}
                >
                  Get in Touch <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 8. RELATED PROJECTS ──────────────────────────────────────────── */}
        <section className="relative py-20 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1920"
            alt="Palm oil fruit"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ backgroundColor: `${DARK}b0` }} />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* left */}
              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-white/50">Related Projects</p>
                <h2
                  className="font-serif font-bold text-white leading-[1.06] mb-4"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)" }}
                >
                  Explore Our Other Projects
                </h2>
                <p className="font-sans text-white/60 text-sm leading-relaxed mb-8 max-w-md">
                  Discover our ongoing and planned projects, including the water factory, soap &amp; tissue factory and slaughter house.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {RELATED.map((r) => (
                    <Link
                      key={r.label}
                      href={r.href}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/25 text-white/80 text-xs font-sans hover:bg-white/10 hover:text-white transition-all duration-200"
                    >
                      {r.label} <ArrowRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
                <Link
                  href="/#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors duration-200"
                >
                  View All Projects <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
