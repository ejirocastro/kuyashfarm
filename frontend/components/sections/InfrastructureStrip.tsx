"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { ease as EASE } from "@/lib/tokens";
import { Container } from "@/components/ui";

const PROJECTS = [
  {
    label: "Palm Oil Refinery",
    sub: "Crude & refined palm oil at scale",
    status: "In Development",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=600",
    href: "/projects/palm-oil-refinery",
  },
  {
    label: "Water Factory",
    sub: "Purified sachet & bottled water",
    status: "In Development",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=600",
    href: "/projects/water-factory",
  },
  {
    label: "Soap & Tissue Factory",
    sub: "Palm-based soaps and hygiene products",
    status: "In Development",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=600",
    href: "/projects/soap-tissue-factory",
  },
  {
    label: "Slaughter House",
    sub: "Hygienic processing with cold chain",
    status: "In Development",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=600",
    href: "/projects/slaughter-house",
  },
];

export function InfrastructureStrip() {
  return (
    <section className="bg-cream py-16 border-y border-border overflow-hidden">
      <Container>

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand mb-2">
              Expansion Projects
            </p>
            <h2
              className="font-serif font-bold text-dark leading-[1.1]"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
            >
              Building the next chapter.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans text-xs text-gray-400 max-w-xs leading-relaxed sm:text-right"
          >
            Four new facilities currently in development — expanding Kuyash's processing and manufacturing capacity.
          </motion.p>
        </div>

        {/* Project cards — horizontal strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
            >
              <Link
                href={project.href}
                className="group relative flex flex-col rounded-2xl overflow-hidden h-[220px] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Image */}
                <Image
                  src={project.image}
                  alt={project.label}
                  fill
                  sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-dark/85 via-dark/30 to-dark/10" />

                {/* Top — status pill */}
                <div className="relative z-10 p-4 flex justify-between items-start">
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.18em] bg-white/10 backdrop-blur-sm border border-white/15 text-white/70 px-2.5 py-1 rounded-full">
                    <Clock className="w-2.5 h-2.5" />
                    {project.status}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                {/* Bottom — label + sub */}
                <div className="relative z-10 mt-auto p-4">
                  <h3 className="font-serif font-bold text-white text-base leading-snug mb-1">
                    {project.label}
                  </h3>
                  <p className="font-sans text-[11px] text-white/55 leading-snug">
                    {project.sub}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
}
