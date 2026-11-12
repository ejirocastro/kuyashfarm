"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Plus, Minus,
  Building2, ShieldCheck, Leaf, Truck,
  Stethoscope, Thermometer, SprayCan, Users,
  ShoppingBag, Store, UtensilsCrossed, ChefHat, Beef,
  ClipboardCheck, Microscope, Package, PackageCheck,
} from "lucide-react";
import { ease as EASE, fadeUp as _fadeUp, springReveal } from "@/lib/tokens";
import { Button, Container } from "@/components/ui";
import { ProjectHero } from "@/components/sections";

const fadeUp = (delay = 0) => _fadeUp(delay);

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
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=800",
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
  {
    icon: Beef,
    label: "Ante-Mortem Inspection",
    detail: "All livestock undergo veterinary inspection on arrival. Animals showing signs of disease, stress or injury are quarantined and not passed for slaughter.",
  },
  {
    icon: ShieldCheck,
    label: "Halal Stunning & Slaughter",
    detail: "Cattle and sheep are stunned electrically (low-voltage, recoverable) immediately before slaughter. All slaughter is performed by a certified halal operator under Islamic rites.",
  },
  {
    icon: ClipboardCheck,
    label: "Dressing & Evisceration",
    detail: "Carcasses are skinned, eviscerated and split on a hygienic overhead rail system. Organs are retained separately for veterinary post-mortem examination.",
  },
  {
    icon: Microscope,
    label: "Post-Mortem Inspection",
    detail: "A resident veterinary officer inspects every carcass and organ set before passing. Condemned material is disposed of under NAFDAC and state veterinary authority guidelines.",
  },
  {
    icon: Thermometer,
    label: "Chilling & Cold Storage",
    detail: "Passed carcasses enter refrigerated holding at 0–4°C within 45 minutes of slaughter and are held for a minimum of 24 hours before dispatch.",
  },
  {
    icon: Package,
    label: "Cutting, Packaging & Dispatch",
    detail: "Carcasses are broken down to primal cuts on a temperature-controlled cutting floor, vacuum-packed with batch traceability codes, and loaded onto refrigerated vehicles.",
  },
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
    q: "What is the planned processing throughput?",
    a: "The facility is designed for a throughput of approximately 50 cattle or 200 small ruminants (sheep/goats) per shift. Poultry processing will be handled on a separate dedicated line. Capacity can be scaled with demand.",
  },
  {
    q: "Is the facility halal-certified?",
    a: "Yes. All slaughter will be performed by a certified halal operator under Islamic rites. The electrical stunning method used is low-voltage and recoverable, which is accepted under ESMA and JAKIM halal standards.",
  },
  {
    q: "What types of livestock will be processed?",
    a: "The facility will process cattle, sheep, goats and poultry — sourced from our integrated farm and verified local suppliers. All animals pass ante-mortem veterinary inspection before entering the slaughter floor.",
  },
  {
    q: "Do you supply to individual customers?",
    a: "We primarily serve businesses — wholesalers, retailers, hotels, restaurants and caterers. Individual retail orders can be placed through our online shop at kuyashfarm.com/shop.",
  },
  {
    q: "How can I partner or place a bulk order?",
    a: "Fill in the enquiry form on this page or contact us directly at kuyashfarmltd@gmail.com. Our team will get back to you within 1–2 business days to discuss your needs.",
  },
];

// ─── FAQ accordion item ───────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-serif font-semibold text-sm text-dark">{q}</span>
        <span className="shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center">
          {open
            ? <Minus className="w-3 h-3 text-brand" />
            : <Plus className="w-3 h-3 text-brand" />
          }
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springReveal}
            className="overflow-hidden"
          >
            <p className="font-sans text-sm text-gray-600 leading-relaxed pb-5">{a}</p>
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
      <main className="min-h-screen bg-cream">

        {/* ── 1. HERO ── */}
        <ProjectHero
          image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1600"
          imageAlt="Meat processing facility"
          eyebrow="Slaughterhouse & Meat Processing"
          headline={<>From Farm to Market.<br />Quality at Every Stage.</>}
          body="Kuyash Integrated Farm Ltd is developing a modern slaughterhouse and meat processing facility to ensure safe, hygienic and reliable meat supply — from our farms to your table."
          ctas={[
            { label: "Enquire About Our Facility", href: "#partnership" },
            { label: "Explore Our Processing Plans", href: "#process", variant: "outline" },
          ]}
        />

        {/* ── 2. THE FACILITY ── */}
        <section id="facility" className="bg-white py-24border-y border-border">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">The Facility</p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.06] mb-6"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                >
                  Building a Modern<br />Meat Processing Hub
                </h2>
                <div className="space-y-4 font-sans text-sm text-gray-600 leading-relaxed mb-10">
                  <p>
                    Our slaughterhouse is part of Kuyash&apos;s integrated farm vision — connecting livestock production with responsible processing, cold storage and dependable supply. The facility is designed to meet industry best practices, ensure food safety and deliver high-quality meat products to local and regional markets.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {FACILITY_PILLARS.map((p, i) => {
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
                    src="https://images.unsplash.com/photo-1590504805695-b87b5b8b8c01?q=80&w=1200"
                    alt="Kuyash facility building"
                    fill className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ── 3. MEAT CATEGORIES ── */}
        <section className="py-20 bg-cream">
          <Container>
            <motion.div {...fadeUp()} className="text-center mb-12">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">
                Our Livestock &amp; Meat Categories
              </p>
              <h2
                className="font-serif font-bold text-dark leading-[1.06] mb-3"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
              >
                Quality Meats from Healthy Livestock
              </h2>
              <p className="font-sans text-sm text-gray-600 leading-relaxed max-w-lg mx-auto">
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
                      src={cat.image} alt={cat.label} fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-dark/80 via-dark/20 to-transparent" />
                    <div className="relative z-10 p-6 flex items-end justify-between">
                      <div>
                        <p className="font-serif font-bold text-white text-lg mb-1">{cat.label}</p>
                        <p className="font-sans text-white/65 text-xs">{cat.sub}</p>
                      </div>
                      <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300 shrink-0">
                        <ArrowRight className="w-4 h-4 text-white group-hover:text-brand transition-colors duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── 4. HYGIENE & SAFETY ── */}
        <section className="bg-white py-24border-t border-border">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <motion.div {...fadeUp()} className="order-last lg:order-first">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200"
                    alt="Food safety and hygiene"
                    fill className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.15)}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">Safety &amp; Quality</p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                >
                  Hygiene, Safety &amp;<br />Quality Assurance
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-10">
                  We follow strict hygiene and safety protocols to ensure the highest standards at every stage of processing. Our approach includes veterinary inspection, temperature control, sanitation procedures and a trained, professional team committed to food safety and quality.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {SAFETY_PILLARS.map((p, i) => {
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
            </div>
          </Container>
        </section>

        {/* ── 5. PROCESSING JOURNEY ── */}
        <section id="process" className="py-20 border-t border-border overflow-hidden bg-cream">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-center">

              <div>
                <motion.div {...fadeUp()} className="mb-12">
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">Our Processing Journey</p>
                  <h2
                    className="font-serif font-bold text-dark leading-[1.06] mb-3"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                  >
                    From Livestock to Your Table
                  </h2>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed max-w-lg">
                    A carefully managed process that ensures safety, quality and traceability.
                  </p>
                </motion.div>

                <div className="flex flex-col divide-y divide-border">
                  {PROCESS_STEPS.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <motion.div
                        key={step.label}
                        {...fadeUp(i * 0.07)}
                        className="flex items-start gap-4 py-4 first:pt-0"
                      >
                        <div className="w-9 h-9 rounded-full bg-brand-bg flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-brand" />
                        </div>
                        <div>
                          <p className="font-sans text-sm font-semibold text-dark mb-0.5">{step.label}</p>
                          <p className="font-sans text-xs text-gray-500 leading-relaxed">{step.detail}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <motion.div {...fadeUp(0.2)}>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=800"
                    alt="Meat processing" fill className="object-cover"
                    sizes="(max-width:1024px) 100vw, 380px"
                  />
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ── 6. COLD-CHAIN & LOGISTICS ── */}
        <section className="bg-white py-24border-t border-border">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">Cold-Chain & Logistics</p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                >
                  Fresh to You.<br />Every Single Time.
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-8 max-w-md">
                  Maintaining the cold chain from slaughter to delivery is non-negotiable. Our logistics process is built around strict temperature control at every stage, so meat arrives at your door in peak condition.
                </p>

                <div className="space-y-4">
                  {[
                    { step: "01", title: "Immediate Chilling", detail: "Carcasses enter refrigerated holding rooms (0–4°C) within 45 minutes of processing." },
                    { step: "02", title: "Cold Storage", detail: "Temperature-controlled holding facilities maintain product quality during staging and inspection." },
                    { step: "03", title: "Refrigerated Transport", detail: "All deliveries are made in certified refrigerated vehicles, tracked in real time." },
                    { step: "04", title: "Last-Mile Delivery", detail: "Products arrive at wholesalers, retailers and hospitality operators within 24 hours of dispatch." },
                  ].map((item, i) => (
                    <motion.div
                      key={item.step}
                      {...fadeUp(i * 0.07)}
                      className="flex items-start gap-4 p-4 rounded-xl border border-border bg-cream"
                    >
                      <span className="font-mono text-xs font-bold text-brand shrink-0 mt-0.5">{item.step}</span>
                      <div>
                        <p className="font-serif font-semibold text-dark text-sm mb-1">{item.title}</p>
                        <p className="font-sans text-xs text-gray-500 leading-relaxed">{item.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.15)}>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=1200"
                    alt="Refrigerated logistics and cold chain"
                    fill className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { value: "0–4°C", label: "Storage Temp" },
                    { value: "<45 min", label: "Time to Chill" },
                    { value: "24 hr", label: "Max Delivery Window" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-border bg-white p-4 text-center">
                      <p className="font-serif font-bold text-brand text-lg leading-none mb-1">{s.value}</p>
                      <p className="font-sans text-[10px] text-gray-500 leading-snug">{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ── 8. WHO WE SERVE ── */}
        <section className="py-20 overflow-hidden bg-dark2">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_240px] gap-12 items-center">

              <motion.div {...fadeUp()}>
                <div className="relative h-72 lg:h-80 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800"
                    alt="Chef plating food" fill className="object-cover" sizes="320px"
                  />
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.1)}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-gold">Who We Serve</p>
                <h2
                  className="font-serif font-bold text-white leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                >
                  Trusted by Businesses,<br />Across the Food Chain
                </h2>
                <p className="font-sans text-white/60 text-sm leading-relaxed mb-8 max-w-md">
                  We supply quality meat products to a wide range of customers, including wholesalers, retailers, supermarkets, hotels, restaurants, caterers and livestock suppliers.
                </p>
                <Button
                  href="#partnership"
                  variant="gold"
                >
                  Partner With Us <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>

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
          </Container>
        </section>

        {/* ── 9. THE KUYASH ADVANTAGE ── */}
        <section className="bg-white py-24border-t border-border">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">The Kuyash Advantage</p>
                <h2
                  className="font-serif font-bold leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                >
                  <span className="text-dark">Integrated Farm.<br /></span>
                  <span className="text-brand">Greater Value.</span>
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-8 max-w-md">
                  Our slaughterhouse is part of a larger integrated farm, working hand-in-hand with our poultry, livestock, fisheries and crop projects. This integration ensures better control, higher quality and a more reliable supply chain — from farm to processing to market.
                </p>
                <Button
                  href="/#projects"
                  variant="gold"
                >
                  Explore Our Projects <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div {...fadeUp(0.15)}>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200"
                    alt="Kuyash integrated farm aerial view"
                    fill className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ── 10. FAQ + PARTNERSHIP ── */}
        <section id="partnership" className="py-20 border-t border-border bg-cream">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">
                  Frequently Asked Questions
                </p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.06] mb-8"
                  style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)" }}
                >
                  Common Questions
                </h2>
                <div className="divide-y divide-border">
                  {FAQS.map((faq) => (
                    <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.15)}>
                <div className="rounded-2xl p-8 flex flex-col gap-6 sticky top-24 bg-dark2">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-gold">
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

                  <Button
                    href="mailto:kuyashfarmltd@gmail.com"
                    variant="gold"
                    className="self-start"
                    external
                  >
                    Send an Enquiry <ArrowRight className="h-4 w-4" />
                  </Button>

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
                      <p className="font-sans text-sm text-white/60">kuyashfarmltd@gmail.com</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </>
  );
}
