import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { extractMediaUrl, fetchNews } from '../../utils/strapi';
import { useEffect, useState } from 'react';

const stripHtml = (value) => {
  if (!value) return '';
  return String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

const NewsDetailPage = () => {
  const { newsId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchNews();
      setItems(data);
    };

    load();
  }, []);

  const newsItem = useMemo(
    () => items.find((item) => String(item.documentId || item.id) === String(newsId)),
    [items, newsId]
  );

  const related = useMemo(() => {
    if (!newsItem) return [];
    return items
      .filter((item) => String(item.documentId || item.id) !== String(newsId))
      .slice(0, 3);
  }, [items, newsItem, newsId]);

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-white text-slate-800">
        <Navbar />
        <main className="mx-auto max-w-4xl px-6 py-36">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">News</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">News item not found</h1>
          <p className="mt-4 text-slate-600">The requested update may have been removed or is not published yet.</p>
          <Link to="/news-events" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">
            <ArrowLeft size={16} />
            Back to News
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-28">
        <Link to="/news-events" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
          <ArrowLeft size={16} />
          Back to News & Events
        </Link>

        <article className="mt-6 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          <img
            src={newsItem.image ? extractMediaUrl(newsItem.image) : 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80'}
            alt={newsItem.title || 'News cover'}
            className="h-[280px] w-full object-cover md:h-[420px]"
          />

          <div className="p-6 md:p-10">
            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 font-semibold text-orange-600">
                <Tag size={14} />
                {newsItem.tag || 'News'}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar size={14} />
                {newsItem.date || '-'}
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">{newsItem.title}</h1>

            <div className="prose prose-slate mt-6 max-w-none text-slate-700">
              {newsItem.description ? (
                <div dangerouslySetInnerHTML={{ __html: newsItem.description }} />
              ) : (
                <p>No description available.</p>
              )}
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900">Related Updates</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {related.map((item) => {
                const itemId = item.documentId || item.id;
                return (
                  <Link key={itemId} to={`/news-events/${itemId}`} className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                    <img
                      src={item.image ? extractMediaUrl(item.image) : 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400'}
                      alt={item.title}
                      className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="p-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">{item.tag || 'News'}</p>
                      <h3 className="mt-2 line-clamp-2 font-bold text-slate-900">{item.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-600">{stripHtml(item.description)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetailPage;
