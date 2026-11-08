"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Wheat, Beef, Fish, Bird, Droplets, Nut } from "lucide-react";
import { ease as EASE } from "@/lib/tokens";
import { Container } from "@/components/ui";

const SERVICE_META = [
  {
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800",
    icon: Wheat,
    tag: "Crop & Vegetable",
  },
  {
    image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=800",
    icon: Fish,
    tag: "Aquaculture",
  },
  {
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=800",
    icon: Beef,
    tag: "Livestock",
  },
  {
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=800",
    icon: Bird,
    tag: "Poultry",
  },
  {
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800",
    icon: Droplets,
    tag: "Palm Oil",
  },
  {
    image: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?q=80&w=800",
    icon: Nut,
    tag: "Groundnut Oil",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-cream py-20">
      <Container>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand mb-3">
              Our Services
            </p>
            <h2
              className="font-serif font-bold text-dark leading-[1.08]"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
            >
              Six businesses.<br />One integrated farm.
            </h2>
            <p className="mt-3 font-sans text-sm text-gray-500 max-w-sm leading-relaxed">
              Every division supplies another — from feed and fruit to oil and by-products.
            </p>
          </div>
          <Link
            href="/services/crop-vegetable-production"
            className="inline-flex items-center gap-2 border border-brand-border text-brand font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 shrink-0"
          >
            View all services <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid — 3 cols, tall image cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => {
            const meta = SERVICE_META[i];
            const Icon = meta.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex flex-col rounded-2xl overflow-hidden h-[320px] sm:h-[340px] lg:h-[380px] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Full-bleed image */}
                  <Image
                    src={meta.image}
                    alt={service.title}
                    fill
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient overlay — dark at bottom, transparent at top */}
                  <div className="absolute inset-0 bg-linear-to-t from-dark/90 via-dark/30 to-transparent" />

                  {/* Top row — icon badge + arrow button */}
                  <div className="relative z-10 flex items-start justify-between p-4">
                    <div className="w-9 h-9 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-gold" />
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-gold group-hover:border-gold">
                      <ArrowUpRight className="w-4 h-4 text-gold group-hover:text-dark2 transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Bottom overlay — category + title + description */}
                  <div className="relative z-10 mt-auto p-5">
                    <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-gold/80 mb-1.5">
                      {meta.tag}
                    </p>
                    <h3 className="font-serif font-bold text-white leading-tight mb-2 transition-colors duration-200"
                      style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}>
                      {service.title}
                    </h3>
                    <p className="font-sans text-xs text-white/60 leading-relaxed line-clamp-2 max-h-20 lg:max-h-0 overflow-hidden lg:group-hover:max-h-20 transition-all duration-500 ease-in-out">
                      {service.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
