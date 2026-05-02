import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, GraduationCap, Briefcase, FileText, CheckSquare, Award, Building2, ArrowRight, Phone, Mail, Sparkles, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceEnquirySection from '../components/ServiceEnquirySection';

const natsHighlights = [
	{
		value: 'Min Stpend',
		label: 'Rs 8,000/month',
	},
	{
		value: '1 Year',
		label: 'Duration of training',
	},
	{
		value: 'Govt Certificate',
		label: 'National validation',
	},
];

const apprenticeBenefits = ['Earn While You Learn', 'Govt. Certificate', 'Skill Development', 'Career Launchpad'];
const employerBenefits = ['Cost Savings', 'Fresh Talent', 'CSR Benefits', 'Reduce Attrition'];

const processSteps = [
	{ id: '01', title: 'Register', icon: <FileText /> },
	{ id: '02', title: 'Apply', icon: <Briefcase /> },
	{ id: '03', title: 'Verify', icon: <CheckSquare /> },
	{ id: '04', title: 'Contract', icon: <FileText /> },
	{ id: '05', title: 'Train', icon: <Award /> },
	{ id: '06', title: 'Certify', icon: <GraduationCap /> },
];

export default function NatsLandingPage() {
	useEffect(() => {
		document.title = 'NATS - National Apprenticeship Training Scheme | TSPL India';
		document.querySelector('meta[name="description"]')?.setAttribute('content', 'NATS - Government of India apprenticeship scheme. Earn Rs. 8,000+/month with hands-on industry training and certification.');
		document.querySelector('meta[property="og:title"]')?.setAttribute('content', 'NATS - National Apprenticeship Training Scheme');
		document.querySelector('meta[property="og:image"]')?.setAttribute('content', 'https://tsplgroup.in/natshero.png');
	}, []);
	return (
		<div className="min-h-screen bg-slate-50 text-slate-800">
			<Navbar />

			<main>
				<section
					className="relative flex min-h-screen items-center overflow-hidden pt-20 sm:pt-24"
					style={{ backgroundImage: 'url("/natshero.png")', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
				>
					<div className="absolute inset-0 bg-white/10" />

					<div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
						<div className="mx-auto max-w-5xl text-center">
							<div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-5 py-2.5 backdrop-blur-sm">
								<Sparkles className="h-4 w-4 text-[#2563EB]" />
								<span className="text-sm font-semibold tracking-wide text-white">Ministry of Education, Govt. of India</span>
							</div>

							<h1 className="mb-6 text-2xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
								National Apprenticeship
								<span className="mt-2 block bg-gradient-to-r from-[#2563EB] to-[#F97316] bg-clip-text text-transparent">Training Scheme</span>
							</h1>

							<p className="mx-auto mb-10 max-w-3xl text-sm font-medium leading-relaxed text-white sm:text-base lg:text-lg">
								Earn <span className="font-bold text-white">up to Rs. 9,000/month</span> while gaining <span className="font-bold text-white">real industry experience</span>
							</p>

							<div className="mb-14 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
								<Link to="/jobs" className="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] px-6 py-3 text-sm font-semibold text-white shadow-2xl shadow-[#2563EB]/40 transition-all duration-300 hover:scale-105 sm:px-8 sm:py-4 sm:text-base">
									<GraduationCap className="mr-2 h-5 w-5" />
									Start Your Career
									<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
								</Link>
								<Link to="/contact-us" className="inline-flex items-center justify-center rounded-2xl border-2 border-[#2563EB] bg-white px-6 py-3 text-sm font-semibold text-[#2563EB] transition-all duration-300 hover:bg-[#2563EB] hover:text-white sm:px-8 sm:py-4 sm:text-base">
									<TrendingUp className="mr-2 h-5 w-5" />
									Hire Apprentices
								</Link>
							</div>
						</div>
					</div>
				</section>

				<section id="about" className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-20 md:grid-cols-2">
					<div>
						<div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-700 shadow-sm">
							<span className="relative inline-flex h-2.5 w-2.5">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
								<span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-600" />
							</span>
							ABOUT NATS
						</div>
						<h2 className="mb-6 text-4xl font-bold">
							What is <span className="text-blue-600">NATS?</span>
						</h2>
						<p className="mb-6 text-slate-600">
							A flagship Government of India scheme connecting fresh graduates with top industries for hands-on practical training.
						</p>
						<ul className="mb-8 space-y-3">
							{['12 months skilled training', 'Monthly stipend (min. 8,000)', 'Government recognized certificate', 'Real industry work experience'].map((item) => (
								<li key={item} className="flex items-center text-slate-700">
									<CheckCircle2 className="mr-3 h-5 w-5 text-green-500" /> {item}
								</li>
							))}
						</ul>
						<a href="https://nats.education.gov.in" target="_blank" rel="noreferrer" className="rounded-lg border border-yellow-300 bg-yellow-100 px-4 py-2 font-medium text-yellow-800 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-200 hover:shadow-md">
							Ministry of Education, Govt. of India
						</a>
					</div>

					<div>
						<div className="group mb-6 flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
							<img
								src="/nats%20tspl.jpg"
								alt="NATS hero image"
								className="h-56 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
							/>
						</div>
						<div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
							{natsHighlights.map((item) => (
								<div key={item.label} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
									<div className="mb-1 text-xl font-bold text-blue-600">{item.value}</div>
									<div className="text-xs text-slate-500">{item.label}</div>
								</div>
							))}
						</div>
					</div>
				</section>

				<section id="services" className="bg-white px-8 py-20">
					<div className="mx-auto mb-16 max-w-7xl text-center">
						<h2 className="mb-4 text-4xl font-bold">
							Why Choose <span className="text-blue-600">NATS?</span>
						</h2>
						<p className="text-slate-500">Benefits for both apprentices and employers.</p>
					</div>

					<div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
						<div>
							<div className="mb-6 flex items-center space-x-3">
								<div className="rounded-lg bg-blue-600 p-2 text-white transition-transform duration-300 hover:rotate-6 hover:scale-105">
									<GraduationCap />
								</div>
								<h3 className="text-2xl font-bold">For Apprentices</h3>
							</div>
							<div className="grid grid-cols-2 gap-4">
								{apprenticeBenefits.map((item) => (
									<div key={item} className="group flex flex-col items-start rounded-xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl">
										<div className="mb-4 rounded-full bg-blue-100 p-2 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
											<CheckCircle2 className="h-5 w-5" />
										</div>
										<h4 className="font-bold text-slate-800">{item}</h4>
									</div>
								))}
							</div>
						</div>

						<div>
							<div className="mb-6 flex items-center space-x-3">
								<div className="rounded-lg bg-orange-500 p-2 text-white transition-transform duration-300 hover:rotate-6 hover:scale-105">
									<Briefcase />
								</div>
								<h3 className="text-2xl font-bold">For Employers</h3>
							</div>
							<div className="grid grid-cols-2 gap-4">
								{employerBenefits.map((item) => (
									<div key={item} className="group flex flex-col items-start rounded-xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-xl">
										<div className="mb-4 rounded-full bg-orange-100 p-2 text-orange-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white">
											<CheckCircle2 className="h-5 w-5" />
										</div>
										<h4 className="font-bold text-slate-800">{item}</h4>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className="bg-white px-6 py-16 font-sans text-slate-800 sm:px-8">
					<div className="mx-auto w-full max-w-5xl">
						<div className="mb-10 text-center">
							<h2 className="mb-3 text-4xl font-bold">
								Who Can <span className="text-blue-600">Apply?</span>
							</h2>
							<p className="text-lg text-slate-500">Eligibility criteria & documents</p>
						</div>

						<div className="mb-6 grid gap-6 md:grid-cols-2">
							<div className="rounded-2xl border border-blue-100 bg-[#f8fbff] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
								<div className="mb-6 flex items-center gap-4">
									<div className="flex items-center justify-center rounded-full bg-blue-600 p-3 text-white transition-transform duration-300 hover:scale-110">
										<GraduationCap className="h-6 w-6" />
									</div>
									<h3 className="text-2xl font-bold">Apprentices</h3>
								</div>
								<ul className="list-none space-y-3 text-slate-600">
									{[
										'Engineering/Diploma/Degree holder',
										'Passed within last 3 years',
										'Age 18-30, Indian citizen',
										'Valid Aadhaar & bank account',
									].map((item) => (
										<li key={item} className="flex items-start gap-3">
											<span className="mt-0.5 text-xl leading-none text-blue-500">•</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>

							<div className="rounded-2xl border border-orange-100 bg-[#fffcf8] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl">
								<div className="mb-6 flex items-center gap-4">
									<div className="flex items-center justify-center rounded-full bg-[#f97316] p-3 text-white transition-transform duration-300 hover:scale-110">
										<Building2 className="h-6 w-6" />
									</div>
									<h3 className="text-2xl font-bold">Employers</h3>
								</div>
								<ul className="list-none space-y-3 text-slate-600">
									{[
										'Registered company/PSU',
										'Minimum 4 employees',
										'Valid GST registration',
										'Training infrastructure',
									].map((item) => (
										<li key={item} className="flex items-start gap-3">
											<span className="mt-0.5 text-xl leading-none text-orange-500">•</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
							<div className="mb-6 flex items-center gap-2">
								<FileText className="h-5 w-5 text-slate-800" />
								<h3 className="text-xl font-bold">Required Documents</h3>
							</div>

							<div className="grid gap-8 md:grid-cols-2">
								<div>
									<h4 className="mb-3 font-medium text-blue-600">Apprentices</h4>
									<div className="flex flex-wrap gap-3">
										{['Aadhaar Card', 'Photo', 'Certificates', 'Bank Details'].map((doc) => (
											<span key={doc} className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
												{doc}
											</span>
										))}
									</div>
								</div>

								<div>
									<h4 className="mb-3 font-medium text-orange-500">Employers</h4>
									<div className="flex flex-wrap gap-3">
										{['Registration Cert', 'GST', 'PAN Card', 'Signatory '].map((doc) => (
											<span key={doc} className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md">
												{doc}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id="process" className="bg-slate-50 px-8 py-20">
					<div className="mx-auto mb-16 max-w-5xl text-center">
						<div className="mb-2 font-semibold text-blue-600">OUR PROCESS</div>
						<h2 className="mb-4 text-4xl font-bold">
							Your Journey to <span className="text-blue-600">Success</span>
						</h2>
						<p className="text-slate-500">Follow our streamlined 6-step process.</p>
					</div>

					<div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
						{processSteps.map((step) => (
							<div key={step.id} className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl">
								<div className="absolute -right-4 -top-4 z-0 text-8xl font-black text-blue-100/50">{step.id}</div>
								<div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-blue-600 group-hover:text-white">
									{step.icon}
								</div>
								<h3 className="relative z-10 mb-2 text-xl font-bold">{step.title}</h3>
								<p className="relative z-10 text-sm text-slate-500">Brief description of this step goes right here.</p>
							</div>
						))}
					</div>
				</section>

                <section className="py-24 bg-[#f8f9fc] flex flex-col items-center justify-center font-sans">
                
                {/* Heading Text */}
                <p className="text-slate-600 text-lg font-medium mb-6">
                    Ready to get started?
                </p>

                {/* Gradient Button */}
						<Link to="/contact-us" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-10 py-3 font-bold text-white shadow-md transition-all transform hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg">
                    Begin Your Journey
						</Link>

                </section>
  
				<section className="px-8 pb-20 pt-2">
					<div className="mx-auto w-full max-w-6xl">
						<div className="flex flex-col items-center justify-between gap-10 rounded-3xl bg-gradient-to-r from-[#2d52b4] to-[#4083ff] p-8 shadow-lg md:flex-row md:p-12">
							<div className="flex-1">
								<h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
									Start Your Journey Today
								</h2>
								<p className="mb-8 text-lg text-blue-100">
									Join thousands who transformed their careers through NATS.
								</p>

								<div className="flex flex-wrap gap-4">
									<Link to="/jobs" className="flex items-center gap-2 rounded-full bg-[#f97316] px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#ea580c]">
										<GraduationCap className="h-5 w-5" />
										Join Now
										<ArrowRight className="h-5 w-5" />
									</Link>

									<Link to="/contact-us" className="flex items-center gap-2 rounded-full border border-white/40 bg-transparent px-6 py-3 font-medium text-white transition-colors hover:bg-white/10">
										<Building2 className="h-5 w-5 text-blue-100" />
										For Employers
									</Link>
								</div>
							</div>

							<div className="w-full rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm md:w-[420px]">
								<h3 className="mb-4 font-medium text-white">Need Help?</h3>

								<div className="space-y-3">
									<a
										href="tel:+919876543210"
										className="flex items-center gap-4 rounded-xl bg-white/15 p-4 text-white no-underline transition-colors hover:bg-white/25"
									>
										<Phone className="h-5 w-5 text-blue-100" />
										<span className="font-medium">+91 98765 43210</span>
									</a>

									<a
										href="mailto:support@tsplgroup.com"
										className="flex items-center gap-4 rounded-xl bg-white/15 p-4 text-white no-underline transition-colors hover:bg-white/25"
									>
										<Mail className="h-5 w-5 text-blue-100" />
										<span className="font-medium">support@tsplgroup.com</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<ServiceEnquirySection serviceName="NATS" />

			<Footer />
		</div>
	);
}
