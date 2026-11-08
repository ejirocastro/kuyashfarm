"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Leaf, Handshake, Users,
  Wheat, Factory, ShoppingBag, GraduationCap,
  Target, Eye, Sprout, Truck, CheckCircle2,
} from "lucide-react";
import { ease as EASE, fadeUp as _fadeUp } from "@/lib/tokens";
import { Container } from "@/components/ui";

const fadeUp = (delay = 0) => _fadeUp(delay);

// ─── data ─────────────────────────────────────────────────────────────────────

const WHAT_WE_DO = [
  {
    icon: Wheat,
    label: "Farm Production",
    sub: "Crops, livestock, poultry and aquaculture.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800",
  },
  {
    icon: Factory,
    label: "Processing & Value Addition",
    sub: "Palm oil and other value-added products.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800",
  },
  {
    icon: ShoppingBag,
    label: "Products & Distribution",
    sub: "Connecting farm products with customers and markets.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800",
  },
  {
    icon: GraduationCap,
    label: "Agricultural Education",
    sub: "Building practical skills and developing future farmers.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800",
  },
];

const APPROACH_STEPS = [
  { icon: Sprout, label: "Grow",    sub: "Healthy crops, livestock and fisheries." },
  { icon: Factory, label: "Process", sub: "Add value through modern processing." },
  { icon: Truck,   label: "Deliver", sub: "Fresh products to our customers." },
];

const COMMITMENTS = [
  { icon: CheckCircle2, label: "Quality",         sub: "Care in production, handling and processing." },
  { icon: Leaf,         label: "Responsibility",  sub: "Thoughtful use of resources and responsible operations." },
  { icon: Handshake,    label: "Partnership",     sub: "Building dependable relationships with customers and suppliers." },
  { icon: Users,        label: "Community",       sub: "Creating opportunities through agriculture and training." },
];

const IMPACT_ITEMS = [
  { icon: Wheat,        label: "Farms & Production",      sub: "Crops, livestock, fisheries and more." },
  { icon: Factory,      label: "Processing Facilities",   sub: "Palm oil and other value-added products." },
  { icon: GraduationCap,label: "Training & Education",    sub: "Practical skills for future farmers." },
  { icon: Users,        label: "Communities",             sub: "Jobs, partnerships and local impact." },
];

// ─── page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">

        {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
        <section className="relative h-[88vh] min-h-[600px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=2070"
            alt="Kuyash Integrated Farm"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-dark/30" />
          <div className="absolute inset-0 bg-linear-to-t from-dark/85 via-dark/15 to-transparent" />

          {/* bottom-right tagline */}
          <p className="absolute bottom-8 right-8 md:right-16 font-serif text-xs italic text-white/40 z-10">
            Healthy Farms. Stronger Communities.
          </p>

          {/* bottom content */}
          <div className="absolute inset-x-0 bottom-0 z-10 pb-20">
            <Container>
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.28em] mb-4 text-muted">
                  About Kuyash
                </p>

                <h1
                  className="font-serif font-bold text-white leading-[1.04] max-w-2xl mb-6"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
                >
                  Growing a better future<br />
                  <span className="text-gold">through agriculture.</span>
                </h1>

                <p
                  className="font-sans text-white/65 leading-relaxed max-w-md mb-10"
                  style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.05rem)" }}
                >
                  A Nigerian agricultural enterprise growing food, creating value and building opportunities for a stronger, more food-secure future.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/services/crop-vegetable-production"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-dark bg-gold transition-opacity hover:opacity-90"
                  >
                    Explore Our Work <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border border-white/25 text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    Our Projects
                  </Link>
                </div>
              </motion.div>
            </Container>
          </div>
        </section>

        {/* ── 2. OUR STORY ─────────────────────────────────────────────────── */}
        <section id="story" className="bg-white py-20 overflow-hidden">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* left — copy */}
              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">Our Story</p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.06] mb-6"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
                >
                  Built on the land.<br />Driven by possibility.
                </h2>
                <div className="space-y-4 font-sans text-sm leading-relaxed mb-8 text-gray-600">
                  <p>
                    Kuyash was founded on a simple belief: that agriculture can transform lives. What started as a vision to farm sustainably has grown into an integrated business spanning crops, livestock, fisheries, palm oil and food processing — with a strong focus on quality and long-term impact in Nigeria.
                  </p>
                  <p>
                    We are based in Uke Karu, Nasarawa State, and we work closely with our communities, customers and partners to build a resilient food system and create opportunities for the next generation of farmers.
                  </p>
                </div>
                {/* pull quote */}
                <div className="border-l-2 border-brand pl-5">
                  <p className="font-serif text-sm italic leading-relaxed text-muted">
                    From our land to your table — with care, purpose and integrity.
                  </p>
                </div>
              </motion.div>

              {/* right — image */}
              <motion.div {...fadeUp(0.15)}>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=1200"
                    alt="Kuyash farmer on the farm"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ── 3. WHAT WE DO ────────────────────────────────────────────────── */}
        <section className="bg-cream py-20 overflow-hidden">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-start">

              {/* left — copy + tall image */}
              <motion.div {...fadeUp()} className="flex flex-col gap-8">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">What We Do</p>
                  <h2
                    className="font-serif font-bold text-dark leading-[1.06] mb-4"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                  >
                    One connected<br />agricultural ecosystem.
                  </h2>
                  <p className="font-sans text-sm leading-relaxed text-gray-600">
                    From farm to table, from training to market — we bring together every part of the value chain.
                  </p>
                </div>
                <div className="relative h-[320px] lg:h-[400px] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200"
                    alt="Kuyash farm operations"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 40vw"
                  />
                </div>
              </motion.div>

              {/* right — 2×2 card grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {WHAT_WE_DO.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      {...fadeUp(i * 0.08)}
                      className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="relative h-36 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.label}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          sizes="(max-width:640px) 100vw, 300px"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                      </div>
                      <div className="p-4">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 bg-brand-bg">
                          <Icon className="w-4 h-4 text-brand" />
                        </div>
                        <p className="font-serif font-semibold text-sm mb-1 text-dark">{item.label}</p>
                        <p className="font-sans text-xs leading-relaxed text-gray-500">{item.sub}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        {/* ── 4. OUR PURPOSE ───────────────────────────────────────────────── */}
        <section className="bg-white py-20 overflow-hidden border-t border-border">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* left — image */}
              <motion.div {...fadeUp()} className="order-last lg:order-first">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200"
                    alt="Kuyash farm worker"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>

              {/* right — copy */}
              <motion.div {...fadeUp(0.15)}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">Our Purpose</p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                >
                  Why we do what we do.
                </h2>
                <p className="font-sans text-sm leading-relaxed mb-10 text-gray-600">
                  We believe that a stronger agricultural sector means better food availability, more local value creation, greater opportunities for farmers and stronger connections between production and markets.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 bg-brand-bg">
                      <Eye className="w-4 h-4 text-brand" />
                    </div>
                    <p className="font-serif font-semibold text-sm mb-1.5 text-dark">Our Vision</p>
                    <p className="font-sans text-xs leading-relaxed text-gray-500">
                      To be a leading integrated agricultural company in Nigeria, known for quality, innovation and impact.
                    </p>
                  </div>
                  <div>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 bg-brand-bg">
                      <Target className="w-4 h-4 text-brand" />
                    </div>
                    <p className="font-serif font-semibold text-sm mb-1.5 text-dark">Our Mission</p>
                    <p className="font-sans text-xs leading-relaxed text-gray-500">
                      To produce, process and distribute quality agricultural products while building skills, creating jobs and supporting sustainable growth.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ── 5. OUR APPROACH ──────────────────────────────────────────────── */}
        <section className="bg-cream py-20 overflow-hidden">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* left — copy + steps */}
              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">Our Approach</p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.06] mb-4"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                >
                  From production<br />to possibility.
                </h2>
                <p className="font-sans text-sm leading-relaxed mb-10 text-gray-600">
                  We manage the entire value chain, ensuring quality, efficiency and long-term value at every stage.
                </p>

                {/* 3-step flow */}
                <div className="flex items-start gap-4">
                  {APPROACH_STEPS.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.label} className="flex items-start gap-4 flex-1">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-brand-bg">
                            <Icon className="w-4 h-4 text-brand" />
                          </div>
                          {i < APPROACH_STEPS.length - 1 && (
                            <div className="hidden sm:flex items-center mt-[-20px] ml-10">
                              <ArrowRight className="w-4 h-4 shrink-0 text-muted" />
                            </div>
                          )}
                        </div>
                        <div className="pt-1">
                          <p className="font-serif font-semibold text-sm mb-1 text-dark">{step.label}</p>
                          <p className="font-sans text-xs leading-relaxed text-gray-500">{step.sub}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* right — image */}
              <motion.div {...fadeUp(0.15)}>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1200"
                    alt="Fresh farm produce"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ── 6. OUR COMMITMENTS ───────────────────────────────────────────── */}
        <section className="bg-white py-20 border-t border-border">
          <Container>
            <motion.div {...fadeUp()} className="mb-12">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">Our Commitments</p>
              <h2
                className="font-serif font-bold text-dark leading-[1.06]"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
              >
                The standards we work toward.
              </h2>
              <p className="font-sans text-sm leading-relaxed mt-4 max-w-xl text-gray-600">
                We are committed to doing things the right way — for our customers, our people, our communities and the environment.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {COMMITMENTS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    {...fadeUp(i * 0.08)}
                    className="p-6 rounded-2xl border border-border bg-cream hover:border-brand-border hover:shadow-sm transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-brand-bg">
                      <Icon className="w-5 h-5 text-brand" />
                    </div>
                    <p className="font-serif font-semibold text-sm mb-2 text-dark">{item.label}</p>
                    <p className="font-sans text-xs leading-relaxed text-gray-500">{item.sub}</p>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ── 7. IMPACT ────────────────────────────────────────────────────── */}
        <section className="relative py-24 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1920"
            alt="Kuyash farm impact"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-dark/80" />

          <div className="relative z-10">
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* left */}
                <motion.div {...fadeUp()}>
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-4 text-white/50">Our Impact</p>
                  <h2
                    className="font-serif font-bold text-white leading-[1.04] mb-5"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
                  >
                    Real work.<br />Real progress.
                  </h2>
                  <p className="font-sans text-white/60 text-sm leading-relaxed mb-8 max-w-md">
                    We are building a more productive and sustainable agricultural future through farming, processing, distribution and education. Our work supports local communities, creates jobs and contributes to food security in Nigeria.
                  </p>
                  <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-brand text-white hover:bg-brand-hover transition-colors duration-200"
                  >
                    See Our Projects <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>

                {/* right — impact items */}
                <motion.div {...fadeUp(0.15)} className="space-y-5">
                  {IMPACT_ITEMS.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.label}
                        {...fadeUp(i * 0.08)}
                        className="flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                      >
                        <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-serif font-semibold text-white text-sm mb-0.5">{item.label}</p>
                          <p className="font-sans text-white/50 text-xs leading-relaxed">{item.sub}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </Container>
          </div>
        </section>

        {/* ── 8. CTA STRIP ─────────────────────────────────────────────────── */}
        <section className="bg-dark py-20 overflow-hidden">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* left */}
              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-4 text-white/40">
                  Let&apos;s Grow Together
                </p>
                <h2
                  className="font-serif font-bold text-white leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
                >
                  Partner with us for a<br />
                  <span className="text-gold">stronger food future.</span>
                </h2>
                <p className="font-sans text-white/55 text-sm leading-relaxed mb-8 max-w-md">
                  Explore our products, discuss partnership opportunities or learn more about our agricultural training programs.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/shop/all"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-dark bg-gold hover:opacity-90 transition-opacity"
                  >
                    Explore Products <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border border-white/25 text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    Contact Our Team
                  </Link>
                </div>
              </motion.div>

              {/* right — brand mark */}
              <motion.div {...fadeUp(0.15)} className="hidden lg:flex flex-col items-end gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-brand">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22V12M12 12C12 7 7 3 2 4c0 5 4 9 10 8M12 12c0-5 5-9 10-8-1 5-5 9-10 8" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-serif font-bold text-white text-lg tracking-tight">Kuyash</p>
                    <p className="font-sans text-white/40 text-[10px] uppercase tracking-[0.15em]">Integrated Farm Ltd</p>
                  </div>
                </div>
                <p className="font-serif text-sm italic text-white/30">Good Food. Greater Impact.</p>
              </motion.div>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </>
  );
}
