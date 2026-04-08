import {
	Send,
	Phone,
	Mail,
	MapPin,
	CheckCircle,
	Building2,
	Users,
	Clock,
	ArrowRight,
	Sparkles,
	Shield,
	FileText,
	Search,
	UserCheck,
	Briefcase,
	Check,
	Droplets,
	Wind,
	Trash2,
	Leaf,
	ShieldCheck,
	Factory,
	Hotel,
	Hospital,
	ShoppingBag,
	Warehouse,
	Home,
	GraduationCap,
	BadgeCheck,
	RefreshCw,
	Headphones,
	DollarSign,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function HousekeepingHero() {
	return (
		<section className="relative min-h-[700px] overflow-hidden pb-20 pt-32">
			<div className="absolute inset-0">
				<img src="/images/housekeeping-hero.jpg" alt="Professional housekeeping team" className="h-full w-full object-cover" />
				<div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-[#0F172A]/60" />
			</div>

			<div className="absolute right-20 top-40 h-4 w-4 animate-pulse rounded-full bg-white opacity-60" />
			<div className="absolute right-40 top-60 h-3 w-3 animate-pulse rounded-full bg-[#2563EB] opacity-80" style={{ animationDelay: '0.5s' }} />
			<div className="absolute bottom-40 right-32 h-2 w-2 animate-pulse rounded-full bg-white opacity-50" style={{ animationDelay: '1s' }} />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="max-w-3xl">
					<div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm animate-fade-in">
						<Sparkles className="h-4 w-4 text-[#F97316]" />
						<span className="text-sm font-medium text-white">Professional Cleaning Solutions</span>
					</div>

					<h1 className="mb-6 text-4xl font-bold leading-tight text-white animate-fade-in sm:text-5xl lg:text-6xl">
						Keep Your Space
						<span className="mt-2 block text-[#2563EB]">Clean &amp; Healthy</span>
					</h1>

					<p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/80 animate-fade-in-up lg:text-xl">
						We provide trained housekeeping staff to keep your office, factory, hospital or hotel spotless. Our workers are verified, skilled, and ready to serve.
					</p>

					<div className="mb-10 flex flex-wrap gap-6 animate-fade-in-up animation-delay-100">
						<div className="flex items-center gap-2 text-white/90">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB]/20">
								<Shield className="h-5 w-5 text-[#2563EB]" />
							</div>
							<span className="font-medium">Verified Staff</span>
						</div>
						<div className="flex items-center gap-2 text-white/90">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#22C55E]/20">
								<Sparkles className="h-5 w-5 text-[#22C55E]" />
							</div>
							<span className="font-medium">Trained Workers</span>
						</div>
						<div className="flex items-center gap-2 text-white/90">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F97316]/20">
								<Clock className="h-5 w-5 text-[#F97316]" />
							</div>
							<span className="font-medium">24/7 Service</span>
						</div>
					</div>

					<div className="flex flex-col gap-4 animate-fade-in-up animation-delay-200 sm:flex-row">
						<a
							href="#enquiry"
							className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F97316] px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-[#F97316]/30 transition-all duration-300 hover:scale-105 hover:bg-[#EA580C] hover:shadow-[#F97316]/50"
						>
							Get Housekeeping Staff
							<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
						</a>
						<a
							href="tel:+919876543210"
							className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10"
						>
							Call: +91 98765 43210
						</a>
					</div>

					<div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-10 animate-fade-in-up animation-delay-300">
						<div>
							<p className="text-3xl font-bold text-white lg:text-4xl">10,000+</p>
							<p className="mt-1 text-white/60">Staff Deployed</p>
						</div>
						<div>
							<p className="text-3xl font-bold text-[#2563EB] lg:text-4xl">500+</p>
							<p className="mt-1 text-white/60">Happy Clients</p>
						</div>
						<div>
							<p className="text-3xl font-bold text-white lg:text-4xl">15+</p>
							<p className="mt-1 text-white/60">Cities Covered</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

const processSteps = [
	{
		number: '01',
		icon: FileText,
		title: 'Tell Us Your Needs',
		description: 'Fill the form or call us. Tell us how many staff you need and for what work.',
		color: '#2563EB',
	},
	{
		number: '02',
		icon: Search,
		title: 'We Find Right Staff',
		description: 'We search our database and find workers that match your requirements.',
		color: '#F97316',
	},
	{
		number: '03',
		icon: UserCheck,
		title: 'Verification & Training',
		description: 'Selected workers are verified and given training specific to your needs.',
		color: '#22C55E',
	},
	{
		number: '04',
		icon: Briefcase,
		title: 'Staff Reports to Work',
		description: 'Your housekeeping team arrives at your location ready to start work.',
		color: '#2563EB',
	},
]

function OurProcess() {
	return (
		<section className="relative overflow-hidden bg-white py-20 lg:py-28">
			<div className="absolute left-0 top-1/2 h-1 w-full bg-gradient-to-r from-transparent via-[#2563EB]/10 to-transparent" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center animate-fade-in">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F97316]/20 bg-[#F97316]/10 px-4 py-2">
						<span className="text-sm font-bold text-[#F97316]">HOW IT WORKS</span>
					</div>
					<h2 className="mb-4 text-4xl font-bold text-[#0F172A] lg:text-5xl">Getting Started is Easy</h2>
					<p className="mx-auto max-w-2xl text-lg text-[#64748B]">Just 4 simple steps to get trained housekeeping staff at your location</p>
				</div>

				<div className="relative">
					<div className="absolute left-[10%] right-[10%] top-24 hidden h-1 rounded-full bg-gradient-to-r from-[#2563EB] via-[#F97316] to-[#22C55E] lg:block" />

					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
						{processSteps.map((step, i) => (
							<div key={step.number} className="group relative animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
								<div
									className="absolute -top-4 left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full text-lg font-bold text-white shadow-lg transition-transform group-hover:scale-110"
									style={{ backgroundColor: step.color }}
								>
									{step.number}
								</div>

								<div className="rounded-2xl border-2 border-slate-100 bg-slate-50 px-6 pb-8 pt-10 text-center transition-all duration-300 group-hover:-translate-y-2 group-hover:border-slate-200 group-hover:shadow-xl">
									<div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110" style={{ backgroundColor: `${step.color}15` }}>
										<step.icon className="h-8 w-8" style={{ color: step.color }} />
									</div>

									<h3 className="mb-3 text-xl font-bold text-[#0F172A]">{step.title}</h3>
									<p className="text-sm leading-relaxed text-[#64748B]">{step.description}</p>
								</div>

								{i < processSteps.length - 1 && (
									<div className="absolute -right-4 top-24 z-20 hidden lg:block">
										<svg className="h-8 w-8 text-[#64748B]/30" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
										</svg>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div className="mt-16 text-center animate-fade-in-up animation-delay-400">
					<div className="inline-flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-r from-[#DBEAFE] to-[#FEF3C7] p-6 sm:flex-row">
						<p className="text-lg font-semibold text-[#0F172A]">Need staff urgently? We can deploy within 48 hours!</p>
						<a href="tel:+919876543210" className="rounded-xl bg-[#F97316] px-6 py-3 font-bold text-white shadow-lg shadow-[#F97316]/30 transition-all duration-300 hover:scale-105 hover:bg-[#EA580C]">
							Call Now
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}

const services = [
	{
		icon: Sparkles,
		title: 'Floor Cleaning',
		description: 'Mopping, sweeping, scrubbing and polishing all types of floors',
	},
	{
		icon: Droplets,
		title: 'Washroom Cleaning',
		description: 'Deep cleaning and sanitization of toilets and bathrooms',
	},
	{
		icon: Wind,
		title: 'Dusting & Wiping',
		description: 'Dust removal from furniture, windows, desks and surfaces',
	},
	{
		icon: Trash2,
		title: 'Waste Management',
		description: 'Proper collection, segregation and disposal of waste',
	},
	{
		icon: Leaf,
		title: 'Garden Maintenance',
		description: 'Plant care, lawn mowing and outdoor area cleaning',
	},
	{
		icon: ShieldCheck,
		title: 'Sanitization',
		description: 'Disinfection and germ-free cleaning for health safety',
	},
]

function OurServices() {
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
				<div className="grid items-center gap-16 lg:grid-cols-2">
					<div className="relative animate-fade-in-left">
						<div className="relative overflow-hidden rounded-3xl shadow-2xl">
							<img src="/images/housekeeping-services.jpg" alt="Housekeeping services" className="h-auto w-full object-cover" />
							<div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent" />
						</div>

						<div className="absolute -bottom-6 -right-6 rounded-2xl bg-white p-6 shadow-2xl animate-fade-in-up animation-delay-200">
							<div className="flex items-center gap-4">
								<div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#22C55E]/10">
									<Check className="h-7 w-7 text-[#22C55E]" />
								</div>
								<div>
									<p className="text-2xl font-bold text-[#0F172A]">100%</p>
									<p className="text-sm text-[#64748B]">Quality Assured</p>
								</div>
							</div>
						</div>
					</div>

					<div className="animate-fade-in-right">
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
							<span className="text-sm font-bold text-[#2563EB]">OUR SERVICES</span>
						</div>

						<h2 className="mb-6 text-4xl font-bold text-white lg:text-5xl">What Our Staff Can Do</h2>

						<p className="mb-10 text-lg text-white/70">Our trained housekeeping workers can handle all types of cleaning tasks. Here is what we offer:</p>

						<div className="grid gap-4 sm:grid-cols-2">
							{services.map((service, i) => (
								<div
									key={service.title}
									className="group flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-[#2563EB]/50 hover:bg-white/10"
									style={{ animationDelay: `${i * 100}ms` }}
								>
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2563EB]/20 transition-colors group-hover:bg-[#2563EB]">
										<service.icon className="h-5 w-5 text-[#2563EB] transition-colors group-hover:text-white" />
									</div>
									<div>
										<h3 className="mb-1 font-bold text-white">{service.title}</h3>
										<p className="text-sm text-white/60">{service.description}</p>
									</div>
								</div>
							))}
						</div>

						<div className="mt-10">
							<a href="#enquiry" className="inline-flex items-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 font-bold text-white shadow-lg shadow-[#F97316]/30 transition-all duration-300 hover:scale-105 hover:bg-[#EA580C]">
								Request Service Quote
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

const places = [
	{
		icon: Building2,
		title: 'Offices',
		description: 'Keep your workplace clean and professional for employees and visitors',
		color: '#2563EB',
	},
	{
		icon: Factory,
		title: 'Factories',
		description: 'Industrial cleaning for manufacturing plants and production units',
		color: '#F97316',
	},
	{
		icon: Hospital,
		title: 'Hospitals',
		description: 'Hygienic cleaning following healthcare standards and protocols',
		color: '#22C55E',
	},
	{
		icon: Hotel,
		title: 'Hotels',
		description: 'Premium housekeeping for rooms, lobbies and common areas',
		color: '#2563EB',
	},
	{
		icon: ShoppingBag,
		title: 'Malls & Retail',
		description: 'Keep shopping spaces clean and inviting for customers',
		color: '#F97316',
	},
	{
		icon: Warehouse,
		title: 'Warehouses',
		description: 'Large space cleaning for storage and logistics facilities',
		color: '#22C55E',
	},
	{
		icon: GraduationCap,
		title: 'Schools',
		description: 'Safe and clean environment for students and teachers',
		color: '#2563EB',
	},
	{
		icon: Home,
		title: 'Residential',
		description: 'Housekeeping staff for apartments and housing societies',
		color: '#F97316',
	},
]

function WhatWeClean() {
	return (
		<section className="relative overflow-hidden bg-white py-20 lg:py-28">
			<div className="absolute left-0 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#2563EB]/5 blur-3xl" />
			<div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/2 rounded-full bg-[#F97316]/5 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center animate-fade-in">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-4 py-2">
						<span className="text-sm font-bold text-[#2563EB]">WHERE WE WORK</span>
					</div>
					<h2 className="mb-4 text-4xl font-bold text-[#0F172A] lg:text-5xl">We Clean Every Type of Place</h2>
					<p className="mx-auto max-w-2xl text-lg text-[#64748B]">From small offices to large factories - we provide housekeeping staff for all types of spaces</p>
				</div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{places.map((place, i) => (
						<div
							key={place.title}
							className="group relative animate-fade-in-up rounded-2xl border-2 border-slate-100 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#2563EB]/30 hover:shadow-xl"
							style={{ animationDelay: `${i * 50}ms` }}
						>
							<div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: `${place.color}15` }}>
								<place.icon className="h-7 w-7" style={{ color: place.color }} />
							</div>

							<h3 className="mb-2 text-xl font-bold text-[#0F172A]">{place.title}</h3>
							<p className="text-sm leading-relaxed text-[#64748B]">{place.description}</p>

							<div className="absolute bottom-0 left-0 h-1 w-0 rounded-b-2xl transition-all duration-300 group-hover:w-full" style={{ backgroundColor: place.color }} />
						</div>
					))}
				</div>

				<div className="mt-16 rounded-3xl bg-gradient-to-r from-[#DBEAFE] to-[#FEF3C7] p-8 animate-fade-in-up">
					<div className="flex flex-col items-center justify-between gap-6 md:flex-row">
						<div className="flex items-center gap-4">
							<div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
								<Building2 className="h-8 w-8 text-[#2563EB]" />
							</div>
							<div>
								<h3 className="text-xl font-bold text-[#0F172A]">Not Sure What You Need?</h3>
								<p className="text-[#64748B]">Tell us about your space and we will suggest the right staff</p>
							</div>
						</div>
						<a href="#enquiry" className="rounded-xl bg-[#F97316] px-6 py-3 font-bold text-white shadow-lg shadow-[#F97316]/30 transition-all duration-300 hover:scale-105 hover:bg-[#EA580C]">
							Talk to Us
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}

const reasons = [
	{
		icon: UserCheck,
		title: 'Background Verified',
		description: 'All our staff go through police verification and background checks',
		color: '#2563EB',
	},
	{
		icon: BadgeCheck,
		title: 'Properly Trained',
		description: 'Workers are trained in cleaning methods, safety and customer service',
		color: '#22C55E',
	},
	{
		icon: Clock,
		title: 'Always On Time',
		description: 'Our staff report on time and complete work as scheduled',
		color: '#F97316',
	},
	{
		icon: RefreshCw,
		title: 'Quick Replacement',
		description: 'If any worker leaves, we provide replacement within 24 hours',
		color: '#2563EB',
	},
	{
		icon: Headphones,
		title: 'Supervisor Support',
		description: 'Dedicated supervisor to manage staff and handle your concerns',
		color: '#22C55E',
	},
	{
		icon: DollarSign,
		title: 'Fair Pricing',
		description: 'Competitive rates with no hidden charges - pay only for what you need',
		color: '#F97316',
	},
]

function WhyChooseUs() {
	return (
		<section className="relative overflow-hidden bg-slate-50 py-20 lg:py-28">
			<div className="absolute inset-0 opacity-30">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: 'radial-gradient(circle at 2px 2px, #2563EB 0.5px, transparent 0)',
						backgroundSize: '30px 30px',
					}}
				/>
			</div>

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center animate-fade-in">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#22C55E]/20 bg-[#22C55E]/10 px-4 py-2">
						<span className="text-sm font-bold text-[#22C55E]">WHY CHOOSE US</span>
					</div>
					<h2 className="mb-4 text-4xl font-bold text-[#0F172A] lg:text-5xl">We Make Cleaning Easy For You</h2>
					<p className="mx-auto max-w-2xl text-lg text-[#64748B]">Here is why companies trust TSPL Group for their housekeeping needs</p>
				</div>

				<div className="grid items-center gap-16 lg:grid-cols-2">
					<div className="grid gap-6 sm:grid-cols-2">
						{reasons.map((reason, i) => (
							<div
								key={reason.title}
								className="group relative animate-fade-in-up rounded-2xl border border-slate-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
								style={{ animationDelay: `${i * 100}ms` }}
							>
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110" style={{ backgroundColor: `${reason.color}15` }}>
									<reason.icon className="h-6 w-6" style={{ color: reason.color }} />
								</div>

								<h3 className="mb-2 text-lg font-bold text-[#0F172A]">{reason.title}</h3>
								<p className="text-sm leading-relaxed text-[#64748B]">{reason.description}</p>
							</div>
						))}
					</div>

					<div className="relative animate-fade-in-right">
						<div className="relative overflow-hidden rounded-3xl shadow-2xl">
							<img src="/images/housekeeping-staff.jpg" alt="Happy housekeeping staff" className="h-auto w-full object-cover" />
							<div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />

							<div className="absolute bottom-0 left-0 right-0 p-8">
								<div className="rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur-sm">
									<div className="mb-4 flex items-center gap-4">
										<div className="flex -space-x-3">
											{[1, 2, 3, 4].map((_, i) => (
												<div key={i} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#2563EB]">
													<span className="text-xs font-bold text-white">{String.fromCharCode(65 + i)}</span>
												</div>
											))}
										</div>
										<div>
											<p className="font-bold text-[#0F172A]">10,000+ Workers</p>
											<p className="text-sm text-[#64748B]">Ready to serve you</p>
										</div>
									</div>

									<div className="flex items-center gap-2">
										<div className="flex gap-1">
											{[1, 2, 3, 4, 5].map((star) => (
												<svg key={star} className="h-5 w-5 text-[#F97316]" fill="currentColor" viewBox="0 0 20 20">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
											))}
										</div>
										<span className="font-bold text-[#0F172A]">4.8/5</span>
										<span className="text-sm text-[#64748B]">Client Satisfaction</span>
									</div>
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

export default function HousekeepingPage() {
	return (
		<div className="min-h-screen bg-white text-slate-800">
			<Navbar />
			<main>
				<HousekeepingHero />
                <WhatWeClean />
				<OurServices />				
				<WhyChooseUs />
				<OurProcess />
				<Enquiry />
			</main>
			<Footer />
		</div>
	)
}
