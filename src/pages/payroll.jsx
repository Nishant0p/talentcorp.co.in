import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Clock,
  CreditCard,
  FileText,
  HeartHandshake,
  MessageCircleQuestion,
  Shield,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const benefits = {
  forCompanies: [
    {
      icon: Clock,
      title: 'Save Time',
      description: 'No more manual calculations. We automate your entire payroll workflow effortlessly.',
    },
    {
      icon: Shield,
      title: 'Zero Compliance Risk',
      description: 'Stay completely protected from government penalties, legal issues, and audit failures.',
    },
    {
      icon: TrendingUp,
      title: 'Reduce Costs',
      description: 'Eliminate the need for an expensive in-house payroll team. Pay only for what you use.',
    },
  ],
  forWorkers: [
    {
      icon: Banknote,
      title: 'On-Time Salary',
      description: 'Your salary reaches your bank account on the exact same date every single month.',
    },
    {
      icon: BadgeCheck,
      title: 'PF & ESI Benefits',
      description: 'Accurate deductions ensure your retirement is secure and your health coverage is active.',
    },
    {
      icon: HeartHandshake,
      title: 'Fair Treatment',
      description: 'Transparent, easy-to-read salary slips so you know exactly what you earn and where it goes.',
    },
  ],
};

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Share Employee Data',
    description: 'Send us your employee list, attendance records, and salary structure. We make onboarding simple.',
    color: '#2563EB',
  },
  {
    number: '02',
    icon: Users,
    title: 'We Process Everything',
    description: 'Our expert team calculates gross salaries, deductions, PF, ESI, and all statutory compliances.',
    color: '#F97316',
  },
  {
    number: '03',
    icon: CreditCard,
    title: 'Salaries Get Credited',
    description: 'Money reaches your workers bank accounts on time, every time, with automated notifications.',
    color: '#22C55E',
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Reports and Compliance',
    description: 'Get detailed monthly reports. All government filings and taxes are handled automatically.',
    color: '#8B5CF6',
  },
];

const services = [
  {
    id: 1,
    title: 'Salary Processing',
    description: 'Accurate, automated, and on-time salary disbursement to your entire workforce every month.',
    icon: Wallet,
    color: '#2563EB',
    size: 'large',
  },
  {
    id: 2,
    title: 'PF Management',
    description: 'Complete Provident Fund registration, precise filing, and monthly compliance tracking.',
    icon: Shield,
    color: '#22C55E',
    size: 'small',
  },
  {
    id: 3,
    title: 'ESI Compliance',
    description: 'Employee State Insurance management to ensure comprehensive worker healthcare coverage.',
    icon: HeartHandshake,
    color: '#EF4444',
    size: 'small',
  },
  {
    id: 4,
    title: 'Statutory Compliance',
    description: 'All state and central government filings, returns, and legal compliances handled professionally.',
    icon: FileText,
    color: '#F97316',
    size: 'large',
  },
  {
    id: 5,
    title: 'Tax Deductions',
    description: 'Accurate TDS calculations, seamless filing, and comprehensive employee tax documentation.',
    icon: Calculator,
    color: '#8B5CF6',
    size: 'small',
  },
  {
    id: 6,
    title: 'Employee Benefits',
    description: 'End-to-end administration of insurance, bonuses, and special benefits for your workforce.',
    icon: Users,
    color: '#EC4899',
    size: 'medium',
  },
];

const faqs = [
  {
    question: 'What exactly is Payroll Staffing?',
    answer:
      'Payroll Staffing means we act as the official employer of record for your workers. We handle their salaries, PF, ESI, and all legal requirements. You simply pay us a consolidated invoice, and we take care of the entire backend HR process.',
  },
  {
    question: 'How does the salary reach our workers?',
    answer:
      "We initiate direct bank transfers to each worker's individual bank account. Every month, strictly on the agreed-upon date, the money is credited. Workers also receive digital, detailed salary slips showing all earnings and deductions.",
  },
  {
    question: 'How do you handle PF and ESI contributions?',
    answer:
      'We manage the complete lifecycle of PF and ESI compliance. This includes registering new workers, calculating and making monthly contributions, filing regular returns, and ensuring employees can access their benefits without hassle.',
  },
  {
    question: 'What is your pricing structure?',
    answer:
      'Our pricing is straightforward and transparent. We charge a flat nominal fee or a small percentage per worker, per month. The exact amount scales based on your headcount and the specific services you require. Contact us for a customized, free quote.',
  },
];

function PayrollSection() {
  const [activeTab, setActiveTab] = useState('companies');
  const currentBenefits = activeTab === 'companies' ? benefits.forCompanies : benefits.forWorkers;

  return (
    <section id="payroll-benefits" className="relative overflow-hidden bg-[#0A0A0B] py-32 text-white">
      {/* Enhanced Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-[10%] top-0 h-[600px] w-[600px] rounded-full bg-[#2563EB]/15 blur-[150px]" />
        <div className="absolute -right-[10%] bottom-0 h-[600px] w-[600px] rounded-full bg-[#F97316]/10 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-2 lg:items-center">
        <div className="space-y-10">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-4 py-2 text-sm font-medium text-[#22C55E] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]"></span>
              </span>
              Premium Benefits
            </div>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
              Everyone Wins with
              <span className="mt-2 block bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#93C5FD] bg-clip-text text-transparent">
                TSPL Payroll
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/60">
              A seamless payroll ecosystem engineered for modern companies and their workforce. We handle the math, compliance, and payouts so you don't have to.
            </p>
          </div>

          {/* Upgraded Pill Tabs */}
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveTab('companies')}
              className={`rounded-full px-8 py-3 text-sm font-semibold transition-all duration-300 ${activeTab === 'companies' ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/25' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              For Companies
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('workers')}
              className={`rounded-full px-8 py-3 text-sm font-semibold transition-all duration-300 ${activeTab === 'workers' ? 'bg-[#F97316] text-white shadow-lg shadow-orange-500/25' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              For Workers
            </button>
          </div>

          <div className="space-y-4">
            {currentBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={benefit.title} 
                  className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-black/20"
                >
                  <div className="flex items-start gap-5">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-colors duration-300 ${activeTab === 'companies' ? 'bg-[#2563EB]/10 group-hover:bg-[#2563EB]/20' : 'bg-[#F97316]/10 group-hover:bg-[#F97316]/20'}`}>
                      <Icon className="h-7 w-7" style={{ color: activeTab === 'companies' ? '#60A5FA' : '#FB923C' }} />
                    </div>
                    <div>
                      <h2 className="mb-2 text-xl font-bold tracking-tight">{benefit.title}</h2>
                      <p className="text-base leading-relaxed text-white/60">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Side Card */}
        <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-8 backdrop-blur-xl md:p-10">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
          
          <div className="relative z-10 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5 transition-transform hover:scale-105">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">Partners</div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5 transition-transform hover:scale-105">
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">Years</div>
            </div>
            <div className="rounded-2xl border border-[#22C55E]/20 bg-[#22C55E]/10 p-5 transition-transform hover:scale-105">
              <div className="text-3xl font-bold text-[#4ADE80]">100%</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-[#4ADE80]/70">Compliant</div>
            </div>
          </div>
          
          <div className="relative z-10 mt-8 rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-md">
            <div className="mb-4 inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">System Status: Active</p>
            </div>
            <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight">Flawless accuracy. Clean compliance.</h2>
            <p className="mt-4 text-lg text-white/60">
              Experience a modern payroll workflow designed to entirely eliminate your administrative burden and keep your workforce confident and motivated.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PayrollHowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000); // Slowed down slightly for better readability

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="payroll-process" className="bg-[#F8FAFC] py-32">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-2 lg:items-center">
        
        {/* Animated Circle Container */}
        <div className="relative mx-auto h-[380px] w-[380px] md:h-[450px] md:w-[450px]">
          <div className="absolute inset-0 rounded-full border border-dashed border-[#2563EB]/30" style={{ animation: 'spin 30s linear infinite' }} />
          <div className="absolute inset-6 rounded-full border border-[#F97316]/20 bg-white/50 backdrop-blur-3xl" style={{ animation: 'spin 20s linear infinite reverse' }} />
          <div className="absolute inset-12 rounded-full border border-dashed border-[#22C55E]/30" style={{ animation: 'spin 40s linear infinite' }} />
          
          <div className="absolute inset-20 flex items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] text-center text-white shadow-2xl shadow-blue-900/20">
            <div className="transform transition-transform hover:scale-105">
              <div className="text-5xl font-black tracking-tight">TSPL</div>
              <div className="mt-1 text-sm font-medium tracking-widest text-blue-200 uppercase">Workflow</div>
            </div>
          </div>
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            const angle = index * 90 - 45;
            // Responsive radius
            const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 160 : 190;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`absolute flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 ease-out ${activeStep === index ? 'scale-125 shadow-xl ring-4 ring-white' : 'scale-100 hover:scale-110'}`}
                style={{
                  left: `calc(50% + ${x}px - 32px)`,
                  top: `calc(50% + ${y}px - 32px)`,
                  backgroundColor: activeStep === index ? step.color : `${step.color}15`,
                  color: activeStep === index ? 'white' : step.color
                }}
              >
                <Icon className="h-7 w-7" />
              </button>
            );
          })}
        </div>

        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#F97316]/10 px-4 py-2 text-sm font-bold text-[#F97316]">
            <TrendingUp className="h-4 w-4" /> Seamless Process
          </div>
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-[#0F172A] md:text-5xl lg:text-6xl">
            How Payroll
            <span className="block text-[#2563EB]">Staffing Works</span>
          </h2>
          <p className="mb-10 text-xl text-[#64748B]">
            A streamlined 4-step framework. You focus on growing your business, and we handle the complex math.
          </p>

          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={`group w-full rounded-2xl border p-6 text-left transition-all duration-300 ${isActive ? 'border-transparent bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-100' : 'border-transparent bg-transparent hover:bg-slate-100/50'}`}
                >
                  <div className="flex items-start gap-6">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-colors duration-300`}
                      style={{ backgroundColor: isActive ? step.color : '#F1F5F9' }}
                    >
                      {isActive ? (
                        <Icon className="h-6 w-6 text-white" />
                      ) : (
                        <span className="text-base font-bold text-[#64748B] group-hover:text-slate-900">{step.number}</span>
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className={`text-xl font-bold transition-colors ${isActive ? 'text-[#0F172A]' : 'text-[#475569] group-hover:text-[#0F172A]'}`}>
                        {step.title}
                      </h3>
                      <div className={`grid transition-all duration-300 ease-in-out ${isActive ? 'grid-rows-[1fr] mt-3' : 'grid-rows-[0fr] mt-0'}`}>
                        <p className="overflow-hidden text-base leading-relaxed text-[#64748B]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function PayrollServices() {
  return (
    <section id="payroll-services" className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#2563EB]/10 px-4 py-2 text-sm font-bold text-[#2563EB]">
            <Shield className="h-4 w-4" /> Full Spectrum Coverage
          </div>
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-[#0F172A] md:text-5xl lg:text-6xl">
            Everything You Need for
            <span className="block bg-gradient-to-r from-[#2563EB] to-[#1E40AF] bg-clip-text text-transparent">
              Payroll Management
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-[#64748B]">
            From initial salary processing to final compliance filings, we provide an end-to-end suite so you can focus entirely on your core business.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid auto-rows-[220px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/50 ${service.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''} ${service.size === 'medium' ? 'md:col-span-2' : ''}`}
                style={{ backgroundColor: `${service.color}08`, borderColor: `${service.color}15` }}
              >
                {/* Decorative Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                <div className="relative flex h-full flex-col justify-between p-8">
                  <div>
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-7 w-7" style={{ color: service.color }} />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold tracking-tight text-[#0F172A]">{service.title}</h3>
                    {(service.size === 'large' || service.size === 'medium') && (
                      <p className="text-lg leading-relaxed text-[#64748B] max-w-sm">{service.description}</p>
                    )}
                    {service.size === 'small' && (
                      <p className="text-base text-[#64748B] line-clamp-2">{service.description}</p>
                    )}
                  </div>
                  
                  <div className="absolute bottom-8 right-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md opacity-0 transition-all duration-300 group-hover:-translate-x-2 group-hover:opacity-100">
                    <ArrowRight className="h-5 w-5" style={{ color: service.color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PayrollFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="payroll-faq" className="bg-[#F8FAFC] py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1E40AF] shadow-lg shadow-blue-500/30">
            <MessageCircleQuestion className="h-8 w-8 text-white" />
          </div>
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-[#0F172A] md:text-5xl">Clarity in Every Step</h2>
          <p className="text-xl text-[#64748B]">Got questions about how we operate? We have clear, straightforward answers.</p>
        </div>

        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? 'border-[#2563EB]/20 bg-white shadow-xl shadow-blue-900/5 ring-1 ring-[#2563EB]/10' : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1] hover:shadow-md'}`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-6 p-6 text-left md:p-8"
                >
                  <h3 className={`text-xl font-bold transition-colors ${isOpen ? 'text-[#2563EB]' : 'text-[#0F172A]'}`}>
                    {faq.question}
                  </h3>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#2563EB]/10 text-[#2563EB]' : 'bg-[#F1F5F9] text-[#64748B]'}`}>
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-8 pt-0 md:px-8">
                      <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent" />
                      <p className="text-lg leading-relaxed text-[#64748B]">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PayrollCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0B] py-32 text-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#2563EB]/30 via-[#1D4ED8]/20 to-transparent blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <h2 className="mb-8 text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
          Ready to Elevate Your
          <span className="block mt-2 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
            Payroll Experience?
          </span>
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-xl leading-relaxed text-white/70">
          Join over 500+ forward-thinking companies who rely on TSPL to seamlessly manage their workforce financial operations.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Company Card */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/30 hover:bg-white/10">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl transition-all group-hover:bg-blue-500/40" />
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2 text-sm font-bold text-blue-300">
              <Users className="h-4 w-4" /> For Companies
            </span>
            <h3 className="mb-4 text-3xl font-bold">Request a Custom Proposal</h3>
            <p className="mb-8 text-lg text-white/60">Share a few details about your workforce, and we'll craft a pricing plan tailored to your scale.</p>
            <a
              href="/contact-us"
              className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-8 py-5 text-lg font-bold text-[#0F172A] transition-all hover:bg-blue-50 hover:shadow-lg hover:shadow-white/10"
            >
              Get Free Quote
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Worker Card */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-[#F97316]/20 bg-[#F97316]/10 p-10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#F97316]/40 hover:bg-[#F97316]/20">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl transition-all group-hover:bg-orange-500/40" />
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-500/20 px-4 py-2 text-sm font-bold text-orange-300">
              <HeartHandshake className="h-4 w-4" /> For Workers
            </span>
            <h3 className="mb-4 text-3xl font-bold">Employee Support Desk</h3>
            <p className="mb-8 text-lg text-white/60">Have questions about your monthly salary, PF deductions, or ESI coverage? Our team is here to help.</p>
            <a
              href="tel:+919876543210"
              className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#F97316] px-8 py-5 text-lg font-bold text-white transition-all hover:bg-[#EA580C] hover:shadow-lg hover:shadow-orange-500/20"
            >
              Call Helpline
              <Clock className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-10 text-white/80 md:gap-16">
          <div className="flex items-center gap-4 transition-transform hover:scale-105">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
              <Clock className="h-6 w-6 text-blue-400" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium uppercase tracking-wider text-white/50">Operating Hours</div>
              <div className="text-lg font-bold">Mon-Sat, 9AM-6PM</div>
            </div>
          </div>
          <div className="flex items-center gap-4 transition-transform hover:scale-105">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
              <Wallet className="h-6 w-6 text-blue-400" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium uppercase tracking-wider text-white/50">Support Email</div>
              <div className="text-lg font-bold">support@tspl.co.in</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PayrollPage() {
  return (
    <div className="bg-white font-sans text-[#0A0A0B] antialiased selection:bg-[#2563EB] selection:text-white">
      <Navbar />
      <main>
        <PayrollSection />
        <PayrollHowItWorks />
        <PayrollServices />
        <PayrollFAQ />
        <PayrollCTA />
      </main>
      <Footer />
    </div>
  );
}