import React, { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { fetchTestimonials, extractMediaUrl } from '../utils/strapi';
import { useSectionReveal } from '../hooks/useSectionReveal';

const fallbackTestimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "CEO, TechNova",
    content: "Bhai, inka kaam ekdum top-notch hai! Mere website ka conversion rate double ho gaya inki design ke baad. Highly recommended for anyone looking to scale.",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 5
  },
  {
    id: 2,
    name: "Priya Desai",
    role: "Marketing Head, GrowthX",
    content: "The level of professionalism and creativity is unmatched. We needed a fresh look for our landing pages, and they delivered beyond our expectations.",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Founder, StartupHub",
    content: "Cold outreach emails aur UI/UX dono mein inka jawab nahi. Client onboarding smooth ho gayi hai ab. Best investment for our business this year.",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 4
  }
];

export default function ClientVoicesSection() {
  const { isVisible, sectionRef } = useSectionReveal(0.2);
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadTestimonials = async () => {
      try {
        const data = await fetchTestimonials();
        if (!isMounted) return;

        if (data && data.length > 0) {
          const mapped = data
            .filter((item) => item.reviewType === 'client' || item.type === 'client')
            .slice(0, 3)
            .map((item) => ({
              id: item.id || item.documentId,
              name: item.name || 'Client',
              company: item.company || item.organization || item.role || item.position || 'Company',
              content: item.quote || item.content || '',
              avatar: item.image ? extractMediaUrl(item.image) : `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
              rating: item.rating || 5,
            }));

          if (mapped.length > 0) {
            setTestimonials(mapped);
          }
        }
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTestimonials();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900 lg:text-5xl">
            Client <span className="text-orange-500">Voices That Matter</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Real feedback from the companies we support.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative hover:-translate-y-2 transition-all duration-300 ease-out group border border-gray-50 hover:border-indigo-100 flex flex-col h-full ${
                isVisible ? `opacity-100 translate-y-0` : `opacity-0 translate-y-4`
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
              }}
            >
              {/* Background Quote Icon */}
              <div className="absolute top-6 right-8 text-indigo-50/50 group-hover:text-indigo-100 transition-colors duration-300">
                <Quote size={60} fill="currentColor" />
              </div>

              {/* Star Ratings */}
              <div className="flex space-x-1 mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? "text-amber-400" : "text-gray-200"}
                    fill="currentColor"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 text-lg leading-relaxed mb-8 relative z-10 flex-grow">
                "{testimonial.content}"
              </p>

              {/* User Info */}
              <div className="mt-auto border-t border-gray-50 pt-6">
                <div>
                  <h4 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{testimonial.name}</h4>
                  <p className="text-sm font-medium text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
