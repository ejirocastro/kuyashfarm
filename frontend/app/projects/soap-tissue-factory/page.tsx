"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft,
  Leaf, Settings, Users,
  Package, Recycle, Droplets, HandHeart,
  PlayCircle,
} from "lucide-react";

// ─── brand tokens ─────────────────────────────────────────────────────────────
const EASE   = [0.16, 1, 0.3, 1] as const;
const BRAND  = "#2d5f3f";
const DARK   = "#080f0a";
const DARK2  = "#1a3d2b";
const CREAM  = "#faf8f5";
const BORDER = "#e8ede9";
const MUTED  = "#6b9d7a";
const GOLD   = "#e8d5a3";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: EASE },
});

// ─── data ─────────────────────────────────────────────────────────────────────

const HERO_PILLARS = [
  { icon: Leaf,        label: "Premium Quality",    sub: "Carefully crafted with safe, skin-friendly ingredients." },
  { icon: Settings,    label: "Modern Facilities",  sub: "Advanced technology for consistent, high-quality production." },
  { icon: Recycle,     label: "Sustainable",        sub: "Eco-friendly processes for a cleaner, greener future." },
  { icon: Users,       label: "Trusted by Millions",sub: "Everyday care for homes, businesses and institutions." },
];

const PRODUCTS = [
  {
    label: "Soaps",
    sub: "Gentle on your skin, strong on cleanliness.",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=600",
    href: "/shop/all",
  },
  {
    label: "Toilet Tissue",
    sub: "Soft, strong and reliable comfort.",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=600",
    href: "/shop/all",
  },
  {
    label: "Facial Tissue",
    sub: "Soft care for every moment.",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=600",
    href: "/shop/all",
  },
  {
    label: "Kitchen Towels",
    sub: "Durable, absorbent and practical.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600",
    href: "/shop/all",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    label: "Sourcing",
    sub: "We select the best natural and safe raw materials.",
  },
  {
    num: "02",
    label: "Production",
    sub: "Advanced machinery and skilled hands create consistent quality.",
  },
  {
    num: "03",
    label: "Quality Control",
    sub: "Every batch is tested for safety, softness and performance.",
  },
  {
    num: "04",
    label: "Packaging",
    sub: "Eco-friendly packaging that keeps products fresh and safe.",
  },
];

const SUSTAINABILITY = [
  { icon: Package,   num: "01", label: "Eco-friendly packaging" },
  { icon: Droplets,  num: "02", label: "Responsible water usage" },
  { icon: Recycle,   num: "03", label: "Waste reduction & recycling" },
  { icon: HandHeart, num: "04", label: "Supporting local communities" },
];

const IMPACT_STATS = [
  { value: "50+",  label: "Local Jobs Created" },
  { value: "100%", label: "Safe & Quality Products" },
  { value: "100%", label: "Commitment to Sustainability" },
];

// ─── page ─────────────────────────────────────────────────────────────────────
export default function SoapTissueFactoryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ backgroundColor: CREAM }}>

        {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
        <section className="relative h-[88vh] min-h-[600px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1600"
            alt="Soap and tissue factory"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ backgroundColor: `${DARK}4d` }} />
          <div className="absolute inset-0 bg-linear-to-t from-[#080f0a]/85 via-[#080f0a]/15 to-transparent" />

          {/* back-link — top-left, clear of navbar */}
          <div className="absolute top-20 left-0 z-10 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm text-white font-sans backdrop-blur-md hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> All Projects
              </Link>
            </motion.div>
          </div>

          {/* bottom content */}
          <div className="absolute inset-x-0 bottom-0 z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] mb-4" style={{ color: MUTED }}>
                Soap &amp; Tissue Factory
              </p>

              <h1
                className="font-serif font-bold text-white leading-[1.04] max-w-2xl mb-5"
                style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
              >
                Clean Living<br />
                for a Healthier<br />
                Tomorrow.
              </h1>

              <p className="font-sans text-white/65 leading-relaxed max-w-lg mb-9" style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)" }}>
                We produce high-quality soaps and tissue products using modern technology, natural ingredients and sustainable practices — for homes, businesses and communities across Nigeria.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Link
                  href="#products"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: GOLD, color: DARK }}
                >
                  Explore Our Products <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#process"
                  className="inline-flex items-center gap-2 gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors duration-200"
                >
                  <PlayCircle className="h-4 w-4" /> Watch Our Process
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 2. HERO PILLARS ──────────────────────────────────────────────── */}
        <section className="bg-white border-b py-10" style={{ borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {HERO_PILLARS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.label} {...fadeUp(i * 0.07)} className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-1" style={{ backgroundColor: "#eef5f1" }}>
                      <Icon className="w-4 h-4" style={{ color: BRAND }} />
                    </div>
                    <p className="font-sans text-sm font-semibold" style={{ color: DARK }}>{p.label}</p>
                    <p className="font-sans text-xs leading-snug" style={{ color: "#6b7280" }}>{p.sub}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3. OUR PRODUCTS ──────────────────────────────────────────────── */}
        <section id="products" className="py-20 border-b" style={{ backgroundColor: CREAM, borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* left — copy */}
              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3" style={{ color: MUTED }}>
                  Our Products
                </p>
                <h2
                  className="font-serif font-bold leading-[1.06] mb-4"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: DARK }}
                >
                  Everyday Essentials<br />for a Cleaner, Healthier You
                </h2>
                <p className="font-sans text-sm leading-relaxed mb-8" style={{ color: "#4a5568" }}>
                  From gentle soaps to ultra-soft tissues, our products are crafted for comfort, hygiene and care — because you deserve the best, every day.
                </p>
                <Link
                  href="/shop/all"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: BRAND, color: "white" }}
                >
                  View All Products <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              {/* right — hero product image */}
              <motion.div {...fadeUp(0.15)}>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200"
                    alt="Mother and child — everyday care"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </div>

            {/* 4-product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
              {PRODUCTS.map((prod, i) => (
                <motion.div key={prod.label} {...fadeUp(i * 0.08)}>
                  <Link href={prod.href} className="group block">
                    <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-3 border" style={{ borderColor: BORDER }}>
                      <Image
                        src={prod.image}
                        alt={prod.label}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:640px) 50vw, 25vw"
                      />
                    </div>
                    <p className="font-sans text-sm font-semibold mb-0.5" style={{ color: DARK }}>{prod.label}</p>
                    <p className="font-sans text-xs leading-snug mb-2" style={{ color: "#6b7280" }}>{prod.sub}</p>
                    <span className="inline-flex items-center gap-1 font-sans text-xs font-semibold" style={{ color: BRAND }}>
                      Learn More <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. OUR FACTORY ───────────────────────────────────────────────── */}
        <section className="relative py-24 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1600"
            alt="Factory production line"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ backgroundColor: `${DARK}b3` }} />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <motion.div {...fadeUp()} className="max-w-xl">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3" style={{ color: MUTED }}>
                Our Factory
              </p>
              <h2
                className="font-serif font-bold text-white leading-[1.06] mb-5"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
              >
                World-Class Production<br />for World-Class Quality
              </h2>
              <p className="font-sans text-white/60 text-sm leading-relaxed mb-8 max-w-md">
                Our state-of-the-art soap and tissue factory combines modern technology with strict quality control to deliver products you can trust.
              </p>
              <Link
                href="#process"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: GOLD, color: DARK }}
              >
                Take a Virtual Tour <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── 5. OUR PROCESS ───────────────────────────────────────────────── */}
        <section id="process" className="bg-white py-20 border-b" style={{ borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* left — copy */}
              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3" style={{ color: MUTED }}>
                  Our Process
                </p>
                <h2
                  className="font-serif font-bold leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: DARK }}
                >
                  From Natural Ingredients<br />to Everyday Care
                </h2>
                <p className="font-sans text-sm leading-relaxed mb-8" style={{ color: "#4a5568" }}>
                  We follow a simple but rigorous process to ensure every product meets our highest standards — from raw materials to your hands.
                </p>
                <Link
                  href="/shop/all"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: BRAND, color: "white" }}
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              {/* right — 4-step grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {PROCESS_STEPS.map((step, i) => (
                  <motion.div
                    key={step.label}
                    {...fadeUp(i * 0.08)}
                    className="rounded-2xl p-5 border"
                    style={{ backgroundColor: CREAM, borderColor: BORDER }}
                  >
                    <p className="font-mono text-2xl font-bold mb-3" style={{ color: BRAND }}>{step.num}</p>
                    <p className="font-sans text-sm font-semibold mb-1" style={{ color: DARK }}>{step.label}</p>
                    <p className="font-sans text-xs leading-relaxed" style={{ color: "#6b7280" }}>{step.sub}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* natural ingredients image */}
            <motion.div {...fadeUp(0.1)} className="mt-12">
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1600"
                  alt="Natural ingredients — leaves, rice, oil"
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 6. SUSTAINABILITY ────────────────────────────────────────────── */}
        <section className="relative py-24 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600"
            alt="Green sustainable farming"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ backgroundColor: `${DARK2}e0` }} />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* left — copy */}
              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3" style={{ color: GOLD }}>
                  Our Commitment
                </p>
                <h2
                  className="font-serif font-bold text-white leading-[1.04] mb-5"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
                >
                  Sustainable Today.<br />Greener Tomorrow.
                </h2>
                <p className="font-sans text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
                  We care about people and the planet. Our production processes are designed to reduce waste, conserve resources and create a healthier environment for future generations.
                </p>
                <Link
                  href="/#projects"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: GOLD, color: DARK }}
                >
                  Our Sustainability Goals <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              {/* right — 4 sustainability cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SUSTAINABILITY.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      {...fadeUp(i * 0.08)}
                      className="flex flex-col items-center text-center gap-3 rounded-2xl p-5 border border-white/10 bg-white/5"
                    >
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="font-mono text-xs font-bold" style={{ color: GOLD }}>{item.num}</p>
                      <p className="font-sans text-sm text-white/80 leading-snug">{item.label}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. IMPACT ────────────────────────────────────────────────────── */}
        <section className="bg-white py-20 border-b" style={{ borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* left — copy */}
              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3" style={{ color: MUTED }}>
                  Our Impact
                </p>
                <h2
                  className="font-serif font-bold leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: DARK }}
                >
                  More Than Products.<br />
                  <span style={{ color: BRAND }}>We Create Value.</span>
                </h2>
                <p className="font-sans text-sm leading-relaxed" style={{ color: "#4a5568" }}>
                  Our factory is not just about making soap and tissue — it&apos;s about creating jobs, supporting local farmers, and contributing to a cleaner, healthier Nigeria.
                </p>
              </motion.div>

              {/* right — stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {IMPACT_STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    {...fadeUp(i * 0.08)}
                    className="flex flex-col gap-2"
                  >
                    <p
                      className="font-serif font-bold leading-none"
                      style={{ fontSize: "clamp(2rem, 3vw, 3rem)", color: BRAND }}
                    >
                      {stat.value}
                    </p>
                    <p className="font-sans text-xs leading-snug" style={{ color: "#4a5568" }}>{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. SUSTAINABILITY SPLIT ───────────────────────────────────────── */}
        <section className="border-b overflow-hidden" style={{ borderColor: BORDER }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">

            {/* left — nature + product image */}
            <motion.div
              {...fadeUp()}
              className="relative min-h-[320px] lg:min-h-0"
            >
              <Image
                src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1200"
                alt="Natural ingredients and Kuyash product"
                fill
                className="object-cover object-center"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* right — copy on cream */}
            <motion.div
              {...fadeUp(0.12)}
              className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-14"
              style={{ backgroundColor: CREAM }}
            >
              <p className="text-[9px] font-mono uppercase tracking-[0.28em] mb-3" style={{ color: MUTED }}>
                Sustainability
              </p>
              <h2
                className="font-serif font-bold leading-[1.06] mb-5"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: DARK }}
              >
                Better everyday care.<br />A lighter footprint.
              </h2>
              <p className="font-sans text-sm leading-relaxed mb-10 max-w-sm" style={{ color: "#4a5568" }}>
                We are committed to more responsible manufacturing through considered resource use, responsible packaging choices and waste-conscious operations.
              </p>

              {/* 3 pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: Leaf,     label: "Conscious resource use" },
                  { icon: Recycle,  label: "Responsible packaging choices" },
                  { icon: Droplets, label: "Waste-conscious operations" },
                ].map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <motion.div key={p.label} {...fadeUp(i * 0.08)} className="flex flex-col items-center text-center gap-2">
                      <div className="w-10 h-10 rounded-full border flex items-center justify-center" style={{ borderColor: BORDER }}>
                        <Icon className="w-4 h-4" style={{ color: BRAND }} />
                      </div>
                      <p className="font-sans text-xs leading-snug" style={{ color: DARK }}>{p.label}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 9. LET'S CONNECT ─────────────────────────────────────────────── */}
        <section className="overflow-hidden" style={{ backgroundColor: DARK2 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-[400px]">

            {/* left — copy */}
            <motion.div
              {...fadeUp()}
              className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-16"
            >
              <p className="text-[9px] font-mono uppercase tracking-[0.28em] mb-4" style={{ color: MUTED }}>
                Let&apos;s Connect
              </p>
              <h2
                className="font-serif font-bold text-white leading-[1.04] mb-5"
                style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)" }}
              >
                Let&apos;s put quality essentials<br />within reach.
              </h2>
              <p className="font-sans text-white/55 text-sm leading-relaxed mb-9 max-w-sm">
                We work with distributors, retailers and institutional buyers to make everyday essentials more accessible across Nigeria.
              </p>
              <a
                href="mailto:info@kuyashfarm.com"
                className="self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors duration-200"
              >
                Start a conversation <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>

            {/* right — Kuyash products image flush */}
            <motion.div
              initial={{ opacity: 0, scale: 1.03 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative min-h-[320px] lg:min-h-0"
            >
              <Image
                src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1200"
                alt="Kuyash soap and tissue product range"
                fill
                className="object-cover object-center"
                sizes="(max-width:1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-linear-to-r from-[#1a3d2b]/60 to-transparent lg:block hidden" />
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
