import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, MapPin, IndianRupee, Clock, Briefcase, Calendar,
  CheckCircle, Send, Zap, Shield, TrendingUp, Heart, Award, Star, Building2
} from 'lucide-react';
import { fetchJobs, submitApplicant } from '../utils/strapi';
import './JobDetailPage.css';

// ─── Static constants ────────────────────────────────────────────────────────

const FALLBACK = [
  { id: 1, title: 'Production Operator', company: 'Tata Motors', location: 'Pune, MH', salary: '₹18,000–₹25,000', type: 'Full-time', urgent: true },
  { id: 2, title: 'ITI Technician', company: 'Maruti Suzuki', location: 'Gurugram, HR', salary: '₹15,000–₹22,000', type: 'Apprenticeship', urgent: false },
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

const getStats = (job) => [
  { icon: Briefcase, label: 'Category', value: job.category || 'General' },
  { icon: MapPin, label: 'Location', value: job.location },
  { icon: IndianRupee, label: 'Salary', value: job.salary },
  { icon: Clock, label: 'Type', value: job.type },
  { icon: Calendar, label: 'Posted', value: 'Recently' },
];

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

const JobDescription = React.memo(({ job }) => (
  <section className="pro-section">
    <h2 className="pro-section-title">Role Overview</h2>
    <div className="pro-section-content">
      <div 
        className="pro-description-text"
        dangerouslySetInnerHTML={{
          __html: `
            Join <strong>${job.company}</strong> as a <strong>${job.title}</strong> based in ${job.location}.
            This is a dynamic role designed for individuals who are passionate about delivering quality results.
            You will be working with a highly skilled, supportive team with clear avenues for professional growth and skill enhancement.
          `.replace(/\n/g, '<br />')
        }}
      />
    </div>
  </section>
));

const Requirements = React.memo(() => (
  <section className="pro-section">
    <h2 className="pro-section-title">Key Requirements</h2>
    <div className="pro-section-content">
      <ul className="pro-req-list">
        {REQS.map((r, i) => (
          <li key={i} className="pro-req-item">
            <CheckCircle size={16} className="pro-req-icon" />
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
));

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

const JobDetailPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(() => FALLBACK.find(j => j.id === parseInt(jobId, 10)) ?? null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

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
          };
          setJob(jobData);
          setForm(prev => ({ ...prev, pageName: found.pageName || found.title || '' }));
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
    try {
      // Prepare FormData for file upload
      const formData = new FormData();
      if (form.cv) {
        formData.append('cv', form.cv);
      }

      await submitApplicant({
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
      });
      setSubmitted(true);
      setForm(EMPTY_FORM);
      setTimeout(() => setSubmitted(false), 6000);
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
            <div className="pro-company-logo">
              {job.company.charAt(0)}
            </div>
            <div className="pro-hero-details">
              <h1 className="pro-title">{job.title}</h1>
              <div className="pro-subtitle">
                <Building2 size={16} />
                <span>{job.company}</span>
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
          <Requirements />
          <BenefitsCard />
        </div>

        <aside className="pro-sidebar">
          <div className="pro-apply-card">
            <div className="pro-apply-header">
              <h3>Submit Application</h3>
              <p>Takes less than a minute</p>
            </div>

            {submitted ? (
              <div className="pro-success-state">
                <div className="pro-success-icon"><CheckCircle size={48} /></div>
                <h4>Application Sent!</h4>
                <p>Our recruitment team will reach out to you on your mobile shortly.</p>
              </div>
            ) : (
              <form className="pro-form" onSubmit={handleApply}>
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
                  <label>Page Name</label>
                  <input
                    type="text"
                    disabled
                    value={form.pageName}
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
        </aside>
      </div>
    </div>
  );
};

export default JobDetailPage;