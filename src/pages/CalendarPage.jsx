import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Sparkles } from 'lucide-react';
import { extractMediaUrl, fetchNews } from '../utils/strapi';
import localNews from '../data/localNews';

const CalendarPage = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(7); // Default to August (index 7)

  useEffect(() => {
    const loadLatestNews = async () => {
      const items = await fetchNews();
      const combined = [...(items || []), ...localNews];
      // Sort by date descending
      combined.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      const uniqueNews = [];
      const seenTitles = new Set();
      combined.forEach((item) => {
        const itemTitle = (item.title || '').trim().toLowerCase();
        if (itemTitle && !seenTitles.has(itemTitle)) {
          seenTitles.add(itemTitle);
          uniqueNews.push(item);
        }
      });
      setLatestNews(uniqueNews);
    };

    loadLatestNews();
  }, []);

  const getMonthOfItem = (item) => {
    if (!item.date) return null;
    const d = new Date(item.date);
    if (!isNaN(d.getTime())) {
      return d.getMonth();
    }
    const monthNamesLower = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];
    const dateStr = item.date.toLowerCase();
    for (let i = 0; i < monthNamesLower.length; i++) {
      if (dateStr.includes(monthNamesLower[i])) {
        return i;
      }
    }
    return null;
  };

  const calendarItems = useMemo(() => {
    return latestNews.filter((item) => {
      const itemMonth = getMonthOfItem(item);
      return itemMonth === selectedMonth;
    });
  }, [latestNews, selectedMonth]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="min-h-screen bg-white px-4 sm:px-12 pt-28 sm:pt-32 font-sans">
      <Navbar />

      {/* Hero Header Area */}
      <motion.div 
        className="mx-auto max-w-7xl text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 shadow-sm text-xs font-bold uppercase tracking-wider">
          <Calendar size={14} className="animate-pulse" /> Interactive Archive
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#0d1236] tracking-tight leading-none mb-6">
          Event &amp; News <span className="text-orange-500">Calendar</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Keep track of TSPL Group's official signing ceremonies, regional events, and compliance announcements held in any particular month.
        </p>
      </motion.div>

      {/* Calendar Component Wrapper */}
      <motion.section
        className="mx-auto max-w-7xl px-0 mb-24"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut', delay: 0.15 }}
      >
        {/* Horizontal Month Timeline Selector */}
        <div className="mb-12 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex gap-2 min-w-max px-1">
            {monthNames.map((month, idx) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(idx)}
                className={`px-6 py-3.5 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 cursor-pointer ${
                  selectedMonth === idx
                    ? 'bg-[#006bb8] text-white shadow-lg shadow-blue-200/50 scale-105'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-150'
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        {/* Archive Results */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {calendarItems.length > 0 ? (
            calendarItems.map((item, index) => {
              const itemId = item.documentId || item.id;
              const isEvent = item.tag === 'Events' || item.tag === 'Event';
              const isUpdate = item.tag === 'Updates' || item.tag === 'Announcement' || item.tag === 'Announcements';
              
              let tagBg = 'bg-blue-50 border-blue-100 text-blue-600';
              if (isEvent) tagBg = 'bg-orange-50 border-orange-100 text-orange-600';
              if (isUpdate) tagBg = 'bg-purple-50 border-purple-100 text-purple-600';

              return (
                <motion.div
                  key={itemId || index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${tagBg}`}>
                        {item.tag || 'News'}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">{item.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-orange-500 transition-colors">
                      {item.title}
                    </h3>
                    <p 
                      className="text-sm text-slate-500 line-clamp-3 leading-relaxed mb-6"
                      dangerouslySetInnerHTML={{ __html: item.description || '' }}
                    />
                  </div>
                  
                  {itemId && (
                    <Link
                      to={`/news-events/${itemId}`}
                      className="inline-flex items-center gap-1.5 font-bold text-sm text-[#006bb8] hover:text-orange-500 transition-colors"
                    >
                      Read Full Details <ArrowRight size={14} />
                    </Link>
                  )}
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50 text-center px-6">
              <Calendar size={56} className="text-slate-350 mb-4 animate-bounce" style={{ animationDuration: '3s' }} />
              <h3 className="text-2xl font-bold text-slate-700 mb-1">Archive Empty</h3>
              <p className="text-sm text-slate-400 max-w-sm">
                No events, news, or updates were recorded in the month of {monthNames[selectedMonth]} 2026.
              </p>
            </div>
          )}
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default CalendarPage;
