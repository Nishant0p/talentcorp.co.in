import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, HelpCircle, ArrowRight, Lightbulb, XCircle } from 'lucide-react';
import { fetchFaqItems } from '../utils/strapi';

const fallbackFaqs = [
  {
    id: '01',
    question: 'What is NAPS (National Apprenticeship Promotion Scheme)?',
    answer: 'NAPS is a government initiative to promote apprenticeship in India by providing financial incentives to establishments and sharing the cost of training with employers.',
  },
  {
    id: '02',
    question: 'What is NATS (National Apprenticeship Training Scheme)?',
    answer: 'NATS is a one-year program equipping students with practical knowledge and skills required in their field of work, offered by the Ministry of Education.',
  },
  {
    id: '03',
    question: 'Who is eligible for apprenticeship programs?',
    answer: 'Eligibility varies by scheme, but generally includes ITI holders, Diploma holders, and Graduates looking for industry-standard skill development.',
  },
  {
    id: '04',
    question: 'How does TSPL Group help employers?',
    answer: 'We handle end-to-end compliance, sourcing, and training, allowing employers to focus on their core business while we build their skilled workforce.',
  },
  {
    id: '05',
    question: 'Is there any fee for job seekers?',
    answer: 'No, TSPL Group does not charge job seekers any fees for registration or placement in our certified apprenticeship programs.',
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [faqs, setFaqs] = useState(fallbackFaqs);

  // Filter FAQs based on search input
  const filteredFaqs = useMemo(() => {
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  useEffect(() => {
    const loadFaqs = async () => {
      const data = await fetchFaqItems();
      if (data.length > 0) {
        setFaqs(
          data.map((item, index) => ({
            id: String(index + 1).padStart(2, '0'),
            question: item.question || '',
            answer: item.answer || '',
          }))
        );
      }
    };

    loadFaqs();
  }, []);

  // Reset active index if the current selection is filtered out
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setActiveIndex(0);
  };

  return (
    <section className="bg-white min-h-screen py-24 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/40 to-transparent pointer-events-none" />
      <div className="absolute -right-64 top-20 w-[500px] h-[500px] rounded-full bg-orange-50/30 blur-[120px] pointer-events-none opacity-60" />
      <div
        className="pointer-events-none absolute right-[-4rem] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(255,140,0,0.30) 0 2px, transparent 2.5px), radial-gradient(circle at center, rgba(30,64,175,0.18) 0 2px, transparent 2.5px), radial-gradient(circle at center, rgba(255,140,0,0.10) 0 1px, transparent 1.5px)',
          backgroundSize: '14px 14px, 24px 24px, 8px 8px',
          backgroundPosition: '0 0, 6px 8px, 2px 3px',
          maskImage: 'radial-gradient(circle, black 30%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 72%)',
        }}
      />
      <div
        className="pointer-events-none absolute right-[6rem] top-[58%] h-44 w-44 -translate-y-1/2 rounded-full opacity-45"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(255,140,0,0.24) 0 1.5px, transparent 1.5px), radial-gradient(circle at center, rgba(30,64,175,0.16) 0 1.5px, transparent 1.5px)',
          backgroundSize: '12px 12px, 20px 20px',
          maskImage: 'radial-gradient(circle, black 20%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(circle, black 20%, transparent 72%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* === HEADER SECTION === */}
        <div className="mb-16 flex flex-col justify-between gap-10 text-center lg:flex-row lg:items-end lg:text-left">
          <div className="relative max-w-2xl">
            <div
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-70"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 20%, rgba(255,140,0,0.14) 0 1px, transparent 1px), radial-gradient(circle at 80% 30%, rgba(30,64,175,0.12) 0 1px, transparent 1px), radial-gradient(circle at 40% 80%, rgba(255,140,0,0.1) 0 1px, transparent 1px), repeating-linear-gradient(135deg, rgba(255,140,0,0.04) 0px, rgba(255,140,0,0.04) 1px, transparent 1px, transparent 18px)',
                backgroundSize: '28px 28px, 32px 32px, 36px 36px, 100% 100%',
              }}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-6">
              <HelpCircle size={14} /> Support
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1e3a8a] leading-[1.1] mb-6">
              Clear answers for your <br/>
              <span className="text-orange-500">growth journey.</span>
            </h2>
            
            {/* Search Input Field */}
            <div className="relative max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-blue-400 group-focus-within:text-orange-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search questions or keywords..."
                value={searchQuery}
                onChange={handleSearch}
                className="block w-full pl-11 pr-4 py-4 bg-white border border-blue-100 rounded-2xl text-[#1e3a8a] placeholder-blue-300 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all shadow-sm"
              />
            </div>
          </div>
          
          <Link
            to="/contact-us"
            className="group relative inline-flex items-center gap-3 self-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl border-2 border-orange-300 font-bold shadow-[0_12px_24px_-8px_rgba(249,115,22,0.4)] transition-all duration-300 lg:self-auto"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-14 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full opacity-70"
              style={{
                backgroundImage:
                  'radial-gradient(circle at center, rgba(255,140,0,0.34) 0 2px, transparent 2px), radial-gradient(circle at center, rgba(30,64,175,0.16) 0 1.5px, transparent 1.5px), radial-gradient(circle at center, rgba(255,140,0,0.08) 0 1px, transparent 1px)',
                backgroundSize: '12px 12px, 18px 18px, 7px 7px',
                backgroundPosition: '0 0, 4px 5px, 2px 3px',
                maskImage: 'radial-gradient(circle, black 34%, transparent 78%)',
                WebkitMaskImage: 'radial-gradient(circle, black 34%, transparent 78%)',
              }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-8 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full opacity-35"
              style={{
                backgroundImage:
                  'radial-gradient(circle at center, rgba(255,140,0,0.2) 0 1.5px, transparent 1.5px), radial-gradient(circle at center, rgba(30,64,175,0.12) 0 1.5px, transparent 1.5px)',
                backgroundSize: '16px 16px, 26px 26px',
                maskImage: 'radial-gradient(circle, black 18%, transparent 76%)',
                WebkitMaskImage: 'radial-gradient(circle, black 18%, transparent 76%)',
              }}
            />
            Contact us
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* === MASTER-DETAIL LAYOUT === */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 min-h-[500px]">
          
          {/* LEFT: Filtered Question List */}
          <div className="lg:col-span-5 space-y-3">
            <AnimatePresence mode='popLayout'>
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <motion.button
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={faq.id}
                      onClick={() => setActiveIndex(index)}
                      className={`w-full rounded-2xl border p-5 transition-all duration-300 flex items-center gap-4 justify-center text-center lg:justify-start lg:text-left group relative overflow-hidden ${
                        isActive 
                          ? 'bg-blue-600 border-blue-600 shadow-xl shadow-blue-600/20 text-white' 
                          : 'bg-white border-blue-50 hover:border-blue-200 text-[#1e3a8a] hover:shadow-md'
                      }`}
                    >
                      <span className={`font-mono text-sm font-bold shrink-0 ${isActive ? 'text-orange-300' : 'text-blue-300'}`}>
                        {faq.id}
                      </span>
                      <span className="font-semibold text-base leading-snug md:text-lg">
                        {faq.question}
                      </span>
                      {isActive && (
                        <motion.div 
                          layoutId="activeTab"
                          className="absolute right-0 top-0 bottom-0 w-1 bg-orange-400"
                        />
                      )}
                    </motion.button>
                  );
                })
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="py-12 px-6 text-center border-2 border-dashed border-blue-50 rounded-3xl"
                >
                  <XCircle size={40} className="mx-auto text-blue-100 mb-4" />
                  <p className="text-[#1e3a8a] font-bold">No questions found</p>
                  <p className="text-blue-400 text-sm mt-1">Try searching for "NAPS" or "Fees"</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Dynamic Answer View */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-blue-50 rounded-[2.5rem] p-8 md:p-14 shadow-[0_30px_60px_-20px_rgba(30,58,138,0.08)] h-full relative overflow-hidden flex flex-col justify-center">
              
              {/* Styling accents */}
              <Lightbulb size={160} className="absolute -bottom-10 -right-10 text-blue-50/40 rotate-12 pointer-events-none" strokeWidth={1} />
              <div className="absolute top-12 left-0 w-1.5 h-16 bg-orange-500 rounded-r-full" />

              <AnimatePresence mode="wait">
                {filteredFaqs.length > 0 ? (
                  <motion.div
                    key={filteredFaqs[activeIndex]?.id}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.02, y: -10 }}
                    transition={{ duration: 0.35, ease: "circOut" }}
                    className="relative z-10"
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-xs font-black uppercase tracking-tighter">
                        Solution {filteredFaqs[activeIndex].id}
                      </span>
                      <div className="h-[1px] flex-grow bg-blue-50" />
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-extrabold text-[#1e3a8a] mb-8 leading-tight">
                      {filteredFaqs[activeIndex].question}
                    </h3>
                    
                      <div
                        className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium italic"
                        dangerouslySetInnerHTML={{ __html: filteredFaqs[activeIndex].answer }}
                      />
                  </motion.div>
                ) : (
                  <div className="text-center opacity-20">
                    <Search size={80} className="mx-auto text-blue-900" />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;