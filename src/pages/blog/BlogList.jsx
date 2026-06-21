import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { client } from '../../utils/prismic';

const BlogList = () => {
  const [documents, setDocuments] = useState(null);
  const [state, setState] = useState('loading');

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await client.getAllByType('blog_post');
        setDocuments(response);
        setState('loaded');
      } catch (err) {
        console.error(err);
        setState('failed');
      }
    };
    fetchDocs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <title>Career Blog | TSPL Group - MNC Job Insights</title>
      <meta name="description" content="Discover the latest MNC job opportunities, career guides, and industry insights for freshers in Pune and across India with TSPL Group." />
      
      <Navbar />

      <main className="px-6 pt-32 pb-24 md:px-12 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
                Career <span className="text-orange-500">Insights</span>
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-600">
                Expert guides, job market trends, and career advice to help you secure the best opportunities in leading MNCs.
              </p>
            </div>
          </div>

          {state === 'loading' && <p className="text-slate-500 font-medium text-lg">Loading articles from Prismic...</p>}
          
          {state === 'failed' && (
            <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100">
              <p className="font-bold">Failed to load articles.</p>
              <p className="mt-2 text-sm">Please ensure your Prismic repository name is correct in <code className="bg-red-100 px-1 py-0.5 rounded">src/utils/prismic.js</code>.</p>
            </div>
          )}

          {state === 'loaded' && (!documents || documents.length === 0) && (
            <div className="bg-blue-50 text-[#006bb8] p-6 rounded-2xl border border-blue-100">
              <p className="font-bold">No articles found.</p>
              <p className="mt-2 text-sm">Please create and publish a <code className="bg-blue-100 px-1 py-0.5 rounded">blog_post</code> in your Prismic dashboard.</p>
            </div>
          )}

          {state === 'loaded' && documents && documents.length > 0 && (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {documents.map((blog) => {
                const { title, excerpt, date, tag, image } = blog.data;
                const dateStr = date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown Date';
                
                return (
                  <article key={blog.id} className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/5">
                    <Link to={`/blog/${blog.uid}`} className="relative h-60 overflow-hidden bg-slate-100">
                      {image && image.url && (
                        <img 
                          src={image.url} 
                          alt={image.alt || title || 'Blog cover'} 
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      {tag && (
                        <div className="absolute top-4 left-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                          {tag}
                        </div>
                      )}
                    </Link>
                    <div className="flex flex-1 flex-col p-8">
                      <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
                        <Calendar size={14} className="text-[#006bb8]" />
                        <span>{dateStr}</span>
                      </div>
                      <h2 className="mb-3 text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-[#006bb8]">
                        <Link to={`/blog/${blog.uid}`}>
                          {title}
                        </Link>
                      </h2>
                      <p className="mb-6 flex-1 text-slate-600 line-clamp-3">
                        {excerpt}
                      </p>
                      <Link to={`/blog/${blog.uid}`} className="inline-flex w-fit items-center gap-2 font-bold text-[#006bb8] transition-colors hover:text-orange-500">
                        Read Article <ArrowRight size={16} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogList;
