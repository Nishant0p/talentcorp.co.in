import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, User, Share2, Copy, CheckCircle, MessageCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { PrismicRichText } from '@prismicio/react';
import { client } from '../../utils/prismic';

const BlogPost = () => {
  const { slug } = useParams();
  
  const [document, setDocument] = useState(null);
  const [state, setState] = useState('loading');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const response = await client.getByUID('blog_post', slug);
        setDocument(response);
        setState('loaded');
      } catch (err) {
        console.error(err);
        setState('failed');
      }
    };
    if (slug) fetchDoc();
  }, [slug]);

  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans flex items-center justify-center">
        <p className="text-xl font-bold text-[#006bb8] animate-pulse">Loading article from Prismic...</p>
      </div>
    );
  }

  if (state === 'failed' || !document) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans">
        <Navbar />
        <main className="mx-auto max-w-3xl px-6 py-40 text-center">
          <h1 className="text-4xl font-bold text-slate-900">Article Not Found</h1>
          <p className="mt-4 text-slate-600">The blog post you are looking for does not exist or has not been published yet.</p>
          <p className="mt-2 text-sm text-slate-400">Make sure you have created a <code className="bg-slate-200 text-slate-800 px-1 rounded">blog_post</code> document with UID <code className="bg-slate-200 text-slate-800 px-1 rounded">{slug}</code> in Prismic.</p>
          <Link to="/blog" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#006bb8] px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-500">
            <ArrowLeft size={18} /> Back to Blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const { title, excerpt, date, tag, author, image, content, meta_title, meta_description } = document.data;
  const dateStr = date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
  const imageUrl = image && image.url ? image.url : '';

  const seoTitle = meta_title || title || 'Blog';
  const seoDesc = meta_description || excerpt || '';

  const shareUrl = window.location.href;
  const shareText = `Check out this article from TSPL Group: "${title || 'Career Insights'}"`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'TSPL Group Blog',
          text: seoDesc || shareText,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    }
  };

  // SEO schema markup
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": seoTitle,
    "image": imageUrl,
    "datePublished": date ? new Date(date).toISOString() : new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": author || 'TSPL Group'
    },
    "description": seoDesc
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <title>{seoTitle} | TSPL Group</title>
      {seoDesc && <meta name="description" content={seoDesc} />}
      <meta property="og:url" content={shareUrl} />
      {seoTitle && <meta property="og:title" content={seoTitle} />}
      {seoDesc && <meta property="og:description" content={seoDesc} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta property="og:type" content="article" />
      <meta name="twitter:card" content="summary_large_image" />
      {seoTitle && <meta name="twitter:title" content={seoTitle} />}
      {seoDesc && <meta name="twitter:description" content={seoDesc} />}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <Navbar />

      <main className="pb-24 pt-28 md:pt-36">
        <article className="mx-auto max-w-4xl px-6">
          <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-[#006bb8]">
            <ArrowLeft size={16} /> Back to all articles
          </Link>

          <header className="mb-8 text-center md:mb-10">
            <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
              {tag && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-orange-600">
                  <Tag size={14} /> {tag}
                </span>
              )}
              {dateStr && (
                <span className="inline-flex items-center gap-1.5 text-slate-500">
                  <Calendar size={14} /> {dateStr}
                </span>
              )}
              {author && (
                <span className="inline-flex items-center gap-1.5 text-slate-500">
                  <User size={14} /> {author}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl lg:leading-[1.1]">
              {title}
            </h1>
          </header>

          {/* Share Toolbar */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-slate-700 text-sm">
              <Share2 size={18} className="text-[#006bb8]" />
              <span>Share Article:</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleShareWhatsApp}
                title="Share on WhatsApp"
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <MessageCircle size={15} />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={handleShareLinkedIn}
                title="Share on LinkedIn"
                className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-100 transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span>LinkedIn</span>
              </button>

              <button
                onClick={handleShareTwitter}
                title="Share on X (Twitter)"
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>X</span>
              </button>

              <button
                onClick={handleShareFacebook}
                title="Share on Facebook"
                className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.65 13.75 5.65c1.08 0 2.25.19 2.25.19v2.47h-1.27c-1.23 0-1.61.77-1.61 1.56V12h2.77l-.44 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
                <span>Facebook</span>
              </button>

              <button
                onClick={handleCopyLink}
                title={copied ? "Link Copied!" : "Copy Shareable Link"}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  copied
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {copied ? <CheckCircle size={15} /> : <Copy size={15} />}
                <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
              </button>

              {typeof navigator !== 'undefined' && navigator.share && (
                <button
                  onClick={handleNativeShare}
                  title="Share via device"
                  className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600 hover:bg-orange-100 transition-colors cursor-pointer"
                >
                  <Share2 size={15} />
                  <span>More</span>
                </button>
              )}
            </div>
          </div>

          {imageUrl && (
            <div className="mb-12 overflow-hidden rounded-[2rem] shadow-xl shadow-slate-200/50 md:mb-16">
              <img 
                src={imageUrl} 
                alt={title || 'Blog Cover'} 
                className="h-[300px] w-full object-cover md:h-[500px]"
              />
            </div>
          )}

          <div className="prose prose-lg prose-slate mx-auto max-w-3xl prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-[#006bb8] hover:prose-a:text-orange-500 prose-img:rounded-2xl">
            <PrismicRichText field={content} />
          </div>

          {/* Bottom Share Section */}
          <footer className="mx-auto mt-16 max-w-3xl border-t border-slate-200 pt-10">
            <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-slate-900 p-8 text-white md:flex-row">
              <div>
                <h3 className="text-xl font-bold">Found this helpful?</h3>
                <p className="mt-1 text-sm text-slate-300">Share this article with your network or colleagues.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCopyLink}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                    copied
                      ? 'bg-emerald-500 text-white'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                  <span>{copied ? 'Link Copied!' : 'Copy Shareable Link'}</span>
                </button>

                <button
                  onClick={handleShareWhatsApp}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
