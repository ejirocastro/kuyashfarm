"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Wheat, Bird, Fish, Beef, Droplets, Nut } from "lucide-react";
import { ease as EASE } from "@/lib/tokens";
import { Container } from "@/components/ui";

const OPERATIONS = [
  {
    label: "Crop Production",
    description: "Field crops, vegetables and fruits managed with precision irrigation and data-driven agronomy.",
    icon: Wheat,
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800",
    href: "/services/crop-vegetable-production",
  },
  {
    label: "Fisheries & Aquaculture",
    description: "Catfish and tilapia production with 200 tons per year capacity in managed ponds.",
    icon: Fish,
    image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=800",
    href: "/services/fish-farming",
  },
  {
    label: "Livestock",
    description: "Cattle and sheep rearing as part of our integrated livestock development program.",
    icon: Beef,
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=800",
    href: "/services/livestock",
  },
  {
    label: "Poultry",
    description: "Commercial poultry production with a 50,000 bird layer unit and high management standards.",
    icon: Bird,
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=800",
    href: "/services/poultry",
  },
  {
    label: "Palm Oil Production",
    description: "Processing fresh palm fruit into high-quality crude palm oil for food and industry.",
    icon: Droplets,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800",
    href: "/services/palm-oil-production",
  },
  {
    label: "Groundnut Oil",
    description: "Cold-pressed groundnut oil — pure, natural and nutritious — for homes and businesses.",
    icon: Nut,
    image: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?q=80&w=800",
    href: "/services/groundnut-oil-production",
  },
];

export function FiveSides() {
  return (
    <section className="bg-cream py-20">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand mb-3">
            Our Operations
          </p>
          <h2 className="font-serif font-bold text-dark leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            Six Sides of One Farm
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {OPERATIONS.map((op, i) => {
            const Icon = op.icon;
            return (
              <motion.div
                key={op.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
              >
                <Link
                  href={op.href}
                  className="group flex flex-col bg-white border border-gray-100 hover:border-brand-border hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 h-full"
                >
                  {/* image */}
                  <div className="relative h-44 overflow-hidden shrink-0">
                    <Image
                      src={op.image}
                      alt={op.label}
                      fill
                      sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                    {/* icon badge */}
                    <div className="absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-serif font-bold text-dark text-base mb-2 group-hover:text-brand transition-colors duration-200">
                      {op.label}
                    </h3>
                    <p className="text-xs text-gray-400 font-sans leading-relaxed flex-1">
                      {op.description}
                    </p>
                    <div className="flex items-center gap-1 mt-4 text-brand text-xs font-semibold group-hover:gap-2 transition-all duration-200">
                      Read More <ArrowRight className="w-3 h-3" />
                    </div>
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
