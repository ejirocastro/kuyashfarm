// ─── Kuyash Design Tokens ─────────────────────────────────────────────────────
// Single source of truth. Import from here — never hardcode hex values in pages.

// Colours
export const colors = {
  brand:   "#2d5f3f", // primary green
  dark:    "#080f0a", // near-black
  dark2:   "#1a3d2b", // deep green
  cream:   "#faf8f5", // warm off-white background
  border:  "#e8ede9", // subtle green-tinted border
  muted:   "#6b9d7a", // muted green (labels, icons)
  gold:    "#e8d5a3", // warm gold (Academy badge, accents)
  brandBg: "#eef5f1", // light green tint (icon backgrounds)
  brandBorder: "#c6dece", // medium green border
  body:    "#4a5568", // body text (gray-600 equivalent)
  subtle:  "#6b7280", // secondary body text (gray-500)
} as const;

// Typography scale — use with font-serif / font-sans
export const type = {
  // Heading clamp values  (min, preferred, max)
  h1: "clamp(2.6rem, 5vw, 4rem)",
  h1Hero: "clamp(2.6rem, 6vw, 4.8rem)",
  h2: "clamp(1.8rem, 3vw, 2.8rem)",
  h2Sm: "clamp(1.6rem, 2.5vw, 2.2rem)",
  h3: "clamp(1.4rem, 2vw, 1.8rem)",
  label: "10px",   // mono uppercase eyebrow label
} as const;

// Spacing — section vertical padding
export const spacing = {
  section: "py-20",        // standard section padding
  sectionLg: "py-24",      // hero/feature sections
  sectionSm: "py-14",      // compact sections
  container: "max-w-7xl mx-auto px-6 md:px-12 lg:px-16",
} as const;

// Border radii
export const radii = {
  card: "rounded-2xl",     // content cards, image containers
  badge: "rounded-full",   // pills, tags, buttons
  icon: "rounded-xl",      // icon boxes
  sm: "rounded-lg",        // small elements
} as const;

// Shadows
export const shadows = {
  card: "shadow-sm",
  cardHover: "shadow-xl",
  dropdown: "shadow-2xl",
  form: "0 4px 32px rgba(0,0,0,0.08)",
} as const;

// Animation
// Framer Motion respects prefers-reduced-motion automatically — animations using
// initial/animate/whileInView will be skipped for users who opt out.
export const ease = [0.16, 1, 0.3, 1] as const;

// Scroll-triggered section reveal — standard content blocks, stat grids, cards
export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease },
});

// Mount-triggered hero entrance — larger travel, longer duration, fires on load not scroll
export const heroEntrance = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

// Dense list / icon grid stagger — tighter travel, snappier, for repeated small items
export const listItem = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.4, delay, ease },
});

// Spring easing for interactive accordion/disclosure panels
export const springReveal = {
  type: "spring" as const,
  stiffness: 420,
  damping: 32,
  mass: 0.8,
};
