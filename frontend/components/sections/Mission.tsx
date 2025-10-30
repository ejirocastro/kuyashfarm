import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import Image from "next/image";

/**
 * Mission Section - Two-column layout with text and image
 */
export function Mission() {
  return (
    <Section id="about" className="bg-[#faf8f5]">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold leading-tight text-[#2d5f3f] md:text-4xl lg:text-5xl">
              Our mission began with a seed
            </h2>
            <div className="space-y-4 font-sans text-base leading-relaxed text-gray-700 md:text-lg">
              <p>
                To cultivate a future where land is for nurtured, farmers are
                empowered, and nature thrives in harmony. We support rural
                communities to build sustainable agricultural practices.
              </p>
              <p>
                We believe agriculture is more than just a vocation—it's a way
                of life. Through innovative solutions and deep commitment to
                sustainability, we're helping to shape the future of farming for
                generations to come.
              </p>
              <p className="italic text-gray-600">
                "Our approach combines traditional farming wisdom with modern
                technology to create resilient farming systems that benefit both
                people and the planet."
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[400px] overflow-hidden rounded-lg shadow-xl lg:h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2070"
              alt="Agricultural landscape"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
