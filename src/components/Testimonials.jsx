import React, { useEffect, useMemo, useState } from 'react';
import { Building2, Star, UserCircle, Users, Quote } from 'lucide-react';
import { fetchTestimonials, extractMediaUrl } from '../utils/strapi';

const fallbackReviews = [
  {
    id: 1,
    reviewType: 'client',
    name: 'Abhijit Patil',
    role: 'HR',
    company: 'Jabil Circuits',
    quote: 'TSPL has helped us hire skilled candidates faster and with better fit for our workforce requirements. Their support has been reliable and consistent.',
    rating: 5,
    metric: '40,000+ placements',
  },
  {
    id: 3,
    reviewType: 'client',
    name: 'Mukesh Kumar',
    role: 'HR',
    company: 'RSB Transmission',
    quote: 'Their hiring support has helped us build a dependable pipeline of job-ready candidates. The process is simple, professional, and efficient.',
    rating: 5,
    metric: '25+ states covered',
  },
  {
    id: 5,
    reviewType: 'client',
    name: 'Amit Chauhan',
    role: 'HR',
    company: 'Voltas Limited',
    quote: 'TSPL understands our hiring needs and consistently connects us with suitable talent. Their service has added value to our recruitment efforts.',
    rating: 5,
    metric: 'Fast onboarding',
  },
  {
    id: 6,
    reviewType: 'client',
    name: 'Rajesh Patil',
    role: 'HR',
    company: 'Hyundai Motors',
    quote: 'We have received timely hiring support and quality candidates through TSPL. Their understanding of the manufacturing sector makes a real difference.',
    rating: 5,
    metric: 'Reliable hiring support',
  },
  {
    id: 7,
    reviewType: 'client',
    name: 'Anklesh Mahale',
    role: 'HR',
    company: 'Haier Appliances',
    quote: 'The candidates shared by TSPL have been relevant to our requirements and easy to onboard. Their team communicates clearly and works professionally.',
    rating: 5,
    metric: 'Quality candidate flow',
  },
  {
    id: 8,
    reviewType: 'client',
    name: 'Mangesh Takte',
    role: 'HR',
    company: 'LG Electronics',
    quote: 'TSPL has been a strong hiring partner for our organization. They help us fill roles faster while maintaining candidate quality and fit.',
    rating: 5,
    metric: 'Hiring efficiency',
  },
  {
    id: 9,
    reviewType: 'client',
    name: 'Bapusaheb Ghorpade',
    role: 'HR',
    company: 'Force Motor',
    quote: 'TSPL has helped us source dependable candidates for our hiring needs. Their support has been consistent, clear, and professional.',
    rating: 5,
    metric: 'Trusted hiring support',
  },
];

const tabs = [
  { key: 'all', label: 'All Reviews', icon: Users },
  { key: 'client', label: 'Client Reviews', icon: Building2 },
  { key: 'employee', label: 'Employee Reviews', icon: UserCircle },
];

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState('all');
  const [reviews, setReviews] = useState(fallbackReviews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  });

  useEffect(() => {
    const loadReviews = async () => {
      const data = await fetchTestimonials();
      if (data.length > 0) {
        setReviews(
          data
            .filter((item) => item.reviewType !== 'company')
            .map((item) => ({
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

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
        return;
      }

      if (window.innerWidth < 1024) {
        setCardsPerView(2);
        return;
      }

      setCardsPerView(3);
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const filteredReviews = useMemo(() => {
    return activeTab === 'all'
      ? reviews.filter((review) => review.reviewType === 'client' || review.reviewType === 'employee')
      : reviews.filter((review) => review.reviewType === activeTab);
  }, [activeTab, reviews]);

  const visibleReviews = filteredReviews.slice(currentIndex, currentIndex + cardsPerView);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab, cardsPerView]);

  useEffect(() => {
    if (filteredReviews.length <= cardsPerView) return undefined;

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + cardsPerView >= filteredReviews.length ? 0 : prev + cardsPerView));
    }, 6000);

    return () => window.clearInterval(interval);
  }, [cardsPerView, filteredReviews.length]);

  return (
    <section id="reviews" className="relative overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.18),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-white/70">
              Reviews
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Client and Employee Voices <span className="text-orange-400">That Matter</span>
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              Real feedback from the companies we support and the people whose careers we help shape.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-md sm:flex sm:flex-wrap sm:rounded-full">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-3 py-2 text-xs font-bold transition-all sm:w-auto sm:rounded-full sm:px-4 sm:text-sm ${
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

        <div className="w-full">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleReviews.map((review, index) => (
              <article
                key={`${review.id}-${index}`}
                className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/8 p-5 shadow-2xl shadow-black/20 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 sm:rounded-[2rem] sm:p-6"
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

                <Quote size={36} className="mb-4 text-white/15 sm:h-[42px] sm:w-[42px]" />
                <p className="min-h-[110px] text-sm leading-relaxed text-white/80 sm:min-h-[140px]">{review.quote}</p>

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

          {filteredReviews.length > cardsPerView ? (
            <div className="mt-6 flex items-center justify-center gap-2">
              {Array.from({ length: Math.ceil(filteredReviews.length / cardsPerView) }).map((_, pageIndex) => {
                const startIndex = pageIndex * cardsPerView;
                const isActive = currentIndex === startIndex;

                return (
                  <button
                    key={pageIndex}
                    type="button"
                    onClick={() => setCurrentIndex(startIndex)}
                    className={`h-2.5 rounded-full transition-all ${isActive ? 'w-7 bg-orange-400' : 'w-2.5 bg-white/30 hover:bg-white/50'}`}
                    aria-label={`Go to testimonials page ${pageIndex + 1}`}
                  />
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}