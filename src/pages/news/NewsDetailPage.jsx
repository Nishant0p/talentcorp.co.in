import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, ArrowLeft, Tag, Share2, Copy, MessageCircle, CheckCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { extractMediaUrl, fetchNews, parseMarkdown } from '../../utils/strapi';
import { useEffect, useState } from 'react';
import localNews from '../../data/localNews';

const stripHtml = (value) => {
  if (!value) return '';
  return String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

const defaultEventsList = [
  {
    id: 'national-skill-development-conference-2026',
    title: 'National Skill Development Conference 2026',
    description: '<p>Bringing together 500+ vocational institutes, HR leaders, and policymakers to discuss NAPS and NATS 2.0 implementation across manufacturing and services sectors.</p>',
    date: '15 APR 2026',
    tag: 'Events',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'campus-recruitment-drive-2026',
    title: 'Campus Recruitment Drive - Engineering & Technical College',
    description: '<p>Mass hiring drive for engineering graduates across manufacturing, IT, and automation industries organized by TSPL Group.</p>',
    date: '22 APR 2026',
    tag: 'Events',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'women-empowerment-skilling-2026',
    title: 'Women Empowerment & Skill Development Workshop Series',
    description: '<p>Special skilling initiative empowering young female candidates with industrial apprentice opportunities and certified technical training.</p>',
    date: '01 MAY 2026',
    tag: 'Events',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'industry-academia-conclave-2026',
    title: 'Industry-Academia Conclave 2026',
    description: '<p>Fostering partnerships between premier universities and manufacturing conglomerates for flexi-MoU programs.</p>',
    date: '10 MAR 2026',
    tag: 'Events',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'skill-india-partnership-summit',
    title: 'Skill India Mission Partnership Summit',
    description: '<p>National conference on accelerating skill certification and apprentice stipends across rural sectors.</p>',
    date: '25 FEB 2026',
    tag: 'Events',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'annual-employee-awards-2026',
    title: 'Annual Employee Awards & Leadership Ceremony',
    description: '<p>Honoring outstanding leadership, 5-year tenure milestones, and top-performing recruiters of TSPL Group.</p>',
    date: '14 FEB 2026',
    tag: 'Events',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600',
  },
];

const NewsDetailPage = () => {
  const { newsId } = useParams();
  const [items, setItems] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await fetchNews();
      setItems([...localNews, ...defaultEventsList, ...data]);
    };

    load();
  }, []);

  const newsItem = useMemo(
    () => items.find((item) => String(item.documentId || item.id) === String(newsId)),
    [items, newsId]
  );

  const shareText = useMemo(() => {
    if (!newsItem) return '';
    const cleanDesc = stripHtml(newsItem.description)
      .replace(/\s+/g, ' ')
      .trim();
    const truncatedDesc = cleanDesc.length > 250 ? cleanDesc.slice(0, 250) + '...' : cleanDesc;
    return `${newsItem.title}\n\n${truncatedDesc}\n\nRead more here:`;
  }, [newsItem]);

  const shareUrl = window.location.href;

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: newsItem.title,
          text: stripHtml(newsItem.description),
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

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
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 text-sm text-slate-500">
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 font-semibold text-orange-600">
                  <Tag size={14} />
                  {newsItem.tag || 'News'}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar size={14} />
                  {newsItem.date || '-'}
                </span>
              </div>

              {/* Share Toolbar */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1">Share:</span>
                <button
                  onClick={handleShareWhatsApp}
                  title="Share on WhatsApp"
                  className="rounded-full bg-green-50 p-2 text-green-600 hover:bg-green-100 transition-colors cursor-pointer"
                >
                  <MessageCircle size={16} />
                </button>
                <button
                  onClick={handleShareFacebook}
                  title="Share on Facebook"
                  className="rounded-full bg-blue-50 p-2 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </button>
                <button
                  onClick={handleShareLinkedIn}
                  title="Share on LinkedIn"
                  className="rounded-full bg-indigo-50 p-2 text-indigo-600 hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </button>
                <button
                  onClick={handleCopyLink}
                  title={copied ? "Link Copied!" : "Copy Link"}
                  className={`rounded-full p-2 transition-colors cursor-pointer ${copied ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                </button>
                {typeof navigator !== 'undefined' && navigator.share && (
                  <button
                    onClick={handleNativeShare}
                    title="Share via Device"
                    className="rounded-full bg-orange-50 p-2 text-orange-600 hover:bg-orange-100 transition-colors cursor-pointer"
                  >
                    <Share2 size={16} />
                  </button>
                )}
              </div>
            </div>

            <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">{newsItem.title}</h1>

            <div className="prose prose-slate mt-6 max-w-none text-slate-700">
              {newsItem.description ? (
                <div dangerouslySetInnerHTML={{ __html: parseMarkdown(newsItem.description) }} />
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
