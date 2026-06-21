import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { PrismicRichText } from '@prismicio/react';
import { client } from '../../utils/prismic';

const BlogPost = () => {
  const { slug } = useParams();
  
  const [document, setDocument] = useState(null);
  const [state, setState] = useState('loading');

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

          <header className="mb-10 text-center md:mb-14">
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
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
