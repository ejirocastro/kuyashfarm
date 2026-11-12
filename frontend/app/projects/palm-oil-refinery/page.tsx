"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, TrendingUp, Link2, Leaf,
  ShieldCheck, Settings, Users, Globe, CheckCircle2,
  Handshake, Plus, Minus,
} from "lucide-react";
import { ease as EASE, fadeUp as _fadeUp, springReveal } from "@/lib/tokens";
import { Button, Container } from "@/components/ui";
import { ProjectHero } from "@/components/sections";

const fadeUp = (delay = 0) => _fadeUp(delay);

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
    sub: "FFBs sourced from our farms and verified local growers within 24 hours of harvest to minimise free fatty acid (FFA) build-up.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600",
  },
  {
    num: "2",
    label: "Crude Palm Oil (CPO)",
    sub: "Fruit is sterilised, stripped and mechanically pressed. Clarified CPO is settled and dried before entering the refinery.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600",
  },
  {
    num: "3",
    label: "Degumming",
    sub: "Phosphoric acid is added to hydrate and precipitate phosphatides (gums) from the CPO. Removes impurities that would otherwise darken the final oil.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600",
  },
  {
    num: "4",
    label: "Bleaching",
    sub: "Degummed oil passes through bleaching earth under vacuum to adsorb carotenoids (colour pigments), residual phosphatides and trace metals — yielding pale yellow oil.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600",
  },
  {
    num: "5",
    label: "Deodorising",
    sub: "Bleached oil is steam-stripped under high vacuum at 240–260°C to remove free fatty acids, aldehydes and ketones responsible for odour and flavour — producing RBD palm oil.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600",
  },
  {
    num: "6",
    label: "Fractionation & Dispatch",
    sub: "RBD oil is crystallised and filtered to yield olein (liquid, for cooking oil) and stearin (solid, for margarine/soap). Both fractions are tested and packed for market.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600",
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

const FAQS = [
  {
    q: "What stage is the refinery project currently at?",
    a: "The project is in the planning and infrastructure development phase. Equipment installation and commissioning are scheduled for the next phase. Register your interest to stay informed.",
  },
  {
    q: "What products will the refinery produce?",
    a: "The refinery will produce Refined Bleached Deodorised (RBD) palm oil for the food industry, as well as palm kernel oil, palm stearin and other by-products for industrial and cosmetic use.",
  },
  {
    q: "Will you source from independent farmers?",
    a: "Yes. Beyond our own plantation, we plan to establish contract-farming relationships with verified local growers, providing a guaranteed offtake at fair market prices.",
  },
  {
    q: "How can I invest or partner with the project?",
    a: "We welcome investors, equipment suppliers and off-takers. Fill in the contact form or email us at kuyashfarmltd@gmail.com and our business development team will respond within 2 business days.",
  },
  {
    q: "Will the refined oil meet international quality standards?",
    a: "Yes. The refinery will be designed to meet SON (Standards Organisation of Nigeria) specifications and, over time, Codex Alimentarius standards for export eligibility.",
  },
];

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

export default function PalmOilRefineryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">

        {/* ── 1. HERO ── */}
        <ProjectHero
          image="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2070"
          imageAlt="Palm Oil Refinery"
          eyebrow="Ongoing Project / Processing & Value Addition"
          headline={<>From Palm Harvest<br /><span className="text-gold">to Refined Value.</span></>}
          body="Developing local processing capacity to turn palm produce into dependable, value-added products for Nigerian markets."
          ctas={[
            { label: "Explore the Project", href: "#about" },
            { label: "Discuss a Partnership", href: "/contact", variant: "outline" },
          ]}
        />

        {/* ── 2. THREE-PILLAR STRIP ── */}
        <section className="bg-white border-y border-border">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
              {PILLARS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.label}
                    {...fadeUp(i * 0.1)}
                    className="flex items-start gap-4 px-0 sm:px-8 py-8 first:pl-0 last:pr-0"
                  >
                    <div className="w-9 h-9 rounded-xl bg-brand-bg flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-brand" />
                    </div>
                    <div>
                      <p className="font-serif font-semibold text-sm text-dark mb-1">{p.label}</p>
                      <p className="font-sans text-xs leading-relaxed text-gray-500">{p.sub}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ── 3. ABOUT THE PROJECT ── */}
        <section id="about" className="bg-white py-24overflow-hidden">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">The Project</p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.08] mb-6"
                  style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)" }}
                >
                  Building capacity for the next<br />stage of production
                </h2>
                <div className="space-y-4 font-sans text-sm leading-relaxed text-gray-600 mb-8">
                  <p>
                    The palm oil refinery project is part of our integrated farm vision, focused on adding value to locally sourced palm produce and creating opportunities across the value chain.
                  </p>
                  <p>
                    This project will enable us to process crude palm oil into refined palm oil and other valuable by-products, supporting local farmers, creating jobs and contributing to Nigeria&apos;s food and industrial growth.
                  </p>
                </div>
                <Link
                  href="/shop/all"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-brand hover:bg-brand-hover transition-colors duration-200"
                >
                  Our Products <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div {...fadeUp(0.15)} className="space-y-3">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1200"
                    alt="Palm oil processing equipment"
                    fill className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
                <p className="font-sans text-xs italic pl-1 text-gray-400">
                  Modern processing technology for high-quality refined palm oil.
                </p>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ── 4. PROCESSING PROCESS ── */}
        <section className="py-20 overflow-hidden bg-cream">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start">

              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">Our Process</p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.08] mb-5"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}
                >
                  Our Processing Process
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-8">
                  The refinery will follow a safe, efficient and environmentally responsible process to produce high-quality refined palm oil and valuable by-products.
                </p>
                <Link
                  href="#about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-brand text-brand hover:bg-white transition-colors duration-200"
                >
                  Learn More About Our Process <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PROCESS_STEPS.map((step, i) => (
                  <motion.div key={step.num} {...fadeUp(i * 0.07)} className="rounded-2xl border border-border bg-cream p-5">
                    <p className="font-mono text-xs font-bold text-muted mb-2 tracking-[0.15em]">{step.num}.</p>
                    <p className="font-serif font-semibold text-sm text-dark mb-1.5">{step.label}</p>
                    <p className="font-sans text-xs leading-relaxed text-gray-500">{step.sub}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ── 5. WHY IT MATTERS ── */}
        <section className="bg-white py-24border-t border-border">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start">

              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">Key Benefits</p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.08] mb-5"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}
                >
                  Why It Matters
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  The palm oil refinery will create long-term value for farmers, businesses and communities — through a responsible process to produce high-quality refined palm oil and valuable by-products.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {BENEFITS.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <motion.div key={b.label} {...fadeUp(i * 0.08)}>
                      <div className="w-8 h-8 rounded-lg bg-brand-bg flex items-center justify-center mb-3">
                        <Icon className="w-4 h-4 text-brand" />
                      </div>
                      <p className="font-serif font-semibold text-sm text-brand mb-1">{b.label}</p>
                      <p className="font-sans text-xs leading-relaxed text-gray-500">{b.sub}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        {/* ── 6. SUSTAINABILITY ── */}
        <section className="relative py-24 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1920"
            alt="Sustainable palm plantation"
            fill className="object-cover object-center" sizes="100vw"
          />
          <div className="absolute inset-0 bg-dark/80" />

          <div className="relative z-10">
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                <motion.div {...fadeUp()}>
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-4 text-white/50">Sustainability</p>
                  <h2
                    className="font-serif font-bold text-white leading-[1.06] mb-6"
                    style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
                  >
                    Responsible Today.<br />Sustainable Tomorrow.
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

                <motion.div {...fadeUp(0.15)} className="space-y-3">
                  {SUSTAINABILITY.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <motion.div key={s.label} {...fadeUp(i * 0.1)} className="flex items-start gap-4 rounded-xl bg-dark2/70 backdrop-blur-sm px-5 py-4 border border-white/8">
                        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-serif font-semibold text-white text-sm mb-0.5">{s.label}</p>
                          <p className="font-sans text-white/60 text-xs leading-relaxed">{s.sub}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </Container>
          </div>
        </section>

        {/* ── 7. PROJECT STATUS ── */}
        <section className="bg-white py-24border-t border-border">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_260px] gap-12 items-start">

              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">Project Status</p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.08] mb-4"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}
                >
                  Ongoing Development
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  The palm oil refinery project is currently in the development and planning phase. We are working with partners and stakeholders to ensure the project meets the highest standards of quality, safety and sustainability.
                </p>
              </motion.div>

              <motion.div {...fadeUp(0.1)} className="flex flex-col items-start justify-center py-4">
                <div className="hidden lg:flex items-center w-full gap-0">
                  {STATUS_STEPS.map((step, i) => (
                    <div key={step.label} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 ${
                          step.done ? "bg-brand border-brand" : "bg-white border-gray-300"
                        }`}>
                          {step.done && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        <p className="font-sans text-[10px] font-semibold mt-3 text-center max-w-[90px] leading-snug text-dark">
                          {step.label}
                        </p>
                        <p className={`font-mono text-[9px] uppercase tracking-wide mt-1 ${step.done ? "text-brand" : "text-gray-400"}`}>
                          {step.detail}
                        </p>
                      </div>
                      {i < STATUS_STEPS.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-2 ${i < STATUS_STEPS.filter(s => s.done).length - 1 ? "bg-brand" : "bg-gray-200"}`} />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex lg:hidden flex-col gap-0 w-full">
                  {STATUS_STEPS.map((step, i) => (
                    <div key={step.label} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 shrink-0 ${
                          step.done ? "bg-brand border-brand" : "bg-white border-gray-300"
                        }`}>
                          {step.done && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                        {i < STATUS_STEPS.length - 1 && (
                          <div className="w-0.5 h-8 my-1 bg-gray-200" />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className="font-sans text-sm font-semibold text-dark">{step.label}</p>
                        <p className={`font-mono text-[10px] uppercase tracking-wide ${step.done ? "text-brand" : "text-gray-400"}`}>
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                {...fadeUp(0.2)}
                className="rounded-2xl p-6 flex flex-col gap-4 bg-brand"
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-brand hover:opacity-90 transition-opacity self-start"
                >
                  Get in Touch <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ── 8. FAQ ── */}
        <section className="py-20 border-t border-border bg-cream">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-16 items-start">

              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">Frequently Asked Questions</p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.08] mb-5"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}
                >
                  Common Questions
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-8">
                  Everything you need to know about the Palm Oil Refinery project, our timeline and how to get involved.
                </p>
                <Button
                  href="/contact"
                  variant="gold"
                  size="sm"
                >
                  Ask Us Directly <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div {...fadeUp(0.1)} className="divide-y divide-border">
                {FAQS.map((faq) => (
                  <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </motion.div>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </>
  );
}
