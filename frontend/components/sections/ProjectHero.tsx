"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { ease as EASE } from "@/lib/tokens";
import { Container } from "@/components/ui";

export interface ProjectHeroCTA {
  label: string;
  href: string;
  variant?: "gold" | "outline";
}

export interface ProjectHeroProps {
  image: string;
  imageAlt: string;
  eyebrow: string;
  headline: React.ReactNode;
  body: string;
  ctas: ProjectHeroCTA[];
  backHref?: string;
}

export function ProjectHero({
  image,
  imageAlt,
  eyebrow,
  headline,
  body,
  ctas,
  backHref = "/#projects",
}: ProjectHeroProps) {
  return (
    <section className="relative h-[88vh] min-h-[600px] overflow-hidden">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-dark/30" />
      <div className="absolute inset-0 bg-linear-to-t from-dark/85 via-dark/15 to-transparent" />

      {/* Back link */}
      <div className="absolute top-20 left-0 z-10 w-full">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm text-white font-sans backdrop-blur-md hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> All Projects
            </Link>
          </motion.div>
        </Container>
      </div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 z-10 pb-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] mb-4 text-muted">
              {eyebrow}
            </p>
            <h1
              className="font-serif font-bold text-white leading-[1.04] max-w-2xl mb-5"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
            >
              {headline}
            </h1>
            <p
              className="font-sans text-white/65 leading-relaxed max-w-lg mb-9"
              style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)" }}
            >
              {body}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              {ctas.map((cta) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className={
                    cta.variant === "outline"
                      ? "inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors duration-200"
                      : "inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-gold text-dark hover:opacity-90 transition-opacity"
                  }
                >
                  {cta.label}
                  {cta.variant !== "outline" && <ArrowRight className="h-4 w-4" />}
                </Link>
              ))}
            </div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
