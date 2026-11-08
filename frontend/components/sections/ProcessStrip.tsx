"use client";

import { motion } from "framer-motion";
import { Sprout, Wheat, Truck } from "lucide-react";
import { ease as EASE } from "@/lib/tokens";
import { Container } from "@/components/ui";

const STEPS = [
  {
    number: "01",
    icon: Sprout,
    title: "We Cultivate",
    lines: ["Healthy soil.", "Careful planning.", "Disciplined management."],
  },
  {
    number: "02",
    icon: Wheat,
    title: "We Harvest",
    lines: ["Quality crops.", "Consistent standards.", "Responsible production."],
  },
  {
    number: "03",
    icon: Truck,
    title: "We Deliver",
    lines: ["Fresh produce.", "Reliable supply.", "For a better tomorrow."],
  },
];

export function ProcessStrip() {
  return (
    <section className="bg-white border-b border-gray-100 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2px_1fr] gap-0">

          {/* ── Left — anchor statement ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="py-14 md:py-16 lg:pr-16 flex flex-col justify-center"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted mb-4">
              How we work
            </p>
            <h2 className="font-serif font-bold text-dark leading-[1.1]"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)" }}>
              Farming is more than{" "}
              <br className="hidden md:block" />
              growing food.
            </h2>
            <p className="mt-4 font-serif italic text-brand"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)" }}>
              It&apos;s growing possibility.
            </p>
            <p className="mt-5 text-sm text-gray-500 font-sans leading-relaxed max-w-sm">
              Every harvest begins with intention. At Kuyash, we manage every stage — from soil preparation to your table — with precision and care.
            </p>

            {/* accent rule */}
            <div className="mt-8 flex items-center gap-3">
              <div className="w-8 h-0.5 bg-brand" />
              <div className="w-2 h-0.5 bg-brand-border" />
              <div className="w-1 h-0.5 bg-brand-bg" />
            </div>
          </motion.div>

          {/* ── Divider ── */}
          <div className="hidden lg:block w-px bg-gray-100 my-10" />

          {/* ── Right — steps ── */}
          <div className="py-14 md:py-16 lg:pl-16 flex flex-col justify-center gap-0 divide-y divide-gray-100">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                  className="group flex items-start gap-6 py-7 first:pt-0 last:pb-0"
                >
                  {/* Step number + connector */}
                  <div className="flex flex-col items-center shrink-0 pt-1">
                    <span className="font-mono text-[11px] font-bold text-brand tracking-widest">
                      {step.number}
                    </span>
                    {i < STEPS.length - 1 && (
                      <div className="w-px flex-1 bg-brand-border mt-2 min-h-[32px]" />
                    )}
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:border-brand transition-all duration-300">
                    <Icon className="w-4 h-4 text-brand group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-dark text-lg mb-1.5 group-hover:text-brand transition-colors duration-200">
                      {step.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                      {step.lines.map((line, j) => (
                        <span key={j} className="text-sm text-gray-400 font-sans">
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dotted connector line to next step — desktop only */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:flex absolute right-0 items-center pointer-events-none" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
