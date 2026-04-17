import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, IndianRupee, Clock, ArrowRight, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchJobs } from '../utils/strapi';

const fallbackJobs = [
  { id: 1, title: 'Production Operator', company: 'Tata Motors', location: 'Pune, Maharashtra', salary: '₹18,000 - ₹25,000', type: 'Full-time', urgent: true },
  { id: 2, title: 'ITI Technician', company: 'Maruti Suzuki', location: 'Gurugram, Haryana', salary: '₹15,000 - ₹22,000', type: 'Apprenticeship', urgent: false },
  { id: 3, title: 'Quality Inspector', company: 'Bajaj Auto', location: 'Aurangabad, Maharashtra', salary: '₹20,000 - ₹28,000', type: 'Full-time', urgent: true },
  { id: 4, title: 'Electrical Trainee', company: 'L&T Construction', location: 'Chennai, Tamil Nadu', salary: '₹12,000 - ₹18,000', type: 'Apprenticeship', urgent: false },
  { id: 5, title: 'CNC Operator', company: 'Mahindra & Mahindra', location: 'Nashik, Maharashtra', salary: '₹22,000 - ₹30,000', type: 'Full-time', urgent: false },
  { id: 6, title: 'Assembly Line Worker', company: 'Hero MotoCorp', location: 'Haridwar, Uttarakhand', salary: '₹16,000 - ₹20,000', type: 'Contract', urgent: true },
];

const filters = ['All Jobs', 'Apprenticeship', 'Full-time', 'Contract', 'Part-time'];

const JobBoard = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All Jobs');
  const [query, setQuery] = useState('');
  const [jobs, setJobs] = useState(fallbackJobs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      const data = await fetchJobs();
      if (data.length > 0) {
        setJobs(data.map(job => ({
          id: job.id,
        title: job.title || job.documentId || `Job ${job.id}`,
          company: job.company || '',
        category: job.category || job.type || '',
          location: job.location || '',
          salary: job.salary || '',
          type: job.type || '',
          urgent: job.urgent || false,
        })));
      }
      setLoading(false);
    };
    loadJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const jobType = (job.type || '').trim();
      if (jobType.toLowerCase() === 'overseas') {
        return false;
      }

      const byType = filter === 'All Jobs' || jobType === filter;
      const normalized = query.trim().toLowerCase();
      if (!normalized) {
        return byType;
      }
      const haystack = `${job.title} ${job.company} ${job.location} ${job.category} ${jobType}`.toLowerCase();
      return byType && haystack.includes(normalized);
    });
  }, [filter, query]);

  return (
    <section className="px-0 py-6" id="job-board">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/40 px-5 py-6 shadow-[0_22px_55px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:px-8 sm:py-8">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.12)_42%,rgba(59,130,246,0.10)_100%)]" />
          <div className="pointer-events-none absolute -left-16 -top-20 h-52 w-52 rounded-full bg-blue-300/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-orange-300/30 blur-3xl" />

          <div className="relative z-10">
        <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-white/65 bg-white/45 px-6 py-6 shadow-[0_16px_45px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:px-8">
          <div className="pointer-events-none absolute -left-10 -top-12 h-36 w-36 rounded-full bg-blue-300/35 blur-2xl" />
          <div className="pointer-events-none absolute -right-14 bottom-[-4.5rem] h-44 w-44 rounded-full bg-orange-300/35 blur-2xl" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.52)_0%,rgba(255,255,255,0.18)_48%,rgba(59,130,246,0.10)_100%)]" />

          <div className="relative z-10">
            <span className="rounded-full border border-slate-300/70 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
              Latest Openings
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Find Your Perfect Role</h2>
            <p className="mt-1 text-base text-slate-700/90">Explore opportunities across India&apos;s leading companies.</p>
          </div>
        </div>

        <div className="mb-8 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search jobs, companies, locations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-white/70 bg-white/75 py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === type
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-white/80 bg-white/80 text-slate-700 hover:border-slate-300'
                }`}
              >
                {type}
              </button>
            ))}
            <button className="rounded-md border border-white/80 bg-white/80 p-2.5 text-slate-600 hover:bg-white" aria-label="Open filters">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${filter}-${query}`}
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredJobs.map((job, index) => (
              <motion.article
                key={job.id}
                className="rounded-2xl border border-white/80 bg-white/78 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-colors hover:border-blue-300"
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ y: -4 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.09,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-lg font-bold text-slate-900">{job.title}</h3>
                    {job.urgent && (
                      <span className="rounded-sm border border-orange-200 bg-orange-50 px-2 py-0.5 text-[11px] font-semibold text-orange-700">
                        Urgent
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-medium text-slate-600">{job.company}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={15} className="text-slate-400" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <IndianRupee size={15} className="text-slate-400" />
                      {job.salary}/month
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={15} className="text-slate-400" />
                      {job.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 lg:pl-4">
                  <button
                    onClick={() => navigate(`/job/${job.id}`)}
                    className="inline-flex items-center gap-2 rounded-md border border-blue-600 px-4 py-2.5 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    Apply Now <ArrowRight size={16} />
                  </button>
                </div>
              </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredJobs.length === 0 && (
          <p className="mt-8 text-center text-slate-500">No jobs found for your current search/filter.</p>
        )}

        <div className="mt-8 flex justify-center">
          <button className="rounded-md bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800">
            View All Jobs
          </button>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobBoard;