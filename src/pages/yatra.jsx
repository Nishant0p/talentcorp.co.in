import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, PlayCircle, Circle, MapPin, ArrowRight, Eye, Target, Handshake, Briefcase, GraduationCap, Users, Megaphone, Map, Lightbulb, Heart, Truck, Check, Plus, Minus, ChevronDown, ChevronUp, ChevronRight, Activity } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RozgaarPreloader from '../components/RozgaarPreloader'
import { rojgarYatraImages } from '../data/rojgarYatraImages'

const participatingStates = [
	'Andhra Pradesh',
	'Arunachal Pradesh',
	'Assam',
	'Bihar',
	'Chhattisgarh',
	'Goa',
	'Gujarat',
	'Haryana',
	'Himachal Pradesh',
	'Jharkhand',
	'Karnataka',
	'Kerala',
	'Madhya Pradesh',
	'Maharashtra',
	'Manipur',
	'Meghalaya',
	'Mizoram',
	'Nagaland',
	'Odisha',
	'Punjab',
	'Rajasthan',
	'Sikkim',
	'Tamil Nadu',
	'Telangana',
	'Tripura',
	'Uttar Pradesh',
	'Uttarakhand',
	'West Bengal',
]

const galleryTriples = []
for (let index = 0; index < rojgarYatraImages.length; index += 3) {
	galleryTriples.push(rojgarYatraImages.slice(index, index + 3))
}

const faqItems = [
	{
		question: 'What is Rojgar Yatra?',
		answer:
			'Rojgar Yatra is an employment and workforce development initiative that connects job seekers with career opportunities across India through recruitment drives, job fairs, campus placements, and awareness campaigns.',
	},
	{
		question: 'Who can benefit from Rojgar Yatra?',
		answer:
			'Youth, freshers, skilled workers, and blue-collar candidates can benefit. We also support companies and industries by connecting them with reliable manpower.',
	},
	{
		question: 'How does Rojgar Yatra work on ground?',
		answer:
			'Rojgar Yatra operates through 4 branded outreach vehicles that travel across rural and urban locations, run awareness campaigns, share vacancy information, and support direct candidate registration.',
	},
	{
		question: 'What activities are conducted during outreach?',
		answer:
			'Speaker announcements, wall posters and A3 banners, pocket banner distribution, direct candidate interaction, and QR-based digital registration support.',
	},
	{
		question: 'Which regions are covered?',
		answer:
			'We actively connect candidates in multiple states including Maharashtra, Madhya Pradesh, Uttar Pradesh, Odisha, West Bengal, Chhattisgarh, Bihar, Jharkhand, Andhra Pradesh, and Assam, while continuously expanding to more regions.',
	},
	{
		question: 'Why choose Rojgar Yatra?',
		answer:
			'We provide genuine opportunities, trusted industry connections, a fast hiring process, dedicated placement support, and strong rural as well as urban employment reach.',
	},
]

export default function YatraPage() {
	const [loading, setLoading] = useState(true)
	const [selectedImage, setSelectedImage] = useState('')
	const [loadedImages, setLoadedImages] = useState({})
	const [openFaqIndex, setOpenFaqIndex] = useState(0)

	const heroRef = useRef(null)
	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ["start start", "end start"]
	})

	const carX = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
	const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

	useEffect(() => {
		// Fallback hide only if callback fails; keep long enough for full GSAP sequence.
		const t = setTimeout(() => setLoading(false), 7000)
		return () => clearTimeout(t)
	}, [])

	useEffect(() => {
		if (!selectedImage) return undefined

		const onEsc = (e) => {
			if (e.key === 'Escape') {
				setSelectedImage('')
			}
		}

		window.addEventListener('keydown', onEsc)
		return () => window.removeEventListener('keydown', onEsc)
	}, [selectedImage])

	const markImageLoaded = (src) => {
		setLoadedImages((current) => {
			if (current[src]) return current
			return { ...current, [src]: true }
		})
	}

	return (
		<div className="bg-white text-slate-800">
			<Navbar />
			{loading && <RozgaarPreloader onFinish={() => setLoading(false)} />}

			<main className="min-h-screen">
				{/* REDESIGNED HERO SECTION */}
				<section ref={heroRef} className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#1A365D] px-6 py-24 lg:px-12 pt-32">
					
					{/* Parallax Image Background with Left Fade */}
					<motion.div 
						className="absolute inset-0 z-0 pointer-events-none"
						style={{ 
							y: bgY,
							backgroundImage: 'url("https://i0.wp.com/indianinfrastructure.com/wp-content/uploads/2024/12/42.jpg?resize=678%2C381&ssl=1")',
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
					>
						{/* Gradient overlays to fade the left side into the navy background */}
						<div className="absolute inset-0 bg-gradient-to-r from-[#1A365D]/90 via-[#1A365D]/60 to-[#1A365D]/20 sm:from-[#1A365D] sm:from-30% sm:via-[#1A365D]/30 sm:via-60% sm:to-transparent" />
						<div className="absolute inset-0 bg-gradient-to-t from-[#1A365D] from-5% via-transparent to-transparent" />
					</motion.div>

					{/* Asymmetrical Geometric Sidebars */}
					<div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-b from-blue-600 to-[#1A365D] transform -skew-x-6 -translate-x-6 opacity-40 z-10 pointer-events-none" />
					<div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-t from-orange-500 to-[#1A365D] transform skew-x-6 translate-x-6 opacity-50 z-10 pointer-events-none" />

					<div className="relative z-20 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-8">
						{/* Left Column: Content */}
						<div className="flex flex-col items-start text-left">
							<div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-bold tracking-widest text-orange-400 uppercase mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(255,140,0,0.15)]">
								<MapPin className="h-4 w-4" />
								<span>Nationwide Mission</span>
							</div>

							<h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl mb-2">
								<span className="text-[#FF8C00] drop-shadow-md">Rojgaar Yatra</span>
								<br />
								<span className="text-blue-100 text-3xl sm:text-4xl md:text-5xl font-bold">By TSPL Group</span>
							</h1>
							
							<h2 className="mt-6 text-2xl md:text-3xl font-bold text-white max-w-xl">
								Bridging India, One Career at a Time.
							</h2>

							<p className="mt-4 max-w-xl text-lg text-blue-200 leading-relaxed">
								Empowering careers across every state. Join the movement as we bridge the gap between talent and opportunity. The <span className="font-bold text-white">Rojgaar Yatra</span> is more than a journey; it’s a nationwide mission by TSPL Group to bring employment opportunities to your doorstep.
							</p>

							{/* Call to Actions */}
							<div className="mt-10 flex flex-wrap items-center gap-4">
								<button onClick={() => { document.getElementById('route')?.scrollIntoView({ behavior: 'smooth' }) }} className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#FF8C00] px-8 font-bold text-white shadow-[0_0_20px_rgba(255,140,0,0.4)] transition-all hover:bg-orange-500 hover:scale-105">
									View Our Route
									<ArrowRight className="h-5 w-5" />
								</button>
								<Link to="/contact-us" className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/40">
									Join the Yatra
								</Link>
							</div>

							{/* The "Stop" Indicator Ticker */}
							<div className="mt-12 w-full max-w-lg rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-6 backdrop-blur-md">
								<div className="flex items-center justify-between text-sm sm:text-base">
									<div className="flex flex-col items-center gap-1 text-emerald-400 w-1/3 text-center">
										<CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
										<span className="font-bold">Maharashtra</span>
										<span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-emerald-400/70">Completed</span>
									</div>
									<div className="h-[2px] flex-1 mx-2 bg-emerald-500/30 relative overflow-hidden">
										<div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-orange-500 opacity-50" />
									</div>
									<div className="flex flex-col items-center gap-1 text-orange-400 w-1/3 text-center">
										<PlayCircle className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
										<span className="font-bold">Gujarat</span>
										<span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-orange-400/70">Active</span>
									</div>
									<div className="h-[2px] flex-1 mx-2 bg-white/10 relative overflow-hidden">
										<div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-orange-500/50 to-transparent animate-pulse" />
									</div>
									<div className="flex flex-col items-center gap-1 text-slate-400 w-1/3 text-center">
										<Circle className="h-5 w-5 sm:h-6 sm:w-6" />
										<span className="font-bold">Rajasthan</span>
										<span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-500">Upcoming</span>
									</div>
								</div>
							</div>
						</div>

						{/* Right Column: Hero Image with Motion Blur & Glow */}
						<div className="relative flex items-center justify-center lg:justify-end mt-16 lg:mt-0">
							{/* Motion Trails */}
							<div className="absolute left-0 top-1/2 -translate-y-1/2 w-[120%] h-32 -z-10 opacity-60 pointer-events-none">
								<div className="h-1 w-3/4 bg-gradient-to-r from-transparent via-orange-500 to-transparent absolute top-4 -left-20 transform -rotate-2 animate-pulse" style={{ filter: 'blur(2px)' }} />
								<div className="h-2 w-full bg-gradient-to-r from-transparent via-orange-400 to-transparent absolute top-1/2 -left-10 transform -rotate-1 animate-pulse" style={{ filter: 'blur(4px)' }} />
								<div className="h-0.5 w-2/3 bg-gradient-to-r from-transparent via-blue-400 to-transparent absolute bottom-4 -left-16 transform -rotate-3 animate-pulse" />
							</div>

							{/* Tire Glow */}
							<div className="absolute bottom-[10%] left-1/4 h-24 w-3/4 rounded-[100%] bg-[#FF8C00] opacity-40 mix-blend-screen blur-[60px] animate-pulse pointer-events-none" />

							{/* Parallax Vehicle */}
							<motion.div 
								style={{ x: carX }}
								className="relative z-10 w-[115%] max-w-[800px] lg:w-[130%] lg:-mr-20 xl:-mr-32 flex justify-end"
							>
								<img
									src="/rojgaaar yatra car 2.png"
									alt="Rozgaar Yatra vehicle"
									className="w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
								/>
							</motion.div>
						</div>
					</div>
				</section>

				<section className="relative flex h-[100svh] flex-col justify-center overflow-hidden bg-slate-950 py-8">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.22),transparent_45%)]" />
					<div className="relative mb-5">
						<h2 className="px-6 text-3xl font-extrabold text-white sm:px-8 sm:text-4xl lg:px-12">Journey Highlights</h2>
						<p className="mt-3 max-w-3xl px-6 text-slate-300 sm:px-8 lg:px-12">
							Explore interactive moments from Rozgaar Yatra across regions.
						</p>
					</div>

					<div className="relative px-6 sm:px-8 lg:px-12">
						<div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/45 p-2 shadow-[0_30px_80px_rgba(2,6,23,0.45)] sm:p-3">
							{/* Row 1: Moves Left */}
							<motion.div
								className="flex w-max gap-3 mb-3"
								animate={{ x: ['0%', '-50%'] }}
								transition={{ duration: 320, ease: 'linear', repeat: Infinity }}
							>
								{[...galleryTriples, ...galleryTriples].map((triple, index) => {
									const primary = triple[0]
									const secondaryA = triple[1] ?? triple[0]
									const secondaryB = triple[2] ?? triple[1] ?? triple[0]

									return (
										<div key={`r1-triple-${index}`} className="flex shrink-0 items-stretch gap-2 rounded-[20px] border border-white/10 bg-slate-950/70 p-2">
											<button
												type="button"
												className="block w-[180px] shrink-0 overflow-hidden rounded-[16px] border border-white/10 bg-slate-900/80"
												onClick={() => setSelectedImage(primary)}
											>
												<img
													src={primary}
													alt="Rozgar Yatra highlight"
													className={`h-full w-full aspect-[9/16] object-cover transition duration-700 hover:scale-[1.03] ${loadedImages[primary] ? 'opacity-100 blur-0' : 'opacity-60 blur-md scale-[1.04]'}`}
													loading="lazy"
													decoding="async"
													onLoad={() => markImageLoaded(primary)}
												/>
											</button>

											<div className="flex w-[140px] shrink-0 flex-col gap-2">
												<button
													type="button"
													className="block h-1/2 overflow-hidden rounded-[14px] border border-white/10 bg-slate-900/80"
													onClick={() => setSelectedImage(secondaryA)}
												>
													<img
														src={secondaryA}
														alt="Rozgar Yatra moment"
														className={`h-full w-full aspect-[4/3] object-cover transition duration-700 hover:scale-[1.04] ${loadedImages[secondaryA] ? 'opacity-100 blur-0' : 'opacity-60 blur-md scale-[1.03]'}`}
														loading="lazy"
														decoding="async"
														onLoad={() => markImageLoaded(secondaryA)}
													/>
												</button>
												<button
													type="button"
													className="block h-1/2 overflow-hidden rounded-[14px] border border-white/10 bg-slate-900/80"
													onClick={() => setSelectedImage(secondaryB)}
												>
													<img
														src={secondaryB}
														alt="Rozgar Yatra moment"
														className={`h-full w-full aspect-[4/3] object-cover transition duration-700 hover:scale-[1.04] ${loadedImages[secondaryB] ? 'opacity-100 blur-0' : 'opacity-60 blur-md scale-[1.03]'}`}
														loading="lazy"
														decoding="async"
														onLoad={() => markImageLoaded(secondaryB)}
													/>
												</button>
											</div>
										</div>
									)
								})}
							</motion.div>

							{/* Row 2: Moves Right */}
							<motion.div
								className="flex w-max gap-3"
								animate={{ x: ['-50%', '0%'] }}
								transition={{ duration: 340, ease: 'linear', repeat: Infinity }}
							>
								{[...galleryTriples, ...galleryTriples].reverse().map((triple, index) => {
									const primary = triple[0]
									const secondaryA = triple[1] ?? triple[0]
									const secondaryB = triple[2] ?? triple[1] ?? triple[0]

									return (
										<div key={`r2-triple-${index}`} className="flex shrink-0 items-stretch gap-2 rounded-[20px] border border-white/10 bg-slate-950/70 p-2 flex-row-reverse">
											<button
												type="button"
												className="block w-[180px] shrink-0 overflow-hidden rounded-[16px] border border-white/10 bg-slate-900/80"
												onClick={() => setSelectedImage(primary)}
											>
												<img
													src={primary}
													alt="Rozgar Yatra highlight"
													className={`h-full w-full aspect-[9/16] object-cover transition duration-700 hover:scale-[1.03] ${loadedImages[primary] ? 'opacity-100 blur-0' : 'opacity-60 blur-md scale-[1.04]'}`}
													loading="lazy"
													decoding="async"
													onLoad={() => markImageLoaded(primary)}
												/>
											</button>

											<div className="flex w-[140px] shrink-0 flex-col gap-2">
												<button
													type="button"
													className="block h-1/2 overflow-hidden rounded-[14px] border border-white/10 bg-slate-900/80"
													onClick={() => setSelectedImage(secondaryA)}
												>
													<img
														src={secondaryA}
														alt="Rozgar Yatra moment"
														className={`h-full w-full aspect-[4/3] object-cover transition duration-700 hover:scale-[1.04] ${loadedImages[secondaryA] ? 'opacity-100 blur-0' : 'opacity-60 blur-md scale-[1.03]'}`}
														loading="lazy"
														decoding="async"
														onLoad={() => markImageLoaded(secondaryA)}
													/>
												</button>
												<button
													type="button"
													className="block h-1/2 overflow-hidden rounded-[14px] border border-white/10 bg-slate-900/80"
													onClick={() => setSelectedImage(secondaryB)}
												>
													<img
														src={secondaryB}
														alt="Rozgar Yatra moment"
														className={`h-full w-full aspect-[4/3] object-cover transition duration-700 hover:scale-[1.04] ${loadedImages[secondaryB] ? 'opacity-100 blur-0' : 'opacity-60 blur-md scale-[1.03]'}`}
														loading="lazy"
														decoding="async"
														onLoad={() => markImageLoaded(secondaryB)}
													/>
												</button>
											</div>
										</div>
									)
								})}
							</motion.div>
						</div>
					</div>
				</section>

				<section id="route" className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
					{/* 1. What Is Rojgar Yatra & Philosophy */}
					<div className="grid gap-6 lg:grid-cols-12 mb-20">
						{/* Intro Card */}
						<div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 sm:p-12 shadow-sm lg:col-span-12 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
							<div className="absolute right-0 top-0 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
								<Map className="w-96 h-96 -mt-20 -mr-20" />
							</div>
							<div className="relative z-10 max-w-4xl">
								<p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600 mb-4 flex items-center gap-2">
									<Activity className="w-5 h-5" /> Employment Movement
								</p>
								<h2 className="text-4xl font-black text-slate-900 sm:text-5xl md:text-6xl tracking-tight mb-6">What Is Rojgar Yatra?</h2>
								<p className="text-lg text-slate-600 leading-relaxed mb-4">
									Rojgar Yatra is an employment and workforce development initiative focused on connecting job seekers with the right career opportunities across India. We bridge the gap between industries and skilled manpower through recruitment drives, job fairs, campus placements, and awareness campaigns.
								</p>
								<p className="text-lg text-slate-600 leading-relaxed">
									We work with companies, industries, training institutes, and communities to provide opportunities for youth, freshers, skilled workers, and blue-collar candidates.
								</p>
							</div>
						</div>

						{/* Vision */}
						<div className="rounded-[2rem] bg-gradient-to-br from-blue-600 to-[#1A365D] p-8 sm:p-10 shadow-lg lg:col-span-6 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
							<div className="absolute right-0 bottom-0 opacity-10">
								<Eye className="w-48 h-48 -mb-10 -mr-10 group-hover:rotate-12 transition-transform duration-500" />
							</div>
							<div className="relative z-10 text-white">
								<div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md">
									<Eye className="w-7 h-7 text-blue-200" />
								</div>
								<h3 className="text-3xl font-black mb-4">Our Vision</h3>
								<p className="text-blue-100 text-lg leading-relaxed">
									To become India's most trusted employment movement by empowering youth with job opportunities, skill awareness, and career guidance across every state and district.
								</p>
							</div>
						</div>

						{/* Goal */}
						<div className="rounded-[2rem] bg-gradient-to-br from-orange-500 to-red-600 p-8 sm:p-10 shadow-lg lg:col-span-6 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
							<div className="absolute right-0 bottom-0 opacity-10">
								<Target className="w-48 h-48 -mb-10 -mr-10 group-hover:rotate-12 transition-transform duration-500" />
							</div>
							<div className="relative z-10 text-white">
								<div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md">
									<Target className="w-7 h-7 text-orange-200" />
								</div>
								<h3 className="text-3xl font-black mb-4">Our Goal</h3>
								<p className="text-orange-50 text-lg leading-relaxed">
									Build a strong employment ecosystem where deserving candidates get better futures and industries receive reliable manpower.
								</p>
							</div>
						</div>
					</div>

					{/* 2. Mission & What We Do Split */}
					<div className="grid gap-10 lg:grid-cols-2 mb-20">
						{/* Mission */}
						<div>
							<div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold tracking-widest text-blue-700 uppercase mb-6">
								<Heart className="h-4 w-4" />
								<span>Core Focus</span>
							</div>
							<h3 className="text-4xl font-black text-slate-900 mb-8">Our Mission</h3>
							<ul className="space-y-6">
								{[
									"Provide genuine and transparent job opportunities.",
									"Reduce unemployment among youth and skilled workers.",
									"Connect industries with the right manpower.",
									"Conduct employment drives in rural and urban areas.",
									"Create awareness about career growth and industrial opportunities.",
									"Support candidates with guidance and placement assistance."
								].map((mission, i) => (
									<motion.li 
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true, margin: "-100px" }}
										transition={{ delay: i * 0.1 }}
										key={i} 
										className="flex gap-4 items-start group"
									>
										<div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
											<Check className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" />
										</div>
										<p className="text-xl text-slate-700 font-medium leading-relaxed">{mission}</p>
									</motion.li>
								))}
							</ul>
						</div>

						{/* What We Do Grid */}
						<div>
							<div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold tracking-widest text-orange-700 uppercase mb-6">
								<Briefcase className="h-4 w-4" />
								<span>Operations</span>
							</div>
							<h3 className="text-4xl font-black text-slate-900 mb-8">What We Do</h3>
							<div className="grid sm:grid-cols-2 gap-4">
								{[
									{ icon: Users, text: "Large-scale employment drives across industries." },
									{ icon: GraduationCap, text: "Campus recruitment with colleges, ITIs, diploma institutes, and training centers." },
									{ icon: Megaphone, text: "Job awareness campaigns for opportunities and career options." },
									{ icon: Lightbulb, text: "Skill and career guidance based on industry demand." },
									{ icon: Handshake, text: "Industrial hiring support for manufacturing, automotive, logistics, and production." },
									{ icon: MapPin, text: "Rural outreach for villages and small towns." }
								].map((item, i) => (
									<motion.div 
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, margin: "-100px" }}
										transition={{ delay: i * 0.1 }}
										key={i} 
										className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 group"
									>
										<item.icon className="w-8 h-8 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
										<p className="text-slate-700 font-medium leading-snug">{item.text}</p>
									</motion.div>
								))}
							</div>
						</div>
					</div>

					{/* 3. How It Works & Presence */}
					<div className="rounded-[3rem] bg-[#1A365D] px-6 py-16 sm:px-16 sm:py-20 mb-20 relative overflow-hidden shadow-2xl">
						{/* Background Map Effect */}
						<div className="absolute right-0 top-0 opacity-[0.05] pointer-events-none">
							<Map className="w-[800px] h-[800px] -mt-40 -mr-40" />
						</div>
						
						<div className="grid gap-16 lg:grid-cols-2 relative z-10">
							{/* How it works */}
							<div>
								<h3 className="text-3xl sm:text-4xl font-black text-white mb-6">How Rojgar Yatra Works</h3>
								<p className="text-lg text-slate-300 mb-10 leading-relaxed">
									To expand employment opportunities across India, Rojgar Yatra operates through a dedicated outreach team with <strong className="text-[#FF8C00]">4 branded vehicles</strong> covering rural and urban areas. Each vehicle carries branding, contact details, job info, and QR code registrations.
								</p>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									{[
										"Speaker Announcements",
										"Wall Posters & A3 Banners",
										"Pocket Banner Distribution",
										"QR Registration Support"
									].map((step, i) => (
										<div key={i} className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-colors">
											<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
												<span className="font-black text-blue-400">0{i + 1}</span>
											</div>
											<span className="font-bold text-white">{step}</span>
										</div>
									))}
								</div>
							</div>

							{/* Presence and Team */}
							<div className="flex flex-col justify-center">
								<h3 className="text-3xl sm:text-4xl font-black text-white mb-8">Presence and Team</h3>
								<div className="space-y-6">
									<div className="flex items-start gap-4">
										<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500/20">
											<MapPin className="h-6 w-6 text-orange-400" />
										</div>
										<div>
											<h4 className="text-xl font-bold text-white">Active Across Regions</h4>
											<p className="text-slate-400 mt-1">Villages, towns, industrial areas, urban cities, and institutes.</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20">
											<Truck className="h-6 w-6 text-emerald-400" />
										</div>
										<div>
											<h4 className="text-xl font-bold text-white">Dedicated Fleet</h4>
											<p className="text-slate-400 mt-1">4 dedicated outreach vehicles actively touring.</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/20">
											<Users className="h-6 w-6 text-blue-400" />
										</div>
										<div>
											<h4 className="text-xl font-bold text-white">Ground Teams</h4>
											<p className="text-slate-400 mt-1">Ground marketing teams, recruitment coordinators, and digital registration support.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* 4. FAQs & Commitment */}
					<div className="grid gap-10 lg:grid-cols-12">
						{/* Commitment */}
						<div className="lg:col-span-4 flex flex-col justify-center">
							<div className="rounded-[2.5rem] border border-orange-200 bg-gradient-to-b from-orange-50 to-white p-10 shadow-lg relative overflow-hidden group hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
								<div className="absolute -right-6 -top-6 text-orange-200 opacity-50 group-hover:scale-110 transition-transform duration-500">
									<Heart className="w-32 h-32" />
								</div>
								<h4 className="text-3xl font-black text-orange-600 mb-6 relative z-10">Our Commitment</h4>
								<p className="text-xl text-slate-800 leading-relaxed font-medium relative z-10">
									"Rojgar Yatra is not just a recruitment campaign. It is an employment movement focused on taking genuine opportunities directly to people through outreach, awareness, and industry collaboration."
								</p>
							</div>
						</div>

						{/* FAQs */}
						<div className="lg:col-span-8 rounded-[2.5rem] border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
							<h3 className="text-3xl font-black text-[#1A365D] mb-8 flex items-center gap-3">
								<Lightbulb className="h-8 w-8 text-orange-500" />
								Frequently Asked Questions
							</h3>
							<div className="space-y-4">
								{faqItems.map((faq, index) => {
									const isOpen = openFaqIndex === index
									return (
										<div key={index} className="overflow-hidden rounded-2xl border border-slate-200 transition-colors hover:border-blue-300">
											<button
												type="button"
												className="flex w-full items-center justify-between bg-white px-6 py-5 text-left focus:outline-none"
												onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
											>
												<span className="font-bold text-slate-900 text-lg pr-4">{faq.question}</span>
												<span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? 'bg-[#FF8C00] text-white' : 'bg-slate-100 text-slate-500'}`}>
													{isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
												</span>
											</button>
											<AnimatePresence>
												{isOpen && (
													<motion.div
														initial={{ height: 0, opacity: 0 }}
														animate={{ height: 'auto', opacity: 1 }}
														exit={{ height: 0, opacity: 0 }}
														transition={{ duration: 0.3, ease: "easeInOut" }}
													>
														<div className="border-t border-slate-100 bg-slate-50 px-6 py-5">
															<p className="text-slate-700 text-lg leading-relaxed">{faq.answer}</p>
														</div>
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</section>
			</main>

			{selectedImage ? (
				<div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/85 px-4 py-8" onClick={() => setSelectedImage('')}>
					<button
						type="button"
						className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xl text-white backdrop-blur"
						onClick={() => setSelectedImage('')}
					>
						x
					</button>
					<img
						src={selectedImage}
						alt="Rojgar Yatra preview"
						className="max-h-full max-w-full rounded-2xl border border-white/20 object-contain shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
						onClick={(e) => e.stopPropagation()}
					/>
				</div>
			) : null}

			<Footer />
		</div>
	)
}
