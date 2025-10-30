/**
 * Application-wide constants and configuration
 */

export const SITE_CONFIG = {
  name: "Betàni",
  tagline: "Farming for a future",
  description: "Cultivating a sustainable future through innovative agriculture and empowering rural communities.",
} as const;

export const STATS = [
  { value: "5000+", label: "Farmers Connected" },
  { value: "90%", label: "Yield Improvement" },
  { value: "50+", label: "Agriculture Experts" },
  { value: "98%", label: "Positive Impact" },
] as const;

export const SERVICES = [
  {
    id: 1,
    title: "Soil Enrichment",
    description: "Enhance soil health with organic nutrients and sustainable practices.",
  },
  {
    id: 2,
    title: "Eco-Friendly",
    description: "Implement environmentally conscious farming methods.",
  },
  {
    id: 3,
    title: "Water Efficiency",
    description: "Optimize water usage through smart irrigation systems.",
  },
  {
    id: 4,
    title: "Organic Farming",
    description: "Cultivate crops without synthetic pesticides or fertilizers.",
  },
] as const;

export const GOALS = [
  {
    id: 1,
    value: "2B",
    label: "Liters of water conserved annually through smart irrigation",
  },
  {
    id: 2,
    value: "2B",
    label: "Collaborate on policy 2 billion liters of water annually through efficient water-saving practices",
  },
  {
    id: 3,
    value: "100M",
    label: "People impacted through sustainable farming, supporting livelihoods globally",
  },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About Us", href: "#about" },
  { label: "Blog", href: "#blog" },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "Reviews", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Team", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  services: [
    { label: "Soil Enrichment", href: "#" },
    { label: "Water Management", href: "#" },
    { label: "Crop Consultation", href: "#" },
    { label: "Organic Farming", href: "#" },
  ],
  innovations: [
    { label: "Smart Irrigation", href: "#" },
    { label: "Precision Agriculture", href: "#" },
    { label: "Sustainable Practices", href: "#" },
    { label: "AI Solutions", href: "#" },
  ],
  successStories: [
    { label: "Farmer Testimonials", href: "#" },
    { label: "Community Impact", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "Research Papers", href: "#" },
  ],
} as const;
