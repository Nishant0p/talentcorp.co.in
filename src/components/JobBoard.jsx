import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, IndianRupee, Clock, ArrowRight, Filter } from 'lucide-react';

const jobs = [
  { id: 1, title: 'Production Operator', company: 'Tata Motors', location: 'Pune, Maharashtra', salary: '₹18,000 - ₹25,000', type: 'Full-time', urgent: true },
  { id: 2, title: 'ITI Technician', company: 'Maruti Suzuki', location: 'Gurugram, Haryana', salary: '₹15,000 - ₹22,000', type: 'Apprenticeship', urgent: false },
  { id: 3, title: 'Quality Inspector', company: 'Bajaj Auto', location: 'Aurangabad, Maharashtra', salary: '₹20,000 - ₹28,000', type: 'Full-time', urgent: true },
  { id: 4, title: 'Electrical Trainee', company: 'L&T Construction', location: 'Chennai, Tamil Nadu', salary: '₹12,000 - ₹18,000', type: 'Apprenticeship', urgent: false },
  { id: 5, title: 'CNC Operator', company: 'Mahindra & Mahindra', location: 'Nashik, Maharashtra', salary: '₹22,000 - ₹30,000', type: 'Full-time', urgent: false },
  { id: 6, title: 'Assembly Line Worker', company: 'Hero MotoCorp', location: 'Haridwar, Uttarakhand', salary: '₹16,000 - ₹20,000', type: 'Contract', urgent: true },
];

const filters = ['All Jobs', 'Apprenticeship', 'Full-time', 'Contract'];

const JobBoard = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All Jobs');
  const [query, setQuery] = useState('');

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const byType = filter === 'All Jobs' || job.type === filter;
      const normalized = query.trim().toLowerCase();
      if (!normalized) {
        return byType;
      }
      const haystack = `${job.title} ${job.company} ${job.location} ${job.type}`.toLowerCase();
      return byType && haystack.includes(normalized);
    });
  }, [filter, query]);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-12 sm:px-6 lg:px-6 xl:px-8" id="job-board">
      {/* Background Textures */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Slanting line pattern overlay */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(37,99,235,0.12) 0px, rgba(37,99,235,0.12) 1px, transparent 1px, transparent 16px)',
          }}
        />

        {/* Corner dot-fade textures */}
        <div
          className="absolute -right-48 -top-20 h-96 w-96 rounded-full opacity-70"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(249,115,22,0.35) 1.1px, transparent 1.1px), radial-gradient(circle at center, rgba(249,115,22,0.24) 0%, rgba(249,115,22,0.08) 50%, transparent 74%)',
            backgroundSize: '13px 13px, 100% 100%',
          }}
        />
        <div
          className="absolute -left-32 bottom-12 h-72 w-72 rounded-full opacity-65"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(37,99,235,0.32) 1px, transparent 1px), radial-gradient(circle at center, rgba(37,99,235,0.22) 0%, rgba(37,99,235,0.06) 55%, transparent 76%)',
            backgroundSize: '14px 14px, 100% 100%',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="rounded-full bg-orange-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-600">
            Latest Openings
          </span>
          <h2 className="mt-4 mb-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Find Your Perfect Role</h2>
          <p className="text-lg text-gray-500">Explore thousands of opportunities across India's leading companies</p>
        </div>

        <div className="mb-12 flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
          <div className="relative w-full flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search jobs, companies, locations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-12 pr-4 shadow-sm outline-none transition-all focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full lg:w-auto">
            <div className="flex flex-wrap gap-2 lg:flex-nowrap">
              {filters.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`rounded-2xl border px-5 py-3.5 text-sm font-semibold transition-all sm:px-6 sm:py-4 sm:text-base ${
                    filter === type
                      ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-blue-400'
                  }`}
                >
                  {type}
                </button>
              ))}
              <button className="rounded-2xl border border-gray-200 bg-white p-4 text-gray-600 hover:bg-gray-50" aria-label="Open filters">
                <Filter size={20} />
              </button>
            </div>
          </div>
        </div>

        <div key={`${filter}-${query}`} className="job-grid-switch grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <article
              key={job.id}
              className="job-card-animate group relative rounded-[1.75rem] border border-gray-100 bg-white p-6 lg:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]"
            >
              {job.urgent && (
                <span className="absolute right-6 top-6 rounded-md border border-orange-100 bg-orange-50 px-3 py-1 text-[10px] font-bold text-orange-600">
                  Urgent
                </span>
              )}

              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-600">
                  {job.company.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold leading-tight text-gray-900">{job.title}</h3>
                  <p className="font-medium text-gray-500">{job.company}</p>
                </div>
              </div>

              <div className="mb-8 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <MapPin size={16} className="text-gray-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-500">
                  <IndianRupee size={16} className="text-gray-400" />
                  <span className="text-gray-900">{job.salary}/month</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Clock size={16} className="text-gray-400" />
                  <span>{job.type}</span>
                </div>
              </div>

              <button
                onClick={() => navigate(`/job/${job.id}`)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-600 px-4 py-3 font-bold text-blue-600 transition-all group-hover:bg-blue-600 group-hover:text-white"
              >
                Apply Now <ArrowRight size={18} />
              </button>
            </article>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <p className="mt-8 text-center text-gray-500">No jobs found for your current search/filter.</p>
        )}

        <div className="mt-12 flex justify-center">
          <button className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 text-base font-bold text-white shadow-[0_12px_24px_rgba(249,115,22,0.28)] transition-all hover:from-orange-600 hover:to-orange-700 hover:shadow-[0_14px_28px_rgba(249,115,22,0.35)] active:scale-[0.98]">
            View All Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobBoard;