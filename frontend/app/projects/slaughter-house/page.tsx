"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, Plus, Minus,
  Building2, ShieldCheck, Leaf, Truck,
  Stethoscope, Thermometer, SprayCan, Users,
  ShoppingBag, Store, UtensilsCrossed, ChefHat, Beef,
  ClipboardCheck, Package, PackageCheck,
} from "lucide-react";

// ─── brand tokens ─────────────────────────────────────────────────────────────
const EASE  = [0.16, 1, 0.3, 1] as const;
const BRAND = "#2d5f3f";
const DARK  = "#080f0a";
const DARK2 = "#1a3d2b";
const CREAM = "#faf8f5";
const BORDER= "#e8ede9";
const MUTED = "#6b9d7a";
const GOLD  = "#e8d5a3";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: EASE },
});

// ─── data ─────────────────────────────────────────────────────────────────────

const FACILITY_PILLARS = [
  { icon: Building2,  label: "Modern Infrastructure" },
  { icon: ShieldCheck,label: "Hygiene & Food Safety" },
  { icon: Leaf,       label: "Sustainable Practices" },
  { icon: Truck,      label: "Reliable Supply Chain" },
];

const MEAT_CATEGORIES = [
  {
    label: "Cattle & Beef",
    sub: "Premium beef, processed to the highest standards.",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=800",
    href: "/shop/all",
  },
  {
    label: "Goats & Sheep",
    sub: "Nutritious, high-quality meat cuts.",
    image: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=800",
    href: "/shop/all",
  },
  {
    label: "Poultry",
    sub: "Fresh, safe and responsibly processed.",
    image: "https://images.unsplash.com/photo-1612170153139-6f881ff067e0?q=80&w=800",
    href: "/services/poultry",
  },
];

const SAFETY_PILLARS = [
  { icon: Stethoscope,  label: "Veterinary Inspection" },
  { icon: Thermometer,  label: "Temperature Control" },
  { icon: SprayCan,     label: "Sanitation Procedures" },
  { icon: Users,        label: "Trained Professionals" },
];

const PROCESS_STEPS = [
  { icon: Beef,          label: "Livestock Sourcing & Receiving" },
  { icon: ClipboardCheck,label: "Inspection & Validation" },
  { icon: ShieldCheck,   label: "Processing & Dressing" },
  { icon: Thermometer,   label: "Chilling & Storage" },
  { icon: Package,       label: "Packaging" },
  { icon: Truck,         label: "Distribution" },
];

const WHO_WE_SERVE = [
  { icon: ShoppingBag,     label: "Meat Wholesalers" },
  { icon: Store,           label: "Retailers & Supermarkets" },
  { icon: UtensilsCrossed, label: "Hotels & Restaurants" },
  { icon: ChefHat,         label: "Caterers" },
  { icon: PackageCheck,    label: "Livestock Suppliers" },
];

const FAQS = [
  {
    q: "When will the slaughterhouse be operational?",
    a: "The facility is currently in the development and planning phase. We are working with partners and stakeholders to bring it online in the coming months. Register your interest to be notified.",
  },
  {
    q: "What types of livestock will be processed?",
    a: "The facility will process cattle, sheep, goats and poultry — all sourced from our integrated farm and verified local suppliers, meeting national food safety standards.",
  },
  {
    q: "Do you supply to individual customers?",
    a: "We primarily serve businesses — wholesalers, retailers, hotels, restaurants and caterers. Individual retail orders can be placed through our online shop at kuyashfarm.com/shop.",
  },
  {
    q: "How can I partner or place a bulk order?",
    a: "Fill in the enquiry form on this page or contact us directly at info@kuyashfarm.com. Our team will get back to you within 1–2 business days to discuss your needs.",
  },
];

// ─── FAQ accordion item ───────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b last:border-0" style={{ borderColor: BORDER }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-serif font-semibold text-sm" style={{ color: DARK }}>{q}</span>
        <span className="shrink-0 w-6 h-6 rounded-full border flex items-center justify-center" style={{ borderColor: BORDER }}>
          {open ? <Minus className="w-3 h-3" style={{ color: BRAND }} /> : <Plus className="w-3 h-3" style={{ color: BRAND }} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="font-sans text-sm leading-relaxed pb-5" style={{ color: "#4a5568" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────
export default function SlaughterHousePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ backgroundColor: CREAM }}>

        {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
        <section className="relative h-[88vh] min-h-[600px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1600"
            alt="Meat processing facility"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ backgroundColor: `${DARK}4d` }} />
          <div className="absolute inset-0 bg-linear-to-t from-[#080f0a]/85 via-[#080f0a]/15 to-transparent" />

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

              <p className="text-[10px] font-mono uppercase tracking-[0.28em] mb-4" style={{ color: MUTED }}>
                Slaughterhouse &amp; Meat Processing
              </p>

              <h1
                className="font-serif font-bold text-white leading-[1.04] max-w-2xl mb-5"
                style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
              >
                From Farm to Market.<br />
                Quality at Every Stage.
              </h1>

              <p className="font-sans text-white/65 leading-relaxed max-w-lg mb-9" style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)" }}>
                Kuyash Integrated Farm Ltd is developing a modern slaughterhouse and meat processing facility to ensure safe, hygienic and reliable meat supply — from our farms to your table.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="#partnership"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: GOLD, color: DARK }}
                >
                  Enquire About Our Facility <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#process"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors duration-200"
                >
                  Explore Our Processing Plans
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 2. THE FACILITY ──────────────────────────────────────────────── */}
        <section id="facility" className="bg-white py-20 border-y" style={{ borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* left — copy */}
              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3" style={{ color: MUTED }}>The Facility</p>
                <h2
                  className="font-serif font-bold leading-[1.06] mb-6"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: DARK }}
                >
                  Building a Modern<br />Meat Processing Hub
                </h2>
                <div className="space-y-4 font-sans text-sm leading-relaxed mb-10" style={{ color: "#4a5568" }}>
                  <p>
                    Our slaughterhouse is part of Kuyash&apos;s integrated farm vision — connecting livestock production with responsible processing, cold storage and dependable supply. The facility is designed to meet industry best practices, ensure food safety and deliver high-quality meat products to local and regional markets.
                  </p>
                </div>

                {/* 4 pillars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                  {FACILITY_PILLARS.map((p, i) => {
                    const Icon = p.icon;
                    return (
                      <motion.div key={p.label} {...fadeUp(i * 0.07)} className="flex flex-col items-center text-center gap-2">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#eef5f1" }}>
                          <Icon className="w-4 h-4" style={{ color: BRAND }} />
                        </div>
                        <p className="font-sans text-xs font-semibold leading-snug" style={{ color: DARK }}>{p.label}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* right — facility image */}
              <motion.div {...fadeUp(0.15)}>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden border" style={{ borderColor: BORDER }}>
                  <Image
                    src="https://images.unsplash.com/photo-1590504805695-b87b5b8b8c01?q=80&w=1200"
                    alt="Kuyash facility building"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 3. MEAT CATEGORIES ───────────────────────────────────────────── */}
        <section className="py-20" style={{ backgroundColor: CREAM }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3" style={{ color: MUTED }}>
                Our Livestock &amp; Meat Categories
              </p>
              <h2
                className="font-serif font-bold leading-[1.06] mb-3"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: DARK }}
              >
                Quality Meats from Healthy Livestock
              </h2>
              <p className="font-sans text-sm leading-relaxed max-w-lg mx-auto" style={{ color: "#4a5568" }}>
                We source and process from trusted, healthy livestock, ensuring quality, safety and great taste.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {MEAT_CATEGORIES.map((cat, i) => (
                <motion.div key={cat.label} {...fadeUp(i * 0.1)}>
                  <Link
                    href={cat.href}
                    className="group relative flex flex-col justify-end rounded-2xl overflow-hidden h-72 cursor-pointer"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#080f0a]/80 via-[#080f0a]/20 to-transparent" />
                    <div className="relative z-10 p-6 flex items-end justify-between">
                      <div>
                        <p className="font-serif font-bold text-white text-lg mb-1">{cat.label}</p>
                        <p className="font-sans text-white/65 text-xs">{cat.sub}</p>
                      </div>
                      <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300 shrink-0">
                        <ArrowRight className="w-4 h-4 text-white group-hover:text-[#2d5f3f] transition-colors duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. HYGIENE & SAFETY ──────────────────────────────────────────── */}
        <section className="bg-white py-20 border-t" style={{ borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* left — image */}
              <motion.div {...fadeUp()} className="order-last lg:order-first">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200"
                    alt="Food safety and hygiene"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>

              {/* right — copy */}
              <motion.div {...fadeUp(0.15)}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3" style={{ color: MUTED }}>
                  Safety &amp; Quality
                </p>
                <h2
                  className="font-serif font-bold leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: DARK }}
                >
                  Hygiene, Safety &amp;<br />Quality Assurance
                </h2>
                <p className="font-sans text-sm leading-relaxed mb-10" style={{ color: "#4a5568" }}>
                  We follow strict hygiene and safety protocols to ensure the highest standards at every stage of processing. Our approach includes veterinary inspection, temperature control, sanitation procedures and a trained, professional team committed to food safety and quality.
                </p>

                {/* 4 safety pillars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                  {SAFETY_PILLARS.map((p, i) => {
                    const Icon = p.icon;
                    return (
                      <motion.div key={p.label} {...fadeUp(i * 0.07)} className="flex flex-col items-center text-center gap-2">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#eef5f1" }}>
                          <Icon className="w-4 h-4" style={{ color: BRAND }} />
                        </div>
                        <p className="font-sans text-xs font-semibold leading-snug" style={{ color: DARK }}>{p.label}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 5. PROCESSING JOURNEY ────────────────────────────────────────── */}
        <section id="process" className="py-20 border-t overflow-hidden" style={{ backgroundColor: CREAM, borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-center">

              {/* left — copy + steps */}
              <div>
                <motion.div {...fadeUp()} className="mb-12">
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3" style={{ color: MUTED }}>Our Processing Journey</p>
                  <h2
                    className="font-serif font-bold leading-[1.06] mb-3"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: DARK }}
                  >
                    From Livestock to Your Table
                  </h2>
                  <p className="font-sans text-sm leading-relaxed max-w-lg" style={{ color: "#4a5568" }}>
                    A carefully managed process that ensures safety, quality and traceability.
                  </p>
                </motion.div>

                {/* 6-step horizontal flow */}
                <div className="flex flex-wrap lg:flex-nowrap gap-y-6 lg:gap-y-0">
                  {PROCESS_STEPS.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.label} className="flex items-start flex-1 min-w-[110px]">
                        <motion.div
                          {...fadeUp(i * 0.08)}
                          className="flex flex-col items-center text-center gap-2 flex-1"
                        >
                          <div className="w-11 h-11 rounded-full flex items-center justify-center border" style={{ backgroundColor: "white", borderColor: BORDER }}>
                            <Icon className="w-4 h-4" style={{ color: BRAND }} />
                          </div>
                          <p className="font-sans text-[10px] font-semibold leading-snug max-w-[80px]" style={{ color: DARK }}>{step.label}</p>
                        </motion.div>
                        {i < PROCESS_STEPS.length - 1 && (
                          <div className="hidden lg:flex items-center pt-3.5 shrink-0">
                            <ArrowRight className="w-4 h-4" style={{ color: MUTED }} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* right — image */}
              <motion.div {...fadeUp(0.2)}>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=800"
                    alt="Meat processing"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 380px"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 6. WHO WE SERVE ──────────────────────────────────────────────── */}
        <section className="py-20 overflow-hidden" style={{ backgroundColor: DARK2 }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_240px] gap-12 items-center">

              {/* left — chef image */}
              <motion.div {...fadeUp()}>
                <div className="relative h-72 lg:h-80 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800"
                    alt="Chef plating food"
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </div>
              </motion.div>

              {/* centre — copy */}
              <motion.div {...fadeUp(0.1)}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3" style={{ color: GOLD }}>Who We Serve</p>
                <h2
                  className="font-serif font-bold text-white leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                >
                  Trusted by Businesses,<br />Across the Food Chain
                </h2>
                <p className="font-sans text-white/60 text-sm leading-relaxed mb-8 max-w-md">
                  We supply quality meat products to a wide range of customers, including wholesalers, retailers, supermarkets, hotels, restaurants, caterers and livestock suppliers.
                </p>
                <Link
                  href="#partnership"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: GOLD, color: DARK }}
                >
                  Partner With Us <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              {/* right — customer types */}
              <motion.div {...fadeUp(0.2)} className="space-y-3">
                {WHO_WE_SERVE.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      {...fadeUp(i * 0.07)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5"
                    >
                      <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <p className="font-sans text-sm text-white/80">{item.label}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 7. THE KUYASH ADVANTAGE ──────────────────────────────────────── */}
        <section className="bg-white py-20 border-t" style={{ borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* left — copy */}
              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3" style={{ color: MUTED }}>The Kuyash Advantage</p>
                <h2
                  className="font-serif font-bold leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: DARK }}
                >
                  Integrated Farm.<br />
                  <span style={{ color: BRAND }}>Greater Value.</span>
                </h2>
                <p className="font-sans text-sm leading-relaxed mb-8 max-w-md" style={{ color: "#4a5568" }}>
                  Our slaughterhouse is part of a larger integrated farm, working hand-in-hand with our poultry, livestock, fisheries and crop projects. This integration ensures better control, higher quality and a more reliable supply chain — from farm to processing to market.
                </p>
                <Link
                  href="/#projects"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: GOLD, color: DARK }}
                >
                  Explore Our Projects <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              {/* right — aerial farm image */}
              <motion.div {...fadeUp(0.15)}>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200"
                    alt="Kuyash integrated farm aerial view"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 8. FAQ + PARTNERSHIP ─────────────────────────────────────────── */}
        <section id="partnership" className="py-20 border-t" style={{ backgroundColor: CREAM, borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* left — FAQ */}
              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3" style={{ color: MUTED }}>
                  Frequently Asked Questions
                </p>
                <h2
                  className="font-serif font-bold leading-[1.06] mb-8"
                  style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", color: DARK }}
                >
                  Common Questions
                </h2>
                <div className="divide-y divide-[#e8ede9]">
                  {FAQS.map((faq) => (
                    <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </motion.div>

              {/* right — partnership card */}
              <motion.div {...fadeUp(0.15)}>
                <div className="rounded-2xl p-8 flex flex-col gap-6 sticky top-24" style={{ backgroundColor: DARK2 }}>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3" style={{ color: GOLD }}>
                      Let&apos;s Work Together
                    </p>
                    <h3
                      className="font-serif font-bold text-white leading-[1.06] mb-3"
                      style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)" }}
                    >
                      Discuss a Partnership
                    </h3>
                    <p className="font-sans text-white/55 text-sm leading-relaxed">
                      We welcome enquiries from buyers, partners and suppliers. Tell us about your needs and we&apos;ll get back to you.
                    </p>
                  </div>

                  <a
                    href="mailto:info@kuyashfarm.com"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90 self-start"
                    style={{ backgroundColor: GOLD, color: DARK }}
                  >
                    Send an Enquiry <ArrowRight className="h-4 w-4" />
                  </a>

                  {/* contact details */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-white/60" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 9.82 19.79 19.79 0 01.43 1.18 2 2 0 012.41 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                        </svg>
                      </div>
                      <p className="font-sans text-sm text-white/60">+234 802 002 0000</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
                        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-white/60" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                      </div>
                      <p className="font-sans text-sm text-white/60 leading-snug">
                        Jangwe Village, Uke Karu,<br />Nasarawa State, Nigeria
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-white/60" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                        </svg>
                      </div>
                      <p className="font-sans text-sm text-white/60">info@kuyashfarm.com</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
