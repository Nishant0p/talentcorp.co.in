import React, { Suspense, lazy } from 'react';
import { CheckCircle, Award, ArrowRight, Briefcase, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import WorkforceSection from '../components/WorkforceSection';
import StatsSection, { CountUpNumber } from '../components/StatsSection';
import JobBoard from '../components/JobBoard';
import Testimonials from '../components/Testimonials';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';

import AwardsSection from '../components/AwardsSection';
const NewsSection = lazy(() => import('../components/NewsSection'));

const HeroSection = ({ animateWords = false }) => {
  const partnerLogos = [
    { name: 'JCB', src: '/JCB_(company)-Logo.wine.svg' },
    { name: 'LG', src: '/images-10.jpeg' },
    { name: 'HAIER', src: '/haier-logo.png' },
    { name: 'MRF', src: '/Mrf-logo.png' },
  ];

  const statCards = [
    { value: 40000, isNumber: true, label: 'Successful Placements' },
    { value: 400, isNumber: true, label: 'Partner Employers' },
    { value: 'Govt', isNumber: false, label: 'Authorized' },
  ];

  const renderPartnerRow = (reverse = false) => (
    <div className="logo-marquee-track gap-4" style={{ animationDirection: reverse ? 'reverse' : 'normal' }}>
      {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((brand, idx) => (
        <div
          key={`${brand.name}-${reverse ? 'rev' : 'fwd'}-${idx}`}
          className="mx-2 flex h-20 w-52 shrink-0 items-center rounded-2xl border border-[#f7c99b] bg-[#fff7ed]/90 px-4 shadow-sm backdrop-blur-sm"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#fdba74] bg-white shadow-[0_6px_18px_rgba(249,115,22,0.12)]">
            <img
              src={brand.src}
              alt={`${brand.name} logo`}
              className={`${brand.name === 'MRF' ? 'h-8' : 'h-7'} w-auto object-contain`}
              loading="lazy"
            />
          </div>
          <div className="ml-3 flex min-w-0 flex-col text-left">
            <span className="truncate text-sm font-bold text-blue-700">{brand.name}</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#fb923c]">
              Partner
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative bg-[#0f2a4d]">
      <Navbar />
      <section className="relative min-h-screen flex items-center overflow-visible">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/Gemini_Generated_Image_qskougqskougqsko.png" 
            className="w-full h-full object-cover object-[78%_center] scale-[1.12] opacity-35"
            alt="Office Background"
          />
          <div className="absolute left-0 top-0 bottom-0 w-[72%] bg-gradient-to-r from-[#0f2a4d]/90 via-[#0f2a4d]/60 to-transparent" />
          <div className="hero-color-wash absolute right-0 top-0 bottom-0 w-[58%] bg-gradient-to-l from-cyan-500/25 via-blue-500/20 to-transparent" />
          <div className="hero-color-blob-one absolute -right-24 top-20 h-72 w-72 rounded-full bg-orange-500/30 blur-3xl" />
          <div className="hero-color-blob-two absolute right-20 bottom-10 h-80 w-80 rounded-full bg-indigo-500/30 blur-3xl" />
        </div>

        {/* Decorative Circle */}
        <div className="absolute -top-24 -left-24 w-96 h-96 border border-white/10 rounded-full z-0" />

        <div className="container mx-auto px-6 relative z-10 py-16 pt-24 pb-16 md:pb-24">
          {/* Badges */}
          <div className={`${animateWords ? 'hero-content-enter' : 'hero-content-wait'} max-w-3xl md:ml-8 lg:ml-12`}>
          <div className="mb-8">
            <div className="flex flex-wrap md:flex-nowrap items-center gap-1.5 md:gap-2 overflow-visible md:overflow-x-auto pb-1">
            <div className="flex shrink-0 items-center gap-1.5 md:gap-2 whitespace-nowrap bg-white/3 backdrop-blur-md border border-white/15 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm">
                <Award size={14} className="text-orange-500 md:h-4 md:w-4" />
                <span>Government Authorized</span>
              </div>
            <div className="flex shrink-0 items-center gap-1.5 md:gap-2 whitespace-nowrap bg-white/3 backdrop-blur-md border border-white/15 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm">
                <CheckCircle size={14} className="text-emerald-500 md:h-4 md:w-4" />
                <span>NAPS | NATS | MAPS</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Building India's <br />
              <span className="text-[#FF8C00]">Future Workforce</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl">
              India's leading government-authorized staffing partner connecting 40,000+ skilled 
              candidates with top employers through certified apprenticeship programs.
            </p>

            {/* Social Proof */}
            <div className="flex items-center gap-6 mb-12">
              <div className="flex items-center -space-x-3">
                {partnerLogos.map((brand) => (
                  <div
                    key={brand.name}
                    className="h-12 w-12 rounded-full border-2 border-[#0f2a4d] bg-white flex items-center justify-center overflow-hidden shadow-md"
                  >
                    <img
                      src={brand.src}
                      alt={`${brand.name} logo`}
                      className={`${brand.name === 'MRF' ? 'h-8 w-8' : 'h-7 w-7'} object-contain`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <div className="h-8 w-[1px] bg-white/15" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">+400 Companies Trust Us</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-orange-500 text-orange-500" />)}
                  <span className="text-xs text-gray-400 ml-1">4.9/5 Rating</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#FF8C00] hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all">
                Find Your Dream Job <ArrowRight size={20} />
              </button>
              <button className="bg-white/4 hover:bg-white/8 border border-white/15 backdrop-blur-md text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all">
                <Briefcase size={20} /> Hire Skilled Talent
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:block absolute left-1/2 bottom-0 z-30 w-full max-w-6xl -translate-x-1/2 translate-y-1/2 px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {statCards.map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-white/45 bg-white/28 p-6 text-center shadow-[0_24px_55px_rgba(7,22,49,0.42)] backdrop-blur-xl"
              >
                <div className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                  {card.isNumber ? <CountUpNumber target={card.value} /> : card.value}
                </div>
                <div className="mt-2 text-sm font-bold text-blue-900">
                  {card.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="clients" className="relative overflow-hidden bg-white px-0 pb-16 pt-16 md:pt-24 text-[#0f2a4d]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(37,99,235,0.04) 0px, rgba(37,99,235,0.04) 1px, transparent 1px, transparent 16px)',
          }}
        />

        <div className="relative w-full">
          <h2 className="px-6 text-center text-2xl font-bold leading-snug text-[#103f78] md:px-10 md:text-3xl">
            Trusted by 400+ leading companies across India
          </h2>

          <div
            className="logo-marquee mt-10 overflow-hidden bg-gradient-to-b from-[#fffaf3] to-[#fff7ed] py-5"
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg, rgba(249,115,22,0.05) 0px, rgba(249,115,22,0.05) 1px, transparent 1px, transparent 16px)',
            }}
          >
            <div className="space-y-4">
              {renderPartnerRow(false)}
              {renderPartnerRow(true)}
            </div>
          </div>
        </div>
      </section>

      <WorkforceSection />
      <JobBoard />
      <Testimonials />
      <Suspense fallback={<section id="news-events" className="bg-white py-16" />}>
        <NewsSection />
      </Suspense>
      <StatsSection />
      <AwardsSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default HeroSection;
