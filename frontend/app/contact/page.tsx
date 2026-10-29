"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const BRAND = "#2d5f3f";
const DARK  = "#080f0a";

const TOPICS = [
  "General Enquiry",
  "Partnership Opportunity",
  "Wholesale / Distribution",
  "Investor Relations",
  "Farm Visits",
  "Kuyash Academy",
  "Other",
];

const SOCIALS = [
  {
    label: "Facebook",
    d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "Instagram",
    d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "YouTube",
    d: "M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z",
  },
  {
    label: "X",
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1500);
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen" style={{ backgroundColor: "#f0f2ee" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[44%_1fr] lg:gap-16 items-start">

            {/* ── LEFT: copy + contact details ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {/* Eyebrow */}
              <p className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em]" style={{ color: BRAND }}>
                Contact Us
              </p>

              {/* Heading */}
              <h1 className="mb-5 font-serif text-5xl font-bold leading-tight text-[#0a1a0f] md:text-6xl">
                We&apos;d Love to<br />Hear From You
              </h1>

              {/* Body */}
              <p className="mb-10 font-sans text-[15px] leading-relaxed text-gray-500 max-w-sm">
                Whether you have a question, want to partner with us, or just want to learn more about Kuyash Integrated Farms, we&apos;re here to help.
              </p>

              {/* Contact rows */}
              <div className="space-y-7">

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#e8f0ea" }}>
                    <Phone className="h-5 w-5" style={{ color: BRAND }} />
                  </div>
                  <div>
                    <p className="mb-1 font-sans text-[15px] font-semibold text-[#0a1a0f]">Phone</p>
                    <a href="tel:+2348031234567" className="block font-sans text-sm text-gray-500 hover:text-[#2d5f3f] transition-colors">+234 803 123 4567</a>
                    <a href="tel:+2349069876543" className="block font-sans text-sm text-gray-500 hover:text-[#2d5f3f] transition-colors">+234 906 987 6543</a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#e8f0ea" }}>
                    <Mail className="h-5 w-5" style={{ color: BRAND }} />
                  </div>
                  <div>
                    <p className="mb-1 font-sans text-[15px] font-semibold text-[#0a1a0f]">Email</p>
                    <a href="mailto:hello@kuyashfarms.com" className="block font-sans text-sm text-gray-500 hover:text-[#2d5f3f] transition-colors">hello@kuyashfarms.com</a>
                    <a href="mailto:info@kuyashfarms.com" className="block font-sans text-sm text-gray-500 hover:text-[#2d5f3f] transition-colors">info@kuyashfarms.com</a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#e8f0ea" }}>
                    <MapPin className="h-5 w-5" style={{ color: BRAND }} />
                  </div>
                  <div>
                    <p className="mb-1 font-sans text-[15px] font-semibold text-[#0a1a0f]">Address</p>
                    <p className="font-sans text-sm leading-relaxed text-gray-500">
                      No. 10 New Karshi Road,<br />
                      Opp. Setraco Yard, Zangye Village,<br />
                      Uke Karu, Nasarawa State, Nigeria.
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#e8f0ea" }}>
                    <Clock className="h-5 w-5" style={{ color: BRAND }} />
                  </div>
                  <div>
                    <p className="mb-1 font-sans text-[15px] font-semibold text-[#0a1a0f]">Business Hours</p>
                    <p className="font-sans text-sm text-gray-500">Mon – Sat: 8:00 AM – 6:00 PM</p>
                    <p className="font-sans text-sm text-gray-500">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Follow Us */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <p className="mb-4 font-sans text-[15px] font-semibold text-[#0a1a0f]">Follow Us</p>
                <div className="flex items-center gap-3">
                  {SOCIALS.map(({ label, d }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:opacity-70"
                      style={{ backgroundColor: DARK, color: "white" }}
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                        <path d={d} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT: form card ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            >
              <div
                className="rounded-2xl bg-white p-8 md:p-10"
                style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}
              >
                <AnimatePresence mode="wait">
                  {status === "sent" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="flex flex-col items-center py-12 text-center"
                    >
                      <CheckCircle2 className="mb-5 h-14 w-14" style={{ color: BRAND }} />
                      <h3 className="mb-2 font-serif text-2xl font-bold text-[#0a1a0f]">Message Sent!</h3>
                      <p className="mb-8 max-w-xs font-sans text-sm leading-relaxed text-gray-500">
                        Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                      </p>
                      <button
                        onClick={() => { setForm({ name: "", email: "", subject: "", message: "" }); setStatus("idle"); }}
                        className="font-sans text-sm font-semibold transition-colors hover:opacity-70"
                        style={{ color: BRAND }}
                      >
                        Send another message →
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Card heading */}
                      <p className="mb-1 font-sans text-xs font-bold uppercase tracking-[0.2em]" style={{ color: BRAND }}>
                        Send Us a Message
                      </p>
                      <h2 className="mb-1.5 font-serif text-3xl font-bold text-[#0a1a0f]">
                        Get In Touch
                      </h2>
                      <p className="mb-8 font-sans text-sm leading-relaxed text-gray-500">
                        Fill out the form below and we&apos;ll get back to you as soon as possible.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name + Email */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block font-sans text-sm font-medium text-[#0a1a0f]">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text" name="name" value={form.name}
                              onChange={handleChange} required placeholder="Your name"
                              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-sans text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#2d5f3f] focus:bg-white focus:ring-2 focus:ring-[#2d5f3f]/10"
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block font-sans text-sm font-medium text-[#0a1a0f]">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email" name="email" value={form.email}
                              onChange={handleChange} required placeholder="you@example.com"
                              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-sans text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#2d5f3f] focus:bg-white focus:ring-2 focus:ring-[#2d5f3f]/10"
                            />
                          </div>
                        </div>

                        {/* Subject */}
                        <div>
                          <label className="mb-1.5 block font-sans text-sm font-medium text-[#0a1a0f]">
                            Subject <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <select
                              name="subject" value={form.subject}
                              onChange={handleChange} required
                              className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-sans text-sm outline-none transition focus:border-[#2d5f3f] focus:bg-white focus:ring-2 focus:ring-[#2d5f3f]/10"
                              style={{ color: form.subject ? "#111827" : "#9ca3af" }}
                            >
                              <option value="" disabled>Select a topic</option>
                              {TOPICS.map(t => <option key={t} value={t} style={{ color: "#111827" }}>{t}</option>)}
                            </select>
                            {/* chevron */}
                            <svg className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                            </svg>
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label className="mb-1.5 block font-sans text-sm font-medium text-[#0a1a0f]">
                            Message <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            name="message" value={form.message}
                            onChange={handleChange} required rows={6}
                            placeholder="How can we help you?"
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-sans text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#2d5f3f] focus:bg-white focus:ring-2 focus:ring-[#2d5f3f]/10 resize-none"
                          />
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={status === "sending"}
                          className="flex w-full items-center justify-center gap-2 rounded-xl py-4 font-sans text-[15px] font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-60"
                          style={{ backgroundColor: BRAND }}
                        >
                          {status === "sending" ? (
                            <>
                              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              Sending…
                            </>
                          ) : (
                            <>
                              Send Message
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
