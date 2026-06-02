import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Users, Network, MapPin, Zap, ShieldCheck, TrendingUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchStrengths, extractMediaUrl } from '../utils/strapi';

const fallbackStrengths = [
  {
    id: '01',
    title: 'Skilled Workforce',
    stat: '40,000+',
    sub: 'Workers',
    desc: 'Access to 40,000+ trained and certified workers ready for deployment across India.',
    color: 'bg-orange-600',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '02',
    title: 'Partner Network',
    stat: '450+',
    sub: 'Partners',
    desc: 'Strong partnerships with 450+ leading companies across various industries.',
    color: 'bg-blue-600',
    icon: Network,
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '03',
    title: 'Pan-India Presence',
    stat: '25+',
    sub: 'States',
    desc: 'Operations spanning 25+ states ensuring nationwide coverage and support.',
    color: 'bg-blue-600',
    icon: MapPin,
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '04',
    title: 'Rapid Deployment',
    stat: '48hrs',
    sub: 'Deployment',
    desc: 'Quick turnaround time with workers deployed within 48-72 hours of request.',
    color: 'bg-orange-600',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '05',
    title: 'Quality Assured',
    stat: '98%',
    sub: 'Satisfaction',
    desc: 'Rigorous screening and training programs ensure top-quality workforce delivery.',
    color: 'bg-blue-600',
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '06',
    title: 'Growth Partner',
    stat: '3x',
    sub: 'Growth',
    desc: 'We scale with your business, providing flexible staffing solutions.',
    color: 'bg-orange-600',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  },
];

const colorClassToHex = {
  'bg-orange-600': '#F97316',
  'bg-blue-600': '#2563EB',
  'bg-slate-900': '#0F172A',
};

const resolveColorHex = (colorValue = '') => {
  const value = String(colorValue).trim();
  if (!value) return '#2563EB';
  if (value.startsWith('#')) return value;
  if (value.startsWith('rgb') || value.startsWith('hsl')) return value;
  if (colorClassToHex[value]) return colorClassToHex[value];
  return '#2563EB';
};

const buildCardTintStyle = (colorValue, isHovered) => {
  const accent = resolveColorHex(colorValue);
  return {
    backgroundColor: isHovered ? `${accent}1A` : 'transparent',
    borderColor: isHovered ? `${accent}40` : 'rgba(255,255,255,0.05)',
    willChange: 'flex',
  };
};

const buildAccentPillStyle = (colorValue, isHovered) => {
  const accent = resolveColorHex(colorValue);
  return {
    backgroundColor: isHovered ? accent : 'rgba(255,255,255,0.1)',
    color: '#ffffff',
  };
};

export default function StrengthsAccordion() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [strengths, setStrengths] = useState(fallbackStrengths);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadStrengths = async () => {
      setLoading(true);
      const data = await fetchStrengths();
      if (data.length > 0) {
        setStrengths(data.map((item, index) => ({
          id: String(index + 1).padStart(2, '0'),
          title: item.title || '',
          stat: item.stat || '',
          sub: item.sub || '',
          desc: item.description || '',
          color: item.color || fallbackStrengths[index]?.color || 'bg-blue-600',
          icon: fallbackStrengths[index]?.icon || Star,
          image: item.image ? extractMediaUrl(item.image) : fallbackStrengths[index]?.image || '',
        })));
      }
      setLoading(false);
    };
    loadStrengths();
  }, []);

  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-[#0A0A0B] px-4 sm:px-6 py-6 lg:py-12 lg:min-h-[600px]">
      {/* Mesh Gradient Background - Reduced blur on mobile */}
      <div className="absolute inset-0 opacity-20 lg:opacity-30 mix-blend-screen pointer-events-none">
        <div
          className="absolute -top-[30%] -left-[20%] w-[100%] h-[100%] sm:w-[70%] sm:h-[70%] rounded-full bg-[#2563EB] blur-[40px] sm:blur-[80px]"
          style={{ willChange: 'transform, opacity' }}
        />
        <div
          className="absolute top-[50%] -right-[30%] w-[100%] h-[100%] sm:w-[60%] sm:h-[60%] rounded-full bg-[#F97316] blur-[40px] sm:blur-[80px]"
          style={{ willChange: 'transform, opacity' }}

        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mb-4 lg:mb-10 text-center lg:text-left">
          <div className="mb-2 lg:mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 lg:px-4 lg:py-2 backdrop-blur-md">
            <span className="h-1.5 lg:h-2 w-1.5 lg:w-2 rounded-full bg-[#FB923C] animate-pulse" />
            <span className="text-[11px] lg:text-xs font-bold tracking-widest text-[#FB923C] uppercase">Why Choose Us</span>
          </div>
          <h2 className="mb-2 lg:mb-3 text-3xl sm:text-3xl lg:text-5xl font-extrabold text-white tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#FB923C]">Strengths</span>
          </h2>
          <p className="font-medium text-sm sm:text-sm lg:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0">
            Explore how we empower businesses with rapid deployment, unparalleled network, and guaranteed quality.
          </p>
        </div>

        {/* Mobile: Grid Layout, Desktop: Flex Horizontal */}
        <div className="w-full">
          {isMobile ? (
            // Mobile Grid Layout - Optimized for low-end devices
            <div className="grid grid-cols-1 gap-2">
              {strengths.map((item, index) => {
                const Icon = item.icon || Star;
                return (
                  <motion.div
                    key={item.id}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                    whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: prefersReducedMotion ? 0.1 : 0.25, delay: prefersReducedMotion ? 0 : index * 0.02 }}
                    className="relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                  >
                    <div className="relative z-10 p-4 sm:p-4">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex flex-col gap-2">
                          <span className="text-base font-black text-white/80">{item.id}</span>
                          <Icon className="h-4 w-4 text-white/50" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-bold text-white leading-tight">{item.title}</h3>
                        </div>
                      </div>

                      {/* Stat */}
                      <div className="mb-2">
                        <p className="text-3xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#FB923C]">
                          {item.stat}
                        </p>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-[#93C5FD]">{item.sub}</p>
                      </div>


                      {/* Description */}
                      <p className="text-sm text-white/75 line-clamp-2 mb-2">{item.desc}</p>

                      {/* CTA Button */}
                      <Link
                        to="/achiment"
                        aria-label={`Explore details for ${item.title}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20 active:bg-white/30"
                      >
                        Explore
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            // Desktop Horizontal Accordion - Original behavior
            <div className="flex h-[450px] lg:h-[500px] w-full flex-row gap-3">
              {strengths.map((item, index) => {
                const Icon = item.icon || Star;
                return (
                  <motion.div
                    key={item.id}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.28 }}
                    transition={{ duration: prefersReducedMotion ? 0.15 : 0.35, delay: prefersReducedMotion ? 0 : index * 0.03, ease: [0.22, 1, 0.36, 1] }}
                    
                    className={`relative cursor-pointer min-w-0 min-h-0 overflow-hidden rounded-2xl border transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] transform-gpu ${
                      hoveredIndex === index 
                        ? 'flex-[4] border-transparent shadow-[0_0_40px_rgba(37,99,235,0.15)]' 
                        : 'flex-[1] bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10'
                    }`}
                    style={hoveredIndex === index ? buildCardTintStyle(item.color, true) : { willChange: 'flex' }}
                  >
                    
                    <div 
                      className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                      style={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    >
                      <motion.img
                        initial={false}
                        animate={{ scale: hoveredIndex === index ? 1 : 1.1 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover opacity-[0.35]"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/60 to-transparent" />
                      <div
                        className={`pointer-events-none absolute right-0 top-0 h-full w-2/3 opacity-30 ${item.color} mix-blend-overlay blur-3xl`}
                      />
                    </div>

                    {/* Content Container */}
                    <div className="relative z-10 flex h-full flex-col justify-between px-5 py-5 lg:px-6 lg:py-6">
                      {/* Top Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-3">
                          <span className={`text-lg lg:text-xl font-black transition-colors duration-500 ${hoveredIndex === index ? 'text-white' : 'text-white/55'}`}>
                            {item.id}
                          </span>
                          <div className={`transition-opacity duration-300 hidden lg:block ${hoveredIndex !== index ? 'opacity-100' : 'opacity-0'}`}>
                            <Icon className="h-5 w-5 text-white/55" />
                          </div>
                        </div>
                        
                        {hoveredIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg"
                            style={buildAccentPillStyle(item.color, true)}
                          >
                            <Icon size={22} strokeWidth={2.5} />
                          </motion.div>
                        )}
                      </div>

                      {/* Large Stat (Middle) */}
                      <div
                        className={`transition-all duration-500 ${
                          hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 lg:translate-y-0'
                        }`}
                      >
                        <p
                          className={`font-black leading-none transition-all duration-500 ${
                            hoveredIndex === index
                              ? 'text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 drop-shadow-lg'
                              : 'text-2xl lg:text-3xl text-white/50 lg:-rotate-90 origin-left'
                          }`}
                        >
                          {item.stat}
                        </p>
                        <p
                          className={`mt-2 font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                            hoveredIndex === index ? 'text-xs lg:text-sm text-[#93C5FD]' : 'hidden'
                          }`}
                        >
                          {item.sub}
                        </p>
                      </div>

                      {/* Bottom Text & Link */}
                      <div className="relative z-10">
                        <h3
                          className={`whitespace-nowrap font-black transition-all duration-500 ${
                            hoveredIndex === index
                              ? 'mb-3 text-2xl lg:text-3xl text-white drop-shadow-md'
                              : 'text-lg lg:text-xl text-white/60 lg:origin-left lg:-rotate-90 lg:translate-x-10 lg:-translate-y-6'
                          }`}
                        >
                          {item.title}
                        </h3>

                        {hoveredIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                          >
                            <p className="mb-4 text-sm lg:text-base max-w-md leading-relaxed text-white/80 font-medium line-clamp-2">
                              {item.desc}
                            </p>
                            <Link
                              to="/achiment"
                              className="group inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm lg:text-base font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20"
                            >
                              Explore Details
                              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                            </Link>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}