import { ArrowRight, Trophy, Building2, MapPin, Calendar, Target, Eye, Heart, Shield, Users, Lightbulb, HandHeart, Award } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getPageAsset, usePageAssets } from '../hooks/usePageAssets'
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const milestones = [
	{ year: '2014', title: 'Company Founded', description: 'Started with a small team of 5 people' },
	{ year: '2016', title: '100+ Companies', description: 'Partnered with 100 businesses across India' },
	{ year: '2018', title: '10,000 Workers', description: 'Helped 10,000 workers find jobs' },
	{ year: '2020', title: 'NAPS Authorized', description: 'Became government authorized for NAPS' },
		/* { id: '8', name: 'Dheepan Chakravarthi', role: 'Southern Director', imageUrl: 'https://i.pravatar.cc/400?img=33' }, */
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

const awardHighlights = [
	'World Book of Records holder (Delhi/London)',
	'1st Rank Western Region (2023-24)',
	'1st Rank TPA for NATS 2023-24 (Mumbai)',
	'2nd Rank TPA for NATS 2022-23 (Mumbai)',
	'Honorary Doctorates and international recognitions in Sri Lanka, Thailand, Dubai, and Gujarat',
	'MOU with Ministry of Skill Development, Employment & Entrepreneurship, Government of Maharashtra',
]

const clientExperience = [
	{ name: 'Haier Appliances', manpower: '4,500 (PIP 3000, NIP 1500)', period: '10 Years' },
	{ name: 'Blue Star Ltd', manpower: '2,000', period: '5 Years' },
	{ name: 'MRF Ltd', manpower: '1,500', period: '2 Years' },
	{ name: 'FIAT Automotive', manpower: '1,100', period: '1 Year' },
	{ name: 'Jabil Circuit', manpower: '1,100', period: '1 Year' },
	{ name: 'Voltas Ltd', manpower: '1,000', period: '3 Years' },
	{ name: 'Hyundai Motors India', manpower: '1,000', period: '1.5 Years' },
	{ name: 'LG Electronics', manpower: '900', period: '7 Years' },
	{ name: 'JCB India Pvt Ltd', manpower: '800', period: '4 Years' },
	{ name: 'JSW', manpower: '300', period: '3 Years' },
]

const recruitmentSpeed = [
	'Up to 25 students: 1 day',
	'Up to 100 students: 3 days',
	'Up to 200 students: 7 days',
	'Up to 300 students: 10 days',
	'Up to 400 students: 15 days',
	'Up to 500 students: 25 days',
	'500 to 1,000 students: 1 month',
]

const sourcingStrategy = [
	'MaTPO associate network with 500+ diploma engineering colleges',
	'Recruitment via training centers (IGTR, DDUGKVY, PMKVY, ICICI CSR, NGOs)',
	'Campus drives for engineering, diploma, ITI, and 10th/12th candidates',
	'Job fairs and bulk ATS databases',
	'Social media hiring on LinkedIn, Naukri, Apna, Monster, Shine, and Indeed',
	'Supervisor village networks via local employment officers',
	'Auto-rickshaw audio/video/banner hiring campaigns',
	'Audio/video promotion at bus stands and railway stations',
	'Dedicated railway station advertisements',
	'Bulk voice calls and messaging outreach',
]

function LeadershipSection() {
	const leaders = [
		{ id: '1', name: 'Dr. Mehboob Sayyad', role: 'Founder & Chairman', imageUrl: '/visionaries/Untitled design (3).png', imageClassName: 'object-cover object-center', imageContainerClassName: 'h-64' },
		{ id: '2', name: 'Sunil Chavan', role: 'Director', imageUrl: '/visionaries/sunil sir.png', imageClassName: 'object-cover object-center', imageContainerClassName: 'h-64' },
		{ id: '3', name: 'Deshbhushan Jain', role: 'Western Director', imageUrl: '/visionaries/Untitled design (5).png', imageClassName: 'object-cover object-center', imageContainerClassName: 'h-64' },
		{ id: '4', name: 'Vikas Patil', role: 'Western Director', imageUrl: '/visionaries/Untitled design (6).png', imageClassName: 'object-cover object-center', imageContainerClassName: 'h-64' },
		{ id: '5', name: 'Prakash Rathod', role: 'North Western Director', imageUrl: '/visionaries/Untitled design (7).png', imageClassName: 'object-cover object-center', imageContainerClassName: 'h-64' },
		{ id: '6', name: 'Sarang Chavan', role: 'Board Director', imageUrl: '/visionaries/Untitled design (14).png', imageClassName: 'object-cover object-center', imageContainerClassName: 'h-64' },
		/* { id: '7', name: 'Babasaheb Khillari', role: 'Board Director', imageUrl: '/visionaries/Untitled design (15).png' }, */
		{ id: '8', name: 'Dheepan Chakravarthy', role: 'Southern Director', imageUrl: 'https://i.pravatar.cc/400?img=33', imageClassName: 'object-cover object-center', imageContainerClassName: 'h-64' },
	];

	return (
		<section className="py-20 bg-gradient-to-b from-slate-50 to-white">
			<div className="mx-auto max-w-full px-4 lg:px-8 text-center">
				{/* Section Heading */}
				<h2 className="text-4xl font-extrabold text-slate-900 mb-4">
					Our <span className="text-blue-600">Leadership Team</span>
				</h2>
				<p className="text-slate-500 mb-12 text-lg">
					Meet the visionary leaders shaping TSPL Group's future.
				</p>

				<div className="flex w-full flex-col gap-6 lg:flex-row lg:justify-center lg:items-stretch lg:gap-2 lg:flex-nowrap">
					{leaders.map((leader) => (
						<motion.div
							key={leader.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.6 }}
							className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-300 group cursor-pointer hover:shadow-2xl lg:flex-1"
						>
							{/* Image Container with Hover Effects */}
							<div className={`relative overflow-hidden bg-slate-100 ${leader.imageContainerClassName || 'h-64'} h-56 sm:h-64 lg:h-64`}>
								<img
									src={leader.imageUrl}
									alt={leader.name}
									className={`w-full h-full transition-all duration-500 transform group-hover:scale-110 brightness-100 group-hover:brightness-110 ${leader.imageClassName || 'object-cover object-center'}`}
									loading="lazy"
								/>
								{/* Vibrant gradient overlay on hover */}
								<div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
							</div>

							{/* Text Details */}
							<div className="p-3 text-center bg-white relative z-10 transition-colors duration-300 group-hover:bg-blue-50">
								<h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors line-clamp-2">
									{leader.name}
								</h3>
								<p className="text-xs text-slate-500 font-medium group-hover:text-blue-600 transition-colors line-clamp-2">
									{leader.role}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}


function AboutHero({ resolveAsset }) {
	const aboutHeroAsset = resolveAsset(
		'about.hero',
		'https://backend.tsplgroup.in/uploads/Whats_App_Image_2026_04_16_at_10_53_25_3_1d589b7f92.jpeg',
		'TSPL Group team'
	)

	return (
			<section className="relative min-h-[680px] overflow-hidden pb-20 pt-32">
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
		'https://backend.tsplgroup.in/uploads/TSPL_Logo_Sarang_Sir_1_55253e4a30.png',
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
					<div className="relative h-[460px] overflow-hidden rounded-3xl bg-white shadow-2xl">
						<img src={whoWeAreAsset.url} alt={whoWeAreAsset.alt} className="h-full w-full object-cover p-4 sm:p-5" />
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
							<motion.div
								key={`${milestone.year}-${milestone.title}`}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.3 }}
								transition={{ duration: 0.6, delay: i * 0.1 }}
								className={`flex flex-col items-center gap-4 w-full lg:flex-row lg:gap-8 lg:w-auto ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
							>
								<div className={`w-full lg:flex-1 ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
									<div className={`min-h-[180px] w-full lg:w-auto inline-block rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:bg-white/10 flex flex-col justify-between ${i % 2 === 0 ? 'lg:ml-auto' : 'lg:mr-auto'}`}>
										<p className="mb-2 text-sm font-bold text-[#F97316]">{milestone.year}</p>
										<h4 className="mb-2 text-xl font-bold text-white">{milestone.title}</h4>
										<p className="text-white/60">{milestone.description}</p>
									</div>
								</div>

								<div className="z-10 hidden h-6 w-6 shrink-0 rounded-full border-4 border-[#0F172A] bg-[#2563EB] lg:block" />
								<div className="hidden flex-1 lg:block" />
							</motion.div>
						))}
					</div>
				</div>

				{/* Upstream version does not include extra panels here */}

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

export default function AboutPage() {
	const pageAssets = usePageAssets()
	const resolveAsset = (key, fallbackUrl, fallbackAlt = '') => getPageAsset(pageAssets, key, fallbackUrl, fallbackAlt)

	return (
		<div className="min-h-screen bg-white text-slate-800">
			<Navbar />
			<main>
				<AboutHero resolveAsset={resolveAsset} />
				<OurStory resolveAsset={resolveAsset} />
				<OurValues />
				<Achievements />
				<LeadershipSection />
			</main>
			<Footer />
		</div>
	)
}
