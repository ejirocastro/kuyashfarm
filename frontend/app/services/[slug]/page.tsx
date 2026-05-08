"use client";

import { use, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SERVICES } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
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
  ArrowRight,
  PlayCircle
} from "lucide-react";
import { notFound } from "next/navigation";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Service content data
const serviceContent: Record<string, {
  heroImage: string;
  heroVideo?: string;
  overview: string;
  features: Array<{ icon: any; title: string; description: string }>;
  benefits: string[];
  stats: Array<{ value: string; label: string; description?: string }>;
  gallery: string[];
  farmingProcess?: Array<{
    phase: string;
    title: string;
    description: string;
    icon: any;
    duration: string;
  }>;
  technology?: Array<{
    title: string;
    description: string;
    icon: any;
    metrics?: string;
  }>;
  beforeAfter?: {
    before: string;
    after: string;
    title: string;
    description: string;
  };
}> = {
  "crop-vegetable-production": {
    heroImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070",
    heroVideo: "/videos/farm-hero.mp4", // Add your video file to public/videos/
    overview: "At Kuyash Integrated Farm, we combine traditional agricultural wisdom with cutting-edge technology to grow premium-quality crops and fresh vegetables. Our commitment to sustainable innovation ensures superior produce while protecting the environment for future generations.",
    farmingProcess: [
      {
        phase: "01",
        title: "Soil Preparation & Analysis",
        description: "Advanced soil testing and organic enrichment to create the optimal growing environment. Our lab analyzes nutrient levels, pH balance, and microbial health.",
        icon: Sprout,
        duration: "2-3 weeks"
      },
      {
        phase: "02",
        title: "Smart Seeding",
        description: "Precision planting using GPS-guided systems and carefully selected organic seeds. Each crop is positioned for maximum sunlight exposure and growth potential.",
        icon: Sun,
        duration: "1 week"
      },
      {
        phase: "03",
        title: "Intelligent Irrigation",
        description: "IoT-enabled drip irrigation systems monitor soil moisture in real-time, delivering precise water amounts only when needed, reducing water usage by 60%.",
        icon: Droplets,
        duration: "Ongoing"
      },
      {
        phase: "04",
        title: "Growth Monitoring",
        description: "Daily monitoring using drone technology and AI-powered analytics to detect early signs of stress, disease, or nutrient deficiency.",
        icon: BarChart3,
        duration: "8-12 weeks"
      },
      {
        phase: "05",
        title: "Harvest & Quality Control",
        description: "Peak-ripeness harvesting with immediate quality checks. Every batch is tested for freshness, nutrition content, and organic certification compliance.",
        icon: Package,
        duration: "1-2 weeks"
      }
    ],
    technology: [
      {
        title: "Precision Agriculture",
        description: "GPS-guided tractors and automated systems ensure consistent planting depth, spacing, and seed placement for optimal crop uniformity.",
        icon: Cpu,
        metrics: "99.8% planting accuracy"
      },
      {
        title: "Climate Control Systems",
        description: "Real-time weather monitoring and predictive analytics help us make data-driven decisions about irrigation, harvesting, and crop protection.",
        icon: Cloud,
        metrics: "30% yield increase"
      },
      {
        title: "Smart Sensors Network",
        description: "Over 500 IoT sensors across our farms continuously monitor soil moisture, temperature, humidity, and nutrient levels.",
        icon: Zap,
        metrics: "60% water savings"
      },
      {
        title: "Drone Surveillance",
        description: "Weekly aerial imaging using multispectral cameras to detect crop health issues invisible to the human eye before they become problems.",
        icon: BarChart3,
        metrics: "Early detection 95%"
      }
    ],
    features: [
      {
        icon: Leaf,
        title: "100% Organic Certified",
        description: "Internationally certified organic farming practices with zero synthetic pesticides or chemical fertilizers.",
      },
      {
        icon: TrendingUp,
        title: "Data-Driven Farming",
        description: "AI-powered analytics optimize every aspect of crop production from seed selection to harvest timing.",
      },
      {
        icon: Droplets,
        title: "Water Conservation",
        description: "Advanced irrigation technology reduces water consumption by 60% while improving crop yield and quality.",
      },
      {
        icon: Award,
        title: "Quality Assurance",
        description: "Multi-stage quality control process ensures only premium-grade produce reaches your table.",
      },
    ],
    benefits: [
      "Certified organic produce free from harmful chemicals",
      "Maximum nutritional value through optimal harvest timing",
      "Consistent quality through advanced monitoring systems",
      "Sustainable practices that regenerate soil health",
      "Complete traceability from seed to harvest",
      "Year-round supply with seasonal variety rotation",
      "Premium freshness with farm-to-table in 24 hours",
      "Support for innovation in sustainable agriculture",
    ],
    stats: [
      {
        value: "500+",
        label: "Hectares Under Cultivation",
        description: "Across 3 climate-controlled zones"
      },
      {
        value: "50+",
        label: "Premium Crop Varieties",
        description: "Seasonally rotated selection"
      },
      {
        value: "100%",
        label: "Organic Certified",
        description: "International standards compliance"
      },
      {
        value: "60%",
        label: "Water Savings",
        description: "Through smart irrigation"
      },
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070",
      after: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070",
      title: "Sustainable Transformation",
      description: "See how our innovative farming practices transformed conventional farmland into a thriving organic ecosystem in just 18 months."
    },
    gallery: [
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070",
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=2069",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070",
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070",
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2070",
    ],
  },
};

// Before/After Comparison Slider Component
function BeforeAfterSlider({
  before,
  after,
  title,
  description,
}: {
  before: string;
  after: string;
  title: string;
  description: string;
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h3 className="mb-4 font-serif text-3xl font-bold text-[#2d5f3f] md:text-4xl">
          {title}
        </h3>
        <p className="font-sans text-lg text-gray-600">{description}</p>
      </div>

      <div
        className="relative aspect-video w-full cursor-col-resize overflow-hidden rounded-2xl shadow-2xl"
        onMouseMove={handleMouseMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* After Image */}
        <div className="absolute inset-0">
          <Image src={after} alt="After" fill className="object-cover" />
          <div className="absolute bottom-4 right-4 rounded-full bg-white/90 px-4 py-2 font-sans text-sm font-semibold text-[#2d5f3f] backdrop-blur-sm">
            After
          </div>
        </div>

        {/* Before Image with Clip */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image src={before} alt="Before" fill className="object-cover" />
          <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 font-sans text-sm font-semibold text-gray-700 backdrop-blur-sm">
            Before
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-[#2d5f3f] shadow-xl">
            <div className="flex h-full items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicePage({ params }: ServicePageProps) {
  const { slug } = use(params);
  const [showVideo, setShowVideo] = useState(false);

  // Find the service by slug
  const service = SERVICES.find((s) => s.slug === slug);

  // Get service content
  const content = serviceContent[slug];

  // If service doesn't exist, show 404
  if (!service || !content) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-20">
        {/* Hero Section with Video Background Option */}
        <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
          {showVideo && content.heroVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={content.heroVideo} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={content.heroImage}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <Link
              href="/#services"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-sans text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Link>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#6b9d7a]/20 px-4 py-2 backdrop-blur-sm">
              <Leaf className="h-4 w-4 text-[#6b9d7a]" />
              <span className="font-sans text-sm font-medium text-white">
                100% Organic Certified
              </span>
            </div>

            <h1 className="max-w-4xl font-serif text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              {service.title}
            </h1>

            <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-white/90 md:text-xl">
              {service.description}
            </p>

            {content.heroVideo && (
              <button
                onClick={() => setShowVideo(!showVideo)}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-sans text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <PlayCircle className="h-5 w-5" />
                {showVideo ? "View Photo" : "Watch Video"}
              </button>
            )}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center gap-2 text-white/60">
              <span className="font-sans text-xs uppercase tracking-wider">
                Scroll to Explore
              </span>
              <ArrowLeft className="h-5 w-5 rotate-[-90deg]" />
            </div>
          </div>
        </section>

        {/* Overview Section - Modern Layout */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <div className="mb-4 inline-block rounded-full bg-[#2d5f3f]/10 px-4 py-1">
                  <span className="font-sans text-sm font-semibold uppercase tracking-wide text-[#2d5f3f]">
                    Our Approach
                  </span>
                </div>
                <h2 className="mb-6 font-serif text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                  Sustainable Innovation Meets Traditional Wisdom
                </h2>
                <p className="mb-8 font-sans text-lg leading-relaxed text-gray-600">
                  {content.overview}
                </p>
                <Link
                  href="/shop/vegetables"
                  className="inline-flex items-center gap-2 rounded-full bg-[#2d5f3f] px-8 py-4 font-sans text-base font-semibold text-white transition-all hover:bg-[#4a7c59] hover:gap-3"
                >
                  Browse Products
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#2d5f3f]/20 to-[#6b9d7a]/20 blur-2xl" />
                <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src={content.heroImage}
                    alt="Farm overview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Stats Section */}
        <section className="bg-gradient-to-br from-[#2d5f3f] to-[#4a7c59] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-3xl font-bold text-white md:text-4xl">
                Impact by the Numbers
              </h2>
              <p className="font-sans text-lg text-white/80">
                Measurable results from our innovative farming practices
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {content.stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  <div className="mb-3 font-serif text-5xl font-bold text-white md:text-6xl">
                    {stat.value}
                  </div>
                  <div className="mb-2 font-sans text-base font-semibold text-white">
                    {stat.label}
                  </div>
                  {stat.description && (
                    <div className="font-sans text-sm text-white/70">
                      {stat.description}
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Farming Process Journey Section */}
        {content.farmingProcess && (
          <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-16 text-center">
                <div className="mb-4 inline-block rounded-full bg-[#6b9d7a]/10 px-4 py-1">
                  <span className="font-sans text-sm font-semibold uppercase tracking-wide text-[#2d5f3f]">
                    Seed to Harvest
                  </span>
                </div>
                <h2 className="mb-6 font-serif text-4xl font-bold text-gray-900 md:text-5xl">
                  Our Farming Process
                </h2>
                <p className="mx-auto max-w-2xl font-sans text-lg text-gray-600">
                  A meticulous journey from soil preparation to harvest,
                  combining innovation with sustainable practices
                </p>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-[#2d5f3f] via-[#6b9d7a] to-[#2d5f3f] md:left-1/2" />

                <div className="space-y-12">
                  {content.farmingProcess.map((phase, index) => {
                    const Icon = phase.icon;
                    const isEven = index % 2 === 0;

                    return (
                      <div
                        key={index}
                        className={`relative flex flex-col md:flex-row ${
                          isEven ? "md:flex-row" : "md:flex-row-reverse"
                        } items-center gap-8`}
                      >
                        {/* Content Card */}
                        <div
                          className={`w-full md:w-5/12 ${
                            isEven ? "md:text-right" : "md:text-left"
                          }`}
                        >
                          <div className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:border-[#6b9d7a] hover:shadow-xl">
                            <div
                              className={`mb-4 flex items-center gap-3 ${
                                isEven
                                  ? "md:flex-row-reverse md:justify-start"
                                  : "md:justify-start"
                              }`}
                            >
                              <span className="font-serif text-5xl font-bold text-[#2d5f3f]/20">
                                {phase.phase}
                              </span>
                              <div className="h-px flex-1 bg-gradient-to-r from-[#2d5f3f]/20 to-transparent" />
                            </div>
                            <h3 className="mb-3 font-serif text-2xl font-bold text-gray-900">
                              {phase.title}
                            </h3>
                            <p className="mb-4 font-sans text-base leading-relaxed text-gray-600">
                              {phase.description}
                            </p>
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#f5f5f5] px-4 py-2">
                              <span className="font-sans text-sm font-medium text-gray-700">
                                Duration: {phase.duration}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Center Icon */}
                        <div className="absolute left-8 md:left-1/2 z-10 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-[#2d5f3f] to-[#6b9d7a] shadow-xl">
                          <Icon className="h-7 w-7 text-white" />
                        </div>

                        {/* Spacer for even layout */}
                        <div className="hidden w-5/12 md:block" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Technology & Innovation Section */}
        {content.technology && (
          <section className="bg-[#faf8f5] py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-16 text-center">
                <div className="mb-4 inline-block rounded-full bg-[#2d5f3f]/10 px-4 py-1">
                  <span className="font-sans text-sm font-semibold uppercase tracking-wide text-[#2d5f3f]">
                    Innovation
                  </span>
                </div>
                <h2 className="mb-6 font-serif text-4xl font-bold text-gray-900 md:text-5xl">
                  Technology Driving Excellence
                </h2>
                <p className="mx-auto max-w-2xl font-sans text-lg text-gray-600">
                  Advanced agricultural technology that maximizes efficiency
                  while maintaining sustainability
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {content.technology.map((tech, index) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:border-[#6b9d7a] hover:shadow-2xl"
                    >
                      <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-[#2d5f3f]/10 to-[#6b9d7a]/10 blur-3xl transition-all group-hover:scale-150" />

                      <div className="relative">
                        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2d5f3f] to-[#6b9d7a] text-white shadow-lg">
                          <Icon className="h-8 w-8" />
                        </div>

                        <h3 className="mb-4 font-serif text-2xl font-bold text-gray-900">
                          {tech.title}
                        </h3>

                        <p className="mb-6 font-sans text-base leading-relaxed text-gray-600">
                          {tech.description}
                        </p>

                        {tech.metrics && (
                          <div className="inline-flex items-center gap-2 rounded-full bg-[#2d5f3f]/10 px-4 py-2">
                            <TrendingUp className="h-4 w-4 text-[#2d5f3f]" />
                            <span className="font-sans text-sm font-semibold text-[#2d5f3f]">
                              {tech.metrics}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Before/After Comparison Section */}
        {content.beforeAfter && (
          <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <BeforeAfterSlider {...content.beforeAfter} />
            </div>
          </section>
        )}

        {/* Features Section - Modern Grid */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-6 font-serif text-4xl font-bold text-gray-900 md:text-5xl">
                Why Choose Kuyash
              </h2>
              <p className="mx-auto max-w-2xl font-sans text-lg text-gray-600">
                Our commitment to excellence sets us apart in the agricultural
                industry
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {content.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-[#6b9d7a] hover:shadow-xl"
                  >
                    <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-[#2d5f3f]/5 to-[#6b9d7a]/5 blur-2xl transition-all group-hover:scale-150" />

                    <div className="relative">
                      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#2d5f3f]/10 text-[#2d5f3f] transition-all group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#2d5f3f] group-hover:to-[#6b9d7a] group-hover:text-white">
                        <Icon className="h-7 w-7" />
                      </div>

                      <h3 className="mb-3 font-serif text-xl font-bold text-gray-900">
                        {feature.title}
                      </h3>

                      <p className="font-sans text-sm leading-relaxed text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section - Two Column Layout */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#6b9d7a]/20 to-[#2d5f3f]/20 blur-2xl" />
                <div className="relative grid gap-4 sm:grid-cols-2">
                  {content.gallery.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square overflow-hidden rounded-2xl shadow-lg"
                    >
                      <Image
                        src={image}
                        alt={`Benefit ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-4 inline-block rounded-full bg-[#6b9d7a]/10 px-4 py-1">
                  <span className="font-sans text-sm font-semibold uppercase tracking-wide text-[#2d5f3f]">
                    Benefits
                  </span>
                </div>
                <h2 className="mb-8 font-serif text-4xl font-bold text-gray-900 md:text-5xl">
                  What You Get
                </h2>

                <div className="space-y-4">
                  {content.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 rounded-xl border border-gray-100 bg-[#faf8f5] p-4 transition-all hover:border-[#6b9d7a] hover:shadow-md"
                    >
                      <div className="shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-[#6b9d7a]" />
                      </div>
                      <p className="font-sans text-base leading-relaxed text-gray-700">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section - Modern Masonry Grid */}
        <section className="bg-[#f5f5f5] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-6 font-serif text-4xl font-bold text-gray-900 md:text-5xl">
                See Our Farm in Action
              </h2>
              <p className="mx-auto max-w-2xl font-sans text-lg text-gray-600">
                A visual journey through our sustainable farming operations
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {content.gallery.map((image, index) => {
                const isLarge = index % 3 === 0;
                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-2xl ${
                      isLarge ? "sm:col-span-2 sm:row-span-2" : "aspect-square"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#2d5f3f] via-[#4a7c59] to-[#2d5f3f] py-24">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Leaf className="h-4 w-4 text-white" />
              <span className="font-sans text-sm font-medium text-white">
                Fresh from Our Farm
              </span>
            </div>

            <h2 className="mb-6 font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
              Experience Premium Organic Produce
            </h2>

            <p className="mb-10 font-sans text-lg leading-relaxed text-white/90">
              Browse our selection of fresh, sustainably-grown vegetables and
              crops. Farm-to-table delivery within 24 hours.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/shop/vegetables"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-sans text-base font-semibold text-[#2d5f3f] shadow-xl transition-all hover:scale-105 hover:gap-3 hover:shadow-2xl"
              >
                Shop Now
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/#services"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/10 px-8 py-4 font-sans text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
