import React, { useEffect, useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { fetchWorkforceCards, extractMediaUrl } from '../utils/strapi';

const fallbackCards = [
  {
    cardType: 'job-seeker',
    eyebrow: 'For Job Seekers',
    title: 'Launch Your Career',
    highlight: 'Career',
    description: 'Get access to thousands of job opportunities with top companies. We help you build a successful career.',
    buttonLabel: 'Apply Now',
    buttonLink: '/contact-us',
    points: 'We help you find your job easily.\nGet recognized training that works.\nBuild your skills and get a paper.\nMeet great employers directly.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80',
  },
  {
    cardType: 'employer',
    eyebrow: 'For Employers',
    title: 'Build Your Team',
    highlight: 'Team',
    description: 'Access a vast pool of skilled workers. Use government schemes to reduce costs while building a talented team.',
    buttonLabel: 'Hire Now',
    buttonLink: '/contact-us',
    points: 'Find pre-screened people, fast.\nWe manage all paperwork for you.\nGet money-saving stipend benefits.\nFind flexible staff just for you.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e5381bbb2?auto=format&fit=crop&q=80',
  },
];

const WorkforceSection = () => {
  const [cards, setCards] = useState(fallbackCards);

  useEffect(() => {
    const loadCards = async () => {
      const data = await fetchWorkforceCards();
      if (data.length > 0) {
        setCards(
          data.map((item, index) => ({
            cardType: item.cardType || (index === 0 ? 'job-seeker' : 'employer'),
            eyebrow: item.eyebrow || fallbackCards[index]?.eyebrow || '',
            title: item.title || fallbackCards[index]?.title || '',
            highlight: item.highlight || fallbackCards[index]?.highlight || '',
            description: item.description || fallbackCards[index]?.description || '',
            buttonLabel: item.buttonLabel || fallbackCards[index]?.buttonLabel || 'Learn More',
            buttonLink: item.buttonLink || fallbackCards[index]?.buttonLink || '/contact-us',
            points: item.points || fallbackCards[index]?.points || '',
            image: item.image ? extractMediaUrl(item.image) : fallbackCards[index]?.image || '',
          }))
        );
      }
    };

    loadCards();
  }, []);

  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl relative">
        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          {cards.map((card, index) => {
            const accentClass = index === 0 ? 'bg-orange-500/18' : 'bg-blue-600/16';
            const pillClass = index === 0 ? 'bg-orange-500' : 'bg-blue-600';
            const textClass = index === 0 ? 'text-orange-500' : 'text-blue-600';
            const listClass = index === 0 ? 'text-orange-500' : 'text-blue-600';
            const actionClass = index === 0 ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700';
            const lines = (card.points || '').split('\n').map((item) => item.trim()).filter(Boolean);

            return (
              <div key={card.cardType} className="group relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/50 transition-all duration-500 hover:shadow-2xl">
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover object-center grayscale-[0.05] contrast-[1.03] brightness-[0.94] transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/88 via-white/62 to-black/56" />
                <div className={`absolute inset-0 ${accentClass}`} />

                <div className="relative z-10 flex min-h-[520px] flex-1 flex-col justify-between p-8 md:min-h-[560px] md:max-w-[86%]">
                  <div>
                    <div className="mb-6 flex items-center gap-3">
                      <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white ${pillClass}`}>
                        {card.eyebrow}
                      </span>
                    </div>
                    <h2 className="mb-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
                      {card.title.split(card.highlight || '').map((part, splitIndex) => (
                        <React.Fragment key={`${part}-${splitIndex}`}>
                          {part}
                          {splitIndex === 0 && card.highlight ? <><br /><span className={textClass}>{card.highlight}</span></> : null}
                        </React.Fragment>
                      ))}
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
                    <a href={card.buttonLink} className="flex items-center group/button" aria-label={card.buttonLabel}>
                      <span className={`rounded-l-full px-8 py-4 text-sm font-bold text-white transition-colors ${actionClass}`}>
                        {card.buttonLabel}
                      </span>
                      <span className={`ml-[-2px] rounded-full p-4 text-white shadow-lg transition-colors ${actionClass}`}>
                        <ArrowRight size={20} />
                      </span>
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