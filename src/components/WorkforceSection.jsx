import React, { useEffect, useState } from 'react';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { fetchWorkforceCards, extractMediaUrl } from '../utils/strapi';

const DEFAULT_WORKFORCE_CARDS = [
  {
    cardType: 'job-seeker',
    eyebrow: 'FOR JOB SEEKERS',
    title: 'Launch Your Career',
    highlight: 'Career',
    description: 'Access top job opportunities and grow your career.',
    buttonLabel: 'Find Jobs',
    buttonLink: '/jobs',
    points: [
      'Get access to verified job openings quickly.',
      'We manage all compliance part for you.',
      'Build long-term growth with trusted employers.',
    ],
    image: 'https://backend.tsplgroup.in/uploads/first_2_2d6bb37164.png',
    imageMedia: null,
  },
  {
    cardType: 'employer',
    eyebrow: 'FOR CLIENTS',
    title: 'Build Your Team',
    highlight: 'Team',
    description: 'Recruit high-quality manpower with operational support.',
    buttonLabel: 'Hire Talent',
    buttonLink: '/contact-us',
    points: [
      'Find pre-screened people, fast.',
      'We manage all paperwork for you.',
      'Find flexible staff just for you.',
    ],
    image: 'https://backend.tsplgroup.in/uploads/recruitmentwala_photo_2_cf5fa294aa.jpeg',
    imageMedia: null,
  },
];

const normalizePoints = (points, fallbackPoints = []) => {
  if (Array.isArray(points)) {
    const rows = points.map((item) => String(item || '').trim()).filter(Boolean);
    return rows.length ? rows : fallbackPoints;
  }

  const rows = String(points || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

  return rows.length ? rows : fallbackPoints;
};

function WorkforcePanel({ card, index }) {
  const isEmployee = index === 0;
  const tone = isEmployee
    ? {
        shell: 'from-orange-50/50 via-white to-white',
        glow: 'bg-orange-200/50',
        chip: 'bg-[#FF8C00] text-white',
        text: 'text-[#FF8C00]',
        button: 'from-[#FF8C00] to-orange-600 shadow-orange-500/20 hover:shadow-orange-500/35 hover:from-orange-600 hover:to-orange-700',
        border: 'border-orange-100/70 hover:border-orange-300/60',
        accent: 'bg-[radial-gradient(circle_at_top_right,_rgba(255,140,0,0.12),_transparent_50%)]',
        accentLight: 'bg-orange-50/40 border-orange-100/50',
        badgeText: 'Seeker Hub',
        metricVal: '15,000+',
        metricSub: 'Verified Openings',
        statusText: 'Hiring',
        accentColor: '#FF8C00'
      }
    : {
        shell: 'from-blue-50/50 via-white to-white',
        glow: 'bg-blue-200/50',
        chip: 'bg-[#1a4f87] text-white',
        text: 'text-[#1a4f87]',
        button: 'from-[#1a4f87] to-[#0f2a4d] shadow-blue-900/25 hover:shadow-blue-900/40 hover:from-[#143e6a] hover:to-[#0b1e36]',
        border: 'border-blue-100/70 hover:border-blue-300/60',
        accent: 'bg-[radial-gradient(circle_at_top_left,_rgba(26,79,135,0.12),_transparent_50%)]',
        accentLight: 'bg-blue-50/40 border-blue-100/50',
        badgeText: 'CLIENT SIDE',
        metricVal: '99.4%',
        metricSub: 'Compliance Audit Score',
        statusText: '100% Compliant',
        accentColor: '#1a4f87'
      };

  const lines = normalizePoints(card.points);
  const highlight = card.highlight || card.title.split(' ').slice(-1)[0] || '';
  const baseTitle = highlight ? card.title.replace(highlight, '').trim() : card.title;
  const panelLabel = isEmployee ? 'Job Seeker Side' : 'Client Side';

  return (
    <article
      className={`group relative overflow-hidden rounded-[2.5rem] border ${tone.border} bg-gradient-to-br ${tone.shell} shadow-[0_20px_50px_-20px_rgba(15,42,77,0.15)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-20px_rgba(15,42,77,0.22)] md:hover:scale-[1.01]`}
      style={{ contentVisibility: 'auto', containIntrinsicSize: '620px' }}
    >
      {/* Decorative radial brand accent background */}
      <div className={`absolute inset-0 opacity-100 ${tone.accent}`} aria-hidden="true" />
      <div className={`absolute -right-12 top-8 h-48 w-48 rounded-full blur-3xl ${tone.glow}`} aria-hidden="true" />

      <div className="relative flex min-h-[620px] flex-col p-6 sm:p-8 z-10">
        
        {/* Eyebrow Header */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <span className={`rounded-full px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.25em] shadow-sm ${tone.chip}`}>
            {card.eyebrow}
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 border border-slate-100 shadow-sm">
            <Sparkles size={14} className={tone.text} />
          </div>
        </div>

        {/* Title & Description */}
        <div className="relative z-10 max-w-xl">
          <h3 className="text-3xl font-extrabold leading-tight text-[#0f2a4d] sm:text-4xl">
            {baseTitle}
            {highlight ? <><br /><span className={`${tone.text} bg-clip-text bg-gradient-to-r from-slate-900 to-slate-800`}>{highlight}</span></> : null}
          </h3>
          <p className="mt-3.5 max-w-md text-sm leading-relaxed font-semibold text-slate-500 sm:text-base">
            {card.description}
          </p>
        </div>

        {/* Dynamic Split Layout */}
        <div className={`mt-8 grid flex-1 gap-6 md:grid-cols-[1.1fr_0.9fr] ${isEmployee ? 'md:[grid-template-columns:1.15fr_0.85fr]' : 'md:[grid-template-columns:0.85fr_1.15fr]'}`}>
          
          {/* Image & Stats Card */}
          <div className={`relative min-h-[260px] overflow-hidden rounded-[2.2rem] border border-white/60 bg-white/30 p-4 shadow-xl ${isEmployee ? 'md:order-2' : 'md:order-1'}`}>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: card.image ? `url(${card.image})` : 'none' }}
              aria-hidden="true"
            />
            {/* Dark Premium Gradient Tint */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a4d]/90 via-[#0f2a4d]/30 to-transparent" aria-hidden="true" />
            
            {/* Interactive Stats Overlay Badge */}
            <div className="relative z-10 flex h-full items-end">
              <div className="w-full rounded-[1.8rem] border border-white/20 bg-white/12 p-4 text-left text-white shadow-2xl backdrop-blur-md sm:p-5 transition-all duration-300 group-hover:bg-white/18 group-hover:border-white/30">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                    {tone.statusText}
                  </span>
                  <span className="text-[10px] font-bold text-white/70">{tone.badgeText}</span>
                </div>
                <div className="mt-1">
                  <span className="text-2xl font-black tracking-tight text-white sm:text-3xl">{tone.metricVal}</span>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-200/90">{tone.metricSub}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bullet Points Container */}
          <div className={`rounded-[2.2rem] border ${tone.accentLight} p-5 shadow-inner flex flex-col justify-between ${isEmployee ? 'md:order-1' : 'md:order-2'}`}>
            <div>
              <div className="mb-4.5 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                <span>Core Value Benefits</span>
              </div>
              
              <ul className="space-y-3.5">
                {lines.map((item) => (
                  <li 
                    key={item} 
                    className="flex items-start gap-2.5 text-xs font-bold text-slate-700 sm:text-sm hover:translate-x-0.5 transition-transform"
                  >
                    <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${tone.text}`} />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Call to Button */}
            <div className="mt-6 pt-5 border-t border-slate-200/50">
              <a
                href={card.buttonLink}
                className={`group inline-flex w-full items-center justify-center gap-2.5 rounded-full py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-md transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r ${tone.button}`}
                aria-label={card.buttonLabel}
              >
                <span>{card.buttonLabel}</span>
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </article>
  );
}

const WorkforceSection = () => {
  const [cards, setCards] = useState(DEFAULT_WORKFORCE_CARDS);
  const [activeTab, setActiveTab] = useState('seeker');

  useEffect(() => {
    const loadCards = async () => {
      const data = await fetchWorkforceCards();
      if (data.length > 0) {
        const incoming = data.map((item, index) => {
          const fallback = DEFAULT_WORKFORCE_CARDS[index] || DEFAULT_WORKFORCE_CARDS[0];
          return {
            cardType: item.cardType || fallback.cardType,
            eyebrow: item.eyebrow || fallback.eyebrow,
            title: item.title || fallback.title,
            highlight: item.highlight || fallback.highlight,
            description: item.description || fallback.description,
            buttonLabel: item.buttonLabel || fallback.buttonLabel,
            buttonLink: item.buttonLink || fallback.buttonLink,
            points: normalizePoints(item.points, fallback.points),
            image: item.image ? extractMediaUrl(item.image) : fallback.image,
            imageMedia: item.image || fallback.imageMedia,
          };
        });

        setCards((previous) => {
          if (incoming.length === 1 && previous.length > 1) {
            return [incoming[0], previous[1]];
          }
          if (incoming.length >= 2) {
            return incoming.slice(0, 2);
          }
          return previous;
        });
      }
    };

    loadCards();
  }, []);

  return (
    <section 
      className="relative overflow-hidden bg-transparent px-4 py-20 sm:px-6 md:px-12"
      style={{
        backgroundImage: 'radial-gradient(rgba(15, 42, 77, 0.08) 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Creative Title Block */}
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF8C00] border border-orange-100/50">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF8C00] animate-pulse" />
            Spotlight Solutions
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0f2a4d] sm:text-4xl">
            Tailored Pathways for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] via-[#1a4f87] to-[#0f2a4d]">
              Seekers & Employers
            </span>
          </h2>
          <p className="mt-3.5 max-w-xl text-sm font-semibold text-slate-500 leading-relaxed">
            Whether you are launching your personal career journey or scaling a compliant national enterprise, TSPL delivers unmatched operational expertise.
          </p>
        </div>

        {/* Tab switch for mobile */}
        <div className="mb-8 flex justify-center md:hidden">
          <div className="relative flex w-full max-w-md rounded-full bg-slate-100/80 border border-slate-200/50 p-1 shadow-inner backdrop-blur-sm">
            <div
              className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ease-out ${
                activeTab === 'seeker' 
                  ? 'translate-x-0 bg-gradient-to-r from-[#FF8C00] to-orange-500 shadow-sm' 
                  : 'translate-x-[calc(100%+4px)] bg-gradient-to-r from-[#1a4f87] to-[#0f2a4d] shadow-sm'
              }`}
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={() => setActiveTab('seeker')}
              className={`relative z-10 flex-1 rounded-full py-2 text-xs font-black uppercase tracking-wider transition-colors duration-200 ${
                activeTab === 'seeker' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              For Job Seekers
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('employer')}
              className={`relative z-10 flex-1 rounded-full py-2 text-xs font-black uppercase tracking-wider transition-colors duration-200 ${
                activeTab === 'employer' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              For Clients
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          {cards.map((card, index) => {
            const tabKey = index === 0 ? 'seeker' : 'employer';
            const isActive = activeTab === tabKey;

            return (
              <div key={`${card.cardType}-${index}`} className={isActive ? 'block md:block' : 'hidden md:block'}>
                <WorkforcePanel card={card} index={index} />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WorkforceSection;