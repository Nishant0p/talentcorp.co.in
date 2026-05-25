import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, HelpCircle, ArrowRight, Lightbulb, XCircle, Sparkles } from 'lucide-react';
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
    answer: 'Eligibility varies by scheme, but generally includes students from 1st to 10th to 12th, ITI holders, diploma holders, and graduates looking for industry-standard skill development.',
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

function getSolutionInsights(id) {
  switch (id) {
    case '01':
      return (
        <div className="mt-5 rounded-2xl bg-orange-50/50 border border-orange-100/50 p-4 text-xs sm:text-sm font-semibold text-slate-700">
          <div className="flex items-center gap-1.5 text-[#FF8C00] font-black uppercase tracking-wider mb-2.5 text-[10px]">
            <Sparkles size={12} className="text-[#FF8C00]" /> Key NAPS Incentives
          </div>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-[#FF8C00] mt-0.5">✓</span>
              <span>Establishments receive government reimbursement of <strong className="font-extrabold text-[#0f2a4d]">up to ₹1,500/month</strong> per apprentice.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF8C00] mt-0.5">✓</span>
              <span>Shared basic training costs reduce standard employee onboarding overheads by <strong className="font-extrabold text-[#0f2a4d]">up to 50%</strong>.</span>
            </li>
          </ul>
        </div>
      );
    case '02':
      return (
        <div className="mt-5 rounded-2xl bg-blue-50/50 border border-blue-100/50 p-4 text-xs sm:text-sm font-semibold text-slate-700">
          <div className="flex items-center gap-1.5 text-[#1a4f87] font-black uppercase tracking-wider mb-2.5 text-[10px]">
            <Sparkles size={12} className="text-[#1a4f87]" /> NATS Program Focus
          </div>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-[#1a4f87] mt-0.5">✓</span>
              <span><strong className="font-extrabold text-[#0f2a4d]">1-Year structural curriculum</strong> focused on practical engineering, technical, and commercial capabilities.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1a4f87] mt-0.5">✓</span>
              <span>Certified direct path to career entry backed by the <strong className="font-extrabold text-[#0f2a4d]">Ministry of Education</strong>.</span>
            </li>
          </ul>
        </div>
      );
    case '03':
      return (
        <div className="mt-5 rounded-2xl bg-emerald-50/50 border border-emerald-100/50 p-4 text-xs sm:text-sm font-semibold text-slate-700">
          <div className="flex items-center gap-1.5 text-emerald-600 font-black uppercase tracking-wider mb-2.5 text-[10px]">
            <Sparkles size={12} className="text-emerald-600" /> Who Can Apply
          </div>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-0.5">✓</span>
              <span>School passouts from <strong className="font-extrabold text-[#0f2a4d]">10th to 12th standard</strong> ready for operational roles.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-0.5">✓</span>
              <span>Technical graduates with <strong className="font-extrabold text-[#0f2a4d]">ITI certificates, Engineering Diplomas, or general Degrees</strong>.</span>
            </li>
          </ul>
        </div>
      );
    case '04':
      return (
        <div className="mt-5 rounded-2xl bg-purple-50/50 border border-purple-100/50 p-4 text-xs sm:text-sm font-semibold text-slate-700">
          <div className="flex items-center gap-1.5 text-purple-600 font-black uppercase tracking-wider mb-2.5 text-[10px]">
            <Sparkles size={12} className="text-purple-600" /> Employer Services
          </div>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-0.5">✓</span>
              <span><strong className="font-extrabold text-[#0f2a4d]">End-to-End Compliance</strong>: Contract generation, online portal logistics, and monthly stipend claim management.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-0.5">✓</span>
              <span><strong className="font-extrabold text-[#0f2a4d]">National Talent Sourcing</strong>: Instant recruitment from a verified pipeline across multiple Indian states.</span>
            </li>
          </ul>
        </div>
      );
    case '05':
      return (
        <div className="mt-5 rounded-2xl bg-orange-50/50 border border-orange-100/50 p-4 text-xs sm:text-sm font-semibold text-slate-700">
          <div className="flex items-center gap-1.5 text-[#FF8C00] font-black uppercase tracking-wider mb-2.5 text-[10px]">
            <Sparkles size={12} className="text-[#FF8C00]" /> Candidate Policy
          </div>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-[#FF8C00] mt-0.5">✓</span>
              <span><strong className="font-extrabold text-[#0f2a4d]">100% Free</strong>: TSPL Group charges zero registration, documentation, or placement fees to job seekers.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF8C00] mt-0.5">✓</span>
              <span>Warning: Beware of fraudulent agents claiming to represent TSPL. Direct application is completely free.</span>
            </li>
          </ul>
        </div>
      );
    default:
      return null;
  }
}

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
  }, [faqs, searchQuery]);

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
    <section 
      className="bg-transparent min-h-screen py-24 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden animate-fade-in"
      style={{
        backgroundImage: 'radial-gradient(rgba(15, 42, 77, 0.08) 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
      }}
    >
      
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/20 to-transparent pointer-events-none" />
      <div className="absolute -right-64 top-20 w-[500px] h-[500px] rounded-full bg-orange-50/20 blur-[120px] pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* === HEADER SECTION === */}
        <div className="mb-16 flex flex-col justify-between gap-10 text-center lg:flex-row lg:items-end lg:text-left">
          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF8C00] border border-orange-100/50 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF8C00] animate-pulse" />
              FAQ Helpdesk
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f2a4d] leading-[1.1] mb-6">
              Clear answers for your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-orange-600">growth journey.</span>
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
                className="block w-full pl-11 pr-4 py-4 bg-white border border-blue-100 rounded-2xl text-[#0f2a4d] placeholder-blue-300 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all shadow-sm"
              />
            </div>
          </div>
          
          <Link
            to="/contact-us"
            className="group relative inline-flex items-center gap-3 self-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl border border-orange-400 font-bold shadow-[0_12px_24px_-8px_rgba(249,115,22,0.3)] transition-all duration-300 lg:self-auto"
          >
            Contact us
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* === MASTER-DETAIL LAYOUT === */}
        {/* Symmetrical locked heights for both left and right cards to prevent layout shifts */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 min-h-[500px] lg:h-[540px] lg:min-h-[540px] lg:max-h-[540px]">
          
          {/* LEFT: Symmetrical Filtered Question List Card */}
          <div className="lg:col-span-5 lg:h-full">
            <div className="bg-white border border-slate-200/40 rounded-[2.5rem] p-6 shadow-xl shadow-slate-100/50 h-full relative overflow-hidden flex flex-col justify-start lg:overflow-y-auto custom-scrollbar gap-3 select-none">
              
              <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em] text-slate-400 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                <span>Frequently Asked Questions</span>
              </div>

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
                        className={`w-full rounded-2xl border p-4.5 transition-all duration-300 flex items-center gap-4 justify-center text-center lg:justify-start lg:text-left group relative overflow-hidden shrink-0 ${
                          isActive 
                            ? 'bg-gradient-to-r from-[#1a4f87] to-[#0f2a4d] border-transparent shadow-lg shadow-blue-900/15 text-white' 
                            : 'bg-white border-slate-200/50 hover:border-blue-200 text-[#0f2a4d] hover:shadow-sm'
                        }`}
                      >
                        <span className={`font-mono text-sm font-bold shrink-0 ${isActive ? 'text-orange-300' : 'text-[#FF8C00]'}`}>
                          {faq.id}
                        </span>
                        <span className="font-bold text-sm leading-snug md:text-base">
                          {faq.question}
                        </span>
                        {isActive && (
                          <motion.div 
                            layoutId="activeTab"
                            className="absolute right-0 top-0 bottom-0 w-1.5 bg-[#FF8C00]"
                          />
                        )}
                      </motion.button>
                    );
                  })
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="py-12 px-6 text-center border border-dashed border-slate-200 rounded-3xl bg-white/50"
                  >
                    <XCircle size={40} className="mx-auto text-blue-200 mb-4" />
                    <p className="text-[#0f2a4d] font-bold">No questions found</p>
                    <p className="text-slate-400 text-sm mt-1">Try searching for "NAPS" or "Fees"</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Dynamic Answer View Card */}
          <div className="lg:col-span-7 lg:h-full">
            <div className="bg-white border border-slate-200/40 rounded-[2.5rem] p-7 md:p-10 shadow-xl shadow-slate-100/50 h-full relative overflow-hidden flex flex-col justify-start">
              
              {/* Styling accents */}
              <Lightbulb size={160} className="absolute -bottom-10 -right-10 text-blue-50/40 rotate-12 pointer-events-none" strokeWidth={1} />
              <div className="absolute top-12 left-0 w-1.5 h-16 bg-[#FF8C00] rounded-r-full" />

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
                    <div className="flex items-center gap-3 mb-6">
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-xs font-black uppercase tracking-tighter">
                        Solution {filteredFaqs[activeIndex].id}
                      </span>
                      <div className="h-[1px] flex-grow bg-slate-100" />
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-extrabold text-[#0f2a4d] mb-6 leading-tight">
                      {filteredFaqs[activeIndex].question}
                    </h3>
                    
                    <div
                      className="text-lg md:text-xl text-slate-600 leading-relaxed font-semibold italic"
                      dangerouslySetInnerHTML={{ __html: filteredFaqs[activeIndex].answer }}
                    />

                    {/* Highly Professional Key Highlights Insights Callout */}
                    {getSolutionInsights(filteredFaqs[activeIndex].id)}
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