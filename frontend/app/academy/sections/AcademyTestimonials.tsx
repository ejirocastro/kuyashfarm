"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data/academy";
import { Container } from "@/components/ui";

export function AcademyTestimonials() {
  return (
    <section className="bg-cream py-28 md:py-36">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-[0.2em] text-muted mb-4"
          >
            Student Success
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold text-dark leading-tight"
          >
            Farmers who transformed
            <br />
            <span className="text-brand">their practice and income.</span>
          </motion.h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white rounded-3xl p-8 flex flex-col gap-6 border border-gray-100 hover:shadow-xl transition-shadow duration-400"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-serif text-lg text-dark2 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Outcome stat */}
              <div className="bg-brand-bg rounded-xl px-4 py-3 inline-flex items-center gap-2">
                <span className="text-brand font-semibold text-sm">{t.stat}</span>
                <span className="text-gray-400 text-xs">· {t.program}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-2 border-t border-gray-50">
                <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 border-brand-border">
                  <Image src={t.image} alt={t.name} fill className="object-cover" sizes="44px" />
                </div>
                <div>
                  <p className="font-sans font-semibold text-sm text-dark">{t.name}</p>
                  <p className="font-sans text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom social proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left"
        >
          <div className="flex -space-x-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow">
                <Image src={t.image} alt={t.name} fill className="object-cover" sizes="40px" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full bg-brand border-2 border-white flex items-center justify-center shadow">
              <span className="text-white text-[9px] font-bold">500+</span>
            </div>
          </div>
          <div>
            <p className="font-sans font-semibold text-dark text-sm">Join 500+ graduates</p>
            <p className="font-sans text-gray-400 text-xs">who transformed their agricultural careers with Kuyash Academy</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
