import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
	ArrowRight,
	Briefcase,
	Building2,
	CheckCircle2,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Clock,
	Cpu,
	Factory,
	FileCheck,
	FileSearch,
	Handshake,
	Mail,
	Phone,
	Pill,
	Rocket,
	Shield,
	Star,
	TrendingUp,
	Truck,
	ShoppingCart,
	Users,
	Car,
	Plane,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const partnerLogos = [
	'Tata Steel',
	'Reliance Industries',
	'Adani Group',
	'Mahindra',
	'Infosys',
	'Wipro',
	'HCL Technologies',
	'Larsen & Toubro',
	'Bajaj Auto',
	'JSW Steel',
	'Godrej',
	'Asian Paints',
	'Hindustan Unilever',
	'ITC Limited',
	'Dabur',
	'Hero MotoCorp',
	'Maruti Suzuki',
	'Vedanta',
	'BHEL',
	'SAIL',
]

const services = [
	{
		icon: Users,
		title: 'Contract Staffing',
		description: 'Flexible workforce solutions with vetted professionals ready to deploy at scale.',
		image: '/happy-excited-executive-business-team-600nw-2424450635.jpg.webp',
		color: 'from-blue-500 to-cyan-500',
	},
	{
		icon: Briefcase,
		title: 'Skilled Job Work',
		description: 'Access specialized talent for technical and skilled operations across industries.',
		image: '/Gemini_Generated_Image_qskougqskougqsko.png',
		color: 'from-orange-500 to-amber-500',
	},
	{
		icon: Shield,
		title: 'Compliance Management',
		description: 'Stay compliant with labor laws and regulations with expert guidance and oversight.',
		image: '/happy-excited-executive-business-team-600nw-2424450635.jpg.webp',
		color: 'from-emerald-500 to-teal-500',
	},
	{
		icon: FileCheck,
		title: 'Payroll Processing',
		description: 'End-to-end payroll management with accurate, timely, and transparent disbursements.',
		image: '/Gemini_Generated_Image_qskougqskougqsko.png',
		color: 'from-purple-500 to-violet-500',
	},
	{
		icon: TrendingUp,
		title: 'Business Scaling',
		description: 'Strategic workforce planning to support your growth objectives and expansion cycles.',
		image: '/happy-excited-executive-business-team-600nw-2424450635.jpg.webp',
		color: 'from-rose-500 to-pink-500',
	},
	{
		icon: Clock,
		title: 'Rapid Deployment',
		description: 'Quick turnaround times with pre-screened candidates ready to start on demand.',
		image: '/Gemini_Generated_Image_qskougqskougqsko.png',
		color: 'from-indigo-500 to-blue-500',
	},
]

const industries = [
	{
		icon: Factory,
		name: 'Manufacturing',
		description: 'Skilled workforce for production lines and quality control',
		clients: '150+ clients',
		color: 'bg-blue-500',
	},
	{
		icon: Truck,
		name: 'Logistics',
		description: 'Warehouse operations and supply chain management',
		clients: '80+ clients',
		color: 'bg-orange-500',
	},
	{
		icon: ShoppingCart,
		name: 'Retail',
		description: 'Store operations and customer service teams',
		clients: '60+ clients',
		color: 'bg-emerald-500',
	},
	{
		icon: Building2,
		name: 'Construction',
		description: 'Skilled labor and project management support',
		clients: '45+ clients',
		color: 'bg-amber-500',
	},
	{
		icon: Cpu,
		name: 'Technology',
		description: 'IT professionals and tech support teams',
		clients: '35+ clients',
		color: 'bg-violet-500',
	},
	{
		icon: Pill,
		name: 'Pharmaceuticals',
		description: 'Compliance-trained staff for pharma operations',
		clients: '25+ clients',
		color: 'bg-rose-500',
	},
	{
		icon: Car,
		name: 'Automotive',
		description: 'Assembly line workers and quality inspectors',
		clients: '40+ clients',
		color: 'bg-cyan-500',
	},
	{
		icon: Plane,
		name: 'Aviation',
		description: 'Ground handling and maintenance crews',
		clients: '15+ clients',
		color: 'bg-indigo-500',
	},
]

const processSteps = [
	{
		number: '01',
		icon: FileSearch,
		title: 'Discovery & Analysis',
		description:
			'We analyze your workforce requirements, industry challenges, and business objectives to create a tailored solution.',
		image: '/happy-excited-executive-business-team-600nw-2424450635.jpg.webp',
	},
	{
		number: '02',
		icon: Users,
		title: 'Talent Sourcing',
		description:
			'Our team sources, screens, and shortlists candidates from our extensive database of pre-verified professionals.',
		image: '/Gemini_Generated_Image_qskougqskougqsko.png',
	},
	{
		number: '03',
		icon: Handshake,
		title: 'Seamless Onboarding',
		description:
			'Complete documentation, compliance verification, and smooth integration of workforce into your operations.',
		image: '/happy-excited-executive-business-team-600nw-2424450635.jpg.webp',
	},
	{
		number: '04',
		icon: Rocket,
		title: 'Deployment & Support',
		description:
			'Dedicated account management with continuous monitoring, performance tracking, and 24/7 support.',
		image: '/Gemini_Generated_Image_qskougqskougqsko.png',
	},
]

const stats = [
	{ value: 40000, suffix: '+', label: 'Workers Deployed', description: 'Across all industries' },
	{ value: 400, suffix: '+', label: 'Enterprise Clients', description: 'Fortune 500 companies' },
	{ value: 99, suffix: '%', label: 'Client Retention', description: 'Year over year' },
	{ value: 15, suffix: '+', label: 'Years Experience', description: 'In workforce solutions' },
]

const testimonials = [
	{
		quote:
			'TSPL Group transformed our workforce management. Their contract staffing solutions helped us scale operations while maintaining quality standards.',
		author: 'Rajesh Kumar',
		role: 'VP Operations',
		company: 'TechManufacture Pvt Ltd',
		metric: '300% scale-up',
		rating: 5,
	},
	{
		quote:
			'The compliance management alone saved us countless hours. Their team understands B2B requirements and delivers consistently.',
		author: 'Priya Sharma',
		role: 'HR Director',
		company: 'Global Logistics Inc',
		metric: '40% time saved',
		rating: 5,
	},
	{
		quote:
			'Quick turnaround, quality workforce, and exceptional support. TSPL has been instrumental in our expansion across new locations.',
		author: 'Amit Patel',
		role: 'CEO',
		company: 'Retail Solutions Group',
		metric: '5 locations expanded',
		rating: 5,
	},
]

function useReveal(threshold = 0.2) {
	const ref = useRef(null)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const node = ref.current
		if (!node) return undefined

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
				}
			},
			{ threshold }
		)

		observer.observe(node)
		return () => observer.disconnect()
	}, [threshold])

	return [ref, isVisible]
}

function AnimatedCounter({ value, suffix, isVisible }) {
	const [count, setCount] = useState(0)

	useEffect(() => {
		if (!isVisible) return undefined

		const duration = 2000
		const steps = 60
		const increment = value / steps
		let current = 0

		const timer = window.setInterval(() => {
			current += increment
			if (current >= value) {
				setCount(value)
				window.clearInterval(timer)
			} else {
				setCount(Math.floor(current))
			}
		}, duration / steps)

		return () => window.clearInterval(timer)
	}, [value, isVisible])

	return <span className="tabular-nums">{count.toLocaleString()}{suffix}</span>
}

function B2BEnquiry() {
	return (
		<section className="px-8 pb-20 pt-2">
			<div className="mx-auto w-full max-w-6xl">
				<div className="flex flex-col items-center justify-between gap-10 rounded-3xl bg-gradient-to-r from-[#2d52b4] to-[#4083ff] p-8 shadow-lg md:flex-row md:p-12">
					<div className="flex-1">
						<h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">Ready to Scale with TSPL?</h2>
						<p className="mb-8 text-lg text-blue-100">Partner with us for faster deployment, stronger compliance, and reliable workforce outcomes.</p>

						<div className="flex flex-wrap gap-4">
							<Link to="/contact-us" className="flex items-center gap-2 rounded-full bg-[#f97316] px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#ea580c]">
								<Briefcase className="h-5 w-5" />
								Book Consultation
								<ArrowRight className="h-5 w-5" />
							</Link>

							<Link to="/contract" className="flex items-center gap-2 rounded-full border border-white/40 bg-transparent px-6 py-3 font-medium text-white transition-colors hover:bg-white/10">
								<Building2 className="h-5 w-5 text-blue-100" />
								Explore Services
							</Link>
						</div>
					</div>

					<div className="w-full rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm md:w-[420px]">
						<h3 className="mb-4 font-medium text-white">Need Help?</h3>

						<div className="space-y-3">
							<a href="tel:+919876543210" className="flex items-center gap-4 rounded-xl bg-white/15 p-4 text-white no-underline transition-colors hover:bg-white/25">
								<Phone className="h-5 w-5 text-blue-100" />
								<span className="font-medium">+91 98765 43210</span>
							</a>

							<a href="mailto:b2b@tsplgroup.com" className="flex items-center gap-4 rounded-xl bg-white/15 p-4 text-white no-underline transition-colors hover:bg-white/25">
								<Mail className="h-5 w-5 text-blue-100" />
								<span className="font-medium">b2b@tsplgroup.com</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function B2BPage() {
	const [heroRef, heroVisible] = useReveal(0.15)
	const [servicesRef, servicesVisible] = useReveal(0.18)
	const [processRef, processVisible] = useReveal(0.2)
	const [industriesRef, industriesVisible] = useReveal(0.2)
	const [statsRef, statsVisible] = useReveal(0.3)
	const [testimonialsRef, testimonialsVisible] = useReveal(0.2)
	const [activeStep, setActiveStep] = useState(0)
	const [activeTestimonial, setActiveTestimonial] = useState(0)

	useEffect(() => {
		const timer = window.setInterval(() => {
			setActiveStep((prev) => (prev + 1) % processSteps.length)
		}, 4000)

		return () => window.clearInterval(timer)
	}, [])

	const marqueeItems = [...partnerLogos, ...partnerLogos]

	return (
		<div className="bg-white text-slate-900">
			<style>{`\n        @keyframes b2bMarquee {\n          from { transform: translateX(0); }\n          to { transform: translateX(-50%); }\n        }\n\n        @keyframes b2bMarqueeReverse {\n          from { transform: translateX(-50%); }\n          to { transform: translateX(0); }\n        }\n\n        @keyframes b2bFloat {\n          0%, 100% { transform: translateY(0px); }\n          50% { transform: translateY(-10px); }\n        }\n      `}</style>

			<Navbar />

			<main className="overflow-hidden">
				<section ref={heroRef} className="relative min-h-screen overflow-hidden bg-[#07111f] pt-24 text-white">
					<div className="absolute inset-0">
						<img
							src="/happy-excited-executive-business-team-600nw-2424450635.jpg.webp"
							alt="Business partnership"
							className="h-full w-full object-cover object-center opacity-35"
						/>
						<div className="absolute inset-0 bg-gradient-to-r from-[#07111f] via-[#07111f]/85 to-[#07111f]/20" />
						<div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-transparent to-[#07111f]/70" />
					</div>

					<div
						className="absolute inset-0 opacity-20"
						style={{
							backgroundImage:
								'linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)',
							backgroundSize: '80px 80px',
						}}
					/>

					<div className="absolute top-24 right-16 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" style={{ animation: 'b2bFloat 8s ease-in-out infinite' }} />
					<div className="absolute bottom-16 left-10 h-56 w-56 rounded-full bg-orange-500/15 blur-3xl" style={{ animation: 'b2bFloat 10s ease-in-out infinite reverse' }} />

					<div className="relative z-10 mx-auto grid max-w-7xl gap-14 px-6 py-14 lg:grid-cols-2 lg:px-8 lg:py-20">
						<div className={`space-y-8 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
							<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
								<Handshake className="h-4 w-4 text-cyan-400" />
								<span className="text-sm font-medium text-white/80">Business to Business Solutions</span>
							</div>

							<h1 className="hero-text-reveal max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
								Scale Your
								<br />
								<span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-orange-300 bg-clip-text text-transparent">
									Workforce Strategy
								</span>
								<br />
								With TSPL
							</h1>

							<p className="hero-text-reveal-delay max-w-xl text-lg leading-relaxed text-white/65 sm:text-xl">
								Enterprise-grade workforce solutions designed for businesses that demand excellence, reliability, and scalable execution.
							</p>

							<div className="flex flex-wrap gap-4 pt-2">
								<Link
									to="/contact-us"
									className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-semibold text-[#07111f] shadow-lg shadow-white/10 transition-transform hover:scale-[1.02]"
								>
									Schedule Consultation
									<ArrowRight className="h-4 w-4" />
								</Link>
								<a
									href="#services"
									className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
								>
									Explore Services
								</a>
							</div>

							<div className="grid gap-4 sm:grid-cols-3 pt-6">
								{[
									{ label: 'Enterprise Partners', value: '400+' },
									{ label: 'Annual Transactions', value: '50M+' },
									{ label: 'Uptime Guarantee', value: '99.9%' },
								].map((item) => (
									<div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
										<p className="text-3xl font-bold text-white">{item.value}</p>
										<p className="mt-1 text-sm text-white/55">{item.label}</p>
									</div>
								))}
							</div>
						</div>

						<div className={`space-y-6 transition-all duration-1000 delay-200 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
							{[
								{ title: 'Response Time', value: '24 Hours', icon: Clock },
								{ title: 'Deployment Window', value: '24-72 Hrs', icon: Rocket },
								{ title: 'Compliance Accuracy', value: '100%', icon: Shield },
							].map((card, index) => (
								<div
									key={card.title}
									className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]"
									style={{ animationDelay: `${index * 120}ms` }}
								>
									<div className="flex items-center gap-5">
										<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-white/15 to-white/5">
											<card.icon className="h-8 w-8 text-cyan-300" />
										</div>
										<div>
											<p className="text-3xl font-bold text-white">{card.value}</p>
											<p className="mt-1 text-white/55">{card.title}</p>
										</div>
									</div>
									<div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-orange-400/0 opacity-0 transition-opacity group-hover:opacity-100" />
								</div>
							))}
						</div>
					</div>

					<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
						<ChevronDown className="h-8 w-8 text-white/35" />
					</div>
				</section>

				<section className="border-y border-slate-200 bg-[#fbfdff] py-16">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<div className="text-center text-lg text-slate-500">
							Trusted by{' '}
							<span className="font-semibold text-slate-900">400+ leading enterprises</span>{' '}
							across India
						</div>

						<div className="mt-10 space-y-4">
							<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white py-4 shadow-sm">
								<div className="flex w-max gap-4 px-4" style={{ animation: 'b2bMarquee 34s linear infinite' }}>
									{marqueeItems.map((partner, index) => (
										<span
											key={`${partner}-top-${index}`}
											className="inline-flex shrink-0 items-center rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-semibold text-slate-700"
										>
											{partner}
										</span>
									))}
								</div>
							</div>

							<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white py-4 shadow-sm">
								<div className="flex w-max gap-4 px-4" style={{ animation: 'b2bMarqueeReverse 34s linear infinite' }}>
									{[...partnerLogos].reverse().concat([...partnerLogos].reverse()).map((partner, index) => (
										<span
											key={`${partner}-bottom-${index}`}
											className="inline-flex shrink-0 items-center rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-semibold text-slate-700"
										>
											{partner}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				<section ref={servicesRef} id="services" className="relative bg-white py-24 lg:py-32">
					<div className="absolute inset-0 pointer-events-none opacity-60" style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgba(37,99,235,0.04) 0px, rgba(37,99,235,0.04) 1px, transparent 1px, transparent 16px)' }} />

					<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
						<div className="mx-auto max-w-3xl text-center">
							<div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
								<Briefcase className="h-4 w-4" />
								Enterprise Services
							</div>
							<h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
								Comprehensive B2B
								<span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Solutions</span>
							</h2>
							<p className="mt-6 text-lg leading-relaxed text-slate-600">
								End-to-end workforce management services tailored for enterprises seeking operational excellence and sustainable growth.
							</p>
						</div>

						<div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{services.map((service, index) => (
								<article
									key={service.title}
									data-index={index}
									className={`service-card group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
										servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
									}`}
									style={{ transitionDelay: `${index * 90}ms` }}
								>
									<div className="relative h-48 overflow-hidden">
										<img src={service.image} alt={service.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
										<div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-60 transition-opacity group-hover:opacity-75`} />
										<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

										<div className="absolute bottom-4 left-4">
											<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110">
												<service.icon className="h-7 w-7 text-white" />
											</div>
										</div>
									</div>

									<div className="p-6">
										<h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
											{service.title}
										</h3>
										<p className="mt-3 leading-relaxed text-slate-600">{service.description}</p>

										<div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
											Learn more
											<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
										</div>
									</div>
								</article>
							))}
						</div>
					</div>
				</section>

				<section ref={processRef} className="relative bg-[#f8fbff] py-24 lg:py-32">
					<div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(59,130,246,0.08) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

					<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
						<div className="mx-auto max-w-3xl text-center">
							<div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
								<CheckCircle2 className="h-4 w-4" />
								Our Process
							</div>
							<h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
								How We
								<span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Work</span>
							</h2>
							<p className="mt-6 text-lg leading-relaxed text-slate-600">
								A streamlined approach to delivering workforce excellence, from initial consultation to ongoing support.
							</p>
						</div>

						<div className="mt-16 grid gap-16 lg:grid-cols-2 lg:items-center">
							<div className={`relative transition-all duration-1000 ${processVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
								<div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
									{processSteps.map((step, index) => (
										<div
											key={step.number}
											className={`absolute inset-0 transition-all duration-700 ${activeStep === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
										>
											<img src={step.image} alt={step.title} className="h-full w-full object-cover" />
											<div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 to-transparent" />
											<div className="absolute bottom-0 left-0 right-0 p-8">
												<div className="mb-4 flex items-center gap-4">
													<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
														<step.icon className="h-6 w-6 text-white" />
													</div>
													<span className="text-6xl font-bold text-white/20">{step.number}</span>
												</div>
												<h3 className="text-2xl font-bold text-white">{step.title}</h3>
											</div>
										</div>
									))}
								</div>

								<div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
									{processSteps.map((step, index) => (
										<button
											key={step.number}
											type="button"
											onClick={() => setActiveStep(index)}
											className={`h-2 rounded-full transition-all duration-300 ${activeStep === index ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
											aria-label={`Show ${step.title}`}
										/>
									))}
								</div>
							</div>

							<div className={`space-y-6 transition-all duration-1000 delay-300 ${processVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
								{processSteps.map((step, index) => (
									<button
										key={step.number}
										type="button"
										onClick={() => setActiveStep(index)}
										className={`group relative w-full rounded-2xl p-6 text-left transition-all duration-300 ${
											activeStep === index ? 'scale-[1.02] bg-white shadow-xl' : 'bg-transparent hover:bg-white/60'
										}`}
									>
										<div className="flex gap-6">
											<div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl transition-all ${activeStep === index ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
												<span className="text-2xl font-bold">{step.number}</span>
											</div>

											<div className="flex-1">
												<h3 className={`mb-2 text-xl font-bold transition-colors ${activeStep === index ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-900'}`}>
													{step.title}
												</h3>
												<p className={`leading-relaxed text-slate-600 transition-opacity ${activeStep === index ? 'opacity-100' : 'opacity-75'}`}>
													{step.description}
												</p>
											</div>
										</div>

										<div className={`absolute left-0 top-1/2 h-12 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-blue-600 to-cyan-600 transition-opacity ${activeStep === index ? 'opacity-100' : 'opacity-0'}`} />
									</button>
								))}
							</div>
						</div>
					</div>
				</section>

				<section ref={industriesRef} className="relative bg-white py-24 lg:py-32">
					<div className="absolute inset-0 pointer-events-none opacity-50" style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgba(15,23,42,0.035) 0px, rgba(15,23,42,0.035) 1px, transparent 1px, transparent 16px)' }} />

					<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
						<div className="max-w-3xl">
							<div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
								<Factory className="h-4 w-4" />
								Industries We Serve
							</div>
							<h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
								Powering Growth Across
								<span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Industries</span>
							</h2>
							<p className="mt-6 text-lg leading-relaxed text-slate-600">
								Our expertise spans multiple sectors, delivering specialized workforce solutions tailored to each industry&apos;s unique requirements.
							</p>
						</div>

						<div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{industries.map((industry, index) => (
								<article
									key={industry.name}
									className={`group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
										industriesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
									}`}
									style={{ transitionDelay: `${index * 75}ms` }}
								>
									<div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${industry.color} transition-transform group-hover:scale-110`}>
										<industry.icon className="h-7 w-7 text-white" />
									</div>

									<h3 className="mb-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">
										{industry.name}
									</h3>
									<p className="mb-3 text-sm leading-relaxed text-slate-600">{industry.description}</p>
									<span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
										{industry.clients}
									</span>

									<div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${industry.color} opacity-0 transition-opacity group-hover:opacity-5`} />
								</article>
							))}
						</div>
					</div>
				</section>

				<section ref={statsRef} className="relative overflow-hidden py-24 lg:py-32 text-white">
					<div className="absolute inset-0">
						<img src="/happy-excited-executive-business-team-600nw-2424450635.jpg.webp" alt="Business growth" className="h-full w-full object-cover" />
						<div className="absolute inset-0 bg-[#08111f]/92" />
					</div>

					<div className="absolute inset-0 overflow-hidden">
						<div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" style={{ animation: 'b2bFloat 24s linear infinite' }} />
						<div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" style={{ animation: 'b2bFloat 18s linear infinite reverse' }} />
					</div>

					<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
						<div className="mx-auto max-w-3xl text-center">
							<h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
								Numbers That
								<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Speak</span>
							</h2>
							<p className="mt-6 text-lg leading-relaxed text-white/65">
								Our track record demonstrates our commitment to delivering exceptional workforce solutions.
							</p>
						</div>

						<div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
							{stats.map((stat, index) => (
								<article
									key={stat.label}
									className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-white/10 ${
										statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
									}`}
									style={{ transitionDelay: `${index * 140}ms` }}
								>
									<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/15 to-transparent opacity-0 blur-xl transition-opacity hover:opacity-100" />
									<div className="relative">
										<p className="mb-2 text-5xl font-bold lg:text-6xl">
											<AnimatedCounter value={stat.value} suffix={stat.suffix} isVisible={statsVisible} />
										</p>
										<p className="text-lg font-semibold text-white">{stat.label}</p>
										<p className="mt-1 text-sm text-white/50">{stat.description}</p>
									</div>
								</article>
							))}
						</div>
					</div>
				</section>

				<section ref={testimonialsRef} className="relative overflow-hidden bg-gradient-to-b from-[#08111f] to-[#111c31] py-24 lg:py-32 text-white">
					<div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(59,130,246,0.1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

					<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
						<div className="mx-auto max-w-3xl text-center">
							<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80">
								<CheckCircle2 className="h-4 w-4 text-blue-400" />
								Client Success Stories
							</div>
							<h2 className="mt-6 text-4xl font-bold tracking-tight lg:text-5xl">
								Trusted by
								<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Industry Leaders</span>
							</h2>
						</div>

						<div className={`mt-16 transition-all duration-1000 ${testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
							<div className="grid gap-12 lg:grid-cols-2 lg:items-center">
								<div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
									{testimonials.map((testimonial, index) => (
										<div
											key={testimonial.author}
											className={`absolute inset-0 transition-all duration-700 ${activeTestimonial === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
										>
											<img
												src={index % 2 === 0 ? '/happy-excited-executive-business-team-600nw-2424450635.jpg.webp' : '/Gemini_Generated_Image_qskougqskougqsko.png'}
												alt={testimonial.company}
												className="h-full w-full object-cover"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-[#08111f] via-[#08111f]/45 to-transparent" />
											<div className="absolute right-6 top-6 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
												{testimonial.metric}
											</div>
										</div>
									))}
								</div>

								<div className="relative">
									{testimonials.map((testimonial, index) => (
										<div
											key={testimonial.author}
											className={`transition-all duration-500 ${activeTestimonial === index ? 'opacity-100 translate-x-0' : 'absolute inset-0 opacity-0 translate-x-8'}`}
										>
											<div className="mb-6 text-blue-400/30">
												<svg className="h-16 w-16" viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
													<path d="M20.4 24.1c0-3.6 2.7-6.3 6.4-6.3 1.3 0 2.7.4 3.5 1v6.2c-1-.3-1.8-.4-2.7-.4-2.3 0-3.8 1.4-3.8 4.1v2.1h6.5v18.9H20.4V24.1zm23.2 0c0-3.6 2.7-6.3 6.4-6.3 1.3 0 2.7.4 3.5 1v6.2c-1-.3-1.8-.4-2.7-.4-2.3 0-3.8 1.4-3.8 4.1v2.1h6.5v18.9H43.6V24.1z" />
												</svg>
											</div>

											<div className="mb-6 flex gap-1">
												{Array.from({ length: testimonial.rating }).map((_, starIndex) => (
													<Star key={starIndex} className="h-5 w-5 fill-amber-400 text-amber-400" />
												))}
											</div>

											<blockquote className="text-2xl font-medium leading-relaxed text-white lg:text-3xl">
												{testimonial.quote}
											</blockquote>

											<div className="mt-8 flex items-center gap-4">
												<div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-xl font-bold text-white">
													{testimonial.author.charAt(0)}
												</div>
												<div>
													<p className="text-lg font-semibold text-white">{testimonial.author}</p>
													<p className="text-white/60">
														{testimonial.role}, {testimonial.company}
													</p>
												</div>
											</div>
										</div>
									))}

									<div className="mt-12 flex flex-wrap items-center gap-4">
										<button
											type="button"
											onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
											className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
											aria-label="Previous testimonial"
										>
											<ChevronLeft className="h-5 w-5" />
										</button>
										<button
											type="button"
											onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
											className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
											aria-label="Next testimonial"
										>
											<ChevronRight className="h-5 w-5" />
										</button>

										<div className="ml-2 flex gap-2">
											{testimonials.map((testimonial, index) => (
												<button
													key={testimonial.author}
													type="button"
													onClick={() => setActiveTestimonial(index)}
													className={`h-2 rounded-full transition-all ${activeTestimonial === index ? 'w-8 bg-blue-500' : 'w-2 bg-white/30 hover:bg-white/50'}`}
													aria-label={`Show testimonial from ${testimonial.author}`}
												/>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<B2BEnquiry />
			</main>

			<Footer />
		</div>
	)
}

export default B2BPage
