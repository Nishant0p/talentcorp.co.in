import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Home, Info, Users, Trophy, Newspaper, Map, Briefcase, Phone, Settings } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: Info },
  { href: '/client', label: 'Clients', icon: Users },
  { href: '/achievements', label: 'Achievements', icon: Trophy },
  { href: '/news-events', label: 'News & Events', icon: Newspaper },
  { href: '/rojgaar-yatra', label: 'Rozgaar Yatra', icon: Map },
];

const serviceLinks = [
  { href: '/nats', label: 'NATS' },
  { href: '/naps', label: 'NAPS' },
  {
    isNested: true,
    label: 'WILP',
    links: [
      { href: '/dvoc', label: 'D.Voc (Diploma)' },
      { href: '/bvoc', label: 'B.Voc (Bachelor)' },
      { href: '/mvoc', label: 'M.Voc (Master)' },
    ]
  },
  { href: '/services/flexi-iti', label: 'FLEXI ITI' },
  { href: '/aedp', label: 'AEDP' },
  { href: '/maps', label: 'MAPS' },
  { href: '/labour-staffing', label: 'Labour Staffing' },
  { href: '/compliance', label: 'Legal Compliances' },
  { href: '/payroll', label: 'Payroll Processing' },
];

const Navbar = ({ isGlobal }) => {
  if (!isGlobal) return null;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isWilpExpanded, setIsWilpExpanded] = useState(false);
  const desktopServicesRef = useRef(null);

  const { pathname } = useLocation();

  const isLinkActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  const isServiceActive = serviceLinks.some((service) =>
    service.isNested
      ? service.links.some((sub) => isLinkActive(sub.href))
      : isLinkActive(service.href)
  );

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopServicesRef.current && !desktopServicesRef.current.contains(event.target)) {
        setIsDesktopServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsNavbarVisible(true);
    setIsMobileMenuOpen(false);
    setIsDesktopServicesOpen(false);

    const isMobile = window.matchMedia('(max-width: 1023px)').matches;
    if (pathname !== '/' || !isMobile) return;

    let previousScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 48) {
        setIsNavbarVisible(true);
      } else if (currentScrollY > previousScrollY + 4) {
        setIsNavbarVisible(false);
      } else if (currentScrollY < previousScrollY - 4) {
        setIsNavbarVisible(true);
      }
      previousScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
    setIsWilpExpanded(false);
  };

  const handleNavigation = () => {
    setIsDesktopServicesOpen(false);
    closeMenu();
  };

  return (
    <>
      {/* ─── DESKTOP + PILL NAV ─────────────────────────────────────────── */}
      <nav
        className={`fixed top-6 inset-x-0 z-50 px-4 sm:px-6 transition-[transform,opacity] duration-300 ease-out ${
          isNavbarVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="rounded-full border border-[#d8e7f8] bg-white shadow-lg shadow-black/5 backdrop-blur-md">
            <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
              {/* Logo */}
              <Link
                to="/"
                className="inline-flex h-9 w-[120px] sm:h-11 sm:w-[150px] items-center justify-center overflow-hidden rounded-xl bg-white"
                aria-label="TSPL home"
                onClick={handleNavigation}
              >
                <img
                  src="/tspl main logo.png"
                  alt="TSPL"
                  width="150"
                  height="44"
                  className="h-full w-full object-contain object-center"
                />
              </Link>

              {/* Desktop links */}
              <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#1a4f87]">
                <div className="relative" ref={desktopServicesRef}>
                  <motion.button
                    type="button"
                    onClick={() => setIsDesktopServicesOpen((prev) => !prev)}
                    className={`relative inline-flex items-center gap-2 hover:text-[#0f2a4d] transition-colors font-bold ${
                      isServiceActive
                        ? 'text-[#0f2a4d] after:absolute after:left-0 after:-bottom-[6px] after:h-[2px] after:w-full after:rounded-full after:bg-[#FF8C00]'
                        : ''
                    }`}
                    aria-expanded={isDesktopServicesOpen}
                    aria-haspopup="menu"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Services
                    <motion.div animate={{ rotate: isDesktopServicesOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isDesktopServicesOpen && (
                      <motion.div
                        className="absolute left-0 top-full mt-2 w-48 overflow-hidden rounded-xl border border-[#d8e7f8] bg-white p-1.5 shadow-xl"
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                      >
                        {serviceLinks.map((service, index) => {
                          if (service.isNested) {
                            return (
                              <div key={service.label}>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setIsWilpExpanded((p) => !p); }}
                                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-[#f3f8ff] text-[#1a4f87]"
                                >
                                  {service.label}
                                  <ChevronDown className={`h-4 w-4 transition-transform ${isWilpExpanded ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                  {isWilpExpanded && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="ml-2 mt-1 flex flex-col gap-1 border-l-2 border-[#d8e7f8] pl-2 overflow-hidden"
                                    >
                                      {service.links.map((sub) => (
                                        <Link
                                          key={sub.href}
                                          to={sub.href}
                                          onClick={handleNavigation}
                                          className={`block rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors hover:bg-[#f3f8ff] hover:text-[#0f2a4d] ${isLinkActive(sub.href) ? 'bg-[#f3f8ff] text-[#0f2a4d]' : 'text-[#1a4f87]'}`}
                                        >
                                          {sub.label}
                                        </Link>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          }
                          return (
                            <Link
                              key={service.href}
                              to={service.href}
                              onClick={handleNavigation}
                              className={`block rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-[#f3f8ff] hover:text-[#0f2a4d] ${isLinkActive(service.href) ? 'bg-[#f3f8ff] text-[#0f2a4d] font-bold' : 'text-[#1a4f87]'}`}
                            >
                              {service.label}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {navLinks.map((link) => {
                  const active = isLinkActive(link.href);
                  return (
                    <motion.div key={link.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        to={link.href}
                        onClick={handleNavigation}
                        className={`relative hover:text-[#0f2a4d] transition-colors ${
                          active
                            ? 'text-[#0f2a4d] font-bold after:absolute after:left-0 after:-bottom-[6px] after:h-[2px] after:w-full after:rounded-full after:bg-[#FF8C00]'
                            : ''
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Desktop CTAs */}
              <div className="hidden lg:flex items-center gap-2.5">
                <Link to="/contact-us" className="bg-white hover:bg-[#f3f8ff] border border-[#b7cde6] text-[#174a7f] px-4 py-2 rounded-xl font-semibold transition-all text-sm">
                  Contact Us
                </Link>
                <Link to="/jobs" className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded-xl font-semibold transition-all text-sm">
                  Apply Job
                </Link>
              </div>

              {/* Mobile hamburger */}
              <motion.button
                type="button"
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#b7cde6] bg-white text-[#174a7f]"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                whileTap={{ scale: 0.92 }}
              >
                <span className="flex flex-col gap-[5px] items-center">
                  <span className="h-[2px] w-[18px] rounded-full bg-[#174a7f]" />
                  <span className="h-[2px] w-[14px] rounded-full bg-[#174a7f]" />
                  <span className="h-[2px] w-[18px] rounded-full bg-[#174a7f]" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── MOBILE DRAWER ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            />

            {/* Drawer panel – slides in from right */}
            <motion.aside
              className="fixed top-0 right-0 z-[70] h-full w-[82vw] max-w-[320px] bg-white shadow-2xl flex flex-col lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <Link to="/" onClick={handleNavigation}>
                  <img src="/tspl main logo.png" alt="TSPL" className="h-9 w-auto object-contain" />
                </Link>
                <motion.button
                  onClick={closeMenu}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Scrollable links */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {/* Main nav links */}
                {navLinks.map((link, i) => {
                  const active = isLinkActive(link.href);
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                    >
                      <Link
                        to={link.href}
                        onClick={handleNavigation}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-[15px] transition-all ${
                          active
                            ? 'bg-blue-50 text-[#0f2a4d] border border-blue-100'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        {link.label}
                        {active && <span className="ml-auto h-2 w-2 rounded-full bg-orange-500" />}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Services section */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.04, duration: 0.2 }}
                  className="pt-2"
                >
                  <div className="px-4 pb-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Services</span>
                  </div>

                  <button
                    onClick={() => setIsMobileServicesOpen((p) => !p)}
                    className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl font-semibold text-[15px] transition-all ${
                      isServiceActive
                        ? 'bg-blue-50 text-[#0f2a4d] border border-blue-100'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${isServiceActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Briefcase className="h-4 w-4" />
                    </span>
                    All Services
                    <motion.div
                      className="ml-auto"
                      animate={{ rotate: isMobileServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isMobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden ml-2 mt-1 border-l-2 border-blue-100 pl-3"
                      >
                        {serviceLinks.map((link) => {
                          if (link.isNested) {
                            return (
                              <div key={link.label}>
                                <button
                                  onClick={() => setIsWilpExpanded((p) => !p)}
                                  className="flex w-full items-center justify-between px-3 py-2.5 rounded-lg text-[14px] font-semibold text-slate-600 hover:bg-slate-50 transition-all"
                                >
                                  {link.label}
                                  <ChevronDown className={`h-4 w-4 transition-transform text-slate-400 ${isWilpExpanded ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                  {isWilpExpanded && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="ml-3 border-l-2 border-slate-100 pl-3 overflow-hidden"
                                    >
                                      {link.links.map((sub) => (
                                        <Link
                                          key={sub.href}
                                          to={sub.href}
                                          onClick={handleNavigation}
                                          className={`flex items-center px-3 py-2 rounded-lg text-[13px] transition-all ${isLinkActive(sub.href) ? 'text-blue-700 font-bold bg-blue-50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
                                        >
                                          {sub.label}
                                        </Link>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          }
                          return (
                            <Link
                              key={link.href}
                              to={link.href}
                              onClick={handleNavigation}
                              className={`flex items-center px-3 py-2.5 rounded-lg text-[14px] font-semibold transition-all ${isLinkActive(link.href) ? 'text-blue-700 bg-blue-50' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                            >
                              {link.label}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Drawer footer CTAs */}
              <div className="px-4 pb-6 pt-3 border-t border-slate-100 space-y-2.5">
                <Link
                  to="/contact-us"
                  onClick={handleNavigation}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#b7cde6] bg-white text-[#174a7f] font-semibold text-[15px] transition-all active:scale-95"
                >
                  <Phone className="h-4 w-4" />
                  Contact Us
                </Link>
                <Link
                  to="/jobs"
                  onClick={handleNavigation}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-orange-600 text-white font-bold text-[15px] transition-all active:scale-95 shadow-lg shadow-orange-500/20"
                >
                  Apply for a Job →
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;