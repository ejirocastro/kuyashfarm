"use client";

import { motion } from "framer-motion";
import { ClipboardList, Search, MessageSquare, CheckCircle, Users, Sprout, BarChart2, Award } from "lucide-react";
import { ADMISSION_STEPS } from "@/lib/data/academy";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui";

const ICON_MAP: Record<string, LucideIcon> = {
  ClipboardList, Search, MessageSquare, CheckCircle, Users, Sprout, BarChart2, Award,
};

export function AcademyMethodology() {
  return (
    <section className="bg-dark py-28 md:py-36 overflow-hidden">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-[0.2em] text-muted mb-4"
          >
            The Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight"
          >
            From application
            <br />
            <span className="text-gold">to certified practitioner.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-white/40 text-base font-sans leading-relaxed"
          >
            A clear, structured path from the moment you apply to the day you graduate and beyond.
          </motion.p>
        </div>

        {/* Timeline grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {ADMISSION_STEPS.map((step, i) => {
            const Icon = ICON_MAP[step.icon] ?? Award;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative group"
              >
                {/* Connector line */}
                {i < ADMISSION_STEPS.length - 1 && i % 4 !== 3 && (
                  <div className="absolute top-7 left-full w-full h-px bg-linear-to-r from-brand/40 to-transparent hidden md:block z-0" />
                )}

                <div className="relative z-10 p-5 rounded-2xl border border-white/8 bg-white/[0.02] group-hover:border-brand/40 group-hover:bg-white/[0.04] transition-all duration-400">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand/20 border border-brand/30 flex items-center justify-center group-hover:bg-brand/40 transition-colors duration-400">
                      <Icon className="w-5 h-5 text-muted" />
                    </div>
                    <span className="font-mono text-xs text-white/20">{step.step}</span>
                  </div>
                  <h3 className="font-serif text-sm font-bold text-white mb-2 leading-tight">{step.title}</h3>
                  <p className="text-white/35 text-xs leading-relaxed font-sans">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="/academy/classes/1"
            className="inline-flex items-center gap-3 bg-brand text-white font-semibold px-8 py-4 rounded-full hover:bg-brand-hover transition-colors duration-300 text-base"
          >
            Start Your Application
            <span>→</span>
          </a>
          <p className="mt-4 text-white/25 text-sm font-sans">Applications reviewed within 48 hours</p>
        </motion.div>
      </Container>
    </section>
  );
}
