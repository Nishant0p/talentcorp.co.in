import React, { useEffect, useState } from 'react';
import { ArrowRight, Target } from 'lucide-react';
import { fetchHeroSection, extractMediaUrl } from '../utils/strapi';
import { getPageAsset, usePageAssets } from '../hooks/usePageAssets';

const fallbackHero = {
  eyebrow: 'Government Authorized Staffing',
  titleTop: "Build India's",
  titleBottom: 'Future Workforce',
  description: 'We help skilled talent in India to land, launch, and level up with top employers; faster, smarter, and friction-free.',
  backgroundImage: 'https://media.gettyimages.com/id/1277949331/video/two-male-engineers-celebrating-success-at-factory.jpg?s=640x640&k=20&c=hF1BY1imveumk1jEF3BbOI_YNXHYK3t-kotudyt40Eg=',
  primaryCtaLabel: 'Find Your Dream Job',
  secondaryCtaLabel: 'Hire Talent',
};

const HeroSection = ({ onFindJobs, onHireTalent }) => {
  const pageAssets = usePageAssets();
  const fallbackBackgroundImage = getPageAsset(pageAssets, 'home.hero.fallback', fallbackHero.backgroundImage).url;
  const [hero, setHero] = useState({ ...fallbackHero, backgroundImage: fallbackBackgroundImage });

  useEffect(() => {
    const loadHero = async () => {
      const data = await fetchHeroSection();
      if (!data) return;
      setHero({
        ...fallbackHero,
        ...data,
        backgroundImage: data.backgroundImage ? extractMediaUrl(data.backgroundImage) : fallbackBackgroundImage,
      });
    };

    loadHero();
  }, [fallbackBackgroundImage]);

  return (
    <section className="relative flex h-screen min-h-[700px] w-full items-center overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <img
          src={hero.backgroundImage}
          alt="TSPL Group"
          className="h-full w-full scale-[1.18] object-cover object-[20%_center] md:scale-[1.3]"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/40 lg:bg-gradient-to-r lg:from-black/60 lg:via-black/40 lg:to-transparent" />
      </div>

      <div className="relative z-10 mx-auto h-full w-full">
        <div className="absolute bottom-8 left-0 right-0 max-w-4xl px-4 sm:px-6 md:bottom-12 md:px-12">
          <div className="relative space-y-6">
            <div className="pointer-events-none absolute -left-10 -bottom-10 h-56 w-56 rounded-full bg-orange-500/25 blur-3xl md:h-72 md:w-72" />
            <div className="pointer-events-none absolute left-40 -bottom-16 h-40 w-40 rounded-full bg-orange-400/15 blur-3xl md:left-56 md:h-52 md:w-52" />

            <div className="relative inline-block">
              <div className="absolute -left-2 top-1/2 hidden -translate-y-1/2 -rotate-12 md:-left-8 md:block">
                <svg width="80" height="40" viewBox="0 0 101 46" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 md:w-24 lg:w-32">
                  <path d="M2 44L22 22L42 44L62 22L82 44L99 2" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M99 2H80M99 2V21" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white/85 backdrop-blur-md">
                {hero.eyebrow}
              </div>

              <h1 className="text-5xl font-bold leading-[0.9] tracking-tighter text-white sm:text-6xl md:text-8xl lg:text-[110px]">
                {hero.titleTop}
                <br />
                {hero.titleBottom}
              </h1>
            </div>

            <p className="max-w-xl pt-4 text-base font-medium leading-relaxed text-white/90 sm:text-lg md:pt-6 md:text-xl">
              {hero.description}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <button
                type="button"
                onClick={onFindJobs}
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-10 py-4 font-bold text-white shadow-lg shadow-orange-950 transition-all active:scale-95"
              >
                {hero.primaryCtaLabel}
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onHireTalent}
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-10 py-4 font-bold text-white transition-all hover:bg-slate-800"
              >
                <Target size={20} className="text-blue-400" /> {hero.secondaryCtaLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
