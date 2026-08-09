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
    highlight: '100%',
    subtext: 'Compliant',
    pill: 'Official Partner',
    title: 'Government Authorized',
    description: 'Compliant with all norms',
    tag: 'Verified & Recognized',
    glow: 'rgba(247,213,75,0.25)',
    colorClass: 'text-[#f7d54b]',
    titleClass: 'text-white',
    descClass: 'text-slate-400',
    bulletClass: 'text-slate-300',
    checkClass: 'text-[#f7d54b]',
    pillClass: 'bg-[#f7d54b]/15 border-[#f7d54b]/30 text-[#f7d54b]',
    bgGradient: 'from-slate-900 via-slate-950 to-slate-950 group-hover:from-slate-900 group-hover:via-slate-950 group-hover:to-slate-950',
    borderColor: 'border-slate-800/80 group-hover:border-[#f7d54b]',
    iconBg: 'bg-[#f7d54b]/10 text-[#f7d54b]',
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
    tag: 'Verified & Recognized',
    glow: 'rgba(247,213,75,0.25)',
    colorClass: 'text-[#f7d54b]',
    titleClass: 'text-white',
    descClass: 'text-slate-400',
    bulletClass: 'text-slate-300',
    checkClass: 'text-[#f7d54b]',
    pillClass: 'bg-[#f7d54b]/15 border-[#f7d54b]/30 text-[#f7d54b]',
    bgGradient: 'from-slate-900 via-slate-950 to-slate-950 group-hover:from-slate-900 group-hover:via-slate-950 group-hover:to-slate-950',
    borderColor: 'border-slate-800/80 group-hover:border-[#f7d54b]',
    iconBg: 'bg-[#f7d54b]/10 text-[#f7d54b]',
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
    tag: 'Verified & Recognized',
    glow: 'rgba(247,213,75,0.25)',
    colorClass: 'text-[#f7d54b]',
    titleClass: 'text-white',
    descClass: 'text-slate-400',
    bulletClass: 'text-slate-300',
    checkClass: 'text-[#f7d54b]',
    pillClass: 'bg-[#f7d54b]/15 border-[#f7d54b]/30 text-[#f7d54b]',
    bgGradient: 'from-slate-900 via-slate-950 to-slate-950 group-hover:from-slate-900 group-hover:via-slate-950 group-hover:to-slate-950',
    borderColor: 'border-slate-800/80 group-hover:border-[#f7d54b]',
    iconBg: 'bg-[#f7d54b]/10 text-[#f7d54b]',
    bulletPoints: [
      'Excellence in skilling mission award 2024',
      'State Human Resource Federation honors',
      'Leading emerging service provider accolade'
    ]
  },
  {
    id: 'satisfaction',
    icon: Star,
    highlight: '100%',
    subtext: 'Satisfaction',
    pill: 'ISO 9001',
    title: 'ISO Certified',
    description: 'Satisfaction rate',
    tag: 'Verified & Recognized',
    glow: 'rgba(247,213,75,0.25)',
    colorClass: 'text-[#f7d54b]',
    titleClass: 'text-white',
    descClass: 'text-slate-400',
    bulletClass: 'text-slate-300',
    checkClass: 'text-[#f7d54b]',
    pillClass: 'bg-[#f7d54b]/15 border-[#f7d54b]/30 text-[#f7d54b]',
    bgGradient: 'from-slate-900 via-slate-950 to-slate-950 group-hover:from-slate-900 group-hover:via-slate-950 group-hover:to-slate-950',
    borderColor: 'border-slate-800/80 group-hover:border-[#f7d54b]',
    iconBg: 'bg-[#f7d54b]/10 text-[#f7d54b]',
    bulletPoints: [
      'ISO 9001:2015 premium quality standard',
      'Dedicated client resolution within 24 hours',
      '99.4% annual client retention quotient'
    ]
  }
];

const AwardsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="achievements" className="relative overflow-hidden bg-transparent py-24 px-4 sm:px-6 lg:px-8">
      {/* Dynamic Background Textures & Glows */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-blue-200/20 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[28rem] h-[28rem] bg-orange-200/15 rounded-full blur-[130px] pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl">
        {/* Creative Title & Intro */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 shadow-sm">
            <Sparkles className="h-4 w-4 text-orange-500 animate-pulse" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
              Verified Excellence
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-[#0f2a4d] tracking-tight leading-tight">
            Key{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-600">
              Accomplishments & Standards
            </span>
          </h2>
          <p className="text-base font-semibold text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Delivering authenticated results across compliance, industry recognition, and client satisfaction nationwide.
          </p>
        </div>

        {/* Redesigned Card Layout */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {awardsData.map((award, index) => {
            const IconComponent = award.icon;
            return (
              <div
                key={award.id}
                className={`group relative overflow-hidden rounded-[28px] border bg-gradient-to-b ${award.bgGradient} p-8 shadow-[0_10px_30px_rgba(15,42,77,0.03)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_24px_50px_rgba(15,42,77,0.12)] ${award.borderColor} flex flex-col justify-between transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Radial Glow Highlight */}
                <div 
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-[40px]" 
                  style={{ backgroundColor: award.glow }}
                />

                {/* Holographic sweep-shine reflection */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out pointer-events-none z-20" />

                <div className="relative z-10">
                  {/* Icon & Big Stat Row */}
                  <div className="flex items-start justify-between mb-8">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${award.iconBg} transition-all duration-500 group-hover:scale-110 shadow-sm shrink-0`}>
                      <IconComponent className="h-7 w-7" />
                    </div>
                    <div className="text-right">
                      <div className={`text-5xl font-black tracking-tighter transition-colors duration-500 ${award.colorClass}`}>
                        {award.highlight}
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1.5 transition-colors duration-500">
                        {award.subtext}
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    <span className={`rounded-md border px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider transition-all duration-500 ${award.pillClass}`}>
                      {award.pill}
                    </span>
                    <span className="rounded-md bg-slate-900 border border-slate-900 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white transition-all duration-500">
                      {award.title}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className={`text-lg font-extrabold mb-1.5 transition-colors duration-500 ${award.titleClass}`}>
                    {award.description}
                  </h3>

                  {/* Bullet points */}
                  <div className="space-y-3.5 mb-6 border-t border-slate-100/80 group-hover:border-slate-200 pt-5 transition-all duration-500">
                    {award.bulletPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 mt-0.5 transition-colors duration-500 ${award.checkClass}`} />
                        <span className={`text-[13px] font-bold leading-snug transition-colors duration-500 ${award.bulletClass}`}>
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
