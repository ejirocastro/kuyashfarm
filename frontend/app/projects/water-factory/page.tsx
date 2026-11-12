"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Droplets, ShieldCheck, Leaf, MapPin,
  Filter, Beaker, Gauge, Package, CheckCircle2,
  Phone, Mail,
} from "lucide-react";
import { fadeUp as _fadeUp } from "@/lib/tokens";
import { Button, Container } from "@/components/ui";
import { ProjectHero } from "@/components/sections";

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

// ─── page ─────────────────────────────────────────────────────────────────────
export default function WaterFactoryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">

        {/* ── 1. HERO ── */}
        <ProjectHero
          image="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=1600"
          imageAlt="Water bottling facility"
          eyebrow="Water Refinery"
          headline={<>Pure Water.<br />Healthier Lives.<br />A Stronger Future.</>}
          body="Kuyash Integrated Farm Ltd is developing a modern water refinery to produce high-quality, safe and refreshing drinking water for homes, businesses and communities across Nigeria."
          ctas={[
            { label: "Enquire About Our Project", href: "#contact" },
            { label: "Explore Our Plan", href: "#process", variant: "outline" },
          ]}
        />

        {/* ── 2. ABOUT THE PROJECT ── */}
        <section id="about" className="bg-white py-24border-y border-border">
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
        <section className="bg-white py-24border-b border-border">
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
                <Button
                  href="/shop/all"
                  variant="gold"
                >
                  View Product Range <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ── 5. PRODUCT SKU TABLE ── */}
        <section className="py-20 border-b border-border bg-cream">
          <Container>
            <motion.div {...fadeUp()} className="mb-10">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">Product Range</p>
              <h2
                className="font-serif font-bold text-dark leading-[1.06]"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
              >
                Available Sizes &amp; Formats
              </h2>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm font-sans min-w-[520px]">
                <thead>
                  <tr className="bg-dark2 text-white">
                    <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-widest rounded-tl-2xl">Format</th>
                    <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-widest">Size / Volume</th>
                    <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-widest">Pack Size</th>
                    <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-widest rounded-tr-2xl">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-white">
                  {[
                    { format: "Sachet Water",       size: "500 ml",    pack: "30 sachets / bag",   use: "Everyday hydration, events" },
                    { format: "Table Water Bottle",  size: "75 cl",     pack: "12 bottles / crate", use: "Homes, offices, restaurants" },
                    { format: "Table Water Bottle",  size: "1.5 L",     pack: "12 bottles / crate", use: "Family & institutional use" },
                    { format: "Dispenser Bottle",    size: "18.9 L",    pack: "Single unit",        use: "Offices, churches, schools" },
                    { format: "Bulk Supply",         size: "On request", pack: "Tanker delivery",   use: "Hotels, hospitals, factories" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-cream/40"}>
                      <td className="px-6 py-4 font-semibold text-dark">{row.format}</td>
                      <td className="px-6 py-4 text-gray-600">{row.size}</td>
                      <td className="px-6 py-4 text-gray-600">{row.pack}</td>
                      <td className="px-6 py-4 text-gray-500 text-xs">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <motion.p {...fadeUp(0.15)} className="mt-5 font-sans text-xs text-gray-400 text-center">
              Custom labelling and branded packaging available for bulk orders.{" "}
              <Link href="#contact" className="text-brand font-semibold hover:underline">Enquire now →</Link>
            </motion.p>
          </Container>
        </section>

        {/* ── 6. INTEGRATED FARM. GREATER VALUE. ── */}
        <section className="bg-white py-24border-b border-border">
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
                <Button
                  href="/#projects"
                  variant="gold"
                >
                  Explore Our Projects <ArrowRight className="h-4 w-4" />
                </Button>
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
                    <Button
                      href="mailto:kuyashfarmltd@gmail.com"
                      variant="gold"
                      external
                    >
                      Enquire <ArrowRight className="h-4 w-4" />
                    </Button>
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
                      <p className="font-sans text-sm text-white/65">+234 902 899 1521</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="font-sans text-xs font-semibold uppercase tracking-wider mb-1 text-gold">Email Us</p>
                      <p className="font-sans text-sm text-white/65">kuyashfarmltd@gmail.com</p>
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
