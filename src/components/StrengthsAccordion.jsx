import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
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
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '02',
    title: 'Partner Network',
    stat: '400+',
    sub: 'Partners',
    desc: 'Strong partnerships with 400+ leading companies across various industries.',
    color: 'bg-blue-600',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '03',
    title: 'Pan-India Presence',
    stat: '25+',
    sub: 'States',
    desc: 'Operations spanning 25+ states ensuring nationwide coverage and support.',
    color: 'bg-blue-600',
    image: 'https://images.unsplash.com/photo-1553531088-18a882b8ffff?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '04',
    title: 'Rapid Deployment',
    stat: '48hrs',
    sub: 'Deployment',
    desc: 'Quick turnaround time with workers deployed within 48-72 hours of request.',
    color: 'bg-orange-600',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '05',
    title: 'Quality Assured',
    stat: '98%',
    sub: 'Satisfaction',
    desc: 'Rigorous screening and training programs ensure top-quality workforce delivery.',
    color: 'bg-blue-600',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '06',
    title: 'Growth Partner',
    stat: '3x',
    sub: 'Growth',
    desc: 'We scale with your business, providing flexible staffing solutions.',
    color: 'bg-orange-600',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=800',
  },
];

const colorClassToHex = {
  'bg-orange-600': '#ea580c',
  'bg-blue-600': '#2563eb',
  'bg-slate-900': '#0f172a',
};

const resolveColorHex = (colorValue = '') => {
  const value = String(colorValue).trim();
  if (!value) return '#2563eb';
  if (value.startsWith('#')) return value;
  if (value.startsWith('rgb') || value.startsWith('hsl')) return value;
  if (colorClassToHex[value]) return colorClassToHex[value];
  return '#2563eb';
};

const buildCardTintStyle = (colorValue, isHovered) => {
  const accent = resolveColorHex(colorValue);
  return {
    backgroundColor: isHovered ? `${accent}2f` : `${accent}20`,
  };
};

const buildAccentPillStyle = (colorValue, isHovered) => {
  const accent = resolveColorHex(colorValue);
  return {
    backgroundColor: isHovered ? 'rgba(255,255,255,0.96)' : `${accent}1f`,
    color: isHovered ? accent : '#1f2937',
  };
};

export default function StrengthsAccordion() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [strengths, setStrengths] = useState(fallbackStrengths);
  const [loading, setLoading] = useState(true);

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
          image: item.image ? extractMediaUrl(item.image) : fallbackStrengths[index]?.image || '',
        })));
      }
      setLoading(false);
    };
    loadStrengths();
  }, []);

  return (
    <section className="relative overflow-hidden bg-white px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h2 className="mb-4 text-5xl font-extrabold text-[#1a2b4b]">
            Our <span className="text-blue-600">Strengths</span>
          </h2>
          <p className="font-medium text-gray-500">
            Hover over each section to explore how we empower businesses.
          </p>
        </div>

        <div className="flex h-auto w-full flex-col gap-2 overflow-hidden lg:h-[450px] lg:flex-row">
          {strengths.map((item, index) => (
            <motion.div
              key={item.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 68 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`relative cursor-pointer overflow-hidden rounded-3xl border border-gray-100 bg-[#f8f9fa] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                hoveredIndex === index ? 'lg:flex-[4]' : 'lg:flex-[1]'
              } ${
                hoveredIndex !== null && hoveredIndex !== index ? 'opacity-50 grayscale' : 'opacity-100'
              }`}
              style={buildCardTintStyle(item.color, hoveredIndex === index)}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${resolveColorHex(item.color)}1a 0%, transparent 58%, ${resolveColorHex(item.color)}12 100%)`,
                }}
              />
              {hoveredIndex === index && (
                <>
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent" />
                  <div
                    className={`clip-path-custom pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-5 ${item.color}`}
                  />
                </>
              )}
              <div className="relative z-10 flex h-full flex-col justify-between px-6 py-5">
                <div className="flex items-start justify-between">
                  <span className={`text-xl font-black transition-all duration-500 ${hoveredIndex === index ? 'text-white drop-shadow-lg' : 'text-gray-300'}`}>{item.id}</span>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-full p-3 shadow-lg"
                      style={buildAccentPillStyle(item.color, hoveredIndex === index)}
                    >
                      <ArrowUpRight size={24} />
                    </motion.div>
                  )}
                </div>

                <div
                  className={`transition-all duration-500 ${
                    hoveredIndex === index ? 'translate-y-0' : 'translate-y-2 lg:translate-y-0'
                  }`}
                >
                  <p
                    className={`font-black leading-none transition-all duration-500 ${
                      hoveredIndex === index
                        ? 'text-5xl text-white drop-shadow-lg'
                        : 'text-3xl text-gray-400 lg:-rotate-90'
                    }`}
                  >
                    {item.stat}
                  </p>
                  <p
                    className={`mt-1 font-bold uppercase tracking-widest transition-all duration-500 ${
                      hoveredIndex === index ? 'text-sm text-white/90 drop-shadow-md' : 'hidden'
                    }`}
                  >
                    {item.sub}
                  </p>
                </div>

                <div className="relative z-10">
                  <h3
                    className={`whitespace-nowrap font-black transition-all duration-500 ${
                      hoveredIndex === index
                        ? 'mb-2 text-3xl text-white drop-shadow-lg'
                        : 'text-lg text-gray-500 lg:origin-left lg:-rotate-90 lg:translate-x-6'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="mb-3 max-w-md leading-relaxed text-white/90 drop-shadow-md font-medium">{item.desc}</p>
                      <Link
                        to="/achiment"
                        className="group inline-flex items-center gap-2 font-black text-white drop-shadow-md transition-colors hover:text-orange-300"
                      >
                        Learn More
                        <span className="transition-transform group-hover:translate-x-1">{'->'}</span>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>

              {hoveredIndex === index && (
                <div
                  className={`clip-path-custom pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-5 ${item.color}`}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media (min-width: 1024px) {
            .clip-path-custom {
              clip-path: polygon(100% 0, 0% 0, 50% 50%, 0% 100%, 100% 100%);
            }
          }
        `,
        }}
      />
    </section>
  );
}
