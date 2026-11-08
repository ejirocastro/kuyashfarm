"use client";

import { motion } from "framer-motion";
import { Wheat, GraduationCap, Users } from "lucide-react";
import { ease as EASE } from "@/lib/tokens";
import { Container } from "@/components/ui";

const IDENTITIES = [
  {
    icon: Wheat,
    tag: "01",
    title: "A Production Farm.",
    description:
      "56 hectares of actively managed land growing food with discipline, care and modern integrated practice.",
  },
  {
    icon: GraduationCap,
    tag: "02",
    title: "A Training Ground.",
    description:
      "We develop farmers, agronomists and agribusiness leaders through hands-on programmes at the Kuyash Academy.",
  },
  {
    icon: Users,
    tag: "03",
    title: "A Community.",
    description:
      "Rooted in Nasarawa, we work with out-growers, local farmers and partner organisations to grow beyond our own land.",
  },
];

export function IdentityStrip() {
  return (
    <section className="bg-cream border-y border-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border">
          {IDENTITIES.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className="flex items-start gap-5 px-0 lg:px-10 py-10 first:lg:pl-0 last:lg:pr-0"
              >
                {/* icon block */}
                <div className="shrink-0 w-11 h-11 rounded-xl bg-white border border-brand-border flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand" />
                </div>

                {/* text */}
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted mb-1.5">
                    {item.tag}
                  </p>
                  <h3 className="font-serif font-bold text-dark text-lg leading-snug mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-[260px]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
