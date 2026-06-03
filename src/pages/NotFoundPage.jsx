import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Briefcase, PhoneCall, ArrowRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';

export default function NotFoundPage() {
  useSEO({
    title: "404 Page Not Found - TSPL Group",
    description: "The page you are looking for does not exist. Navigate back to TSPL Group home page, job board, or contact our support team.",
    keywords: "404 Error, Page Not Found, TSPL Group"
  });

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0A0F24] px-6 py-12 text-white antialiased">
      {/* Decorative Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-[#F97316]/10 blur-[120px]" />

      {/* Main Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-2xl rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-xl md:p-16">
        {/* Floating 404 indicator */}
        <div className="relative inline-block">
          <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-[#F97316] bg-clip-text text-8xl font-black tracking-widest text-transparent md:text-9xl">
            404
          </span>
          <div className="absolute -inset-1 rounded-full bg-blue-500/10 blur-xl" />
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Oops! Page Not Found
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray-400 md:text-lg">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let us get you back on track.
        </p>

        {/* Helpful Links Grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            to="/"
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-left no-underline transition-all hover:border-blue-500/50 hover:bg-blue-500/10"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <Home size={20} />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Go to Homepage</p>
                <p className="text-xs text-gray-500">Back to main landing page</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-gray-600 transition-transform group-hover:translate-x-1 group-hover:text-blue-400" />
          </Link>

          <Link
            to="/jobs"
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-left no-underline transition-all hover:border-[#F97316]/50 hover:bg-[#F97316]/10"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F97316]/20 text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white transition-all">
                <Briefcase size={20} />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Browse Jobs</p>
                <p className="text-xs text-gray-500">Explore open vacancies</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-gray-600 transition-transform group-hover:translate-x-1 group-hover:text-[#F97316]" />
          </Link>
        </div>

        {/* Support & Quick Contact */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-sm text-gray-400">
            Need urgent assistance?{' '}
            <Link to="/contact-us" className="inline-flex items-center gap-1 font-bold text-blue-400 no-underline hover:text-blue-300">
              <PhoneCall size={14} /> Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
