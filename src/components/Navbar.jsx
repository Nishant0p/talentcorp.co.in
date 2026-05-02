import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <motion.nav 
      className="fixed top-6 inset-x-0 z-50 px-4 sm:px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
                <motion.button
                  type="button"
                  onClick={() => setIsDesktopServicesOpen((prev) => !prev)}
                  className={`relative inline-flex items-center gap-2 hover:text-[#0f2a4d] transition-colors font-bold ${
                    isServiceActive ? 'text-[#0f2a4d] after:absolute after:left-0 after:-bottom-[6px] after:h-[2px] after:w-full after:rounded-full after:bg-[#FF8C00]' : ''
                  }`}
                  aria-expanded={isDesktopServicesOpen}
                  aria-haspopup="menu"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Services
                  <motion.div
                    animate={{ rotate: isDesktopServicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </motion.button>

                {isDesktopServicesOpen && (
                  <motion.div 
                    className="absolute left-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-[#d8e7f8] bg-white p-1.5 shadow-xl"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {serviceLinks.map((service, index) => {
                      const active = isLinkActive(service.href);
                      return (
                        <motion.div
                          key={service.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <Link
                            to={service.href}
                            onClick={handleNavigation}
                            className={`block rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-[#f3f8ff] hover:text-[#0f2a4d] ${active ? 'bg-[#f3f8ff] text-[#0f2a4d] font-bold' : 'text-[#1a4f87]'}`}
                          >
                            {service.label}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </div>

              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                const baseClasses = 'relative hover:text-[#0f2a4d] transition-colors';
                const activeClasses = 'text-[#0f2a4d] font-bold after:absolute after:left-0 after:-bottom-[6px] after:h-[2px] after:w-full after:rounded-full after:bg-[#FF8C00] after:transition-all after:duration-300';

                return (
                  <motion.div
                    key={link.href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.href.startsWith('/') ? (
                      <Link to={link.href} onClick={handleNavigation} className={`${baseClasses} ${active ? activeClasses : ''}`}>
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} onClick={handleNavigation} className={`${baseClasses} ${active ? activeClasses : ''}`}>
                        {link.label}
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-2.5">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact-us"
                  className="bg-white hover:bg-[#f3f8ff] border border-[#b7cde6] text-[#174a7f] px-4 py-2 rounded-xl font-semibold transition-all"
                >
                  Contact Us
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/jobs"
                  className="bg-[#FF8C00] hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold transition-all"
                >
                  Apply Job
                </Link>
              </motion.div>
            </div>

            <motion.button
              type="button"
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#b7cde6] bg-white text-[#174a7f]"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Open menu</span>
              <span className="flex flex-col gap-1.5">
                <span className="h-0.5 w-5 rounded bg-current" />
                <span className="h-0.5 w-5 rounded bg-current" />
                <span className="h-0.5 w-5 rounded bg-current" />
              </span>
            </motion.button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden mt-3 max-h-[calc(100vh-7.5rem)] overflow-y-auto rounded-2xl border border-[#d8e7f8] bg-white/95 shadow-lg backdrop-blur-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-5">
              <div className="flex flex-col items-center gap-4 text-center text-base font-semibold text-[#1a4f87]">
                <div>
                  <motion.button
                    type="button"
                    onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                    className={`flex w-full items-center justify-between rounded-lg px-2 py-1 text-center hover:bg-[#f3f8ff] font-bold ${isServiceActive ? 'text-[#0f2a4d]' : ''}`}
                    aria-expanded={isMobileServicesOpen}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Services</span>
                    <motion.div
                      animate={{ rotate: isMobileServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.div>
                  </motion.button>

                  {isMobileServicesOpen && (
                    <div className="mt-2 max-h-56 overflow-y-auto border-l border-[#d8e7f8] pl-3 text-center">
                      {serviceLinks.map((service, index) => {
                        const active = isLinkActive(service.href);
                        return (
                          <motion.div
                            key={service.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                          >
                            <Link
                              to={service.href}
                              onClick={handleNavigation}
                              className={`block w-full rounded-lg px-3 py-2 text-sm hover:bg-[#f3f8ff] transition-all ${active ? 'text-[#0f2a4d] font-bold bg-[#f3f8ff]' : ''}`}
                            >
                              {service.label}
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="my-1 h-px bg-[#d8e7f8]" />

                {navLinks.map((link, index) => {
                  const active = isLinkActive(link.href);
                  const baseClasses = 'block w-full rounded-lg px-3 py-2 text-center hover:bg-[#f3f8ff] transition-all duration-300';
                  const activeClasses = 'text-[#0f2a4d] font-bold bg-[#f3f8ff]';

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      {link.href.startsWith('/') ? (
                        <Link
                          to={link.href}
                          onClick={handleNavigation}
                          className={`${baseClasses} ${active ? activeClasses : ''}`}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          onClick={handleNavigation}
                          className={`${baseClasses} ${active ? activeClasses : ''}`}
                        >
                          {link.label}
                        </a>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-5 grid grid-cols-1 gap-2.5">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/contact-us"
                    onClick={closeMenu}
                    className="bg-white hover:bg-[#f3f8ff] border border-[#b7cde6] text-[#174a7f] px-4 py-2 rounded-xl font-semibold transition-all text-center block"
                  >
                    Contact Us
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/jobs"
                    onClick={closeMenu}
                    className="bg-[#FF8C00] hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold transition-all text-center block"
                  >
                    Apply Job
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;