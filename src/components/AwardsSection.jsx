import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Trophy, 
  Award, 
  Star, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

const awardsData = [
  {
    id: 'compliant',
    icon: Shield,
    highlight: '100%+',
    subtext: 'Compliant',
    pill: 'Official Partner',
    title: 'Government Authorized',
    description: 'Compliant with all norms',
    tag: '✓ Verified & Recognized',
    glow: 'rgba(249,115,22,0.08)',
    color: '#F97316',
    percentage: 100,
    bulletPoints: [
      'Official Ministry of Skill Dev TPA partner',
      'Comprehensive PF & ESIC statutory audits',
      'Automated Government DBT portal checks'
    ]
  },
  {
    id: 'world-record',
    icon: Trophy,
    highlight: '#1',
    subtext: 'In India',
    pill: 'World Record',
    title: 'World Record Holder',
    description: 'Recognized globally',
    tag: '✓ Verified & Recognized',
    glow: 'rgba(37,99,235,0.08)',
    color: '#2563EB',
    percentage: 98,
    bulletPoints: [
      'Honored in Delhi World Book of Records',
      'Top Ranking Third Party Aggregator',
      '40,000+ certified placements nationwide'
    ]
  },
  {
    id: 'awards',
    icon: Award,
    highlight: '15%+',
    subtext: 'Awards',
    pill: '2024 Winner',
    title: 'Excellence Award',
    description: 'Awards for contribution',
    tag: '✓ Verified & Recognized',
    glow: 'rgba(168,85,247,0.08)',
    color: '#A855F7',
    percentage: 85,
    bulletPoints: [
      'Excellence in skilling mission award 2024',
      'State Human Resource Federation honors',
      'Leading emerging service provider accolade'
    ]
  },
  {
    id: 'satisfaction',
    icon: Star,
    highlight: '100%+',
    subtext: 'Satisfaction',
    pill: 'ISO 9001',
    title: 'ISO Certified',
    description: 'Satisfaction rate',
    tag: '✓ Verified & Recognized',
    glow: 'rgba(16,185,129,0.08)',
    color: '#10B981',
    percentage: 100,
    bulletPoints: [
      'ISO 9001:2015 premium quality standard',
      'Dedicated client resolution within 24 hours',
      '99.4% annual client retention quotient'
    ]
  }
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
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
            <Sparkles className="h-4 w-4 text-blue-600 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-sm font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 uppercase tracking-wider">
              Industry Recognition
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 tracking-tight">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0f2a4d] via-[#1a4f87] to-orange-500">Recognition & Awards</span>
          </h2>
          <p className="text-lg font-medium text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Celebrating excellence and global recognition for innovation, compliance, and outstanding service.
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {awardsData.map((award, index) => {
            const IconComponent = award.icon;
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative overflow-hidden rounded-[2.2rem] border border-slate-200/50 bg-white/95 p-6 shadow-xl shadow-slate-100/20 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/5 flex flex-col justify-between transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Card Glow Highlight */}
                <div 
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-3xl" 
                  style={{ backgroundColor: award.glow }}
                />
                
                {/* Holographic sweep-shine reflection */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-out pointer-events-none z-20" />

                <div>
                  {/* Top Row: Icon + Highlight + SVG Meter */}
                  <div className="mb-4 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <div 
                        className="flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 shadow-md shrink-0 text-white"
                        style={{ backgroundColor: award.color + '20', border: `1.5px solid ${award.color}40` }}
                      >
                        <IconComponent className="h-5 w-5" style={{ color: award.color }} />
                      </div>
                      <div className="flex flex-col leading-none">
                        <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#0f2a4d] to-[#FF8C00] lg:text-4xl tracking-tight">
                          {award.highlight}
                        </span>
                        <span className="text-xs font-black uppercase tracking-wider text-slate-400 mt-1">
                          {award.subtext}
                        </span>
                      </div>
                    </div>

                    {/* Dynamic SVG Meter */}
                    <div className="relative h-12 w-12 shrink-0">
                      <svg className="h-full w-full -rotate-90">
                        <circle cx="24" cy="24" r="19" className="stroke-slate-100 fill-none" strokeWidth="2.5" />
                        <circle 
                          cx="24" 
                          cy="24" 
                          r="19" 
                          className="transition-all duration-1000 ease-out fill-none"
                          strokeWidth="3" 
                          stroke={award.color}
                          strokeDasharray="119.38"
                          strokeDashoffset={119.38 - (119.38 * award.percentage) / 100}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-slate-700">
                        {award.id === 'world-record' ? 'Rank' : `${award.percentage}%`}
                      </span>
                    </div>
                  </div>

                  {/* Pill Stack / Tag */}
                  <div className="mb-4 flex flex-wrap gap-1.5 relative z-10">
                    <span className="rounded-full px-2.5 py-0.5 text-[8.5px] font-black uppercase tracking-wider border bg-orange-50 border-orange-100/50 text-[#FF8C00]">
                      {award.pill}
                    </span>
                    <span className="rounded-full px-2.5 py-0.5 text-[8.5px] font-black uppercase tracking-wider border bg-blue-50 border-blue-100/50 text-[#1a4f87]">
                      {award.title}
                    </span>
                  </div>

                  {/* Description text */}
                  <p className="text-xs font-black text-[#0f2a4d] mb-4 relative z-10">
                    {award.description}
                  </p>

                  {/* Detailed Checks */}
                  <div className="space-y-2 mb-4 border-t border-slate-100 pt-4 relative z-10">
                    {award.bulletPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                          <CheckCircle2 className="h-2.5 w-2.5" />
                        </span>
                        <span className="text-[11px] font-medium text-slate-500 leading-snug">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Verified Tag */}
                <div className="mt-auto border-t border-slate-100 pt-3 flex items-center justify-between relative z-10">
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-emerald-600 border border-emerald-100/30 shadow-sm shadow-emerald-100/20">
                    {award.tag}
                  </span>
                  <Sparkles size={11} className="text-amber-400 animate-pulse" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom accent */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100/80 border border-slate-200/50 shadow-sm">
            <span className="text-sm font-medium text-slate-600">
              Trusted by <span className="font-black text-[#0f2a4d]">450+ companies</span> across India
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
