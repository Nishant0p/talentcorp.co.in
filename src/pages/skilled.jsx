import { useState } from 'react'
import {
	ArrowRight,
	Award,
	Briefcase,
	Building2,
	Car,
	CheckCircle,
	CheckCircle2,
	ClipboardCheck,
	Clock,
	Droplets,
	Factory,
	FileCheck,
	FileText,
	GraduationCap,
	HardHat,
	Hammer,
	HeartHandshake,
	Lightbulb,
	Mail,
	MapPin,
	Package,
	Phone,
	Pill,
	Send,
	Settings,
	Shield,
	Sparkles,
	Star,
	Users,
	Utensils,
	Wrench,
	Zap,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const skillOptions = ['Welders', 'Electricians', 'CNC Operators', 'Fitters', 'Plumbers', 'Turners', 'Machinists', 'Supervisors', 'Other']

const processSteps = [
	{
		number: '01',
		title: 'You Call Us',
		description: 'Tell us what work you need done. How many workers? What skills? We listen to everything.',
		icon: Phone,
		color: '#2563EB',
	},
	{
		number: '02',
		title: 'We Find Workers',
		description: 'From our list of trained workers, we pick the best ones for your job. We check their skills and documents.',
		icon: FileText,
		color: '#F97316',
	},
	{
		number: '03',
		title: 'You Meet Them',
		description: 'You can interview the workers. If you like them, good! If not, we send more options.',
		icon: Users,
		color: '#8B5CF6',
	},
	{
		number: '04',
		title: 'Work Starts',
		description: 'Workers join your company and start working. We handle all paperwork. You just focus on your business.',
		icon: CheckCircle,
		color: '#22C55E',
	},
]

const industries = [
	{ icon: Factory, name: 'Manufacturing', description: 'Factories making products', workers: ['Welders', 'Fitters', 'Operators'], color: '#F97316' },
	{ icon: Car, name: 'Automobile', description: 'Car & bike companies', workers: ['Assembly', 'Paint', 'Quality'], color: '#2563EB' },
	{ icon: Pill, name: 'Pharma', description: 'Medicine companies', workers: ['Machine Operators', 'Packing', 'QC'], color: '#22C55E' },
	{ icon: Utensils, name: 'Food Industry', description: 'Food processing units', workers: ['Production', 'Packing', 'Quality'], color: '#EC4899' },
	{ icon: Zap, name: 'Electronics', description: 'Mobile, TV, appliance makers', workers: ['Assembly', 'Soldering', 'Testing'], color: '#8B5CF6' },
	{ icon: Building2, name: 'Construction', description: 'Building & infrastructure', workers: ['Mason', 'Plumber', 'Electrician'], color: '#06B6D4' },
	{ icon: Package, name: 'Logistics', description: 'Warehouse & transport', workers: ['Forklift', 'Packer', 'Loader'], color: '#EAB308' },
	{ icon: HardHat, name: 'Engineering', description: 'Heavy machinery & tools', workers: ['CNC', 'Turner', 'Machinist'], color: '#14B8A6' },
]

const jobTypes = [
	{ title: 'Welders', description: 'Join metals together using heat. Work in factories, construction sites.', image: '/Gemini_Generated_Image_qskougqskougqsko.png', icon: Zap, color: '#F97316', skills: ['Arc Welding', 'MIG/TIG', 'Pipe Welding'] },
	{ title: 'Electricians', description: 'Fix and install electrical wires, switches, machines safely.', image: '/happy-excited-executive-business-team-600nw-2424450635.jpg.webp', icon: Zap, color: '#2563EB', skills: ['Wiring', 'Panel Work', 'Motor Repair'] },
	{ title: 'CNC Operators', description: 'Run computer-controlled machines that cut and shape metal parts.', image: '/Gemini_Generated_Image_qskougqskougqsko.png', icon: Settings, color: '#22C55E', skills: ['CNC Turning', 'VMC', 'Programming'] },
	{ title: 'Fitters', description: 'Assemble and fit machine parts together with precision.', image: '/happy-excited-executive-business-team-600nw-2424450635.jpg.webp', icon: Wrench, color: '#8B5CF6', skills: ['Assembly', 'Alignment', 'Maintenance'] },
	{ title: 'Plumbers', description: 'Install and repair pipes for water and gas in buildings and factories.', image: '/Gemini_Generated_Image_qskougqskougqsko.png', icon: Droplets, color: '#06B6D4', skills: ['Pipe Fitting', 'Drainage', 'Industrial'] },
	{ title: 'Supervisors', description: 'Manage teams of workers, check quality, ensure safety on site.', image: '/happy-excited-executive-business-team-600nw-2424450635.jpg.webp', icon: ClipboardCheck, color: '#EC4899', skills: ['Team Lead', 'Quality Check', 'Safety'] },
]

const whyBenefits = [
	{ icon: Award, title: 'Trained Workers Only', description: 'All our workers have ITI certificate or diploma. They know their work well.', color: '#F97316' },
	{ icon: FileCheck, title: 'All Documents Checked', description: 'We verify Aadhaar, education, police check, and past jobs. No fake workers.', color: '#2563EB' },
	{ icon: Clock, title: 'Fast - 48 Hours', description: 'Need workers urgently? We can send good workers within 2 days.', color: '#22C55E' },
	{ icon: Users, title: 'Big Team - 25,000+', description: 'We have 25,000+ skilled workers ready. Whatever number you need.', color: '#8B5CF6' },
	{ icon: Shield, title: 'Replacement Guarantee', description: 'If worker is not good, we replace free. No risk for you.', color: '#EC4899' },
	{ icon: HeartHandshake, title: 'We Handle Everything', description: 'Salary, PF, ESI, insurance - all paperwork done by us. You just use the workers.', color: '#06B6D4' },
]

const stats = [
	{ value: '10+', label: 'Years Experience' },
	{ value: '400+', label: 'Happy Companies' },
	{ value: '25,000+', label: 'Workers Placed' },
	{ value: '98%', label: 'Success Rate' },
]

function SkilledJobHero() {
	return (
		<section className="relative flex min-h-[90vh] items-center overflow-hidden">
			<div className="absolute inset-0">
				<img src="/Gemini_Generated_Image_qskougqskougqsko.png" alt="Skilled Workers" className="h-full w-full object-cover" />
				<div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/85 to-[#0F172A]/70" />
			</div>

			<div className="absolute right-20 top-20 h-72 w-72 rounded-full bg-[#F97316]/20 blur-3xl" />
			<div className="absolute bottom-20 left-1/4 h-96 w-96 rounded-full bg-[#2563EB]/15 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8">
				<div className="max-w-3xl">
					<div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#F97316]/30 bg-[#F97316]/20 px-4 py-2 backdrop-blur-sm">
						<Wrench className="h-4 w-4 text-[#F97316]" />
						<span className="text-sm font-bold text-white">SKILLED JOB WORK</span>
					</div>

					<h1 className="mb-6 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
						We Have
						<span className="mt-2 block text-[#F97316]">Trained Workers</span>
						<span className="block text-white">For Your Work</span>
					</h1>

					<p className="mb-10 max-w-2xl text-xl leading-relaxed text-white/90">
						Need trained workers like welders, electricians, or machine operators?
						<span className="font-semibold text-[#F97316]"> TSPL provides skilled workers who know their job well.</span>
						 They come trained and ready to work.
					</p>

					<div className="mb-10 flex flex-wrap gap-4">
						{['Already Trained', 'Verified Workers', 'Quick Joining'].map((benefit) => (
							<div key={benefit} className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
								<CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
								<span className="text-sm font-medium text-white">{benefit}</span>
							</div>
						))}
					</div>

					<div className="mb-12 flex flex-col gap-4 sm:flex-row">
						<a href="#enquiry" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F97316] px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-[#F97316]/30 transition-all duration-300 hover:scale-105 hover:bg-[#EA580C]">
							Get Skilled Workers
							<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
						</a>
						<a href="tel:+919876543210" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10">
							Call Now: +91 98765 43210
						</a>
					</div>

					<div className="grid grid-cols-3 gap-4">
						<div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
							<p className="text-3xl font-bold text-white">25,000+</p>
							<p className="text-sm text-white/70">Skilled Workers</p>
						</div>
						<div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
							<p className="text-3xl font-bold text-[#F97316]">50+</p>
							<p className="text-sm text-white/70">Work Types</p>
						</div>
						<div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
							<p className="text-3xl font-bold text-[#22C55E]">400+</p>
							<p className="text-sm text-white/70">Happy Companies</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function WhatIsSkilledJob() {
	return (
		<section className="relative overflow-hidden bg-white py-20 lg:py-28">
			<div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-[#F97316]/5 blur-3xl" />
			<div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#2563EB]/5 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="grid items-center gap-16 lg:grid-cols-2">
					<div>
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F97316]/20 bg-[#F97316]/10 px-4 py-2">
							<Lightbulb className="h-4 w-4 text-[#F97316]" />
							<span className="text-sm font-bold text-[#F97316]">SIMPLE EXPLANATION</span>
						</div>

						<h2 className="mb-6 text-4xl font-bold leading-tight text-[#0F172A] lg:text-5xl">
							What is
							<span className="text-[#F97316]"> Skilled Job Work?</span>
						</h2>

						<div className="mb-8 space-y-4 text-lg leading-relaxed text-[#475569]">
							<p>
								<span className="font-semibold text-[#0F172A]">Skilled Job Work means work that needs training.</span> Not everyone can do this work. The worker must learn and practice first.
							</p>
							<p>For example: A welder knows how to join metals. An electrician knows how to fix wires safely. A CNC operator knows how to use big machines.</p>
							<p className="font-semibold text-[#F97316]">TSPL Group provides these trained workers to companies. We save companies time - no need to train new people.</p>
						</div>

						<div className="grid gap-4 sm:grid-cols-2">
							{[
								{ icon: GraduationCap, text: 'Workers with ITI/Diploma' },
								{ icon: Briefcase, text: '2+ Years Experience' },
								{ icon: CheckCircle2, text: 'Background Verified' },
								{ icon: Lightbulb, text: 'Ready to Start Work' },
							].map((item) => (
								<div key={item.text} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all duration-300 hover:border-[#F97316]/30 hover:bg-[#F97316]/5">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F97316]/10">
										<item.icon className="h-5 w-5 text-[#F97316]" />
									</div>
									<span className="font-medium text-[#0F172A]">{item.text}</span>
								</div>
							))}
						</div>
					</div>

					<div className="relative">
						<div className="overflow-hidden rounded-3xl shadow-2xl">
							<img src="https://iili.io/BaEi4ig.md.jpg" alt="Skilled welder at work" className="h-auto w-full object-cover" />
							<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
								<p className="text-xl font-bold text-white">Trained Worker at Work</p>
								<p className="text-sm text-white/80">Knows exactly how to do the job safely</p>
							</div>
						</div>

						<div className="absolute -bottom-6 -left-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-xl animate-bounce" style={{ animationDuration: '2.2s' }}>
							<div className="flex items-center gap-4">
								<div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#22C55E]/10">
									<GraduationCap className="h-7 w-7 text-[#22C55E]" />
								</div>
								<div>
									<p className="text-2xl font-bold text-[#0F172A]">50+ Trades</p>
									<p className="text-sm text-[#64748B]">Types of Skills</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function JobTypes() {
	return (
		<section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
			<div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-[#F97316]/5 blur-3xl" />
			<div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-[#2563EB]/5 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F97316]/20 bg-[#F97316]/10 px-4 py-2">
						<Hammer className="h-4 w-4 text-[#F97316]" />
						<span className="text-sm font-bold text-[#F97316]">TYPES OF SKILLED WORKERS</span>
					</div>
					<h2 className="mb-6 text-4xl font-bold text-[#0F172A] lg:text-5xl">What Kind of Worker Do You Need?</h2>
					<p className="mx-auto max-w-3xl text-lg text-[#64748B]">We have all types of trained workers. Just tell us what work you need done - we will send the right person with the right skills.</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{jobTypes.map((job) => (
						<div key={job.title} className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition-all duration-500 hover:border-transparent hover:shadow-2xl">
							<div className="relative h-48 overflow-hidden">
								<img src={job.image} alt={job.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
								<div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-xl shadow-lg" style={{ backgroundColor: job.color }}>
									<job.icon className="h-6 w-6 text-white" />
								</div>
								<div className="absolute bottom-4 left-4">
									<h3 className="text-2xl font-bold text-white">{job.title}</h3>
								</div>
							</div>

							<div className="p-6">
								<p className="mb-4 leading-relaxed text-[#64748B]">{job.description}</p>
								<div className="mb-4 flex flex-wrap gap-2">
									{job.skills.map((skill) => (
										<span key={skill} className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: `${job.color}15`, color: job.color }}>
											{skill}
										</span>
									))}
								</div>
								<a href="#enquiry" className="inline-flex items-center gap-2 text-sm font-bold transition-all group-hover:gap-3" style={{ color: job.color }}>
									Get {job.title}
									<ArrowRight className="h-4 w-4" />
								</a>
							</div>
						</div>
					))}
				</div>

				<div className="mt-12 text-center">
					<div className="inline-flex flex-col items-center gap-4 rounded-2xl bg-[#0F172A] p-6 text-white sm:flex-row">
						<div className="text-center sm:text-left">
							<p className="text-lg font-bold">Need a Different Type of Worker?</p>
							<p className="text-sm text-white/70">We have 50+ more trades. Just ask us.</p>
						</div>
						<a href="#enquiry" className="shrink-0 rounded-xl bg-[#F97316] px-6 py-3 font-bold transition-colors hover:bg-[#EA580C]">Ask for Any Trade</a>
					</div>
				</div>
			</div>
		</section>
	)
}

function Industries() {
	return (
		<section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-20 lg:py-28">
			<div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#F97316]/5 blur-3xl" />
			<div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#2563EB]/5 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-4 py-2">
						<Building2 className="h-4 w-4 text-[#2563EB]" />
						<span className="text-sm font-bold text-[#2563EB]">INDUSTRIES WE SERVE</span>
					</div>
					<h2 className="mb-6 text-4xl font-bold text-[#0F172A] lg:text-5xl">Which Business Are You In?</h2>
					<p className="mx-auto max-w-2xl text-lg text-[#64748B]">
						We provide skilled workers for all types of industries.
						<span className="font-semibold text-[#F97316]"> Whatever your industry, we have the right workers.</span>
					</p>
				</div>

				<div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6 md:grid-cols-3">
					{industries.map((industry) => (
						<div key={industry.name} className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl">
							<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${industry.color}15` }}>
								<industry.icon className="h-7 w-7" style={{ color: industry.color }} />
							</div>
							<h3 className="mb-1 text-lg font-bold text-[#0F172A]">{industry.name}</h3>
							<p className="mb-4 text-sm text-[#64748B]">{industry.description}</p>
							<div className="flex flex-wrap gap-1">
								{industry.workers.map((worker) => (
									<span key={worker} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-[#64748B]">
										{worker}
									</span>
								))}
							</div>
						</div>
					))}
				</div>

				<div className="mt-12 text-center">
					<div className="inline-flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-6 py-4 sm:flex-row">
						<span className="text-[#64748B]">Not seeing your industry?</span>
						<a href="#enquiry" className="font-bold text-[#F97316] transition-colors hover:text-[#EA580C]">Ask us - we work with many more!</a>
					</div>
				</div>
			</div>
		</section>
	)
}

function HowItWorks() {
	return (
		<section className="relative overflow-hidden bg-white py-20 lg:py-28">
			<div className="absolute left-0 top-1/4 h-72 w-72 rounded-full bg-[#2563EB]/5 blur-3xl" />
			<div className="absolute bottom-1/4 right-0 h-72 w-72 rounded-full bg-[#F97316]/5 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-4 py-2">
						<Sparkles className="h-4 w-4 text-[#2563EB]" />
						<span className="text-sm font-bold text-[#2563EB]">SIMPLE PROCESS</span>
					</div>
					<h2 className="mb-6 text-4xl font-bold text-[#0F172A] lg:text-5xl">How Does It Work?</h2>
					<p className="mx-auto max-w-2xl text-xl text-[#64748B]">
						Getting skilled workers is easy. Just 4 simple steps.
						<span className="font-semibold text-[#F97316]"> We do all the hard work for you.</span>
					</p>
				</div>

				<div className="relative">
					<div className="absolute left-0 right-0 top-1/2 hidden h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#2563EB] via-[#F97316] via-[#8B5CF6] to-[#22C55E] lg:block" />
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
						{processSteps.map((step, index) => (
							<div key={step.number} className="group relative">
								<div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
									<div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg" style={{ backgroundColor: step.color }}>
										<step.icon className="h-8 w-8 text-white" />
										<div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
											<span className="text-xs font-bold" style={{ color: step.color }}>{step.number}</span>
										</div>
									</div>
									<h3 className="mb-2 text-xl font-bold text-[#0F172A]">{step.title}</h3>
									<p className="leading-relaxed text-[#64748B]">{step.description}</p>
									{index < processSteps.length - 1 && (
										<div className="absolute -right-4 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 transition-colors group-hover:bg-slate-200 lg:flex">
											<ArrowRight className="h-4 w-4 text-[#64748B]" />
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="mt-16 text-center">
					<div className="rounded-3xl border border-[#F97316]/20 bg-gradient-to-r from-[#F97316]/10 to-[#2563EB]/10 p-8">
						<h3 className="mb-4 text-2xl font-bold text-[#0F172A]">Ready to Get Started?</h3>
						<p className="mx-auto mb-6 max-w-xl text-[#64748B]">It is free to enquire. Just tell us what you need - we will call you back with options.</p>
						<div className="flex flex-col justify-center gap-4 sm:flex-row">
							<a href="#enquiry" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F97316] px-8 py-4 text-lg font-bold text-white shadow-xl shadow-[#F97316]/20 transition-all duration-300 hover:scale-105 hover:bg-[#EA580C]">
								Start Now - Free Enquiry
								<ArrowRight className="h-5 w-5" />
							</a>
							<a href="tel:+919876543210" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#0F172A]/10 bg-white px-8 py-4 text-lg font-bold text-[#0F172A] transition-all duration-300 hover:border-[#2563EB] hover:text-[#2563EB]">
								<Phone className="h-5 w-5" />
								Call: +91 98765 43210
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function WhyChooseUs() {
	return (
		<section className="relative overflow-hidden bg-[#0F172A] py-20 lg:py-28">
			<div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[#F97316]/10 blur-3xl" />
			<div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#2563EB]/10 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
						<Star className="h-4 w-4 text-[#F97316]" />
						<span className="text-sm font-bold text-white">WHY CHOOSE TSPL</span>
					</div>
					<h2 className="mb-6 text-4xl font-bold text-white lg:text-5xl">Why Companies Choose Us?</h2>
					<p className="mx-auto max-w-2xl text-xl text-white/70">Many companies trust TSPL for skilled workers. Here is why:</p>
				</div>

				<div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{whyBenefits.map((benefit) => (
						<div key={benefit.title} className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10">
							<div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg" style={{ backgroundColor: `${benefit.color}20` }}>
								<benefit.icon className="h-7 w-7" style={{ color: benefit.color }} />
							</div>
							<h3 className="mb-2 text-xl font-bold text-white">{benefit.title}</h3>
							<p className="leading-relaxed text-white/70">{benefit.description}</p>
							<div className="absolute right-6 top-6">
								<CheckCircle2 className="h-5 w-5" style={{ color: benefit.color }} />
							</div>
						</div>
					))}
				</div>

				<div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
					<div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
						{stats.map((stat) => (
							<div key={stat.label} className="text-center">
								<p className="mb-2 text-4xl font-bold text-[#F97316] lg:text-5xl">{stat.value}</p>
								<p className="font-medium text-white">{stat.label}</p>
							</div>
						))}
					</div>
				</div>

				<div className="mt-12 text-center">
					<div className="inline-flex items-center gap-3 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/20 px-6 py-3">
						<Shield className="h-5 w-5 text-[#22C55E]" />
						<span className="font-medium text-white">Government Authorized & ISO Certified Company</span>
					</div>
				</div>
			</div>
		</section>
	)
}

function Enquiry() {
	const [selectedSkills, setSelectedSkills] = useState([])
	const [formState, setFormState] = useState('idle')

	const toggleSkill = (skill) => {
		setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((item) => item !== skill) : [...prev, skill]))
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		setFormState('submitting')
		window.setTimeout(() => {
			setFormState('success')
		}, 1500)
	}

	return (
		<section id="enquiry" className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
			<div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[#F97316]/5 blur-3xl" />
			<div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#2563EB]/5 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
					<div>
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F97316]/20 bg-[#F97316]/10 px-4 py-2">
							<Send className="h-4 w-4 text-[#F97316]" />
							<span className="text-sm font-bold text-[#F97316]">FREE ENQUIRY</span>
						</div>
						<h2 className="mb-4 text-4xl font-bold text-[#0F172A] lg:text-5xl">Tell Us What You Need</h2>
						<p className="mb-8 text-lg text-[#64748B]">Fill this form. We will call you back within 24 hours. No charge for enquiry.</p>

						{formState === 'success' ? (
							<div className="rounded-3xl border border-[#22C55E]/20 bg-[#22C55E]/10 p-8 text-center">
								<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#22C55E]/20">
									<CheckCircle2 className="h-10 w-10 text-[#22C55E]" />
								</div>
								<h3 className="mb-3 text-2xl font-bold text-[#0F172A]">Thank You!</h3>
								<p className="mb-6 text-[#64748B]">We received your enquiry. Our team will call you within 24 hours.</p>
								<p className="font-bold text-[#F97316]">For urgent needs, call: +91 98765 43210</p>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid gap-4 sm:grid-cols-2">
									<div className="space-y-2">
										<label htmlFor="name" className="font-medium text-[#0F172A]">Your Name *</label>
										<input id="name" required placeholder="Enter your name" className="h-12 w-full rounded-xl border border-slate-200 px-4 focus:border-[#F97316] focus:outline-none" />
									</div>
									<div className="space-y-2">
										<label htmlFor="phone" className="font-medium text-[#0F172A]">Phone Number *</label>
										<input id="phone" type="tel" required placeholder="+91 98765 43210" className="h-12 w-full rounded-xl border border-slate-200 px-4 focus:border-[#F97316] focus:outline-none" />
									</div>
								</div>

								<div className="grid gap-4 sm:grid-cols-2">
									<div className="space-y-2">
										<label htmlFor="company" className="font-medium text-[#0F172A]">Company Name *</label>
										<input id="company" required placeholder="Your company name" className="h-12 w-full rounded-xl border border-slate-200 px-4 focus:border-[#F97316] focus:outline-none" />
									</div>
									<div className="space-y-2">
										<label htmlFor="location" className="font-medium text-[#0F172A]">Location *</label>
										<input id="location" required placeholder="City / Area" className="h-12 w-full rounded-xl border border-slate-200 px-4 focus:border-[#F97316] focus:outline-none" />
									</div>
								</div>

								<div className="space-y-2">
									<label className="font-medium text-[#0F172A]">How Many Workers? *</label>
									<input type="number" min="1" required placeholder="e.g., 10, 50, 100" className="h-12 w-full rounded-xl border border-slate-200 px-4 focus:border-[#F97316] focus:outline-none" />
								</div>

								<div className="space-y-3">
									<label className="font-medium text-[#0F172A]">What Skills Do You Need? (Select all)</label>
									<div className="flex flex-wrap gap-2">
										{skillOptions.map((skill) => (
											<button
												key={skill}
												type="button"
												onClick={() => toggleSkill(skill)}
												className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-200 ${selectedSkills.includes(skill) ? 'border-[#F97316] bg-[#F97316] text-white' : 'border-slate-200 bg-white text-[#64748B] hover:border-[#F97316] hover:text-[#F97316]'}`}
											>
												{skill}
											</button>
										))}
									</div>
								</div>

								<div className="space-y-2">
									<label htmlFor="message" className="font-medium text-[#0F172A]">Any Other Details?</label>
									<textarea id="message" rows={3} placeholder="Tell us more about your requirements..." className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[#F97316] focus:outline-none" />
								</div>

								<button type="submit" disabled={formState === 'submitting'} className="h-14 w-full rounded-xl bg-[#F97316] text-lg font-bold text-white shadow-xl shadow-[#F97316]/20 transition-all duration-300 hover:bg-[#EA580C] disabled:cursor-not-allowed disabled:opacity-70">
									{formState === 'submitting' ? 'Sending...' : 'Send Enquiry - Free'}
								</button>

								<p className="text-center text-sm text-[#64748B]">We will call you within 24 hours. Your information is safe with us.</p>
							</form>
						)}
					</div>

					<div>
						<div className="mb-8 rounded-3xl bg-[#0F172A] p-8">
							<h3 className="mb-6 text-2xl font-bold text-white">Need Workers Urgently?</h3>
							<p className="mb-8 text-white/70">Call us directly. We can arrange workers within 48 hours for urgent needs.</p>

							<div className="space-y-4">
								<a href="tel:+919876543210" className="flex items-center gap-4 rounded-xl bg-white/10 p-4 transition-colors hover:bg-white/20">
									<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F97316]">
										<Phone className="h-6 w-6 text-white" />
									</div>
									<div>
										<p className="text-lg font-bold text-white">+91 98765 43210</p>
										<p className="text-sm text-white/60">Call Now</p>
									</div>
								</a>

								<a href="mailto:skilled@tsplgroup.com" className="flex items-center gap-4 rounded-xl bg-white/10 p-4 transition-colors hover:bg-white/20">
									<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]">
										<Mail className="h-6 w-6 text-white" />
									</div>
									<div>
										<p className="font-bold text-white">skilled@tsplgroup.com</p>
										<p className="text-sm text-white/60">Email Us</p>
									</div>
								</a>
							</div>
						</div>

						<div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl">
							<h3 className="mb-6 text-xl font-bold text-[#0F172A]">Why Enquire With Us?</h3>
							<div className="space-y-4">
								{[
									{ icon: CheckCircle2, text: 'No charge for enquiry - FREE', color: '#22C55E' },
									{ icon: Phone, text: 'We call you back within 24 hours', color: '#F97316' },
									{ icon: Users, text: 'Get multiple worker options', color: '#2563EB' },
									{ icon: Building2, text: '10+ years trusted company', color: '#8B5CF6' },
								].map((item) => (
									<div key={item.text} className="flex items-center gap-3">
										<div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${item.color}15` }}>
											<item.icon className="h-5 w-5" style={{ color: item.color }} />
										</div>
										<span className="font-medium text-[#0F172A]">{item.text}</span>
									</div>
								))}
							</div>
						</div>

						<div className="mt-8 space-y-4">
							<h4 className="text-sm font-bold uppercase text-[#64748B]">Our Offices</h4>
							<div className="grid grid-cols-2 gap-4">
								{[
									{ city: 'Mumbai', area: 'Andheri East' },
									{ city: 'Pune', area: 'Kharadi' },
									{ city: 'Delhi', area: 'Connaught Place' },
									{ city: 'Bangalore', area: 'Whitefield' },
								].map((office) => (
									<div key={office.city} className="flex items-start gap-2 text-sm">
										<MapPin className="mt-0.5 h-4 w-4 text-[#F97316]" />
										<div>
											<p className="font-medium text-[#0F172A]">{office.city}</p>
											<p className="text-[#64748B]">{office.area}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default function SkilledPage() {
	return (
		<div className="min-h-screen bg-white text-slate-800">
			<Navbar />
			<main>
				<SkilledJobHero />
                <WhatIsSkilledJob />	
                <JobTypes />
                <Industries />
                <WhyChooseUs />
                <HowItWorks />													
				<Enquiry />
			</main>
			<Footer />
		</div>
	)
}
