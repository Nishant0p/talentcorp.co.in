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

// Use the shared AwardsSection component from /src/components

function TestimonialsSection() {
	const { isVisible, sectionRef } = useSectionReveal(0.2)
	const [activeIndex, setActiveIndex] = useState(0)

	const testimonials = [
		{ company: 'Tata Motors', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHMfOlZPbJzMJLUrp1auGXEhz7TNJbDFcq-g&s', rating: 5, quote: "<b>TSPL Group</b> has been a game-changer for our <b>bulk hiring requirements</b>. Their ability to deliver <b>highly skilled candidates</b> across multiple manufacturing units has drastically reduced our <b>time-to-hire</b> while ensuring we meet our rigorous quality standards.", author: 'Arun Bhatia', position: 'Head of Talent Acquisition' },
		{ company: 'Mahindra', logo: 'https://i.pinimg.com/736x/17/38/ff/1738ff204f7eaaf912742070a0871f8e.jpg', rating: 5, quote: "Partnering with <b>TSPL Group</b> allowed us to scale our workforce efficiently during peak production cycles. Their <b>innovative screening process</b> and dedicated support team consistently <b>exceed our expectations</b> when it comes to matching the right talent to the right roles.", author: 'Meera Deshmukh', position: 'VP Human Resources' },
		{ company: 'Bajaj Auto', logo: 'https://i.pinimg.com/736x/8b/e8/e5/8be8e5432419e9a984a3ab3fd3792905.jpg', rating: 5, quote: "The level of <b>professionalism and speed</b> that TSPL brings to the table is unmatched. They have successfully helped us build robust teams for our new R&D facilities with <b>zero compromise on candidate quality.</b> Truly a dependable partner.", author: 'Sanjay Kapoor', position: 'Director of HR' },
		{ company: 'Hero', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxiKq4Vgi8ttERIQse8zXFS6OxGJholi0txQ&s', rating: 5, quote: "A highly reliable staffing partner. <b>TSPL's deep understanding</b> of the automotive manufacturing sector makes them our first choice for managing <b>large-scale recruitment drives</b> seamlessly.", author: 'Priya Sharma', position: 'Operations Head' },
	]
	useEffect(() => {
		const timer = window.setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % testimonials.length)
		}, 5000)

		return () => window.clearInterval(timer)
	}, [])

	const handlePrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
	const handleNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);

	return (
		<section ref={sectionRef} className="relative w-full overflow-hidden bg-[#f4f7f9] flex flex-col items-center justify-center py-20 md:py-32">
			{/* Header Section */}
			<div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} px-4`}>
				<h2 className="text-4xl md:text-5xl font-extrabold text-[#0A2647] mb-4 font-serif">
					What Our Clients Say
				</h2>
				<p className="text-slate-600 max-w-3xl mx-auto text-base md:text-lg">
					Hear from industry leaders who have transformed their workforce management with TSPL Group.
				</p>
			</div>

			{/* Carousel Container */}
			<div className={`relative w-full max-w-[1400px] h-[500px] md:h-[450px] flex items-center justify-center transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>

				{/* Desktop: show 3 cards (prev, active, next) */}
				<div className="hidden md:block relative w-full h-full">
					{testimonials.map((t, idx) => {
						const len = testimonials.length
						const prev = (activeIndex - 1 + len) % len
						const next = (activeIndex + 1) % len
						let style = { left: '50%', transform: 'translate(-50%, -50%) scale(1)', width: '850px', height: '380px', zIndex: 40, opacity: 1, transition: 'all 700ms cubic-bezier(.2,.8,.2,1)' }
						let classes = 'absolute top-1/2 border-[4px] border-[#0A2647] rounded-[2rem] shadow-[0_20px_50px_rgba(10,38,71,0.15)] overflow-hidden bg-white'

						if (idx === prev) {
							style = { left: '50%', transform: 'translate(calc(-50% - 830px), -50%) scale(0.85)', width: '850px', height: '380px', zIndex: 30, opacity: 0.9, transition: 'all 700ms cubic-bezier(.2,.8,.2,1)' }
						} else if (idx === next) {
							style = { left: '50%', transform: 'translate(calc(-50% + 830px), -50%) scale(0.85)', width: '850px', height: '380px', zIndex: 30, opacity: 0.9, transition: 'all 700ms cubic-bezier(.2,.8,.2,1)' }
						} else if (idx === activeIndex) {
							style = { left: '50%', transform: 'translate(-50%, -50%) scale(1)', width: '850px', height: '380px', zIndex: 40, opacity: 1, transition: 'all 700ms cubic-bezier(.2,.8,.2,1)' }
						} else {
							style = { left: '50%', transform: 'translate(-50%, -50%) scale(0.7)', width: '850px', height: '380px', zIndex: 10, opacity: 0, pointerEvents: 'none', transition: 'all 700ms ease-in-out' }
						}

						return (
							<div
								key={t.company + idx}
								style={style}
								className={classes + (idx === prev || idx === next ? ' cursor-pointer' : '')}
								onClick={() => {
									if (idx === prev || idx === next) setActiveIndex(idx)
								}}
							>
								<div className="flex h-full">
									<div className="w-[35%] bg-[#0A2647] relative p-8 flex flex-col items-center justify-center overflow-hidden">
										{/* Circuit pattern background */}
										<div className="absolute inset-0 opacity-[0.05]">
											<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
												<defs>
													<pattern id="circuit" width="80" height="80" patternUnits="userSpaceOnUse">
														<path d="M40 40 L80 40 M40 40 L40 0 M40 40 L0 40 M40 40 L40 80 M20 20 L40 40 M60 60 L40 40 M60 20 L40 40" stroke="#ffffff" strokeWidth="2" fill="none" />
														<circle cx="40" cy="40" r="4" fill="#ffffff" />
														<circle cx="20" cy="20" r="2" fill="#ffffff" />
														<circle cx="60" cy="60" r="2" fill="#ffffff" />
														<circle cx="60" cy="20" r="2" fill="#ffffff" />
													</pattern>
												</defs>
												<rect width="100%" height="100%" fill="url(#circuit)" />
											</svg>
										</div>
										<img src={t.logo} alt={t.company} className="relative z-10 max-h-32 max-w-full object-contain drop-shadow-md" onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'block'; }} />
										<h3 className="hidden relative z-10 text-white font-bold text-3xl mt-4 text-center">{t.company}</h3>
									</div>
									<div className="w-[65%] bg-white p-12 flex flex-col justify-center">
										<div className="flex text-[#F97316] text-3xl mb-4 gap-1">
											{Array.from({ length: t.rating }).map((_, i) => (<span key={i}>★</span>))}
										</div>
										<div className="text-[#F97316] text-[80px] font-serif leading-[0.5] mb-2 mt-2">“</div>
										<p className="text-slate-800 text-[15px] leading-relaxed mb-10" dangerouslySetInnerHTML={{ __html: t.quote }}></p>
										<div className="mt-auto flex items-center gap-4">

											<div className="w-12 h-12 rounded-full bg-[#0A2647] flex items-center justify-center text-white font-bold text-lg shadow-sm">
												{t.company.charAt(0)}
											</div>
											<div>
												<p className="font-bold text-slate-900 text-lg">{t.author}</p>
												<p className="text-sm text-slate-500">{t.position}</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						)
					})}


				</div>

				{/* Mobile: single card layout */}
				<div className="md:hidden w-full px-4 h-full">
					<div className="w-full h-full bg-white border-[3px] border-[#0A2647] rounded-[2rem] shadow-xl overflow-hidden flex flex-col relative">
						<div className="h-[120px] bg-[#0A2647] relative flex items-center justify-center overflow-hidden shrink-0">
							<div className="absolute inset-0 opacity-[0.05]">
								<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
									<defs>
										<pattern id="circuit-mobile" width="40" height="40" patternUnits="userSpaceOnUse">
											<path d="M20 20 L40 20 M20 20 L20 0 M20 20 L0 20 M20 20 L20 40" stroke="#ffffff" strokeWidth="1" fill="none" />
											<circle cx="20" cy="20" r="2" fill="#ffffff" />
										</pattern>
									</defs>
									<rect width="100%" height="100%" fill="url(#circuit-mobile)" />
								</svg>
							</div>
							<img src={testimonials[activeIndex].logo} alt={testimonials[activeIndex].company} className="relative z-10 max-h-16 max-w-[80%] object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'block'; }} />
							<h3 className="hidden relative z-10 text-white font-bold text-2xl mt-4 text-center">{testimonials[activeIndex].company}</h3>
						</div>
						<div className="flex-1 p-6 flex flex-col">
							<div className="flex text-[#F97316] text-2xl mb-3 gap-1">
								{Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (<span key={i}>★</span>))}
							</div>
							<div className="text-[#F97316] text-[60px] font-serif leading-[0.5] mb-2 mt-1">“</div>
							<p className="text-slate-800 text-[14px] leading-relaxed mb-6 flex-1" dangerouslySetInnerHTML={{ __html: testimonials[activeIndex].quote }}></p>
							<div className="flex items-center gap-3 mt-auto">

								<div className="w-10 h-10 rounded-full bg-[#0A2647] flex items-center justify-center text-white font-bold text-sm shrink-0">
									{testimonials[activeIndex].company.charAt(0)}
								</div>
								<div>
									<p className="font-bold text-slate-900 text-sm">{testimonials[activeIndex].author}</p>
									<p className="text-xs text-slate-500 line-clamp-1">{testimonials[activeIndex].position}</p>
								</div>
							</div>
						</div>


					</div>
				</div>
			</div>

			{/* Pagination Dots */}
			<div className="flex gap-2 mt-12 items-center justify-center">
				{testimonials.map((_, index) => (
					<button
						key={index}
						onClick={() => setActiveIndex(index)}
						className={`transition-all duration-300 ${index === activeIndex ? 'w-8 h-2.5 rounded-full border-2 border-[#0A2647] bg-transparent' : 'w-2.5 h-2.5 rounded-full bg-[#F97316]'}`}
						aria-label={`Show testimonial ${index + 1}`}
					/>
				))}
			</div>

			{/* Trusted Companies Section */}
			<div className={`mt-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
				<p className="mb-8 text-center text-gray-500 text-sm md:text-base">Trusted by leading companies across India</p>
				<div className="flex flex-wrap items-center justify-center gap-6 opacity-60 lg:gap-12">
					{['Tata Motors', 'Mahindra', 'Bajaj Auto', 'Hero', 'Maruti', 'L&T'].map((company) => (
						<div key={company} className="cursor-pointer text-lg md:text-xl font-bold text-gray-400 transition-colors hover:text-[#0A2647]">
							{company}
						</div>
					))}
				</div>
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
