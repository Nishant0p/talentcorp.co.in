import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Search, Tag, ArrowRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { extractMediaUrl, fetchNews } from '../../utils/strapi';
import localNews from '../../data/localNews';

const stripHtml = (value) => {
  if (!value) return '';
  return String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

const AllNewsPage = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  useEffect(() => {
    const loadNews = async () => {
      const data = await fetchNews();
      const combined = items => {
        const list = items && items.length > 0 ? items : localNews;
        const unique = [];
        const seen = new Set();
        list.forEach((item) => {
          const titleKey = (item.title || '').trim().toLowerCase();
          if (titleKey && !seen.has(titleKey)) {
            seen.add(titleKey);
            unique.push(item);
          }
        });
        return unique;
      };
      setNewsItems(combined([...(data || []), ...localNews]));
    };

    loadNews();
  }, []);

  const newsAndUpdates = useMemo(() => {
    return newsItems.filter((item) => !item.tag || item.tag === 'News' || item.tag === 'Updates' || item.tag === 'Partnerships');
  }, [newsItems]);

  const availableTags = useMemo(() => {
    const tags = new Set(['All']);
    newsAndUpdates.forEach((item) => {
      if (item.tag) tags.add(item.tag);
    });
    return Array.from(tags);
  }, [newsAndUpdates]);

  const filteredNews = useMemo(() => {
    return newsAndUpdates.filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        stripHtml(item.description).toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === 'All' || item.tag === selectedTag;
      return matchesSearch && matchesTag;
    });
  }, [newsAndUpdates, searchQuery, selectedTag]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-8 py-28 sm:py-32">
        {/* Header Navigation */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/news-events"
            className="inline-flex items-center gap-2 font-semibold text-[#006bb8] hover:text-orange-500 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to News &amp; Events
          </Link>
          <span className="rounded-full bg-orange-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-orange-600">
            Archive • {filteredNews.length} News Articles
          </span>
        </div>

        {/* Hero Section */}
        <div className="mb-12 rounded-3xl bg-[#006bb8] p-8 sm:p-12 text-white shadow-xl">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            All News &amp; Announcements
          </h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed">
            Explore all past and recent news, press releases, company updates, and milestone announcements from TSPL Group.
          </p>

          {/* Search & Filter Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-96">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search news by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl bg-white pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-inner"
              />
            </div>

            {/* Tags list */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                    selectedTag === tag
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((item) => {
              const itemId = item.documentId || item.id;
              const cleanDesc = stripHtml(item.description);
              return (
                <Link
                  key={itemId || item.title}
                  to={`/news-events/${itemId}`}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div>
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <img
                        src={item.image ? extractMediaUrl(item.image) : (item.tag === 'Updates' ? '' : 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80')}
                        alt={item.title || 'News image'}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 rounded-xl bg-white/90 px-3 py-1 text-xs font-bold text-orange-600 backdrop-blur-md">
                        {item.tag || 'News'}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-400">
                        <Calendar size={14} className="text-orange-500" />
                        <span>{item.date || '-'}</span>
                      </div>
                      <h3 className="text-xl font-bold leading-snug text-slate-900 group-hover:text-orange-500 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      {cleanDesc && (
                        <p className="mt-3 text-sm text-slate-500 line-clamp-3 leading-relaxed">
                          {cleanDesc}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 p-6 pt-4 flex items-center justify-between text-sm font-bold text-[#006bb8] group-hover:text-orange-500">
                    <span>Read Full Story</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-600">No news articles found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('All');
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-2.5 font-bold text-white transition-all hover:bg-orange-600"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AllNewsPage;
