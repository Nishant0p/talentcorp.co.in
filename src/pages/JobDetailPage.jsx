import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, IndianRupee, Clock, Users, Briefcase, Calendar } from 'lucide-react';

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
  const job = jobs.find(j => j.id === parseInt(jobId));

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
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 font-semibold text-gray-600 transition-all hover:border-blue-400 hover:text-blue-600"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
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

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-800 active:scale-[0.98]">
              Apply Now
            </button>
            <button
              onClick={() => navigate('/#job-board')}
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
