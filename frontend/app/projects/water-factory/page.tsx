"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft,
  Droplets, ShieldCheck, Leaf, MapPin,
  Filter, Beaker, Gauge, Package, CheckCircle2,
  Phone, Mail, Settings,
} from "lucide-react";
import { ease as EASE, fadeUp as _fadeUp } from "@/lib/tokens";
import { Container } from "@/components/ui";

const fadeUp = (delay = 0) => _fadeUp(delay);

// ─── data ─────────────────────────────────────────────────────────────────────

const ABOUT_PILLARS = [
  { icon: Filter,     label: "Advanced Filtration Technology" },
  { icon: ShieldCheck,label: "Safe & Clean Production Process" },
  { icon: Droplets,   label: "Sustainable Water Usage" },
  { icon: MapPin,     label: "Locally Produced" },
];

const PROCESS_STEPS = [
  { icon: Droplets,    num: "1", label: "Raw Water Intake" },
  { icon: Filter,      num: "2", label: "Filtration\n(Sand & Carbon)" },
  { icon: Beaker,      num: "3", label: "Purification\n(RO & UV)" },
  { icon: Gauge,       num: "4", label: "Mineral\nBalancing" },
  { icon: Package,     num: "5", label: "Bottling &\nPackaging" },
  { icon: CheckCircle2,num: "6", label: "Quality\nChecks" },
];

const PRODUCTS = [
  "Premium bottled drinking water (various sizes)",
  "Bulk water supply for hotels, restaurants and offices",
  "Customized packaging (branded bottles & labels)",
];

const QUALITY_PILLARS = [
  { icon: ShieldCheck, label: "Stringent Quality Control" },
  { icon: Settings,    label: "Modern Refinery Equipment" },
  { icon: Package,     label: "Hygienic Packaging" },
  { icon: Leaf,        label: "Environmental Responsibility" },
];

// ─── page ─────────────────────────────────────────────────────────────────────
export default function WaterFactoryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">

        {/* ── 1. HERO ── */}
        <section className="relative h-[88vh] min-h-[600px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=1600"
            alt="Water bottling facility"
            fill priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-dark/30" />
          <div className="absolute inset-0 bg-linear-to-t from-dark/85 via-dark/15 to-transparent" />

          <div className="absolute top-20 left-0 z-10 w-full">
            <Container>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: EASE }}>
                <Link
                  href="/#projects"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm text-white font-sans backdrop-blur-md hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> All Projects
                </Link>
              </motion.div>
            </Container>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 pb-20">
            <Container>
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.28em] mb-4 text-muted">Water Refinery</p>
                <h1
                  className="font-serif font-bold text-white leading-[1.04] max-w-2xl mb-5"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
                >
                  Pure Water.<br />Healthier Lives.<br />A Stronger Future.
                </h1>
                <p className="font-sans text-white/65 leading-relaxed max-w-lg mb-9" style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)" }}>
                  Kuyash Integrated Farm Ltd is developing a modern water refinery to produce high-quality, safe and refreshing drinking water for homes, businesses and communities across Nigeria.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-gold text-dark hover:opacity-90 transition-opacity"
                  >
                    Enquire About Our Project <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#process"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    Explore Our Plan
                  </Link>
                </div>
              </motion.div>
            </Container>
          </div>
        </section>

        {/* ── 2. ABOUT THE PROJECT ── */}
        <section id="about" className="bg-white py-20 border-y border-border">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-gold">About the Project</p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.06] mb-6"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                >
                  High-Quality Water<br />from a Trusted Source
                </h2>
                <div className="space-y-4 font-sans text-sm text-gray-600 leading-relaxed mb-10">
                  <p>
                    Our water refinery will use advanced filtration and purification technology to ensure every drop meets the highest standards of safety, taste and quality.
                  </p>
                  <p>
                    As part of our integrated farm, the water refinery complements our agricultural operations and supports our mission to deliver wholesome, locally produced products to the Nigerian market.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {ABOUT_PILLARS.map((p, i) => {
                    const Icon = p.icon;
                    return (
                      <motion.div key={p.label} {...fadeUp(i * 0.07)} className="flex flex-col items-center text-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center">
                          <Icon className="w-4 h-4 text-brand" />
                        </div>
                        <p className="font-sans text-xs font-semibold text-dark leading-snug">{p.label}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.15)}>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-border">
                  <Image
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200"
                    alt="Kuyash water facility" fill className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ── 3. OUR PROCESS ── */}
        <section id="process" className="py-20 border-b border-border bg-cream">
          <Container>
            <motion.div {...fadeUp()} className="text-center mb-14">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">Our Process</p>
              <h2
                className="font-serif font-bold text-dark leading-[1.06] mb-3"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
              >
                From Natural Water to Pure Refreshment
              </h2>
              <p className="font-sans text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
                We follow a rigorous multi-stage purification process to ensure every bottle is clean, safe and refreshing.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-nowrap gap-5 lg:gap-0">
              {PROCESS_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="flex items-start lg:flex-1">
                    <motion.div {...fadeUp(i * 0.08)} className="flex flex-col items-center text-center gap-3 flex-1">
                      <div className="w-14 h-14 rounded-full border-2 border-border bg-white flex items-center justify-center">
                        <Icon className="w-5 h-5 text-brand" />
                      </div>
                      <p className="font-sans text-[10px] font-semibold text-dark leading-snug max-w-20">
                        {step.num}. {step.label}
                      </p>
                    </motion.div>
                    {i < PROCESS_STEPS.length - 1 && (
                      <div className="hidden lg:flex items-center pt-5 shrink-0">
                        <ArrowRight className="w-4 h-4 text-muted" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ── 4. OUR WATER PRODUCTS ── */}
        <section className="bg-white py-20 border-b border-border">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <motion.div {...fadeUp()}>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?q=80&w=1200"
                    alt="Kuyash water bottles" fill className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.15)}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-gold">Our Water Products</p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                >
                  Pure. Safe. Refreshing.
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-7">
                  We will produce a range of bottled water products to meet different needs — from everyday hydration to bulk supply for businesses and institutions.
                </p>
                <ul className="space-y-3 mb-9">
                  {PRODUCTS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-brand" />
                      <span className="font-sans text-sm text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/shop/all"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold bg-gold text-dark hover:opacity-90 transition-opacity"
                >
                  View Product Range <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ── 5. WHY CHOOSE KUYASH WATER ── */}
        <section className="py-20 border-b border-border bg-cream">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-gold">Why Choose Kuyash Water</p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                >
                  Quality You Can Trust
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-10">
                  We are committed to delivering water that is safe, clean and consistently high in quality. Our facility will be built with modern technology, strict hygiene standards and a focus on sustainability.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {QUALITY_PILLARS.map((p, i) => {
                    const Icon = p.icon;
                    return (
                      <motion.div key={p.label} {...fadeUp(i * 0.07)} className="flex flex-col items-center text-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center">
                          <Icon className="w-4 h-4 text-brand" />
                        </div>
                        <p className="font-sans text-xs font-semibold text-dark leading-snug">{p.label}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.15)}>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1200"
                    alt="Water quality testing" fill className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ── 6. INTEGRATED FARM. GREATER VALUE. ── */}
        <section className="bg-white py-20 border-b border-border">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <motion.div {...fadeUp()}>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200"
                    alt="Kuyash integrated farm aerial view" fill className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.15)}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-gold">Part of a Bigger Vision</p>
                <h2
                  className="font-serif font-bold leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                >
                  <span className="text-dark">Integrated Farm.<br /></span>
                  <span className="text-brand">Greater Value.</span>
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-9">
                  The water refinery is one of several key projects under Kuyash Integrated Farm Ltd. It works hand-in-hand with our crop, livestock, fisheries and processing operations to create a fully integrated and sustainable agricultural business.
                </p>
                <Link
                  href="/#projects"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold bg-gold text-dark hover:opacity-90 transition-opacity"
                >
                  Explore Our Projects <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ── 7. GET IN TOUCH ── */}
        <section id="contact" className="relative py-24 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1600"
            alt="Clean water" fill className="object-cover object-center" sizes="100vw"
          />
          <div className="absolute inset-0 bg-dark2/90" />

          <div className="relative z-10">
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                <motion.div {...fadeUp()}>
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-4 text-gold">Get in Touch</p>
                  <h2
                    className="font-serif font-bold text-white leading-[1.04] mb-5"
                    style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
                  >
                    Let&apos;s Build a Cleaner,<br />Healthier Tomorrow.
                  </h2>
                  <p className="font-sans text-white/60 text-sm leading-relaxed mb-9 max-w-sm">
                    Partner with us or get in touch to learn more about our water refinery project and future supply opportunities.
                  </p>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                    <a
                      href="mailto:info@kuyashfarm.com"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold bg-gold text-dark hover:opacity-90 transition-opacity"
                    >
                      Enquire <ArrowRight className="h-4 w-4" />
                    </a>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors duration-200"
                    >
                      Contact Us
                    </Link>
                  </div>
                </motion.div>

                <motion.div {...fadeUp(0.15)} className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="font-sans text-xs font-semibold uppercase tracking-wider mb-1 text-gold">Our Location</p>
                      <p className="font-sans text-sm text-white/65 leading-snug">
                        No. 10, New Karshi Road,<br />
                        Opp. Setrocco Yard, Zangye Village,<br />
                        Uke Karu, Nasarawa State.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="font-sans text-xs font-semibold uppercase tracking-wider mb-1 text-gold">Call Us</p>
                      <p className="font-sans text-sm text-white/65">+234 800 000 0000</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="font-sans text-xs font-semibold uppercase tracking-wider mb-1 text-gold">Email Us</p>
                      <p className="font-sans text-sm text-white/65">info@kuyashfarm.com</p>
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
