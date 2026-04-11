import React, { useEffect, useMemo, useState } from 'react';
import { Building2, Star, UserCircle, Users, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchTestimonials, extractMediaUrl } from '../utils/strapi';

const fallbackReviews = [
  {
    id: 1,
    reviewType: 'client',
    name: 'Rajesh Sharma',
    role: 'HR Director',
    company: 'Tata Motors',
    quote: 'TSPL Group has been instrumental in helping us build a skilled workforce through their NAPS program. Their candidates are well-trained and job-ready.',
    rating: 5,
    metric: '40,000+ placements',
  },
  {
    id: 2,
    reviewType: 'company',
    name: 'Priya Mehta',
    role: 'Talent Acquisition Head',
    company: 'Mahindra & Mahindra',
    quote: 'Their understanding of government apprenticeship schemes and quick turnaround time makes them our preferred staffing partner.',
    rating: 5,
    metric: '98% retention',
  },
  {
    id: 3,
    reviewType: 'client',
    name: 'Amit Verma',
    role: 'Operations Manager',
    company: 'Bajaj Auto',
    quote: 'The quality of apprentices we receive from TSPL is exceptional. Their training programs ensure candidates are industry-ready from day one.',
    rating: 5,
    metric: '25+ states covered',
  },
  {
    id: 4,
    reviewType: 'employee',
    name: 'Rahul Singh',
    role: 'Production Trainee',
    company: 'Tata Motors',
    quote: 'Got a great start to my career through TSPL. The training was practical and the placement process was very smooth.',
    rating: 5,
    metric: 'Fast onboarding',
  },
];

const tabs = [
  { key: 'all', label: 'All Reviews', icon: Users },
  { key: 'client', label: 'Client Reviews', icon: Building2 },
  { key: 'company', label: 'Company Reviews', icon: Quote },
  { key: 'employee', label: 'Employee Reviews', icon: UserCircle },
];

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState('all');
  const [reviews, setReviews] = useState(fallbackReviews);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadReviews = async () => {
      const data = await fetchTestimonials();
      if (data.length > 0) {
        setReviews(
          data.map((item) => ({
            id: item.id,
            reviewType: item.reviewType || 'client',
            name: item.name || '',
            role: item.role || '',
            company: item.company || '',
            quote: item.quote || '',
            rating: item.rating || 5,
            metric: item.metric || '',
            image: item.image ? extractMediaUrl(item.image) : '',
          }))
        );
      }
    };

    loadReviews();
  }, []);

  const filteredReviews = useMemo(() => {
    return activeTab === 'all' ? reviews : reviews.filter((review) => review.reviewType === activeTab);
  }, [activeTab, reviews]);

  const visibleReviews = filteredReviews.slice(currentIndex, currentIndex + 3);
  const totalPages = Math.ceil(filteredReviews.length / 3);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  useEffect(() => {
    if (filteredReviews.length <= 3) return undefined;
    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 3 >= filteredReviews.length ? 0 : prev + 3));
    }, 6000);
    return () => window.clearInterval(interval);
  }, [filteredReviews.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 3 >= filteredReviews.length ? 0 : prev + 3));
  const previousSlide = () => setCurrentIndex((prev) => (prev - 3 < 0 ? Math.max(filteredReviews.length - 3, 0) : prev - 3));

  return (
    <section id="reviews" className="relative overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.18),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-white/70">
              Reviews
            </span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Client and Company Voices <span className="text-orange-400">That Matter</span>
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              Real feedback from the companies we support and the people whose careers we help shape.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur-md">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all ${
                    activeTab === tab.key ? 'bg-white text-slate-950 shadow-lg' : 'text-white/75 hover:bg-white/10'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-6 md:grid-cols-3">
            {visibleReviews.map((review, index) => (
              <article
                key={`${review.id}-${index}`}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-black/20 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="flex gap-1 text-orange-400">
                    {[...Array(review.rating || 5)].map((_, starIndex) => (
                      <Star key={starIndex} size={14} className="fill-current" />
                    ))}
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white/70">
                    {review.reviewType}
                  </span>
                </div>

                <Quote size={42} className="mb-4 text-white/15" />
                <p className="min-h-[140px] text-sm leading-relaxed text-white/80">{review.quote}</p>

                <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-800 text-sm font-bold text-white">
                    {review.image ? (
                      <img src={review.image} alt={review.name} className="h-full w-full object-cover" />
                    ) : (
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=1e293b&color=ffffff`}
                        alt={review.name}
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{review.name}</h3>
                    <p className="text-sm text-white/60">{review.role}</p>
                    <p className="text-xs font-bold text-orange-300">{review.company}</p>
                  </div>
                </div>

                {review.metric ? (
                  <div className="mt-5 inline-flex rounded-full bg-orange-500/15 px-3 py-1 text-[11px] font-bold text-orange-200">
                    {review.metric}
                  </div>
                ) : null}
              </article>
            ))}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-white/45">Featured Insight</p>
                <h3 className="mt-2 text-2xl font-bold text-white">What people love about TSPL</h3>
              </div>
              <div className="rounded-2xl bg-white/10 p-3 text-orange-300">
                <Building2 size={22} />
              </div>
            </div>

            <div className="space-y-4">
              {[
                'Trusted by companies across manufacturing, pharma, logistics, and more.',
                'A single partner for hiring, compliance, payroll, and deployment.',
                'Reviews update from Strapi, so your social proof stays current.',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm leading-relaxed text-white/75">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <button onClick={previousSlide} className="rounded-full border border-white/15 bg-white/5 p-3 text-white transition-colors hover:bg-white/10" aria-label="Previous reviews">
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index * 3)}
                    className={`h-2 rounded-full transition-all ${currentIndex === index * 3 ? 'w-8 bg-orange-400' : 'w-2 bg-white/20'}`}
                    aria-label={`Go to review slide ${index + 1}`}
                  />
                ))}
              </div>

              <button onClick={nextSlide} className="rounded-full border border-white/15 bg-white/5 p-3 text-white transition-colors hover:bg-white/10" aria-label="Next reviews">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}