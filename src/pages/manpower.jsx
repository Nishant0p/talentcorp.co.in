import {
	Phone,
	Mail,
	MapPin,
	Send,
	CheckCircle2,
	Building2,
	GraduationCap,
	Users,
	ArrowRight,
	Shield,
	MessageSquare,
	Search,
	UserCheck,
	Briefcase,
	Factory,
	Truck,
	ShoppingBag,
	Wrench,
	Heart,
	Wheat,
	Computer,
	Building,
	Clock,
	BadgeCheck,
	HeartHandshake,
	Headphones,
	HardHat,
	ClipboardList,
	Settings,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ServiceEnquirySection from '../components/ServiceEnquirySection'
import { getPageAsset, usePageAssets } from '../hooks/usePageAssets'

function ManpowerHero({ resolveAsset }) {
	return (
		<section className="relative flex h-[100svh] items-center overflow-hidden">
			<div className="absolute inset-0">
				<img src={resolveAsset('manpower.hero', '/skilled training tspl.jpeg').url} alt={resolveAsset('manpower.hero', '/skilled training tspl.jpeg', 'Manpower Supply').alt} className="h-full w-full object-cover" />
				<div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/80 to-[#0F172A]/60" />
			</div>

			<div className="absolute right-20 top-16 h-56 w-56 animate-pulse rounded-full bg-[#2563EB]/20 blur-3xl" />
			<div className="absolute bottom-16 left-1/4 h-72 w-72 animate-pulse rounded-full bg-[#F97316]/10 blur-3xl" style={{ animationDelay: '1s' }} />

			<div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
				<div className="max-w-2xl text-left">
					<h1 className="hero-text-reveal mb-5 text-4xl font-bold leading-tight text-white animate-fade-in sm:text-5xl lg:text-6xl">
						We Provide
						<span className="mt-2 block text-[#2563EB]">Right Workers</span>
						<span className="block text-white">For Your Business</span>
					</h1>

					<p className="hero-text-reveal-delay mb-8 max-w-xl text-lg leading-relaxed text-white/80 animate-fade-in-up">
						Need workers for your factory, office, or any work? We find good workers for you.
						<span className="font-semibold text-[#F97316]"> You focus on your business, we handle the hiring.</span>
					</p>

					<div className="mb-10 flex flex-col gap-4 animate-fade-in-up animation-delay-200 sm:flex-row">
						<a
							href="#enquiry"
							className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F97316] px-7 py-3.5 text-base font-bold text-white shadow-2xl shadow-[#F97316]/30 transition-all duration-300 hover:scale-105 hover:bg-[#EA580C] hover:shadow-[#F97316]/50"
						>
							Get Workers Now
							<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
						</a>
						<a
							href="tel:+919876543210"
							className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/5 px-7 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10"
						>
							Call: +91 98765 43210
						</a>
					</div>

					<div className="grid grid-cols-3 gap-4 animate-fade-in-up animation-delay-300 sm:gap-6">
						<div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
							<p className="text-3xl font-bold text-white">40,000+</p>
							<p className="text-sm text-white/60">Workers Placed</p>
						</div>
						<div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
							<p className="text-3xl font-bold text-[#2563EB]">20+</p>
							<p className="text-sm text-white/60">Industries Served</p>
						</div>
						<div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
							<p className="text-3xl font-bold text-[#F97316]">10+</p>
							<p className="text-sm text-white/60">Years Experience</p>
						</div>
					</div>
				</div>
			</div>

			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
				<div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-2">
					<div className="h-3 w-1 rounded-full bg-white/60 animate-pulse" />
				</div>
			</div>
		</section>
	)
}

function WhatIsManpower({ resolveAsset }) {
	const benefits = [
		'No need to search for workers yourself',
		'We handle all paperwork and compliance',
		'Workers are verified and trained',
		'Replace workers if not satisfied',
		'Save time and money on hiring',
	]

	return (
		<section className="relative overflow-hidden bg-white py-20 lg:py-28">
			<div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#2563EB]/5 blur-3xl" />
			<div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#F97316]/5 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="grid items-center gap-16 lg:grid-cols-2">
					<div className="relative animate-fade-in">
						<div className="relative overflow-hidden rounded-3xl shadow-2xl">
								<img src={resolveAsset('manpower.workers', 'https://images.pexels.com/photos/30223853/pexels-photo-30223853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2').url} alt={resolveAsset('manpower.workers', 'https://images.pexels.com/photos/30223853/pexels-photo-30223853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Workers at job').alt} className="h-[500px] w-full object-cover" />
							<div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent" />
						</div>

						<div className="absolute -bottom-6 -left-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
							<div className="flex items-center gap-3">
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]/10">
									<Users className="h-6 w-6 text-[#2563EB]" />
								</div>
								<div>
									<p className="text-2xl font-bold text-[#0F172A]">40K+</p>
									<p className="text-sm text-[#64748B]">Happy Workers</p>
								</div>
							</div>
						</div>

						<div className="absolute -right-6 -top-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-xl animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
							<div className="flex items-center gap-3">
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F97316]/10">
									<Building className="h-6 w-6 text-[#F97316]" />
								</div>
								<div>
									<p className="text-2xl font-bold text-[#0F172A]">400+</p>
									<p className="text-sm text-[#64748B]">Companies Trust Us</p>
								</div>
							</div>
						</div>
					</div>

					<div className="space-y-8 animate-fade-in-up">
						<div>
							<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-4 py-2">
								<Briefcase className="h-4 w-4 text-[#2563EB]" />
								<span className="text-sm font-bold text-[#2563EB]">WHAT WE DO</span>
							</div>

							<h2 className="text-4xl font-bold leading-tight text-[#0F172A] lg:text-5xl">What is Manpower Supply?</h2>
						</div>

						<div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6">
							<p className="mb-4 text-lg leading-relaxed text-[#334155]">
								<span className="font-bold text-[#0F172A]">In Simple Words:</span> When your company needs workers, you tell us what type of workers you need. We find good workers and send them to you.
							</p>

							<div className="mt-6 flex items-center justify-between rounded-xl bg-white p-4">
								<div className="text-center">
									<div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-[#2563EB]/10">
										<Building className="h-7 w-7 text-[#2563EB]" />
									</div>
									<p className="text-sm font-medium text-[#0F172A]">Your Company</p>
								</div>
								<div className="flex flex-1 items-center justify-center">
									<div className="mx-2 h-1 flex-1 rounded-full bg-gradient-to-r from-[#2563EB] to-[#F97316]" />
									<span className="rounded bg-slate-100 px-2 py-1 text-xs text-[#64748B]">TSPL</span>
									<div className="mx-2 h-1 flex-1 rounded-full bg-gradient-to-r from-[#F97316] to-[#22C55E]" />
								</div>
								<div className="text-center">
									<div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-[#22C55E]/10">
										<Users className="h-7 w-7 text-[#22C55E]" />
									</div>
									<p className="text-sm font-medium text-[#0F172A]">Workers</p>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<p className="text-lg font-bold text-[#0F172A]">Why Companies Choose Us:</p>
							{benefits.map((benefit, i) => (
								<div key={benefit} className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
									<CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#22C55E]" />
									<p className="text-[#334155]">{benefit}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

const workerCategories = [
	{
		title: 'Skilled Workers',
		description: 'Trained workers with specific skills',
		color: '#2563EB',
		workers: [
			{ icon: Wrench, name: 'Technicians', desc: 'Machine operators, electricians, welders' },
			{ icon: Settings, name: 'Operators', desc: 'CNC, lathe, milling machine operators' },
			{ icon: HardHat, name: 'Supervisors', desc: 'Line supervisors, shift in-charge' },
		],
	},
	{
		title: 'Semi-Skilled Workers',
		description: 'Workers with basic training',
		color: '#F97316',
		workers: [
			{ icon: ClipboardList, name: 'Assembly Workers', desc: 'Product assembly, packaging, quality check' },
			{ icon: Truck, name: 'Drivers', desc: 'Forklift, delivery, transport drivers' },
			{ icon: Building2, name: 'Maintenance', desc: 'Cleaning, upkeep, minor repairs' },
		],
	},
	{
		title: 'General Workers',
		description: 'Workers for basic tasks',
		color: '#22C55E',
		workers: [
			{ icon: HeartHandshake, name: 'Helpers', desc: 'Loading, unloading, material handling' },
			{ icon: Shield, name: 'Security', desc: 'Guards, watchmen, safety personnel' },
			{ icon: Building2, name: 'Housekeeping', desc: 'Cleaning staff, pantry boys' },
		],
	},
]

function WorkerTypes() {
	return (
		<section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-20 lg:py-28">
			<div className="absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#2563EB]/5 blur-3xl" />
			<div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#F97316]/5 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center animate-fade-in">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-4 py-2">
						<HardHat className="h-4 w-4 text-[#2563EB]" />
						<span className="text-sm font-bold text-[#2563EB]">TYPES OF WORKERS</span>
					</div>

					<h2 className="mb-6 text-4xl font-bold text-[#0F172A] lg:text-5xl">All Types of Workers Available</h2>

					<p className="mx-auto max-w-2xl text-lg text-[#64748B]">Tell us what work you need done. We have workers for all skill levels - from trained experts to helpers for basic work.</p>
				</div>

				<div className="grid gap-8 lg:grid-cols-3">
					{workerCategories.map((category, i) => (
						<div
							key={category.title}
							className="group animate-fade-in-up rounded-3xl border border-slate-100 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
							style={{ animationDelay: `${i * 150}ms` }}
						>
							<div className="mb-6 flex items-center gap-4 border-b border-slate-100 pb-6">
								<div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: `${category.color}15` }}>
									<div className="h-8 w-8 rounded-lg" style={{ backgroundColor: category.color }} />
								</div>
								<div>
									<h3 className="text-xl font-bold text-[#0F172A]">{category.title}</h3>
									<p className="text-sm text-[#64748B]">{category.description}</p>
								</div>
							</div>

							<div className="space-y-5">
								{category.workers.map((worker) => (
									<div key={worker.name} className="flex items-start gap-4 rounded-xl bg-slate-50 p-4 transition-colors duration-200 hover:bg-slate-100">
										<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${category.color}15` }}>
											<worker.icon className="h-5 w-5" style={{ color: category.color }} />
										</div>
										<div>
											<p className="font-semibold text-[#0F172A]">{worker.name}</p>
											<p className="text-sm text-[#64748B]">{worker.desc}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				<div className="mt-16 rounded-3xl border border-[#2563EB]/10 bg-[#2563EB]/5 p-8 animate-fade-in-up animation-delay-500">
					<div className="flex flex-col items-center gap-8 lg:flex-row">
						<div className="flex-1">
							<h3 className="mb-3 text-2xl font-bold text-[#0F172A]">Not Sure What Type You Need?</h3>
							<p className="text-[#64748B]">Just tell us what work needs to be done. Our team will suggest the right type of workers for your job. We make it simple for you!</p>
						</div>
						<a href="#enquiry" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#F97316] px-8 py-4 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-[#EA580C]">
							Get Free Advice
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}

const industryCards = [
	{ icon: Factory, name: 'Manufacturing', description: 'Factories, Assembly Lines, Production Units', color: '#2563EB' },
	{ icon: Building2, name: 'Construction', description: 'Buildings, Roads, Infrastructure Projects', color: '#F97316' },
	{ icon: Truck, name: 'Logistics', description: 'Warehouses, Delivery, Transportation', color: '#2563EB' },
	{ icon: ShoppingBag, name: 'Retail', description: 'Stores, Malls, Supermarkets', color: '#F97316' },
	{ icon: Wrench, name: 'Automobile', description: 'Car Plants, Service Centers, Dealerships', color: '#2563EB' },
	{ icon: Heart, name: 'Healthcare', description: 'Hospitals, Clinics, Medical Facilities', color: '#F97316' },
	{ icon: Wheat, name: 'Agriculture', description: 'Farms, Food Processing, Packaging', color: '#2563EB' },
	{ icon: Computer, name: 'IT & BPO', description: 'Tech Parks, Call Centers, Data Entry', color: '#F97316' },
]

function Industries() {
	return (
		<section className="relative overflow-hidden bg-[#0F172A] py-20 lg:py-28">
			<div className="absolute inset-0 opacity-10">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
						backgroundSize: '40px 40px',
					}}
				/>
			</div>

			<div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[#2563EB]/20 blur-3xl" />
			<div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#F97316]/10 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center animate-fade-in">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
						<Factory className="h-4 w-4 text-[#F97316]" />
						<span className="text-sm font-bold text-white">INDUSTRIES WE SERVE</span>
					</div>

					<h2 className="mb-6 text-4xl font-bold text-white lg:text-5xl">Workers For Every Industry</h2>

					<p className="mx-auto max-w-2xl text-lg text-white/70">No matter what your business does, we have workers ready for you. From factories to offices, we cover all types of work.</p>
				</div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{industryCards.map((industry, i) => (
						<div
							key={industry.name}
							className="group relative animate-fade-in-up rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/10"
							style={{ animationDelay: `${i * 100}ms` }}
						>
							<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${industry.color}20` }}>
								<industry.icon className="h-7 w-7" style={{ color: industry.color }} />
							</div>

							<h3 className="mb-2 text-xl font-bold text-white">{industry.name}</h3>
							<p className="text-sm text-white/60">{industry.description}</p>

							<div className="absolute bottom-0 left-0 h-1 w-0 rounded-b-2xl transition-all duration-300 group-hover:w-full" style={{ backgroundColor: industry.color }} />
						</div>
					))}
				</div>

				<div className="mt-16 text-center animate-fade-in-up animation-delay-500">
					<p className="mb-4 text-white/70">Do not see your industry? No problem!</p>
					<a href="#enquiry" className="inline-flex items-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-[#EA580C]">
						Tell Us Your Need
					</a>
				</div>
			</div>
		</section>
	)
}

const processSteps = [
	{
		number: '01',
		icon: MessageSquare,
		title: 'Tell Us Your Need',
		description: 'Call us or fill the form. Tell us how many workers you need and what work they will do.',
		color: '#2563EB',
	},
	{
		number: '02',
		icon: Search,
		title: 'We Find Workers',
		description: 'We search our database and find workers that match your requirements.',
		color: '#F97316',
	},
	{
		number: '03',
		icon: UserCheck,
		title: 'Verification Done',
		description: 'We verify documents, do background check, and prepare workers for your site.',
		color: '#2563EB',
	},
	{
		number: '04',
		icon: Briefcase,
		title: 'Workers Report',
		description: 'Workers arrive at your location ready to work. We handle all paperwork.',
		color: '#22C55E',
	},
]

function HowItWorks() {
	return (
		<section className="relative overflow-hidden bg-slate-50 py-20 lg:py-28">
			<div
				className="absolute inset-0 opacity-50"
				style={{
					backgroundImage: 'radial-gradient(circle at 2px 2px, #2563EB 0.5px, transparent 0)',
					backgroundSize: '30px 30px',
				}}
			/>

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center animate-fade-in">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-4 py-2">
						<span className="text-sm font-bold text-[#2563EB]">SIMPLE PROCESS</span>
					</div>

					<h2 className="mb-6 text-4xl font-bold text-[#0F172A] lg:text-5xl">How It Works</h2>

					<p className="mx-auto max-w-2xl text-lg text-[#64748B]">Getting workers is easy! Just 4 simple steps and workers will be at your workplace.</p>
				</div>

				<div className="relative">
					<div className="absolute left-[12%] right-[12%] top-24 hidden h-1 rounded-full bg-gradient-to-r from-[#2563EB] via-[#F97316] to-[#22C55E] lg:block" />

					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
						{processSteps.map((step, i) => (
							<div key={step.number} className="relative animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
								<div className="relative rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
									<div className="absolute -top-4 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full text-lg font-bold text-white shadow-lg" style={{ backgroundColor: step.color }}>
										{step.number}
									</div>

									<div className="mx-auto mb-6 mt-6 flex h-20 w-20 items-center justify-center rounded-2xl" style={{ backgroundColor: `${step.color}15` }}>
										<step.icon className="h-10 w-10" style={{ color: step.color }} />
									</div>

									<h3 className="mb-3 text-xl font-bold text-[#0F172A]">{step.title}</h3>
									<p className="text-sm leading-relaxed text-[#64748B]">{step.description}</p>
								</div>

								{i < processSteps.length - 1 && (
									<div className="absolute -right-4 top-24 z-10 hidden h-8 w-8 items-center justify-center rounded-full bg-white shadow-md lg:flex">
										<ArrowRight className="h-4 w-4 text-[#64748B]" />
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div className="mt-16 text-center animate-fade-in-up animation-delay-500">
					<div className="inline-flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-lg">
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#22C55E]/10">
							<span className="text-2xl font-bold text-[#22C55E]">24h</span>
						</div>
						<div className="text-left">
							<p className="font-bold text-[#0F172A]">Average Time to Get Workers</p>
							<p className="text-sm text-[#64748B]">For urgent needs, we can provide workers within 24 hours</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

const reasons = [
	{
		icon: Clock,
		title: 'Fast Hiring',
		description: 'Get workers within 24-72 hours. No long waiting.',
		highlight: '24-72 Hours',
	},
	{
		icon: BadgeCheck,
		title: 'Verified Workers',
		description: 'All workers are background checked and verified.',
		highlight: '100% Verified',
	},
	{
		icon: Shield,
		title: 'Full Compliance',
		description: 'We handle PF, ESI, and all legal requirements.',
		highlight: 'Legal & Safe',
	},
	{
		icon: Users,
		title: 'Large Database',
		description: 'Access to 1 Lakh+ workers across India.',
		highlight: '1 Lakh+ Workers',
	},
	{
		icon: HeartHandshake,
		title: 'Replacement Guarantee',
		description: 'Not happy with a worker? We replace for free.',
		highlight: 'Free Replace',
	},
	{
		icon: Headphones,
		title: '24/7 Support',
		description: 'Our team is always available to help you.',
		highlight: 'Always Available',
	},
]

function ManpowerWhyChooseUs({ resolveAsset }) {
	return (
		<section className="relative overflow-hidden bg-white py-20 lg:py-28">
			<div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#2563EB]/5 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="grid items-center gap-16 lg:grid-cols-2">
					<div className="space-y-8 animate-fade-in">
						<div>
							<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#22C55E]/20 bg-[#22C55E]/10 px-4 py-2">
								<CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
								<span className="text-sm font-bold text-[#22C55E]">WHY TSPL GROUP</span>
							</div>

							<h2 className="mb-6 text-4xl font-bold leading-tight text-[#0F172A] lg:text-5xl">
								Why Companies
								<span className="text-[#2563EB]"> Trust Us</span>
							</h2>

							<p className="text-lg text-[#64748B]">For 10+ years, we have helped 400+ companies find the right workers. Here is why they choose us:</p>
						</div>

						<div className="grid gap-4 sm:grid-cols-2">
							{reasons.map((reason, i) => (
								<div
									key={reason.title}
									className="group animate-fade-in-up rounded-2xl border border-transparent bg-slate-50 p-5 transition-all duration-300 hover:border-slate-200 hover:bg-white hover:shadow-lg"
									style={{ animationDelay: `${i * 100}ms` }}
								>
									<div className="flex items-start gap-4">
										<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]/10 transition-colors duration-300 group-hover:bg-[#2563EB]">
											<reason.icon className="h-6 w-6 text-[#2563EB] transition-colors group-hover:text-white" />
										</div>
										<div>
											<p className="mb-1 font-bold text-[#0F172A]">{reason.title}</p>
											<p className="mb-2 text-sm text-[#64748B]">{reason.description}</p>
											<span className="inline-block rounded-full bg-[#F97316]/10 px-2 py-1 text-xs font-bold text-[#F97316]">{reason.highlight}</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="relative animate-fade-in-right">
						<div className="relative overflow-hidden rounded-3xl shadow-2xl">
								<img src={resolveAsset('manpower.industries', '/training.jpeg').url} alt={resolveAsset('manpower.industries', '/training.jpeg', 'Industries we serve').alt} className="h-[600px] w-full object-cover" />
							<div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />

							<div className="absolute bottom-0 left-0 right-0 p-6">
								<div className="grid grid-cols-3 gap-4">
									<div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
										<p className="text-3xl font-bold text-white">10+</p>
										<p className="text-xs text-white/70">Years</p>
									</div>
									<div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
										<p className="text-3xl font-bold text-[#F97316]">400+</p>
										<p className="text-xs text-white/70">Clients</p>
									</div>
									<div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
										<p className="text-3xl font-bold text-[#2563EB]">20+</p>
										<p className="text-xs text-white/70">Cities</p>
									</div>
								</div>
							</div>
						</div>

						<div className="absolute -right-6 -top-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
							<div className="flex items-center gap-3">
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#22C55E]/10">
									<Shield className="h-6 w-6 text-[#22C55E]" />
								</div>
								<div>
									<p className="font-bold text-[#0F172A]">Trusted</p>
									<p className="text-xs text-[#64748B]">Since 2014</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function Enquiry() {
	return (
		<section className="px-8 pb-20 pt-2">
			<div className="mx-auto w-full max-w-6xl">
				<div className="flex flex-col items-center justify-between gap-10 rounded-3xl bg-gradient-to-r from-[#2d52b4] to-[#4083ff] p-8 shadow-lg md:flex-row md:p-12">
					<div className="flex-1">
						<h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">Start Your Journey Today</h2>
						<p className="mb-8 text-lg text-blue-100">Join thousands who transformed their careers through NATS.</p>

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
							<a href="tel:+919876543210" className="flex items-center gap-4 rounded-xl bg-white/15 p-4 text-white no-underline transition-colors hover:bg-white/25">
								<Phone className="h-5 w-5 text-blue-100" />
								<span className="font-medium">+91 98765 43210</span>
							</a>

							<a href="mailto:support@tsplgroup.com" className="flex items-center gap-4 rounded-xl bg-white/15 p-4 text-white no-underline transition-colors hover:bg-white/25">
								<Mail className="h-5 w-5 text-blue-100" />
								<span className="font-medium">support@tsplgroup.com</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default function ManpowerPage() {
	const pageAssets = usePageAssets()
	const resolveAsset = (key, fallbackUrl, fallbackAlt = '') => getPageAsset(pageAssets, key, fallbackUrl, fallbackAlt)

	return (
		<div className="min-h-screen bg-white text-slate-800">
			<Navbar />
			<main>
				<ManpowerHero resolveAsset={resolveAsset} />
				<WhatIsManpower resolveAsset={resolveAsset} />
                <Industries />
				<WorkerTypes />
				<ManpowerWhyChooseUs resolveAsset={resolveAsset} />
				<HowItWorks />		
				<ServiceEnquirySection serviceName="MANPOWER" />
			</main>
			<Footer />
		</div>
	)
}
