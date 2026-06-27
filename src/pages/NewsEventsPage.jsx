import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Award, Calendar, MapPin, ChevronRight, Cake, Star } from 'lucide-react';
import { extractMediaUrl, fetchNews, fetchSingleType } from '../utils/strapi';
import localNews from '../data/localNews';

const defaultNewsEventsContent = {
  pageContent: {
    heroTitleLeft: 'NEWS',
    heroTitleRight: '& EVENTS',
  },
  hero: {
    featureImage: '/news and event/news nap.png',
    featureTag: 'Featured',
    featureTitle: 'NAPS/NATS Top Rank Recognition',
    eventCount: '247',
    eventCountLabel: 'Events This Year',
    quickAccessTitle: 'QUICK ACCESS',
    quickAccessItems: ['Announcements', 'Calendar', 'Gallery'],
    milestonesLeft: 'Milestones, Moments',
    milestonesRight: 'Memories',
    milestonesSubtitle: 'All in one place',
    awardTitle: 'Record and Rank Holder',
    awardSubtitle: 'World Record and Top Regional Performance',
  },
  spotlightFeature: {
    image: '/news and event/image (1).png',
    tag: 'Awards',
    date: 'March 15, 2026',
    title: 'Medhavi Skills University Inaugurates Work Integrated ITI (CTS) programme under Flexi-MoU scheme of DGT',
    readMoreUrl: '/news-events/medhavi-flexi-iti',
  },
  spotlightCards: [
    {
      category: 'News',
      title: "Poster Trailer of Dr. Mahiboob Sayyad's Third Book 'Apprenticeship Act 1961' Launched in Goa",
      date: 'April 5, 2026',
      img: 'https://backend.tsplgroup.in/uploads/Whats_App_Image_2026_05_17_at_21_29_50_a23ccb68f7.jpeg',
      readMoreUrl: '/news-events/poster-trailer-2026',
    },
    {
      category: 'Events',
      title: 'Annual Skill Summit 2026 Draws 5000+ Participants in Pune',
      date: 'February 28, 2026',
      img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400',
      readMoreUrl: '/news-events',
    },
    {
      category: 'Partnerships',
      title: 'TSPL Partners with Leading IT Companies for Campus Placements',
      date: 'February 20, 2026',
      img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400',
      readMoreUrl: '/news-events',
    },
  ],
  allUpdates: [
  {
    type: 'news',
    category: 'News',
    title: "Poster Trailer of Dr. Mahiboob Sayyad's Third Book 'Apprenticeship Act 1961' Launched in Goa",
    date: 'April 5, 2026',
    image: 'https://backend.tsplgroup.in/uploads/Whats_App_Image_2026_05_17_at_21_29_50_a23ccb68f7.jpeg',
  },
  {
    type: 'news',
    category: 'Events',
    title: 'Annual Skill Summit 2026 Draws 5000+ Participants in Pune',
    date: 'February 28, 2026',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400',
  },
  {
    type: 'quote',
    text: '“Empowering 1 Million Youth by 2027 — Our Mission Continues”',
    bgColor: 'bg-[#006bb8]',
  },
  {
    type: 'news',
    category: 'Partnerships',
    title: 'TSPL Partners with Leading IT Companies for Campus Placements',
    date: 'February 20, 2026',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400',
  },
  {
    type: 'news',
    category: 'Nature',
    title: 'Expanding our green initiative footprint across rural sectors',
    date: 'February 15, 2026',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400',
  },
  {
    type: 'quote',
    text: '“World Book of Records holder with 40,000+ trainees and 450+ clients served”',
    bgColor: 'bg-orange-500',
  },
  {
    type: 'news',
    category: 'Milestones',
    title: 'Strategic growth vision for the upcoming fiscal year',
    date: 'February 10, 2026',
    image: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=400',
  },
  ],
  upcomingEvents: [
  {
    date: '15',
    month: 'APR',
    title: 'National Skill Development Conference 2026',
    loc: 'Pune Convention Center',
  },
  {
    date: '22',
    month: 'APR',
    title: 'Campus Recruitment Drive - Engineering College',
    loc: 'Multiple Locations, Maharashtra',
  },
  {
    date: '01',
    month: 'MAY',
    title: 'Women Empowerment Workshop Series',
    loc: 'Mumbai Training Center',
  },
  ],
  pastEvents: [
  {
    date: '21',
    month: 'JUN',
    title: 'Half-Year Outstanding Performance Awards 2026',
    loc: 'TSPL GROUP Head Office, Chakan',
  },
  {
    date: '10',
    month: 'MAR',
    title: 'Industry-Academia Conclave 2026',
    loc: 'Hyderabad',
  },
  {
    date: '25',
    month: 'FEB',
    title: 'Skill India Mission Partnership Summit',
    loc: 'New Delhi',
  },
  {
    date: '14',
    month: 'FEB',
    title: 'Annual Employee Awards Ceremony',
    loc: 'Pune Headquarters',
  },
  ],
  birthdayUpcoming: [
    { name: 'Priya Sharma', dept: 'Operations', date: 'Oct 12', initial: 'PS' },
    { name: 'Rahul Verma', dept: 'Training', date: 'Oct 15', initial: 'RV' },
    { name: 'Anita Desai', dept: 'HR', date: 'Oct 18', initial: 'AD' },
  ],
  birthdaySpotlight: {
    name: 'Meera Krishnan',
    role: 'Human Resources',
    message: 'Wishing you a year as wonderful as your impact at TSPL!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=900',
  },
  inTheNewsLogos: [
    'Times of India',
    'Economic Times',
    'Business Standard',
    'Hindustan Times',
    'India Today',
    'NDTV',
  ],
  inTheNewsArticles: [
  {
    quote:
      "TSPL Group has emerged as a game-changer in India's skilling ecosystem, bridging the gap between education and employment.",
    source: 'Economic Times',
    date: 'March 2026',
  },
  {
    quote:
      'With innovative training methodologies and industry partnerships, TSPL is setting new benchmarks in workforce development.',
    source: 'Business Standard',
    date: 'February 2026',
  },
  {
    quote:
      "The company's commitment to rural skilling initiatives is transforming lives across India's heartland.",
    source: 'India Today',
    date: 'January 2026',
  },
  ],
};
const quickAccessTargets = {
  Announcements: 'announcements',
  Calendar: 'calendar',
  Gallery: 'gallery',
};

const resolveNewsEventsContent = (prismicData) => {
  if (!prismicData) return defaultNewsEventsContent;

  const data = prismicData.data || prismicData;
  return {
    ...defaultNewsEventsContent,
    ...data,
    pageContent: {
      ...defaultNewsEventsContent.pageContent,
      ...(data.pageContent || {}),
    },
    hero: {
      ...defaultNewsEventsContent.hero,
      ...(data.hero || {}),
    },
    spotlightFeature: {
      ...defaultNewsEventsContent.spotlightFeature,
      ...(data.spotlightFeature || {}),
    },
    spotlightCards: data.spotlightCards?.length ? data.spotlightCards : defaultNewsEventsContent.spotlightCards,
    allUpdates: data.allUpdates?.length ? data.allUpdates : defaultNewsEventsContent.allUpdates,
    upcomingEvents: data.upcomingEvents?.length ? data.upcomingEvents : defaultNewsEventsContent.upcomingEvents,
    pastEvents: data.pastEvents?.length ? data.pastEvents : defaultNewsEventsContent.pastEvents,
    birthdayUpcoming: data.birthdayUpcoming?.length ? data.birthdayUpcoming : defaultNewsEventsContent.birthdayUpcoming,
    birthdaySpotlight: {
      ...defaultNewsEventsContent.birthdaySpotlight,
      ...(data.birthdaySpotlight || {}),
    },
    inTheNewsLogos: data.inTheNewsLogos?.length ? data.inTheNewsLogos : defaultNewsEventsContent.inTheNewsLogos,
    inTheNewsArticles: data.inTheNewsArticles?.length ? data.inTheNewsArticles : defaultNewsEventsContent.inTheNewsArticles,
  };
};

const NewsEventsPage = ({ prismicData = null }) => {
  const heroParallaxRef = useRef(null);
  const [pageData, setPageData] = useState(null);
  const content = useMemo(() => resolveNewsEventsContent(pageData || prismicData), [pageData, prismicData]);
  const [latestNews, setLatestNews] = useState([]);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroParallaxRef,
    offset: ['start end', 'end start'],
  });

  const heroFeatureY = useTransform(heroProgress, [0, 1], reduceMotion ? [0, 0] : [-30, 30]);
  const heroOrangeX = useTransform(heroProgress, [0, 1], reduceMotion ? [0, 0] : [-28, 22]);
  const heroQuickX = useTransform(heroProgress, [0, 1], reduceMotion ? [0, 0] : [24, -20]);
  const heroMilestonesX = useTransform(heroProgress, [0, 1], reduceMotion ? [0, 0] : [-18, 16]);
  const heroAwardY = useTransform(heroProgress, [0, 1], reduceMotion ? [0, 0] : [22, -18]);

  useEffect(() => {
    const loadLatestNews = async () => {
      const items = await fetchNews();
      setLatestNews([...localNews, ...items].slice(0, 6));
    };

    loadLatestNews();
  }, []);

  useEffect(() => {
    const loadPageContent = async () => {
      const data = await fetchSingleType('/api/news-events-page?populate[birthdayUpcoming]=*&populate[birthdaySpotlight][populate]=image');
      setPageData(data);
    };

    loadPageContent();
  }, []);

  return (
    <div className="min-h-screen bg-white px-4 sm:px-12 pt-28 sm:pt-32 font-sans">
      <Navbar />

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }
      `}</style>

      <motion.h1
        className="mb-10 text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-black leading-none tracking-tighter whitespace-nowrap"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="inline-block text-[#006bb8]">{content.pageContent.heroTitleLeft}</span>
        <span className="inline-block text-orange-500"> {content.pageContent.heroTitleRight}</span>
      </motion.h1>

      <motion.div ref={heroParallaxRef} className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-4">
        <Link to="/naps" className="group block h-full cursor-pointer md:col-span-2 md:row-span-2">
          <motion.div
            className="relative h-[320px] overflow-hidden rounded-3xl sm:h-[380px] md:h-full"
            initial={{ opacity: 0, y: 72, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            style={{ y: heroFeatureY }}
          >
            <img
              src={content.hero.featureImage}
              alt="Snowy mountains"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110 md:object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 p-8">
              <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                {content.hero.featureTag}
              </span>
              <h3 className="mt-4 text-3xl font-bold text-white">
                {content.hero.featureTitle}
              </h3>
            </div>
          </motion.div>
        </Link>

        <motion.div
          className="flex flex-col justify-between rounded-3xl bg-orange-500 p-8 text-white transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-200"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.05 }}
          style={{ x: heroOrangeX }}
        >
          <Sparkles className="h-8 w-8 opacity-50" />
          <div>
            <div className="text-5xl sm:text-6xl font-bold">{content.hero.eventCount}</div>
            <div className="text-lg opacity-90">{content.hero.eventCountLabel}</div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col justify-between rounded-3xl bg-[#006bb8] p-8 text-white transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-200/40"
          initial={{ opacity: 0, x: 42 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.08 }}
          style={{ x: heroQuickX }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold tracking-widest text-white/60">{content.hero.quickAccessTitle}</span>
            <ArrowRight className="h-5 w-5 text-orange-500" />
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {content.hero.quickAccessItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  const targetId = quickAccessTargets[item];
                  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="rounded-full border border-white/20 px-4 py-2 text-xs transition-colors hover:bg-white hover:text-slate-900"
              >
                {item}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col justify-center rounded-3xl bg-[#006bb8] p-8 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-200/40 md:col-span-1"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.12 }}
          style={{ x: heroMilestonesX }}
        >
          <h3 className="text-2xl font-bold leading-tight text-white">
            {content.hero.milestonesLeft} <span className="text-orange-500">&amp;</span> {content.hero.milestonesRight}
          </h3>
          <p className="mt-2 text-slate-400">{content.hero.milestonesSubtitle}</p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-center rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          style={{ y: heroAwardY }}
        >
          <div className="mb-4 rounded-2xl bg-orange-50 p-4">
            <Award className="h-10 w-10 text-orange-500" />
          </div>
          <h4 className="text-lg font-bold leading-tight text-slate-900">{content.hero.awardTitle}</h4>
          <p className="text-sm text-slate-500">{content.hero.awardSubtitle}</p>
        </motion.div>
      </motion.div>

      {latestNews.length > 0 && (
        <section className="mx-auto mt-14 max-w-7xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-3xl font-bold text-[#006bb8]">Latest News</h2>
            <Link to="/news-events" className="text-sm font-semibold text-orange-500 hover:text-orange-600">
              View all
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestNews.filter((item) => item.tag === 'News').map((item) => {
              const itemId = item.documentId || item.id;
              return (
                <Link key={itemId} to={`/news-events/${itemId}`} className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <img
                    src={item.image ? extractMediaUrl(item.image) : content.hero.featureImage}
                    alt={item.title || 'News image'}
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">{item.tag || 'News'}</p>
                    <h3 className="mt-2 line-clamp-2 text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-500">{item.date || '-'}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <motion.section
        id="announcements"
        className="mx-auto mt-12 sm:mt-20 max-w-7xl px-4 sm:px-0"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="mb-8 sm:mb-10 flex items-center gap-4">
          <div className="h-10 w-1.5 rounded-full bg-orange-500" />
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#006bb8]">Spotlight</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12">
          <motion.article
            className="group relative overflow-hidden rounded-[2rem] bg-slate-900 lg:col-span-8 h-[360px] sm:h-[460px]"
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            whileHover={{ y: -4 }}
          >
            <img
              src={content.spotlightFeature.image}
              alt="Vintage cars"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
            <div className="absolute top-8 left-8">
              <span className="rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                {content.spotlightFeature.tag}
              </span>
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <p className="mb-2 text-sm text-slate-300">{content.spotlightFeature.date}</p>
              <h3 className="mb-4 max-w-2xl text-2xl sm:text-3xl font-bold leading-tight text-white md:text-4xl">
                {content.spotlightFeature.title}
              </h3>
              <p className="mb-6 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
                {content.spotlightFeature.description}
              </p>
              <Link
                to={content.spotlightFeature.readMoreUrl || '/news-events'}
                className="flex items-center gap-2 font-semibold text-orange-500 transition-colors hover:text-orange-400"
              >
                Read More <ArrowRight size={18} />
              </Link>
            </div>
          </motion.article>

          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-6">
            {content.spotlightCards.map((news, index) => (
              <motion.article
                key={news.title}
                className="group flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
              >
                <img
                  src={news.img}
                  alt={news.title}
                  className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover"
                />
                <div className="flex flex-col justify-center">
                  <span className="mb-1 text-[10px] font-black uppercase tracking-[0.22em] text-orange-500">
                    {news.category}
                  </span>
                  <h4 className="mb-2 text-sm font-semibold leading-snug text-[#006bb8] transition-colors group-hover:text-orange-500">
                    {news.title}
                  </h4>
                  <p className="text-xs text-slate-400">{news.date}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>



      <motion.section
        id="calendar"
        className="mx-auto mt-12 sm:mt-24 max-w-7xl px-4 sm:px-0"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <div className="mb-8 sm:mb-12 flex items-center gap-4">
          <div className="h-10 w-1.5 rounded-full bg-orange-500" />
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#006bb8]">In The News</h2>
        </div>

        <div className="mb-10 sm:mb-14 overflow-hidden rounded-[2rem] border border-white/60 bg-white/60 p-5 shadow-sm backdrop-blur-md">
          <div className="logo-marquee overflow-hidden">
            <div className="logo-marquee-track gap-4 py-2">
              {[...content.inTheNewsLogos, ...content.inTheNewsLogos].map((logo, index) => (
                <div
                  key={`${logo}-${index}`}
                  className="flex h-16 w-56 shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-white/85 px-5 text-center text-sm font-black uppercase tracking-[0.22em] text-slate-400 grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:text-[#006bb8]"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.inTheNewsArticles.map((article, index) => (
            <motion.article
              key={article.source}
              className="group relative overflow-hidden rounded-[2rem] bg-slate-50 p-6 sm:p-10 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-b-4 hover:border-orange-500"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.06 }}
            >
              <div className="mb-6 text-5xl leading-none text-orange-500/80">“</div>
              <p className="mb-10 font-serif text-lg italic leading-relaxed text-slate-700">
                {article.quote}
              </p>

              <div className="flex items-start gap-3 border-t border-slate-200 pt-6">
                <div className="mt-1 h-6 w-1 rounded-full bg-orange-500" />
                <div>
                  <h4 className="text-base font-bold text-[#006bb8]">{article.source}</h4>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-400">{article.date}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="updates-events"
        className="mx-auto mt-12 sm:mt-24 max-w-7xl px-4 sm:px-0"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <div className="mb-8 sm:mb-12 flex items-center gap-4">
          <div className="h-10 w-1.5 rounded-full bg-orange-500" />
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#006bb8]">Updates & Events</h2>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestNews
            .filter((item) => item.tag === 'Events' || item.tag === 'Updates')
            .slice(0, 6)
            .map((item) => {
              const itemId = item.documentId || item.id;
              return (
                <Link key={itemId} to={`/news-events/${itemId}`} className="group block">
                  <motion.article
                    className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md h-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                  >
                    <img
                      src={item.image ? extractMediaUrl(item.image) : 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400'}
                      alt={item.title || 'Update image'}
                      className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">{item.tag || 'Update'}</p>
                      <h3 className="mt-2 line-clamp-2 text-lg font-bold text-slate-900">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-500">{item.date || '-'}</p>
                    </div>
                  </motion.article>
                </Link>
              );
            })}
        </div>

        {latestNews.filter((item) => item.tag === 'Events' || item.tag === 'Updates').length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center">
            <p className="text-slate-500">No updates or events available yet.</p>
          </div>
        )}
      </motion.section>

      <motion.section
        className="mx-auto mt-12 sm:mt-24 max-w-7xl px-4 sm:px-0"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <div className="mb-10 sm:mb-16 flex items-center gap-3">
          <Calendar className="h-8 w-8 text-orange-500" />
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#006bb8]">Upcoming &amp; Past Events</h2>
        </div>

        <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-slate-100" />

          <div>
            <div className="mb-6 sm:mb-8 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-slate-900">Upcoming</h3>
            </div>

            <div className="relative space-y-8">
              <div className="absolute left-8 top-2 bottom-2 w-px bg-slate-200" />
              {content.upcomingEvents.map((event, idx) => (
                <div
                  key={`${event.title}-${idx}`}
                  className="group relative z-10 flex gap-6 transition-transform duration-300 hover:translate-x-2"
                >
                  <div className="flex h-20 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#006bb8] text-white shadow-lg shadow-blue-900/20">
                    <span className="text-2xl font-black leading-none">{event.date}</span>
                    <span className="mt-1 text-[10px] font-bold tracking-widest">{event.month}</span>
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <h4 className="mb-2 text-lg font-bold leading-tight text-slate-900 transition-colors group-hover:text-orange-500">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-slate-400">
                      <MapPin size={14} className="text-orange-500" />
                      {event.loc}
                    </div>
                    <Link to="/contact-us" className="mt-3 inline-flex w-fit items-center gap-1 text-sm font-semibold text-[#006bb8] opacity-0 transition-all group-hover:opacity-100">
                      Register <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 sm:mb-8 text-lg sm:text-xl font-bold uppercase tracking-wide text-slate-400">Past</h3>

            <div className="relative space-y-8">
              <div className="absolute left-8 top-2 bottom-2 w-px bg-slate-200" />
              {content.pastEvents.map((event, idx) => (
                <div
                  key={`${event.title}-${idx}`}
                  className="relative z-10 flex gap-6 opacity-70 transition-opacity hover:opacity-100"
                >
                  <div className="flex h-20 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                    <span className="text-2xl font-black leading-none">{event.date}</span>
                    <span className="mt-1 text-[10px] font-bold tracking-widest">{event.month}</span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="mb-2 text-lg font-bold italic leading-tight text-slate-500">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-slate-400">
                      <MapPin size={14} />
                      {event.loc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <div className="mt-20 md:mt-24">
        <Footer />
      </div>
    </div>
  );
};

export default NewsEventsPage;