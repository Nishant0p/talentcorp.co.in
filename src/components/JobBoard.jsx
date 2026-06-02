import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, IndianRupee, Clock, ArrowRight, Filter, Briefcase, Car, Cpu, Factory } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { buildJobCategoryOptions, fetchJobs, getJobCategoryFilterValue, toJobFilterSlug } from '../utils/strapi';

const fallbackJobs = [
  { id: 1, title: 'Production Operator', company: 'Tata Motors', location: 'Pune, Maharashtra', salary: '₹18,000 - ₹25,000', type: 'Full-time', urgent: true },
  { id: 2, title: 'ITI Technician', company: 'Maruti Suzuki', location: 'Gurugram, Haryana', salary: '₹15,000 - ₹22,000', type: 'Apprenticeship', urgent: false },
  { id: 3, title: 'Quality Inspector', company: 'Bajaj Auto', location: 'Aurangabad, Maharashtra', salary: '₹20,000 - ₹28,000', type: 'Full-time', urgent: true },
  { id: 4, title: 'Electrical Trainee', company: 'L&T Construction', location: 'Chennai, Tamil Nadu', salary: '₹12,000 - ₹18,000', type: 'Apprenticeship', urgent: false },
  { id: 5, title: 'CNC Operator', company: 'Mahindra & Mahindra', location: 'Nashik, Maharashtra', salary: '₹22,000 - ₹30,000', type: 'Full-time', urgent: false },
  { id: 6, title: 'Assembly Line Worker', company: 'Hero MotoCorp', location: 'Haridwar, Uttarakhand', salary: '₹16,000 - ₹20,000', type: 'Contract', urgent: true },
];

const normalizeType = (value) => String(value || '').trim().toLowerCase();

const toNumber = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const numeric = Number(String(value).replace(/,/g, ''));
  return Number.isFinite(numeric) ? numeric : null;
};

const formatSalaryFromJob = (job) => {
  const salaryText = String(job?.salary || '').trim();
  if (salaryText) return salaryText;

  const min = toNumber(job?.salaryMin ?? job?.minSalary ?? job?.salary_from ?? job?.salaryFrom);
  const max = toNumber(job?.salaryMax ?? job?.maxSalary ?? job?.salary_to ?? job?.salaryTo);

  if (min !== null && max !== null) {
    return `INR ${min.toLocaleString('en-IN')} - INR ${max.toLocaleString('en-IN')}`;
  }
  if (min !== null) {
    return `INR ${min.toLocaleString('en-IN')}+`;
  }
  if (max !== null) {
    return `Up to INR ${max.toLocaleString('en-IN')}`;
  }

  return 'Salary on request';
};

const JobCard = ({ job, navigate }) => {
  return (
    <div className="h-full flex flex-col justify-between gap-5">
      <div>
        {/* Header Block: Logo & Title */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-black text-lg shadow-md transition-transform duration-300 group-hover:scale-105">
            {String(job.company || job.title || 'J').charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg tracking-tight group-hover:text-blue-600 transition-colors truncate">
                {job.title}
              </h3>
              {job.urgent && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-50 border border-orange-200 text-orange-600 animate-pulse">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-600 animate-ping" />
                  Urgent
                </span>
              )}
            </div>
            <p className="text-slate-600 text-xs font-semibold mt-1">{job.company}</p>
          </div>
        </div>

        {/* Info Tags Row */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 text-xs font-medium">
            <MapPin size={12} className="text-slate-400 shrink-0" />
            <span className="truncate max-w-[130px]">{job.location}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 text-xs font-medium">
            <IndianRupee size={12} className="text-slate-400 shrink-0" />
            <span className="truncate max-w-[130px]">{job.salary}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 text-xs font-medium">
            <Clock size={12} className="text-slate-400 shrink-0" />
            <span className="truncate max-w-[130px]">{job.type}</span>
          </span>
        </div>
      </div>

      {/* Action Block */}
      <div className="flex items-center justify-between border-t border-slate-100/80 pt-4 mt-auto">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          TalentCorp verified
        </span>
        <button
          onClick={() => navigate(`/job/${job.id}`)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white px-4 py-2 text-xs font-bold transition-all duration-300 active:scale-[0.98] group-hover:bg-blue-600 group-hover:text-white shrink-0 shadow-sm"
        >
          Apply Now <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

const JobBoard = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All Jobs');
  const [query, setQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const filterOptions = useMemo(() => {
    return buildJobCategoryOptions(jobs);
  }, [jobs]);

  const getIconForCategory = (categoryValue) => {
    const slug = String(categoryValue || '').toLowerCase().trim();
    if (slug.includes('automobile') || slug.includes('automotive')) return Car;
    if (slug.includes('electronics') || slug.includes('ems') || slug.includes('cpu')) return Cpu;
    if (slug.includes('manufacturing')) return Factory;
    return Briefcase;
  };

  const getCategoryCount = (categoryValue) => {
    const categorySlug = toJobFilterSlug(categoryValue);
    if (normalizeType(categoryValue) === 'all jobs') {
      return jobs.length;
    }
    return jobs.filter((job) => toJobFilterSlug(getJobCategoryFilterValue(job)) === categorySlug).length;
  };

  useEffect(() => {
    if (!filterOptions.some((option) => option.value === filter)) {
      setFilter('All Jobs');
    }
  }, [filter, filterOptions]);

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
          salary: formatSalaryFromJob(job),
          type: job.type || '',
          urgent: job.urgent || false,
        })));
      } else {
        setJobs(fallbackJobs);
      }
      setLoading(false);
    };
    loadJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const categoryFilterValue = toJobFilterSlug(getJobCategoryFilterValue(job));
      if (categoryFilterValue === 'overseas') {
        return false;
      }

      const byCategory = normalizeType(filter) === 'all jobs' || categoryFilterValue === filter;
      const normalized = query.trim().toLowerCase();
      if (!normalized) {
        return byCategory;
      }
      const haystack = `${job.title} ${job.company} ${job.location} ${job.category} ${job.type}`.toLowerCase();
      return byCategory && haystack.includes(normalized);
    });
  }, [jobs, filter, query]);

  return (
    <section className="px-0 py-2" id="job-board">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/40 px-5 py-6 shadow-[0_22px_55px_rgba(15,23,42,0.1)] backdrop-blur-xl sm:px-8 sm:py-8">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.12)_42%,rgba(59,130,246,0.06)_100%)]" />
          <div className="pointer-events-none absolute -left-16 -top-20 h-52 w-52 rounded-full bg-blue-300/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-orange-300/20 blur-3xl" />

          <div className="relative z-10">
            {/* Header section with Naukri-style premium layout */}
            <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-white/65 bg-white/45 px-6 py-6 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:px-8">
              <div className="pointer-events-none absolute -left-10 -top-12 h-36 w-36 rounded-full bg-blue-300/25 blur-2xl" />
              <div className="pointer-events-none absolute -right-14 bottom-[-4.5rem] h-44 w-44 rounded-full bg-orange-300/25 blur-2xl" />
              
              <div className="relative z-10 text-center lg:text-left">
                <span className="rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-orange-800">
                  Latest Openings
                </span>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Find Your Perfect Role</h2>
                <p className="mt-1 text-sm text-slate-600 font-medium">Explore opportunities across India&apos;s leading companies.</p>
              </div>
            </div>

            {/* Smart Search Bar */}
            <div className="mb-8 max-w-3xl mx-auto relative">
              <div className="relative w-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(59,130,246,0.1)] transition-all duration-300 rounded-2xl overflow-hidden border border-white/85">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search jobs, skills, companies, locations..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-2xl bg-white/90 py-4 pl-12 pr-12 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400/80 focus:bg-white"
                />
                {query && (
                  <button 
                    onClick={() => setQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Trending Categories Sector Explore Grid */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Trending Sectors</h3>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {filterOptions.map((type) => {
                  const IconComp = getIconForCategory(type.value);
                  const isActive = filter === type.value;
                  const count = getCategoryCount(type.value);
                  
                  return (
                    <button
                      key={type.value}
                      onClick={() => setFilter(type.value)}
                      className={`group relative flex flex-col justify-between p-5 rounded-2xl border text-left transition-all duration-300 ${
                        isActive
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/20 scale-[1.02]'
                          : 'bg-white/80 border-slate-100 text-slate-800 hover:border-blue-300 hover:bg-white hover:shadow-md'
                      }`}
                    >
                      {/* Icon */}
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300 ${
                        isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
                      }`}>
                        <IconComp size={20} />
                      </div>
                      
                      <div>
                        <h4 className={`font-bold text-sm tracking-tight line-clamp-2 ${isActive ? 'text-white' : 'text-slate-900'}`}>
                          {type.label}
                        </h4>
                        <p className={`text-xs mt-1.5 font-semibold ${isActive ? 'text-blue-50' : 'text-slate-600'}`}>
                          {count} {count === 1 ? 'Job' : 'Jobs'}
                        </p>
                      </div>
                      
                      {isActive && (
                        <span className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Staggered Jobs Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${filter}-${query}-grid`}
                className="grid grid-cols-1 gap-4 lg:grid-cols-2 auto-rows-fr"
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={prefersReducedMotion ? {} : { opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.12 : 0.25 }}
              >
                {filteredJobs.map((job, index) => (
                  <motion.article
                    key={job.id}
                    className="group h-full overflow-hidden rounded-2xl border border-white bg-white/70 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)]"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    exit={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
                    transition={{
                      duration: prefersReducedMotion ? 0.15 : 0.45,
                      delay: prefersReducedMotion ? 0 : Math.min(index * 0.04, 0.16),
                      ease: [0.215, 0.61, 0.355, 1]
                    }}
                  >
                    <JobCard job={job} navigate={navigate} />
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>

            {!loading && filteredJobs.length === 0 && (
              <div className="mt-12 text-center py-10 bg-slate-50/50 rounded-2xl border border-slate-100">
                <p className="text-slate-500 text-sm font-semibold">No open roles found matching your filter/query.</p>
                <button 
                  onClick={() => { setFilter('All Jobs'); setQuery(''); }} 
                  className="mt-4 text-xs font-extrabold uppercase text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Reset Search
                </button>
              </div>
            )}

            {/* View All Actions */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate('/jobs')}
                className="group relative inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-7 py-3.5 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                View All Opportunities
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobBoard;