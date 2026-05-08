import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kuyash Farm Academy - Learn Modern Farming",
  description: "Hands-on agricultural training from expert farmers. Join our physical classes and master sustainable farming techniques.",
};

const UPCOMING_CLASSES = [
  {
    id: 1,
    title: "Soil Health & Crop Production",
    description: "Master the fundamentals of soil science, composting, and growing high-yield vegetables using organic methods.",
    date: "April 19, 2026",
    time: "9:00 AM – 3:00 PM",
    duration: "1 Day",
    location: "Kuyash Farm, Lagos",
    price: 25000,
    seats: 20,
    seatsLeft: 8,
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070",
    topics: ["Soil testing", "Composting", "Crop rotation", "Pest management"],
    level: "Beginner",
  },
  {
    id: 2,
    title: "Livestock & Poultry Management",
    description: "Learn animal husbandry practices, feeding schedules, disease prevention, and profitable poultry farming.",
    date: "May 3, 2026",
    time: "8:00 AM – 4:00 PM",
    duration: "1 Day",
    location: "Kuyash Farm, Lagos",
    price: 30000,
    seats: 15,
    seatsLeft: 5,
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=2087",
    topics: ["Animal nutrition", "Disease prevention", "Housing design", "Profit planning"],
    level: "Intermediate",
  },
  {
    id: 3,
    title: "Fish Farming (Aquaculture)",
    description: "From pond setup to harvest — learn catfish and tilapia farming using modern aquaculture techniques.",
    date: "May 17, 2026",
    time: "9:00 AM – 3:00 PM",
    duration: "1 Day",
    location: "Kuyash Farm, Lagos",
    price: 28000,
    seats: 18,
    seatsLeft: 12,
    image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=2070",
    topics: ["Pond construction", "Water quality", "Fish nutrition", "Harvesting & sales"],
    level: "Beginner",
  },
  {
    id: 4,
    title: "Agribusiness & Farm Finance",
    description: "Turn your farm into a profitable business. Learn bookkeeping, grant applications, market access, and pricing.",
    date: "June 7, 2026",
    time: "10:00 AM – 2:00 PM",
    duration: "1 Day",
    location: "Kuyash Farm, Lagos",
    price: 20000,
    seats: 25,
    seatsLeft: 18,
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=2074",
    topics: ["Farm budgeting", "Record keeping", "Grant access", "Market strategies"],
    level: "All Levels",
  },
];

const WHY_JOIN = [
  {
    icon: "🌱",
    title: "Hands-On Training",
    description: "All classes are conducted on our working farm. You learn by doing, not just listening.",
  },
  {
    icon: "👨‍🌾",
    title: "Expert Instructors",
    description: "Learn directly from experienced farmers and agricultural specialists with 10+ years in the field.",
  },
  {
    icon: "📜",
    title: "Certificate of Completion",
    description: "Receive a recognised certificate after every class to boost your credibility and career.",
  },
  {
    icon: "🤝",
    title: "Farmer Network",
    description: "Connect with other farmers and entrepreneurs. Our alumni community is a lifelong resource.",
  },
  {
    icon: "💡",
    title: "Practical Knowledge",
    description: "No fluff. Every session covers real-world challenges you will face on your farm.",
  },
  {
    icon: "📈",
    title: "Business Focus",
    description: "We don't just teach farming — we teach profitable farming. Learn how to grow your income.",
  },
];

const TESTIMONIALS = [
  {
    name: "Adaeze Okonkwo",
    role: "Poultry Farmer, Ogun State",
    quote: "After attending the poultry class, I restructured my feeding system and cut costs by 30%. The instructors were incredibly practical.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200",
  },
  {
    name: "Emeka Nwachukwu",
    role: "Crop Farmer, Anambra",
    quote: "The soil health class changed how I see farming entirely. My tomato yield doubled in the next season.",
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=200",
  },
  {
    name: "Fatima Bello",
    role: "Fish Farmer, Abuja",
    quote: "I came with zero aquaculture knowledge and left confident enough to start my own pond farm. Highly recommended.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200",
  },
];

const LEVEL_COLORS: Record<string, string> = {
  "Beginner": "bg-green-100 text-green-800",
  "Intermediate": "bg-amber-100 text-amber-800",
  "All Levels": "bg-blue-100 text-blue-800",
};

export default function AcademyPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#1a3d2b] items-start">
          {/* Background image — lighter opacity so it reads better */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070"
              alt="Farmers at Kuyash Academy"
              fill
              priority
              className="object-cover object-center opacity-50"
            />
            {/* lighter bottom fade, less heavy top overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a3d2b] via-[#1a3d2b]/40 to-[#1a3d2b]/20" />
          </div>

          {/* Floating badge top-right — pushed down enough to clear the navbar */}
          <div className="absolute top-24 right-8 md:top-28 md:right-16 z-10 hidden md:block">
            <div className="border border-[#e8d5a3]/70 rounded-lg px-5 py-4 max-w-[220px] backdrop-blur-sm bg-[#1a3d2b]/20">
              <p className="text-[#e8d5a3] font-serif text-lg leading-snug italic">
                &ldquo;It&apos;s time to rethink agriculture.&rdquo;
              </p>
            </div>
          </div>

          {/* Hero content */}
          <div className="relative z-10 w-full pt-32 md:pt-36 flex-1 flex flex-col justify-end pb-16 md:pb-24">
            <Container>
              {/* Two-column: left has all content, right is empty (background shows through) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="flex flex-col items-start text-left">
                  <h1 className="font-serif font-bold text-white leading-[0.9] text-[clamp(3rem,7vw,6rem)]">
                    Learn The<br />
                    Art of<br />
                    <span className="text-[#e8d5a3]">Farming.</span>
                  </h1>
                  <p className="mt-8 font-sans text-lg text-white/70 leading-relaxed">
                    Hands-on agricultural training from Nigeria&apos;s leading farm practitioners.
                    Join a class and transform the way you grow.
                  </p>

                  {/* CTAs */}
                  <div className="mt-10 flex flex-wrap gap-4">
                    <a
                      href="#classes"
                      className="inline-flex items-center gap-2 bg-[#e8d5a3] text-[#1a3d2b] font-semibold px-8 py-4 rounded-full hover:bg-[#dfc98a] transition-colors duration-200"
                    >
                      View Upcoming Classes
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>
                    <a
                      href="#why-join"
                      className="inline-flex items-center gap-2 border-2 border-white/60 bg-transparent text-white font-semibold px-8 py-4 rounded-full hover:border-white hover:bg-white/10 transition-all duration-200"
                    >
                      Why Join
                    </a>
                  </div>

                  {/* Stats row */}
                  <div className="mt-14 pt-10 border-t border-white/10 w-full flex flex-wrap gap-10">
                    {[
                      { value: "500+", label: "Graduates" },
                      { value: "12+", label: "Courses" },
                      { value: "98%", label: "Satisfaction" },
                      { value: "10+", label: "Expert Instructors" },
                    ].map((s) => (
                      <div key={s.label}>
                        <p className="font-serif text-3xl font-bold text-[#e8d5a3]">{s.value}</p>
                        <p className="font-sans text-sm text-white/60 mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Right column intentionally empty — background image shows through */}
                <div />
              </div>
            </Container>
          </div>
        </section>

        {/* ── WHY JOIN ── */}
        <section id="why-join" className="bg-white py-24 md:py-32">
          <Container>
            <div className="mb-16 max-w-2xl">
              <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-3">
                Why Kuyash Academy
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3d2b] leading-tight">
                More than a class —<br />a career transformation.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {WHY_JOIN.map((item) => (
                <div
                  key={item.title}
                  className="group p-8 rounded-2xl border border-gray-100 hover:border-[#2d5f3f]/20 hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-4xl">{item.icon}</span>
                  <h3 className="font-serif text-xl font-bold text-[#1a3d2b] mt-4 mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── UPCOMING CLASSES ── */}
        <section id="classes" className="bg-[#f7f5f0] py-24 md:py-32">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-3">
                  Upcoming Classes
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1a3d2b]">
                  Find a class that fits<br className="hidden md:block" /> your goals.
                </h2>
              </div>
              <p className="font-sans text-sm text-gray-500 max-w-sm">
                All classes are held at our farm in Lagos. Seats are limited — register early to secure your spot.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {UPCOMING_CLASSES.map((cls) => (
                <div
                  key={cls.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={cls.image}
                      alt={cls.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {/* Level badge */}
                    <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${LEVEL_COLORS[cls.level]}`}>
                      {cls.level}
                    </span>
                    {/* Seats left */}
                    {cls.seatsLeft <= 8 && (
                      <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700">
                        {cls.seatsLeft} seats left
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-serif text-xl font-bold text-[#1a3d2b] mb-2">
                      {cls.title}
                    </h3>
                    <p className="font-sans text-sm text-gray-500 leading-relaxed mb-5">
                      {cls.description}
                    </p>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {cls.topics.map((topic) => (
                        <span
                          key={topic}
                          className="text-xs font-medium bg-[#eef5f1] text-[#2d5f3f] px-3 py-1 rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="mt-auto space-y-2 text-sm text-gray-500 border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#2d5f3f] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{cls.date} &bull; {cls.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#2d5f3f] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{cls.location}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-5">
                      <div>
                        <p className="font-serif text-2xl font-bold text-[#1a3d2b]">
                          ₦{cls.price.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">per person</p>
                      </div>
                      <Link
                        href={`/academy/classes/${cls.id}`}
                        className="inline-flex items-center gap-2 bg-[#2d5f3f] text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#1a3d2b] transition-colors duration-200"
                      >
                        Register
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── WHAT YOU LEARN banner ── */}
        <section className="bg-[#1a3d2b] py-24 md:py-32">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-[#a3c9a8] mb-4">
                  The Curriculum
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                  Everything you need<br />to farm profitably.
                </h2>
                <p className="font-sans text-white/60 leading-relaxed mb-10">
                  Our curriculum is built around real challenges Nigerian farmers face every day.
                  Each class blends theory with direct, hands-on practice on our working farm.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Soil preparation & fertility",
                    "Irrigation & water management",
                    "Organic pest control",
                    "Animal health & nutrition",
                    "Post-harvest handling",
                    "Farm record keeping",
                    "Agro-processing basics",
                    "Market access & pricing",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#e8d5a3]/20 flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-[#e8d5a3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-sans text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image stack */}
              <div className="relative h-[420px] hidden lg:block">
                <div className="absolute top-0 right-0 w-64 h-72 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=2069"
                    alt="Farm training"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#1a3d2b]">
                  <Image
                    src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070"
                    alt="Hands-on class"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Floating card */}
                <div className="absolute bottom-16 right-4 bg-white rounded-xl px-5 py-4 shadow-xl max-w-[180px]">
                  <p className="font-serif text-2xl font-bold text-[#1a3d2b]">500+</p>
                  <p className="font-sans text-xs text-gray-500 mt-1">Farmers trained since 2022</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="bg-white py-24 md:py-32">
          <Container>
            <div className="mb-16 text-center max-w-2xl mx-auto">
              <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-3">
                Testimonials
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1a3d2b]">
                Farmers who transformed their practice.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="bg-[#f7f5f0] rounded-2xl p-8 flex flex-col gap-6"
                >
                  <p className="font-serif text-lg text-[#1a3d2b] leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                      <Image src={t.image} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-sm text-[#1a3d2b]">{t.name}</p>
                      <p className="font-sans text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="bg-[#e8d5a3] py-24">
          <Container>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1a3d2b] leading-tight">
                  Ready to grow smarter?
                </h2>
                <p className="font-sans text-[#1a3d2b]/70 mt-3 max-w-md">
                  Seats fill fast. Register for an upcoming class today and start farming with confidence.
                </p>
              </div>
              <a
                href="#classes"
                className="shrink-0 inline-flex items-center gap-2 bg-[#1a3d2b] text-white font-semibold px-10 py-4 rounded-full hover:bg-[#2d5f3f] transition-colors duration-200 text-base"
              >
                Browse Classes
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </>
  );
}
