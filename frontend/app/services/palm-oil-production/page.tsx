"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SERVICE_CONTENT } from "@/lib/data/services";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Sprout,
  Sun,
  Droplets,
  Package,
  BarChart3,
  Truck,
  Factory,
  Leaf,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { ease as EASE, fadeUp as _fadeUp, listItem } from "@/lib/tokens";
import { Container, SectionLabel, Heading } from "@/components/ui";

const SLUG = "palm-oil-production";
const fadeUp = (delay = 0) => _fadeUp(delay);

// ─── Value-chain stages ───────────────────────────────────────────────────────

const CHAIN = [
  {
    step: "01",
    title: "Own Plantation",
    sub: "Oil palm cultivation on Kuyash land",
    icon: Sprout,
    source: "own",
    detail:
      "Kuyash cultivates oil palm on its own plantation in Nasarawa State. Elite tenera hybrid varieties are planted at optimal spacing, managed through the full growth cycle from nursery to mature bearing trees.",
  },
  {
    step: "02",
    title: "External FFB Sourcing",
    sub: "Fresh fruit bunches from partner farmers",
    icon: Truck,
    source: "external",
    detail:
      "To supplement plantation output, Kuyash sources fresh fruit bunches from verified outgrower smallholders in the region. This extends supply, supports local farmers and keeps the mill running at consistent throughput.",
  },
  {
    step: "03",
    title: "Harvest & Collection",
    sub: "FFBs cut at peak ripeness",
    icon: Sun,
    source: "process",
    detail:
      "Trained harvesters cut fresh fruit bunches using long-handled chisels at the precise moment of ripeness. Bunches are transported to the mill within 24 hours — the window that preserves oil quality and minimises free fatty acid buildup.",
  },
  {
    step: "04",
    title: "Milling & Extraction",
    sub: "On-site palm oil extraction",
    icon: Factory,
    source: "process",
    detail:
      "FFBs are sterilised, stripped and pressed in Kuyash's on-site milling facility. Crude palm oil is separated, clarified, dried and stored in temperature-controlled tanks ready for dispatch.",
  },
  {
    step: "05",
    title: "Palm Kernel Recovery",
    sub: "Full utilisation of the fruit",
    icon: Package,
    source: "process",
    detail:
      "Palm kernels separated from the pressed fibre are cracked and processed separately. Kernels yield palm kernel oil and palm kernel cake — a high-protein by-product used in animal feed.",
  },
  {
    step: "06",
    title: "Products & Distribution",
    sub: "CPO, PKO and kernel to market",
    icon: BarChart3,
    source: "output",
    detail:
      "The finished products — crude palm oil, palm kernel and palm kernel oil — are batched, tested for quality and dispatched to industrial buyers, food processors and commercial customers across Nigeria.",
  },
];

// ─── Products ─────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    name: "Crude Palm Oil (CPO)",
    tag: "Primary Product",
    description:
      "Extracted directly from the mesocarp of fresh palm fruit. Low free fatty acid content. Used in food processing, industrial manufacturing and as a feedstock for refined palm oil production.",
    specs: ["Low FFA content", "Food & industrial grade", "Bulk supply available"],
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1600",
    href: "/shop",
  },
  {
    name: "Palm Kernel",
    tag: "Co-product",
    description:
      "The inner seed of the palm fruit, recovered during milling. Sold whole to kernel crushers or processed on-site into palm kernel oil and cake. High commercial value.",
    specs: ["Moisture-controlled storage", "Sold whole or processed", "Year-round availability"],
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=1600",
    href: "/shop",
  },
  {
    name: "Palm Kernel Oil (PKO)",
    tag: "Co-product",
    description:
      "Extracted from cracked palm kernels. Lighter in colour than CPO with a distinctive flavour profile. Used in personal care, food manufacturing and specialty applications.",
    specs: ["Light colour profile", "Specialty grade", "Commercial quantities"],
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1600",
    href: "/shop",
  },
];

// ─── Why Kuyash differentiators ───────────────────────────────────────────────

const DIFFERENTIATORS = [
  {
    icon: ShieldCheck,
    title: "Integrated Supply — Own Farm Plus Outgrowers",
    body: "We are not dependent on a single source. Kuyash runs its own plantation and maintains relationships with verified outgrower farmers, giving the operation supply depth and harvest consistency.",
  },
  {
    icon: Leaf,
    title: "Responsible Land and Plantation Management",
    body: "Oil palm cultivation follows responsible land-use principles — no clearing of high conservation value land, soil health management and cover crops between rows to prevent erosion.",
  },
  {
    icon: TrendingUp,
    title: "24-Hour FFB-to-Mill Turnaround",
    body: "Fresh fruit bunches move from plantation or collection point to our milling facility within 24 hours of harvest. This tight window directly determines CPO quality and FFA level.",
  },
  {
    icon: Package,
    title: "Full Fruit Utilisation — Zero Fibre Waste",
    body: "Every part of the palm fruit is captured: mesocarp for CPO, kernel for PKO and cake, pressed fibre for composting back into plantation soil. The cycle closes on itself.",
  },
];

// ─── Process accordion data ───────────────────────────────────────────────────

const PROCESS = [
  {
    phase: "01",
    title: "Land Preparation & Nursery",
    duration: "12–18 months",
    icon: Sprout,
    description:
      "Soil analysis guides the fertilisation plan before planting. Tenera hybrid seedlings are germinated in our nursery and nurtured for 12–18 months before field transplanting at the optimal spacing for canopy development and mechanised harvest access.",
  },
  {
    phase: "02",
    title: "Plantation Management",
    duration: "Ongoing",
    icon: Droplets,
    description:
      "Regular pruning opens the canopy for light penetration and harvest access. Controlled fertilisation is informed by leaf tissue analysis. Soil moisture sensors guide irrigation during dry season. Integrated pest management runs year-round.",
  },
  {
    phase: "03",
    title: "Harvest & FFB Collection",
    duration: "Year-round",
    icon: Sun,
    description:
      "Trained harvesters cut fresh fruit bunches at peak ripeness — judged by colour change and loose fruit fall. Bunches are collected from the field, transported to the mill and sterilised within 24 hours to arrest enzyme activity that elevates free fatty acids.",
  },
  {
    phase: "04",
    title: "Milling & Oil Extraction",
    duration: "48–72 hrs per batch",
    icon: Factory,
    description:
      "FFBs are sterilised in steam digesters, then threshed to separate the fruit from the bunch stalk. Fruit is pressed to extract CPO. The oil is clarified, dried to below 0.1% moisture and pumped into storage tanks at controlled temperature.",
  },
  {
    phase: "05",
    title: "Kernel Recovery & PKO Processing",
    duration: "Concurrent with milling",
    icon: Package,
    description:
      "The pressed cake containing kernels is separated, cracked and the shells winnowed away. Kernels are dried and either stored for sale whole or processed further for palm kernel oil extraction. Palm kernel cake — the residue — is sold as animal feed.",
  },
];

// ─── Plantation stats ─────────────────────────────────────────────────────────

const STATS = [
  { value: "92%", label: "Oil Extraction Rate", note: "Mill efficiency" },
  { value: "24 hrs", label: "FFB Turnaround", note: "Harvest to mill" },
  { value: "25+ yrs", label: "Palm Lifespan", note: "Tenera hybrid varieties" },
  { value: "3", label: "Products Per Fruit", note: "CPO, PKO & kernel cake" },
];

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function PalmOilProductionPage() {
  const [openStep, setOpenStep] = useState<number | null>(0);
  const content = SERVICE_CONTENT[SLUG];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">

        {/* ══════════════════════════════════════
            01 — HERO
        ══════════════════════════════════════ */}
        <section className="relative h-screen min-h-[640px] overflow-hidden bg-dark2">
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070"
            alt="Kuyash Palm Oil Plantation — Nasarawa State"
            fill
            className="object-cover object-center scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/50 via-transparent to-transparent" />

          {/* back nav */}
          <div className="absolute top-24 left-0 right-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <Link
                  href="/#services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-sans text-sm text-white backdrop-blur-md hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> All Services
                </Link>
              </motion.div>
            </div>
          </div>

          {/* headline */}
          <div className="absolute inset-x-0 bottom-0 z-10 pb-20 pt-36">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-5">
                    Palm Oil Production · Nasarawa State, Nigeria
                  </p>
                  <h1
                    className="font-serif font-bold text-white leading-[1.03] mb-6"
                    style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)" }}
                  >
                    From the Plantation.<br />
                    <span className="text-white/55">Through the Mill. To Market.</span>
                  </h1>
                  <p
                    className="font-sans text-white/60 leading-[1.9] max-w-lg mb-9"
                    style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)" }}
                  >
                    Kuyash cultivates oil palm, sources fresh fruit bunches from outgrower farmers, mills on-site and delivers crude palm oil, palm kernel and PKO to commercial buyers across Nigeria.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="#value-chain"
                      className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-colors duration-200"
                    >
                      Our Value Chain <ChevronDown className="h-4 w-4" />
                    </a>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 border border-white/25 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm px-6 py-3.5 rounded-full backdrop-blur-sm transition-colors duration-200"
                    >
                      Commercial Enquiry
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            02 — STATS STRIP
        ══════════════════════════════════════ */}
        <section className="bg-dark border-b border-dark2">
          <Container>
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-dark2">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  {...listItem(i * 0.07)}
                  className="px-4 md:px-8 py-7 md:py-10"
                >
                  <p
                    className="font-serif font-bold text-white mb-1"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                  >
                    {s.value}
                  </p>
                  <p className="font-sans text-sm font-semibold text-white/70 mb-0.5">{s.label}</p>
                  <p className="font-sans text-xs text-white/35">{s.note}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            03 — INTRODUCING KUYASH PALM OIL
        ══════════════════════════════════════ */}
        <section className="bg-white py-24 border-b border-border">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeUp()}>
                <SectionLabel>Our Operation</SectionLabel>
                <Heading>An Integrated Palm Oil Business</Heading>
                <p className="font-sans text-sm text-gray-500 leading-relaxed mt-5 mb-6 max-w-md">
                  Palm oil is not a side activity at Kuyash — it is a full agricultural and processing operation. We grow oil palm on our own plantation, source additional fresh fruit bunches from outgrower farmers and run our own milling facility to extract crude palm oil and palm kernel products.
                </p>
                <p className="font-sans text-sm text-gray-500 leading-relaxed max-w-md">
                  The result is an integrated value chain: from soil preparation and seedling nursery through to CPO and PKO dispatched to industrial and commercial buyers. Every stage is managed in-house, which means every stage is controlled.
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  {[
                    "Own oil palm plantation in Nasarawa State",
                    "Fresh fruit bunch sourcing from verified outgrowers",
                    "On-site palm oil milling and extraction",
                    "CPO, palm kernel and PKO produced and sold",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-muted shrink-0" />
                      <p className="font-sans text-sm text-gray-600">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="relative"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                  <Image
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600"
                    alt="Kuyash palm oil plantation"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60 mb-1">
                      Nasarawa State, Nigeria
                    </p>
                    <p className="font-serif font-bold text-white text-sm">
                      Kuyash Oil Palm Plantation
                    </p>
                  </div>
                </div>
                {/* floating accent card */}
                <div className="absolute -bottom-6 -left-6 hidden lg:block bg-dark rounded-2xl px-6 py-5 shadow-xl">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted mb-1">Products</p>
                  <p className="font-serif font-bold text-white text-sm">CPO · PKO · Kernel</p>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            04 — INTEGRATED VALUE CHAIN WHEEL
        ══════════════════════════════════════ */}
        <section id="value-chain" className="bg-cream py-24 border-b border-border overflow-hidden">
          <Container>

            {/* ── section heading — centred ── */}
            <motion.div className="text-center mb-16 max-w-2xl mx-auto" {...fadeUp()}>
              <SectionLabel>End to End</SectionLabel>
              <Heading>The Integrated Value Chain</Heading>
              <p className="font-sans text-sm text-gray-500 leading-relaxed mt-4">
                Two sources of fresh fruit bunches feed one milling operation. Three products leave it. Every stage managed by Kuyash.
              </p>
            </motion.div>

            {/* ── body: callouts LEFT — wheel RIGHT ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_540px] gap-10 xl:gap-16 items-center">

              {/* ── LEFT: numbered callouts ── */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="space-y-0 divide-y divide-border"
              >
                {[
                  {
                    num: "01",
                    accent: "#2d5f3f",   /* brand — Upstream green */
                    label: "UPSTREAM",
                    title: "Plantation & Sourcing",
                    body: "Kuyash cultivates oil palm on its own plantation in Nasarawa State and sources additional fresh fruit bunches from verified outgrower smallholders. Two supply streams, one controlled operation.",
                  },
                  {
                    num: "02",
                    accent: "#1a3d2b",   /* dark2 — Processing deep green */
                    label: "PROCESSING",
                    title: "Milling & Extraction",
                    body: "FFBs from both sources are sterilised, pressed and clarified in Kuyash's on-site mill within 24 hours of harvest. Crude palm oil is separated from palm kernel for independent product streams.",
                  },
                  {
                    num: "03",
                    accent: "#4a7a5a",   /* muted — Downstream mid green */
                    label: "DOWNSTREAM",
                    title: "Products & Distribution",
                    body: "Three finished products — crude palm oil, palm kernel and palm kernel oil — are batched, quality-tested and dispatched to food processors and industrial buyers across Nigeria.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.num}
                    {...listItem(i * 0.12)}
                    className="flex items-start gap-6 py-7"
                  >
                    {/* left accent bar */}
                    <div
                      className="shrink-0 w-1 self-stretch rounded-full"
                      style={{ backgroundColor: item.accent }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="font-mono text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full text-white"
                          style={{ backgroundColor: item.accent }}
                        >
                          {item.label}
                        </span>
                        <span className="font-mono text-[9px] text-gray-300 tracking-widest">{item.num}</span>
                      </div>
                      <h3 className="font-serif font-bold text-dark text-[1.05rem] mb-2 leading-snug">{item.title}</h3>
                      <p className="font-sans text-sm text-gray-500 leading-relaxed">{item.body}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* ── RIGHT: circular wheel ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.93, rotate: -4 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
                className="flex items-center justify-center"
              >
                <div className="relative w-full max-w-[540px] aspect-square">
                  <svg
                    viewBox="0 0 540 540"
                    className="w-full h-full drop-shadow-xl"
                    aria-label="Kuyash Palm Oil Integrated Value Chain"
                  >
                    <defs>
                      {/*
                        Photos mapped via userSpaceOnUse so coordinates match
                        the 540×540 viewBox directly — centred at (270,270).
                        Each image fills the full circle area; the clipPath
                        cuts each one to its pie segment.
                      */}

                      {/* ── clip paths (pie thirds, r=232) ── */}
                      {/* Upstream: top-right third  — 270° → 30° (clock) */}
                      <clipPath id="vc-clip-up">
                        <path d="M270,270 L270,38 A232,232 0 0,1 469,386 Z" />
                      </clipPath>
                      {/* Processing: bottom third — 30° → 150° */}
                      <clipPath id="vc-clip-pr">
                        <path d="M270,270 L469,386 A232,232 0 0,1 71,386 Z" />
                      </clipPath>
                      {/* Downstream: top-left third — 150° → 270° */}
                      <clipPath id="vc-clip-dn">
                        <path d="M270,270 L71,386 A232,232 0 0,1 270,38 Z" />
                      </clipPath>

                      {/* ── photo fills — userSpaceOnUse, centred in circle ── */}
                      {/* Upstream: green plantation / field at sunrise — warm green */}
                      <pattern id="vc-img-up" patternUnits="userSpaceOnUse" x="38" y="38" width="464" height="464">
                        <image
                          href="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800"
                          x="0" y="0" width="464" height="464"
                          preserveAspectRatio="xMidYMid slice"
                        />
                      </pattern>
                      {/* Processing: dark seed/grain texture — deep warm brown */}
                      <pattern id="vc-img-pr" patternUnits="userSpaceOnUse" x="38" y="38" width="464" height="464">
                        <image
                          href="https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=800"
                          x="0" y="0" width="464" height="464"
                          preserveAspectRatio="xMidYMid slice"
                        />
                      </pattern>
                      {/* Downstream: golden oil / amber bottle — warm honey tones */}
                      <pattern id="vc-img-dn" patternUnits="userSpaceOnUse" x="38" y="38" width="464" height="464">
                        <image
                          href="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800"
                          x="0" y="0" width="464" height="464"
                          preserveAspectRatio="xMidYMid slice"
                        />
                      </pattern>

                      {/* ── colour overlays as separate <rect> clipped — painted after photo ── */}

                    </defs>

                    {/* ── BACKGROUND disc ── */}
                    <circle cx="270" cy="270" r="270" fill="#eef5f1" />

                    {/* ── UPSTREAM segment (top-right, 270°→30°) ── */}
                    <path d="M270,270 L270,38 A232,232 0 0,1 469,386 Z"
                      fill="url(#vc-img-up)" />
                    {/* brand-green overlay — moderate, lets warm field tones show */}
                    <path d="M270,270 L270,38 A232,232 0 0,1 469,386 Z"
                      fill="#2d5f3f" fillOpacity="0.50" />

                    {/* ── PROCESSING segment (bottom, 30°→150°) ── */}
                    <path d="M270,270 L469,386 A232,232 0 0,1 71,386 Z"
                      fill="url(#vc-img-pr)" />
                    {/* near-black overlay — maximum dark, clearly distinct from flanking segments */}
                    <path d="M270,270 L469,386 A232,232 0 0,1 71,386 Z"
                      fill="#080f0a" fillOpacity="0.65" />

                    {/* ── DOWNSTREAM segment (top-left, 150°→270°) ── */}
                    <path d="M270,270 L71,386 A232,232 0 0,1 270,38 Z"
                      fill="url(#vc-img-dn)" />
                    {/* light muted-green overlay — amber/gold photo still reads through */}
                    <path d="M270,270 L71,386 A232,232 0 0,1 270,38 Z"
                      fill="#4a7a5a" fillOpacity="0.38" />

                    {/* ── Divider spokes — white hairlines from hub to rim ── */}
                    <line x1="270" y1="270" x2="270" y2="38"
                      stroke="white" strokeWidth="1.5" strokeOpacity="0.55" />
                    <line x1="270" y1="270" x2="469" y2="386"
                      stroke="white" strokeWidth="1.5" strokeOpacity="0.55" />
                    <line x1="270" y1="270" x2="71" y2="386"
                      stroke="white" strokeWidth="1.5" strokeOpacity="0.55" />

                    {/* ── Segment labels — group-rotate so text stays readable ── */}
                    {/*
                      Strategy: rotate the whole <g> around the SVG centre (270,270)
                      so a text element placed at (270, 130) ends up in the right wedge,
                      then counter-rotate the text itself so it stays upright.
                      r=140 from centre → y=270-140=130 when "pointing up".
                    */}
                    {/*
                      Segment mid-angles in SVG convention (0°=right, cw):
                        Upstream:   330°  — top-right
                        Processing:  90°  — bottom
                        Downstream: 210°  — top-left

                      Text is placed at (270, 130) = r=140 pointing straight up (SVG 270°).
                      To move it to target angle T: group-rotate by (T - 270°), counter-rotate text by -(T - 270°).
                        Upstream:    rotate(60,  270,270) / rotate(-60,  270,130)
                        Processing:  rotate(180, 270,270) / rotate(-180, 270,130)
                        Downstream:  rotate(300, 270,270) / rotate(-300, 270,130)
                    */}
                    <g transform="rotate(60, 270, 270)">
                      <text x="270" y="130" textAnchor="middle"
                        transform="rotate(-60, 270, 130)"
                        fontFamily="monospace" fontSize="8.5" fill="white" fillOpacity="0.85"
                        letterSpacing="2.5">UPSTREAM</text>
                    </g>

                    <g transform="rotate(180, 270, 270)">
                      <text x="270" y="130" textAnchor="middle"
                        transform="rotate(-180, 270, 130)"
                        fontFamily="monospace" fontSize="8.5" fill="white" fillOpacity="0.85"
                        letterSpacing="2.5">PROCESSING</text>
                    </g>

                    <g transform="rotate(300, 270, 270)">
                      <text x="270" y="130" textAnchor="middle"
                        transform="rotate(-300, 270, 130)"
                        fontFamily="monospace" fontSize="8.5" fill="white" fillOpacity="0.85"
                        letterSpacing="2.5">DOWNSTREAM</text>
                    </g>

                    {/* ── Outer rim rings ── */}
                    <circle cx="270" cy="270" r="232"
                      fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.25" />
                    <circle cx="270" cy="270" r="246"
                      fill="none" stroke="#c6dece" strokeWidth="1.5" />
                    <circle cx="270" cy="270" r="258"
                      fill="none" stroke="#b8d0c0" strokeWidth="1" strokeDasharray="3 8" strokeOpacity="0.5" />


                    {/* ── Centre hub ── */}
                    <circle cx="270" cy="270" r="104"
                      fill="none" stroke="#2d5f3f" strokeWidth="14" strokeOpacity="0.15" />
                    <circle cx="270" cy="270" r="92" fill="#080f0a" />
                    <circle cx="270" cy="270" r="92"
                      fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.1" />

                    {/* hub text */}
                    <text x="270" y="258"
                      textAnchor="middle"
                      fontFamily="Georgia, 'Times New Roman', serif"
                      fontSize="10.5" fontWeight="bold" fill="#6b9d7a" letterSpacing="2.5"
                    >KUYASH</text>
                    <text x="270" y="276"
                      textAnchor="middle"
                      fontFamily="Georgia, 'Times New Roman', serif"
                      fontSize="14.5" fontWeight="bold" fill="white"
                    >Palm Oil</text>
                    <line x1="238" y1="284" x2="302" y2="284"
                      stroke="white" strokeWidth="0.8" strokeOpacity="0.2" />
                    <text x="270" y="297"
                      textAnchor="middle"
                      fontFamily="monospace" fontSize="7.5" fill="#6b9d7a" letterSpacing="3"
                    >INTEGRATED</text>
                  </svg>
                </div>
              </motion.div>

            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            05 — PRODUCTION PROCESS ACCORDION
        ══════════════════════════════════════ */}
        <section className="bg-cream py-24 border-b border-border">
          <Container>
            <motion.div className="mb-14" {...fadeUp()}>
              <SectionLabel>Seed to Oil</SectionLabel>
              <Heading>How We Produce</Heading>
              <p className="font-sans text-sm text-gray-500 leading-relaxed mt-4 max-w-xl">
                Five stages from nursery to finished product — each managed in-house from the same land that grew the palms.
              </p>
            </motion.div>

            <div className="space-y-3">
              {PROCESS.map((step, i) => {
                const Icon = step.icon;
                const isOpen = openStep === i;
                return (
                  <motion.div
                    key={step.phase}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen ? "border-brand-border" : "border-border hover:border-brand-border"
                    }`}
                  >
                    <button
                      onClick={() => setOpenStep(isOpen ? null : i)}
                      className="w-full flex items-start gap-4 bg-white px-5 sm:px-7 py-5 text-left"
                    >
                      <div className="shrink-0 flex flex-col items-center gap-1.5 pt-0.5">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors duration-200 ${
                          isOpen ? "bg-brand border-brand" : "bg-brand-bg border-brand-border"
                        }`}>
                          <Icon className={`w-5 h-5 transition-colors duration-200 ${isOpen ? "text-white" : "text-brand"}`} />
                        </div>
                        <span className="text-[9px] font-mono text-muted tracking-[0.15em]">{step.phase}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-bold text-dark text-base">{step.title}</h3>
                        <p className="font-sans text-xs text-muted mt-0.5">{step.duration}</p>
                      </div>
                      <ChevronDown
                        className={`shrink-0 w-4 h-4 text-muted transition-transform duration-200 mt-1 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                        >
                          <div className="bg-cream border-t border-border px-5 sm:px-7 py-5 pl-[76px]">
                            <p className="font-sans text-sm text-gray-500 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            06 — PRODUCTS
        ══════════════════════════════════════ */}
        <section className="bg-white py-24 border-b border-border">
          <Container>
            <motion.div className="mb-12" {...fadeUp()}>
              <SectionLabel>What We Produce</SectionLabel>
              <Heading>Palm Oil Products</Heading>
              <p className="font-sans text-sm text-gray-500 leading-relaxed mt-4 max-w-xl">
                Three products from one fruit — each with its own market, specification and application. Available in commercial quantities for industrial and food-sector buyers.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRODUCTS.map((product, i) => (
                <motion.div
                  key={product.name}
                  {...listItem(i * 0.08)}
                  className="group bg-cream border border-border hover:border-brand-border rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                    <span className="absolute top-3 left-3 text-[9px] font-mono uppercase tracking-[0.18em] bg-dark/65 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">
                      {product.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif font-bold text-dark text-base mb-2">{product.name}</h3>
                    <p className="font-sans text-xs text-gray-500 leading-relaxed mb-5">{product.description}</p>
                    <ul className="space-y-1.5 mb-6">
                      {product.specs.map((spec) => (
                        <li key={spec} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-muted shrink-0" />
                          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{spec}</p>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={product.href}
                      className="inline-flex items-center gap-2 text-brand hover:text-brand-hover font-semibold text-xs font-sans transition-colors duration-200"
                    >
                      Enquire <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            07 — WHY KUYASH
        ══════════════════════════════════════ */}
        <section className="bg-cream py-24 border-b border-border">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              <motion.div {...fadeUp()}>
                <SectionLabel>Why Kuyash</SectionLabel>
                <Heading>What Makes This Operation Different</Heading>
                <p className="font-sans text-sm text-gray-500 leading-relaxed mt-4 mb-8 max-w-md">
                  Most palm oil traders in Nigeria operate at one stage of the chain — buying CPO or selling it on. Kuyash operates across the full chain, which changes what it can offer commercial buyers.
                </p>
                <div className="space-y-4">
                  {DIFFERENTIATORS.map((d, i) => {
                    const Icon = d.icon;
                    return (
                      <motion.div
                        key={d.title}
                        {...listItem(i * 0.06)}
                        className="flex items-start gap-4 bg-white border border-border rounded-2xl px-5 py-5"
                      >
                        <div className="w-9 h-9 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-brand" />
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-dark text-sm mb-1">{d.title}</h3>
                          <p className="font-sans text-xs text-gray-500 leading-relaxed">{d.body}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* photo stack */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="lg:pt-14 space-y-4"
              >
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border">
                  <Image
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600"
                    alt="Palm oil plantation management"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-border">
                    <Image
                      src="https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=1600"
                      alt="Palm kernels"
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-border">
                    <Image
                      src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1600"
                      alt="Palm oil products"
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                </div>
              </motion.div>

            </div>
          </Container>
        </section>

        {/* ══════════════════════════════════════
            08 — CTA
        ══════════════════════════════════════ */}
        <section className="relative py-28 overflow-hidden bg-dark">
          <Image
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070"
            alt=""
            fill
            className="object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark/85 to-dark2/60" />

          <div className="relative z-10">
            <Container>
              <div className="max-w-2xl">
                <motion.div {...fadeUp()}>
                  <SectionLabel className="text-muted">Commercial Supply</SectionLabel>
                  <h2
                    className="font-serif font-bold text-white leading-[1.06] mb-5"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
                  >
                    Enquire About<br />
                    <span className="text-white/50">Palm Oil Supply</span>
                  </h2>
                  <p className="font-sans text-white/50 text-sm leading-relaxed max-w-md mb-10">
                    We supply crude palm oil, palm kernel and palm kernel oil in commercial quantities to food processors, industrial manufacturers and commodity buyers across Nigeria. Contact us to discuss product specifications, volumes and pricing.
                  </p>
                  <div className="flex flex-col sm:flex-row items-start gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200"
                    >
                      Start a Commercial Enquiry <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm px-7 py-3.5 rounded-full backdrop-blur-sm transition-colors duration-200"
                    >
                      Browse Products
                    </Link>
                  </div>
                </motion.div>
              </div>
            </Container>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
