import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const restrictions = [
  'Publishing any website material in any other media without express written permission.',
  'Selling, sublicensing, and/or otherwise commercializing any website material.',
  'Publicly performing and/or showing any website material.',
  "Using this website in any way that is or may be damaging to this website or TSPL Group's reputation.",
  'Using this website contrary to applicable laws and regulations of India.',
  'Engaging in any data mining, data harvesting, or similar data extraction activities.',
];

const sections = [
  {
    title: '1. Introduction',
    body: 'Welcome to TalentCorp Solutions Private Limited (TSPL Group). These Terms & Conditions govern your use of our website and services. By accessing or using our website at tsplgroup.in, you agree to be bound by these terms. If you disagree with any part of the terms, you may not access the service.',
  },
  {
    title: '2. Services',
    body: 'TSPL Group provides talent acquisition, staffing, executive search, and HR consulting services. Our website serves as an informational and communication platform. All recruitment and staffing engagements are governed by separate service agreements entered into between TSPL Group and its clients.',
  },
  {
    title: '3. Intellectual Property Rights',
    body: 'Other than the content you own, under these Terms, TalentCorp Solutions Private Limited and/or its licensors own all intellectual property rights and materials contained on this website, including but not limited to the TSPL Group logo, brand identity, and all written content. You are granted a limited license only for purposes of viewing material contained on this website.',
  },
  {
    title: '4. Restrictions',
    body: '',
  },
  {
    title: '5. Candidate & Client Information',
    body: 'Information submitted through our contact forms or shared during recruitment engagements is handled in accordance with our Privacy Policy. Candidates submitting their profiles consent to TSPL Group sharing relevant information with prospective employers for the purpose of career placement.',
  },
  {
    title: '6. Limitation of Liability',
    body: 'In no event shall TalentCorp Solutions Private Limited, nor any of its officers, directors, or employees, be held liable for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort, or otherwise.',
  },
  {
    title: '7. Governing Law',
    body: 'These Terms & Conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.',
  },
  {
    title: '8. Changes to Terms',
    body: 'TSPL Group reserves the right to revise these Terms at any time. By using this website, you agree to be bound by the then-current version of these Terms & Conditions.',
  },
];

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-8 lg:px-10">
        <header className="mb-10 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-slate-300">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1a4a8a] sm:text-4xl">
            Terms & Conditions
          </h1>
          <p className="mt-3 text-sm font-medium text-slate-600">Last updated: March 25, 2026</p>
        </header>

        <div className="space-y-6">
          {sections.map((section) => (
            <section 
              key={section.title} 
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-slate-300"
            >
              <h2 className="text-xl font-bold text-[#1a4a8a]">{section.title}</h2>
              {section.body ? <p className="mt-3 leading-7 text-slate-700">{section.body}</p> : null}

              {section.title.startsWith('4.') ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                  {restrictions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}