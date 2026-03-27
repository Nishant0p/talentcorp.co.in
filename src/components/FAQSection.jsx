import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What is NAPS (National Apprenticeship Promotion Scheme)?',
    answer:
      'NAPS is a government initiative to promote apprenticeship in India by providing financial incentives to establishments and sharing the cost of training with employers.',
  },
  {
    question: 'What is NATS (National Apprenticeship Training Scheme)?',
    answer:
      'NATS is a one-year program equipping students with practical knowledge and skills required in their field of work, offered by the Ministry of Education.',
  },
  {
    question: 'Who is eligible for apprenticeship programs?',
    answer:
      'Eligibility varies by scheme, but generally includes ITI holders, Diploma holders, and Graduates looking for industry-standard skill development.',
  },
  {
    question: 'How does TSPL Group help employers?',
    answer:
      'We handle end-to-end compliance, sourcing, and training, allowing employers to focus on their core business while we build their skilled workforce.',
  },
  {
    question: 'Is there any fee for job seekers?',
    answer:
      'No, TSPL Group does not charge job seekers any fees for registration or placement in our certified apprenticeship programs.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const leftPanelVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.65, ease: 'easeOut' },
    },
  };

  const rightPanelVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.65, ease: 'easeOut' },
    },
  };

  return (
    <section id="faq" className="bg-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Seamless texture layers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(37,99,235,0.06) 0px, rgba(37,99,235,0.06) 1px, transparent 1px, transparent 16px)',
          }}
        />
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl -mr-48 -mt-20"
        />
        <div
          className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full opacity-35"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(249,115,22,0.2) 1px, transparent 1px), radial-gradient(circle at center, rgba(249,115,22,0.1) 0%, rgba(249,115,22,0.03) 55%, transparent 76%)',
            backgroundSize: '14px 14px, 100% 100%',
          }}
        />
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* LEFT SIDE: Heading & CTA */}
          <motion.div className="lg:col-span-5 space-y-8" variants={leftPanelVariants}>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="bg-orange-50 text-orange-600 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                Support
              </span>
              <h2 className="text-5xl font-extrabold text-[#1a2b4b] mt-6 mb-6 leading-tight">
                Frequently Asked <br />
                <span className="text-blue-600">Questions</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Everything you need to know about our services, government schemes, and how we
                transform careers.
              </p>
            </motion.div>

            <motion.div
              className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden group"
              initial={{ opacity: 0, y: 36, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
            >
              <div className="relative z-10">
                <MessageCircle size={32} className="mb-4 text-blue-200" />
                <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
                <p className="text-blue-100 mb-6 text-sm">
                  Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly
                  team.
                </p>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-orange-500 hover:text-white transition-all">
                  Get in Touch
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform" />
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: Accordion */}
          <motion.div className="lg:col-span-7 space-y-4" variants={rightPanelVariants}>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className={`border rounded-2xl transition-all duration-300 ${
                  openIndex === index
                    ? 'border-blue-600 bg-blue-50/30 shadow-sm'
                    : 'border-gray-100 bg-white hover:border-gray-300'
                }`}
                initial={{ opacity: 0, y: 20, x: 24 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span
                    className={`text-lg font-bold ${
                      openIndex === index ? 'text-blue-700' : 'text-gray-900'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180 text-blue-600' : 'text-gray-400'
                    }`}
                  >
                    <ChevronDown size={20} />
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-blue-100/50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default FAQSection;
