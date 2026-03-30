import React, { useMemo, useState } from 'react';
import { Star, Quote, Building2, UserCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const clientReviews = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    role: 'HR Director',
    company: 'Tata Motors',
    text: 'TSPL Group has been instrumental in helping us build a skilled workforce through their NAPS program. Their candidates are well-trained and job-ready. Highly recommend their services!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya Mehta',
    role: 'Talent Acquisition Head',
    company: 'Mahindra & Mahindra',
    text: "We've partnered with TSPL for over 3 years now. Their understanding of government apprenticeship schemes and quick turnaround time makes them our preferred staffing partner.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Amit Verma',
    role: 'Operations Manager',
    company: 'Bajaj Auto',
    text: 'The quality of apprentices we receive from TSPL is exceptional. Their training programs ensure candidates are industry-ready from day one. A great team to work with.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Sanya Gupta',
    role: 'Head of HR',
    company: 'Hero MotoCorp',
    text: "TSPL's contract staffing solutions have helped us scale our workforce efficiently. Their compliance management and payroll services are seamless and reliable.",
    rating: 5,
  },
];

const employeeReviews = [
  {
    id: 1,
    name: 'Rahul Singh',
    role: 'Production Trainee',
    company: 'Tata Motors',
    text: 'Got a great start to my career through TSPL. The training was practical and the placement process was very smooth.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Anjali Rao',
    role: 'Quality Assistant',
    company: 'Mahindra & Mahindra',
    text: 'I am very happy with the job TSPL found for me. They helped me with all the government paperwork and my stipend comes on time.',
    rating: 5,
  },
];

const Testimonials = () => {
  const [activeTab, setActiveTab] = useState('clients');
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentReviews = useMemo(() => {
    return activeTab === 'clients' ? clientReviews : employeeReviews;
  }, [activeTab]);

  const itemsPerSlide = 2;
  const totalSlides = Math.ceil(currentReviews.length / itemsPerSlide);
  const visibleReviews = currentReviews.slice(currentIndex * itemsPerSlide, (currentIndex + 1) * itemsPerSlide);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  React.useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  // Auto-scroll through slides every 5.5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 5500);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8">
      {/* Background Textures */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Slanting line pattern overlay */}
        <div
          className="absolute inset-0 opacity-55"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(37,99,235,0.1) 0px, rgba(37,99,235,0.1) 1px, transparent 1px, transparent 18px)',
          }}
        />

        {/* Corner dot-fade textures */}
        <div
          className="absolute -left-24 -top-16 h-72 w-72 rounded-full opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(249,115,22,0.32) 1.1px, transparent 1.1px), radial-gradient(circle at center, rgba(249,115,22,0.22) 0%, rgba(249,115,22,0.08) 50%, transparent 74%)',
            backgroundSize: '13px 13px, 100% 100%',
          }}
        />
        <div
          className="absolute -right-24 -bottom-20 h-80 w-80 rounded-full opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(37,99,235,0.3) 1px, transparent 1px), radial-gradient(circle at center, rgba(37,99,235,0.22) 0%, rgba(37,99,235,0.06) 55%, transparent 76%)',
            backgroundSize: '14px 14px, 100% 100%',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <div className="mb-12">
          <span className="rounded-full bg-blue-50 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-blue-600">
            Testimonials
          </span>
          <h2 className="mb-4 mt-4 text-4xl font-extrabold text-[#1a2b4b] sm:text-5xl">
            Voices of <span className="text-blue-600">Success</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-500">
            Hear from the companies we partner with and the careers we have transformed
          </p>
        </div>

        <div className="mb-16 mx-auto inline-flex w-full max-w-md items-center rounded-full border border-blue-100 bg-blue-50/70 p-1.5 sm:w-auto sm:max-w-none">
          <button
            onClick={() => setActiveTab('clients')}
            className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition-all sm:flex-none sm:px-8 sm:py-3 sm:text-base ${
              activeTab === 'clients' ? 'bg-white text-blue-600 shadow-md shadow-blue-100/80' : 'text-gray-500 hover:bg-white/70 hover:text-gray-700'
            }`}
          >
            <Building2 size={18} /> Client Reviews
          </button>
          <button
            onClick={() => setActiveTab('employees')}
            className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition-all sm:flex-none sm:px-8 sm:py-3 sm:text-base ${
              activeTab === 'employees' ? 'bg-white text-blue-600 shadow-md shadow-blue-100/80' : 'text-gray-500 hover:bg-white/70 hover:text-gray-700'
            }`}
          >
            <UserCircle size={18} /> Employee Reviews
          </button>
        </div>

        <div key={activeTab} className="relative">
          {/* Carousel Container */}
          <div className="relative mb-8">
            <div className="testimonial-switch grid gap-8 text-left md:grid-cols-2">
              {visibleReviews.map((review) => (
                <article
                  key={`${activeTab}-${review.id}`}
                  className="testimonial-card group relative rounded-[2.5rem] border border-gray-100 bg-white p-6 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] sm:p-10"
                >
                  <div className="absolute right-10 top-8 text-blue-100 transition-colors group-hover:text-blue-200">
                    <Quote size={40} fill="currentColor" />
                  </div>

                  <div className="mb-6 flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="relative z-10 mb-8 text-lg italic leading-relaxed text-gray-600">"{review.text}"</p>

                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-blue-50 font-bold text-blue-600 shadow-sm">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=eff6ff&color=2563eb`}
                        alt={review.name}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{review.name}</h4>
                      <p className="text-sm text-gray-500">{review.role}</p>
                      <p className="mt-0.5 text-xs font-bold text-blue-600">{review.company}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Carousel Navigation - Subtle for auto-scrolling */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={goToPrevious}
              className="rounded-full border-2 border-gray-200 p-3 text-gray-400 transition-all hover:border-blue-400 hover:text-blue-600 active:scale-95"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Slide Indicators */}
            <div className="flex gap-2">
              {[...Array(totalSlides)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="rounded-full border-2 border-gray-200 p-3 text-gray-400 transition-all hover:border-blue-400 hover:text-blue-600 active:scale-95"
              aria-label="Next testimonials"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;