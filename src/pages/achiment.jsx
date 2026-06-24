import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
	Trophy,
	Medal,
	Award,
	Star,
	Shield,
	BadgeCheck,
	Badge,
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
	X,
	Sparkles,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getPageAsset, usePageAssets } from '../hooks/usePageAssets'
import { useSectionReveal } from '../hooks/useSectionReveal'
import AwardsSectionComponent from '../components/AwardsSection'
import ClientVoicesSection from '../components/ClientVoicesSection'
import { extractMediaUrl, fetchTestimonials, STRAPI_BASE_URL, fetchCollection } from '../utils/strapi'


function renderFloatingLogo(logo) {
	if (logo.src) {
		return (
			<img 
				src={logo.src} 
				alt={logo.name} 
				className="block max-h-7 max-w-[85%] object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.02)] select-none" 
				loading="eager"
				draggable={false}
			/>
		);
	}

	const key = String(logo.name || '').trim().toUpperCase();
	switch (key) {
		case 'HAIER':
			return <span className="text-[#005A9C] font-sans font-black tracking-widest text-[9px] uppercase select-none">Haier</span>;
		case 'LG':
			return (
				<div className="flex items-center gap-0.5 scale-90 select-none">
					<div className="relative flex h-4.5 w-4.5 flex-shrink-0 items-center justify-center rounded-full bg-[#A50034]">
						<span className="absolute left-[2.5px] top-[1.5px] text-[7px] font-black text-white font-sans leading-none">L</span>
						<span className="absolute right-[3px] bottom-[2px] text-[5.5px] font-black text-white font-sans leading-none">G</span>
					</div>
					<span className="text-[#A50034] font-sans font-black text-[9px] leading-none">LG</span>
				</div>
			);
		case 'HYUNDAI':
			return (
				<div className="flex flex-col items-center scale-90 leading-none select-none">
					<span className="flex h-3.5 w-5 items-center justify-center rounded-full border border-[#002C5F] text-[6.5px] font-black text-[#002C5F] -skew-x-12 italic">H</span>
					<span className="text-[#002C5F] font-sans font-black text-[7px] mt-0.5 uppercase tracking-tighter">HYUNDAI</span>
				</div>
			);
		case 'JCB':
			return (
				<div className="flex flex-col items-center leading-none scale-90 bg-amber-400 p-1.5 rounded-md border border-amber-500 shadow-sm select-none">
					<span className="text-black font-sans font-black text-[9px] tracking-wide">JCB</span>
				</div>
			);
		case 'TATA AUTOCOMP':
		case 'TATA':
			return (
				<div className="flex flex-col items-center leading-none scale-90 select-none">
					<span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#005A9C] text-[7.5px] font-bold text-white">T</span>
					<span className="text-[#005A9C] font-sans font-black text-[8px] mt-0.5 tracking-wide">TATA</span>
				</div>
			);
		case 'FIAT':
			return (
				<div className="flex items-center gap-0.5 scale-90 select-none">
					<span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#8F1630] text-[5px] font-bold text-[#8F1630]">F</span>
					<span className="text-[#8F1630] font-serif font-black tracking-wider text-[9px] uppercase italic">FIAT</span>
				</div>
			);
		default:
			return <span className="text-slate-800 font-extrabold text-[9.5px] tracking-wider uppercase select-none">{logo.name}</span>;
	}
}

function AwardsHero() {
	const { isVisible, sectionRef } = useSectionReveal(0.25)
	const [count, setCount] = useState({ years: 0, workers: 0, clients: 0, awardsWon: 0 })
	const pageAssets = usePageAssets()
	const achievementsHeroAsset = getPageAsset(pageAssets, 'achievements.hero', '/ABOUT.jpeg', 'TSPL achievements')

	// Dynamic CMS logos from backend
	const [cmsLogos, setCmsLogos] = useState([]);

	useEffect(() => {
		if (!STRAPI_BASE_URL) return;
		(async () => {
			try {
				const data = await fetchCollection('/api/client-logos?populate=logo&sort=order:asc&pagination[pageSize]=100');
				const mapped = data
					.map((entry) => {
						const logoUrl = extractMediaUrl(entry.logo);
						const name = entry.name;
						const version = entry.updatedAt || entry.logo?.updatedAt || entry.documentId || entry.id;
						return {
							src: logoUrl ? `${logoUrl}${logoUrl.includes('?') ? '&' : '?'}v=${encodeURIComponent(version)}` : null,
							name: name || 'Company logo',
						};
					})
					.filter((item) => Boolean(item.src || item.name));
				setCmsLogos(mapped);
			} catch {
				// preserve fallbacks
			}
		})();
	}, []);

	// Symmetrically map floating brands by dynamic matching from the backend CMS entries
	const getConstellationLogo = (fallbackName) => {
		const match = cmsLogos.find((item) => {
			const itemName = String(item.name || '').toUpperCase().trim();
			const targetName = String(fallbackName).toUpperCase().trim();
			return itemName === targetName || itemName.includes(targetName) || targetName.includes(itemName);
		});

		if (match && match.src) {
			return { name: fallbackName, src: match.src };
		}
		return { name: fallbackName, src: null };
	};

	const haierLogo = getConstellationLogo('Haier');
	const lgLogo = getConstellationLogo('LG');
	const hyundaiLogo = getConstellationLogo('Hyundai');
	const jcbLogo = getConstellationLogo('JCB');
	const tataLogo = getConstellationLogo('TATA');
	const fiatLogo = getConstellationLogo('FIAT');

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



	return (
		<section ref={sectionRef} className="relative min-h-[105svh] md:min-h-[90vh] overflow-hidden bg-white pt-28 pb-12 md:pt-24">
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

						<h1 className="text-3xl sm:text-5xl font-bold leading-tight text-gray-900 lg:text-7xl">
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

							{/* Center Top: Symmetrical #1 Rank Badge */}
							<div className="absolute left-1/2 top-[-2rem] -translate-x-1/2 z-20">
								<div className="flex h-12 w-28 items-center justify-center rounded-full bg-gradient-to-r from-blue-700 to-[#0f2a4d] border border-blue-500/30 text-white shadow-xl shadow-blue-500/25 animate-bounce py-1.5 px-3">
									<span className="text-xs font-black uppercase tracking-wider text-orange-400">Rank #1</span>
								</div>
							</div>

							{/* FLOATING BRAND badges surrounding the Trophy */}
							{/* Haier (Top-Left) */}
							<div className="absolute left-[-1rem] top-[8%] z-10 animate-[bounce_3.5s_infinite_ease-in-out]">
								<div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-slate-100 bg-white/95 shadow-md p-1.5 hover:scale-110 hover:shadow-xl transition-all duration-300">
									{renderFloatingLogo(haierLogo)}
								</div>
							</div>

							{/* LG (Top-Right) */}
							<div className="absolute right-[-1rem] top-[8%] z-10 animate-[bounce_4.2s_infinite_ease-in-out_0.5s]">
								<div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-slate-100 bg-white/95 shadow-md p-1.5 hover:scale-110 hover:shadow-xl transition-all duration-300">
									{renderFloatingLogo(lgLogo)}
								</div>
							</div>

							{/* Hyundai (Mid-Left) */}
							<div className="absolute left-[-3.5rem] top-[42%] z-10 animate-[bounce_4.8s_infinite_ease-in-out_1s]">
								<div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-slate-100 bg-white/95 shadow-md p-1.5 hover:scale-110 hover:shadow-xl transition-all duration-300">
									{renderFloatingLogo(hyundaiLogo)}
								</div>
							</div>

							{/* JCB (Mid-Right) */}
							<div className="absolute right-[-3.5rem] top-[42%] z-10 animate-[bounce_3.9s_infinite_ease-in-out_1.5s]">
								<div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-slate-100 bg-white/95 shadow-md p-1.5 hover:scale-110 hover:shadow-xl transition-all duration-300">
									{renderFloatingLogo(jcbLogo)}
								</div>
							</div>

							{/* TATA (Bottom-Left) */}
							<div className="absolute left-[-0.5rem] bottom-[4%] z-10 animate-[bounce_5.2s_infinite_ease-in-out_2s]">
								<div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-slate-100 bg-white/95 shadow-md p-1.5 hover:scale-110 hover:shadow-xl transition-all duration-300">
									{renderFloatingLogo(tataLogo)}
								</div>
							</div>

							{/* Fiat (Bottom-Right) */}
							<div className="absolute right-[-0.5rem] bottom-[4%] z-10 animate-[bounce_4.4s_infinite_ease-in-out_2.5s]">
								<div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-slate-100 bg-white/95 shadow-md p-1.5 hover:scale-110 hover:shadow-xl transition-all duration-300">
									{renderFloatingLogo(fiatLogo)}
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</section>
	)
}

const milestones = [
	{
		year: '2011',
		title: 'Company Incorporated',
		description: 'TSPL Group was founded, beginning its mission to provide workforce solutions and professional HR services.',
		icon: Building2,
		color: 'blue',
		image: '/achivments/WhatsApp Image 2026-05-04 at 5.34.10 PM (4).jpeg'
	},
	{
		year: '2016',
		title: 'Authorized NAPS TPA',
		description: 'Appointed as an official Third-Party Aggregator for NAPS, scaling operations across Maharashtra and beyond.',
		icon: Shield,
		color: 'orange',
		image: '/achivments/WhatsApp Image 2026-05-04 at 5.34.10 PM (3).jpeg'
	},
	{
		year: '2018',
		title: '10,000+ Apprentices Trained',
		description: 'Crossed the major milestone of upskilling and training over 10,000 apprentices under premium corporate clients.',
		icon: Users,
		color: 'green',
		image: '/achivments/WhatsApp Image 2026-05-04 at 5.34.10 PM (2).jpeg'
	},
	{
		year: '2024',
		title: 'World Record & Excellence',
		description: 'Awarded the World Book of Records and named Fastest Growing Indian Company Excellence Award Winner.',
		icon: Trophy,
		color: 'purple',
		image: '/achivments/WhatsApp Image 2026-05-04 at 5.34.10 PM (1).jpeg'
	}
]

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
		<section ref={sectionRef} className="relative overflow-hidden bg-slate-50 py-12 sm:py-16 md:py-24">
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

function AchievementsGallery() {
	const { isVisible, sectionRef } = useSectionReveal(0.15)
	const [hoveredIndex, setHoveredIndex] = useState(null)
	const [selectedImage, setSelectedImage] = useState(null)

	const achievements = [
		{ id: 10, image: '/achivments/WhatsApp Image 2026-05-04 at 5.34.10 PM.jpeg', title: '1ST RANK ΤΡΑ FOR NATS 2023-24 MUMBAI', category: 'Social Responsibility' },
		{ id: 1, image: '/achivments/WhatsApp Image 2026-05-04 at 5.34.10 PM (1).jpeg', title: 'WORLD BOOK OF RECORD HOLDER DELHI', category: 'Corporate Recognition' },
		{ id: 2, image: '/achivments/WhatsApp Image 2026-05-04 at 5.34.10 PM (2).jpeg', title: 'OUTSTANDING ACHIEVEMENTAWARD CHENNAI', category: 'HR Excellence' },
		{ id: 3, image: '/achivments/WhatsApp Image 2026-05-04 at 5.34.10 PM (3).jpeg', title: 'LEADING EMERGING SKILL DEVELOPMENT COMPANY OF THE YEAR 2023 GOA', category: 'Business Growth' },
		{ id: 4, image: '/achivments/WhatsApp Image 2026-05-04 at 5.34.10 PM (4).jpeg', title: 'FASTEST GROWING INDIAN COMPANY EXCELLENCE AWARD DELHI', category: 'ISO Standards' },
		{ id: 5, image: '/achivments/WhatsApp Image 2026-05-04 at 5.34.10 PM (5).jpeg', title: 'GLOBAL SKILLING & STAFFING LEADERSHIP ACHIEVERS AWARD THAILAND', category: 'Service Quality' },
		{ id: 8, image: '/achivments/WhatsApp Image 2026-05-04 at 5.34.10 PM (8).jpeg', title: 'Outstanding Business Leadership Award at the International Achievers Awards Dubai', category: 'Technology' },
		{ id: 9, image: '/achivments/WhatsApp Image 2026-05-04 at 5.34.10 PM (9).jpeg', title: 'LEADING EMERGING INDIAN COMPANY THAILAND', category: 'Green Initiative' },
	]

	return (
		<section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-12 sm:py-16 md:py-24">
			<div className="absolute inset-0 opacity-[0.02]">
				<svg className="h-full w-full">
					<pattern id="achievement-grid-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
						<circle cx="25" cy="25" r="1" fill="#2563EB" />
					</pattern>
					<rect width="100%" height="100%" fill="url(#achievement-grid-pattern)" />
				</svg>
			</div>

			<div className="relative mx-auto max-w-7xl px-6 lg:px-8">
				<div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
					<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-orange-100 px-4 py-2 text-transparent bg-clip-text">
						<Badge className="h-4 w-4 text-blue-600" />
						<span className="text-sm font-semibold text-blue-600">Awards & Achievements</span>
					</div>
					<h2 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl">
						Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-orange-500">Recognition Gallery</span>
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-gray-600">
						Celebrating our milestones and achievements that reflect our commitment to excellence and innovation.
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{achievements.map((achievement, index) => (
						<div
							key={achievement.id}
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(null)}
							className={`group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${hoveredIndex === index ? '-translate-y-2 shadow-2xl shadow-blue-500/20' : ''}`}
							style={{ transitionDelay: `${index * 50}ms` }}
						>
							<div className="h-64 cursor-pointer overflow-hidden bg-gray-100" onClick={() => setSelectedImage(achievement.image)}>
								<img
									src={achievement.image}
									alt={achievement.title}
									className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							</div>

							<div className="bg-white p-5 text-center transition-colors duration-300 group-hover:bg-blue-50/70">
								<h3 className="text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
									{achievement.title}
								</h3>
							</div>
						</div>
					))}
				</div>

				{/* Bottom CTA */}
				<div className={`mt-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
					<p className="mb-6 text-lg text-gray-600">
						Ready to be part of our success story?
					</p>
					<Link
						to="/contact-us"
						className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105"
					>
						Get in Touch Today
						<ArrowRight className="h-5 w-5" />
					</Link>
				</div>
			</div>

			{/* Image Modal */}
			{selectedImage && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
					<button
						className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
						onClick={() => setSelectedImage(null)}
					>
						<X className="h-6 w-6" />
					</button>
					<div className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl" onClick={(e) => e.stopPropagation()}>
						<img src={selectedImage} alt="Achievement full size" className="max-h-[90vh] w-auto max-w-full object-contain" />
					</div>
				</div>
			)}
		</section>
	)
}

function AchievementsCta() {
	const { isVisible, sectionRef } = useSectionReveal(0.1)

	return (
		<section ref={sectionRef} className="relative flex items-center overflow-hidden bg-[#0A0A0B] px-6 pt-28 pb-12 lg:pt-0 lg:pb-0 lg:h-[100svh] lg:min-h-[700px] lg:px-8">
			{/* Animated Mesh Gradient Background */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -left-[15%] -top-[20%] h-[60%] w-[60%] rounded-full bg-[#2563EB] opacity-[0.07] blur-[120px]" style={{ animation: 'pulse 8s ease-in-out infinite' }} />
				<div className="absolute -right-[10%] bottom-[5%] h-[50%] w-[50%] rounded-full bg-[#F97316] opacity-[0.07] blur-[120px]" style={{ animation: 'pulse 10s ease-in-out infinite 3s' }} />
				<div className="absolute left-[50%] top-[50%] h-[25%] w-[25%] rounded-full bg-[#8B5CF6] opacity-[0.05] blur-[100px]" style={{ animation: 'pulse 12s ease-in-out infinite 1s' }} />
			</div>
			{/* Dot Grid */}
			<div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

			<div className="relative z-10 mx-auto w-full max-w-7xl py-16 lg:py-0">
				<div className={`grid gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} lg:grid-cols-2 lg:gap-12`}>
					
					{/* Left Column — Headline + CTA Cards */}
					<div className="flex flex-col justify-center">
						<div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
							<Rocket className="h-4 w-4 text-[#F97316]" />
							<span className="text-xs font-bold uppercase tracking-widest text-[#F97316]">Join Our Network</span>
						</div>
						<h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
							Be Part of Our{' '}
							<span className="bg-gradient-to-r from-[#60A5FA] via-[#A78BFA] to-[#F97316] bg-clip-text text-transparent">
								Success Story
							</span>
						</h2>
						<p className="mb-10 max-w-lg text-base text-gray-400 leading-relaxed">
							Join hundreds of companies who have transformed their workforce management with TSPL Group.
						</p>

						{/* Two CTA Cards Side-by-Side */}
						<div className="grid gap-4 sm:grid-cols-2">
							{/* For Companies */}
							<div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:border-[#2563EB]/40 hover:bg-white/[0.06]">
								<div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#2563EB] opacity-10 blur-2xl transition-all duration-500 group-hover:opacity-25 group-hover:scale-150" />
								<div className="relative z-10">
									<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] shadow-lg shadow-blue-500/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
										<Building2 className="h-6 w-6 text-white" />
									</div>
									<h3 className="mb-2 text-lg font-bold text-white">For Companies</h3>
									<p className="mb-4 text-sm leading-relaxed text-gray-400">
										Reliable manpower, payroll & compliance under one roof.
									</p>
									<Link
										to="/b2b"
										className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#1D4ED8] hover:scale-105"
									>
										Partner With Us
										<ArrowRight className="h-4 w-4" />
									</Link>
								</div>
							</div>

							{/* For Job Seekers */}
							<div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:border-[#F97316]/40 hover:bg-white/[0.06]">
								<div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#F97316] opacity-10 blur-2xl transition-all duration-500 group-hover:opacity-25 group-hover:scale-150" />
								<div className="relative z-10">
									<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#F97316] to-[#EA580C] shadow-lg shadow-orange-500/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
										<Users className="h-6 w-6 text-white" />
									</div>
									<h3 className="mb-2 text-lg font-bold text-white">For Job Seekers</h3>
									<p className="mb-4 text-sm leading-relaxed text-gray-400">
										Find opportunities across all skill levels and industries.
									</p>
									<Link
										to="/skilled"
										className="inline-flex items-center gap-2 rounded-lg bg-[#F97316] px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#EA580C] hover:scale-105"
									>
										Browse Jobs
										<ArrowRight className="h-4 w-4" />
									</Link>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column — Contact + Stats */}
					<div className="flex flex-col justify-center gap-4">
						{/* Stats Row */}
						<div className="grid grid-cols-3 gap-3">
							{[
								{ value: '450+', label: 'Partners', color: '#2563EB' },
								{ value: '40K+', label: 'Workers', color: '#F97316' },
								{ value: '25+', label: 'States', color: '#8B5CF6' },
							].map((stat) => (
								<div key={stat.label} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center transition-all duration-500 hover:border-white/20 hover:bg-white/[0.06]">
									<div className="text-2xl font-extrabold lg:text-3xl" style={{ color: stat.color }}>{stat.value}</div>
									<div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500">{stat.label}</div>
								</div>
							))}
						</div>

						{/* Get In Touch Card */}
						<div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:border-[#A78BFA]/30 hover:bg-white/[0.06]">
							<div className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-[#8B5CF6] opacity-10 blur-3xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-150" />
							<div className="relative z-10">
								<div className="mb-4 flex items-center gap-3">
									<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] shadow-lg shadow-purple-500/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
										<Globe className="h-6 w-6 text-white" />
									</div>
									<h3 className="text-xl font-bold text-white">Get In Touch</h3>
								</div>
								<div className="grid gap-2.5 sm:grid-cols-1">
									<a href="tel:+917397971322" className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 text-gray-300 no-underline transition-all duration-300 hover:border-[#8B5CF6]/30 hover:bg-white/[0.06] hover:text-white">
										<div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#8B5CF6]/20">
											<Phone className="h-4 w-4 text-[#A78BFA]" />
										</div>
										<span className="text-sm font-medium">+91 7397971322</span>
									</a>
									<a href="mailto:info@tsplgroup.in" className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 text-gray-300 no-underline transition-all duration-300 hover:border-[#8B5CF6]/30 hover:bg-white/[0.06] hover:text-white">
										<div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#8B5CF6]/20">
											<Mail className="h-4 w-4 text-[#A78BFA]" />
										</div>
										<span className="text-sm font-medium">info@tsplgroup.in</span>
									</a>
									<div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 text-gray-300">
										<div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#8B5CF6]/20">
											<MapPin className="h-4 w-4 text-[#A78BFA]" />
										</div>
										<span className="text-sm font-medium">Chakan, Pune, Maharashtra, India</span>
									</div>
								</div>
							</div>
						</div>

						{/* Bottom Tagline */}
						<div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#2563EB]/10 via-[#8B5CF6]/10 to-[#F97316]/10 p-5 text-center backdrop-blur-sm">
							<p className="text-sm font-medium text-gray-400">
								Trusted by <span className="font-bold text-white">450+</span> companies across <span className="font-bold text-white">25+</span> states in India
							</p>
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
				<ClientVoicesSection />
				<AchievementsGallery />
				<AchievementsCta />
			</main>
			<Footer />
		</div>
	)
}
