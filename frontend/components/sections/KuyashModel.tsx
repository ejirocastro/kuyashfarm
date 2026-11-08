"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ease as EASE } from "@/lib/tokens";
import { Container } from "@/components/ui";

const NODES = [
  {
    label: "CROPS",
    sub: ["Field crops &", "production"],
    angle: -90, // 12 o'clock
    labelSide: "right",
  },
  {
    label: "LIVESTOCK",
    sub: ["Cattle, Sheep &", "Animal Rearing"],
    angle: -18, // 2–3 o'clock
    labelSide: "right",
  },
  {
    label: "AQUACULTURE",
    sub: ["Catfish Production", "& Fish Ponds"],
    angle: 54, // 4–5 o'clock
    labelSide: "right",
  },
  {
    label: "PROCESSING",
    sub: ["Value Addition &", "Food Processing"],
    angle: 126, // 7–8 o'clock
    labelSide: "left",
  },
  {
    label: "HORTICULTURE",
    sub: ["Vegetables, Fruits &", "Greenhouse Farming"],
    angle: 198, // 9–10 o'clock
    labelSide: "left",
  },
];

// SVG canvas center and radii
const VW = 700;
const VH = 560;
const CX = 350;
const CY = 280;
const ORBIT_R = 185;   // orbit of nodes
const NODE_R  = 32;    // node circle radius
const CENTER_R = 80;   // center circle radius

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

// Leaf icon centered at (cx, cy) with given size
function LeafIcon({ cx, cy, size = 18 }: { cx: number; cy: number; size?: number }) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx - s}, ${cy - s}) scale(${size / 24})`}>
      <path
        d="M12 2C8 2 4 6 4 11c0 3.5 2 6.5 5 8l-1 3h8l-1-3c3-1.5 5-4.5 5-8 0-5-4-9-8-9zm0 2c2.5 2 5 5 5 7a5 5 0 0 1-10 0c0-2 2.5-5 5-7z"
        fill="none"
        stroke="var(--brand)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <line x1="12" y1="13" x2="12" y2="22" stroke="var(--brand)" strokeWidth="1.4" strokeLinecap="round" />
    </g>
  );
}

// Cow-head icon for LIVESTOCK
function CowIcon({ cx, cy, size = 18 }: { cx: number; cy: number; size?: number }) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx - s}, ${cy - s}) scale(${size / 24})`}>
      <path
        d="M4 6 C2 6 2 10 4 10 L4 14 C4 18 8 20 12 20 C16 20 20 18 20 14 L20 10 C22 10 22 6 20 6 L18 6 C17 4 15 3 12 3 C9 3 7 4 6 6 Z"
        fill="none" stroke="var(--brand)" strokeWidth="1.4" strokeLinejoin="round"
      />
      <circle cx="9" cy="12" r="1.2" fill="var(--brand)" />
      <circle cx="15" cy="12" r="1.2" fill="var(--brand)" />
      <path d="M10 16 Q12 17.5 14 16" fill="none" stroke="var(--brand)" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  );
}

// Fish icon for AQUACULTURE
function FishIcon({ cx, cy, size = 18 }: { cx: number; cy: number; size?: number }) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx - s}, ${cy - s}) scale(${size / 24})`}>
      <path
        d="M2 12 C2 12 6 5 14 5 C14 5 20 5 21 12 C20 19 14 19 14 19 C6 19 2 12 2 12Z"
        fill="none" stroke="var(--brand)" strokeWidth="1.4" strokeLinejoin="round"
      />
      <path d="M21 12 L24 9 M21 12 L24 15" fill="none" stroke="var(--brand)" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="11" r="1.3" fill="var(--brand)" />
    </g>
  );
}

// Gear icon for PROCESSING
function GearIcon({ cx, cy, size = 18 }: { cx: number; cy: number; size?: number }) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx - s}, ${cy - s}) scale(${size / 24})`}>
      <circle cx="12" cy="12" r="3.5" fill="none" stroke="var(--brand)" strokeWidth="1.4" />
      <path
        d="M12 2v2.5M12 19.5V22M4.22 4.22l1.77 1.77M18.01 18.01l1.77 1.77M2 12h2.5M19.5 12H22M4.22 19.78l1.77-1.77M18.01 5.99l1.77-1.77"
        stroke="var(--brand)" strokeWidth="1.4" strokeLinecap="round"
      />
    </g>
  );
}

// Plant/seedling icon for HORTICULTURE
function PlantIcon({ cx, cy, size = 18 }: { cx: number; cy: number; size?: number }) {
  const s = size / 2;
  return (
    <g transform={`translate(${cx - s}, ${cy - s}) scale(${size / 24})`}>
      <path
        d="M12 22 L12 10"
        stroke="var(--brand)" strokeWidth="1.4" strokeLinecap="round"
      />
      <path
        d="M12 10 C12 10 6 10 5 5 C5 5 11 4 12 10Z"
        fill="none" stroke="var(--brand)" strokeWidth="1.4" strokeLinejoin="round"
      />
      <path
        d="M12 14 C12 14 18 13 19 8 C19 8 13 7 12 14Z"
        fill="none" stroke="var(--brand)" strokeWidth="1.4" strokeLinejoin="round"
      />
    </g>
  );
}

// Double leaf for center
function CenterLeaf({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <path
        d={`M${cx} ${cy - 4} C${cx - 8} ${cy - 16} ${cx - 14} ${cy - 28} ${cx} ${cy - 34} C${cx + 14} ${cy - 28} ${cx + 8} ${cy - 16} ${cx} ${cy - 4}Z`}
        fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinejoin="round"
      />
      <path
        d={`M${cx} ${cy - 4} C${cx - 10} ${cy - 14} ${cx - 16} ${cy - 24} ${cx - 4} ${cy - 32}`}
        fill="none" stroke="var(--brand)" strokeWidth="1.2" strokeLinecap="round"
        strokeDasharray="0"
        opacity="0.5"
      />
      <line x1={cx} y1={cy - 4} x2={cx} y2={cy + 6} stroke="var(--brand)" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

const ICON_COMPONENTS = [LeafIcon, CowIcon, FishIcon, GearIcon, PlantIcon];

// ── Pre-computed static geometry (module-level = identical on SSR and client) ──

const GAP_DEG = 18;

// Round to 4 dp to guarantee SSR/client floating-point parity
function r4(n: number) {
  return Math.round(n * 10000) / 10000;
}

const ARC_PATHS: string[] = NODES.map((node, i) => {
  const startAngle = node.angle + GAP_DEG;
  const endAngle   = NODES[(i + 1) % NODES.length].angle - GAP_DEG;

  const startRad = toRad(startAngle);
  const endRad   = toRad(endAngle);

  const x1 = r4(CX + ORBIT_R * Math.cos(startRad));
  const y1 = r4(CY + ORBIT_R * Math.sin(startRad));
  const x2 = r4(CX + ORBIT_R * Math.cos(endRad));
  const y2 = r4(CY + ORBIT_R * Math.sin(endRad));

  let delta = endAngle - startAngle;
  if (delta < 0) delta += 360;
  const largeArc = delta > 180 ? 1 : 0;

  return `M ${x1} ${y1} A ${ORBIT_R} ${ORBIT_R} 0 ${largeArc} 1 ${x2} ${y2}`;
});

interface ArrowPoints { points: string }

const ARROW_POINTS: ArrowPoints[] = NODES.map((node, i) => {
  const nextAngle = NODES[(i + 1) % NODES.length].angle;
  let mid = (node.angle + nextAngle) / 2;
  if (nextAngle < node.angle) mid = (node.angle + nextAngle + 360) / 2;

  const rad  = toRad(mid);
  const ax   = CX + ORBIT_R * Math.cos(rad);
  const ay   = CY + ORBIT_R * Math.sin(rad);
  const tx   = -Math.sin(rad);
  const ty   = Math.cos(rad);
  const size = 6;

  const p1x = r4(ax + tx * size);
  const p1y = r4(ay + ty * size);
  const p2x = r4(ax - tx * (size * 0.5) + Math.cos(rad) * (size * 0.6));
  const p2y = r4(ay - ty * (size * 0.5) + Math.sin(rad) * (size * 0.6));
  const p3x = r4(ax - tx * (size * 0.5) - Math.cos(rad) * (size * 0.6));
  const p3y = r4(ay - ty * (size * 0.5) - Math.sin(rad) * (size * 0.6));

  return { points: `${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y}` };
});

function MobileModel() {
  return (
    <div className="mt-10">
      {/* centre hub */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
            style={{ borderColor: "var(--brand)" }}
          >
            <svg viewBox="0 0 32 32" className="w-8 h-8" aria-hidden>
              <CenterLeaf cx={16} cy={16} />
            </svg>
          </div>
          <div className="text-center">
            <p className="font-serif font-bold text-[11px] tracking-[0.15em] uppercase" style={{ color: "var(--brand)" }}>
              Kuyash
            </p>
            <p className="font-serif font-bold text-[9px] tracking-[0.12em] uppercase" style={{ color: "var(--brand)" }}>
              Integrated Farm
            </p>
          </div>
        </div>
      </div>

      {/* spoke line */}
      <div className="flex justify-center mb-4">
        <div className="w-px h-6" style={{ background: "var(--brand-border)" }} />
      </div>

      {/* 5 operation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {NODES.map((node, i) => {
          const IconComp = ICON_COMPONENTS[i];
          return (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}
              className="flex items-start gap-3 rounded-xl border p-4"
              style={{ borderColor: "var(--brand-border)", background: "var(--brand-bg)" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "white", border: "1.5px solid var(--brand)" }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
                  <IconComp cx={12} cy={12} size={18} />
                </svg>
              </div>
              <div>
                <p className="font-serif font-bold text-sm mb-0.5" style={{ color: "var(--dark2)" }}>
                  {node.label}
                </p>
                <p className="font-sans text-[11px] leading-snug" style={{ color: "#6b7280" }}>
                  {node.sub.join(" ")}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function KuyashModel() {

  return (
    <section className="bg-cream py-16 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT — copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand mb-4">
              The Kuyash Model
            </p>
            <h2
              className="font-serif font-bold text-dark leading-[1.08] mb-5"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
            >
              An Integrated<br />Farming System
            </h2>
            <p className="text-gray-500 font-sans text-sm leading-relaxed mb-8 max-w-[380px]">
              Our operations work together in a sustainable cycle that improves productivity,
              protects resources and creates lasting value. Every arm of the farm feeds into
              the next — reducing waste and maximising output.
            </p>
            <Link
              href="/services/crop-vegetable-production"
              className="inline-flex items-center gap-2 border border-brand-border text-brand font-semibold text-sm px-6 py-3 rounded-full hover:bg-brand-bg transition-colors duration-200"
            >
              Discover The Model <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Mobile-only: 5-card list replaces the SVG */}
            <div className="lg:hidden">
              <MobileModel />
            </div>
          </motion.div>

          {/* ── RIGHT — SVG diagram (desktop only) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
            className="hidden lg:flex items-center justify-center"
          >
            <svg
              viewBox={`0 0 ${VW} ${VH}`}
              className="w-full max-w-[560px]"
              aria-label="Kuyash Integrated Farm ecosystem diagram"
            >
              {/* ── orbit arc segments ── */}
              {ARC_PATHS.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke="var(--brand-border)"
                  strokeWidth="1.2"
                />
              ))}

              {/* ── arrowheads at midpoint of each arc ── */}
              {ARROW_POINTS.map((arrow, i) => (
                <polygon key={i} points={arrow.points} fill="var(--brand-border)" />
              ))}

              {/* ── center circle ── */}
              <circle
                cx={CX} cy={CY} r={CENTER_R}
                fill="white"
                stroke="var(--brand)"
                strokeWidth="1.2"
              />
              <CenterLeaf cx={CX} cy={CY} />
              <text x={CX} y={CY + 18} textAnchor="middle" fontFamily="'Georgia', serif" fontWeight="700" fontSize="11" fill="var(--brand)" letterSpacing="1.5">KUYASH</text>
              <text x={CX} y={CY + 31} textAnchor="middle" fontFamily="'Georgia', serif" fontWeight="700" fontSize="11" fill="var(--brand)" letterSpacing="1.5">INTEGRATED</text>
              <text x={CX} y={CY + 44} textAnchor="middle" fontFamily="'Georgia', serif" fontWeight="700" fontSize="11" fill="var(--brand)" letterSpacing="1.5">FARM</text>

              {/* ── nodes ── */}
              {NODES.map((node, i) => {
                const rad = toRad(node.angle);
                const nx = CX + ORBIT_R * Math.cos(rad);
                const ny = CY + ORBIT_R * Math.sin(rad);
                const isLeft = node.labelSide === "left";
                const IconComponent = ICON_COMPONENTS[i];

                // label positioning — push outward from node
                const labelGap = NODE_R + 14;
                const lx = isLeft ? nx - labelGap : nx + labelGap;
                const textAnchor = isLeft ? "end" : "start";

                // vertical offset for label group centring
                const subCount = node.sub.length;
                const labelTotalH = 14 + subCount * 12;
                const ly = ny - labelTotalH / 2 + 5;

                return (
                  <g key={node.label}>
                    {/* node circle */}
                    <circle
                      cx={nx} cy={ny} r={NODE_R}
                      fill="white"
                      stroke="var(--brand)"
                      strokeWidth="1.2"
                    />
                    {/* icon */}
                    <IconComponent cx={nx} cy={ny} size={20} />

                    {/* label heading */}
                    <text
                      x={lx} y={ly}
                      textAnchor={textAnchor}
                      fontFamily="'Georgia', serif"
                      fontWeight="700"
                      fontSize="11.5"
                      fill="var(--dark2)"
                      letterSpacing="0.8"
                    >
                      {node.label}
                    </text>
                    {/* sub lines */}
                    {node.sub.map((line, li) => (
                      <text
                        key={li}
                        x={lx}
                        y={ly + 13 + li * 12}
                        textAnchor={textAnchor}
                        fontFamily="'Arial', sans-serif"
                        fontSize="9.5"
                        fill="#9ca3af"
                      >
                        {line}
                      </text>
                    ))}
                  </g>
                );
              })}
            </svg>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
