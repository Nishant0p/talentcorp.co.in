import React, { useState, useEffect } from 'react';
import { ShieldCheck, Trophy, Award, CheckCircle, Sparkles, Star } from 'lucide-react';

const awardsData = [
  {
    icon: ShieldCheck,
    highlight: '100%+',
    subtext: 'Compliant',
    pill: 'Official Partner',
    title: 'Government Authorized',
    description: 'Compliant with all norms',
    gradient: 'from-blue-600 to-blue-400',
    bgGradient: 'from-blue-50 to-cyan-50',
    iconColor: 'text-blue-600',
    accentColor: 'bg-blue-100',
  },
  {
    icon: Trophy,
    highlight: '#1',
    subtext: 'In India',
    pill: 'World Record',
    title: 'World Record Holder',
    description: 'Recognized globally',
    gradient: 'from-amber-600 to-amber-400',
    bgGradient: 'from-amber-50 to-orange-50',
    iconColor: 'text-amber-600',
    accentColor: 'bg-amber-100',
  },
  {
    icon: Award,
    highlight: '15%+',
    subtext: 'Awards',
    pill: '2024 Winner',
    title: 'Excellence Award',
    description: 'Awards for contribution',
    gradient: 'from-purple-600 to-purple-400',
    bgGradient: 'from-purple-50 to-pink-50',
    iconColor: 'text-purple-600',
    accentColor: 'bg-purple-100',
  },
  {
    icon: CheckCircle,
    highlight: '100%+',
    subtext: 'Satisfaction',
    pill: 'ISO 9001',
    title: 'ISO Certified',
    description: 'Satisfaction rate',
    gradient: 'from-emerald-600 to-emerald-400',
    bgGradient: 'from-emerald-50 to-teal-50',
    iconColor: 'text-emerald-600',
    accentColor: 'bg-emerald-100',
  },
];

const AwardsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="achievements" className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white px-4 py-16 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Industry Recognition
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500">Recognition & Awards</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrating excellence and global recognition for innovation, compliance, and outstanding service
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {awardsData.map((award, index) => {
            const IconComponent = award.icon;
            return (
              <article
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative flex flex-col overflow-hidden rounded-3xl transition-all duration-500 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${hoveredIndex === index ? 'scale-105 -translate-y-2' : 'hover:scale-102'}`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${award.bgGradient}`} />
                
                {/* Card Border Gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/20 to-transparent rounded-3xl" />

                {/* Shadow enhancement on hover */}
                <div className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                  hoveredIndex === index 
                    ? `shadow-2xl shadow-${award.gradient.split('-')[1]}-500/40` 
                    : 'shadow-lg shadow-gray-400/10'
                }`} />

                {/* Top accent line */}
                <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${award.gradient} transition-all duration-500 group-hover:h-1.5`} />

                {/* Content */}
                <div className="relative z-10 p-8 flex flex-col h-full">
                  {/* Icon Container */}
                  <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 ${
                    hoveredIndex === index 
                      ? `bg-gradient-to-br ${award.gradient} shadow-lg` 
                      : `bg-gradient-to-br ${award.gradient} bg-opacity-10 border border-gray-200`
                  }`}>
                    <IconComponent className={`h-8 w-8 transition-all duration-500 ${
                      hoveredIndex === index ? 'text-white scale-110 rotate-12' : award.iconColor
                    }`} />
                  </div>

                  {/* Highlight number and subtext */}
                  <div className="mb-4 flex items-baseline gap-2">
                    <span className={`text-5xl font-extrabold tracking-tight transition-all duration-500 bg-clip-text text-transparent bg-gradient-to-r ${award.gradient}`}>
                      {award.highlight}
                    </span>
                    {award.subtext && (
                      <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">
                        {award.subtext}
                      </span>
                    )}
                  </div>

                  {/* Pill / Tag */}
                  <div className="mb-5 flex">
                    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest transition-all duration-500 bg-gradient-to-r ${award.gradient} text-white`}>
                      <Star className="h-3 w-3" />
                      {award.pill}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <h3 className="mb-3 text-xl font-bold text-gray-900 leading-tight group-hover:text-gray-900 transition-colors">
                    {award.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 group-hover:text-gray-700 transition-colors flex-grow">
                    {award.description}
                  </p>

                  {/* Bottom accent */}
                  <div className="mt-4 pt-4 border-t border-gray-300/30 group-hover:border-gray-400 transition-colors">
                    <div className={`text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r ${award.gradient} group-hover:opacity-100 opacity-70 transition-opacity`}>
                      ✓ Verified & Recognized
                    </div>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${award.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500 -z-10`} />
              </article>
            );
          })}
        </div>

        {/* Bottom accent */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
            <span className="text-sm text-gray-600">
              Trusted by <span className="font-bold text-gray-900">450+ companies</span> across India
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
