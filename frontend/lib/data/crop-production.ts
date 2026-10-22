import {
  Leaf,
  TrendingUp,
  Users,
  Award,
  Droplets,
  Sun,
  Sprout,
  Package,
  BarChart3,
  Cpu,
  Cloud,
  Zap,
  Wheat,
  TreePine,
} from "lucide-react";

// ─── Crop catalogue ───────────────────────────────────────────────────────────

export interface Crop {
  id: string;
  name: string;
  category: "field-crops" | "vegetables" | "fruits";
  season: string;
  cycleWeeks: number;
  yieldPerHa: string;
  icon: string;           // emoji fallback for quick rendering
  image: string;
  tagline: string;
  description: string;
  growingNotes: string[];
  shopHref: string;
}

export const CROPS: Crop[] = [
  // ── Field crops ──
  {
    id: "maize",
    name: "Maize",
    category: "field-crops",
    season: "March – July / August – December",
    cycleWeeks: 14,
    yieldPerHa: "4–6 tonnes",
    icon: "🌽",
    image: "https://images.unsplash.com/photo-1601593768799-76d98ac4d8e1?q=80&w=1600",
    tagline: "Nigeria's most important staple grain, grown at scale.",
    description:
      "Maize is our highest-volume field crop — grown across open hectares of Nasarawa land in two rotational seasons each year. We plant improved hybrid varieties (OBA Super 2, SAMMAZ 15) selected for drought tolerance and high stover yield, supporting both grain production and animal feed for our livestock arm.",
    growingNotes: [
      "Ridge planting at 75 × 25 cm spacing for uniform canopy cover",
      "Basal NPK (15:15:15) at planting; top-dressed with urea at knee height",
      "Integrated weed management — manual + selective herbicide post-emergence",
      "Harvested at physiological maturity; sun-dried to <13% moisture before storage",
    ],
    shopHref: "/shop/grains",
  },
  {
    id: "cassava",
    name: "Cassava",
    category: "field-crops",
    season: "Year-round (planted at onset of rains)",
    cycleWeeks: 52,
    yieldPerHa: "20–35 tonnes fresh tuber",
    icon: "🌿",
    image: "https://images.unsplash.com/photo-1598511726623-d2e9996b09b2?q=80&w=1600",
    tagline: "Drought-resilient, high-yield root crop for food and processing.",
    description:
      "Cassava thrives in Nasarawa's sandy-loam soils and is a cornerstone of our integrated system. We cultivate TMS improved varieties, harvesting roots for direct fresh sale and supplying our processing unit with starch and garri production feedstock. Cassava peels feed our livestock, closing the production loop.",
    growingNotes: [
      "Stem cuttings planted on ridges at 1 × 1 m spacing",
      "Weed control critical in first 3 months — 2 rounds of hand-weeding",
      "Low fertiliser requirement; single NPK application at 6–8 weeks",
      "Harvested between 9–18 months depending on variety and market demand",
    ],
    shopHref: "/shop/grains",
  },
  {
    id: "groundnut",
    name: "Groundnut",
    category: "field-crops",
    season: "April – September",
    cycleWeeks: 16,
    yieldPerHa: "1.5–2.5 tonnes dry pod",
    icon: "🥜",
    image: "https://images.unsplash.com/photo-1606913084603-3e7702b01627?q=80&w=1600",
    tagline: "High-protein legume that enriches soil and diversifies income.",
    description:
      "Groundnut serves a dual purpose on our farm: it fixes atmospheric nitrogen — improving soil for the crops that follow it in rotation — and yields a valuable, protein-rich cash crop. We grow Samnut 24 and local red-skin varieties, targeting the oil and confectionery markets.",
    growingNotes: [
      "Planted on ridges or flat beds at 30 × 10 cm spacing",
      "Rhizobium inoculant applied to seeds before planting for nitrogen fixation",
      "Earthing up at 6 weeks promotes pod formation in the soil",
      "Harvested by uprooting when 75% of leaves turn yellow; sun-cured for 2 weeks",
    ],
    shopHref: "/shop/grains",
  },
  // ── Vegetables ──
  {
    id: "tomato",
    name: "Tomato",
    category: "vegetables",
    season: "October – March (dry season, irrigated)",
    cycleWeeks: 14,
    yieldPerHa: "20–35 tonnes",
    icon: "🍅",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1600",
    tagline: "Nigeria's most traded vegetable, produced under drip irrigation.",
    description:
      "Tomato is our highest-value vegetable and a year-round market staple. We grow Roma VF and Cobra F1 hybrids under drip irrigation in the dry season — eliminating disease pressure from rain splash — on raised beds with plastic mulch to suppress weeds and conserve soil moisture. Output feeds our fresh market, processing unit, and e-commerce customers.",
    growingNotes: [
      "Raised in nursery trays for 4 weeks before transplanting to field",
      "Planted on 1.2 m raised beds at 50 × 50 cm spacing with plastic mulch",
      "Fertigated through drip lines — daily moisture + weekly nutrient schedule",
      "Staked at 30 cm height; pruned to single stem for maximum fruit size",
      "Harvested at mature-green to breaker stage for market; fully red for processing",
    ],
    shopHref: "/shop/vegetables",
  },
  {
    id: "cucumber",
    name: "Cucumber",
    category: "vegetables",
    season: "October – April",
    cycleWeeks: 9,
    yieldPerHa: "25–40 tonnes",
    icon: "🥒",
    image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?q=80&w=1600",
    tagline: "Fast-cycling cash crop with very high market demand.",
    description:
      "Cucumber is one of our fastest-returning vegetables — first harvest arrives just 45–55 days after transplanting, with picking windows every 2–3 days. We grow Poinsett 76 and Thunder F1 on trellised beds to maximise airflow, fruit quality and ease of picking. High water requirement makes it an ideal rotation partner for our drip-irrigated tomato beds.",
    growingNotes: [
      "Direct-seeded or transplanted on mounds at 1 m × 0.5 m",
      "Trellis netting installed at 30 cm height for vine management",
      "High potassium feeding during fruiting phase improves skin quality",
      "Picked every 2–3 days once fruiting begins to maintain production flush",
    ],
    shopHref: "/shop/vegetables",
  },
  {
    id: "bell-pepper",
    name: "Bell Pepper",
    category: "vegetables",
    season: "October – March",
    cycleWeeks: 16,
    yieldPerHa: "15–25 tonnes",
    icon: "🫑",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=1600",
    tagline: "Premium colour variety for upscale markets and food processors.",
    description:
      "Bell peppers command a premium price in Nigerian urban markets and hotel supply chains. We produce California Wonder (green) and Yolo Wonder (red/yellow) varieties under drip irrigation and full staking. The crop demands precise calcium and boron nutrition to prevent blossom-end rot — a challenge we manage through regular fertigation monitoring.",
    growingNotes: [
      "4-week nursery period; transplanted at 6-leaf stage",
      "Planted at 50 × 60 cm on mulched ridges for weed and moisture control",
      "Weekly calcium nitrate foliar spray during fruit development",
      "Stake or cage every plant; remove early suckers to build frame",
      "Harvested green at full size or allowed to colour for red/yellow premium",
    ],
    shopHref: "/shop/vegetables",
  },
  // ── Fruits ──
  {
    id: "orange",
    name: "Orange",
    category: "fruits",
    season: "November – January (peak), some variety year-round",
    cycleWeeks: 312,  // 6 years to full bearing
    yieldPerHa: "15–25 tonnes at maturity",
    icon: "🍊",
    image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=1600",
    tagline: "Long-term orchard investment delivering vitamin C and revenue.",
    description:
      "Our orange orchard is a permanent asset on the farm, with Valencia and Washington Navel trees now entering peak production years. We manage the orchard under an integrated nutrient programme — composted manure from our livestock unit feeds the citrus trees in a nutrient cycle that cuts fertiliser costs while improving fruit flavour and peel quality.",
    growingNotes: [
      "Trees grafted on Rough Lemon rootstock for Nasarawa soil adaptability",
      "Planted at 6 × 6 m spacing — 278 trees per hectare",
      "Drip-irrigated through dry season; organic mulch ring suppresses weeds",
      "Annual pruning opens canopy for light penetration and pest access",
      "Harvested by hand-clipping when brix reading exceeds 9–10°",
    ],
    shopHref: "/shop/fruits",
  },
  {
    id: "banana",
    name: "Banana",
    category: "fruits",
    season: "Year-round (staggered planting)",
    cycleWeeks: 52,
    yieldPerHa: "20–40 tonnes",
    icon: "🍌",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=1600",
    tagline: "High-yielding perennial that produces year-round from ratoon cycles.",
    description:
      "Banana's advantage on an integrated farm is perpetual production — once established, a ratoon cycle means at least one block is always weeks from harvest. We grow Grand Nain (Cavendish) for fresh market and a local Gros Michel-type for the street food segment. Banana leaves are composted; spent pseudostems become mulch for the vegetable beds.",
    growingNotes: [
      "Tissue-culture plantlets or disease-free suckers at 2 × 3 m spacing",
      "Establish irrigation in first 6 months to accelerate bunch development",
      "De-suckering to 1–2 followers per mat for bunch size control",
      "Bunch bagged at flower emergence to protect against thrips and sunburn",
      "Harvested at ¾ fill for market; fully ripe cut for local sale same day",
    ],
    shopHref: "/shop/fruits",
  },
  {
    id: "plantain",
    name: "Plantain",
    category: "fruits",
    season: "Year-round",
    cycleWeeks: 60,
    yieldPerHa: "15–25 tonnes",
    icon: "🍌",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=1600",
    tagline: "A Nigerian dietary staple with strong demand and easy integration.",
    description:
      "Plantain is culturally irreplaceable in Nigerian cuisine — boiled, fried, roasted, or processed into chips. We grow French Clair and False Horn types alongside banana blocks, sharing irrigation infrastructure and inputs. Unripe plantains supply our food processing unit for plantain flour and chips; ripe bunches go directly to wholesale and retail buyers.",
    growingNotes: [
      "Sword suckers planted at 3 × 3 m spacing in well-drained positions",
      "Wind-proofing stakes essential in exposed Nasarawa terrain",
      "Single round of NPK + organic mulch application after 6 weeks",
      "One sucker retained per mat for ratoon — all others removed",
      "Harvested green for processing at ¾ finger fill; yellow for retail",
    ],
    shopHref: "/shop/fruits",
  },
  {
    id: "mulberry",
    name: "Mulberries",
    category: "fruits",
    season: "March – June (primary); October – December (secondary)",
    cycleWeeks: 10,
    yieldPerHa: "8–12 tonnes",
    icon: "🍇",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1600",
    tagline: "Antioxidant-rich superfruit supporting our silkworm and processing units.",
    description:
      "Mulberries are among our most versatile crops. Morus alba and Morus nigra trees serve double duty — the fruit supplies our fresh and processing channels, while surplus leaves feed our experimental silkworm unit. Mulberry is also among the first perennials we introduced as part of our agroforestry system, providing shade, windbreak and organic matter contribution alongside food.",
    growingNotes: [
      "Propagated from hardwood cuttings; first significant fruit year 2–3",
      "Planted at 3 × 2 m in rows with wind-shelter orientation",
      "Minimal fertiliser requirement; benefits from composted livestock manure",
      "Fruit harvested daily by hand or spread-sheet collection during peak flush",
      "Processed within 24 hours of harvest due to high perishability",
    ],
    shopHref: "/shop/fruits",
  },
];

// ─── Process steps ─────────────────────────────────────────────────────────────

export const CROP_PROCESS = [
  {
    phase: "01",
    title: "Soil Health & Land Preparation",
    description:
      "Every growing cycle starts with a soil audit. We test pH, macro- and micro-nutrient levels, organic matter and microbial load. Results guide our amendment plan — lime, composted livestock manure, green manure cover crops — before a single seed goes in the ground.",
    icon: Sprout,
    duration: "2–3 weeks",
  },
  {
    phase: "02",
    title: "Seed & Planting Material Selection",
    description:
      "We source certified, improved varieties of each crop — selected for yield performance, disease resistance and adaptability to Nasarawa's climate. Field crops use certified seed; fruit trees and banana are supplied as tissue-culture or certified grafted stock from accredited nurseries.",
    icon: Sun,
    duration: "1 week",
  },
  {
    phase: "03",
    title: "Precision Planting",
    description:
      "Spacing, depth and orientation are planned per crop. Vegetables go into nursery trays first; field crops are direct-seeded with our mechanical planter. GPS waypoints ensure straight rows for mechanised operations at harvest. Plastic mulch is laid on vegetable beds at planting.",
    icon: Cpu,
    duration: "3–5 days",
  },
  {
    phase: "04",
    title: "Irrigation & Fertigation",
    description:
      "Our drip irrigation network covers all vegetable and fruit blocks. Soil moisture sensors report in real time; automated valves trigger irrigation cycles precisely when the crop needs water. Soluble fertilisers are injected through the same lines, delivering nutrients directly to the root zone.",
    icon: Droplets,
    duration: "Ongoing",
  },
  {
    phase: "05",
    title: "Crop Monitoring & Pest Management",
    description:
      "Field staff scout every block weekly. We follow IPM principles — beneficial insects first, then targeted bio-pesticide application, with synthetic options as a last resort. Drone imaging provides canopy-level NDVI readings to catch stress before it becomes visible to the eye.",
    icon: BarChart3,
    duration: "Weekly",
  },
  {
    phase: "06",
    title: "Harvest, Grading & Dispatch",
    description:
      "Harvest timing is crop-specific and data-confirmed — brix metres for fruit, visual-plus-weight checks for vegetables. Post-harvest, produce is sorted, graded and packed in our on-farm packhouse. Cold-chain vehicles move fresh produce to customers within 24 hours of harvest.",
    icon: Package,
    duration: "1–3 days",
  },
];

// ─── Technology ────────────────────────────────────────────────────────────────

export const CROP_TECHNOLOGY = [
  {
    title: "Drip Irrigation & Fertigation",
    description:
      "Every vegetable and fruit block is served by a zoned drip network. Soil moisture sensors inform automated valve scheduling — water runs only when the root zone needs it. Soluble fertilisers are injected through the same lines for root-zone precision feeding.",
    icon: Droplets,
    metrics: "60% water reduction vs flood irrigation",
  },
  {
    title: "Drone Canopy Imaging",
    description:
      "Bi-weekly multispectral drone flights generate NDVI maps of every crop block. Stress zones invisible to the human eye are flagged and investigated within 24 hours — catching pest, disease or nutrient deficiency before they escalate.",
    icon: Cloud,
    metrics: "Early detection rate 92%",
  },
  {
    title: "IoT Soil Sensor Network",
    description:
      "Over 200 soil sensors log moisture, temperature and EC across the farm every 15 minutes. Data streams to our dashboard, where threshold alerts trigger irrigation or prompt field inspection — no manual guesswork.",
    icon: Zap,
    metrics: "200+ sensors across 56 ha",
  },
  {
    title: "Mechanised Field Operations",
    description:
      "Tractor-mounted ridgers, planters and herbicide booms handle land preparation, seeding and weed control on field crops, reducing labour time by over 60% compared to manual-only operations and ensuring consistent spacing for uniform yield.",
    icon: Cpu,
    metrics: "60% labour time reduction",
  },
];

// ─── Features ─────────────────────────────────────────────────────────────────

export const CROP_FEATURES = [
  {
    icon: Leaf,
    title: "Integrated Farming Cycle",
    description:
      "Crop residues feed livestock; manure composts back into vegetable beds. Nothing leaves the system as waste.",
  },
  {
    icon: TrendingUp,
    title: "Data-Guided Decisions",
    description:
      "Planting dates, harvest windows and input rates are all informed by real sensor data and seasonal models.",
  },
  {
    icon: Droplets,
    title: "Water-Responsible Production",
    description:
      "Drip irrigation, mulching and cover crops cut water consumption by over half compared to conventional practice.",
  },
  {
    icon: Award,
    title: "Graded Quality Output",
    description:
      "Every batch passes a packhouse quality check before dispatch — size, colour, brix and freshness all verified.",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────

export const CROP_BENEFITS = [
  "Fresh produce harvested and dispatched to customers within 24 hours",
  "Improved hybrid and certified variety selection for superior quality",
  "Integrated pest management — reduced synthetic chemical input",
  "Year-round supply across multiple crops in staggered rotation",
  "Full traceability — every batch tied to a field block, date and variety",
  "Cold-chain logistics preserving maximum freshness in transit",
  "Wholesale bulk pricing for food businesses and institutional buyers",
  "Supporting local food security through consistent, reliable supply",
];

// ─── Stats ────────────────────────────────────────────────────────────────────

export const CROP_STATS = [
  { value: "10", label: "Crop Varieties", description: "Grains, vegetables and fruits in active production" },
  { value: "56+", label: "Hectares Under Cultivation", description: "Across integrated crop and fruit blocks" },
  { value: "24 hrs", label: "Farm to Delivery", description: "Fresh produce cold-chained from harvest to door" },
  { value: "60%", label: "Water Savings", description: "Drip irrigation vs conventional flood methods" },
];
