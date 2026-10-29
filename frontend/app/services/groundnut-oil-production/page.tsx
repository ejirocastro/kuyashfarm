"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Leaf, Heart, Shield, Star } from "lucide-react";

const EASE  = [0.16, 1, 0.3, 1] as const;
const BRAND = "#2d5f3f";
const DARK  = "#080f0a";
const CREAM = "#faf8f5";
const MUTED = "#6b9d7a";
const BORDER = "#e8ede9";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: MUTED }}>
      {text}
    </p>
  );
}

const PROCESS_STEPS = [
  {
    num: "01",
    label: "Sorting & Cleaning",
    desc: "We start with high-quality groundnuts, carefully sorted and cleaned to remove impurities.",
    image: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?q=80&w=600",
  },
  {
    num: "02",
    label: "Cold Pressing & Extraction",
    desc: "Using advanced pressing technology, we extract the pure oil naturally.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600",
  },
  {
    num: "03",
    label: "Filtration",
    desc: "The oil is filtered to ensure clarity, purity and a smooth, clean finish.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600",
  },
  {
    num: "04",
    label: "Packaging",
    desc: "Finally, we package it under strict hygiene standards to keep its freshness and quality.",
    image: "https://images.unsplash.com/photo-1624395149826-5af81f40e0f9?q=80&w=600",
  },
];

const WHY_CHOOSE = [
  { icon: Leaf,   title: "100% Pure",             sub: "No additives, no preservatives" },
  { icon: Heart,  title: "Rich in Nutrients",      sub: "Good source of healthy fats and vitamin E" },
  { icon: Shield, title: "Strict Quality Control", sub: "From farm to final product" },
  { icon: Star,   title: "Trusted by Families",    sub: "and Businesses" },
];

export default function GroundnutOilPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: CREAM }}>

        {/* ── SECTION 1: HERO ── */}
        <section className="overflow-hidden border-b" style={{ borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] items-center gap-12 py-20 lg:py-0">

              {/* Left — copy */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: EASE }}
                className="lg:py-24"
              >
                <SectionLabel text="Our Processing Facilities" />
                <h1
                  className="mb-6 font-serif font-bold leading-[1.04]"
                  style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)", color: DARK }}
                >
                  Premium<br />Groundnut Oil<br />Production
                </h1>
                <p className="mb-8 font-sans text-sm leading-relaxed max-w-sm" style={{ color: "#4a5568" }}>
                  From farm to bottle, we process the finest groundnuts into pure, high-quality oil — naturally rich, nutritious, and trusted by families and businesses alike.
                </p>
                <a
                  href="#process"
                  className="inline-flex items-center gap-2 font-sans text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-70"
                  style={{ color: DARK }}
                >
                  Our Process <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </motion.div>

              {/* Right — hero image + side label */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="relative flex items-center justify-end"
              >
                <div className="relative w-full max-w-lg aspect-[4/3] lg:aspect-auto lg:h-[520px]">
                  <Image
                    src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=900"
                    alt="Premium groundnut oil in glass bottle with nuts"
                    fill
                    className="object-cover object-center rounded-2xl lg:rounded-none"
                    priority
                  />
                </div>
                {/* Side annotation */}
                <div className="absolute right-0 top-1/3 hidden lg:flex flex-col items-center gap-1 pr-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-gray-400 [writing-mode:vertical-rl] rotate-180">
                    Pure · Natural · Nutritious
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: OUR PROCESS ── */}
        <section id="process" className="py-20 border-b" style={{ borderColor: BORDER, backgroundColor: "#f5f6f2" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16">

              {/* Left — heading */}
              <motion.div {...fadeUp(0)}>
                <SectionLabel text="Our Process" />
                <h2
                  className="mb-6 font-serif font-bold leading-[1.06]"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: DARK }}
                >
                  Carefully Extracted,<br />Naturally Good
                </h2>
                <p className="mb-6 font-sans text-sm leading-relaxed" style={{ color: "#4a5568" }}>
                  Our groundnut oil is produced using modern extraction methods that preserve its natural flavour, nutrients and purity. We follow strict quality control at every stage — from sourcing the best groundnuts to final packaging.
                </p>
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 font-sans text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-70"
                  style={{ color: DARK }}
                >
                  Learn About Our Process <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </motion.div>

              {/* Right — 4 step cards */}
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-5">
                {PROCESS_STEPS.map((step, i) => (
                  <motion.div key={step.num} {...fadeUp(i * 0.08)}>
                    {/* Step number + arrow */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono text-xs font-semibold" style={{ color: MUTED }}>{step.num}</span>
                      <span className="font-sans text-sm font-semibold" style={{ color: DARK }}>{step.label}</span>
                      {i < 3 && <ArrowRight className="h-3 w-3 ml-auto shrink-0" style={{ color: "#9ca3af" }} />}
                    </div>
                    {/* Step image */}
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                      <Image
                        src={step.image}
                        alt={step.label}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    <p className="font-sans text-xs leading-relaxed" style={{ color: "#6b7280" }}>
                      {step.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: WHY CHOOSE KUYASH ── */}
        <section className="border-b overflow-hidden" style={{ borderColor: BORDER }}>
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left — full-bleed groundnut image */}
            <motion.div
              {...fadeUp(0)}
              className="relative min-h-[380px] lg:min-h-[500px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1599599810694-b5b37304c041?q=80&w=900"
                alt="Sourced from trusted local farmers"
                fill
                className="object-cover object-center"
              />
              {/* caption overlay */}
              <div className="absolute bottom-6 left-6">
                <p className="font-sans text-sm font-medium leading-snug text-white drop-shadow-md">
                  Sourced from<br />trusted local farmers<br />and processed with care.
                </p>
              </div>
            </motion.div>

            {/* Right — why choose */}
            <div className="flex flex-col justify-center px-8 py-16 md:px-12 lg:px-14" style={{ backgroundColor: CREAM }}>
              <motion.div {...fadeUp(0)}>
                <SectionLabel text="Why Choose Kuyash" />
                <h2
                  className="mb-5 font-serif font-bold leading-[1.04]"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: DARK }}
                >
                  Pure Goodness.<br />Real Value.
                </h2>
                <p className="mb-10 font-sans text-sm leading-relaxed max-w-sm" style={{ color: "#4a5568" }}>
                  Our groundnut oil is rich in healthy fats, free from additives, and carefully processed to retain its natural goodness. It's the perfect choice for cooking, baking, and a healthier lifestyle.
                </p>

                <div className="space-y-6">
                  {WHY_CHOOSE.map(({ icon: Icon, title, sub }, i) => (
                    <motion.div key={title} {...fadeUp(i * 0.07)} className="flex items-start gap-4">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${BRAND}14` }}
                      >
                        <Icon className="h-4 w-4" style={{ color: BRAND }} />
                      </div>
                      <div>
                        <p className="font-sans text-sm font-semibold" style={{ color: DARK }}>{title}</p>
                        <p className="font-sans text-xs" style={{ color: "#6b7280" }}>{sub}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: OUR PRODUCTS + PARTNER ── */}
        <section id="products" className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">

            {/* Col 1 — Products copy */}
            <div className="flex flex-col justify-center px-8 py-16 md:px-12 lg:px-14" style={{ backgroundColor: CREAM }}>
              <motion.div {...fadeUp(0)}>
                <SectionLabel text="Our Products" />
                <h2
                  className="mb-4 font-serif font-bold leading-[1.06]"
                  style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", color: DARK }}
                >
                  Pure Groundnut Oil<br />for Every Purpose
                </h2>
                <p className="mb-6 font-sans text-sm leading-relaxed" style={{ color: "#4a5568" }}>
                  Available in various packaging options to suit your needs — from household use to commercial supply.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-sans text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-70"
                  style={{ color: DARK }}
                >
                  View Our Products <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            </div>

            {/* Col 2 — Product bottles image */}
            <motion.div
              {...fadeUp(0.08)}
              className="relative min-h-[320px] lg:min-h-0"
              style={{ backgroundColor: "#f0ede6" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=700"
                alt="Kuyash groundnut oil bottles"
                fill
                className="object-cover object-center"
              />
            </motion.div>

            {/* Col 3 — Partner CTA */}
            <motion.div
              {...fadeUp(0.12)}
              className="flex flex-col justify-center px-8 py-16 md:px-12 lg:px-14"
              style={{ backgroundColor: BRAND }}
            >
              <SectionLabel text="Get in Touch" />
              <h2
                className="mb-4 font-serif font-bold leading-[1.06] text-white"
                style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}
              >
                Partner With Us
              </h2>
              <p className="mb-8 font-sans text-sm leading-relaxed text-white/70">
                Looking for bulk supply or want to learn more about our products? We're here to help.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 self-start rounded-full border border-white/30 px-6 py-3 font-sans text-sm font-semibold text-white transition-all duration-200 hover:bg-white hover:text-[#2d5f3f]"
              >
                Contact Us <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
