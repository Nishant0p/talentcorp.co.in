import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/#jobs', label: 'Jobs' },
  { href: '/#clients', label: 'Clients' },
  { href: '/#achievements', label: 'Achievements' },
  { href: '/news-events', label: 'News & Events' },
];

const serviceLinks = [
  { href: '/nats', label: 'NATS' },
  { href: '/naps', label: 'NAPS' },
  { href: '/flexi-iti', label: 'FLEXI ITI' },
  { href: '/skilled', label: 'SKILLED JOB' },
  { href: '/housekeeping', label: 'HOUSEKEEPING' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const desktopServicesRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopServicesRef.current && !desktopServicesRef.current.contains(event.target)) {
        setIsDesktopServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  };

  const handleNavigation = () => {
    setIsDesktopServicesOpen(false);
    closeMenu();
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 border-b border-[#d8e7f8] bg-white/95 backdrop-blur-md">
      <div className="container mx-auto px-6 py-3.5 flex items-center justify-between">
        <Link to="/" className="h-10 w-[155px] overflow-hidden sm:h-12 sm:w-[180px]" aria-label="TSPL home">
          <img
            src="/TSPL Logo (Sarang Sir) 1.png"
            alt="TSPL"
            className="h-full w-full object-cover object-center scale-[1.14] drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)] contrast-125 brightness-110"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#1a4f87]">
          <div className="relative" ref={desktopServicesRef}>
            <button
              type="button"
              onClick={() => setIsDesktopServicesOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 hover:text-[#0f2a4d] transition-colors font-bold"
              aria-expanded={isDesktopServicesOpen}
              aria-haspopup="menu"
            >
              Services
              <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isDesktopServicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDesktopServicesOpen && (
              <div className="absolute left-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-[#d8e7f8] bg-white p-1.5 shadow-xl">
                {serviceLinks.map((service) => (
                  <Link
                    key={service.href}
                    to={service.href}
                    onClick={handleNavigation}
                    className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#1a4f87] transition-colors hover:bg-[#f3f8ff] hover:text-[#0f2a4d]"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link key={link.href} to={link.href} onClick={handleNavigation} className="hover:text-[#0f2a4d] transition-colors">
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} onClick={handleNavigation} className="hover:text-[#0f2a4d] transition-colors">
                  {link.label}
                </a>
              )
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
            <div>
              <button
                type="button"
                onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-lg px-2 py-1 text-left hover:bg-[#f3f8ff] font-bold"
                aria-expanded={isMobileServicesOpen}
              >
                <span>Services</span>
                <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMobileServicesOpen && (
                <div className="mt-2 ml-3 flex flex-col gap-2 border-l border-[#d8e7f8] pl-3">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      to={service.href}
                      onClick={handleNavigation}
                      className="rounded-lg px-2 py-1 text-sm hover:bg-[#f3f8ff]"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={handleNavigation}
                  className="rounded-lg px-2 py-1 hover:bg-[#f3f8ff]"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavigation}
                  className="rounded-lg px-2 py-1 hover:bg-[#f3f8ff]"
                >
                  {link.label}
                </a>
              )
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