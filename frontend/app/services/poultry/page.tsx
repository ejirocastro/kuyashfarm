"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, CheckCircle2, Leaf, ShieldCheck,
  Award, Sprout, Bird,
} from "lucide-react";

// ─── brand constants ──────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;
const GOLD  = "#e8d5a3";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

// ─── data ─────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    label: "Broilers",
    sub: "Tender, fresh and nutritious",
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=800",
    href: "/shop/poultry",
  },
  {
    label: "Eggs",
    sub: "Farm fresh, naturally nutritious",
    image: "https://images.unsplash.com/photo-1569288052389-dac9b01ac769?q=80&w=800",
    href: "/shop/poultry",
  },
  {
    label: "Guinea Fowl",
    sub: "Lean meat, rich in flavour",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=800",
    href: "/shop/poultry",
  },
];

const FEATURES = [
  { icon: Bird,          label: "Healthy Birds",   sub: "Well cared for and veterinary monitored" },
  { icon: Leaf,          label: "Fresh Products",   sub: "Farm fresh, naturally processed" },
  { icon: ShieldCheck,   label: "Sustainable",      sub: "Supporting local farmers and communities" },
];

const PILLARS = [
  { icon: Award,          label: "Premium Quality" },
  { icon: ShieldCheck,    label: "Safe & Hygienic" },
  { icon: Leaf,           label: "Sustainable Practices" },
  { icon: Sprout,         label: "Supporting Local Communities" },
];

const PROCESS = [
  {
    num: "01",
    label: "Healthy Chicks",
    sub: "We start with strong, healthy chicks from trusted hatcheries.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600",
  },
  {
    num: "02",
    label: "Quality Feed",
    sub: "Balanced nutrition and biosecure housing for optimal growth and health.",
    image: "https://images.unsplash.com/photo-1589923188651-268a9765e432?q=80&w=600",
  },
  {
    num: "03",
    label: "Safe Environment",
    sub: "Clean, well-ventilated and biosecure housing systems.",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=600",
  },
  {
    num: "04",
    label: "Fresh Products",
    sub: "Carefully harvested, packed and delivered to you.",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=600",
  },
];

const STATS = [
  { value: "100%",    label: "Natural Feeding", sub: "(Non-GMO)" },
  { value: "50,000+", label: "Birds Capacity",  sub: "(And Growing)" },
  { value: "100%",    label: "Quality Assurance", sub: "& Hygiene" },
  { value: "Trusted by", label: "Thousands",    sub: "of Happy Customers" },
];

const BENEFITS = [
  "50,000-bird layer and broiler unit — one of the largest in Nasarawa State",
  "Biosecure housing with controlled ventilation and automated feeders",
  "Veterinary-supervised health management, zero tolerance for disease",
  "Day-old chicks sourced from certified, high-performance hatcheries",
  "Non-GMO feed formulated on-site at our integrated feed mill",
  "Cold-chain logistics — products arrive fresh within 24 hours",
];

// ─── page ─────────────────────────────────────────────────────────────────────

export default function PoultryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf8f5]">

        {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
        <section className="relative h-[88vh] min-h-[600px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1612170153139-6f881ff067e0?q=80&w=2070"
            alt="Kuyash Poultry Farm"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#080f0a]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080f0a]/80 via-[#080f0a]/10 to-transparent" />

          {/* top-right keywords */}
          <div className="absolute top-24 right-8 md:right-16 flex flex-col items-end gap-1.5 z-10">
            {["Quality", "Nutrition", "Sustainability"].map((kw) => (
              <span key={kw} className="font-serif text-sm font-semibold text-white/80 tracking-wide">{kw}</span>
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
                href="/#services"
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm text-white font-sans backdrop-blur-md hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> All Services
              </Link>

              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#6b9d7a] mb-3">Poultry</p>

              <h1
                className="font-serif font-bold leading-[1.04] max-w-2xl mb-5"
                style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}
              >
                <span className="text-white">Healthy Birds.</span><br />
                <span style={{ color: GOLD }}>Better Tomorrow.</span>
              </h1>

              <p className="font-sans text-white/65 leading-relaxed max-w-lg mb-9" style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)" }}>
                We raise healthy, high-quality poultry using best farming practices, proper nutrition and modern housing systems — for fresh, safe and nutritious products you can trust.
              </p>

              <Link
                href="/shop/poultry"
                className="inline-flex items-center gap-2 text-[#080f0a] font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200"
                style={{ backgroundColor: GOLD }}
              >
                Explore Our Poultry Products <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── 2. ABOUT STRIP ───────────────────────────────────────────────── */}
        <section className="bg-white py-20 border-b border-[#e8ede9]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px_240px] gap-10 items-center">

              {/* left — copy */}
              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6b9d7a] mb-3">About Our Poultry</p>
                <h2
                  className="font-serif font-bold text-[#080f0a] leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
                >
                  Quality Poultry,<br />Raised with Care.
                </h2>
                <p className="font-sans text-sm text-gray-500 leading-relaxed mb-6 max-w-md">
                  At Kuyash, our poultry unit is built on the principles of animal welfare, biosecurity and sustainable farming. We rear broilers, layers and guinea fowl for fresh meat, nutritious eggs and reliable supply for our customers.
                </p>
                <Link href="/about" className="inline-flex items-center gap-2 text-[#2d5f3f] font-semibold text-sm hover:gap-3 transition-all duration-200">
                  Learn More About Us <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* centre — image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                className="relative aspect-4/3 rounded-2xl overflow-hidden border border-[#e8ede9]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=800"
                  alt="Poultry house at Kuyash"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 420px"
                />
              </motion.div>

              {/* right — feature cards */}
              <div className="flex flex-col gap-4">
                {FEATURES.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div
                      key={f.label}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
                      className="flex items-start gap-3 bg-[#faf8f5] border border-[#e8ede9] rounded-2xl p-4"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#eef5f1] border border-[#c6dece] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#2d5f3f]" />
                      </div>
                      <div>
                        <p className="font-serif font-bold text-[#080f0a] text-sm">{f.label}</p>
                        <p className="font-sans text-xs text-gray-400 mt-0.5 leading-snug">{f.sub}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. PRODUCTS ──────────────────────────────────────────────────── */}
        <section className="bg-[#1a3d2b] py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center">

              {/* left — copy */}
              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6b9d7a] mb-3">Our Poultry Products</p>
                <h2
                  className="font-serif font-bold text-white leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
                >
                  Fresh from Our Farm<br />to Your Table
                </h2>
                <p className="font-sans text-sm text-white/50 leading-relaxed mb-8 max-w-sm">
                  We produce high-quality chicken, eggs and guinea fowl, raised naturally and fed with nutritious, farm-sourced feed. No shortcuts. Just pure, wholesome goodness.
                </p>
                <Link
                  href="/shop/poultry"
                  className="inline-flex items-center gap-2 text-[#080f0a] font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200 hover:opacity-90"
                  style={{ backgroundColor: GOLD }}
                >
                  Shop All Products <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              {/* right — product cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PRODUCTS.map((p, i) => (
                  <motion.div
                    key={p.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                  >
                    <Link href={p.href} className="group block relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-300">
                      <div className="relative aspect-square">
                        <Image
                          src={p.image}
                          alt={p.label}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width:640px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080f0a]/80 via-transparent to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                        <div>
                          <p className="font-serif font-bold text-white text-sm leading-tight">{p.label}</p>
                          <p className="font-sans text-[10px] text-white/55 mt-0.5">{p.sub}</p>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-[#2d5f3f] group-hover:border-[#2d5f3f] transition-colors duration-200">
                          <ArrowRight className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. WHY CHOOSE ────────────────────────────────────────────────── */}
        <section className="bg-white py-20 border-b border-[#e8ede9]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* left — copy + pillars */}
              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6b9d7a] mb-3">Why Choose Kuyash</p>
                <h2
                  className="font-serif font-bold text-[#080f0a] leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
                >
                  Sustainable Farming.<br />Lasting Impact.
                </h2>
                <p className="font-sans text-sm text-gray-500 leading-relaxed mb-10 max-w-md">
                  Our poultry operation is part of our integrated farming vision — creating jobs, supporting food security and delivering quality products to our communities and beyond.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {PILLARS.map((p, i) => {
                    const Icon = p.icon;
                    return (
                      <motion.div
                        key={p.label}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}
                        className="flex flex-col items-center text-center gap-2"
                      >
                        <div className="w-11 h-11 rounded-2xl bg-[#eef5f1] border border-[#c6dece] flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#2d5f3f]" />
                        </div>
                        <p className="font-sans text-xs font-semibold text-[#080f0a] leading-snug">{p.label}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* right — farmer image with leaf decorations */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
                className="relative flex justify-center"
              >
                {/* decorative leaf top-left */}
                <div className="absolute -top-6 -left-4 w-16 h-16 text-[#c6dece] opacity-60 z-10">
                  <svg viewBox="0 0 64 64" fill="currentColor"><path d="M32 4C18 4 6 16 6 30c0 10 6 18 14 22l2-10c-4-3-6-7-6-12 0-8 7-16 16-16s16 8 16 16c0 5-2 9-6 12l2 10c8-4 14-12 14-22C58 16 46 4 32 4z"/></svg>
                </div>
                {/* decorative leaf bottom-right */}
                <div className="absolute -bottom-4 -right-2 w-12 h-12 text-[#e8d5a3] opacity-50 z-10 rotate-45">
                  <svg viewBox="0 0 64 64" fill="currentColor"><path d="M32 4C18 4 6 16 6 30c0 10 6 18 14 22l2-10c-4-3-6-7-6-12 0-8 7-16 16-16s16 8 16 16c0 5-2 9-6 12l2 10c8-4 14-12 14-22C58 16 46 4 32 4z"/></svg>
                </div>
                <div className="relative w-[320px] h-[380px] md:w-[380px] md:h-[440px] rounded-[40%_60%_60%_40%/50%_50%_60%_50%] overflow-hidden border-4 border-[#e8ede9]">
                  <Image
                    src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=800"
                    alt="Kuyash poultry farmer"
                    fill
                    className="object-cover"
                    sizes="420px"
                  />
                </div>
              </motion.div>
            </div>

            {/* benefits list */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              {BENEFITS.map((b, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#faf8f5] border border-[#e8ede9] rounded-xl px-5 py-4">
                  <CheckCircle2 className="w-4 h-4 text-[#6b9d7a] shrink-0 mt-0.5" />
                  <p className="font-sans text-xs text-gray-600 leading-relaxed">{b}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 5. PROCESS ───────────────────────────────────────────────────── */}
        <section className="bg-[#faf8f5] py-20 border-b border-[#e8ede9]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 items-start">

              {/* left — copy */}
              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6b9d7a] mb-3">Our Process</p>
                <h2
                  className="font-serif font-bold text-[#080f0a] leading-[1.06] mb-4"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
                >
                  From Our Farms<br />to Your Food
                </h2>
                <p className="font-sans text-sm text-gray-500 leading-relaxed mb-6">
                  We follow a careful, step-by-step process to ensure every product meets the highest standards of quality, health and freshness.
                </p>
                <Link href="/about" className="inline-flex items-center gap-2 text-[#2d5f3f] font-semibold text-sm hover:gap-3 transition-all duration-200">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* right — 4 process cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {PROCESS.map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.09, ease: EASE }}
                    className="group flex flex-col rounded-2xl overflow-hidden border border-[#e8ede9] bg-white"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={step.image}
                        alt={step.label}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:640px) 50vw, 25vw"
                      />
                      <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-[#080f0a]/70 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-[10px] font-mono font-bold text-white">{step.num}</span>
                      </div>
                    </div>
                    <div className="p-4 flex-1">
                      <p className="font-serif font-bold text-[#080f0a] text-sm mb-1">{step.label}</p>
                      <p className="font-sans text-[11px] text-gray-400 leading-snug">{step.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. STATS STRIP ───────────────────────────────────────────────── */}
        <section className="relative py-20 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d7ad?q=80&w=2070"
            alt="Kuyash farm landscape"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#080f0a]/72" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.09, ease: EASE }}
                  className="px-6 md:px-10 py-10 text-center"
                >
                  <p
                    className="font-serif font-bold text-white leading-none mb-1"
                    style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
                  >
                    {s.value}
                  </p>
                  <p className="font-sans text-sm font-semibold text-white/80">{s.label}</p>
                  <p className="font-sans text-xs text-white/40 mt-0.5">{s.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. CTA ───────────────────────────────────────────────────────── */}
        <section className="bg-[#080f0a] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">

              {/* left — copy */}
              <motion.div
                {...fadeUp()}
                className="py-20 pr-0 lg:pr-16 flex flex-col justify-center"
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6b9d7a] mb-4">Taste the Difference</p>
                <h2
                  className="font-serif font-bold text-white leading-[1.04] mb-6"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
                >
                  Fresh. Nutritious.<br />
                  <span style={{ color: GOLD }}>Kuyash.</span>
                </h2>
                <p className="font-sans text-white/50 text-sm leading-relaxed max-w-sm mb-10">
                  From our farm to your table — quality poultry products for a healthier you and your family.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/shop/poultry"
                    className="inline-flex items-center gap-2 text-[#080f0a] font-semibold text-sm px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity duration-200"
                    style={{ backgroundColor: GOLD }}
                  >
                    Shop Now <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>

              {/* right — food image */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
                className="relative min-h-[340px] lg:min-h-0"
              >
                <Image
                  src="https://images.unsplash.com/photo-1598103442097-8b74394b95c3?q=80&w=800"
                  alt="Fresh poultry platter"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080f0a] via-transparent to-transparent lg:block hidden" />
              </motion.div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
