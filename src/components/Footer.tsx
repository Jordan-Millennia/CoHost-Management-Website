import Link from "next/link";
import Image from "next/image";

const SERVICE_LINKS = [
  { label: "Room-by-Room Leasing", href: "#services" },
  { label: "Member Screening", href: "#services" },
  { label: "Property Operations", href: "#services" },
  { label: "Revenue & Reporting", href: "#services" },
];

const COMPANY_LINKS = [
  { label: "About", href: "#why" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Markets", href: "#markets" },
  { label: "Owner Portal", href: "#portal" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="#" className="inline-flex items-center gap-3 mb-4">
              <Image
                src="/CoHost-Management-Website/logo.png"
                alt="CoHost Management"
                width={44}
                height={44}
                className="w-11 h-11 object-contain"
              />
              <span className="font-display text-[15px] font-bold text-text-0">
                <em className="not-italic text-teal">Co</em>Host Management
              </span>
            </Link>
            <p className="text-text-2 text-sm leading-relaxed max-w-xs">
              National done-for-you co-living property management. AI-powered operations for maximum returns per room.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-text-2 hover:text-teal hover:border-teal/30 transition-colors cursor-pointer">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-text-2 hover:text-teal hover:border-teal/30 transition-colors cursor-pointer">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-text-2 hover:text-teal hover:border-teal/30 transition-colors cursor-pointer">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" /></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="text-text-0 text-xs font-medium uppercase tracking-wider mb-4">Services</div>
            {SERVICE_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="block text-text-2 text-sm hover:text-text-1 transition-colors mb-2.5 cursor-pointer">
                {link.label}
              </a>
            ))}
          </div>

          {/* Company */}
          <div>
            <div className="text-text-0 text-xs font-medium uppercase tracking-wider mb-4">Company</div>
            {COMPANY_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="block text-text-2 text-sm hover:text-text-1 transition-colors mb-2.5 cursor-pointer">
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div className="text-text-0 text-xs font-medium uppercase tracking-wider mb-4">Contact</div>
            <a href="tel:+14072710754" className="block text-text-2 text-sm hover:text-text-1 transition-colors mb-2.5 cursor-pointer">
              (407) 271-0754
            </a>
            <a href="mailto:jordanrealtor21@gmail.com" className="block text-text-2 text-sm hover:text-text-1 transition-colors mb-2.5 cursor-pointer">
              jordanrealtor21@gmail.com
            </a>
            <a href="#contact" className="block text-teal text-sm hover:text-teal-dark transition-colors cursor-pointer">
              Get a Free Analysis
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/[0.06] gap-4">
          <span className="text-text-2 text-xs">&copy; 2025 CoHost Management. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="text-text-2 text-xs hover:text-text-1 transition-colors cursor-pointer">Privacy Policy</a>
            <a href="#" className="text-text-2 text-xs hover:text-text-1 transition-colors cursor-pointer">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
