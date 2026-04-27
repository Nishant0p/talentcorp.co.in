import React, { useEffect, useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { fetchWorkforceCards, extractMediaUrl } from '../utils/strapi';
import ProgressiveImage from './ProgressiveImage';

const DEFAULT_WORKFORCE_CARDS = [
  {
    cardType: 'job-seeker',
    eyebrow: 'FOR JOB SEEKERS',
    title: 'Launch Your Career',
    highlight: 'Career',
    description: 'Get access to thousands of job opportunities with top companies. We help you build a successful career path.',
    buttonLabel: 'Find Jobs',
    buttonLink: '/jobs',
    points: [
      'Get access to verified job openings quickly.',
      'Apply faster with guided support at every step.',
      'Build long-term growth with trusted employers.',
    ],
    image: '',
    imageMedia: null,
  },
  {
    cardType: 'employer',
    eyebrow: 'FOR EMPLOYERS',
    title: 'Build Your Team',
    highlight: 'Team',
    description: 'Recruit high-quality manpower with operational support, onboarding help, and better workforce flexibility.',
    buttonLabel: 'Hire Talent',
    buttonLink: '/contact-us',
    points: [
      'Find pre-screened people, fast.',
      'We manage all paperwork for you.',
      'Get money-saving stipend benefits.',
      'Find flexible staff just for you.',
    ],
    image: '',
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

const WorkforceSection = () => {
  const [cards, setCards] = useState(DEFAULT_WORKFORCE_CARDS);

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
    <section className="relative overflow-hidden bg-white px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl relative">
        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          {cards.map((card, index) => {
            const accentClass = index === 0 ? 'bg-orange-500/22' : 'bg-blue-600/22';
            const pillClass = index === 0 ? 'bg-orange-500' : 'bg-blue-600';
            const textClass = index === 0 ? 'text-orange-500' : 'text-blue-600';
            const listClass = index === 0 ? 'text-orange-500' : 'text-blue-600';
            const cardBackdropClass = index === 0
              ? 'bg-gradient-to-br from-orange-50 via-white to-orange-100/70'
              : 'bg-gradient-to-br from-blue-50 via-white to-blue-100/70';
            const actionClass = index === 0
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 shadow-orange-500/25 hover:shadow-orange-500/40'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-blue-600/25 hover:shadow-blue-600/40';
            const lines = normalizePoints(card.points);
            const highlight = card.highlight || card.title.split(' ').slice(-1)[0] || '';
            const baseTitle = highlight ? card.title.replace(highlight, '').trim() : card.title;

            return (
              <div
                key={`${card.cardType}-${index}`}
                className={`group relative overflow-hidden rounded-[2.5rem] border border-slate-100 shadow-lg shadow-slate-200/40 transition-all duration-300 hover:shadow-xl ${cardBackdropClass}`}
                style={{ contentVisibility: 'auto', containIntrinsicSize: '560px' }}
              >
                {card.image && (
                  <ProgressiveImage
                    media={card.imageMedia}
                    src={card.image}
                    alt={card.title}
                    className="object-center"
                    highClassName="contrast-[1.02] brightness-[0.96] transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                    width="1200"
                    height="800"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/70 to-black/48" />
                <div className={`absolute inset-0 ${accentClass}`} />

                <div className="relative z-10 flex min-h-[520px] flex-1 flex-col justify-between p-8 md:min-h-[560px] md:max-w-[86%]">
                  <div>
                    <div className="mb-6 flex items-center gap-3">
                      <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white ${pillClass}`}>
                        {card.eyebrow}
                      </span>
                    </div>
                    <h2 className="mb-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
                      {baseTitle}
                      {highlight ? <><br /><span className={textClass}>{highlight}</span></> : null}
                    </h2>
                    <p className="mb-8 font-medium leading-relaxed text-slate-500">{card.description}</p>
                    <ul className="mb-10 space-y-4">
                      {lines.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                          <CheckCircle2 size={18} className={listClass} /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-start">
                    <a
                      href={card.buttonLink}
                      className={`group inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-xl ${actionClass}`}
                      aria-label={card.buttonLabel}
                    >
                      <span>{card.buttonLabel}</span>
                      <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
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

export default WorkforceSection;