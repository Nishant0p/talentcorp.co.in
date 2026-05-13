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
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800', // Hard hats / workers
  },
  {
    id: '02',
    title: 'Partner Network',
    stat: '450+',
    sub: 'Partners',
    desc: 'Strong partnerships with 450+ leading companies across various industries.',
    color: 'bg-blue-600',
    icon: Network,
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800', // Corporate handshake/meeting
  },
  {
    id: '03',
    title: 'Pan-India Presence',
    stat: '25+',
    sub: 'States',
    desc: 'Operations spanning 25+ states ensuring nationwide coverage and support.',
    color: 'bg-blue-600',
    icon: MapPin,
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800', // Maps/Navigation
  },
  {
    id: '04',
    title: 'Rapid Deployment',
    stat: '48hrs',
    sub: 'Deployment',
    desc: 'Quick turnaround time with workers deployed within 48-72 hours of request.',
    color: 'bg-orange-600',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=800', // Logistics/Fast movement
  },
  {
    id: '05',
    title: 'Quality Assured',
    stat: '98%',
    sub: 'Satisfaction',
    desc: 'Rigorous screening and training programs ensure top-quality workforce delivery.',
    color: 'bg-blue-600',
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800', // Quality inspection
  },
  {
    id: '06',
    title: 'Growth Partner',
    stat: '3x',
    sub: 'Growth',
    desc: 'We scale with your business, providing flexible staffing solutions.',
    color: 'bg-orange-600',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', // Business growth graph
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
  const prefersReducedMotion = useReducedMotion();

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
    <section className="relative flex flex-col justify-center overflow-hidden bg-[#0A0A0B] px-6 py-12 lg:h-[100svh] lg:min-h-[750px]">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-[#2563EB] blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[40%] -right-[20%] w-[60%] h-[60%] rounded-full bg-[#F97316] blur-[120px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mb-8 lg:mb-12 text-center lg:text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#F97316] animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-[#F97316] uppercase">Why Choose Us</span>
          </div>
          <h2 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#F97316]">Strengths</span>
          </h2>
          <p className="font-medium text-base lg:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0">
            Hover over each section to explore how we empower businesses with rapid deployment, unparalleled network, and guaranteed quality.
          </p>
        </div>

        <div className="flex h-[600px] w-full flex-col gap-3 lg:h-full lg:max-h-[55vh] lg:flex-row">
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
                className={`relative cursor-pointer overflow-hidden rounded-[2rem] border transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  hoveredIndex === index 
                    ? 'flex-[4] border-transparent shadow-[0_0_40px_rgba(37,99,235,0.15)]' 
                    : 'flex-[1] bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10'
                }`}
                style={hoveredIndex === index ? buildCardTintStyle(item.color, true) : {}}
              >
                {/* Active State Backgrounds */}
                {hoveredIndex === index && (
                  <>
                    <motion.img
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover opacity-[0.35]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/60 to-transparent" />
                    <div
                      className={`pointer-events-none absolute right-0 top-0 h-full w-2/3 opacity-30 ${item.color} mix-blend-overlay blur-3xl`}
                    />
                  </>
                )}

                {/* Content Container */}
                <div className="relative z-10 flex h-full flex-col justify-between px-6 py-6 lg:px-8 lg:py-8">
                  {/* Top Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-4">
                      <span className={`text-xl font-black transition-colors duration-500 ${hoveredIndex === index ? 'text-white' : 'text-white/30'}`}>
                        {item.id}
                      </span>
                      {hoveredIndex !== index && (
                        <Icon className="h-6 w-6 text-white/30 hidden lg:block" />
                      )}
                    </div>
                    
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
                        style={buildAccentPillStyle(item.color, true)}
                      >
                        <Icon size={26} strokeWidth={2.5} />
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
                          ? 'text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 drop-shadow-lg'
                          : 'text-3xl text-white/20 lg:-rotate-90 origin-left'
                      }`}
                    >
                      {item.stat}
                    </p>
                    <p
                      className={`mt-3 font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                        hoveredIndex === index ? 'text-sm text-[#60A5FA]' : 'hidden'
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
                          ? 'mb-4 text-3xl lg:text-4xl text-white drop-shadow-md'
                          : 'text-xl text-white/40 lg:origin-left lg:-rotate-90 lg:translate-x-12 lg:-translate-y-8'
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
                        <p className="mb-6 max-w-md leading-relaxed text-white/80 font-medium">{item.desc}</p>
                        <Link
                          to="/achiment"
                          className="group inline-flex items-center gap-3 rounded-xl bg-white/10 px-5 py-3 font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20"
                        >
                          Explore Details
                          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
