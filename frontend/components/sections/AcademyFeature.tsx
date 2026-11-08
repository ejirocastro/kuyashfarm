"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Users, Award } from "lucide-react";
import { ease as EASE } from "@/lib/tokens";
import { Container } from "@/components/ui";

const STATS = [
  { icon: GraduationCap, value: "12+", label: "Programmes" },
  { icon: Users,         value: "1,200+", label: "Trained" },
  { icon: Award,         value: "NABTEB", label: "Certified" },
];

export function AcademyFeature() {
  return (
    <section className="bg-dark2 overflow-hidden">
      <Container className="py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">

          {/* LEFT — dark content panel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col justify-center py-16 lg:py-20 lg:pr-16"
          >
            {/* label */}
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold/70 mb-4">
              Kuyash Academy
            </p>

            {/* headline */}
            <h2
              className="font-serif font-bold text-white leading-[1.06] mb-5"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
            >
              Learn to farm.<br />
              <span className="text-muted">Build a business.</span>
            </h2>

            <p className="font-sans text-sm text-white/50 leading-relaxed mb-8 max-w-md">
              The Kuyash Academy trains the next generation of Nigerian farmers and agribusiness leaders — with hands-on programmes, real land and nationally recognised certification.
            </p>

            {/* stat pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex items-center gap-2.5 bg-white/8 border border-white/10 rounded-full px-4 py-2"
                  >
                    <Icon className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span className="font-serif font-bold text-white text-sm leading-none">
                      {stat.value}
                    </span>
                    <span className="text-[10px] font-sans text-white/40 uppercase tracking-[0.12em]">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/academy"
                className="group inline-flex items-center gap-2 bg-gold hover:bg-gold-hover text-dark2 font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200"
              >
                Explore the Academy
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
              <Link
                href="/academy/programs"
                className="inline-flex items-center gap-2 border border-white/15 text-white/70 hover:text-white hover:border-white/30 font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200"
              >
                View Programmes
              </Link>
            </div>
          </motion.div>

          {/* RIGHT — full-height image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="relative min-h-[360px] lg:min-h-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200"
              alt="Students training at Kuyash Academy"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* subtle dark overlay on left edge to blend with panel */}
            <div className="absolute inset-0 bg-linear-to-r from-dark2/60 via-transparent to-transparent" />

            {/* floating card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
              className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 max-w-[220px]"
            >
              <p className="font-serif font-bold text-white text-sm leading-snug mb-1">
                Next intake open
              </p>
              <p className="font-sans text-[11px] text-white/55 leading-relaxed">
                Applications reviewed within 48 hours.
              </p>
              <Link
                href="/academy/programs"
                className="inline-flex items-center gap-1 mt-3 text-gold text-[11px] font-semibold hover:gap-2 transition-all duration-200"
              >
                Apply now <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
