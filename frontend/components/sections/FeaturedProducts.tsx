"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBasket } from "lucide-react";
import { ease as EASE } from "@/lib/tokens";
import { Container } from "@/components/ui";

const PRODUCTS = [
  {
    name: "Fresh Eggs",
    category: "Poultry",
    unit: "Per dozen",
    price: "₦9,500",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?q=80&w=800",
    href: "/shop/poultry",
    badge: "Best Seller",
  },
  {
    name: "Groundnut Oil",
    category: "Processing",
    unit: "Per litre",
    price: "₦4,200",
    image: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?q=80&w=800",
    href: "/shop/all",
    badge: "Pure & Natural",
  },
  {
    name: "Fresh Tilapia",
    category: "Aquaculture",
    unit: "Per kg",
    price: "₦17,000",
    image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?q=80&w=800",
    href: "/shop/fishery",
    badge: "Farm Raised",
  },
  {
    name: "Organic Tomatoes",
    category: "Crop Production",
    unit: "Per kg",
    price: "₦7,500",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800",
    href: "/shop/vegetables",
    badge: "Freshly Harvested",
  },
];

export function FeaturedProducts() {
  return (
    <section className="bg-white py-20 overflow-hidden">
      <Container>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand mb-3">
              From Our Farm
            </p>
            <h2
              className="font-serif font-bold text-dark leading-[1.08]"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
            >
              Fresh from the farm.<br />Delivered to your door.
            </h2>
            <p className="mt-3 font-sans text-sm text-gray-500 max-w-sm leading-relaxed">
              Everything we sell comes directly from our land — no middlemen, no compromise on quality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 border border-brand-border text-brand font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 shrink-0"
            >
              Shop All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            >
              <Link
                href={product.href}
                className="group flex flex-col bg-cream border border-border hover:border-brand-border hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 h-full"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Badge */}
                  <span className="absolute top-3 left-3 text-[9px] font-mono uppercase tracking-[0.18em] bg-dark/70 backdrop-blur-sm text-gold px-2.5 py-1 rounded-full">
                    {product.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-serif font-bold text-dark text-base leading-snug mb-3 group-hover:text-brand transition-colors duration-200">
                    {product.name}
                  </h3>

                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
                    <div>
                      <p className="font-serif font-bold text-dark text-lg leading-none">
                        {product.price}
                      </p>
                      <p className="text-[10px] text-gray-400 font-sans mt-0.5">{product.unit}</p>
                    </div>
                    <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all duration-300">
                      <ShoppingBasket className="w-4 h-4 text-brand group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
}
