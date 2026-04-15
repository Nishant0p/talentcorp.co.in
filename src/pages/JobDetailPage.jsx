import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, IndianRupee, Clock, Users, Briefcase, Calendar } from 'lucide-react';
import { fetchJobs, submitApplicant } from '../utils/strapi';

const jobs = [
  { id: 1, title: 'Production Operator', company: 'Tata Motors', location: 'Pune, Maharashtra', salary: '₹18,000 - ₹25,000', type: 'Full-time', urgent: true },
  { id: 2, title: 'ITI Technician', company: 'Maruti Suzuki', location: 'Gurugram, Haryana', salary: '₹15,000 - ₹22,000', type: 'Apprenticeship', urgent: false },
  { id: 3, title: 'Quality Inspector', company: 'Bajaj Auto', location: 'Aurangabad, Maharashtra', salary: '₹20,000 - ₹28,000', type: 'Full-time', urgent: true },
  { id: 4, title: 'Electrical Trainee', company: 'L&T Construction', location: 'Chennai, Tamil Nadu', salary: '₹12,000 - ₹18,000', type: 'Apprenticeship', urgent: false },
  { id: 5, title: 'CNC Operator', company: 'Mahindra & Mahindra', location: 'Nashik, Maharashtra', salary: '₹22,000 - ₹30,000', type: 'Full-time', urgent: false },
  { id: 6, title: 'Assembly Line Worker', company: 'Hero MotoCorp', location: 'Haridwar, Uttarakhand', salary: '₹16,000 - ₹20,000', type: 'Contract', urgent: true },
];

const JobDetailPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(() => jobs.find(j => j.id === parseInt(jobId, 10)));
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '' });

  useEffect(() => {
    const loadJob = async () => {
      setLoading(true);
      const data = await fetchJobs();
      if (data.length > 0) {
        const found = data.find((entry) => String(entry.id) === String(jobId));
        if (found) {
          setJob({
            id: found.id,
            title: found.title || `Job ${found.id}`,
            company: found.company || 'TSPL Group',
            category: found.category || found.type || 'General',
            location: found.location || 'India',
            salary: found.salary || 'Competitive salary',
            type: found.type || 'Full-time',
            urgent: Boolean(found.urgent),
          });
        }
      }
      setLoading(false);
    };

    loadJob();
  }, [jobId]);

  const handleApply = async (event) => {
    event.preventDefault();
    if (!job?.id) return;

    setIsSubmitting(true);
    try {
      await submitApplicant({
        jobId: job.id,
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
      });
      setSubmitted(true);
      setFormData({ name: '', mobile: '', email: '' });
      window.setTimeout(() => setSubmitted(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-gray-500">Loading job details...</p>
        </div>
      </section>
    );
  }

  if (!job) {
    return (
      <section className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 font-semibold text-gray-600 transition-all hover:border-blue-400 hover:text-blue-600"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <p className="text-center text-gray-500">Job not found</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Textures */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Slanting line pattern overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(37,99,235,0.08) 0px, rgba(37,99,235,0.08) 1px, transparent 1px, transparent 14px)',
          }}
        />

        {/* Corner dot-fade textures */}
        <div
          className="absolute -left-24 -top-16 h-64 w-64 rounded-full opacity-35"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(37,99,235,0.26) 1.1px, transparent 1.1px), radial-gradient(circle at center, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.06) 50%, transparent 74%)',
            backgroundSize: '13px 13px, 100% 100%',
          }}
        />
        <div
          className="absolute -right-24 -top-10 h-72 w-72 rounded-full opacity-35"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(249,115,22,0.22) 1.1px, transparent 1.1px), radial-gradient(circle at center, rgba(249,115,22,0.16) 0%, rgba(249,115,22,0.06) 50%, transparent 74%)',
            backgroundSize: '13px 13px, 100% 100%',
          }}
        />
        <div
          className="absolute -left-24 -bottom-20 h-72 w-72 rounded-full opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(37,99,235,0.24) 1px, transparent 1px), radial-gradient(circle at center, rgba(37,99,235,0.16) 0%, rgba(37,99,235,0.04) 55%, transparent 76%)',
            backgroundSize: '14px 14px, 100% 100%',
          }}
        />
        <div
          className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(249,115,22,0.2) 1px, transparent 1px), radial-gradient(circle at center, rgba(249,115,22,0.14) 0%, rgba(249,115,22,0.04) 56%, transparent 78%)',
            backgroundSize: '14px 14px, 100% 100%',
          }}
        />
      </div>

      <div className="mx-auto max-w-3xl relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 font-semibold text-gray-600 transition-all hover:border-blue-400 hover:text-blue-600"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="rounded-2xl bg-white p-8 shadow-lg relative">
          {/* Header */}
          <div className="mb-8 border-b border-gray-200 pb-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl font-bold text-blue-600">
                {job.company.charAt(0)}
              </div>
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900">{job.title}</h1>
                <p className="text-xl text-gray-500">{job.company}</p>
              </div>
            </div>
            {job.urgent && (
              <span className="inline-block rounded-md border border-orange-100 bg-orange-50 px-3 py-1 text-sm font-bold text-orange-600">
                Urgent Hiring
              </span>
            )}
          </div>

          {/* Key Details Grid */}
          <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl bg-indigo-50 p-6">
              <div className="mb-2 flex items-center gap-2 text-indigo-600">
              <Briefcase size={20} />
              <span className="font-semibold">Category</span>
              </div>
              <p className="text-lg text-gray-900">{job.category}</p>
            </div>

            <div className="rounded-xl bg-blue-50 p-6">
              <div className="mb-2 flex items-center gap-2 text-blue-600">
                <MapPin size={20} />
                <span className="font-semibold">Location</span>
              </div>
              <p className="text-lg text-gray-900">{job.location}</p>
            </div>

            <div className="rounded-xl bg-green-50 p-6">
              <div className="mb-2 flex items-center gap-2 text-green-600">
                <IndianRupee size={20} />
                <span className="font-semibold">Salary</span>
              </div>
              <p className="text-lg text-gray-900">{job.salary}/month</p>
            </div>

            <div className="rounded-xl bg-purple-50 p-6">
              <div className="mb-2 flex items-center gap-2 text-purple-600">
                <Clock size={20} />
                <span className="font-semibold">Employment Type</span>
              </div>
              <p className="text-lg text-gray-900">{job.type}</p>
            </div>

            <div className="rounded-xl bg-orange-50 p-6">
              <div className="mb-2 flex items-center gap-2 text-orange-600">
                <Calendar size={20} />
                <span className="font-semibold">Posted Date</span>
              </div>
              <p className="text-lg text-gray-900">Recently</p>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">About this Job</h2>
            <p className="mb-6 text-gray-600">
              This is an exciting opportunity to join {job.company} as a {job.title}. We are looking for
              dedicated professionals to contribute to our growing team in {job.location}.
            </p>
          </div>

          {/* Requirements */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Key Requirements</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-600">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
                <span>Strong technical skills relevant to the {job.title} position</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
                <span>Problem-solving and analytical abilities</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
                <span>Team collaboration and communication skills</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
                <span>Commitment to excellence and continuous learning</span>
              </li>
            </ul>
          </div>

          {/* Benefits */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What We Offer</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                <Users size={20} className="text-blue-600" />
                <span className="text-gray-700">Competitive Salary</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                <Briefcase size={20} className="text-blue-600" />
                <span className="text-gray-700">Career Growth</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                <Users size={20} className="text-blue-600" />
                <span className="text-gray-700">Health Benefits</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                <Briefcase size={20} className="text-blue-600" />
                <span className="text-gray-700">Training Programs</span>
              </div>
            </div>
          </div>

          <div className="mb-12 rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Apply for this Job</h2>
            {submitted ? (
              <p className="rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">Application submitted successfully.</p>
            ) : (
              <form onSubmit={handleApply} className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Full name"
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
                <input
                  required
                  type="tel"
                  value={formData.mobile}
                  onChange={(event) => setFormData((prev) => ({ ...prev, mobile: event.target.value }))}
                  placeholder="Mobile number"
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="Email (optional)"
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 sm:col-span-2"
                />
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-800 active:scale-[0.98]"
            >
              Apply Now Above
            </button>
            <button
              onClick={() => navigate('/jobs')}
              className="flex-1 rounded-xl border-2 border-gray-200 bg-white px-8 py-4 text-lg font-bold text-gray-700 transition-all hover:border-blue-400 hover:bg-blue-50"
            >
              View Other Jobs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetailPage;
