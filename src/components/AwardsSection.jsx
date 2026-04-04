import React from 'react';
import { ShieldCheck, Trophy, Award, CheckCircle } from 'lucide-react';

const awardsData = [
  {
    icon: <ShieldCheck size={28} className="text-blue-500" />,
    highlight: '100+%',
    subtext: 'Compliant',
    pill: 'Official Partner',
    title: 'Government Authorized',
    description: 'Compliant with all norms',
  },
  {
    icon: <Trophy size={28} className="text-[#cda043]" />,
    highlight: '#1',
    subtext: 'In India',
    pill: 'World Record',
    title: 'World Record Holder',
    description: 'Recognized globally',
  },
  {
    icon: <Award size={28} className="text-gray-700" />,
    highlight: '15+%',
    subtext: 'Awards',
    pill: '2024 Winner',
    title: 'Excellence Award',
    description: 'Awards for contribution',
  },
  {
    icon: <CheckCircle size={28} className="text-blue-500" />,
    highlight: '98+%',
    subtext: 'Satisfaction',
    pill: 'ISO 9001',
    title: 'ISO Certified',
    description: 'Satisfaction rate',
  },
];

const AwardsSection = () => {
  return (
    <section id="achievements" className="bg-white px-4 pt-8 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-extrabold text-[#1a2b4b] md:text-4xl">
            Our Recognition & Awards
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {awardsData.map((award, index) => (
            <article
              key={index}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1"
            >
              {/* Top blue border indicator */}
              <div className="absolute left-0 top-0 h-1.5 w-full bg-blue-600 transition-colors group-hover:bg-blue-700" />

              {/* Icon */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50/50 shadow-sm transition-transform group-hover:scale-105">
                {award.icon}
              </div>

              {/* Highlight number and subtext */}
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight text-blue-600">
                  {award.highlight}
                </span>
                {award.subtext && (
                  <span className="text-sm font-medium text-gray-500">
                    {award.subtext}
                  </span>
                )}
              </div>

              {/* Pill / Tag */}
              <div className="mb-5 flex">
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  {award.pill}
                </span>
              </div>

              {/* Title and Description */}
              <h3 className="mb-3 text-lg font-bold text-gray-900 leading-tight">
                {award.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {award.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
