import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
	Shield,
	Wrench,
	Sparkles,
	Users,
	Calendar,
	CheckCircle2,
	Phone,
	Mail,
	MapPin,
	ArrowRight,
	Clock,
	BadgeCheck,
	HeartHandshake,
	HardHat,
	Settings,
	Droplets,
	Trash2,
	Wind,
	Leaf,
	Building2,
	Factory,
	Truck,
	ShoppingBag,
	Briefcase,
	UserCheck,
	Search,
	Cpu,
	Building,
	Pill,
	Package,
	MessageSquare,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ServiceEnquirySection from '../components/ServiceEnquirySection'
import { getPageAsset, usePageAssets } from '../hooks/usePageAssets'
import useSEO from '../hooks/useSEO'

const serviceCategories = [
	{
		id: 'security',
		label: 'Security Guards',
		icon: Shield,
		badge: 'Certified Protection',
		title: 'Professional Security Guard Services',
		description: 'We provide trained, police-verified security guards to safeguard corporate offices, factories, residential complexes, and events. Our security personnel are trained in threat detection, crowd control, and emergency protocols.',
		image: '/Security Service By Tspl.jpeg',
		accentColor: 'from-blue-600 to-indigo-600',
		glowColor: 'shadow-blue-500/20',
		textColor: 'text-blue-600',
		bgColor: 'bg-blue-50',
		features: [
			{ icon: BadgeCheck, title: 'Police Verified', desc: 'Strict background checks and police verification for every guard' },
			{ icon: Clock, title: '24/7 Monitoring', desc: 'Round-the-clock patrol and security surveillance' },
			{ icon: HardHat, title: 'Regular Drills', desc: 'Guards participate in mock emergency and fire drills' },
			{ icon: Shield, title: 'Armed & Unarmed', desc: 'Options for standard guards, supervisors, and bouncers' }
		],
		roles: [
			{ name: 'Office Security', desc: 'Guards for corporate offices, IT parks, and business centers' },
			{ name: 'Factory & Industrial Security', desc: 'Heavy protection for manufacturing plants and warehouses' },
			{ name: 'Residential Security', desc: 'Societies, apartments, and private bungalows' },
			{ name: 'Event Security', desc: 'Crowd management for weddings, parties, and corporate events' }
		]
	},
	{
		id: 'skilled',
		label: 'Skilled & Technical',
		icon: Wrench,
		badge: 'Certified Professionals',
		title: 'Skilled Industrial & Technical Staffing',
		description: 'Connecting you with certified technical workforce having ITI, Diploma, or specialized certifications. We reduce your training overheads by deploying personnel ready to handle complex machinery and specialized tasks.',
		image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
		accentColor: 'from-amber-500 to-orange-600',
		glowColor: 'shadow-orange-500/20',
		textColor: 'text-orange-600',
		bgColor: 'bg-orange-50',
		features: [
			{ icon: BadgeCheck, title: 'Certified Workers Only', desc: 'All staff carry valid ITI certificates or relevant diplomas' },
			{ icon: Settings, title: 'Machine Savvy', desc: 'Familiar with operating modern CNC, VMC, and lathe machines' },
			{ icon: HardHat, title: 'Safety Training', desc: 'Workers are fully briefed on industrial hazard and safety protocols' },
			{ icon: Clock, title: 'Immediate Onboarding', desc: 'Ready for quick deployment to match your manufacturing targets' }
		],
		roles: [
			{ name: 'Welders & Fitters', desc: 'Arc/MIG/TIG welding and precision structural assembly' },
			{ name: 'Electricians & Technicians', desc: 'Industrial wiring, panel work, and heavy machinery maintenance' },
			{ name: 'CNC & Lathe Operators', desc: 'Operating advanced cutting, shaping, and milling machines' },
			{ name: 'Quality Inspectors & Supervisors', desc: 'Ensuring production line quality check compliance' }
		]
	},
	{
		id: 'housekeeping',
		label: 'Housekeeping',
		icon: Sparkles,
		badge: 'Spotless Maintenance',
		title: 'Professional Housekeeping & Cleaning Solutions',
		description: 'Trained, hygienic, and professional housekeeping staff to keep your commercial premises, factories, hospitals, and retail stores clean, sanitized, and presentable. We utilize eco-friendly materials and standard SOPs.',
		image: '/houskeeping deplyment.jpeg',
		accentColor: 'from-emerald-500 to-teal-600',
		glowColor: 'shadow-emerald-500/20',
		textColor: 'text-emerald-600',
		bgColor: 'bg-emerald-50',
		features: [
			{ icon: Sparkles, title: 'Standard SOPs', desc: 'Detailed cleaning checklists customized for your workplace layout' },
			{ icon: Droplets, title: 'Hygienic Sanitization', desc: 'Deep disinfection protocols for washrooms and common areas' },
			{ icon: Leaf, title: 'Eco-Friendly Practices', desc: 'Using certified, non-toxic cleaning chemicals and reagents' },
			{ icon: BadgeCheck, title: 'Groomed Staff', desc: 'Polite, well-mannered staff wearing clean, standard uniforms' }
		],
		roles: [
			{ name: 'Commercial Cleaning', desc: 'Daily cleaning of desks, windows, glass panels, and cubicles' },
			{ name: 'Industrial Housekeeping', desc: 'Handling waste disposal and floor cleaning in factories' },
			{ name: 'Hospital Sanitization', desc: 'Sanitary disinfection following strict clinical hygiene standards' },
			{ name: 'Facility Upkeep & Pantries', desc: 'Dedicated pantry staff and cafeteria maintenance' }
		]
	},
	{
		id: 'manpower',
		label: 'General Manpower',
		icon: Users,
		badge: 'Bulk Staffing',
		title: 'General & Semi-Skilled Manpower Supply',
		description: 'Bulk manpower sourcing and management for warehouse operations, logistics, assembly lines, and general labor requirements. We handle high-volume demands with end-to-end recruitment and payroll administration.',
		image: '/skilled training tspl.jpeg',
		accentColor: 'from-rose-500 to-pink-600',
		glowColor: 'shadow-pink-500/20',
		textColor: 'text-rose-600',
		bgColor: 'bg-rose-50',
		features: [
			{ icon: Users, title: 'Bulk Mobilization', desc: 'Ability to deploy 100+ workers within 72 hours for peak workloads' },
			{ icon: HeartHandshake, title: 'Replacement Guarantee', desc: 'Hassle-free replacement of workers if client is unsatisfied' },
			{ icon: BadgeCheck, title: 'HR & Payroll Handled', desc: 'We take care of onboarding, attendance, salaries, and statutory files' },
			{ icon: Truck, title: 'Logistics Ready', desc: 'Trained in material handling, packing, loading, and unloading' }
		],
		roles: [
			{ name: 'Assembly Workers', desc: 'General helpers for production and sorting lines' },
			{ name: 'Warehouse Helpers', desc: 'Packing, scanning, sorting, and inventory loading personnel' },
			{ name: 'Logistics Assistants', desc: 'Drivers, forklift operators, and delivery crew' },
			{ name: 'General Labor', desc: 'Unskilled assistants for construction sites and outdoor facilities' }
		]
	},
	{
		id: 'contract',
		label: 'Contract Staffing',
		icon: Calendar,
		badge: 'Flexible Models',
		title: 'Flexible Contract Staffing Solutions',
		description: 'Scale your workforce dynamically based on business seasonality and project deadlines. Avoid permanent liability while accessing a ready pool of verified talent. We handle all compliance, PF, ESIC, and legal paperwork.',
		image: '/WhatsApp Image 2026-04-16 at 10.53.25 (1).jpeg',
		accentColor: 'from-violet-600 to-purple-600',
		glowColor: 'shadow-purple-500/20',
		textColor: 'text-purple-600',
		bgColor: 'bg-purple-50',
		features: [
			{ icon: Shield, title: 'Zero Legal Liability', desc: 'Workers remain on TSPL payroll, eliminating employment risks' },
			{ icon: Calendar, title: 'Short & Long Term', desc: 'Contracts spanning from 1 month for events up to 2 years' },
			{ icon: CheckCircle2, title: '100% Statutory Compliance', desc: 'Accurate processing of PF, ESIC, LWF, and minimum wage bills' },
			{ icon: HeartHandshake, title: 'Scaling Agility', desc: 'Quick scaling down when seasonal demand contracts' }
		],
		roles: [
			{ name: 'Short-Term Staffing', desc: 'Covering seasonal peaks, festivals, or sudden project spikes' },
			{ name: 'Long-Term Outsource', desc: 'Outsourcing non-core departments completely to TSPL' },
			{ name: 'Project-Based Teams', desc: 'Fulfillment of custom teams with designated shift supervisors' },
			{ name: 'Fixed-Term Contracts (FTC)', desc: 'Pre-defined period staffing conforming to industrial regulations' }
		]
	}
]

const industries = [
	{ name: 'Manufacturing', icon: Factory, desc: 'Production lines, helpers, shop floor workers' },
	{ name: 'Automobile', icon: Users, desc: 'Assembly operators, CNC machinists, welders' },
	{ name: 'Pharma & Chemicals', icon: Pill, desc: 'QC inspectors, packing staff, cleanroom cleaners' },
	{ name: 'FMCG', icon: Package, desc: 'Warehouse crew, packaging helpers, loaders' },
	{ name: 'Engineering', icon: Wrench, desc: 'Technicians, fitters, safety supervisors' },
	{ name: 'Infrastructure', icon: Building2, desc: 'Masons, electricians, general labor' },
	{ name: 'Logistics & Warehousing', icon: Truck, desc: 'Forklift operators, scanners, dispatch helpers' },
	{ name: 'IT Parks & Commercial', icon: Cpu, desc: 'Corporate guards, facility housekeepers, pantry boys' }
]

const processSteps = [
	{
		number: '01',
		icon: MessageSquare,
		title: 'Share Requirements',
		desc: 'Tell us the role, skills needed, count of workers, and shift timings.'
	},
	{
		number: '02',
		icon: Search,
		title: 'Sourcing & Screening',
		desc: 'We filter matching profiles from our verified internal database of over 1 Lakh+ workers.'
	},
	{
		number: '03',
		icon: UserCheck,
		title: 'Client Verification',
		desc: 'You interview or review profiles. We complete background and police checks.'
	},
	{
		number: '04',
		icon: Briefcase,
		title: 'Deployment & Support',
		desc: 'Workers report to your site. We manage attendance, payroll, and compliance.'
	}
]

const coreStrengths = [
	{
		icon: Shield,
		title: '100% Statutory Compliance',
		desc: 'Zero legal risk for clients. We handle PF, ESIC, CLRA License, LWF, and Minimum Wages compliance transparently.'
	},
	{
		icon: BadgeCheck,
		title: 'Police Verified Database',
		desc: 'Every guard and worker deployed undergoes Aadhaar verification, reference checks, and local police verification.'
	},
	{
		icon: HeartHandshake,
		title: 'Free Replacement Guarantee',
		desc: 'If any worker leaves or their performance is not satisfactory, we deploy a trained replacement within 24-48 hours.'
	},
	{
		icon: Users,
		title: 'Dedicated Account Managers',
		desc: 'A single point of contact for attendance billing, worker query resolution, and emergency manpower replacements.'
	}
]

export default function LabourStaffingPage() {
	useSEO({
		title: 'Labour Staffing & Contract Manpower Services - TSPL Group',
		description: 'TSPL Group provides certified contract staffing, verified security guards, professional housekeeping, and industrial general manpower across India.',
		keywords: 'Labour Staffing, Contract Labour, Security Guards, Housekeeping Services, Manpower Supplier, Industrial Staffing, General Labor, TSPL Group'
	})

	const pageAssets = usePageAssets()
	const resolveAsset = (key, fallbackUrl, fallbackAlt = '') => getPageAsset(pageAssets, key, fallbackUrl, fallbackAlt)

	const [activeTab, setActiveTab] = useState('security')
	const [activeCategory, setActiveCategory] = useState(serviceCategories[0])

	useEffect(() => {
		const found = serviceCategories.find((cat) => cat.id === activeTab)
		if (found) {
			setActiveCategory(found)
		}
	}, [activeTab])

	return (
		<div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
			<Navbar isGlobal />

			{/* Hero Section (Dark theme hero like the other service pages) */}
			<section className="relative flex min-h-[100svh] lg:min-h-[90vh] items-center overflow-hidden pt-28 pb-16">
				<div className="absolute inset-0 z-0">
					<img
						src={resolveAsset('labour.hero', 'https://images.pexels.com/photos/30223853/pexels-photo-30223853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2').url}
						alt="Labour Staffing"
						className="h-full w-full object-cover opacity-30"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
					<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
				</div>

				<div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
					<div className="max-w-3xl">
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 backdrop-blur-md">
							<Users className="h-4 w-4 text-blue-400" />
							<span className="text-sm font-semibold text-blue-200">ISO 9001:2015 & Govt. Registered Staffing Agency</span>
						</div>

						<h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
							End-to-End <br />
							<span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
								Labour Staffing
							</span>
						</h1>

						<p className="mb-8 text-xl leading-relaxed text-slate-300">
							Outsource your manpower hassles to TSPL Group. We provide verified security guards, skilled technical workers, housekeeping teams, and general helpers on flexible contracts.
						</p>

						<div className="mb-10 flex flex-wrap gap-4">
							<a
								href="#enquiry"
								className="inline-flex items-center justify-center rounded-xl bg-[#F97316] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-[#F97316]/30 transition-all duration-300 hover:scale-105 hover:bg-[#EA580C]"
							>
								Request Labour Today
								<ArrowRight className="ml-2 h-5 w-5" />
							</a>
							<a
								href="tel:+917397971322"
								className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 px-8 py-4 text-lg font-bold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:bg-slate-800"
							>
								Call: +91 73979 71322
							</a>
						</div>

						{/* Quick stats grid */}
						<div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-8 sm:grid-cols-4 sm:gap-6">
							{[
								{ num: '40,000+', label: 'Workers Placed' },
								{ num: '450+', label: 'Happy Companies' },
								{ num: '100%', label: 'Legal Compliance' },
								{ num: '24-48h', label: 'Turnaround Time' }
							].map((stat) => (
								<div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
									<p className="text-3xl font-extrabold text-[#F97316]">{stat.num}</p>
									<p className="mt-1 text-white/70 text-sm">{stat.label}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Interactive Showcase Section (Light Background) */}
			<section className="relative bg-slate-50 py-12 sm:py-20 lg:py-28">
				<div className="absolute inset-0 pointer-events-none opacity-20">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: 'radial-gradient(circle at 2px 2px, #475569 1px, transparent 0)',
							backgroundSize: '32px 32px'
						}}
					/>
				</div>

				<div className="relative mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mb-16 text-center">
						<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-orange-600">
							<HardHat className="h-4 w-4" />
							<span className="text-sm font-bold uppercase tracking-wider">Our Staffing Verticals</span>
						</div>
						<h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
							Explore Our Workforce Services
						</h2>
						<p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
							Select a service vertical below to view roles, features, and contract flexibility.
						</p>
					</div>

					{/* Navigation tabs */}
					<div className="mb-12 flex flex-wrap justify-center gap-3">
						{serviceCategories.map((cat) => {
							const TabIcon = cat.icon
							const isSelected = activeTab === cat.id
							return (
								<button
									key={cat.id}
									onClick={() => setActiveTab(cat.id)}
									className={`flex items-center gap-3 rounded-2xl px-6 py-4 font-bold transition-all duration-300 ${
										isSelected
											? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20 scale-105'
											: 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
									}`}
								>
									<TabIcon className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
									{cat.label}
								</button>
							)
						})}
					</div>

					{/* Animated Content Showcase */}
					<div className="relative min-h-[500px]">
						<AnimatePresence mode="wait">
							<motion.div
								key={activeCategory.id}
								initial={{ opacity: 0, y: 15 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -15 }}
								transition={{ duration: 0.35 }}
								className="grid items-stretch gap-12 lg:grid-cols-12"
							>
								{/* Left details */}
								<div className="space-y-8 lg:col-span-7">
									<div>
										<div className={`mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${activeCategory.bgColor} ${activeCategory.textColor}`}>
											{activeCategory.badge}
										</div>
										<h3 className="text-3xl font-bold text-slate-900 sm:text-4xl">
											{activeCategory.title}
										</h3>
										<p className="mt-4 text-lg leading-relaxed text-slate-600">
											{activeCategory.description}
										</p>
									</div>

									{/* Roles list */}
									<div>
										<h4 className="mb-4 text-lg font-bold text-slate-900">Common Roles Deployed</h4>
										<div className="grid gap-4 sm:grid-cols-2">
											{activeCategory.roles.map((role) => (
												<div key={role.name} className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-blue-500/30 shadow-sm">
													<p className="font-semibold text-slate-900">{role.name}</p>
													<p className="mt-1 text-sm text-slate-600">{role.desc}</p>
												</div>
											))}
										</div>
									</div>

									{/* Features bullet checklist */}
									<div>
										<h4 className="mb-4 text-lg font-bold text-slate-900">Service Safeguards &amp; Features</h4>
										<div className="grid gap-4 sm:grid-cols-2">
											{activeCategory.features.map((feat) => {
												const FeatIcon = feat.icon
												return (
													<div key={feat.title} className="flex gap-4">
														<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
															<FeatIcon className="h-5 w-5 text-blue-600" />
														</div>
														<div>
															<p className="font-semibold text-slate-900">{feat.title}</p>
															<p className="text-xs text-slate-600 mt-0.5">{feat.desc}</p>
														</div>
													</div>
												)
											})}
										</div>
									</div>
								</div>

								{/* Right image/badge card */}
								<div className="relative lg:col-span-5 flex items-center">
									<div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl">
										<div className="relative aspect-square overflow-hidden rounded-2xl">
											<img
												src={resolveAsset(`labour.${activeCategory.id}`, activeCategory.image).url}
												alt={activeCategory.title}
												className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
											<div className="absolute bottom-6 left-6 right-6">
												<div className="inline-flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 backdrop-blur-md shadow">
													<CheckCircle2 className="h-4 w-4 text-blue-600" />
													<span className="text-sm font-bold text-slate-900">Full TSPL Assurance</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</section>

			{/* Core Strengths / Compliance Section (White Background) */}
			<section className="relative bg-white py-12 sm:py-20 lg:py-28">
				<div className="relative mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mb-16 text-center">
						<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-blue-600">
							<Shield className="h-4 w-4" />
							<span className="text-sm font-bold uppercase tracking-wider">Risk-Free Staffing</span>
						</div>
						<h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
							Why Corporate Clients Trust TSPL
						</h2>
						<p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
							We take absolute responsibility of regulatory compliances, candidate verifications, and onboarding checks.
						</p>
					</div>

					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
						{coreStrengths.map((str, index) => {
							const StrIcon = str.icon
							return (
								<div
									key={str.title}
									className="group relative rounded-3xl border border-slate-100 bg-slate-50 p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/30 hover:bg-white hover:shadow-xl"
								>
									<div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 transition-colors group-hover:bg-blue-600">
										<StrIcon className="h-7 w-7 text-blue-600 transition-colors group-hover:text-white" />
									</div>
									<h3 className="mb-3 text-xl font-bold text-slate-900">{str.title}</h3>
									<p className="leading-relaxed text-slate-600">{str.desc}</p>
								</div>
							)
						})}
					</div>
				</div>
			</section>

			{/* Industries We Serve (Slate 50 Background) */}
			<section className="relative bg-slate-50 py-12 sm:py-20 lg:py-28">
				<div className="relative mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mb-16 text-center">
						<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-orange-600">
							<Factory className="h-4 w-4" />
							<span className="text-sm font-bold uppercase tracking-wider">Diverse Sectors</span>
						</div>
						<h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
							Workers for Every Industrial Segment
						</h2>
						<p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
							We supply custom labor configurations complying with specific sector guidelines.
						</p>
					</div>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{industries.map((ind) => {
							const IndIcon = ind.icon
							return (
								<div
									key={ind.name}
									className="group relative rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-blue-500/50 shadow-sm"
								>
									<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 group-hover:bg-blue-600/10">
										<IndIcon className="h-6 w-6 text-blue-600" />
									</div>
									<h3 className="text-lg font-bold text-slate-900">{ind.name}</h3>
									<p className="mt-2 text-sm text-slate-600">{ind.desc}</p>
								</div>
							)
						})}
					</div>
				</div>
			</section>

			{/* Hiring Process (White Background) */}
			<section className="relative bg-white py-12 sm:py-20 lg:py-28">
				<div className="relative mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mb-16 text-center">
						<h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
							Our Simple Deployment Process
						</h2>
						<p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
							Get verified personnel deployed to your location in 4 structured phases.
						</p>
					</div>

					<div className="relative">
						{/* Connecting line */}
						<div className="absolute left-[12%] right-[12%] top-24 hidden h-0.5 bg-slate-200 lg:block" />

						<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
							{processSteps.map((step, idx) => {
								const StepIcon = step.icon
								return (
									<div key={step.number} className="relative text-center">
										<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 text-slate-900 shadow-md transition-all duration-300 hover:border-blue-500 hover:bg-white">
											<StepIcon className="h-9 w-9 text-blue-600" />
										</div>
										<p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
											Step {step.number}
										</p>
										<h3 className="mt-2 text-xl font-bold text-slate-900">{step.title}</h3>
										<p className="mt-2 text-sm leading-relaxed text-slate-600 px-4">
											{step.desc}
										</p>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</section>

			{/* Custom Service Enquiry Form */}
			<ServiceEnquirySection serviceName="LABOUR STAFFING" />

			<Footer />
		</div>
	)
}
