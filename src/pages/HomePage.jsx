import React from 'react';
import { CheckCircle, Award, ArrowRight, Briefcase, Star } from 'lucide-react';
import WorkforceSection from '../components/WorkforceSection';
import StatsSection from '../components/StatsSection';
import JobBoard from '../components/JobBoard';
import Testimonials from '../components/Testimonials';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';

const HeroSection = ({ animateWords = false }) => {
  const partnerLogos = [
    { name: 'JCB', src: '/JCB_(company)-Logo.wine.svg' },
    { name: 'LG', src: '/images-10.jpeg' },
    { name: 'HAIER', src: '/haier-logo.png' },
    { name: 'MRF', src: '/Mrf-logo.png' },
  ];

  const statCards = [
    { value: '40,000+', label: 'Successful Placements' },
    { value: '400+', label: 'Partner Employers' },
    { value: 'Govt', label: 'Authorized' },
  ];

  return (
    <div className="relative bg-[#0f2a4d]">
      <section className="relative min-h-screen flex items-center overflow-visible">
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
              <a href="#services" className="hover:text-[#0f2a4d] transition-colors">Services</a>
              <a href="#about" className="hover:text-[#0f2a4d] transition-colors">About</a>
              <a href="#jobs" className="hover:text-[#0f2a4d] transition-colors">Jobs</a>
              <a href="#clients" className="hover:text-[#0f2a4d] transition-colors">Clients</a>
              <a href="#achievements" className="hover:text-[#0f2a4d] transition-colors">Achievements</a>
              <a href="#news-events" className="hover:text-[#0f2a4d] transition-colors">News &amp; Events</a>
            </div>
            <div className="flex items-center gap-2.5">
              <button className="bg-white hover:bg-[#f3f8ff] border border-[#b7cde6] text-[#174a7f] px-4 py-2 rounded-xl font-semibold transition-all">
                Contact Us
              </button>
              <button className="bg-[#FF8C00] hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold transition-all">
                Apply Job
              </button>
            </div>
          </div>
        </nav>

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

        <div className="container mx-auto px-6 relative z-10 py-20 pt-32 pb-20 md:pb-40">
          {/* Badges */}
          <div className={`${animateWords ? 'hero-content-enter' : 'hero-content-wait'} max-w-3xl`}>
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 bg-white/3 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-sm">
              <Award size={16} className="text-orange-500" />
              <span>Government Authorized</span>
            </div>
            <div className="flex items-center gap-2 bg-white/3 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-sm">
              <CheckCircle size={16} className="text-emerald-500" />
              <span>NAPS | NATS | MAPS</span>
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
                <div className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">{card.value}</div>
                <div className="mt-2 text-sm font-bold text-blue-900">
                  {card.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="clients" className="relative overflow-hidden bg-white px-0 pb-20 pt-16 md:pt-40 text-[#0f2a4d]">
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
            className="logo-marquee mt-10 overflow-hidden border-y border-[#e0eef8] py-6 bg-white/60"
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg, rgba(37,99,235,0.04) 0px, rgba(37,99,235,0.04) 1px, transparent 1px, transparent 16px)',
            }}
          >
            <div className="logo-marquee-track">
              {[...partnerLogos, ...partnerLogos].map((brand, idx) => (
                <div
                  key={`${brand.name}-${idx}`}
                  className="mx-2 flex h-20 w-44 shrink-0 items-center justify-center rounded-xl border border-[#9ec3ea] bg-[#eff6ff]/75 px-5 shadow-sm backdrop-blur-sm"
                >
                  <img
                    src={brand.src}
                    alt={`${brand.name} logo`}
                    className={`${brand.name === 'MRF' ? 'h-14' : 'h-12'} w-auto object-contain`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WorkforceSection />
      <JobBoard />
      <Testimonials />
      <StatsSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default HeroSection;
