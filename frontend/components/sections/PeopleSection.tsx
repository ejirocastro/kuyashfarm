"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ease as EASE } from "@/lib/tokens";
import { BrandLeaf, Container } from "@/components/ui";

const TEAM_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=800",
    alt: "Farm worker tending crops",
    className: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=800",
    alt: "Team members at harvest",
    className: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=800",
    alt: "Workers on the farm",
    className: "col-span-1 row-span-1",
  },
];

export function PeopleSection() {
  return (
    <section className="bg-cream py-20 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand mb-4">
              Our People
            </p>
            <h2
              className="font-serif font-bold text-dark leading-[1.06] mb-6"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
            >
              The People Behind<br />Our Harvest.
              <span className="inline-block ml-2 text-brand">
                <BrandLeaf className="inline w-6 h-6" strokeWidth={1.5} />
              </span>
            </h2>
            <p className="text-gray-500 font-sans text-sm leading-relaxed mb-4 max-w-md">
              A farm is only as strong as the people who care for it. Our team works with passion, knowledge and commitment every single day.
            </p>
            <p className="text-gray-500 font-sans text-sm leading-relaxed mb-8 max-w-md">
              From field managers and agronomists to processors and drivers — 65+ dedicated people show up for the land, and for each other.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-brand font-semibold text-sm hover:gap-3 transition-all duration-200"
            >
              Meet Our Team <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* RIGHT — photo collage */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="grid grid-cols-2 grid-rows-2 gap-3 h-[280px] sm:h-[380px] lg:h-[420px]"
          >
            {TEAM_IMAGES.map((img, i) => (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className={`relative rounded-2xl overflow-hidden ${img.className}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-dark/10" />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
