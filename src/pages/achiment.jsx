import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
	Trophy,
	Medal,
	Award,
	Star,
	Shield,
	BadgeCheck,
	ArrowRight,
	Phone,
	Mail,
	MapPin,
	Users,
	Building2,
	Quote,
	TrendingUp,
	Rocket,
	Globe,
	CheckCircle2,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getPageAsset, usePageAssets } from '../hooks/usePageAssets'
import { useSectionReveal } from '../hooks/useSectionReveal'
import AwardsSectionComponent from '../components/AwardsSection'
import { extractMediaUrl, fetchTestimonials } from '../utils/strapi'
import heroImage from '../assets/hero.png'
function AwardsHero() {
	const { isVisible, sectionRef } = useSectionReveal(0.25)
	const [count, setCount] = useState({ years: 0, workers: 0, clients: 0, awardsWon: 0 })
	const pageAssets = usePageAssets()
	const achievementsHeroAsset = getPageAsset(pageAssets, 'achievements.hero', heroImage, 'TSPL achievements')

	useEffect(() => {
		const duration = 2000
		const steps = 60
		const interval = duration / steps

		let step = 0
		const timer = window.setInterval(() => {
			step += 1
			const progress = step / steps
			const easeOut = 1 - (1 - progress) ** 3

			setCount({
				years: Math.floor(15 * easeOut),
				workers: Math.floor(40000 * easeOut),
				clients: Math.floor(450 * easeOut),
				awardsWon: Math.floor(6 * easeOut),
			})

			if (step >= steps) {
				window.clearInterval(timer)
			}
		}, interval)

		return () => window.clearInterval(timer)
	}, [])

	const stats = [
		{ icon: TrendingUp, value: `${count.years}+`, label: 'Years of Excellence' },
		{ icon: Star, value: `${count.workers.toLocaleString()}+`, label: 'Workers Placed' },
		{ icon: Award, value: `${count.clients}+`, label: 'Happy Clients' },
		{ icon: Trophy, value: `${count.awardsWon}+`, label: 'Awards Won' },
	]

	return (
		<section ref={sectionRef} className="relative min-h-[78vh] overflow-hidden bg-white pt-16 md:min-h-[90vh] md:pt-24">
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${achievementsHeroAsset.url}')` }} />
				<div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/60" />
				<div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white" />
			</div>

			<div className="absolute inset-0 opacity-[0.03]">
				<svg className="h-full w-full">
					<pattern id="achievement-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
						<circle cx="30" cy="30" r="1.5" fill="#2563EB" />
					</pattern>
					<rect width="100%" height="100%" fill="url(#achievement-pattern)" />
				</svg>
			</div>

			<div className="relative mx-auto max-w-7xl px-6 py-10 md:py-16 lg:px-8">
				<div className="grid items-center gap-10 md:gap-12 lg:grid-cols-2">
					<div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
						<div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 shadow-lg shadow-blue-500/25">
							<Trophy className="h-4 w-4 text-white" />
							<span className="text-sm font-semibold text-white">Our Journey of Success</span>
						</div>

						<h1 className="text-5xl font-bold leading-tight text-gray-900 lg:text-7xl">
							<span className="block">Celebrating</span>
							<span className="relative mt-2 inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500">
								Excellence
								<svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
									<path d="M2 10C50 2 150 2 298 10" stroke="url(#grad-line)" strokeWidth="4" strokeLinecap="round" />
									<defs>
										<linearGradient id="grad-line" x1="0" y1="0" x2="300" y2="0">
											<stop stopColor="#2563EB" />
											<stop offset="1" stopColor="#F97316" />
										</linearGradient>
									</defs>
								</svg>
							</span>
						</h1>

						<p className="max-w-lg text-xl leading-relaxed text-gray-600">
							For over 15 years, TSPL Group has been transforming lives and businesses through dedicated service and unwavering commitment.
						</p>

						<div className="flex flex-wrap gap-4">
							<Link
								to="/contact-us"
								className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 font-bold text-white shadow-lg shadow-[#F97316]/30 transition-transform duration-300 hover:scale-105 hover:bg-[#EA580C]"
							>
								Get in Touch
								<ArrowRight className="h-5 w-5" />
							</Link>
							<Link
								to="/client"
								className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-6 py-3 font-bold text-blue-700 transition-colors duration-300 hover:border-blue-300 hover:bg-blue-50"
							>
								View Clients
							</Link>
						</div>
					</div>

					<div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
						<div className="relative mx-auto h-80 w-80 lg:h-[28rem] lg:w-[28rem]">
							<div className="absolute inset-0 rounded-full border-4 border-blue-200 opacity-20 animate-ping" />
							<div className="absolute inset-4 rounded-full border-4 border-orange-200 opacity-20 animate-ping" />
							<div className="absolute inset-8 rounded-full border-4 border-blue-300 opacity-20 animate-ping" />

							<div className="absolute inset-12 flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 shadow-2xl shadow-orange-500/40">
								<img src={achievementsHeroAsset.url} alt={achievementsHeroAsset.alt} className="h-full w-full object-cover opacity-25" />
								<Trophy className="absolute h-24 w-24 text-white drop-shadow-lg" />
							</div>

							<div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-2">
								<div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-xl animate-bounce">
									<span className="text-2xl font-bold text-blue-600">#1</span>
								</div>
							</div>

							<div className="absolute bottom-4 left-0">
								<div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
									<img src="/images-10.jpeg" alt="Recognition" className="h-full w-full object-cover" />
								</div>
							</div>

							<div className="absolute bottom-4 right-0">
								<div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-xl">
									<Award className="h-7 w-7 text-orange-500" />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={`mt-10 grid grid-cols-2 gap-4 transition-all duration-1000 delay-500 md:mt-16 md:gap-6 md:grid-cols-4 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
					{stats.map((stat) => (
						<div key={stat.label} className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10">
							<div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-orange-50 opacity-0 transition-opacity group-hover:opacity-100" />
							<div className="relative">
								<div className="mb-2 flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 transition-transform group-hover:scale-110">
										<stat.icon className="h-5 w-5 text-white" />
									</div>
									<p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-orange-500 lg:text-4xl">
										{stat.value}
									</p>
								</div>
								<p className="font-medium text-gray-700">{stat.label}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

function Milestones() {
	const { isVisible, sectionRef } = useSectionReveal(0.2)
	const [activeIndex, setActiveIndex] = useState(0)
	const [lineProgress, setLineProgress] = useState(0)

	useEffect(() => {
		if (!isVisible) {
			setLineProgress(0)
			return undefined
		}

		const timer = window.setInterval(() => {
			setLineProgress((current) => Math.min(current + 0.04, 1))
		}, 24)

		return () => window.clearInterval(timer)
	}, [isVisible])

	return (
		<section ref={sectionRef} className="relative overflow-hidden bg-slate-50 py-16 md:py-24">
			<div className="absolute inset-0 opacity-[0.02]">
				<svg className="h-full w-full">
					<pattern id="milestone-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
						<circle cx="20" cy="20" r="1" fill="#2563EB" />
					</pattern>
					<rect width="100%" height="100%" fill="url(#milestone-dots)" />
				</svg>
			</div>

			<div className="relative mx-auto max-w-7xl px-6 lg:px-8">
				<div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
					<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700">
						<Rocket className="h-4 w-4" />
						<span className="text-sm font-semibold">Our Journey</span>
					</div>
					<h2 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl">
						Key <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-orange-500">Milestones</span>
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-gray-600">
						A timeline of our growth, achievements, and the impact we have created.
					</p>
				</div>

				<div className="relative">
					<div className="absolute left-1/2 top-0 bottom-0 hidden w-1 -translate-x-1/2 overflow-hidden rounded-full bg-blue-100 lg:block">
						<div
							className="absolute left-0 top-0 w-full rounded-full bg-gradient-to-b from-blue-500 via-orange-400 to-blue-500 transition-all duration-300"
							style={{ height: `${Math.max(8, lineProgress * 100)}%` }}
						/>
					</div>

					<div className="space-y-12 lg:space-y-0">
						{milestones.map((milestone, index) => {
							const Icon = milestone.icon
							const isLeft = index % 2 === 0

							const colorClasses = {
								blue: 'from-blue-500 to-blue-600 shadow-blue-500/30',
								orange: 'from-orange-400 to-orange-500 shadow-orange-500/30',
								green: 'from-emerald-400 to-emerald-500 shadow-emerald-500/30',
								purple: 'from-purple-500 to-purple-600 shadow-purple-500/30',
							}

							return (
								<div
									key={`${milestone.year}-${milestone.title}`}
									className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isLeft ? 'lg:flex lg:flex-row' : 'lg:flex lg:flex-row-reverse'}`}
									style={{ transitionDelay: `${index * 150}ms` }}
								>
									<div className={`lg:w-5/12 ${isLeft ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
										<div
											className={`group cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${activeIndex === index ? 'ring-2 ring-blue-200 shadow-blue-500/10' : ''}`}
											onMouseEnter={() => setActiveIndex(index)}
										>
											<div className={`mb-4 flex items-center gap-4 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
												<div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colorClasses[milestone.color]} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${activeIndex === index ? 'scale-110' : ''}`}>
													<Icon className="h-6 w-6 text-white" />
												</div>
												<div>
													<span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-orange-500">
														{milestone.year}
													</span>
												</div>
											</div>
											<h3 className="mb-1 text-xl font-bold text-gray-900">{milestone.title}</h3>
											<p className="text-gray-600">{milestone.description}</p>
										</div>
									</div>

									<div className={`absolute left-1/2 hidden h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-4 border-blue-500 bg-white z-10 transition-all duration-500 lg:flex ${activeIndex === index ? 'scale-110 shadow-lg shadow-orange-500/30' : ''}`}>
										<div className={`h-2 w-2 rounded-full bg-orange-500 transition-all duration-500 ${activeIndex === index ? 'animate-ping opacity-100' : 'opacity-30'}`} />
									</div>

									<div className={`mt-6 lg:mt-0 lg:w-5/12 ${isLeft ? 'lg:pl-16' : 'lg:pr-16'}`}>
										<div className={`group relative h-48 overflow-hidden rounded-2xl shadow-lg transition-all duration-700 lg:h-56 ${activeIndex === index ? 'scale-[1.03] shadow-blue-500/20' : 'scale-100'} group-hover:-translate-y-1`}>
											<img src={milestone.image} alt={milestone.title} className="h-full w-full object-cover" />
											<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
											<div className="absolute bottom-4 left-4 right-4">
												<div className="flex items-center gap-2 text-white transition-transform duration-500 group-hover:translate-x-1">
													<CheckCircle2 className="h-5 w-5 text-green-400" />
													<span className="font-semibold">Milestone Achieved</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}

function TestimonialsSection() {
	const { isVisible, sectionRef } = useSectionReveal(0.2)
	const [activeIndex, setActiveIndex] = useState(0)
	const [testimonials, setTestimonials] = useState([])

	useEffect(() => {
		let isMounted = true

		const loadTestimonials = async () => {
			const data = await fetchTestimonials()
			if (!isMounted) return

			const clientTestimonials = data
				.filter((item) => item.reviewType === 'client')
				.map((item) => ({
					id: item.id,
					company: item.company || item.name || 'Client',
					logo: item.image ? extractMediaUrl(item.image) : '',
					rating: item.rating || 5,
					quote: item.quote || '',
					author: item.name || '',
					position: item.role || '',
				}))

			setTestimonials(clientTestimonials)
		}

		loadTestimonials()

		return () => {
			isMounted = false
		}
	}, [])

	useEffect(() => {
		if (testimonials.length === 0) return undefined

		const timer = window.setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % testimonials.length)
		}, 5000)

		return () => window.clearInterval(timer)
	}, [testimonials.length])

	useEffect(() => {
		setActiveIndex(0)
	}, [testimonials.length])

	const activeTestimonial = testimonials[activeIndex]

	const handlePrev = () => {
		if (testimonials.length === 0) return
		setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
	}

	const handleNext = () => {
		if (testimonials.length === 0) return
		setActiveIndex((prev) => (prev + 1) % testimonials.length)
	}

	return (
		<section ref={sectionRef} className="relative overflow-hidden bg-[#f4f7f9] py-20 md:py-32">
			<div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8">
				<div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
					<h2 className="text-4xl font-extrabold font-serif text-[#0A2647] md:text-5xl">
						Client Voices <span className="text-[#F97316]">That Matter</span>
					</h2>
					<p className="mx-auto mt-4 max-w-3xl text-base text-slate-600 md:text-lg">
						Real feedback from the companies we support.
					</p>
				</div>

				<div className={`w-full transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
					{testimonials.length === 0 ? (
						<div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-16 text-center text-slate-600 shadow-lg">
							Loading client reviews...
						</div>
					) : (
						<div className="overflow-hidden rounded-[2rem] border border-[#0A2647]/10 bg-white shadow-[0_20px_50px_rgba(10,38,71,0.15)]">
							<div className="grid md:grid-cols-[320px,1fr]">
								<div className="relative flex items-center justify-center overflow-hidden bg-[#0A2647] px-8 py-10 text-center md:min-h-[380px] md:px-10">
									<div className="absolute inset-0 opacity-[0.06]">
										<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
											<defs>
												<pattern id="circuit-achievement" width="72" height="72" patternUnits="userSpaceOnUse">
													<path d="M36 36 L72 36 M36 36 L36 0 M36 36 L0 36 M36 36 L36 72" stroke="#ffffff" strokeWidth="1.5" fill="none" />
													<circle cx="36" cy="36" r="3" fill="#ffffff" />
												</pattern>
											</defs>
											<rect width="100%" height="100%" fill="url(#circuit-achievement)" />
										</svg>
									</div>
									<div className="relative z-10 flex flex-col items-center gap-4">
										<div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/15 md:h-24 md:w-24">
											{activeTestimonial?.logo ? (
												<img src={activeTestimonial.logo} alt={activeTestimonial.company} className="h-full w-full object-cover p-2" />
											) : (
												<span className="text-3xl font-black text-white">{activeTestimonial?.company?.charAt(0) || 'C'}</span>
											)}
										</div>
										<h3 className="text-2xl font-bold text-white md:text-3xl">{activeTestimonial?.company}</h3>
										<p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Client Review</p>
									</div>
								</div>

								<div className="flex flex-col justify-between px-6 py-8 md:px-10 md:py-10">
									<div>
										<div className="flex items-start justify-between gap-3">
											<div className="flex gap-1 text-[#F97316]">
												{Array.from({ length: activeTestimonial?.rating || 5 }).map((_, index) => (
													<Star key={index} size={18} className="fill-current" />
												))}
											</div>
											<div className="flex gap-2">
												<button type="button" onClick={handlePrev} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-colors hover:border-[#0A2647] hover:text-[#0A2647]" aria-label="Previous testimonial">
													<ChevronLeft className="h-5 w-5" />
												</button>
												<button type="button" onClick={handleNext} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-colors hover:border-[#0A2647] hover:text-[#0A2647]" aria-label="Next testimonial">
													<ChevronRight className="h-5 w-5" />
												</button>
											</div>
										</div>

										<div className="mt-6 text-[72px] font-serif leading-none text-[#F97316] md:text-[88px]">“</div>
										<p className="mt-4 text-sm leading-relaxed text-slate-800 md:text-[15px]" dangerouslySetInnerHTML={{ __html: activeTestimonial?.quote || '' }} />
									</div>

									<div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-100 pt-6">
										<div className="flex items-center gap-3">
											<div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0A2647] text-sm font-bold text-white">
												{activeTestimonial?.company?.charAt(0) || 'C'}
											</div>
											<div>
												<p className="font-bold text-slate-900">{activeTestimonial?.author}</p>
												<p className="text-sm text-slate-500">{activeTestimonial?.position}</p>
											</div>
										</div>
										{activeTestimonial?.rating ? (
											<div className="rounded-full bg-[#F97316]/10 px-3 py-1 text-xs font-bold text-[#C2410C]">
												{activeTestimonial.rating}.0 rating
											</div>
										) : null}
									</div>
								</div>
							</div>
							</div>
						)
					}
				</div>

				{testimonials.length > 0 ? (
					<div className="mt-8 flex items-center justify-center gap-2">
						{testimonials.map((_, index) => (
							<button
								key={index}
								type="button"
								onClick={() => setActiveIndex(index)}
								className={`h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-7 bg-[#0A2647]' : 'w-2.5 bg-[#F97316]/50 hover:bg-[#F97316]'}`}
								aria-label={`Show testimonial ${index + 1}`}
							/>
						))}
					</div>
				) : null}
			</div>
		</section>
	)
}

function AchievementsCta() {
	const { isVisible, sectionRef } = useSectionReveal(0.2)

	return (
		<section ref={sectionRef} className="relative overflow-hidden bg-white py-16 md:py-24">
			<div className="absolute inset-0">
				<div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-100 via-white to-orange-100 blur-3xl opacity-50" />
			</div>

			<div className="relative mx-auto max-w-7xl px-6 lg:px-8">
				<div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
					<h2 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl">
						Be Part of Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-orange-500">Success Story</span>
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-gray-600">
						Join hundreds of companies who have transformed their workforce management with TSPL Group.
					</p>
				</div>

				<div className={`grid gap-8 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} md:grid-cols-3`}>
					<div className="group rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/30">
						<div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 transition-transform group-hover:scale-110">
							<Building2 className="h-7 w-7" />
						</div>
						<h3 className="mb-4 text-2xl font-bold">For Companies</h3>
						<p className="mb-6 text-blue-100">
							Get reliable manpower, payroll management, and statutory compliance - all under one roof.
						</p>
						<Link to="/b2b" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50">
							Partner With Us
							<ArrowRight className="h-4 w-4" />
						</Link>
					</div>

					<div className="group rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/30">
						<div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 transition-transform group-hover:scale-110">
							<Users className="h-7 w-7" />
						</div>
						<h3 className="mb-4 text-2xl font-bold">For Job Seekers</h3>
						<p className="mb-6 text-orange-100">
							Find your dream job with India&apos;s leading manpower company. We have opportunities for all skill levels.
						</p>
						<Link to="/skilled" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-orange-600 transition-colors hover:bg-orange-50">
							Browse Jobs
							<ArrowRight className="h-4 w-4" />
						</Link>
					</div>

					<div className="group rounded-3xl border-2 border-gray-100 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl">
						<div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 transition-transform group-hover:scale-110">
							<Trophy className="h-7 w-7 text-white" />
						</div>
						<h3 className="mb-4 text-2xl font-bold text-gray-900">Get In Touch</h3>
						<div className="space-y-4">
							<a href="tel:+919876543210" className="flex items-center gap-3 text-gray-600 transition-colors hover:text-blue-600">
								<Phone className="h-5 w-5" />
								<span>+91 98765 43210</span>
							</a>
							<a href="mailto:info@tsplgroup.com" className="flex items-center gap-3 text-gray-600 transition-colors hover:text-blue-600">
								<Mail className="h-5 w-5" />
								<span>info@tsplgroup.com</span>
							</a>
							<div className="flex items-start gap-3 text-gray-600">
								<MapPin className="mt-0.5 h-5 w-5" />
								<span>Mumbai, Maharashtra, India</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default function AchimentPage() {
	return (
		<div className="min-h-screen bg-slate-50 text-slate-900">
			<Navbar />
			<main>
				<AwardsHero />

				<AwardsSectionComponent />
				<TestimonialsSection />
				<AchievementsCta />
			</main>
			<Footer />
		</div>
	)
}
