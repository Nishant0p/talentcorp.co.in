import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Sparkles, Tag, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchNews, extractMediaUrl } from '../utils/strapi';
import localNews from '../data/localNews';

const MotionLink = motion(Link);

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState([]);
  const [eventItems, setEventItems] = useState([]);
  const [activeTab, setActiveTab] = useState('news');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadNewsData = async () => {
      try {
        const fetched = await fetchNews();
        const rawData = fetched && fetched.length > 0 ? fetched : localNews;

        if (!isMounted) return;

        const formatted = rawData.map((item) => ({
          id: item.documentId || item.id,
          documentId: item.documentId || item.id,
          date: item.date ? (isNaN(new Date(item.date).getTime()) ? item.date : new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })) : 'Latest',
          tag: item.tag || 'News',
          title: item.title || '',
          desc: item.description ? item.description.replace(/<[^>]+>/g, '').trim() : item.desc || '',
          img: item.image ? extractMediaUrl(item.image) : (item.tag === 'Updates' ? '' : (item.img || 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80')),
        }));

        const news = formatted.filter((item) => !item.tag || item.tag === 'News' || item.tag === 'Updates' || item.tag === 'Partnerships');
        const events = formatted.filter((item) => item.tag === 'Events' || item.tag === 'Event');

        setNewsItems(news.length > 0 ? news.slice(0, 3) : formatted.slice(0, 3));
        setEventItems(events.length > 0 ? events.slice(0, 3) : formatted.slice(0, 3));
      } catch (err) {
        console.warn('Failed to load news for home page section, using fallback:', err);
        if (isMounted) {
          const formatted = localNews.map((item) => ({
            id: item.documentId || item.id,
            documentId: item.documentId || item.id,
            date: item.date ? new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Latest',
            tag: item.tag || 'News',
            title: item.title || '',
            desc: item.description ? item.description.replace(/<[^>]+>/g, '').trim() : '',
            img: item.image ? extractMediaUrl(item.image) : (item.tag === 'Updates' ? '' : 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80'),
          }));

          const news = formatted.filter((item) => !item.tag || item.tag === 'News' || item.tag === 'Updates');
          const events = formatted.filter((item) => item.tag === 'Events' || item.tag === 'Event');
          setNewsItems(news.slice(0, 3));
          setEventItems(events.slice(0, 3));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadNewsData();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayedItems = activeTab === 'news' ? newsItems : eventItems;

  return (
    <section id="news-events" className="relative overflow-hidden bg-white py-12 md:py-20">
      {/* Background Ornaments */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute -right-16 bottom-12 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(255,140,0,0.05) 0%, rgba(47,128,255,0.06) 100%), repeating-linear-gradient(90deg, rgba(255,140,0,0.015) 0px, rgba(255,140,0,0.015) 1px, transparent 1px, transparent 24px)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="max-w-2xl">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-orange-50 border border-orange-200/60 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-orange-600 shadow-sm"
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Sparkles size={14} className="text-orange-500 animate-pulse" />
              Highlights &amp; Corporate Updates
            </motion.span>
            <motion.h2
              className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Latest <span className="text-orange-500">News, Updates &amp; Events</span>
            </motion.h2>
            <motion.p
              className="mt-3 text-base md:text-lg text-slate-600 max-w-xl"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Stay informed with our latest corporate announcements, industry partnerships, and placement milestones.
            </motion.p>
          </div>

          {/* Controls: Tab Switcher & View All Link */}
          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-slate-100/90 p-1.5 rounded-2xl flex items-center border border-slate-200 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab('news')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${activeTab === 'news'
                  ? 'bg-white text-orange-600 shadow-md ring-1 ring-orange-200/50'
                  : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                News &amp; Updates ({newsItems.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('events')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${activeTab === 'events'
                  ? 'bg-white text-orange-600 shadow-md ring-1 ring-orange-200/50'
                  : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Events ({eventItems.length})
              </button>
            </div>

            <MotionLink
              to="/news-events"
              className="group inline-flex items-center gap-2 rounded-xl border border-orange-300 bg-white px-5 py-3 font-bold text-orange-500 shadow-sm transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-white whitespace-nowrap"
              whileHover={{ x: 3 }}
            >
              View All <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </MotionLink>
          </motion.div>
        </motion.div>

        {/* Content Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-3xl bg-slate-100 animate-pulse border border-slate-200/60" />
            ))}
          </div>
        ) : displayedItems.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <p className="text-slate-500 font-medium">No updates available in this section currently.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {displayedItems.map((item, i) => (
                <MotionLink
                  to={item.documentId ? `/news-events/${item.documentId}` : '/news-events'}
                  key={item.documentId || item.id || i}
                  initial={{ opacity: 0, y: 25, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
                  whileHover={{ y: -6 }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-200"
                >
                  {/* Card Image */}
                  <div className="relative h-48 md:h-56 overflow-hidden bg-slate-100">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-extrabold text-slate-800 backdrop-blur-md shadow-sm">
                      <Tag size={12} className="text-orange-500" />
                      {item.tag}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="flex flex-1 flex-col p-6 md:p-7 justify-between">
                    <div>
                      <div className="mb-3 flex items-center gap-2 text-xs font-bold text-orange-500">
                        <Calendar size={15} />
                        <span>{item.date}</span>
                      </div>
                      <h3 className="mb-3 text-lg md:text-xl font-bold text-slate-900 transition-colors group-hover:text-orange-600 line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="leading-relaxed text-slate-500 text-sm line-clamp-3">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-orange-500 group-hover:text-orange-600 transition-colors">
                        Read Full Story
                        <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </MotionLink>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
