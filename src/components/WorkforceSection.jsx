import React from 'react';
import { CheckCircle2, ArrowRight, Users, Building2, Settings, BarChart3, UserCircle2 } from 'lucide-react';

const WorkforceSection = () => {
  return (
    <div className="relative min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Background is now pure white with no texture for maximum clarity */}

      {/* Extra edge textures for a richer frame */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-24 h-10 w-80 -rotate-12 rounded-full bg-gradient-to-r from-orange-200/55 via-orange-100/40 to-transparent blur-sm" />
        <div className="absolute -right-24 bottom-24 h-10 w-96 rotate-12 rounded-full bg-gradient-to-l from-blue-300/55 via-blue-100/45 to-transparent blur-sm" />

        <div
          className="absolute -left-20 -top-16 h-64 w-64 rounded-full opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(249,115,22,0.28) 1.1px, transparent 1.1px), radial-gradient(circle at center, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0.05) 52%, transparent 74%)',
            backgroundSize: '13px 13px, 100% 100%',
          }}
        />
        <div
          className="absolute -right-24 -top-10 h-72 w-72 rounded-full opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(37,99,235,0.24) 1.1px, transparent 1.1px), radial-gradient(circle at center, rgba(37,99,235,0.16) 0%, rgba(37,99,235,0.06) 50%, transparent 74%)',
            backgroundSize: '13px 13px, 100% 100%',
          }}
        />
        <div
          className="absolute -left-24 -bottom-20 h-72 w-72 rounded-full opacity-35"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(249,115,22,0.22) 1px, transparent 1px), radial-gradient(circle at center, rgba(249,115,22,0.14) 0%, rgba(249,115,22,0.04) 55%, transparent 76%)',
            backgroundSize: '14px 14px, 100% 100%',
          }}
        />
        <div
          className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full opacity-35"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(37,99,235,0.2) 1px, transparent 1px), radial-gradient(circle at center, rgba(37,99,235,0.14) 0%, rgba(37,99,235,0.04) 56%, transparent 78%)',
            backgroundSize: '14px 14px, 100% 100%',
          }}
        />

        <div className="absolute left-10 top-1/3 h-5 w-5 rotate-45 rounded-[4px] border border-orange-200/80 bg-orange-100/60" />
        <div className="absolute right-14 top-[38%] h-4 w-4 rounded-full border border-blue-300/80 bg-blue-100/70" />
        <div className="absolute left-1/4 bottom-12 h-6 w-6 rotate-12 rounded-md border border-orange-200/80 bg-orange-100/55 hidden sm:block" />
        <div className="absolute right-1/4 bottom-14 h-5 w-5 -rotate-12 rounded-md border border-blue-300/80 bg-blue-100/60 hidden sm:block" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-orange-500">Solutions for Everyone</h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Whether you're looking for your next opportunity or seeking skilled talent, we've got you covered.
          </p>
        </div>

        <div className="relative">
          {/* Very light blue/orange dot-fade textures behind cards */}
          <div
            className="pointer-events-none absolute -left-8 top-6 h-48 w-48 rounded-full opacity-60"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(249,115,22,0.34) 1.2px, transparent 1.2px), radial-gradient(circle at center, rgba(249,115,22,0.2) 0%, rgba(249,115,22,0.08) 45%, transparent 70%)',
              backgroundSize: '12px 12px, 100% 100%',
            }}
          />
          <div
            className="pointer-events-none absolute -right-8 top-10 h-56 w-56 rounded-full opacity-60"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(37,99,235,0.3) 1.2px, transparent 1.2px), radial-gradient(circle at center, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.08) 48%, transparent 72%)',
              backgroundSize: '12px 12px, 100% 100%',
            }}
          />

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* CARD 1: JOB SEEKERS (Orange Theme) */}
          <div className="group relative bg-white rounded-[2.25rem] overflow-hidden shadow-[0_18px_40px_rgba(255,140,0,0.1)] border border-gray-100 transition-all hover:shadow-[0_18px_50px_rgba(255,140,0,0.15)] hover:-translate-y-1">
            {/* Image Header with Gradient Fade */}
            <div className="relative h-60 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
                alt="Skilled Indian workers"
                className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
              <span className="absolute top-6 left-6 bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <Users size={14} /> For Job Seekers
              </span>
              <span className="absolute top-6 right-6 bg-yellow-400 text-black text-[10px] font-black px-3 py-1 rounded shadow-md tracking-widest">NEW</span>
            </div>

            {/* Card Body */}
            <div className="p-8 relative">
              {/* VISUAL DECORATION (Right Side) */}
              <div className="absolute right-8 top-12 flex flex-col items-end gap-6 text-orange-200/60 hidden lg:flex pointer-events-none">
                <Settings size={48} className="animate-spin-slow" />
                <div className="flex gap-1 items-end h-10">
                  <div className="w-1.5 bg-orange-100 h-1/2 rounded-full"></div>
                  <div className="w-1.5 bg-orange-200 h-full rounded-full"></div>
                  <div className="w-1.5 bg-orange-100 h-2/3 rounded-full"></div>
                </div>
                <UserCircle2 size={40} />
              </div>

              <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Launch Your Career</h2>
              <p className="text-gray-500 mb-7 text-base leading-relaxed max-w-[82%]">
                Get access to thousands of job opportunities with top companies. We help you build a successful career.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'We help you find your job easily.',
                  'Get recognized training that works.',
                  'Build your skills and get a paper.',
                  'Meet great employers directly.',
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-700 font-medium group/item">
                    <div className="bg-orange-50 p-1 rounded-full text-orange-600 group-hover/item:bg-orange-600 group-hover/item:text-white transition-colors">
                      <CheckCircle2 size={18} />
                    </div>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-2xl shadow-[0_10px_20px_rgba(249,115,22,0.3)] flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
                Apply Now <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* CARD 2: EMPLOYERS (Blue Theme) */}
          <div className="group relative bg-white rounded-[2.25rem] overflow-hidden shadow-[0_18px_40px_rgba(37,99,235,0.1)] border border-gray-100 transition-all hover:shadow-[0_18px_50px_rgba(37,99,235,0.15)] hover:-translate-y-1">
            {/* Image Header with Gradient Fade */}
            <div className="relative h-60 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80"
                alt="Business management"
                className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
              <span className="absolute top-6 left-6 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <Building2 size={14} /> For Employers
              </span>
              <span className="absolute top-6 right-6 bg-cyan-400 text-black text-[10px] font-black px-3 py-1 rounded shadow-md tracking-widest">NEW</span>
            </div>

            {/* Card Body */}
            <div className="p-8 relative">
              {/* VISUAL DECORATION (Right Side) */}
              <div className="absolute right-8 top-12 flex flex-col items-end gap-6 text-blue-200/60 hidden lg:flex pointer-events-none">
                <BarChart3 size={48} />
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-lg border-2 border-blue-100 flex items-center justify-center text-[10px] font-bold">100%</div>
                </div>
                <Settings size={40} className="animate-reverse-spin" />
              </div>

              <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Build Your Team</h2>
              <p className="text-gray-500 mb-7 text-base leading-relaxed max-w-[82%]">
                Access a vast pool of skilled workers. Use government schemes to reduce costs while building a talented team.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Find pre-screened people, fast.',
                  'We manage all paperwork for you.',
                  'Get money-saving stipend benefits.',
                  'Find flexible staff just for you.',
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-700 font-medium group/item">
                    <div className="bg-blue-50 p-1 rounded-full text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                      <CheckCircle2 size={18} />
                    </div>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-2xl shadow-[0_10px_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
                Hire Now <ArrowRight size={20} />
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes reverse-spin { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
          .animate-spin-slow { animation: spin 8s linear infinite; }
          .animate-reverse-spin { animation: reverse-spin 10s linear infinite; }
        `,
        }}
      />
    </div>
  );
};

export default WorkforceSection;