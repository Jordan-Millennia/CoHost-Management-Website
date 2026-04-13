"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Owner Portal", href: "#portal" },
  { label: "Markets", href: "#markets" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bg-0/80 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="#" className="flex items-center gap-2.5 group">
            <Image
              src="/CoHost-Management-Website/logo.png"
              alt="CoHost Management"
              width={36}
              height={36}
              className="w-9 h-9 object-contain"
            />
            <span className="font-display text-[15px] font-bold tracking-tight text-text-0">
              <em className="not-italic text-teal">Co</em>Host Management
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-text-1 hover:text-text-0 transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="#" className="text-[13px] font-medium text-text-1 hover:text-text-0 transition-colors cursor-pointer">
              Log In
            </a>
            <a
              href="#contact"
              className="text-[13px] font-medium px-5 py-2.5 rounded-lg bg-teal text-bg-0 hover:bg-teal-dark transition-colors cursor-pointer"
            >
              Get a Free Analysis
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-text-0 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-bg-0/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 transition-all duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-xl font-display font-bold text-text-0 hover:text-teal transition-colors cursor-pointer"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMobileOpen(false)}
          className="mt-4 px-8 py-3 rounded-lg bg-teal text-bg-0 font-medium cursor-pointer"
        >
          Get a Free Analysis
        </a>
      </div>
    </>
  );
}
