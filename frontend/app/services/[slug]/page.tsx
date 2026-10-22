"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { SERVICES } from "@/lib/constants";
import { SERVICE_CONTENT } from "@/lib/data/services";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Leaf,
  PlayCircle,
} from "lucide-react";
import { notFound } from "next/navigation";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: EASE },
} as const;

export default function ServicePage({ params }: ServicePageProps) {
  const { slug } = use(params);
  const [showVideo, setShowVideo] = useState(false);

  const service = SERVICES.find((s) => s.slug === slug);
  const content = SERVICE_CONTENT[slug];

  if (!service || !content) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf8f5]">

        {/* ── HERO ── */}
        <section className="relative h-[75vh] min-h-[560px] overflow-hidden">
          {showVideo && content.heroVideo ? (
            <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
              <source src={content.heroVideo} type="video/mp4" />
            </video>
          ) : (
            <Image src={content.heroImage} alt={service.title} fill className="object-cover" priority />
          )}
          {/* dark overlay — matches blog hero */}
          <div className="absolute inset-0 bg-[#080f0a]/65" />
          <div className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative z-10 flex h-full flex-col justify-end px-6 md:px-12 lg:px-16 pb-16 max-w-7xl mx-auto">
            <motion.div {...FADE_UP}>
              <Link
                href="/#services"
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-sans text-sm text-white backdrop-blur-md hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                All Services
              </Link>

              <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#6b9d7a] mb-4">
                Kuyash Integrated Farm
              </p>

              <h1
                className="font-serif font-bold text-white leading-[1.05] max-w-3xl mb-5"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                {service.title}
              </h1>

              <p className="font-sans text-white/60 leading-relaxed max-w-xl mb-7"
                style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)" }}>
                {service.description}
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  href={content.shopHref}
                  className="inline-flex items-center gap-2 bg-[#2d5f3f] hover:bg-[#4a7c59] text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors duration-200"
                >
                  Browse Products <ArrowRight className="h-4 w-4" />
                </Link>
                {content.heroVideo && (
                  <button
                    onClick={() => setShowVideo(!showVideo)}
                    className="inline-flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm px-6 py-3 rounded-full backdrop-blur-sm transition-colors duration-200"
                  >
                    <PlayCircle className="h-4 w-4" />
                    {showVideo ? "View Photo" : "Watch Video"}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── OVERVIEW ── */}
        <section className="bg-white py-24 border-b border-[#e8ede9]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <motion.div {...FADE_UP}>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6b9d7a] mb-4">
                  Our Approach
                </p>
                <h2
                  className="font-serif font-bold text-[#080f0a] leading-[1.08] mb-6"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
                >
                  Sustainable Innovation<br />Meets Practical Farming
                </h2>
                <p className="font-sans text-sm leading-relaxed text-gray-500 max-w-md">
                  {content.overview}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                className="relative aspect-4/3 rounded-2xl overflow-hidden border border-[#e8ede9]"
              >
                <Image src={content.heroImage} alt="Farm overview" fill className="object-cover" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        {slug !== "livestock" && (
          <section className="bg-[#080f0a] py-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6b9d7a] mb-3">
                  Impact by the Numbers
                </p>
                <h2
                  className="font-serif font-bold text-white leading-tight"
                  style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)" }}
                >
                  Measurable results from our practice
                </h2>
              </motion.div>

              <div className="grid gap-px bg-[#1a3d2b] sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden border border-[#1a3d2b]">
                {content.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="bg-[#080f0a] px-8 py-10"
                  >
                    <p className="font-serif font-bold text-white mb-1"
                      style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                      {stat.value}
                    </p>
                    <p className="font-sans text-sm font-semibold text-white/80 mb-1">{stat.label}</p>
                    {stat.description && (
                      <p className="font-sans text-xs text-white/40 leading-relaxed">{stat.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── PRODUCTS ── */}
        {content.products && content.products.length > 0 && (
          <section className="bg-[#1a3d2b] py-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
                <motion.div {...FADE_UP}>
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6b9d7a] mb-3">
                    Our Products
                  </p>
                  <h2
                    className="font-serif font-bold text-white leading-[1.06]"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                  >
                    What We Produce
                  </h2>
                </motion.div>
                <Link
                  href={content.shopHref}
                  className="inline-flex items-center gap-2 text-[#6b9d7a] hover:text-white font-semibold text-sm transition-colors duration-200 shrink-0"
                >
                  Shop All Products <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {content.products.map((product, i) => (
                  <motion.div
                    key={product.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                  >
                    <Link
                      href={product.href}
                      className="group flex flex-col rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-300 h-full"
                    >
                      {/* image */}
                      <div className="relative h-44 overflow-hidden shrink-0">
                        <Image
                          src={product.image}
                          alt={product.label}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#080f0a]/60 to-transparent" />
                        <span className="absolute top-3 left-3 text-[9px] font-mono uppercase tracking-[0.18em] bg-white/15 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">
                          {product.tag}
                        </span>
                      </div>
                      {/* content */}
                      <div className="flex flex-col flex-1 p-5 bg-white/5">
                        <h3 className="font-serif font-bold text-white text-base mb-2 group-hover:text-[#c6dece] transition-colors duration-200">
                          {product.label}
                        </h3>
                        <p className="font-sans text-xs text-white/55 leading-relaxed flex-1">
                          {product.sub}
                        </p>
                        <div className="flex items-center gap-1.5 mt-4 text-[#6b9d7a] text-xs font-semibold group-hover:gap-2.5 transition-all duration-200">
                          Order Now <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FARMING PROCESS ── */}
        <section className="bg-white py-24 border-b border-[#e8ede9]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <motion.div className="mb-16" {...FADE_UP}>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6b9d7a] mb-3">
                Seed to Harvest
              </p>
              <h2
                className="font-serif font-bold text-[#080f0a] leading-tight max-w-lg"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
              >
                Our Farming Process
              </h2>
            </motion.div>

            <div className="space-y-4">
              {content.farmingProcess.map((phase, i) => {
                const Icon = phase.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.07 }}
                    className="group flex items-start gap-6 bg-[#faf8f5] border border-[#e8ede9] hover:border-[#c6dece] rounded-2xl px-7 py-6 transition-all duration-200"
                  >
                    {/* step number + icon */}
                    <div className="shrink-0 flex flex-col items-center gap-2 pt-0.5">
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#c6dece] group-hover:bg-[#2d5f3f] group-hover:border-[#2d5f3f] flex items-center justify-center transition-colors duration-200">
                        <Icon className="w-5 h-5 text-[#2d5f3f] group-hover:text-white transition-colors duration-200" />
                      </div>
                      <span className="text-[9px] font-mono text-[#6b9d7a] tracking-[0.15em]">{phase.phase}</span>
                    </div>

                    {/* content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-bold text-[#080f0a] text-lg mb-1.5">{phase.title}</h3>
                      <p className="font-sans text-sm text-gray-500 leading-relaxed">{phase.description}</p>
                    </div>

                    {/* duration */}
                    <div className="shrink-0 text-right">
                      <p className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#6b9d7a] mb-0.5">Duration</p>
                      <p className="font-sans text-sm font-semibold text-[#080f0a]">{phase.duration}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── TECHNOLOGY ── */}
        <section className="bg-[#faf8f5] py-24 border-b border-[#e8ede9]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <motion.div className="mb-16" {...FADE_UP}>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6b9d7a] mb-3">
                Innovation
              </p>
              <h2
                className="font-serif font-bold text-[#080f0a] leading-tight max-w-lg"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
              >
                Technology Driving Excellence
              </h2>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2">
              {content.technology.map((tech, i) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="group bg-white border border-[#e8ede9] hover:border-[#c6dece] rounded-2xl p-7 transition-all duration-200"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#eef5f1] group-hover:bg-[#2d5f3f] border border-[#c6dece] group-hover:border-[#2d5f3f] flex items-center justify-center mb-5 transition-colors duration-200">
                      <Icon className="w-5 h-5 text-[#2d5f3f] group-hover:text-white transition-colors duration-200" />
                    </div>
                    <h3 className="font-serif font-bold text-[#080f0a] text-lg mb-2">{tech.title}</h3>
                    <p className="font-sans text-sm text-gray-500 leading-relaxed mb-4">{tech.description}</p>
                    {tech.metrics && (
                      <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#2d5f3f]">
                        {tech.metrics}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── BEFORE / AFTER ── */}
        {content.beforeAfter && (
          <section className="bg-white py-24 border-b border-[#e8ede9]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
              <BeforeAfterSlider {...content.beforeAfter} />
            </div>
          </section>
        )}

        {/* ── FEATURES ── */}
        <section className="bg-white py-24 border-b border-[#e8ede9]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <motion.div className="mb-14" {...FADE_UP}>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6b9d7a] mb-3">
                Why Kuyash
              </p>
              <h2
                className="font-serif font-bold text-[#080f0a] leading-tight max-w-lg"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
              >
                What Sets Us Apart
              </h2>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {content.features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="group bg-[#faf8f5] border border-[#e8ede9] hover:border-[#c6dece] rounded-2xl p-6 transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#c6dece] group-hover:bg-[#2d5f3f] group-hover:border-[#2d5f3f] flex items-center justify-center mb-4 transition-colors duration-200">
                      <Icon className="w-5 h-5 text-[#2d5f3f] group-hover:text-white transition-colors duration-200" />
                    </div>
                    <h3 className="font-serif font-bold text-[#080f0a] text-base mb-2">{feature.title}</h3>
                    <p className="font-sans text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── BENEFITS ── */}
        <section className="bg-[#faf8f5] py-24 border-b border-[#e8ede9]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid items-start gap-16 lg:grid-cols-2">

              {/* gallery collage */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE }}
                className="grid grid-cols-2 gap-3"
              >
                {content.gallery.slice(0, 4).map((image, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-[#e8ede9]">
                    <Image
                      src={image} alt={`Farm photo ${i + 1}`} fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width:1024px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </motion.div>

              {/* benefits list */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6b9d7a] mb-3">
                  Benefits
                </p>
                <h2
                  className="font-serif font-bold text-[#080f0a] leading-tight mb-8"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
                >
                  What You Get
                </h2>
                <div className="space-y-3">
                  {content.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-white border border-[#e8ede9] rounded-xl px-5 py-4"
                    >
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-[#6b9d7a] mt-0.5" />
                      <p className="font-sans text-sm text-gray-600 leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="bg-white py-24 border-b border-[#e8ede9]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <motion.div className="mb-12" {...FADE_UP}>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6b9d7a] mb-3">
                Farm Gallery
              </p>
              <h2
                className="font-serif font-bold text-[#080f0a] leading-tight max-w-lg"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
              >
                See Our Farm in Action
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {content.gallery.map((image, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-[#e8ede9] hover:border-[#c6dece] transition-all duration-300"
                >
                  <Image
                    src={image} alt={`Gallery ${i + 1}`} fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
                  />
                  <div className="absolute inset-0 bg-[#080f0a]/0 group-hover:bg-[#080f0a]/20 transition-colors duration-300" />
                  <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-mono text-[10px] text-white/80">0{i + 1}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-[#080f0a] py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <motion.div {...FADE_UP}>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6b9d7a] mb-4">
                Fresh From Our Farm
              </p>
              <h2
                className="font-serif font-bold text-white leading-[1.06] max-w-2xl mb-5"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
              >
                Experience Premium<br />Organic Produce
              </h2>
              <p className="font-sans text-white/50 text-sm leading-relaxed max-w-md mb-10">
                Browse our selection of fresh, sustainably-grown products. Farm-to-table delivery within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <Link
                  href={content.shopHref}
                  className="inline-flex items-center gap-2 bg-[#2d5f3f] hover:bg-[#4a7c59] text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200"
                >
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#services"
                  className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200"
                >
                  <Leaf className="h-4 w-4 text-[#6b9d7a]" />
                  Explore All Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
