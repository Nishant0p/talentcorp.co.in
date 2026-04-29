import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Award, Calendar, MapPin, ChevronRight, Cake, Star } from 'lucide-react';
import { extractMediaUrl, fetchNews, fetchSingleType } from '../utils/strapi';

const defaultNewsEventsContent = {
  pageContent: {
    heroTitleLeft: 'NEWS',
    heroTitleRight: '& EVENTS',
  },
  hero: {
    featureImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80',
    featureTag: 'Featured',
    featureTitle: 'World Book of Records Recognition',
    eventCount: '247',
    eventCountLabel: 'Events This Year',
    quickAccessTitle: 'QUICK ACCESS',
    quickAccessItems: ['Announcements', 'Calendar', 'Gallery'],
    milestonesLeft: 'Milestones, Moments',
    milestonesRight: 'Memories',
    milestonesSubtitle: 'All in one place',
    awardTitle: 'Award Winning',
    awardSubtitle: 'Excellence in Training',
  },
  spotlightFeature: {
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80',
    tag: 'Awards',
    date: 'March 15, 2026',
    title: 'TSPL Group Receives World Book of Records Recognition for Excellence in Skilling',
    description:
      "A landmark achievement recognizing our commitment to transforming India's workforce through innovative skilling solutions.",
  },
  spotlightCards: [
    {
      category: 'Partnerships',
      title: 'Strategic MoU Signed with Maharashtra Skill Development...',
      date: 'March 10, 2026',
      img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=400',
    },
    {
      category: 'Milestones',
      title: 'TSPL Expands Operations to 5 New States Across India',
      date: 'March 5, 2026',
      img: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=400',
    },
    {
      category: 'Awards',
      title: 'TSPL Recognized for Excellence in Large-Scale Workforce Delivery',
      date: 'March 1, 2026',
      img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400',
    },
  ],
  allUpdates: [
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
    text: '“Best Staffing Solutions Provider — Economic Times Awards 2026”',
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
      setLatestNews(items.slice(0, 6));
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
    <div className="min-h-screen bg-white px-6 pt-28 font-sans md:px-12 md:pt-32">
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
        className="mb-10 text-4xl font-black leading-none tracking-tighter whitespace-nowrap sm:text-5xl md:text-9xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="inline-block text-[#006bb8]">{content.pageContent.heroTitleLeft}</span>
        <span className="inline-block text-orange-500"> {content.pageContent.heroTitleRight}</span>
      </motion.h1>

      <motion.div ref={heroParallaxRef} className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-4">
        <motion.div
          className="group relative overflow-hidden rounded-3xl md:col-span-2 md:row-span-2"
          initial={{ opacity: 0, y: 72, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          style={{ y: heroFeatureY }}
        >
          <img
            src={content.hero.featureImage}
            alt="Snowy mountains"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
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
            <div className="text-6xl font-bold">{content.hero.eventCount}</div>
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
            <h2 className="text-3xl font-bold text-[#006bb8]">Latest From Admin</h2>
            <Link to="/news-events" className="text-sm font-semibold text-orange-500 hover:text-orange-600">
              View all
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((item) => {
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
        className="mx-auto mt-20 max-w-7xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="mb-10 flex items-center gap-4">
          <div className="h-10 w-1.5 rounded-full bg-orange-500" />
          <h2 className="text-4xl font-semibold tracking-tight text-[#006bb8]">Spotlight</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <motion.article
            className="group relative overflow-hidden rounded-[2rem] bg-slate-900 lg:col-span-8 h-[460px]"
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
              <h3 className="mb-4 max-w-2xl text-3xl font-bold leading-tight text-white md:text-4xl">
                {content.spotlightFeature.title}
              </h3>
              <p className="mb-6 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
                {content.spotlightFeature.description}
              </p>
              <Link to="/news-events" className="flex items-center gap-2 font-semibold text-orange-500 transition-colors hover:text-orange-400">
              Read More <ArrowRight size={18} />
              </Link>
            </div>
          </motion.article>

          <div className="lg:col-span-4 flex flex-col gap-6">
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
                  className="h-24 w-24 rounded-2xl object-cover"
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
        className="mx-auto mt-24 max-w-7xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="mb-10 flex items-center gap-4">
          <div className="h-10 w-1.5 rounded-full bg-orange-500" />
          <h2 className="text-4xl font-semibold tracking-tight text-[#006bb8]">All Updates</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.allUpdates.map((item, index) => (
            <motion.div
              key={`${item.type}-${index}`}
              className={`group h-[420px] overflow-hidden rounded-[2rem] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                item.type === 'quote' ? item.bgColor : 'bg-white border border-slate-100 shadow-sm'
              }`}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.05 }}
            >
              {item.type === 'news' ? (
                item.id ? (
                  <Link to={`/news-events/${item.id}`} className="block h-full">
                    <div className="h-1/2 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex h-1/2 flex-col justify-between p-8">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.22em] text-orange-500">
                          {item.category}
                        </span>
                        <h3 className="mt-2 text-xl font-bold leading-tight text-[#006bb8] line-clamp-3">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-400">{item.date}</p>
                    </div>
                  </Link>
                ) : (
                  <>
                    <div className="h-1/2 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex h-1/2 flex-col justify-between p-8">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.22em] text-orange-500">
                          {item.category}
                        </span>
                        <h3 className="mt-2 text-xl font-bold leading-tight text-[#006bb8] line-clamp-3">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-400">{item.date}</p>
                    </div>
                  </>
                )
              ) : (
                <div className="flex h-full items-center justify-center p-10 text-center">
                  <h3 className="max-w-sm text-2xl font-medium leading-relaxed text-white">
                    {item.text}
                  </h3>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link to="/news-events" className="inline-flex items-center rounded-full border border-orange-500 px-8 py-3 font-semibold text-[#006bb8] transition-colors hover:bg-orange-500 hover:text-white">
            Load More Updates <ArrowRight size={18} className="ml-2 inline-block align-[-2px]" />
          </Link>
        </div>
      </motion.section>

      <motion.section
        id="gallery"
        className="mx-auto mt-24 max-w-7xl rounded-[2.5rem] bg-slate-50 px-6 py-10 md:px-10 md:py-12"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <div className="mb-10 flex justify-center">
          <div className="inline-flex items-center gap-3">
            <Cake className="h-8 w-8 text-orange-500" />
            <h2 className="text-center text-4xl font-semibold tracking-tight text-[#006bb8] md:text-5xl">
              Birthday <span className="text-orange-500">Spotlight</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:justify-items-center">
          <motion.div
            className="mx-auto w-full max-w-xl"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <p className="mb-6 text-sm font-medium text-slate-500">Coming up next...</p>
            <div className="space-y-4">
              {content.birthdayUpcoming.map((person, index) => (
                <div
                  key={`${person.name}-${index}`}
                  className="group flex items-center justify-between rounded-2xl border border-white/70 bg-white/85 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:translate-x-2 hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#006bb8] font-bold text-white shadow-sm">
                      {person.initial}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{person.name}</h4>
                      <p className="text-xs text-slate-400">{person.dept}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-black text-orange-500">
                      {person.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto flex w-full max-w-2xl justify-center"
            initial={{ opacity: 0, x: 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[360px] w-[360px] rounded-full bg-orange-100/70 blur-3xl" />
            </div>

            <div className="absolute right-8 top-0 rounded-2xl bg-orange-500 p-4 text-white shadow-xl">
              <Star size={24} fill="currentColor" />
            </div>

            <div className="relative z-10 w-full max-w-[520px]">
              <div className="relative flex h-[500px] items-end justify-center overflow-visible">
                <div className="absolute bottom-12 h-[320px] w-[320px] rounded-full bg-[#006bb8]/12 blur-2xl" />
                <img
                  src={content.birthdaySpotlight.image}
                  alt={content.birthdaySpotlight.name}
                  className="animate-bounce-slow relative z-10 h-[520px] w-auto max-w-none object-contain object-top drop-shadow-[0_36px_46px_rgba(15,23,42,0.28)]"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent p-8 text-white">
                  <p className="mb-2 text-sm font-medium text-orange-200">Happy Birthday!</p>
                  <h3 className="text-4xl font-black tracking-tight md:text-5xl">{content.birthdaySpotlight.name}</h3>
                  <p className="mt-2 max-w-lg text-sm text-slate-200 md:text-base">{content.birthdaySpotlight.message}</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-slate-100/70 px-2 py-5 md:px-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-500">Birthday Spotlight</p>
                  <p className="mt-1 text-sm text-slate-500">{content.birthdaySpotlight.role}</p>
                </div>
                <Link to="/contact-us" className="inline-flex items-center gap-2 rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-[#006bb8] transition-colors hover:bg-orange-500 hover:text-white">
                  Send Wishes <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="calendar"
        className="mx-auto mt-24 max-w-7xl"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <div className="mb-12 flex items-center gap-4">
          <div className="h-10 w-1.5 rounded-full bg-orange-500" />
          <h2 className="text-4xl font-semibold tracking-tight text-[#006bb8]">In The News</h2>
        </div>

        <div className="mb-14 overflow-hidden rounded-[2rem] border border-white/60 bg-white/60 p-5 shadow-sm backdrop-blur-md">
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.inTheNewsArticles.map((article, index) => (
            <motion.article
              key={article.source}
              className="group relative overflow-hidden rounded-[2rem] bg-slate-50 p-10 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-b-4 hover:border-orange-500"
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
        className="mx-auto mt-24 max-w-7xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <div className="mb-16 flex items-center gap-3">
          <Calendar className="h-8 w-8 text-orange-500" />
          <h2 className="text-4xl font-semibold tracking-tight text-[#006bb8]">Upcoming &amp; Past Events</h2>
        </div>

        <div className="relative grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-slate-100" />

          <div>
            <div className="mb-8 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <h3 className="text-xl font-bold uppercase tracking-wide text-slate-900">Upcoming</h3>
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
            <h3 className="mb-8 text-xl font-bold uppercase tracking-wide text-slate-400">Past</h3>

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