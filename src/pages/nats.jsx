import React from 'react';
import { ChevronRight, CheckCircle2, GraduationCap, Briefcase, FileText, CheckSquare, Award, Building2, ArrowRight, Phone, Mail } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const natsHighlights = [
	{
		value: 'Rs 8,000/month',
		label: 'Min stipend for degree holders',
	},
	{
		value: '1 Year',
		label: 'Duration of training',
	},
	{
		value: 'Govt. Certificate',
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
	return (
		<div className="min-h-screen bg-slate-50 text-slate-800">
			<Navbar />

			<main>
				<header className="relative overflow-hidden bg-gradient-to-b from-[#0a0f25] via-[#101a35] to-[#1a2342] px-4 pb-28 pt-20 text-center md:pt-28">
					<div className="pointer-events-none absolute inset-0 overflow-hidden">
						<div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
						<div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-orange-500/15 blur-3xl" />
						<div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
					</div>
					<div className="mx-auto mb-6 inline-block rounded-full border border-blue-500/30 bg-blue-900/50 px-4 py-1.5 text-sm text-blue-300">
						Ministry of Education, Govt. of India
					</div>
					<h1 className="mb-4 text-5xl font-extrabold text-white md:text-6xl">
						National <br /> Apprenticeship <br />
						<span className="text-blue-400">Training Scheme</span>
					</h1>
					<p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300">
						Earn <span className="font-bold text-orange-400">Rs. 9,000/month</span> while gaining{' '}
						<span className="text-blue-400">real industry experience</span>
					</p>

					<div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
						<button className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3 font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-[0_24px_50px_rgba(37,99,235,0.36)] active:translate-y-0">
							<GraduationCap className="h-5 w-5" />
							Start Your Career <ChevronRight className="h-4 w-4" />
						</button>
						<button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-600 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg active:translate-y-0">
							<Building2 className="h-5 w-5 text-blue-100" />
							Hire Apprentices
						</button>
					</div>

					<div className="mx-auto grid max-w-5xl gap-4 px-4 text-white sm:grid-cols-3">
						{[
							{ value: '25,000+', label: 'Apprentices Placed' },
							{ value: '300+', label: 'Industry Partners' },
							{ value: '100%', label: 'Govt. Compliant' },
						].map((stat) => (
							<div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_18px_40px_rgba(15,23,42,0.28)]">
								<h3 className="text-3xl font-bold">{stat.value}</h3>
								<p className="text-sm text-slate-400">{stat.label}</p>
							</div>
						))}
					</div>
				</header>

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
						<button className="rounded-lg border border-yellow-300 bg-yellow-100 px-4 py-2 font-medium text-yellow-800 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-200 hover:shadow-md">
							Ministry of Education, Govt. of India
						</button>
					</div>

					<div>
						<div className="group mb-6 h-80 w-full rounded-2xl bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
							<div className="flex h-full items-center justify-center rounded-2xl border border-white/40 bg-white/15 text-sm font-semibold tracking-[0.25em] text-slate-700/80 backdrop-blur-sm transition-opacity duration-300 group-hover:bg-white/20">
								NATS HERO IMAGE
							</div>
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
										{['Registration Cert', 'GST', 'PAN Card', 'Signatory Details'].map((doc) => (
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
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-10 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                    Begin Your Journey
                </button>

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
									<button className="flex items-center gap-2 rounded-full bg-[#f97316] px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#ea580c]">
										<GraduationCap className="h-5 w-5" />
										Join Now
										<ArrowRight className="h-5 w-5" />
									</button>

									<button className="flex items-center gap-2 rounded-full border border-white/40 bg-transparent px-6 py-3 font-medium text-white transition-colors hover:bg-white/10">
										<Building2 className="h-5 w-5 text-blue-100" />
										For Employers
									</button>
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

			<Footer />
		</div>
	);
}
