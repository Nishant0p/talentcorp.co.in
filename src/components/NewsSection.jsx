import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Sparkles, Tag, ChevronRight } from 'lucide-react';
import { fetchNews, extractMediaUrl } from '../utils/strapi';
import localNews from '../data/localNews';

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
        const data = fetched && fetched.length > 0 ? fetched : localNews;
        
        if (!isMounted) return;

        // Filter news and events separately (up to 3 items each)
        const news = data.filter((item) => !item.tag || item.tag === 'News' || item.tag === 'Updates' || item.tag === 'Partnerships');
        const events = data.filter((item) => item.tag === 'Events' || item.tag === 'Event');

        setNewsItems(news.slice(0, 3));
        setEventItems(events.slice(0, 3));
      } catch (err) {
        console.warn('Failed to load news for home page section, using fallback:', err);
        if (isMounted) {
          const news = localNews.filter((item) => !item.tag || item.tag === 'News' || item.tag === 'Updates');
          const events = localNews.filter((item) => item.tag === 'Events' || item.tag === 'Event');
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
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} /> Highlights &amp; Updates
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Latest <span className="text-[#006bb8]">News &amp; Events</span>
          </h2>
          <p className="mt-2 text-base text-slate-600 max-w-xl">
            Stay informed with our latest corporate announcements, industry partnerships, and upcoming events.
          </p>
        </div>

        {/* Tab Switcher & View All Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center border border-slate-200">
            <button
              onClick={() => setActiveTab('news')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'news'
                  ? 'bg-white text-[#006bb8] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Latest News ({newsItems.length})
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-white text-[#006bb8] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Upcoming Events ({eventItems.length})
            </button>
          </div>

          <Link
            to={activeTab === 'news' ? '/all-news' : '/all-events'}
            className="inline-flex items-center gap-2 bg-[#006bb8] hover:bg-[#005596] text-white font-bold px-5 py-3 rounded-xl transition-all shadow-md text-sm hover:translate-x-0.5 cursor-pointer"
          >
            {activeTab === 'news' ? 'View All News' : 'View All Events'}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 rounded-3xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      ) : displayedItems.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-slate-500 font-medium">No items available currently.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedItems.map((item, idx) => {
            const mediaUrl = item.image ? extractMediaUrl(item.image) : '';
            const detailId = item.documentId || item.id;

            return (
              <article
                key={item.id || item.documentId || idx}
                className="group flex flex-col bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  {mediaUrl ? (
                    <img
                      src={mediaUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center p-6 text-white text-center font-bold">
                      TSPL {item.tag || 'News'}
                    </div>
                  )}

                  {/* Tag Pill */}
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-xs font-extrabold shadow-sm">
                    <Tag size={12} className="text-orange-500" />
                    {item.tag || (activeTab === 'news' ? 'News' : 'Event')}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {item.date && (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-3">
                        <Calendar size={14} className="text-orange-500" />
                        <span>{item.date}</span>
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-[#006bb8] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={`/news-events/${detailId}`}
                      className="inline-flex items-center gap-1 text-sm font-bold text-[#006bb8] hover:text-orange-500 transition-colors"
                    >
                      Read Full Story
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
