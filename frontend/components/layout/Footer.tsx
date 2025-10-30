import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";

/**
 * Footer Component - Dark footer with organized columns
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 font-serif text-3xl font-bold">
              {SITE_CONFIG.name}
            </h3>
            <p className="mb-6 max-w-sm font-sans text-sm leading-relaxed text-gray-400">
              {SITE_CONFIG.description}
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {[
                { name: "Facebook", icon: "M" },
                { name: "Twitter", icon: "T" },
                { name: "Instagram", icon: "I" },
                { name: "LinkedIn", icon: "L" },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-serif text-sm transition-all duration-300 hover:bg-[#6b9d7a] hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="mb-4 font-serif text-lg font-semibold">Product</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-gray-400 transition-colors duration-300 hover:text-[#6b9d7a]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-4 font-serif text-lg font-semibold">Company</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-gray-400 transition-colors duration-300 hover:text-[#6b9d7a]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="mb-4 font-serif text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-gray-400 transition-colors duration-300 hover:text-[#6b9d7a]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Innovations Links */}
          <div>
            <h4 className="mb-4 font-serif text-lg font-semibold">
              Innovations
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.innovations.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-gray-400 transition-colors duration-300 hover:text-[#6b9d7a]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="font-sans text-sm text-gray-400">
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="font-sans text-sm text-gray-400 transition-colors hover:text-[#6b9d7a]"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="font-sans text-sm text-gray-400 transition-colors hover:text-[#6b9d7a]"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="font-sans text-sm text-gray-400 transition-colors hover:text-[#6b9d7a]"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
