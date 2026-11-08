"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ease as EASE } from "@/lib/tokens";

const SLIDES = [
  {
    url: "/images/backgrounds/hero-kuyash.jpg",
    position: "center",
    tagline: "Growing Better. Feeding Tomorrow.",
  },
  {
    url: "/images/backgrounds/hero-transition.jpg",
    position: "center",
    tagline: "From Our Farm to Your Table.",
  },
  {
    url: "/images/backgrounds/chinesecarbage.jpg",
    position: "center",
    tagline: "Fresh Produce. Pure Quality.",
  },
  {
    url: "/images/backgrounds/sunset.jpeg",
    position: "top",
    tagline: "Sustainable. Innovative. Kuyash.",
  },
  {
    url: "/images/backgrounds/dam.jpeg",
    position: "center",
    tagline: "Integrated Farming at Scale.",
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const DURATION = 6000;
  const TICK = 50;

  const startCycle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);

    progressRef.current = setInterval(() => {
      setProgress(p => Math.min(p + (TICK / DURATION) * 100, 100));
    }, TICK);

    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length);
      setProgress(0);
    }, DURATION);
  };

  useEffect(() => {
    startCycle();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  const goTo = (index: number) => {
    setCurrent(index);
    startCycle();
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-dark"
    >
      {/* ── Background slides ── */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.url}
            className={`absolute inset-0 h-full w-full bg-cover bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${slide.url}')`,
              backgroundPosition: slide.position,
            }}
          />
        ))}

        {/* Directional gradient — dark left where text lives, opens right */}
        <div className="absolute inset-0 bg-linear-to-r from-dark/90 via-dark/55 to-dark/20" />
        {/* Bottom fade for scroll cue area */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-dark/60 to-transparent" />
      </div>


      {/* ── Content — left aligned ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-24 pb-20">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <motion.p
            key={`eyebrow-${current}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-mono uppercase tracking-[0.28em] text-muted mb-5"
          >
            {SLIDES[current].tagline}
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-serif font-bold text-white leading-[1.04]"
            style={{ fontSize: "clamp(3rem, 6.5vw, 6rem)" }}
          >
            The future of{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-br from-muted to-gold">
              farming
            </span>
            <br />
            starts here.
          </motion.h1>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-white/60 font-sans leading-relaxed max-w-lg"
            style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)" }}
          >
            Rooted in Nasarawa, Kuyash grows food with care, develops people
            through agriculture, and works to build a stronger future from the land.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/categories"
              className="group inline-flex items-center gap-2.5 bg-brand hover:bg-brand-hover text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
              style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }}
            >
              Explore Products
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <a
              href="#about"
              className="inline-flex items-center gap-2 border border-white/20 bg-white/8 hover:bg-white/14 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
              style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }}
            >
              Our Story
            </a>
          </motion.div>

          {/* Slide indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14 flex items-center gap-3"
          >
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className="relative py-2 flex items-center rounded-full focus:outline-none"
                style={{ width: index === current ? 48 : 20 }}
                aria-label={`Go to slide ${index + 1}`}
              >
                <span className="relative h-0.5 w-full rounded-full overflow-hidden block">
                  <div className="absolute inset-0 bg-white/25 rounded-full" />
                  {index === current && (
                    <div
                      className="absolute inset-y-0 left-0 bg-white rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Stats strip — bottom left ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="absolute bottom-10 left-6 md:left-16 z-10 hidden sm:flex items-center gap-8 md:gap-10"
      >
        {[
          { value: "40", label: "Acre Farm" },
          { value: "6+", label: "Services" },
          { value: "100%", label: "Organic" },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col">
            <span className="font-serif text-2xl font-bold text-white leading-none">
              {stat.value}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/40 mt-1">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* ── Scroll cue — bottom right ── */}
      <div className="absolute bottom-10 right-6 md:right-16 z-10 flex flex-col items-center gap-2">
        <div className="w-px h-10 bg-linear-to-b from-transparent to-white/30" />
        <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase font-mono">
          Scroll
        </span>
      </div>
    </section>
  );
}
