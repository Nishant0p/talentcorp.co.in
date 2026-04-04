import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#jobs', label: 'Jobs' },
  { href: '#clients', label: 'Clients' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#news-events', label: 'News & Events' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 border-b border-[#d8e7f8] bg-white/95 backdrop-blur-md">
      <div className="container mx-auto px-6 py-3.5 flex items-center justify-between">
        <div className="h-10 w-[155px] overflow-hidden sm:h-12 sm:w-[180px]">
          <img
            src="/TSPL Logo (Sarang Sir) 1.png"
            alt="TSPL"
            className="h-full w-full object-cover object-center scale-[1.14] drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)] contrast-125 brightness-110"
          />
        </div>

        <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#1a4f87]">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-[#0f2a4d] transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2.5">
          <Link
            to="/contact-us"
            className="bg-white hover:bg-[#f3f8ff] border border-[#b7cde6] text-[#174a7f] px-4 py-2 rounded-xl font-semibold transition-all"
          >
            Contact Us
          </Link>
          <button className="bg-[#FF8C00] hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold transition-all">
            Apply Job
          </button>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#b7cde6] bg-white text-[#174a7f]"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">Open menu</span>
          <span className="flex flex-col gap-1.5">
            <span className="h-0.5 w-5 rounded bg-current" />
            <span className="h-0.5 w-5 rounded bg-current" />
            <span className="h-0.5 w-5 rounded bg-current" />
          </span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#d8e7f8] bg-white px-6 py-5 shadow-lg">
          <div className="flex flex-col gap-4 text-base font-semibold text-[#1a4f87]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-2 py-1 hover:bg-[#f3f8ff]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-2.5">
            <Link
              to="/contact-us"
              onClick={closeMenu}
              className="bg-white hover:bg-[#f3f8ff] border border-[#b7cde6] text-[#174a7f] px-4 py-2 rounded-xl font-semibold transition-all text-center"
            >
              Contact Us
            </Link>
            <button className="bg-[#FF8C00] hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold transition-all">
              Apply Job
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;