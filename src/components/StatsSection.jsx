import React from 'react';

const stats = [
  { label: 'Active Apprentices', value: '12,500+' },
  { label: 'Hiring Cities', value: '85+' },
  { label: 'Industry Sectors', value: '22+' },
  { label: 'Training Partners', value: '150+' },
];

const StatsSection = () => {
  return (
    <section id="achievements" className="bg-[#f5f9ff] px-6 py-16 text-[#0f2a4d] md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold md:text-4xl">Our Achievements</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[#335e8f] md:text-base">
          Trusted outcomes backed by verified apprenticeship and staffing programs.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#d5e5f8] bg-white p-6 text-center shadow-sm">
              <div className="text-3xl font-extrabold text-[#0f2a4d]">{item.value}</div>
              <div className="mt-2 text-sm font-semibold text-[#3a5f88]">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
