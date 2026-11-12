"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Leaf, Heart, Shield, Star } from "lucide-react";
import { ease as EASE, fadeUp as _fadeUp } from "@/lib/tokens";
import { Button, Container, SectionLabel } from "@/components/ui";

const fadeUp = (delay = 0) => _fadeUp(delay);

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
      <main className="bg-cream">

        {/* ── SECTION 1: HERO ── */}
        <section className="overflow-hidden border-b border-border">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] items-center gap-12 py-20 lg:py-0">

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: EASE }}
                className="lg:py-24"
              >
                <SectionLabel>Our Processing Facilities</SectionLabel>
                <h1
                  className="mb-6 font-serif font-bold text-dark leading-[1.04]"
                  style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)" }}
                >
                  Premium<br />Groundnut Oil<br />Production
                </h1>
                <p className="mb-8 font-sans text-sm leading-relaxed max-w-sm text-gray-600">
                  From farm to bottle, we process the finest groundnuts into pure, high-quality oil — naturally rich, nutritious, and trusted by families and businesses alike.
                </p>
                <a
                  href="#process"
                  className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-dark underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  Our Process <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="relative flex items-center justify-end"
              >
                <div className="relative w-full max-w-lg aspect-[3/2] sm:aspect-[4/3] lg:aspect-auto lg:h-[520px]">
                  <Image
                    src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=900"
                    alt="Premium groundnut oil in glass bottle with nuts"
                    fill
                    className="object-cover object-center rounded-2xl lg:rounded-none"
                    priority
                  />
                </div>
                <div className="absolute right-0 top-1/3 hidden lg:flex flex-col items-center gap-1 pr-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-gray-400 [writing-mode:vertical-rl] rotate-180">
                    Pure · Natural · Nutritious
                  </p>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ── SECTION 2: OUR PROCESS ── */}
        <section id="process" className="py-24 border-b border-border bg-cream">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16">

              <motion.div {...fadeUp(0)}>
                <SectionLabel>Our Process</SectionLabel>
                <h2
                  className="mb-6 font-serif font-bold text-dark leading-[1.06]"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
                >
                  Carefully Extracted,<br />Naturally Good
                </h2>
                <p className="mb-6 font-sans text-sm leading-relaxed text-gray-600">
                  Our groundnut oil is produced using modern extraction methods that preserve its natural flavour, nutrients and purity. We follow strict quality control at every stage — from sourcing the best groundnuts to final packaging.
                </p>
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-dark underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  Learn About Our Process <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </motion.div>

              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-5">
                {PROCESS_STEPS.map((step, i) => (
                  <motion.div key={step.num} {...fadeUp(i * 0.08)}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono text-xs font-semibold text-muted">{step.num}</span>
                      <span className="font-sans text-sm font-semibold text-dark">{step.label}</span>
                      {i < 3 && <ArrowRight className="h-3 w-3 ml-auto shrink-0 text-gray-400" />}
                    </div>
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                      <Image
                        src={step.image}
                        alt={step.label}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    <p className="font-sans text-xs leading-relaxed text-gray-500">
                      {step.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ── SECTION 3: WHY CHOOSE KUYASH ── */}
        <section className="border-b border-border overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            <motion.div {...fadeUp(0)} className="relative min-h-[380px] lg:min-h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1599599810694-b5b37304c041?q=80&w=900"
                alt="Sourced from trusted local farmers"
                fill
                className="object-cover object-center"
              />
              <div className="absolute bottom-6 left-6">
                <p className="font-sans text-sm font-medium leading-snug text-white drop-shadow-md">
                  Sourced from<br />trusted local farmers<br />and processed with care.
                </p>
              </div>
            </motion.div>

            <div className="flex flex-col justify-center px-8 py-16 md:px-12 lg:px-14 bg-cream">
              <motion.div {...fadeUp(0)}>
                <SectionLabel>Why Choose Kuyash</SectionLabel>
                <h2
                  className="mb-5 font-serif font-bold text-dark leading-[1.04]"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
                >
                  Pure Goodness.<br />Real Value.
                </h2>
                <p className="mb-10 font-sans text-sm leading-relaxed max-w-sm text-gray-600">
                  Our groundnut oil is rich in healthy fats, free from additives, and carefully processed to retain its natural goodness. It&apos;s the perfect choice for cooking, baking, and a healthier lifestyle.
                </p>

                <div className="space-y-6">
                  {WHY_CHOOSE.map(({ icon: Icon, title, sub }, i) => (
                    <motion.div key={title} {...fadeUp(i * 0.07)} className="flex items-start gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-bg">
                        <Icon className="h-4 w-4 text-brand" />
                      </div>
                      <div>
                        <p className="font-sans text-sm font-semibold text-dark">{title}</p>
                        <p className="font-sans text-xs text-gray-500">{sub}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: QUALITY & CERTIFICATIONS ── */}
        <section className="bg-white py-24 border-b border-border">
          <Container>
            <motion.div {...fadeUp()} className="text-center mb-14">
              <SectionLabel>Quality Standards</SectionLabel>
              <h2
                className="font-serif font-bold text-dark leading-[1.06] mt-3"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
              >
                How We Guarantee Purity
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
              {[
                {
                  badge: "SON Certified",
                  title: "Standards Organisation of Nigeria",
                  desc: "Our production process and product specifications comply with SON quality standards for edible vegetable oils in Nigeria.",
                },
                {
                  badge: "Cold-Press Extraction",
                  title: "No Heat. No Solvents.",
                  desc: "We use mechanical cold-pressing to extract oil without chemicals or high heat, preserving natural nutrients and flavour.",
                },
                {
                  badge: "Lab Tested",
                  title: "Every Batch Tested",
                  desc: "Each production batch is screened for free fatty acid content, peroxide value, moisture and colour before packaging.",
                },
                {
                  badge: "Additive-Free",
                  title: "Zero Additives",
                  desc: "No artificial preservatives, colourants or flavour enhancers — just pure groundnut oil from farm to bottle.",
                },
                {
                  badge: "Hygienic Facility",
                  title: "GMP Compliant",
                  desc: "Our facility operates under Good Manufacturing Practice (GMP) guidelines for food safety, hygiene and traceability.",
                },
                {
                  badge: "Traceable Sourcing",
                  title: "Known Origins",
                  desc: "Every batch of groundnuts is traceable to our farm or verified local partner farms, ensuring consistent quality and safety.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.badge}
                  {...fadeUp(i * 0.07)}
                  className="rounded-2xl border border-border p-6 bg-cream"
                >
                  <span className="inline-block mb-4 rounded-full bg-brand-bg px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand">
                    {item.badge}
                  </span>
                  <p className="font-serif font-semibold text-dark text-sm mb-2">{item.title}</p>
                  <p className="font-sans text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeUp(0.1)} className="rounded-2xl bg-dark2 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="font-serif font-bold text-white text-base mb-1">Need a Certificate of Analysis?</p>
                <p className="font-sans text-white/55 text-sm">We provide batch test reports for all commercial orders on request.</p>
              </div>
              <Button
                href="/contact"
                variant="gold"
                size="sm"
                className="shrink-0"
              >
                Request a CoA <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </Container>
        </section>

        {/* ── SECTION 5: OUR PRODUCTS + PARTNER ── */}
        <section id="products" className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">

            <div className="flex flex-col justify-center px-8 py-16 md:px-12 lg:px-14 bg-cream">
              <motion.div {...fadeUp(0)}>
                <SectionLabel>Our Products</SectionLabel>
                <h2
                  className="mb-4 font-serif font-bold text-dark leading-[1.06]"
                  style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}
                >
                  Pure Groundnut Oil<br />for Every Purpose
                </h2>
                <p className="mb-6 font-sans text-sm leading-relaxed text-gray-600">
                  Available in various packaging options to suit your needs — from household use to commercial supply.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-dark underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  View Our Products <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            </div>

            <motion.div
              {...fadeUp(0.08)}
              className="relative min-h-[320px] lg:min-h-0 bg-cream"
            >
              <Image
                src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=700"
                alt="Kuyash groundnut oil bottles"
                fill
                className="object-cover object-center"
              />
            </motion.div>

            <motion.div
              {...fadeUp(0.12)}
              className="flex flex-col justify-center px-8 py-16 md:px-12 lg:px-14 bg-brand"
            >
              <SectionLabel>Get in Touch</SectionLabel>
              <h2
                className="mb-4 font-serif font-bold leading-[1.06] text-white"
                style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}
              >
                Partner With Us
              </h2>
              <p className="mb-8 font-sans text-sm leading-relaxed text-white/70">
                Looking for bulk supply or want to learn more about our products? We&apos;re here to help.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 self-start rounded-full border border-white/30 px-6 py-3 font-sans text-sm font-semibold text-white transition-all duration-200 hover:bg-white hover:text-brand"
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
