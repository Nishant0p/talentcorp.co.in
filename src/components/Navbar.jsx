import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/client', label: 'Clients' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/news-events', label: 'News & Events' },
];

const serviceLinks = [
  { href: '/nats', label: 'NATS' },
  { href: '/naps', label: 'NAPS' },
  { href: '/bvoc', label: 'B.VOC' },
  { href: '/dvoc', label: 'D.VOC' },
  { href: '/services/flexi-iti', label: 'FLEXI ITI' },
  { href: '/aedp', label: 'AEDP' },
  { href: '/maps', label: 'MAPS' },
  { href: '/security', label: 'SECURITY' },
  { href: '/skilled', label: 'SKILLED JOB' },
  { href: '/housekeeping', label: 'HOUSEKEEPING' },
  { href: '/manpower', label: 'MANPOWER' },
  { href: '/contract', label: 'CONTRACT' },
  { href: '/compliance', label: 'COMPLIANCE' },
  { href: '/payroll', label: 'PAYROLL' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const desktopServicesRef = useRef(null);

  const { pathname, hash } = useLocation();

  const isLinkActive = (href) => {
    const currentPath = pathname + hash;
    if (href === '/') return currentPath === '/' || currentPath === '';
    return currentPath === href || pathname === href;
  };

  const isServiceActive = serviceLinks.some((service) => isLinkActive(service.href));

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
    <nav className="fixed top-6 inset-x-0 z-50 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-full border border-[#d8e7f8] bg-white shadow-lg shadow-black/5 backdrop-blur-md">
          <div className="px-6 py-3.5 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex h-9 w-[140px] items-center justify-center overflow-hidden rounded-2xl bg-white px-2 sm:h-11 sm:w-[160px]"
              aria-label="TSPL home"
            >
              <img
                src="/tspl main logo.png"
                alt="TSPL"
                className="h-full w-full object-contain object-center"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#1a4f87]">
              <div className="relative" ref={desktopServicesRef}>
                <button
                  type="button"
                  onClick={() => setIsDesktopServicesOpen((prev) => !prev)}
                  className={`relative inline-flex items-center gap-2 hover:text-[#0f2a4d] transition-colors font-bold ${
                    isServiceActive ? 'text-[#0f2a4d] after:absolute after:left-0 after:-bottom-[6px] after:h-[2px] after:w-full after:rounded-full after:bg-[#FF8C00]' : ''
                  }`}
                  aria-expanded={isDesktopServicesOpen}
                  aria-haspopup="menu"
                >
                  Services
                  <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isDesktopServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDesktopServicesOpen && (
                  <div className="absolute left-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-[#d8e7f8] bg-white p-1.5 shadow-xl">
                    {serviceLinks.map((service) => {
                      const active = isLinkActive(service.href);
                      return (
                        <Link
                          key={service.href}
                          to={service.href}
                          onClick={handleNavigation}
                          className={`block rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-[#f3f8ff] hover:text-[#0f2a4d] ${active ? 'bg-[#f3f8ff] text-[#0f2a4d] font-bold' : 'text-[#1a4f87]'}`}
                        >
                          {service.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                const baseClasses = 'relative hover:text-[#0f2a4d] transition-colors';
                const activeClasses = 'text-[#0f2a4d] font-bold after:absolute after:left-0 after:-bottom-[6px] after:h-[2px] after:w-full after:rounded-full after:bg-[#FF8C00] after:transition-all after:duration-300';

                return link.href.startsWith('/') ? (
                  <Link key={link.href} to={link.href} onClick={handleNavigation} className={`${baseClasses} ${active ? activeClasses : ''}`}>
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.href} href={link.href} onClick={handleNavigation} className={`${baseClasses} ${active ? activeClasses : ''}`}>
                    {link.label}
                  </a>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-2.5">
              <Link
                to="/contact-us"
                className="bg-white hover:bg-[#f3f8ff] border border-[#b7cde6] text-[#174a7f] px-4 py-2 rounded-xl font-semibold transition-all"
              >
                Contact Us
              </Link>
              <Link
                to="/jobs"
                className="bg-[#FF8C00] hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold transition-all"
              >
                Apply Job
              </Link>
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
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 max-h-[calc(100vh-7.5rem)] overflow-y-auto rounded-2xl border border-[#d8e7f8] bg-white/95 shadow-lg backdrop-blur-md">
            <div className="px-6 py-5">
              <div className="flex flex-col items-center gap-4 text-center text-base font-semibold text-[#1a4f87]">
                <div>
                  <button
                    type="button"
                    onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                    className={`flex w-full items-center justify-between rounded-lg px-2 py-1 text-center hover:bg-[#f3f8ff] font-bold ${isServiceActive ? 'text-[#0f2a4d]' : ''}`}
                    aria-expanded={isMobileServicesOpen}
                  >
                    <span className={`relative ${isServiceActive ? 'after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:w-full after:rounded-full after:bg-[#FF8C00]' : ''}`}>Services</span>
                    <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isMobileServicesOpen && (
                    <div className="mt-2 max-h-56 overflow-y-auto border-l border-[#d8e7f8] pl-3 text-center">
                      {serviceLinks.map((service) => {
                        const active = isLinkActive(service.href);
                        return (
                          <Link
                            key={service.href}
                            to={service.href}
                            onClick={handleNavigation}
                            className={`rounded-lg px-2 py-1 text-sm hover:bg-[#f3f8ff] ${active ? 'text-[#0f2a4d] font-bold' : ''}`}
                          >
                            <span className={`relative ${active ? 'after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:w-full after:rounded-full after:bg-[#FF8C00]' : ''}`}>{service.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {navLinks.map((link) => {
                  const active = isLinkActive(link.href);
                  const baseClasses = 'rounded-lg px-2 py-1 hover:bg-[#f3f8ff]';
                  const activeClasses = 'text-[#0f2a4d] font-bold';

                  return link.href.startsWith('/') ? (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={handleNavigation}
                      className={`${baseClasses} ${active ? activeClasses : ''} text-center`}
                    >
                      <span className={`relative ${active ? 'after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:w-full after:rounded-full after:bg-[#FF8C00]' : ''}`}>{link.label}</span>
                    </Link>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={handleNavigation}
                      className={`${baseClasses} ${active ? activeClasses : ''} text-center`}
                    >
                      <span className={`relative ${active ? 'after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:w-full after:rounded-full after:bg-[#FF8C00]' : ''}`}>{link.label}</span>
                    </a>
                  );
                })}
              </div>

              <div className="mt-5 grid grid-cols-1 gap-2.5">
                <Link
                  to="/contact-us"
                  onClick={closeMenu}
                  className="bg-white hover:bg-[#f3f8ff] border border-[#b7cde6] text-[#174a7f] px-4 py-2 rounded-xl font-semibold transition-all text-center"
                >
                  Contact Us
                </Link>
                <Link
                  to="/jobs"
                  onClick={closeMenu}
                  className="bg-[#FF8C00] hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold transition-all text-center"
                >
                  Apply Job
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;