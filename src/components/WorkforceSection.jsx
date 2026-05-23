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
        shell: 'from-orange-50 via-white to-white',
        glow: 'bg-orange-200/70',
        chip: 'bg-orange-500',
        text: 'text-orange-500',
        button: 'from-orange-500 to-orange-600 shadow-orange-500/25 hover:shadow-orange-500/40',
        border: 'border-orange-100/80',
        accent: 'bg-[radial-gradient(circle_at_top_right,_rgba(249,115,22,0.16),_transparent_58%)]',
      }
    : {
        shell: 'from-blue-50 via-white to-white',
        glow: 'bg-blue-200/70',
        chip: 'bg-blue-600',
        text: 'text-blue-600',
        button: 'from-blue-600 to-blue-700 shadow-blue-600/25 hover:shadow-blue-600/40',
        border: 'border-blue-100/80',
        accent: 'bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.16),_transparent_58%)]',
      };

  const lines = normalizePoints(card.points);
  const highlight = card.highlight || card.title.split(' ').slice(-1)[0] || '';
  const baseTitle = highlight ? card.title.replace(highlight, '').trim() : card.title;
  const panelLabel = isEmployee ? 'Job Seeker Side' : 'Client Side';

  return (
    <article
      className={`group relative overflow-hidden rounded-[2.5rem] border ${tone.border} bg-gradient-to-br ${tone.shell} shadow-[0_30px_80px_-35px_rgba(15,23,42,0.35)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_90px_-35px_rgba(15,23,42,0.45)] md:hover:scale-[1.01]`}
      style={{ contentVisibility: 'auto', containIntrinsicSize: '620px' }}
    >
      <div className={`absolute inset-0 opacity-95 ${tone.accent}`} aria-hidden="true" />
      <div className={`absolute -right-10 top-10 h-44 w-44 rounded-full blur-3xl ${tone.glow}`} aria-hidden="true" />

      <div className="relative flex min-h-[620px] flex-col p-6 sm:p-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] text-white ${tone.chip}`}>
            {card.eyebrow}
          </span>
          <Sparkles size={18} className={tone.text} />
        </div>

        <div className="relative z-10 max-w-xl">
          <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            {baseTitle}
            {highlight ? <><br /><span className={tone.text}>{highlight}</span></> : null}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">{card.description}</p>
        </div>

        <div className={`mt-8 grid flex-1 gap-6 md:grid-cols-[1.05fr_0.95fr] ${isEmployee ? 'md:[grid-template-columns:1.1fr_0.9fr]' : 'md:[grid-template-columns:0.9fr_1.1fr]'}`}>
          <div className={`relative overflow-hidden rounded-[2rem] border border-white/40 bg-white shadow-2xl ${isEmployee ? 'md:order-2' : 'md:order-1'}`}>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-105 group-hover:md:translate-y-[-2%]"
              style={{ backgroundImage: card.image ? `url(${card.image})` : 'none' }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" aria-hidden="true" />
            <div className="relative z-10 flex h-full items-end p-5 sm:p-6">
              <div className="w-full rounded-[1.5rem] border border-white/20 bg-white/12 p-5 text-left text-white shadow-2xl backdrop-blur-md sm:p-6">
                <div className="mb-3 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.28em] text-white/80">
                  <span className="h-px w-10 bg-white/40" />
                  <span>{panelLabel}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-[2rem] border ${isEmployee ? 'border-orange-100 bg-orange-50/70' : 'border-blue-100 bg-blue-50/70'} p-5 shadow-lg shadow-slate-200/50 ${isEmployee ? 'md:order-1' : 'md:order-2'}`}>
            <div className="mb-5 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.28em] text-slate-400">
              <span className={`h-px w-10 ${isEmployee ? 'bg-orange-300' : 'bg-blue-300'}`} />
              <span>{panelLabel}</span>
            </div>
            <ul className="space-y-4">
              {lines.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-semibold text-slate-700 sm:text-base">
                  <CheckCircle2 size={18} className={`mt-0.5 shrink-0 ${tone.text}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/70 pt-6">
              <a
                href={card.buttonLink}
                className={`group inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-xl bg-gradient-to-r ${tone.button}`}
                aria-label={card.buttonLabel}
              >
                <span>{card.buttonLabel}</span>
                <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
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
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 md:px-12">
      <div className="mx-auto max-w-7xl relative">
        <div className="pointer-events-none absolute inset-x-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent lg:block" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-14 hidden h-28 w-28 -translate-x-1/2 rounded-full bg-gradient-to-br from-orange-400/15 to-blue-500/15 blur-2xl lg:block" aria-hidden="true" />

        <div className="mb-8 flex justify-center md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.3em] text-slate-500 shadow-sm">
            <Sparkles size={14} className="text-orange-500" />
            Workforce Spotlight
          </div>
        </div>

        <div className="mb-6 flex justify-center md:hidden">
          <div className="relative flex w-full max-w-md rounded-full bg-slate-100 p-1 shadow-inner">
            <div
              className={`absolute inset-y-1 left-1 w-1/2 rounded-full bg-gradient-to-r transition-all duration-300 ease-out ${activeTab === 'seeker' ? 'translate-x-0 bg-orange-500' : 'translate-x-full bg-blue-600'}`}
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={() => setActiveTab('seeker')}
              className={`relative z-10 flex-1 rounded-full py-2 text-xs font-bold transition-colors ${activeTab === 'seeker' ? 'text-white' : 'text-slate-500'}`}
            >
              For Job Seekers
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('employer')}
              className={`relative z-10 flex-1 rounded-full py-2 text-xs font-bold transition-colors ${activeTab === 'employer' ? 'text-white' : 'text-slate-500'}`}
            >
              For Clients
            </button>
          </div>
        </div>

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

        <div className="pointer-events-none fixed inset-x-4 bottom-4 z-20 mx-auto flex max-w-md justify-center md:hidden">
          <div className="rounded-full border border-white/80 bg-white/90 px-4 py-3 text-[10px] font-black uppercase tracking-[0.28em] text-slate-500 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.45)] backdrop-blur-md">
            Are you a Job Seeker or Client?
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkforceSection;