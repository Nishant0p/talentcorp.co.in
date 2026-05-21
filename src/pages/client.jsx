import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
	Award,
	ArrowRight,
	Building2,
	Briefcase,
	Car,
	CheckCircle2,
	ChevronLeft,
	ChevronRight,
	Cpu,
	Factory,
	Handshake,
	Mail,
	Package,
	Phone,
	Pill,
	Quote,
	Star,
	TrendingUp,
	Truck,
	Users,
	Send,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ClientVoicesSection from '../components/ClientVoicesSection'
import { STRAPI_BASE_URL, extractMediaUrl, fetchCollection, submitLead, submitToAdminBackend } from '../utils/strapi'
import { getPageAsset, usePageAssets } from '../hooks/usePageAssets'

const stats = [
	{ icon: Building2, value: 500, suffix: '+', label: 'Partner Companies' },
	{ icon: Users, value: 50000, suffix: '+', label: 'Workers Deployed' },
	{ icon: Handshake, value: 15, suffix: '+', label: 'Years Partnership' },
	{ icon: TrendingUp, value: 98, suffix: '%', label: 'Client Retention' },
]

const FALLBACK_PARTNER_LOGOS = [
	{ name: 'JCB', src: '/JCB_(company)-Logo.wine.svg' },
	{ name: 'HAIER', src: '/haier-logo.png' },
	{ name: 'MRF', src: '/Mrf-logo.png' },
]

function withCacheBuster(url, version) {
	if (!url || !version) return url
	const separator = url.includes('?') ? '&' : '?'
	return `${url}${separator}v=${encodeURIComponent(version)}`
}

const heroStats = [
	{ value: 40000, isNumber: true, label: 'Successful Placements' },
	{ value: 450, isNumber: true, label: 'partner employers' },
	{ value: 'Govt', isNumber: false, label: 'Authorized' },
]

const industries = [
	{
		icon: Factory,
		name: 'NAPS',
		image: '/naps%20tspl.jpg',
		clients: 400,
		workers: 'Apprenticeship',
		description: 'Apprenticeship quota support and monthly DBT for eligible establishments',
	},
	{
		icon: Briefcase,
		name: 'NATS',
		image: '/training%20tspl.jpeg',
		clients: 400,
		workers: 'Apprenticeship',
		description: 'Technical apprenticeship support for diploma, degree, and graduate candidates',
	},
	{
		icon: Award,
		name: 'WILP',
		image: '/training.jpeg',
		clients: 20,
		workers: 'Learn & Earn',
		description: 'Work Integrated Learning Program for continuous education',
	},
	{
		icon: Users,
		name: 'Contractual Labour',
		image: '/seasonal%20labours.jpeg',
		clients: '100+',
		workers: 'Flexible Staffing',
		description: 'Skilled and unskilled manpower on contract basis',
	},
]

const caseStudies = [
	{
		company: 'NAPS Program Success',
		industry: 'NAPS',
		link: '/naps',
		image: '/naps%20tspl.jpg',
		challenge: 'Supporting employers with a DBT-backed apprenticeship model while meeting quota requirements across eligible establishments.',
		solution: 'Implemented NAPS with ₹1,500 monthly DBT, quota compliance, and practical apprenticeship support.',
		results: [
			{ label: 'DBT / Month', value: '₹1,500' },
			{ label: 'Quota Range', value: '2.5% - 25%' },
			{ label: 'Annual Saving', value: '₹1.8 Cr' },
		],
		testimonial: 'A government apprenticeship program that lowers hiring cost while strengthening workforce pipelines.',
	},
	{
		company: 'NATS Program Impact',
		industry: 'NATS',
		link: '/nats',
		image: '/nats%20tspl.jpg',
		challenge: 'Connecting technically qualified youth with industry training, government support, and certification.',
		solution: 'Facilitated NATS with ₹4,000 to ₹4,500 DBT, quota compliance, and practical industry training.',
		results: [
			{ label: 'Diploma DBT', value: '₹4,000' },
			{ label: 'Degree DBT', value: '₹4,500' },
			{ label: 'Quota Range', value: '2.5% - 20%' },
		],
		testimonial: 'A Government of India scheme that supports technical training and lowers apprentice costs.',
	},
]

const clients = [
	{ name: 'Tata Motors', industry: 'Automobile' },
	{ name: 'Mahindra', industry: 'Automobile' },
	{ name: 'Reliance Industries', industry: 'NAPS' },
	{ name: 'Larsen & Toubro', industry: 'Infrastructure' },
	{ name: 'Cipla', industry: 'NATS' },
	{ name: 'Sun Pharma', industry: 'NATS' },
	{ name: 'Bajaj Auto', industry: 'Automobile' },
	{ name: 'Godrej', industry: 'FMCG' },
	{ name: 'Asian Paints', industry: 'NAPS' },
	{ name: 'Hindustan Unilever', industry: 'FMCG' },
	{ name: 'ITC Limited', industry: 'FMCG' },
	{ name: 'Adani Ports', industry: 'Logistics' },
	{ name: 'JSW Steel', industry: 'NAPS' },
	{ name: 'Havells', industry: 'Electronics' },
	{ name: 'Blue Star', industry: 'HVAC' },
	{ name: 'Voltas', industry: 'HVAC' },
]



const benefits = [
	'Dedicated Account Manager',
	'24/7 Support & Replacement',
	'Complete Compliance Management',
	'Transparent Pricing',
	'Pan-India Coverage',
	'Skilled & Verified Workforce',
]

function AnimatedCounter({ value, suffix }) {
	const [count, setCount] = useState(0)
	const ref = useRef(null)
	const [hasAnimated, setHasAnimated] = useState(false)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !hasAnimated) {
					setHasAnimated(true)
					let start = 0
					const duration = 2000
					const increment = value / (duration / 16)

					const timer = window.setInterval(() => {
						start += increment
						if (start >= value) {
							setCount(value)
							window.clearInterval(timer)
						} else {
							setCount(Math.floor(start))
						}
					}, 16)
				}
			},
			{ threshold: 0.5 }
		)

		if (ref.current) observer.observe(ref.current)
		return () => observer.disconnect()
	}, [value, hasAnimated])

	return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

function ClientsHero({ resolveAsset, partnerLogos }) {
	const heroAsset = resolveAsset('client.card.1', 'https://images.pexels.com/photos/8961068/pexels-photo-8961068.jpeg', 'Office Background')

	return (
		<section className="relative min-h-screen flex items-center overflow-visible bg-[#0f2a4d]">
			<div className="absolute inset-0 z-0 overflow-hidden">
				<img
					src={heroAsset.url}
					alt={heroAsset.alt}
					className="h-full w-full object-cover object-[78%_center] scale-[1.12] opacity-35"
				/>
				<div className="absolute left-0 top-0 bottom-0 w-[72%] bg-gradient-to-r from-[#0f2a4d]/90 via-[#0f2a4d]/60 to-transparent" />
				<div className="absolute right-0 top-0 bottom-0 w-[58%] bg-gradient-to-l from-cyan-500/25 via-blue-500/20 to-transparent" />
				<div className="absolute -right-24 top-20 h-72 w-72 rounded-full bg-orange-500/30 blur-3xl" />
				<div className="absolute right-20 bottom-10 h-80 w-80 rounded-full bg-indigo-500/30 blur-3xl" />
			</div>

			<div className="absolute -top-24 -left-24 z-0 h-96 w-96 rounded-full border border-white/10" />

			<div className="container mx-auto px-6 relative z-10 py-16 pt-24 pb-16 md:pb-24">
				<div className="max-w-3xl md:ml-8 lg:ml-12 text-white">
					<div className="mb-8">
						<div className="flex flex-wrap items-center gap-1.5 overflow-visible pb-1 md:flex-nowrap md:gap-2 md:overflow-x-auto">
							<div className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-white/3 px-3 py-1 text-xs backdrop-blur-md md:gap-2 md:px-4 md:py-1.5 md:text-sm">
								<Award size={14} className="text-orange-500 md:h-4 md:w-4" />
								<span>Government Authorized</span>
							</div>
							<div className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-white/3 px-3 py-1 text-xs backdrop-blur-md md:gap-2 md:px-4 md:py-1.5 md:text-sm">
								<CheckCircle2 size={14} className="text-emerald-500 md:h-4 md:w-4" />
								<span>NAPS DBT | NATS DBT | MAPS</span>
							</div>
						</div>
					</div>

					<h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl">
						Building India&apos;s
						<br />
						<span className="text-[#FF8C00]">Future Workforce</span>
					</h1>

					<p className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
						India&apos;s leading government-authorized staffing partner connecting employers and candidates through NAPS and NATS apprenticeship programs with quota-based support.
					</p>

					<div className="mb-12 flex items-center gap-6">
						<div className="flex items-center -space-x-3">
							{partnerLogos.slice(0, 5).map((brand) => (
								<div
									key={brand.name}
									className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-[#0f2a4d] bg-white shadow-md"
								>
									<img
										src={brand.src}
										alt={`${brand.name} logo`}
										className={`${brand.name === 'MRF' ? 'h-8 w-8' : 'h-7 w-7'} object-contain`}
										loading="lazy"
									/>
								</div>
							))}
						</div>
						<div className="h-8 w-[1px] bg-white/15" />
						<div className="flex flex-col">
						<span className="text-sm font-medium">+450 Companies Trust Us</span>
							<div className="flex items-center gap-1">
								{[...Array(5)].map((_, i) => (
									<Star key={i} size={14} className="fill-orange-500 text-orange-500" />
								))}
								<span className="ml-1 text-xs text-gray-400">4.9/5 Rating</span>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-4 sm:flex-row">
						<Link to="/jobs" className="flex items-center justify-center gap-2 rounded-xl bg-[#FF8C00] px-8 py-4 font-semibold text-white transition-all hover:bg-orange-600">
							Find Your Dream Job <ArrowRight size={20} />
						</Link>
						<Link to="/contact-us" className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/4 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/8">
							<Briefcase size={20} /> Hire Skilled Talent
						</Link>
					</div>
				</div>

				<div className="hidden md:block absolute left-1/2 bottom-0 z-30 w-full max-w-6xl -translate-x-1/2 translate-y-1/2 px-6">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
						{heroStats.map((card) => (
							<div
								key={card.label}
								className="rounded-2xl border border-white/45 bg-white/28 p-6 text-center shadow-[0_24px_55px_rgba(7,22,49,0.42)] backdrop-blur-xl"
							>
								<div className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
									{card.isNumber ? <AnimatedCounter value={card.value} suffix="+" /> : card.value}
								</div>
								<div className="mt-2 text-sm font-bold text-blue-900">{card.label}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

function LogoMarquee({ partnerLogos }) {
	const renderPartnerRow = (reverse = false) => (
		<div className="logo-marquee-track gap-4" style={{ animationDirection: reverse ? 'reverse' : 'normal', animationDuration: '25s' }}>
			{[...partnerLogos, ...partnerLogos, ...partnerLogos].map((brand, idx) => (
				<div
					key={`${brand.name}-${reverse ? 'rev' : 'fwd'}-${idx}`}
					className="mx-2 flex h-20 w-52 shrink-0 items-center rounded-2xl border border-[#f7c99b] bg-[#fff7ed]/90 px-4 shadow-sm backdrop-blur-sm"
				>
					<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#fdba74] bg-white shadow-[0_6px_18px_rgba(249,115,22,0.12)]">
						<img
							src={brand.src}
							alt={`${brand.name} logo`}
							className={`${brand.name === 'MRF' ? 'h-8' : 'h-7'} w-auto object-contain`}
							loading="lazy"
						/>
					</div>
					<div className="ml-3 flex min-w-0 flex-col text-left">
						<span className="truncate text-sm font-bold text-blue-700">{brand.name}</span>
						<span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#fb923c]">Partner</span>
					</div>
				</div>
			))}
		</div>
	)

	return (
		<section id="clients" className="relative overflow-hidden bg-white px-0 pb-16 pt-16 text-[#0f2a4d] md:pt-36">
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					backgroundImage:
						'repeating-linear-gradient(135deg, rgba(37,99,235,0.04) 0px, rgba(37,99,235,0.04) 1px, transparent 1px, transparent 16px)',
				}}
			/>

			<div className="relative w-full">
				<h2 className="px-6 text-center text-2xl font-bold leading-snug text-[#103f78] md:px-10 md:text-3xl">
					Trusted by 450+ leading companies across India
				</h2>

				<div
					className="logo-marquee mt-10 overflow-hidden bg-gradient-to-b from-[#fffaf3] to-[#fff7ed] py-5"
					style={{
						backgroundImage:
							'repeating-linear-gradient(135deg, rgba(249,115,22,0.05) 0px, rgba(249,115,22,0.05) 1px, transparent 1px, transparent 16px)',
					}}
				>
					{renderPartnerRow(false)}
				</div>
			</div>
		</section>
	)
}

function Industries({ resolveAsset }) {
	const [isVisible, setIsVisible] = useState(false)
	const [activeIndustry, setActiveIndustry] = useState(0)
	const ref = useRef(null)
	const cardAssets = [
		resolveAsset('client.card.1', '/Gemini_Generated_Image_qskougqskougqsko.png', 'Client showcase image'),
		resolveAsset('client.card.2', '/happy-excited-executive-business-team-600nw-2424450635.jpg.webp', 'Client showcase image'),
	]

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setIsVisible(true)
		}, { threshold: 0.2 })

		if (ref.current) observer.observe(ref.current)
		return () => observer.disconnect()
	}, [])

	return (
		<section ref={ref} className="bg-white py-20">
			<div className="container mx-auto px-4">
				<div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
					<p className="mb-2 font-semibold text-blue-600">INDUSTRIES WE SERVE</p>
					<h2 className="mb-4 text-3xl md:text-4xl font-bold text-gray-900">Across Every Sector</h2>
					<p className="mx-auto max-w-2xl text-gray-500">From manufacturing to healthcare, we provide tailored workforce solutions.</p>
				</div>

				<div className={`grid gap-8 lg:grid-cols-2 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
					<div className="space-y-3">
						{industries.map((industry, index) => (
							<button
								key={industry.name}
								onClick={() => setActiveIndustry(index)}
								className={`group w-full rounded-xl border p-4 text-left transition-all duration-300 ${
									activeIndustry === index
										? 'border-blue-600 bg-blue-600 shadow-lg shadow-blue-500/20'
										: 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
								}`}
							>
								<div className="flex items-center gap-4">
											<div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md overflow-hidden ${activeIndustry === index ? 'bg-white/20' : 'bg-blue-100'}`}>
										{industry.image ? (
											<img
												src={industry.image}
												alt={industry.name}
															className={`${industry.name === 'NAPS' ? 'h-3 w-3' : 'h-12 w-12'} max-h-full max-w-full object-contain ${activeIndustry === index ? 'opacity-90' : 'opacity-100'}`}
											/>
										) : (
											<industry.icon className={`h-6 w-6 ${activeIndustry === index ? 'text-white' : 'text-blue-600'}`} />
										)}
									</div>
									<div className="flex-1">
										<h3 className={`text-lg font-semibold ${activeIndustry === index ? 'text-white' : 'text-gray-900'}`}>{industry.name}</h3>
										<p className={`text-sm ${activeIndustry === index ? 'text-blue-100' : 'text-gray-500'}`}>
											{industry.clients} clients | {industry.workers} workers
										</p>
									</div>
									<ArrowRight className={`h-5 w-5 transition-all ${activeIndustry === index ? 'translate-x-0 text-white opacity-100' : '-translate-x-2 text-gray-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
								</div>
							</button>
						))}
					</div>

					<div className="relative min-h-[400px] overflow-hidden rounded-2xl bg-gray-100 lg:min-h-0">
						{industries.map((industry, index) => (
							(() => {
								const industryAsset = cardAssets[index % cardAssets.length]
								return (
							<div key={industry.name} className={`absolute inset-0 transition-all duration-500 ${activeIndustry === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
								<img src={industryAsset.url} alt={industryAsset.alt || industry.name} className="h-full w-full object-cover" />
								<div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

								<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
									<div className="mb-2 flex items-center gap-2">
										<industry.icon className="h-5 w-5 text-blue-400" />
										<span className="font-medium text-blue-400">Industry Focus</span>
									</div>
									<h3 className="mb-2 text-2xl md:text-3xl font-bold text-white">{industry.name}</h3>
									<p className="mb-4 text-gray-300">{industry.description}</p>

									<div className="flex gap-6">
										<div>
											<p className="text-3xl font-bold text-white">{industry.clients}+</p>
											<p className="text-sm text-gray-400">Partner Companies</p>
										</div>
										<div>
											<p className="text-3xl font-bold text-white">{industry.workers}</p>
											<p className="text-sm text-gray-400">Workers Placed</p>
										</div>
									</div>
								</div>
							</div>
								)
							})()
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

function CaseStudies({ resolveAsset }) {
	const [isVisible, setIsVisible] = useState(false)
	const [activeCase, setActiveCase] = useState(0)
	const ref = useRef(null)
	const cardAssets = [
		resolveAsset('client.card.1', '/naps%20tspl.jpg', 'Client case study image'),
		resolveAsset('client.card.2', '/nats%20tspl.jpg', 'Client case study image'),
	]

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setIsVisible(true)
		}, { threshold: 0.2 })

		if (ref.current) observer.observe(ref.current)
		return () => observer.disconnect()
	}, [])

	return (
		<section ref={ref} className="bg-white py-20">
			<div className="container mx-auto px-4">
				<div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
					<p className="mb-2 font-semibold text-blue-600">SUCCESS STORIES</p>
					<h2 className="mb-4 text-3xl md:text-4xl font-bold text-gray-900">Real Results, Real Impact</h2>
				</div>

				<div className={`mb-12 flex flex-wrap justify-center gap-3 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
					{caseStudies.map((study, index) => (
						<button
							key={study.industry}
							onClick={() => setActiveCase(index)}
							className={`rounded-full px-6 py-3 font-medium transition-all ${
								activeCase === index
									? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
									: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
							}`}
						>
							{study.industry}
						</button>
					))}
				</div>

				<div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
					<div className="grid items-center gap-8 lg:grid-cols-2">
						<div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
							<img
								src={cardAssets[activeCase % cardAssets.length].url}
								alt={cardAssets[activeCase % cardAssets.length].alt || caseStudies[activeCase].company}
								className={`h-full w-full ${caseStudies[activeCase].industry === 'NAPS' ? 'bg-white object-contain p-4' : 'object-cover'}`}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
							<div className="absolute bottom-6 left-6">
								<span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">{caseStudies[activeCase].industry}</span>
								<h3 className="mt-3 text-2xl font-bold text-white">{caseStudies[activeCase].company}</h3>
							</div>
						</div>

						<div className="space-y-6">
							<div className="rounded-xl border border-red-100 bg-red-50 p-6">
								<h4 className="mb-2 flex items-center gap-2 font-semibold text-red-800">
									<span className="h-2 w-2 rounded-full bg-red-500" />
									The Challenge
								</h4>
								<p className="text-gray-700">{caseStudies[activeCase].challenge}</p>
							</div>

							<div className="rounded-xl border border-blue-100 bg-blue-50 p-6">
								<h4 className="mb-2 flex items-center gap-2 font-semibold text-blue-800">
									<CheckCircle2 className="h-4 w-4 text-blue-600" />
									Our Solution
								</h4>
								<p className="text-gray-700">{caseStudies[activeCase].solution}</p>
							</div>

							<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
								{caseStudies[activeCase].results.map((result) => (
									<div key={result.label} className="rounded-xl bg-gray-50 p-4 sm:p-5 md:p-6 text-center transition-all duration-300 hover:bg-blue-50 hover:shadow-md">
										<p className={`text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 ${result.label === 'Quota Range' ? 'whitespace-nowrap' : ''}`}>{result.value}</p>
										<p className="mt-1 text-xs sm:text-sm text-gray-500">{result.label}</p>
									</div>
								))}
							</div>

							<div className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
								&ldquo;{caseStudies[activeCase].testimonial}&rdquo;
							</div>

							<Link to={caseStudies[activeCase].link || "/contact-us"} className="group inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700">
								Read Full Case Study
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}




function ClientsCTA() {
	const [isVisible, setIsVisible] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitMessage, setSubmitMessage] = useState('')
	const [submitError, setSubmitError] = useState('')
	const ref = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setIsVisible(true)
		}, { threshold: 0.2 })

		if (ref.current) observer.observe(ref.current)
		return () => observer.disconnect()
	}, [])

	const handleSubmit = async (event) => {
		event.preventDefault()
		setIsSubmitting(true)
		setSubmitError('')
		setSubmitMessage('')

		const formData = new FormData(event.currentTarget)
		const companyName = String(formData.get('companyName') || '').trim()
		const name = String(formData.get('contactName') || '').trim()
		const email = String(formData.get('email') || '').trim()
		const phone = String(formData.get('phone') || '').trim()
		const industry = String(formData.get('industry') || '').trim()
		const workforce = String(formData.get('workforce') || '').trim()
		const requirements = String(formData.get('requirements') || '').trim()

		try {
			const [leadResult] = await Promise.allSettled([
				submitLead({
				name,
				email,
				phone,
				subject: `Client partnership inquiry${industry ? ` - ${industry}` : ''}`,
				message: [
					`Company: ${companyName}`,
					`Industry: ${industry || 'Not specified'}`,
					`Workforce requirement: ${workforce || 'Not specified'}`,
					`Requirements: ${requirements || 'Not provided'}`,
					`Contact phone: ${phone}`,
				].join('\n'),
				}),
				submitToAdminBackend('service', {
					name,
					email,
					phone,
					message: [
						`Company: ${companyName}`,
						`Industry: ${industry || 'Not specified'}`,
						`Workforce requirement: ${workforce || 'Not specified'}`,
						`Requirements: ${requirements || 'Not provided'}`,
					].join('\n'),
					metadata: {
						source: 'client partnership inquiry',
						companyName,
						industry,
						workforce,
					},
				}),
			])

			if (leadResult.status !== 'fulfilled') {
				throw leadResult.reason
			}

			event.currentTarget.reset()
			setSubmitMessage('Your request has been sent. Our team will contact you shortly.')
		} catch (error) {
			setSubmitError(error?.message || 'Unable to submit partnership request.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section ref={ref} className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-20">
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
			<div className="absolute left-10 top-20 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
			<div className="absolute bottom-20 right-10 h-60 w-60 rounded-full bg-white/5 blur-3xl" />

			<div className="container relative z-10 mx-auto px-4">
				<div className="grid items-center gap-12 lg:grid-cols-2">
					<div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
						<h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
							Ready to Partner
							<br />
							<span className="text-blue-200">With Us?</span>
						</h2>
						<p className="mb-8 text-lg text-blue-100">
							Join 500+ companies who trust TSPL for their workforce needs. Get a customized solution for your business today.
						</p>

						<div className="mb-8 grid grid-cols-2 gap-3">
							{benefits.map((benefit) => (
								<div key={benefit} className="flex items-center gap-2">
									<CheckCircle2 className="h-5 w-5 shrink-0 text-blue-300" />
									<span className="text-sm text-white">{benefit}</span>
								</div>
							))}
						</div>

						<div className="flex flex-wrap gap-6 text-white">
							<div className="flex items-center gap-3">
								<Phone className="h-5 w-5 text-blue-600" />
								<a href="tel:+917397971322" className="hover:underline">+91 7397971322</a>
							</div>
							<div className="flex items-center gap-2">
								<Mail className="h-5 w-5 text-blue-300" />
								<span>partners@tsplgroup.in</span>
							</div>
						</div>
					</div>

					<div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
						<div className="rounded-2xl bg-white p-8 shadow-2xl">
							<div className="mb-6 flex items-center gap-3">
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
									<Building2 className="h-6 w-6 text-blue-600" />
								</div>
								<div>
									<h3 className="font-bold text-gray-900">Become a Partner</h3>
									<p className="text-sm text-gray-500">Fill the form and we&apos;ll get back within 24 hours.</p>
								</div>
							</div>

							<form className="space-y-4" onSubmit={handleSubmit}>
								<div className="grid gap-4 md:grid-cols-2">
									<input name="companyName" type="text" placeholder="Company Name" required className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
									<input name="contactName" type="text" placeholder="Your Name" required className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
								</div>

								<div className="grid gap-4 md:grid-cols-2">
									<input name="email" type="email" placeholder="Email Address" required className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
									<input name="phone" type="tel" placeholder="Phone Number" className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
								</div>

								<select name="industry" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
									<option value="">Select Industry</option>
									<option value="manufacturing">NAPS</option>
									<option value="automobile">Automobile</option>
									<option value="pharma">NATS</option>
									<option value="fmcg">WILP</option>
									<option value="logistics">Logistics</option>
									<option value="other">Other</option>
								</select>

								<select name="workforce" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
									<option value="">Workforce Requirement</option>
									<option value="1-50">1 - 50 Workers</option>
									<option value="50-100">50 - 100 Workers</option>
									<option value="100-500">100 - 500 Workers</option>
									<option value="500+">500+ Workers</option>
								</select>

								<textarea name="requirements" rows={3} placeholder="Tell us about your requirements..." className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />

								<button type="submit" disabled={isSubmitting} className="group inline-flex w-full items-center justify-center rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">
									{isSubmitting ? 'Sending...' : 'Request Partnership'}
									<Send className={`ml-2 h-5 w-5 ${isSubmitting ? 'animate-plane-send' : 'transition-transform group-hover:translate-x-1'}`} />
								</button>
							</form>
							{submitMessage && <p className="mt-4 text-sm font-medium text-green-600">{submitMessage}</p>}
							{submitError && <p className="mt-4 text-sm font-medium text-red-600">{submitError}</p>}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default function ClientPage() {
	const pageAssets = usePageAssets()
	const resolveAsset = (key, fallbackUrl, fallbackAlt = '') => getPageAsset(pageAssets, key, fallbackUrl, fallbackAlt)
	const [partnerLogos, setPartnerLogos] = useState(FALLBACK_PARTNER_LOGOS)

	useEffect(() => {
		if (!STRAPI_BASE_URL) return

		let mounted = true

		;(async () => {
			try {
				const data = await fetchCollection('/api/client-logos?populate=logo&sort=order:asc&pagination[pageSize]=100')
				const mapped = data
					.map((entry) => {
						const logoUrl = extractMediaUrl(entry.logo)
						const name = String(entry.name || '').trim() || 'PARTNER'
						const version = entry.updatedAt || entry.logo?.updatedAt || entry.documentId || entry.id
						return {
							name,
							src: withCacheBuster(logoUrl, version),
						}
					})
					.filter((item) => Boolean(item.src))

				if (!mounted || mapped.length === 0) return

				const merged = [...mapped, ...FALLBACK_PARTNER_LOGOS].filter(
					(item, index, array) => array.findIndex((candidate) => candidate.src === item.src) === index
				)

				setPartnerLogos(merged)
			} catch {
				// Keep fallback logos if Strapi fetch fails.
			}
		})()

		return () => {
			mounted = false
		}
	}, [])

	return (
		<div className="min-h-screen bg-white text-slate-800">
			<Navbar />
			<main>
				<ClientsHero resolveAsset={resolveAsset} partnerLogos={partnerLogos} />
				<LogoMarquee partnerLogos={partnerLogos} />
				<Industries resolveAsset={resolveAsset} />
				<CaseStudies resolveAsset={resolveAsset} />		
				<ClientVoicesSection 
					title={<>What Our <span className="text-orange-500">Hiring Partners Say</span></>} 
					subtitle="" 
					autoRotate={true}
				/>
				<ClientsCTA />
			</main>
			<Footer />
		</div>
	)
}
