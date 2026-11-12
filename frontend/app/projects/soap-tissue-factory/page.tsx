"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Leaf, Settings, Users,
  Package, Recycle, Droplets, HandHeart,
} from "lucide-react";
import { ease as EASE, fadeUp as _fadeUp } from "@/lib/tokens";
import { Button, Container } from "@/components/ui";
import { ProjectHero } from "@/components/sections";

const fadeUp = (delay = 0) => _fadeUp(delay);

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
    label: "Raw Material Intake",
    sub: "Palm kernel oil, caustic soda (NaOH), glycerin and fragrance oils are quality-checked on arrival. Tissue pulp bales (virgin or recycled) are graded for fibre length and brightness.",
  },
  {
    num: "02",
    label: "Saponification (Soap)",
    sub: "Oils are reacted with caustic soda in a controlled saponification reactor at 70–80°C. The reaction is monitored until a neutral pH is achieved. Glycerin is recovered as a co-product.",
  },
  {
    num: "03",
    label: "Pulp Forming (Tissue)",
    sub: "Pulp slurry is spread onto a Fourdrinier wire at controlled basis weight (14–22 gsm per ply). The web is dried, creped for softness, and slit to parent-reel width.",
  },
  {
    num: "04",
    label: "Finishing & Converting",
    sub: "Soap bars are cut, stamped and cooled. Tissue parent reels are embossed, perforated and wound into retail logs, then cut to final sheet count per pack.",
  },
  {
    num: "05",
    label: "Quality Inspection",
    sub: "Soap: pH (9–10), moisture content and lather tested per batch. Tissue: GSM, tensile strength, sheet count and brightness measured against SON specification.",
  },
  {
    num: "06",
    label: "Packaging & Dispatch",
    sub: "Products are wrapped, labelled with batch codes and NAFDAC registration numbers, then palletised for distribution to wholesalers and retailers.",
  },
];

const SUSTAINABILITY = [
  { icon: Package,   num: "01", label: "Eco-friendly packaging" },
  { icon: Droplets,  num: "02", label: "Responsible water usage" },
  { icon: Recycle,   num: "03", label: "Waste reduction & recycling" },
  { icon: HandHeart, num: "04", label: "Supporting local communities" },
];

const IMPACT_STATS = [
  { value: "50+",    label: "Local Jobs Created" },
  { value: "2 lines", label: "Soap & Tissue under one roof" },
  { value: "NAFDAC", label: "Registered products" },
];

// ─── page ─────────────────────────────────────────────────────────────────────
export default function SoapTissueFactoryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">

        {/* ── 1. HERO ── */}
        <ProjectHero
          image="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1600"
          imageAlt="Soap and tissue factory"
          eyebrow="Soap & Tissue Factory"
          headline={<>Clean Living<br />for a Healthier<br />Tomorrow.</>}
          body="We produce high-quality soaps and tissue products using modern technology, natural ingredients and sustainable practices — for homes, businesses and communities across Nigeria."
          ctas={[
            { label: "Explore Our Products", href: "#products" },
            { label: "Watch Our Process", href: "#process", variant: "outline" },
          ]}
        />

        {/* ── 2. HERO PILLARS ── */}
        <section className="bg-white border-b border-border py-10">
          <Container>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {HERO_PILLARS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.label} {...fadeUp(i * 0.07)} className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center mb-1">
                      <Icon className="w-4 h-4 text-brand" />
                    </div>
                    <p className="font-sans text-sm font-semibold text-dark">{p.label}</p>
                    <p className="font-sans text-xs text-gray-500 leading-snug">{p.sub}</p>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ── 3. OUR PRODUCTS ── */}
        <section id="products" className="py-20 border-b border-border bg-cream">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">Our Products</p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.06] mb-4"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                >
                  Everyday Essentials<br />for a Cleaner, Healthier You
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-8">
                  From gentle soaps to ultra-soft tissues, our products are crafted for comfort, hygiene and care — because you deserve the best, every day.
                </p>
                <Link
                  href="/shop/all"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-brand hover:bg-brand-hover transition-colors duration-200"
                >
                  View All Products <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div {...fadeUp(0.15)}>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200"
                    alt="Mother and child — everyday care"
                    fill className="object-cover object-center"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
              {PRODUCTS.map((prod, i) => (
                <motion.div key={prod.label} {...fadeUp(i * 0.08)}>
                  <Link href={prod.href} className="group block">
                    <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-3 border border-border">
                      <Image
                        src={prod.image} alt={prod.label} fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:640px) 50vw, 25vw"
                      />
                    </div>
                    <p className="font-sans text-sm font-semibold text-dark mb-0.5">{prod.label}</p>
                    <p className="font-sans text-xs text-gray-500 leading-snug mb-2">{prod.sub}</p>
                    <span className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-brand">
                      Learn More <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── 4. OUR FACTORY ── */}
        <section className="relative py-24 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1600"
            alt="Factory production line"
            fill className="object-cover object-center" sizes="100vw"
          />
          <div className="absolute inset-0 bg-dark/70" />

          <div className="relative z-10">
            <Container>
              <motion.div {...fadeUp()} className="max-w-xl">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">Our Factory</p>
                <h2
                  className="font-serif font-bold text-white leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
                >
                  World-Class Production<br />for World-Class Quality
                </h2>
                <p className="font-sans text-white/60 text-sm leading-relaxed mb-8 max-w-md">
                  Our state-of-the-art soap and tissue factory combines modern technology with strict quality control to deliver products you can trust.
                </p>
                <Button
                  href="#process"
                  variant="gold"
                >
                  Take a Virtual Tour <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </Container>
          </div>
        </section>

        {/* ── 5. OUR PROCESS ── */}
        <section id="process" className="bg-white py-24border-b border-border">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">Our Process</p>
                <h2
                  className="font-serif font-bold text-dark leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                >
                  How We Make<br />Soap &amp; Tissue
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed mb-8">
                  We follow a simple but rigorous process to ensure every product meets our highest standards — from raw materials to your hands.
                </p>
                <Link
                  href="/shop/all"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-brand hover:bg-brand-hover transition-colors duration-200"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {PROCESS_STEPS.map((step, i) => (
                  <motion.div
                    key={step.label}
                    {...fadeUp(i * 0.07)}
                    className="rounded-2xl p-5 border border-border bg-cream"
                  >
                    <p className="font-mono text-2xl font-bold mb-3 text-brand">{step.num}</p>
                    <p className="font-sans text-sm font-semibold text-dark mb-1">{step.label}</p>
                    <p className="font-sans text-xs text-gray-500 leading-relaxed">{step.sub}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div {...fadeUp(0.1)} className="mt-12">
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1600"
                  alt="Natural ingredients — leaves, rice, oil"
                  fill className="object-cover object-center" sizes="100vw"
                />
              </div>
            </motion.div>
          </Container>
        </section>

        {/* ── 6. SUSTAINABILITY ── */}
        <section className="relative py-24 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600"
            alt="Green sustainable farming"
            fill className="object-cover object-center" sizes="100vw"
          />
          <div className="absolute inset-0 bg-dark2/90" />

          <div className="relative z-10">
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                <motion.div {...fadeUp()}>
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-gold">Our Commitment</p>
                  <h2
                    className="font-serif font-bold text-white leading-[1.04] mb-5"
                    style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
                  >
                    Sustainable Today.<br />Greener Tomorrow.
                  </h2>
                  <p className="font-sans text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
                    We care about people and the planet. Our production processes are designed to reduce waste, conserve resources and create a healthier environment for future generations.
                  </p>
                  <Button
                    href="/#projects"
                    variant="gold"
                  >
                    Our Sustainability Goals <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>

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
                        <p className="font-mono text-xs font-bold text-gold">{item.num}</p>
                        <p className="font-sans text-sm text-white/80 leading-snug">{item.label}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </Container>
          </div>
        </section>

        {/* ── 7. IMPACT ── */}
        <section className="bg-white py-24border-b border-border">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <motion.div {...fadeUp()}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-3 text-muted">Our Impact</p>
                <h2
                  className="font-serif font-bold leading-[1.06] mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                >
                  <span className="text-dark">More Than Products.<br /></span>
                  <span className="text-brand">We Create Value.</span>
                </h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  Our factory is not just about making soap and tissue — it&apos;s about creating jobs, supporting local farmers, and contributing to a cleaner, healthier Nigeria.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {IMPACT_STATS.map((stat, i) => (
                  <motion.div key={stat.label} {...fadeUp(i * 0.08)} className="flex flex-col gap-2">
                    <p
                      className="font-serif font-bold text-brand leading-none"
                      style={{ fontSize: "clamp(2rem, 3vw, 3rem)" }}
                    >
                      {stat.value}
                    </p>
                    <p className="font-sans text-xs text-gray-600 leading-snug">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ── 8. LET'S CONNECT ── */}
        <section className="overflow-hidden bg-dark2">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-[400px]">

            <motion.div
              {...fadeUp()}
              className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-16"
            >
              <p className="text-[9px] font-mono uppercase tracking-[0.28em] mb-4 text-muted">Let&apos;s Connect</p>
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
                href="mailto:kuyashfarmltd@gmail.com"
                className="self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors duration-200"
              >
                Start a conversation <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>

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
                fill className="object-cover object-center"
                sizes="(max-width:1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-linear-to-r from-dark2/60 to-transparent lg:block hidden" />
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
