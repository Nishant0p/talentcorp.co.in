import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, MapPin, IndianRupee, Clock, Briefcase, Calendar,
  CheckCircle, Send, Zap, Shield, TrendingUp, Heart, Award, Star, Building2, Phone
} from 'lucide-react';
import { fetchJobs, submitApplicant, submitToAdminBackend, parseMarkdown, cleanMarkdown, isJobExpired } from '../utils/strapi';
import useSEO from '../hooks/useSEO';
import './JobDetailPage.css';

// ─── Static constants ────────────────────────────────────────────────────────

const FALLBACK = [
  { id: 1, title: 'Production Operator', company: 'Tata Motors', location: 'Pune, MH', salary: '₹18,000–₹25,000', type: 'Full-time', urgent: true },
  { id: 2, title: 'ITI Technician', company: 'Maruti Suzuki', location: 'Pune, MH', salary: '₹15,000–₹22,000', type: 'Apprenticeship', urgent: false },
  { id: 3, title: 'Quality Inspector', company: 'Bajaj Auto', location: 'Aurangabad, MH', salary: '₹20,000–₹28,000', type: 'Full-time', urgent: true },
  { id: 4, title: 'Electrical Trainee', company: 'L&T Construction', location: 'Chennai, TN', salary: '₹12,000–₹18,000', type: 'Apprenticeship', urgent: false },
  { id: 5, title: 'CNC Operator', company: 'Mahindra & Mahindra', location: 'Nashik, MH', salary: '₹22,000–₹30,000', type: 'Full-time', urgent: false },
  { id: 6, title: 'Assembly Line Worker', company: 'Hero MotoCorp', location: 'Haridwar, UK', salary: '₹16,000–₹20,000', type: 'Contract', urgent: true },
];

const BENEFITS = [
  { icon: IndianRupee, label: 'Competitive Pay' },
  { icon: TrendingUp, label: 'Career Growth' },
  { icon: Heart, label: 'Health Benefits' },
  { icon: Star, label: 'Skill Training' },
  { icon: Shield, label: 'Job Security' },
  { icon: Award, label: 'Performance Bonus' },
];

const REQS = [
  'Strong technical skills relevant to the role',
  'Problem-solving and analytical thinking',
  'Team collaboration and effective communication',
  'Commitment to quality and continuous learning',
  'Ability to adapt well in fast-paced environments',
];

const EMPTY_FORM = { name: '', mobile: '', email: '', cv: null, pageName: '' };

const formatDateString = (dateStr) => {
  if (!dateStr) return null;
  const parsed = Date.parse(dateStr);
  if (!isNaN(parsed)) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  return dateStr;
};

const getStats = (job) => {
  const stats = [
    { icon: Briefcase, label: 'Category', value: job.category || 'General' },
    { icon: MapPin, label: 'Location', value: job.location },
    { icon: IndianRupee, label: 'Salary', value: job.salary },
    { icon: Clock, label: 'Type', value: job.type },
  ];

  const postedDate = job.publishedDate || job.publishedAt;
  stats.push({
    icon: Calendar,
    label: 'Posted',
    value: formatDateString(postedDate) || 'Recently',
  });

  if (job.applyBy) {
    const expired = isJobExpired(job.applyBy);
    stats.push({
      icon: Calendar,
      label: expired ? 'Status' : 'Apply Before',
      value: expired ? 'Applications Closed' : formatDateString(job.applyBy),
    });
  }

  return stats;
};

const formatSalary = (job) => {
  if (job?.salary) return job.salary;
  const min = Number(job?.salaryMin);
  const max = Number(job?.salaryMax);
  if (Number.isFinite(min) && Number.isFinite(max)) {
    return `INR ${min.toLocaleString('en-IN')} - INR ${max.toLocaleString('en-IN')}`;
  }
  if (Number.isFinite(min)) return `INR ${min.toLocaleString('en-IN')}+`;
  if (Number.isFinite(max)) return `Up to INR ${max.toLocaleString('en-IN')}`;
  return 'Competitive';
};

const getReqs = (job) => {
  const raw = String(job?.requirements || '').trim();
  if (!raw) return REQS;
  const list = raw
    .split(/\r?\n|•|\u2022|,/) 
    .map((item) => item.trim())
    .filter(Boolean);
  return list.length ? list : REQS;
};

// ─── Memoised Sub-components ──────────────────────────────────────────────────

const StatStrip = React.memo(({ job }) => (
  <div className="pro-stats">
    {getStats(job).map(({ icon: Icon, label, value }) => (
      <div key={label} className="pro-stat-item">
        <div className="pro-stat-icon-wrapper">
          <Icon size={18} className="pro-stat-icon" />
        </div>
        <div className="pro-stat-content">
          <span className="pro-stat-label">{label}</span>
          <span className="pro-stat-value">{value}</span>
        </div>
      </div>
    ))}
  </div>
));

const JobDescription = React.memo(({ job }) => {
  const description = job?.description || `Join <strong>${job.company}</strong> as a <strong>${job.title}</strong> based in ${job.location}. This is a dynamic role designed for individuals who are passionate about delivering quality results. You will be working with a highly skilled, supportive team with clear avenues for professional growth and skill enhancement.`;

  return (
    <section className="pro-section">
      <h2 className="pro-section-title">Role Overview</h2>
      <div className="pro-section-content">
        <div
          className="pro-description-text"
          dangerouslySetInnerHTML={{
            __html: parseMarkdown(description)
          }}
        />
      </div>
    </section>
  );
});

const Requirements = React.memo(({ job }) => {
  const requirements = job?.requirements && Array.isArray(job.requirements)
    ? job.requirements
    : REQS;

  return (
    <section className="pro-section">
      <h2 className="pro-section-title">Key Requirements</h2>
      <div className="pro-section-content">
        <ul className="pro-req-list">
          {requirements.map((r, i) => {
            // Handle both string items and objects with 'title' or 'name' property
            const reqText = typeof r === 'string' ? r : (r?.title || r?.name || '');
            return (
              <li key={i} className="pro-req-item">
                <CheckCircle size={16} className="pro-req-icon" />
                <span>{reqText}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
});

const BenefitsCard = React.memo(() => (
  <section className="pro-section">
    <h2 className="pro-section-title">What We Offer</h2>
    <div className="pro-section-content">
      <div className="pro-benefits-grid">
        {BENEFITS.map(({ icon: Icon, label }) => (
          <div key={label} className="pro-benefit-card">
            <Icon size={20} className="pro-benefit-icon" />
            <span className="pro-benefit-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
));

// ─── Main Page Component ──────────────────────────────────────────────────────

const defaultContacts = [{ name: 'HR Recruiting', phone: '+91 95615 04911' }];

const getWhatsAppLink = (phone, title, company) => {
  let cleaned = String(phone || '').replace(/[^0-9]/g, '');
  if (cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }
  const cleanTitle = cleanMarkdown(title || '');
  const cleanCompany = cleanMarkdown(company || 'TSPL Group');
  const text = `Hi, I am interested in the ${cleanTitle} position at ${cleanCompany}.`;
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(text)}`;
};

const WhatsAppIcon = ({ size = 14, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.858-4.385 9.861-9.779.002-2.611-1.014-5.068-2.86-6.918a9.66 9.66 0 0 0-6.945-2.76c-5.438 0-9.861 4.386-9.864 9.782-.001 1.778.472 3.513 1.37 5.022L1.823 21.8l4.824-1.258zm12.354-7.043c-.33-.165-1.951-.963-2.253-1.074-.302-.11-.522-.165-.742.165-.22.33-.852 1.074-1.044 1.294-.192.22-.385.247-.715.083-1.81-.913-3.003-1.748-4.2-3.808-.316-.54.316-.5.904-1.68.1-.198.05-.371-.025-.536-.075-.165-.66-1.59-.905-2.18-.239-.575-.482-.497-.66-.506-.17-.008-.367-.01-.564-.01-.198 0-.523.074-.798.372-.275.298-1.05 1.026-1.05 2.502s1.075 2.903 1.225 3.101c.15.198 2.115 3.227 5.125 4.527.715.31 1.273.495 1.708.634.718.228 1.37.195 1.887.118.577-.087 1.951-.798 2.226-1.57.275-.772.275-1.434.192-1.571-.082-.138-.302-.22-.632-.385z" />
  </svg>
);

const JobDetailPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(() => FALLBACK.find(j => j.id === parseInt(jobId, 10)) ?? null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);

  useSEO({
    title: job ? `${job.title} | ${job.company} | TSPL Group` : 'Job Details',
    description: job ? `Apply for ${job.title} at ${job.company} in ${job.location}. Salary: ${job.salary || 'Competitive'}. Submit your application online.` : 'Apply for open positions at TSPL Group.',
    keywords: job ? `${job.title}, ${job.company}, job in ${job.location}, TSPL Group jobs, careers` : 'TSPL Group jobs, hiring, open positions'
  });

  const jsonLd = job ? {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": parseMarkdown(job.description || `Join ${job.company} as a ${job.title} in ${job.location}.`),
    "datePosted": new Date().toISOString().split('T')[0],
    "employmentType": job.type === 'Full-time' ? 'FULL_TIME' : job.type === 'Apprenticeship' ? 'OTHER' : 'CONTRACTOR',
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company,
      "sameAs": "https://tsplgroup.in"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location.split(',')[0]?.trim() || job.location,
        "addressRegion": job.location.split(',')[1]?.trim() || '',
        "addressCountry": "IN"
      }
    },
    "baseSalary": job.salary && job.salary !== 'Competitive' ? {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": {
        "@type": "QuantitativeValue",
        "value": job.salary,
        "unitText": "MONTH"
      }
    } : undefined
  } : null;

  // Fetch from Strapi (No changes here as requested)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchJobs();
        if (cancelled) return;
        const found = data.find(e => String(e.id) === String(jobId));
        if (found) {
          const jobData = {
            id: found.id,
            title: found.title || `Job ${found.id}`,
            company: found.company || 'TSPL Group',
            category: found.category || found.type || 'General',
            location: found.location || 'India',
            salary: found.salary || 'Competitive',
            type: found.type || 'Full-time',
            urgent: Boolean(found.urgent),
            description: found.description || '',
            requirements: found.requirements || [],
            publishedDate: found.publishedDate || null,
            publishedAt: found.publishedAt || null,
            applyBy: found.applyBy || null,
            hrContacts: found.hrContacts || [],
          };
          setJob(jobData);
          setForm(prev => ({ ...prev, pageName: cleanMarkdown(found.pageName || found.title || '') }));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [jobId]);

  const handleChange = useCallback((field) => (e) => {
    const val = field === 'cv' ? e.target.files?.[0] || null : e.target.value;
    setForm(prev => prev[field] === val ? prev : { ...prev, [field]: val });
  }, []);

  const handleApply = useCallback(async (e) => {
    e.preventDefault();
    if (!job?.id) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const [applicantResult, adminResult] = await Promise.allSettled([
        submitApplicant({
          jobId: job.id,
          name: form.name,
          mobile: form.mobile,
          email: form.email,
          pageName: form.pageName,
          cvFile: form.cv,
          googleSheetsPayload: {
            service: `Job Application - ${job.title || 'Open Position'}`,
            message: [
              `Job ID: ${String(job.id || '')}`,
              `Job Title: ${job.title || ''}`,
              `Company: ${job.company || ''}`,
              `Location: ${job.location || ''}`,
              `Page Name: ${form.pageName || ''}`,
            ].join(' | '),
          },
        }),
        submitToAdminBackend('job', {
          name: form.name,
          email: form.email,
          phone: form.mobile,
          message: '',
          metadata: {
            jobId: job.id,
            jobTitle: job.title,
            company: job.company,
            location: job.location,
            pageName: form.pageName,
            salary: job.salary,
            jobType: job.type,
            resume: form.cv ? form.cv.name : 'Not provided',
            source: 'job detail page'
          }
        }, { cv: form.cv })
      ]);

      const adminSubmission = adminResult.status === 'fulfilled' ? adminResult.value : null;
      if (!adminSubmission || adminSubmission.ok === false) {
        throw new Error(adminSubmission?.error || 'Submission to the new admin backend failed. Please try again.');
      }

      if (applicantResult.status !== 'fulfilled') {
        console.warn('Legacy applicant sync failed:', applicantResult.reason);
      }
      
      setSubmitted(true);
      setForm(EMPTY_FORM);
      setTimeout(() => setSubmitted(false), 6000);
    } catch (error) {
      setSubmitError(error?.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }, [job, form]);

  const goBack = useCallback(() => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/jobs');
  }, [navigate]);

  // ── States ──
  if (loading) return (
    <div className="pro-layout-center">
      <div className="pro-spinner"></div>
    </div>
  );

  if (!job) return (
    <div className="pro-layout-center">
      <div className="pro-not-found">
        <Building2 size={48} className="pro-nf-icon" />
        <h3>Job not found</h3>
        <p>This position might have been filled or removed.</p>
        <button className="pro-btn-secondary" onClick={goBack}>
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    </div>
  );

  return (
    <div className="pro-container">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {/* ── Top Navigation ── */}
      <nav className="pro-nav">
        <button className="pro-back-btn" onClick={goBack}>
          <ArrowLeft size={16} /> Back to Jobs
        </button>
      </nav>

      {/* ── Hero Header ── */}
      <header className="pro-hero">
        <div className="pro-hero-inner">
          <div className="pro-hero-main">
            {job.image ? (
              <div className="pro-company-logo overflow-hidden p-0">
                <img src={job.image} alt={job.title} className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="pro-company-logo">
                {job.company.charAt(0)}
              </div>
            )}
            <div className="pro-hero-details">
              <h1 className="pro-title">{cleanMarkdown(job.title)}</h1>
              <div className="pro-subtitle">
                <Building2 size={16} />
                <span>{cleanMarkdown(job.company)}</span>
              </div>
              <div className="pro-badges">
                {job.urgent && (
                  <span className="pro-badge pro-badge-urgent">
                    <Zap size={12} /> Urgent Requirement
                  </span>
                )}
                <span className="pro-badge pro-badge-type">{job.type}</span>
              </div>
            </div>
          </div>
        </div>
        <StatStrip job={job} />
      </header>

      {/* ── Main Layout (Content + Sticky Form) ── */}
      <div className="pro-main-layout">
        <div className="pro-content">
          <JobDescription job={job} />
          <Requirements job={job} />
          <BenefitsCard />
        </div>

        <aside className="pro-sidebar">
          <div className="pro-apply-card">
            <div className="pro-apply-header">
              <h3>Submit Application</h3>
              <p>Takes less than a minute</p>
            </div>

            {isJobExpired(job?.applyBy) ? (
              <div className="pro-closed-state flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Clock size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-800">Applications Closed</h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  The application deadline ({formatDateString(job?.applyBy)}) for this position has passed.
                </p>
                <button
                  type="button"
                  onClick={goBack}
                  className="mt-5 w-full rounded-xl bg-slate-900 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-slate-800"
                >
                  View Active Positions
                </button>
              </div>
            ) : submitted ? (
              <div className="pro-success-state">
                <div className="pro-success-icon"><CheckCircle size={48} /></div>
                <h4>Application Sent!</h4>
                <p>Our recruitment team will reach out to you on your mobile shortly.</p>
              </div>
            ) : (
              <form className="pro-form" onSubmit={handleApply}>
                {submitError && (
                  <div className="pro-form-error" role="alert">
                    {submitError}
                  </div>
                )}
                <div className="pro-form-group">
                  <label>Full Name *</label>
                  <input
                    required type="text"
                    placeholder="Enter your full name"
                    value={form.name} onChange={handleChange('name')}
                  />
                </div>
                <div className="pro-form-group">
                  <label>Mobile Number *</label>
                  <input
                    required type="tel"
                    placeholder="+91 00000 00000"
                    value={form.mobile} onChange={handleChange('mobile')}
                  />
                </div>
                <div className="pro-form-group">
                  <label>Email Address <span className="pro-optional">(Optional)</span></label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email} onChange={handleChange('email')}
                  />
                </div>
                <div className="pro-form-group">
                  <label>Position / Page Name</label>
                  <input
                    type="text"
                    disabled
                    value={cleanMarkdown(form.pageName || job.title || '')}
                    className="pro-form-input-disabled"
                  />
                </div>
                <div className="pro-form-group">
                  <label>Upload CV *</label>
                  <input
                    required type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange('cv')}
                    className="pro-form-file-input"
                  />
                  {form.cv && (
                    <div className="pro-form-file-name">
                      <span>📄 {form.cv.name}</span>
                    </div>
                  )}
                </div>
                <button type="submit" className="pro-btn-primary" disabled={submitting}>
                  {submitting ? 'Submitting...' : (
                    <>Apply Now <Send size={16} /></>
                  )}
                </button>
              </form>
            )}

            <div className="pro-trust-badge">
              <Shield size={14} /> <span>Your information is 100% secure</span>
            </div>
          </div>

          <div className="pro-apply-card mt-6">
            <div className="pro-apply-header">
              <h3>Recruitment Contacts</h3>
              <p>For enquiries related to this role</p>
            </div>
            <div className="pro-contacts-list">
              {(job.hrContacts && job.hrContacts.length ? job.hrContacts : defaultContacts).map((contact, i) => (
                <div key={i} className="pro-contact-item">
                  <div className="pro-contact-header">
                    <span className="pro-contact-name">{contact.name || 'HR Recruitment Team'}</span>
                    <span className="pro-contact-badge">HR</span>
                  </div>
                  <p className="pro-contact-phone">{contact.phone}</p>
                  <div className="pro-contact-actions">
                    <a
                      href={`tel:${contact.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="pro-contact-btn pro-contact-btn-call"
                    >
                      <Phone size={13} className="shrink-0" /> Call
                    </a>
                    <a
                      href={getWhatsAppLink(contact.phone, job.title, job.company)}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pro-contact-btn pro-contact-btn-whatsapp"
                    >
                      <WhatsAppIcon size={13} className="shrink-0" /> WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default JobDetailPage;