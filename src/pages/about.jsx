import { ArrowRight, Trophy, Building2, MapPin, Calendar, Target, Eye, Heart, Shield, Users, Lightbulb, HandHeart, Award } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getPageAsset, usePageAssets } from '../hooks/usePageAssets'

const milestones = [
	{ year: '2014', title: 'Company Founded', description: 'Started with a small team of 5 people' },
	{ year: '2016', title: '100+ Companies', description: 'Partnered with 100 businesses across India' },
	{ year: '2018', title: '10,000 Workers', description: 'Helped 10,000 workers find jobs' },
	{ year: '2020', title: 'NAPS Authorized', description: 'Became government authorized for NAPS' },
	{ year: '2022', title: 'Pan-India Presence', description: 'Expanded to 20+ cities across India' },
	{ year: '2024', title: '40,000+ Placements', description: 'Crossed 40,000 successful placements' },
]

const achievements = [
	{ icon: Trophy, number: '40,000+', label: 'Workers Placed' },
	{ icon: Building2, number: '400+', label: 'Partner Companies' },
	{ icon: MapPin, number: '20+', label: 'Cities Covered' },
	{ icon: Calendar, number: '10+', label: 'Years Experience' },
]

const values = [
	{ icon: Heart, title: 'Care', description: 'We care for every worker like family', color: '#F97316' },
	{ icon: Shield, title: 'Trust', description: 'We always keep our promises', color: '#2563EB' },
	{ icon: Users, title: 'Teamwork', description: 'We grow together as one team', color: '#F97316' },
	{ icon: Lightbulb, title: 'Learning', description: 'We help everyone learn new skills', color: '#2563EB' },
	{ icon: HandHeart, title: 'Respect', description: 'We treat everyone with respect', color: '#F97316' },
	{ icon: Award, title: 'Quality', description: 'We deliver the best results always', color: '#2563EB' },
]

const teamData = {
	ceo: {
		name: 'Rajesh Kumar',
		role: 'Founder & CEO',
		image: '/images/team/ceo.jpg',
		description: 'Leading TSPL Group since 2014',
	},
	directors: [
		{
			name: 'Priya Sharma',
			role: 'Director of Operations',
			image: '/images/team/director1.jpg',
			description: 'Oversees all operational activities',
		},
		{
			name: 'Amit Patel',
			role: 'Director of Training',
			image: '/images/team/director2.jpg',
			description: 'Manages all training programs',
		},
	],
	managers: [
		{ name: 'Sunita Verma', role: 'HR Manager', image: '/images/team/manager1.jpg' },
		{ name: 'Vikram Singh', role: 'Training Manager', image: '/images/team/manager2.jpg' },
		{ name: 'Meera Joshi', role: 'Client Relations', image: '/images/team/manager3.jpg' },
	],
}

function Leaf({ className = '', style = {} }) {
	return (
		<svg viewBox="0 0 20 28" className={className} style={style} fill="#22C55E">
			<path d="M10 0C10 0 3 7 3 15C3 21 6 26 10 28C14 26 17 21 17 15C17 7 10 0 10 0Z" />
			<path d="M10 6V24" stroke="#166534" strokeWidth="0.8" fill="none" opacity="0.4" />
		</svg>
	)
}

function AboutHero({ resolveAsset }) {
	const aboutHeroAsset = resolveAsset(
		'about.hero',
		'https://backend.tsplgroup.co.in/uploads/Whats_App_Image_2026_04_16_at_10_53_25_3_1d589b7f92.jpeg',
		'TSPL Group team'
	)

	return (
		<section className="relative min-h-[600px] overflow-hidden pb-20 pt-32">
			<div className="absolute inset-0">
				<img src={aboutHeroAsset.url} alt={aboutHeroAsset.alt} className="h-full w-full object-cover" />
				<div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/80 to-[#0F172A]/60" />
			</div>

			<div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-[#2563EB]/10 blur-3xl" />
			<div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-[#F97316]/8 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
				<div className="max-w-3xl">
					<div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
						<span className="text-sm font-semibold text-white">About TSPL Group</span>
					</div>

					<h1 className="mb-6 text-5xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl">
						Building India&apos;s
						<span className="mt-2 block text-[#2563EB]">Future Workforce</span>
					</h1>

					<p className="mb-10 max-w-2xl text-xl leading-relaxed text-white/80">
						We are a government-authorized staffing and skilling company dedicated to empowering workers and transforming businesses across India.
					</p>

					<Link to="/contact-us" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F97316] px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-[#F97316]/40 transition-all duration-300 hover:scale-105 hover:bg-[#EA580C]">
						Our Services
						<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
					</Link>

					<div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
						<div>
							<p className="text-4xl font-bold text-white">40K+</p>
							<p className="mt-1 text-white/60">Workers Placed</p>
						</div>
						<div>
							<p className="text-4xl font-bold text-[#2563EB]">400+</p>
							<p className="mt-1 text-white/60">Partner Companies</p>
						</div>
						<div>
							<p className="text-4xl font-bold text-white">20+</p>
							<p className="mt-1 text-white/60">Cities</p>
						</div>
						<div>
							<p className="text-4xl font-bold text-[#F97316]">10+</p>
							<p className="mt-1 text-white/60">Years Experience</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function OurStory({ resolveAsset }) {
	const whoWeAreAsset = resolveAsset(
		'about.mission',
		'https://backend.tsplgroup.co.in/uploads/TSPL_Logo_Sarang_Sir_1_55253e4a30.png',
		'TSPL Group mission - Training workers'
	)

	return (
		<section className="relative overflow-hidden bg-white py-20 lg:py-28">
			<div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#2563EB]/5 blur-3xl" />
			<div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#F97316]/5 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-4 py-2">
						<span className="text-sm font-bold text-[#2563EB]">OUR STORY</span>
					</div>
					<h2 className="mb-4 text-4xl font-bold text-[#0F172A] lg:text-5xl">Who We Are</h2>
					<p className="mx-auto max-w-2xl text-lg text-[#64748B]">
						A trusted partner in workforce development, helping businesses grow and workers succeed
					</p>
				</div>

				<div className="mb-20 grid items-center gap-12 lg:grid-cols-2">
					<div className="relative h-[400px] overflow-hidden rounded-3xl bg-white shadow-2xl">
						<img src={whoWeAreAsset.url} alt={whoWeAreAsset.alt} className="h-full w-full object-contain p-6 sm:p-8" />
						<div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 to-transparent" />
					</div>

					<div className="space-y-6">
						<p className="text-lg leading-relaxed text-[#475569]">
							<span className="text-2xl font-bold text-[#2563EB]">TSPL Group</span> was founded with a simple yet powerful mission: to bridge the gap between skilled workers and meaningful employment opportunities across India.
						</p>
						<p className="text-lg leading-relaxed text-[#475569]">
							We believe every worker deserves the chance to learn, grow, and succeed. Through our government-authorized programs like NAPS, NATS, and MAPS, we have helped over 40,000 individuals find their path to success.
						</p>
						<p className="text-lg leading-relaxed text-[#475569]">
							Our approach is simple: we train workers with real-world skills, connect them with trusted employers, and support them throughout their career journey.
						</p>
					</div>
				</div>

				<div className="grid gap-8 md:grid-cols-2">
					<div className="group rounded-3xl border border-[#2563EB]/20 bg-gradient-to-br from-[#DBEAFE] to-white p-8 transition-all duration-300 hover:shadow-xl">
						<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563EB] transition-transform group-hover:scale-110">
							<Target className="h-8 w-8 text-white" />
						</div>
						<h3 className="mb-4 text-2xl font-bold text-[#0F172A]">Our Mission</h3>
						<p className="text-lg leading-relaxed text-[#475569]">
							To empower every Indian worker with the skills and opportunities they need to build a better life for themselves and their families.
						</p>
					</div>

					<div className="group rounded-3xl border border-[#F97316]/20 bg-gradient-to-br from-[#FED7AA]/50 to-white p-8 transition-all duration-300 hover:shadow-xl">
						<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F97316] transition-transform group-hover:scale-110">
							<Eye className="h-8 w-8 text-white" />
						</div>
						<h3 className="mb-4 text-2xl font-bold text-[#0F172A]">Our Vision</h3>
						<p className="text-lg leading-relaxed text-[#475569]">
							To become India&apos;s most trusted workforce solutions partner, creating one million job opportunities by 2030.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

function OurValues() {
	return (
		<section className="relative overflow-hidden bg-white py-20 lg:py-28">
			<div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#2563EB]/5 blur-3xl" />
			<div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F97316]/5 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F97316]/20 bg-[#F97316]/10 px-4 py-2">
						<span className="text-sm font-bold text-[#F97316]">WHAT WE BELIEVE</span>
					</div>
					<h2 className="mb-4 text-4xl font-bold text-[#0F172A] lg:text-5xl">Our Values</h2>
					<p className="mx-auto max-w-2xl text-lg text-[#64748B]">Simple principles that guide everything we do</p>
				</div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{values.map((value) => (
						<div key={value.title} className="group relative rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl">
							<div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ backgroundColor: `${value.color}10` }} />

							<div className="relative z-10">
								<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: `${value.color}15` }}>
									<value.icon className="h-8 w-8" style={{ color: value.color }} />
								</div>
								<h3 className="mb-3 text-2xl font-bold text-[#0F172A]">{value.title}</h3>
								<p className="text-lg leading-relaxed text-[#64748B]">{value.description}</p>
							</div>

							<div className="absolute bottom-0 left-0 h-1 w-0 rounded-b-2xl transition-all duration-300 group-hover:w-full" style={{ backgroundColor: value.color }} />
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

function Achievements() {
	return (
		<section className="relative overflow-hidden bg-[#0F172A] py-20 lg:py-28">
			<div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
			<div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#2563EB]/20 blur-3xl" />
			<div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#F97316]/10 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
						<span className="text-sm font-bold text-white">OUR JOURNEY</span>
					</div>
					<h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">Our Achievements</h2>
					<p className="mx-auto max-w-2xl text-lg text-white/70">A decade of helping workers and businesses grow together</p>
				</div>

				<div className="mb-20 grid grid-cols-2 gap-6 lg:grid-cols-4">
					{achievements.map((item, i) => (
						<div key={item.label} className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:bg-white/10" style={{ animationDelay: `${i * 100}ms` }}>
							<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#2563EB]/20 transition-transform group-hover:scale-110">
								<item.icon className="h-7 w-7 text-[#2563EB]" />
							</div>
							<p className="mb-2 text-3xl font-bold text-white lg:text-4xl">{item.number}</p>
							<p className="text-white/60">{item.label}</p>
						</div>
					))}
				</div>

				<div className="relative">
					<h3 className="mb-12 text-center text-2xl font-bold text-white">Our Timeline</h3>
					<div className="absolute bottom-0 left-1/2 top-20 hidden w-1 -translate-x-1/2 bg-gradient-to-b from-[#2563EB] via-[#F97316] to-[#2563EB] lg:block" />

					<div className="relative space-y-8 lg:space-y-0">
						{milestones.map((milestone, i) => (
							<div
								key={`${milestone.year}-${milestone.title}`}
								className={`flex flex-col items-center gap-4 lg:flex-row lg:gap-8 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
								style={{ animationDelay: `${i * 150}ms` }}
							>
								<div className={`flex-1 ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
									<div className={`inline-block rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:bg-white/10 ${i % 2 === 0 ? 'lg:ml-auto' : 'lg:mr-auto'}`}>
										<p className="mb-2 text-sm font-bold text-[#F97316]">{milestone.year}</p>
										<h4 className="mb-2 text-xl font-bold text-white">{milestone.title}</h4>
										<p className="text-white/60">{milestone.description}</p>
									</div>
								</div>

								<div className="z-10 hidden h-6 w-6 shrink-0 rounded-full border-4 border-[#0F172A] bg-[#2563EB] lg:block" />
								<div className="hidden flex-1 lg:block" />
							</div>
						))}
					</div>
				</div>

				<div className="mt-20 text-center">
					<p className="mb-6 text-xl text-white/70">Ready to be part of our success story?</p>
					<Link to="/contact-us" className="rounded-xl bg-[#F97316] px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-[#F97316]/40 transition-all duration-300 hover:scale-105 hover:bg-[#EA580C]">
						Join Us Today
					</Link>
				</div>
			</div>
		</section>
	)
}

function TeamTree({ teamData }) {
	return (
		<section className="relative overflow-hidden py-20 lg:py-28">
			<div className="absolute inset-0 bg-gradient-to-b from-[#E8F5E9] via-[#F1F8E9] to-[#C8E6C9]" />

			<div className="pointer-events-none absolute inset-0">
				<Leaf className="absolute h-7 w-5 opacity-40 animate-pulse" style={{ top: '10%', left: '15%', transform: 'rotate(-20deg)' }} />
				<Leaf className="absolute h-6 w-4 opacity-50 animate-pulse" style={{ top: '20%', right: '20%', transform: 'rotate(25deg)', animationDelay: '1s' }} />
				<Leaf className="absolute h-8 w-6 opacity-35 animate-pulse" style={{ top: '40%', left: '8%', transform: 'rotate(-35deg)', animationDelay: '2s' }} />
				<Leaf className="absolute h-6 w-4 opacity-45 animate-pulse" style={{ top: '60%', right: '12%', transform: 'rotate(15deg)', animationDelay: '0.5s' }} />
			</div>

			<div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/15 px-4 py-2">
						<Leaf className="h-5 w-4" />
						<span className="text-sm font-bold text-[#166534]">OUR FAMILY TREE</span>
					</div>
					<h2 className="mb-4 text-4xl font-bold text-[#0F172A] lg:text-5xl">Growing Together</h2>
					<p className="mx-auto max-w-2xl text-lg text-[#64748B]">
						Like a tree, our team grows stronger with each branch - every member helps us reach new heights
					</p>
				</div>

				<div className="relative">
					<div className="relative z-10 mb-32 flex justify-center">
						<div className="relative">
							<div className="absolute -inset-6 rounded-full bg-gradient-to-b from-[#22C55E]/30 to-transparent blur-2xl" />
							<div className="relative w-64 rounded-3xl border-4 border-[#22C55E] bg-white p-6 shadow-2xl transition-all duration-300 hover:-translate-y-1">
								<div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-[#F97316] shadow-lg">
									<img src={teamData.ceo.image} alt={teamData.ceo.name} className="h-full w-full object-cover" />
								</div>
								<div className="text-center">
									<h3 className="text-xl font-bold text-[#0F172A]">{teamData.ceo.name}</h3>
									<p className="mt-1 font-bold text-[#F97316]">{teamData.ceo.role}</p>
									<p className="mt-2 text-sm text-[#64748B]">{teamData.ceo.description}</p>
								</div>
							</div>
						</div>
					</div>

					<div className="mb-20 grid gap-8 md:grid-cols-2">
						{teamData.directors.map((director) => (
							<div key={director.name} className="relative rounded-2xl border-2 border-[#2563EB] bg-white p-5 shadow-xl transition-all duration-300 hover:-translate-y-1">
								<div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#2563EB] px-3 py-1 text-xs font-bold text-white shadow-lg">
									DIRECTOR
								</div>
								<div className="relative mx-auto mb-3 h-[72px] w-[72px] overflow-hidden rounded-full border-2 border-[#2563EB]/40 shadow-md">
									<img src={director.image} alt={director.name} className="h-full w-full object-cover" />
								</div>
								<div className="text-center">
									<h3 className="text-base font-bold text-[#0F172A]">{director.name}</h3>
									<p className="mt-1 text-sm font-semibold text-[#2563EB]">{director.role}</p>
									<p className="mt-2 text-xs leading-relaxed text-[#64748B]">{director.description}</p>
								</div>
							</div>
						))}
					</div>

					<div className="grid gap-6 md:grid-cols-3">
						{teamData.managers.map((manager) => (
							<div key={manager.name} className="relative rounded-xl border-2 border-[#F97316]/60 bg-white p-4 shadow-lg transition-all duration-300 hover:-translate-y-1">
								<div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#F97316] px-2 py-0.5 text-[10px] font-bold text-white">
									MANAGER
								</div>
								<div className="relative mx-auto mb-2 h-14 w-14 overflow-hidden rounded-full border-2 border-[#F97316]/40 shadow">
									<img src={manager.image} alt={manager.name} className="h-full w-full object-cover" />
								</div>
								<div className="text-center">
									<h3 className="text-sm font-bold text-[#0F172A]">{manager.name}</h3>
									<p className="mt-1 text-xs font-medium text-[#F97316]">{manager.role}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default function AboutPage() {
	const pageAssets = usePageAssets()
	const resolveAsset = (key, fallbackUrl, fallbackAlt = '') => getPageAsset(pageAssets, key, fallbackUrl, fallbackAlt)
	const managedTeamData = {
		...teamData,
		ceo: {
			...teamData.ceo,
			image: resolveAsset('about.team.ceo', teamData.ceo.image).url,
		},
		directors: [
			{
				...teamData.directors[0],
				image: resolveAsset('about.team.director1', teamData.directors[0].image).url,
			},
			{
				...teamData.directors[1],
				image: resolveAsset('about.team.director2', teamData.directors[1].image).url,
			},
		],
		managers: [
			{
				...teamData.managers[0],
				image: resolveAsset('about.team.manager1', teamData.managers[0].image).url,
			},
			{
				...teamData.managers[1],
				image: resolveAsset('about.team.manager2', teamData.managers[1].image).url,
			},
			{
				...teamData.managers[2],
				image: resolveAsset('about.team.manager3', teamData.managers[2].image).url,
			},
		],
	}

	return (
		<div className="min-h-screen bg-white text-slate-800">
			<Navbar />
			<main>
				<AboutHero resolveAsset={resolveAsset} />
				<OurStory resolveAsset={resolveAsset} />
				<OurValues />
				<Achievements />
				<TeamTree teamData={managedTeamData} />
			</main>
			<Footer />
		</div>
	)
}
