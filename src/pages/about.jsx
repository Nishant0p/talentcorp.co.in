import { ArrowRight, Trophy, Building2, MapPin, Calendar, Target, Eye, Heart, Shield, Users, Lightbulb, HandHeart, Award, BookOpen, Globe, Star, CheckCircle, Briefcase, User, Presentation, Play, Pause, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { getPageAsset, usePageAssets } from '../hooks/usePageAssets'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useState, useRef, useEffect } from 'react';
import ProgressiveImage from '../components/ProgressiveImage';
import useSEO from '../hooks/useSEO';

const milestones = [
	{ year: '2014', title: 'Company Founded', description: 'Started with a small team of 5 people' },
	{ year: '2016', title: '100+ Companies', description: 'Partnered with 100 businesses across India' },
	{ year: '2018', title: '10,000 Workers', description: 'Helped 10,000 workers find jobs' },
	{ year: '2020', title: 'NAPS Authorized', description: 'Became government authorized for NAPS' },
	{ year: '2024', title: '15,000+ Placements', description: 'Crossed 15,000 successful placements' },
	{ year: '2025', title: '1st Rank TPA in NATS', description: 'Achieved the No. 1 rank as a Third-Party Aggregator for NATS.' },
	{ year: '2026', title: '40,000+ Placements', description: 'Crossed 40,000 successful placements' },
]

const achievements = [
	{ icon: Trophy, number: '40,000+', label: 'Workers Placed' },
	{ icon: Building2, number: '470+', label: 'Partner Companies' },
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

const companyOverviewPoints = [
	'TSPL Group established in 2011; one of India\'s leading human resource companies.',
	'Workforce solutions delivered to 470+ clients with pan-India presence.',
	'40,000+ trainees deployed across industries nationwide.',
	'Sectors served: Manufacturing, Healthcare, Hospitality, IT, Service Industry, Retail, E-Commerce, Construction, and more.',
	'1st Rank Government-Authorized TPA for NAPS and NATS programs in India.',
	'Trusted provider for OJT, Employment Programs, D.Voc (2-3 years), and B.Voc (3 years).',
	'Affiliations include World Book of Records (London) and South Asian Chamber of Commerce and Industry.',
]

const servicesOffered = [
	'NAPS',
	'NATS / BOAT',
	'MAPS',
	'WILP / WISE',
	'FLEXI ITI',
	'D.Voc',
	'B.Voc',
	'M.Voc',
	'AEDP',
	'Contract Staffing',
	'Manpower Planning',
	'Trade (ITI) Apprenticeship',
	'FTC',
	'Statutory Compliance',
	'Security & Housekeeping',
	'Skill Training',
]

const napsBenefits = [
	'DBT benefit: INR 1,500 per apprentice per month.',
	'NAPS quota: 2.5% to 15% of establishment strength; Maharashtra up to 25%.',
	'No statutory applicability for eligible apprenticeship structure.',
	'Industries can design custom courses and reduce recruitment costs.',
	'Apprentices are not part of unions under apprenticeship structure.',
]

const natsBenefits = [
	'Government of India Certificate of Proficiency after completion.',
	'Governed by Apprentices Act 1961 with apprenticeship-focused compliance model.',
	'NATS quota: 2.5% to 20% of overall establishment strength.',
	'DBT (Diploma): INR 4,000 per month per apprentice.',
	'DBT (B.E / B.Tech): INR 4,500 per month per apprentice.',
	'DBT (Any Graduate, first year): INR 4,500 per month per apprentice.',
]

const wilpWiseBenefits = [
	'Statutory compliance exemption model and CSR booking capability for eligible structures.',
	'No Trade Union Act applicability for student trainees in applicable frameworks.',
	'High retention with controlled attrition target of 5-10%.',
	'Behavioral training covers career growth, shopfloor etiquette, teamwork, and safety.',
	'Weekly and daily grievance redressal checkpoints.',
	'Attendance focus: 90-95% required for exam and certificate eligibility.',
]

const hiringCapacity = [
	{ region: 'Pan India', executives: '28 (Diploma/Eng/ITI)', recruiters: '150 (10th/12th)', strength: '570+', capacity: '10,000/month' },
	{ region: 'Maharashtra', executives: '16', recruiters: '100', strength: '320', capacity: '4,500/month' },
]

function DetailedProfileSection({ isMobile }) {
	const [activeTab, setActiveTab] = useState(0);
	const [isPresenting, setIsPresenting] = useState(false);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [autoPlay, setAutoPlay] = useState(false);

	const tabs = [
		{ id: 0, title: 'Company Overview' },
		{ id: 1, title: 'Services Offered' },
		{ id: 2, title: 'Awards & Achievements' },
		{ id: 3, title: 'Clients' },
		{ id: 4, title: 'NAPS Program' },
		{ id: 5, title: 'NATS / BOAT' },
		{ id: 6, title: 'Financial Savings' },
		{ id: 7, title: 'Vocational Programs' },
		{ id: 8, title: 'Recruitment Strategy' },
	];

	const slides = [
		{
			title: "Welcome to TSPL Group",
			subtitle: "Corporate Profile & Strategic Pitch Presentation",
			content: (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
					<div className="space-y-6">
						<span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold uppercase tracking-wider">Est. 2011</span>
						<h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">One of India's Leading Skill &amp; HR Solutions Groups</h3>
						<p className="text-slate-300 text-base leading-relaxed">
							TalentCorp Solutions Private Limited (TSPL Group) is a premier provider of apprenticeship coordination, technical skilling, payroll outsourcing, and industrial workforce management across 28+ states.
						</p>
					</div>
					<div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col justify-center gap-6">
						<div className="flex gap-4 items-start">
							<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white font-black">1</span>
							<div>
								<h4 className="text-lg font-bold text-white">Govt. Authorized TPA partner</h4>
								<p className="text-slate-400 text-sm">Direct portal interface with MSDE and regional BOAT hubs.</p>
							</div>
						</div>
						<div className="flex gap-4 items-start">
							<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white font-black">2</span>
							<div>
								<h4 className="text-lg font-bold text-white">World Record Recognition</h4>
								<p className="text-slate-400 text-sm">Honored in London World Book of Records for skilling excellence.</p>
							</div>
						</div>
					</div>
				</div>
			)
		},
		{
			title: "Our Story, Vision & Mission",
			subtitle: "Empowering industries and transforming technical careers.",
			content: (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-center">
					<div className="p-6 rounded-2xl bg-white/5 border border-white/10 h-full flex flex-col justify-between min-h-[220px]">
						<h4 className="text-xl font-bold text-blue-400">Our Story</h4>
						<p className="text-xs text-slate-300 leading-relaxed">
							Founded under the leadership of Dr. Mehboob Sayyad, TSPL Group started as a vision to empower youth. Today, we are one of India's pre-eminent human resource giants.
						</p>
					</div>
					<div className="p-6 rounded-2xl bg-white/5 border border-white/10 h-full flex flex-col justify-between min-h-[220px]">
						<h4 className="text-xl font-bold text-[#f7d54b]">Our Vision</h4>
						<p className="text-xs text-slate-300 leading-relaxed">
							To be the most preferred and trusted partner for corporate establishments globally, recognized for high-quality training and 100% compliant recruitment operations.
						</p>
					</div>
					<div className="p-6 rounded-2xl bg-white/5 border border-white/10 h-full flex flex-col justify-between min-h-[220px]">
						<h4 className="text-xl font-bold text-emerald-400">Our Mission</h4>
						<p className="text-xs text-slate-300 leading-relaxed">
							To deploy next-generation practical skill programs, bridging education and corporate roles with 100% statutory execution.
						</p>
					</div>
				</div>
			)
		},
		{
			title: "Core Values & Quality Focus",
			subtitle: "Built on integrity, precision engineering support, and agility.",
			content: (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
					<div className="space-y-4">
						<h4 className="text-xl font-bold text-orange-400">Our Values</h4>
						<div className="grid grid-cols-2 gap-4">
							<div className="p-4 rounded-xl bg-white/5 border border-white/10">
								<span className="font-bold text-white block mb-1">Integrity</span>
								<span className="text-xs text-slate-400">Ethical values in every single deal.</span>
							</div>
							<div className="p-4 rounded-xl bg-white/5 border border-white/10">
								<span className="font-bold text-white block mb-1">Client First</span>
								<span className="text-xs text-slate-400">Tailoring solutions to needs.</span>
							</div>
							<div className="p-4 rounded-xl bg-white/5 border border-white/10">
								<span className="font-bold text-white block mb-1">Compliance</span>
								<span className="text-xs text-slate-400">Exemptions with 100% accuracy.</span>
							</div>
							<div className="p-4 rounded-xl bg-white/5 border border-white/10">
								<span className="font-bold text-white block mb-1">Agility</span>
								<span className="text-xs text-slate-400">Turnaround within 48 Hours.</span>
							</div>
						</div>
					</div>
					<div className="p-6 rounded-2xl bg-blue-600/10 border border-blue-500/30">
						<h4 className="text-xl font-bold text-white mb-3">Quality Policy</h4>
						<p className="text-slate-300 text-xs leading-relaxed mb-4">
							We are committed to delivering elite workforce solutions, ensuring full alignment with regulatory models, and maintaining highest standard of shopfloor training.
						</p>
						<div className="flex gap-4">
							<div className="p-3 rounded-lg bg-white/5 text-center flex-1">
								<span className="block text-xl font-bold text-[#f7d54b]">ISO 9001</span>
								<span className="text-[10px] text-slate-400">Quality Certified</span>
							</div>
							<div className="p-3 rounded-lg bg-white/5 text-center flex-1">
								<span className="block text-xl font-bold text-emerald-400">100%</span>
								<span className="text-[10px] text-slate-400">Compliant</span>
							</div>
						</div>
					</div>
				</div>
			)
		},
		{
			title: "Board of Directors",
			subtitle: "Visionaries steering TalentCorp Solutions (TSPL Group).",
			content: (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-center">
					<div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/30 flex flex-col justify-between min-h-[240px] md:col-span-1">
						<div>
							<span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">Founder &amp; Chairman</span>
							<h4 className="text-2xl font-black text-white">Dr. Mehboob Sayyad</h4>
						</div>
						<p className="text-slate-400 text-xs leading-relaxed mt-2">
							Managing Director of TSPL Group, steering policy-driven apprenticeships and staffing across India.
						</p>
					</div>
					<div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between min-h-[240px]">
						<div>
							<span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">Director</span>
							<h4 className="text-xl font-bold text-white">Sunil Chavan</h4>
						</div>
						<p className="text-slate-400 text-xs leading-relaxed mt-2">
							Directs operations and client success metrics across corporate locations.
						</p>
					</div>
					<div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between min-h-[240px]">
						<div>
							<span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">Executive Directors</span>
							<div className="space-y-1 mt-2">
								<p className="text-xs font-semibold text-white">• Deshbhushan Jain</p>
								<p className="text-xs font-semibold text-white">• Prakash Rathod</p>
								<p className="text-xs font-semibold text-white">• Ruma Sayyad</p>
								<p className="text-xs font-semibold text-white">• Sarang Chavan</p>
							</div>
						</div>
					</div>
				</div>
			)
		},
		{
			title: "Core Management Leaders",
			subtitle: "Key executives managing Pan-India logistics and delivery.",
			content: (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center">
					<div className="p-5 rounded-xl bg-white/5 border border-white/10">
						<h4 className="text-base font-bold text-blue-400 mb-3">TPA &amp; Operations Management</h4>
						<div className="space-y-2 text-xs text-slate-300">
							<p><strong className="text-white">Samruddhi Chavan</strong> — Overall Head &amp; Operations</p>
							<p><strong className="text-white">Mubarak Shaikh</strong> — General Manager, Operations</p>
							<p><strong className="text-white">Purushottam Gaikwad</strong> — Assistant General Manager, Operations</p>
						</div>
					</div>
					<div className="p-5 rounded-xl bg-white/5 border border-white/10">
						<h4 className="text-base font-bold text-orange-400 mb-3">Sourcing, Placement &amp; Finance</h4>
						<div className="space-y-2 text-xs text-slate-300">
							<p><strong className="text-white">Gyanendra Mishra</strong> — Asst. General Manager, Sourcing</p>
							<p><strong className="text-white">Vishal Ubale</strong> — Manager Sourcing &amp; TPO Placement</p>
							<p><strong className="text-white">Lokesh Pardeshi</strong> — Finance Head</p>
							<p><strong className="text-white">Kishor More</strong> — General Manager</p>
						</div>
					</div>
				</div>
			)
		},
		{
			title: "Company Overview",
			subtitle: "Scale, reach, and governmental authorization benchmarks.",
			content: (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-center">
					<div className="p-8 rounded-3xl bg-blue-600/10 border border-blue-500/30 text-center flex flex-col justify-center h-full min-h-[220px]">
						<Trophy className="h-12 w-12 text-[#f7d54b] mx-auto mb-4" />
						<span className="block text-5xl font-black text-white">#1 Rank</span>
						<span className="text-xs text-slate-400 uppercase tracking-widest mt-2 block font-bold">Authorized TPA in India</span>
					</div>
					<div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center flex flex-col justify-center h-full min-h-[220px]">
						<Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
						<span className="block text-5xl font-black text-[#f7d54b]">40,000+</span>
						<span className="text-xs text-slate-400 uppercase tracking-widest mt-2 block font-bold">Apprentices Deployed</span>
					</div>
					<div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center flex flex-col justify-center h-full min-h-[220px]">
						<Building2 className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
						<span className="block text-5xl font-black text-emerald-400">470+</span>
						<span className="text-xs text-slate-400 uppercase tracking-widest mt-2 block font-bold">Pan-India Corporate Clients</span>
					</div>
				</div>
			)
		},
		{
			title: "Services Offered",
			subtitle: "Comprehensive end-to-end skilling & compliance architectures.",
			content: (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
					<div className="space-y-4">
						<h3 className="text-2xl font-bold text-[#f7d54b]">Apprenticeship &amp; Academic Pathways</h3>
						<div className="grid grid-cols-2 gap-3">
							{['NAPS Management', 'NATS / BOAT', 'MAPS Coordination', 'Flexi ITI Schemes', 'D.Voc / B.Voc Programs', 'WILP & WISE Systems'].map((s) => (
								<div key={s} className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-slate-200">
									✓ {s}
								</div>
							))}
						</div>
					</div>
					<div className="space-y-4">
						<h3 className="text-2xl font-bold text-blue-400">Industrial Workforce Solutions</h3>
						<div className="grid grid-cols-2 gap-3">
							{['Contract Staffing', 'Manpower Sourcing', 'Statutory Auditing', 'Payroll Management', 'ESIC/PF Administration', 'Security Operations'].map((s) => (
								<div key={s} className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-slate-200">
									✓ {s}
								</div>
							))}
						</div>
					</div>
				</div>
			)
		},
		{
			title: "Awards & Achievements",
			subtitle: "Recognized nationally and internationally for workforce deployment.",
			content: (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center">
					<div className="p-6 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center gap-5">
						<Trophy className="h-10 w-10 text-orange-400 shrink-0" />
						<p className="text-slate-200 font-medium">Fastest Growing Indian Company Excellence Award (Presented in New Delhi)</p>
					</div>
					<div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center gap-5">
						<Trophy className="h-10 w-10 text-blue-400 shrink-0" />
						<p className="text-slate-200 font-medium">Leading Emerging Skill Development TPA Company of the Year 2023 (Goa honors)</p>
					</div>
					<div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-5">
						<Trophy className="h-10 w-10 text-emerald-400 shrink-0" />
						<p className="text-slate-200 font-medium">London World Book of Records Honor for maximum placements in skill mission</p>
					</div>
					<div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-5">
						<Trophy className="h-10 w-10 text-slate-400 shrink-0" />
						<p className="text-slate-200 font-medium">Outstanding Leadership Achievement &amp; State HR Federation Honors</p>
					</div>
				</div>
			)
		},
		{
			title: "Clients & Reach",
			subtitle: "Trusted partner for top-tier Indian industries and multi-national corporations.",
			content: (
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 h-full items-center text-center">
					<div className="p-6 rounded-2xl bg-white/5 border border-white/10">
						<span className="block text-5xl font-black text-blue-400">410</span>
						<span className="text-xs text-slate-400 uppercase tracking-widest mt-2 block font-bold">NAPS Establishments</span>
					</div>
					<div className="p-6 rounded-2xl bg-white/5 border border-white/10">
						<span className="block text-5xl font-black text-emerald-400">350</span>
						<span className="text-xs text-slate-400 uppercase tracking-widest mt-2 block font-bold">NATS Organizations</span>
					</div>
					<div className="p-6 rounded-2xl bg-white/5 border border-white/10">
						<span className="block text-5xl font-black text-orange-400">20</span>
						<span className="text-xs text-slate-400 uppercase tracking-widest mt-2 block font-bold">WILP Pathways</span>
					</div>
					<div className="p-6 rounded-2xl bg-white/5 border border-white/10">
						<span className="block text-5xl font-black text-[#f7d54b]">100+</span>
						<span className="text-xs text-slate-400 uppercase tracking-widest mt-2 block font-bold">Contract Clients</span>
					</div>
				</div>
			)
		},
		{
			title: "NAPS Program (National Apprenticeship Promotion Scheme)",
			subtitle: "Empowering apprenticeships with direct government DBT portal automation.",
			content: (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-center">
					<div className="md:col-span-2 space-y-4">
						<h4 className="text-xl font-bold text-[#f7d54b] mb-2">Program Benefits</h4>
						<ul className="space-y-3">
							<li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" /> <span className="text-slate-300">Reimbursement of 25% of stipend (up to INR 1,500/month per apprentice).</span></li>
							<li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" /> <span className="text-slate-300">Exemption from PF, ESIC, Bonus, and Gratuity payments for trainees.</span></li>
							<li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" /> <span className="text-slate-300">100% CSR compliant funding structure for eligible corporations.</span></li>
						</ul>
					</div>
					<div className="p-6 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex flex-col justify-center">
						<span className="text-sm font-semibold text-orange-400 uppercase tracking-wider block mb-2">NAPS Savings (1,000 Trainees)</span>
						<span className="block text-3xl font-black text-white">INR 15 Lakhs</span>
						<span className="text-xs text-slate-400 block mb-4">Monthly savings</span>
						<span className="block text-3xl font-black text-white">INR 1.8 Crores</span>
						<span className="text-xs text-slate-400 block">Annual savings</span>
					</div>
				</div>
			)
		},
		{
			title: "NATS / BOAT Program",
			subtitle: "Apprentice training for graduate, diploma, and general stream candidates.",
			content: (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-center">
					<div className="md:col-span-2 space-y-4">
						<h4 className="text-xl font-bold text-emerald-400 mb-2">Scheme Details</h4>
						<ul className="space-y-3">
							<li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" /> <span className="text-slate-300">Direct Benefit Transfer (DBT) of up to INR 4,500/month per apprentice.</span></li>
							<li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" /> <span className="text-slate-300">Administered via regional Board of Apprenticeship Training (BOAT) portals.</span></li>
							<li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" /> <span className="text-slate-300">Apprentice quota matches 2.5% to 20% of your total workforce.</span></li>
						</ul>
					</div>
					<div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col justify-center">
						<span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider block mb-2">NATS Savings (1,000 Trainees)</span>
						<span className="block text-3xl font-black text-white">INR 45 Lakhs</span>
						<span className="text-xs text-slate-400 block mb-4">Monthly savings</span>
						<span className="block text-3xl font-black text-white">INR 5.4 Crores</span>
						<span className="text-xs text-slate-400 block">Annual savings</span>
					</div>
				</div>
			)
		},
		{
			title: "Financial Savings",
			subtitle: "Stipend optimizations & statutory exemptions breakdown.",
			content: (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-center">
					<div className="p-6 rounded-2xl bg-white/5 border border-white/10">
						<h4 className="text-lg font-bold text-white mb-2">CSR / ITI Trainees</h4>
						<p className="text-slate-400 text-sm mb-4">Stipend: ~INR 23,000/mo (1k trainees)</p>
						<span className="block text-2xl font-black text-emerald-400">INR 2.3 Cr/mo</span>
						<span className="text-xs text-slate-500 font-bold block mt-1">INR 27.6 Cr Annually</span>
					</div>
					<div className="p-6 rounded-2xl bg-white/5 border border-white/10">
						<h4 className="text-lg font-bold text-white mb-2">Diploma / BE Trainees</h4>
						<p className="text-slate-400 text-sm mb-4">Stipend: ~INR 26,000/mo (500 trainees)</p>
						<span className="block text-2xl font-black text-blue-400">INR 1.3 Cr/mo</span>
						<span className="text-xs text-slate-500 font-bold block mt-1">INR 15.6 Cr Annually</span>
					</div>
					<div className="p-6 rounded-2xl bg-white/5 border border-white/10">
						<h4 className="text-lg font-bold text-white mb-2">Statutory Savings</h4>
						<p className="text-slate-400 text-sm mb-4">1,500 trainees (PF, ESIC, Bonus)</p>
						<span className="block text-2xl font-black text-orange-400">~INR 75 Lakhs/mo</span>
						<span className="text-xs text-slate-500 font-bold block mt-1">~INR 9 Crores Annually</span>
					</div>
				</div>
			)
		},
		{
			title: "Recruitment Strategy",
			subtitle: "Mass sourcing power & benchmark delivery speeds.",
			content: (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
					<div className="space-y-4">
						<h4 className="text-xl font-bold text-blue-400">Sourcing Capacity</h4>
						<div className="space-y-3">
							<div className="flex justify-between border-b border-white/10 pb-2">
								<span className="text-slate-300">Pan-India Executives</span>
								<span className="font-bold text-white">570+ Strength</span>
							</div>
							<div className="flex justify-between border-b border-white/10 pb-2">
								<span className="text-slate-300">Max Sourcing Strength</span>
								<span className="font-bold text-white">10,000 / month</span>
							</div>
						</div>
					</div>
					<div className="space-y-4">
						<h4 className="text-xl font-bold text-orange-400">Delivery Benchmarks</h4>
						<ul className="space-y-2 text-sm text-slate-300">
							<li>• Sourcing &amp; shortlisting: **3 to 7 Days**</li>
							<li>• Client deployment &amp; onboarding: **7 to 10 Days**</li>
							<li>• Trainee replacements: **Within 48 Hours**</li>
						</ul>
					</div>
				</div>
			)
		},
		{
			title: "Thank You",
			subtitle: "Partnering for Growth & Compliance Excellence",
			content: (
				<div className="flex flex-col items-center justify-center text-center h-full max-w-2xl mx-auto space-y-6">
					<h3 className="text-4xl sm:text-5xl font-black text-[#f7d54b]">TSPL Group</h3>
					<p className="text-slate-300 text-lg leading-relaxed">
						We look forward to collaborating with your organization to optimize apprenticeships, streamline statutory compliance, and power your shopfloor operations.
					</p>
					<div className="pt-6 border-t border-white/10 w-full flex flex-col sm:flex-row justify-center gap-6 text-sm text-slate-400">
						<div>
							<strong className="text-white block mb-1">Visit Us</strong>
							<span>www.tsplgroup.in</span>
						</div>
						<div>
							<strong className="text-white block mb-1">Enquiries</strong>
							<span>info@tsplgroup.in</span>
						</div>
					</div>
				</div>
			)
		}
	];

	useEffect(() => {
		if (!autoPlay || !isPresenting) return;
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 7000);
		return () => clearInterval(timer);
	}, [autoPlay, isPresenting, slides.length]);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (!isPresenting) return;
			if (e.key === 'ArrowRight') {
				setCurrentSlide((prev) => (prev + 1) % slides.length);
			} else if (e.key === 'ArrowLeft') {
				setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
			} else if (e.key === 'Escape') {
				setIsPresenting(false);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isPresenting, slides.length]);

	const cardAnimProps = isMobile ? {} : {
		initial: { opacity: 0, y: 16 },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: true, amount: 0.1 },
		transition: { duration: 0.35, ease: 'easeOut' }
	};

	const getCardAnimProps = (delay) => isMobile ? {} : {
		initial: { opacity: 0, y: 16 },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: true, amount: 0.1 },
		transition: { duration: 0.35, ease: 'easeOut', delay: delay * 0.6 }
	};

	return (
		<section className="bg-slate-50 py-12 sm:py-24 lg:py-32 relative overflow-hidden">
			{/* Decorative Elements */}
			<div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-3xl pointer-events-none hidden md:block" />
			<div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-orange-100/30 blur-3xl pointer-events-none hidden md:block" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-10 text-center">
					<button
						onClick={() => {
							setCurrentSlide(0);
							setIsPresenting(true);
						}}
						className="mb-6 hidden md:inline-flex items-center gap-2.5 rounded-full border border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 px-5 py-2.5 shadow-sm transition-all hover:scale-105 cursor-pointer text-sm font-bold tracking-widest text-blue-700 uppercase"
					>
						<Presentation className="h-4 w-4 text-blue-600 animate-pulse" /> TSPL Profile Presentation
					</button>
					<h2 className="text-4xl font-extrabold text-slate-900 lg:text-5xl">Detailed Information</h2>
					<p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Everything you need to know about our operations, impact, and reach.</p>
				</div>

				{/* Horizontal Toggle Bar */}
				<div className="mb-12 flex overflow-x-auto pb-4 pt-2 hide-scrollbar mask-edges">
					<div className="flex gap-3 mx-auto min-w-max px-4">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'}`}
							>
								{tab.title}
							</button>
						))}
					</div>
				</div>

				{/* Content Container — no unmount/remount, just opacity fade for speed */}
				<div className="min-h-[500px] transition-opacity duration-200">
					{/* Tab 0: Company Overview */}
					{activeTab === 0 && (
						<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
							<motion.div {...cardAnimProps} className="md:col-span-2 lg:col-span-2 row-span-2 relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 to-blue-800 p-8 sm:p-10 text-white shadow-xl shadow-blue-900/10 group">
								<div className="absolute right-0 top-0 opacity-10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
									<Building2 className="h-64 w-64 -mr-16 -mt-16" />
								</div>
								<div className="relative z-10 h-full flex flex-col justify-between">
									<div>
										<span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm font-bold tracking-widest uppercase mb-6">Est. 2011</span>
										<h3 className="text-3xl sm:text-4xl font-black leading-tight mb-4">One of India's leading human resource companies.</h3>
									</div>
									<p className="text-blue-100 text-lg leading-relaxed max-w-md">We provide elite workforce solutions with a strong Pan-India presence, driving growth for businesses across the nation.</p>
								</div>
							</motion.div>

							<motion.div {...getCardAnimProps(0.1)} className="md:col-span-1 lg:col-span-2 row-span-1 relative overflow-hidden rounded-[2rem] bg-white p-8 border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:border-orange-200 group flex items-center gap-6">
								<div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-orange-100 transition-transform group-hover:scale-110">
									<Trophy className="h-10 w-10 text-orange-600" />
								</div>
								<div>
									<h4 className="text-2xl font-black text-slate-900 mb-2">1st Rank Government-Authorized TPA</h4>
									<p className="text-slate-600">For NAPS and NATS programs in India.</p>
								</div>
							</motion.div>

							<motion.div {...getCardAnimProps(0.2)} className="md:col-span-1 lg:col-span-1 row-span-1 rounded-[2rem] bg-white p-8 border border-slate-200 shadow-sm transition-all hover:shadow-xl group flex flex-col justify-center">
								<Users className="h-10 w-10 text-blue-500 mb-4 transition-transform group-hover:scale-110" />
								<h4 className="text-4xl font-black text-slate-900 mb-1">40,000+</h4>
								<p className="text-slate-600 font-medium">Trainees Deployed Nationwide</p>
							</motion.div>

							<motion.div {...getCardAnimProps(0.3)} className="md:col-span-1 lg:col-span-1 row-span-1 rounded-[2rem] bg-white p-8 border border-slate-200 shadow-sm transition-all hover:shadow-xl group flex flex-col justify-center">
								<Building2 className="h-10 w-10 text-emerald-500 mb-4 transition-transform group-hover:scale-110" />
								<h4 className="text-4xl font-black text-slate-900 mb-1">470+</h4>
								<p className="text-slate-600 font-medium">Clients with Pan-India Presence</p>
							</motion.div>

							<motion.div {...getCardAnimProps(0.4)} className="md:col-span-2 lg:col-span-2 row-span-1 rounded-[2rem] bg-slate-900 p-8 text-white shadow-xl group flex flex-col justify-center">
								<h4 className="text-xl font-bold mb-4 text-orange-400">Trusted Provider For</h4>
								<div className="flex flex-wrap gap-3">
									{['NAPS',
										'NATS / BOAT',
										'MAPS',
										'WILP / WISE',
										'FLEXI ITI',
										'D.Voc',
										'B.Voc',
										'M.Voc',
										'AEDP',
										'Contract Staffing',
										'Manpower Planning',
										'Trade (ITI) Apprenticeship',
										'FTC',
										'Statutory Compliance',
										'Security & Housekeeping',
										'Skill Training',
										'Trusted Provider'].map((prog) => (
											<span key={prog} className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-sm font-semibold backdrop-blur-md">{prog}</span>
										))}
								</div>
							</motion.div>

							<motion.div {...getCardAnimProps(0.5)} className="md:col-span-1 lg:col-span-2 row-span-1 rounded-[2rem] bg-white p-8 border border-slate-200 shadow-sm transition-all hover:shadow-xl flex flex-col justify-center gap-4">
								<h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
									<Globe className="h-5 w-5 text-blue-500" /> Global Affiliations
								</h4>
								<ul className="space-y-3 text-slate-600 font-medium">
									<li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-500" /> World Book of Records (London)</li>
									<li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-500" /> South Asian Chamber of Commerce</li>
								</ul>
							</motion.div>

							<motion.div {...getCardAnimProps(0.6)} className="md:col-span-3 lg:col-span-4 row-span-auto rounded-[2rem] bg-white p-8 border border-slate-200 shadow-sm transition-all hover:shadow-xl min-w-0">
								<h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
									<Target className="h-6 w-6 text-orange-500" /> Sectors Served
								</h4>
								<div className="w-full min-w-0 columns-2 gap-y-3 sm:columns-3 md:columns-4 lg:columns-5">
									{[
										'Manufacturing',
										'Automobile',
										'Electronics',
										'IT & ITeS/BPO',
										'Pharmaceuticals',
										'Chemicals',
										'Banking',
										'Healthcare',
										'Retail',
										'BFSI',
										'Logistics',
										'E-Commerce',
										'Construction',
										'Food & Beverages',
										'Renewable Energy',
										'Mining',
										'Steel',
										'Power & Energy',
										'Electric Vehicles',
										'Apparel & Textiles',
									].map((sector) => (
										<span key={sector} className="inline-block w-full break-all py-1 px-2 text-[11px] sm:text-xs rounded-xl bg-slate-50 border border-slate-100 text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-100 transition-colors cursor-default whitespace-normal leading-snug mb-2">
											{sector}
										</span>
									))}
								</div>
							</motion.div>


						</div>
					)}

					{/* Tab 1: Services Offered */}
					{activeTab === 1 && (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{servicesOffered.map((service, i) => (
								<div key={i} className="rounded-[2rem] bg-white p-8 border border-slate-200 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 flex flex-col justify-center items-center text-center group">
									<div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
										<Briefcase className="h-8 w-8 text-blue-600" />
									</div>
									<h4 className="text-xl font-bold text-slate-900">{service}</h4>
								</div>
							))}
						</div>
					)}

					{/* Tab 2: Awards & Achievements */}
					{activeTab === 2 && (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{[...awardHighlights, 'Fastest Growing Indian Company Excellence Award (Delhi).', 'Outstanding Achievement Award (Chennai).', 'Leading Emerging Skill Development Company of the Year 2023 (Goa).'].map((award, i) => (
								<div key={i} className="rounded-[2rem] bg-gradient-to-br from-orange-50 to-orange-100/50 p-8 border border-orange-200 shadow-sm transition-all hover:shadow-lg flex items-center gap-6 group">
									<Trophy className="h-12 w-12 text-orange-500 shrink-0 group-hover:scale-110 transition-transform" />
									<p className="text-lg font-bold text-slate-900 leading-relaxed">{award}</p>
								</div>
							))}
						</div>
					)}

					{/* Tab 3: Clients */}
					{activeTab === 3 && (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							<div className="rounded-[2rem] bg-white p-8 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-xl hover:-translate-y-2 group">
								<h4 className="text-5xl font-black text-blue-600 mb-2 transition-transform group-hover:scale-110">410</h4>
								<p className="text-lg font-bold text-slate-700 uppercase tracking-widest mt-4">NAPS Clients</p>
							</div>
							<div className="rounded-[2rem] bg-white p-8 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-xl hover:-translate-y-2 group">
								<h4 className="text-5xl font-black text-emerald-600 mb-2 transition-transform group-hover:scale-110">350</h4>
								<p className="text-lg font-bold text-slate-700 uppercase tracking-widest mt-4">NATS Clients</p>
							</div>
							<div className="rounded-[2rem] bg-white p-8 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-xl hover:-translate-y-2 group">
								<h4 className="text-5xl font-black text-orange-600 mb-2 transition-transform group-hover:scale-110">20</h4>
								<p className="text-lg font-bold text-slate-700 uppercase tracking-widest mt-4">WILP Clients</p>
							</div>
							<div className="rounded-[2rem] bg-white p-8 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-xl hover:-translate-y-2 group">
								<h4 className="text-5xl font-black text-indigo-600 mb-2 transition-transform group-hover:scale-110">100+</h4>
								<p className="text-lg font-bold text-slate-700 uppercase tracking-widest mt-4">Contract Labour</p>
							</div>
						</div>
					)}

					{/* Tab 4: NAPS Program */}
					{activeTab === 4 && (
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							<div className="lg:col-span-3 rounded-[2rem] bg-gradient-to-br from-blue-600 to-blue-800 p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
								<div className="absolute right-0 top-0 opacity-10">
									<Shield className="h-64 w-64 -mr-16 -mt-16" />
								</div>
								<div className="relative z-10 max-w-3xl">
									<h3 className="text-4xl font-black mb-4">NAPS Program</h3>
									<p className="text-xl text-blue-100 leading-relaxed">Launched in August 2016 by the Government of India to promote apprenticeship using incentives, technology, and advocacy.</p>
								</div>
							</div>

							<div className="lg:col-span-2 rounded-[2rem] bg-white p-8 border border-slate-200 shadow-sm">
								<h4 className="text-2xl font-bold text-slate-900 mb-6">Program Benefits</h4>
								<ul className="space-y-4">
									{napsBenefits.map((item, i) => (
										<li key={i} className="flex gap-4 items-start">
											<CheckCircle className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5" />
											<span className="text-lg text-slate-700">{item}</span>
										</li>
									))}
								</ul>
							</div>

							<div className="lg:col-span-1 rounded-[2rem] bg-orange-50 p-8 border border-orange-200 shadow-sm flex flex-col justify-center">
								<div className="flex items-center gap-3 mb-6">
									<Lightbulb className="h-8 w-8 text-orange-600" />
									<h4 className="text-2xl font-black text-orange-900">Savings Example</h4>
								</div>
								<p className="text-lg text-orange-800/80 mb-4">For 1,000 trainees under NAPS:</p>
								<p className="text-3xl font-black text-orange-600 mb-2">INR 15 Lakhs</p>
								<p className="text-sm font-bold text-orange-800 uppercase tracking-widest mb-6">Monthly Savings</p>
								<p className="text-3xl font-black text-orange-600 mb-2">INR 1.8 Crores</p>
								<p className="text-sm font-bold text-orange-800 uppercase tracking-widest">Annual Savings</p>
							</div>

							{/* Contact Block */}
							<div className="lg:col-span-3 rounded-[2rem] bg-slate-900 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl mt-2">
								<div className="flex items-center gap-4 w-full sm:w-auto">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
										<Users className="h-6 w-6 text-blue-400" />
									</div>
									<div>
										<h4 className="text-xl font-bold">NAPS Enquiries</h4>
										<p className="text-slate-400">Contact: Samruddhi Mam (Number)</p>
									</div>
								</div>
								<Link to="/contact-us" className="rounded-xl bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-500 transition-colors shrink-0 text-center w-full sm:w-auto">
									Contact Now
								</Link>
							</div>
						</div>
					)}

					{/* Tab 5: NATS / BOAT */}
					{activeTab === 5 && (
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							<div className="lg:col-span-3 rounded-[2rem] bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
								<div className="absolute right-0 top-0 opacity-10">
									<BookOpen className="h-64 w-64 -mr-16 -mt-16" />
								</div>
								<div className="relative z-10 max-w-3xl">
									<h3 className="text-4xl font-black mb-4">NATS / BOAT Program</h3>
									<p className="text-xl text-emerald-100 leading-relaxed">Flagship 1 to 3-year Government of India apprenticeship training route for technical youth employability.</p>
								</div>
							</div>

							<div className="lg:col-span-2 rounded-[2rem] bg-white p-8 border border-slate-200 shadow-sm">
								<h4 className="text-2xl font-bold text-slate-900 mb-6">Program Structure & Benefits</h4>
								<ul className="space-y-4">
									{natsBenefits.map((item, i) => (
										<li key={i} className="flex gap-4 items-start">
											<CheckCircle className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5" />
											<span className="text-lg text-slate-700">{item}</span>
										</li>
									))}
								</ul>
							</div>

							<div className="lg:col-span-1 rounded-[2rem] bg-emerald-50 p-8 border border-emerald-200 shadow-sm flex flex-col justify-center">
								<div className="flex items-center gap-3 mb-6">
									<Lightbulb className="h-8 w-8 text-emerald-600" />
									<h4 className="text-2xl font-black text-emerald-900">Savings Example</h4>
								</div>
								<p className="text-lg text-emerald-800/80 mb-4">For 1,000 NATS trainees at INR 4,500 DBT:</p>
								<p className="text-3xl font-black text-emerald-600 mb-2">INR 45 Lakhs</p>
								<p className="text-sm font-bold text-emerald-800 uppercase tracking-widest mb-6">Monthly Savings</p>
								<p className="text-3xl font-black text-emerald-600 mb-2">INR 5.4 Crores</p>
								<p className="text-sm font-bold text-emerald-800 uppercase tracking-widest">Annual Savings</p>
							</div>

							{/* Contact Block */}
							<div className="lg:col-span-3 rounded-[2rem] bg-slate-900 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl mt-2">
								<div className="flex items-center gap-4 w-full sm:w-auto">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
										<Users className="h-6 w-6 text-emerald-400" />
									</div>
									<div>
										<h4 className="text-xl font-bold">NATS / BOAT Enquiries</h4>
										<p className="text-slate-400">Contact: Samruddhi Mam (Number)</p>
									</div>
								</div>
								<Link to="/contact-us" className="rounded-xl bg-emerald-600 px-8 py-3 font-bold text-white hover:bg-emerald-500 transition-colors shrink-0 text-center w-full sm:w-auto">
									Contact Now
								</Link>
							</div>
						</div>
					)}

					{/* Tab 6: Financial Savings */}
					{activeTab === 6 && (
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							<div className="rounded-[2rem] bg-white p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
								<div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<Target className="h-8 w-8 text-emerald-600" />
								</div>
								<h4 className="text-xl font-bold text-slate-900 mb-4">10th/12th/ITI Trainees (CSR)</h4>
								<p className="text-slate-600 mb-6">Based on 1,000 trainees at average INR 23,000 stipend.</p>
								<p className="text-4xl font-black text-emerald-600 mb-1">INR 2.3 Cr<span className="text-xl text-emerald-600/60">/mo</span></p>
								<p className="text-sm font-bold text-slate-400 uppercase tracking-widest">INR 27.6 Crores Annually</p>
							</div>

							<div className="rounded-[2rem] bg-white p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
								<div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<Target className="h-8 w-8 text-blue-600" />
								</div>
								<h4 className="text-xl font-bold text-slate-900 mb-4">Diploma/BE Trainees (CSR)</h4>
								<p className="text-slate-600 mb-6">Based on 500 trainees at average INR 26,000 stipend.</p>
								<p className="text-4xl font-black text-blue-600 mb-1">INR 1.3 Cr<span className="text-xl text-blue-600/60">/mo</span></p>
								<p className="text-sm font-bold text-slate-400 uppercase tracking-widest">INR 15.6 Crores Annually</p>
							</div>

							<div className="rounded-[2rem] bg-white p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
								<div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<Shield className="h-8 w-8 text-orange-600" />
								</div>
								<h4 className="text-xl font-bold text-slate-900 mb-4">Statutory Savings</h4>
								<p className="text-slate-600 mb-6">For 1,500 trainees by reducing PF, ESIC, Bonus, & Gratuity.</p>
								<p className="text-4xl font-black text-orange-600 mb-1">~INR 75 L<span className="text-xl text-orange-600/60">/mo</span></p>
								<p className="text-sm font-bold text-slate-400 uppercase tracking-widest">~INR 9 Crores Annually</p>
							</div>
						</div>
					)}

					{/* Tab 7: Vocational Programs */}
					{activeTab === 7 && (
						<div className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="rounded-[2rem] bg-blue-600 p-8 text-center text-white shadow-lg transition-transform hover:-translate-y-2">
									<h4 className="font-black text-4xl mb-2">D.Voc</h4>
									<p className="text-blue-200 font-medium text-lg">2-3 years practical diploma</p>
								</div>
								<div className="rounded-[2rem] bg-orange-500 p-8 text-center text-white shadow-lg transition-transform hover:-translate-y-2">
									<h4 className="font-black text-4xl mb-2">B.Voc</h4>
									<p className="text-orange-100 font-medium text-lg">3 years undergrad pathway</p>
								</div>
								<div className="rounded-[2rem] bg-emerald-500 p-8 text-center text-white shadow-lg transition-transform hover:-translate-y-2">
									<h4 className="font-black text-4xl mb-2">M.Voc</h4>
									<p className="text-emerald-100 font-medium text-lg">2 years advanced postgrad</p>
								</div>
							</div>

							<div className="rounded-[2rem] bg-white p-8 sm:p-10 border border-slate-200 shadow-sm">
								<h4 className="text-2xl font-bold text-slate-900 mb-8">Program Features & WILP/WISE Benefits</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{wilpWiseBenefits.map((item, i) => (
										<div key={i} className="flex gap-4">
											<div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
											<span className="text-lg text-slate-700 leading-relaxed">{item}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					)}

					{/* Tab 8: Recruitment Strategy */}
					{activeTab === 8 && (
						<div className="space-y-6">
							<div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
								<div className="overflow-x-auto">
									<table className="w-full text-left text-sm whitespace-nowrap">
										<thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-xs font-bold border-b border-slate-200">
											<tr>
												<th className="px-8 py-6">Region</th>
												<th className="px-8 py-6">Sourcing Staff Strength</th>
												<th className="px-8 py-6">Hiring Capacity</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-slate-100">
											{hiringCapacity.map((row, i) => (
												<tr key={i} className="hover:bg-slate-50 transition-colors">
													<td className="px-8 py-6 font-bold text-slate-900 text-base">{row.region}</td>
													<td className="px-8 py-6 text-slate-600 font-medium text-base">{row.strength} Members</td>
													<td className="px-8 py-6 text-blue-600 font-bold text-base">{row.capacity}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>

							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<div className="rounded-[2rem] bg-gradient-to-br from-orange-50 to-orange-100/50 p-8 border border-orange-200 shadow-sm">
									<h4 className="font-black text-2xl text-slate-900 mb-6 flex items-center gap-3">
										<span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white shadow-md">⚡</span>
										Speed Benchmarks
									</h4>
									<ul className="space-y-4">
										{recruitmentSpeed.map((item, i) => (
											<li key={i} className="flex gap-4 items-center bg-white p-4 rounded-xl border border-orange-100 shadow-sm">
												<Calendar className="h-5 w-5 text-orange-500 shrink-0" />
												<span className="text-slate-800 font-bold">{item}</span>
											</li>
										))}
									</ul>
								</div>
								<div className="rounded-[2rem] bg-gradient-to-br from-blue-50 to-blue-100/50 p-8 border border-blue-200 shadow-sm">
									<h4 className="font-black text-2xl text-slate-900 mb-6 flex items-center gap-3">
										<span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">🎯</span>
										Sourcing Methods
									</h4>
									<ul className="space-y-4">
										{sourcingStrategy.slice(0, 7).map((item, i) => (
											<li key={i} className="flex gap-4 items-start">
												<div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
												<span className="text-slate-700 font-medium leading-relaxed">{item}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Presentation Mode Modal */}
			<AnimatePresence>
				{isPresenting && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 bg-[#0a0c20] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0f143c] via-[#070918] to-[#04050d] text-white flex flex-col justify-between p-6 sm:p-12 font-sans select-none"
					>
						{/* Top Slide Header */}
						<div className="flex items-center justify-between border-b border-white/10 pb-6 w-full">
							<div className="flex items-center gap-3">
								<div className="h-2 w-2 rounded-full bg-[#f7d54b] animate-ping" />
								<span className="text-sm font-bold tracking-widest text-slate-400 uppercase">TSPL Corporate Pitch Profile</span>
							</div>
							<div className="flex items-center gap-4">
								<span className="text-sm font-semibold text-slate-400">Slide {currentSlide + 1} of {slides.length}</span>
								<button
									onClick={() => setIsPresenting(false)}
									className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-all hover:bg-white/10 cursor-pointer"
								>
									<X size={20} />
								</button>
							</div>
						</div>

						{/* Slide Main Body */}
						<div className="flex-1 w-full max-w-7xl mx-auto flex flex-col justify-center py-10">
							<motion.div
								key={currentSlide}
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.4 }}
								className="space-y-12 animate-fade-in"
							>
								<div>
									<h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white mb-3">
										{slides[currentSlide].title}
									</h2>
									<p className="text-lg text-slate-400 font-medium">
										{slides[currentSlide].subtitle}
									</p>
								</div>
								
								<div className="min-h-[320px]">
									{slides[currentSlide].content}
								</div>
							</motion.div>
						</div>

						{/* Bottom Slide Controls */}
						<div className="flex items-center justify-between border-t border-white/10 pt-6 w-full">
							<div className="flex items-center gap-4">
								<button
									onClick={() => setAutoPlay(!autoPlay)}
									className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${autoPlay ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white'}`}
								>
									{autoPlay ? <Pause size={16} /> : <Play size={16} />}
									{autoPlay ? 'Pause Auto-Play' : 'Auto-Play Pitch'}
								</button>
							</div>

							<div className="flex gap-3">
								<button
									onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
									className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-all hover:bg-white/10 active:scale-95 cursor-pointer"
								>
									<ChevronLeft size={24} />
								</button>
								<button
									onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
									className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#006bb8] text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-95 cursor-pointer"
								>
									<ChevronRight size={24} />
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}

function LeadershipSection({ isMobile }) {
	const topDirectors = [
		{ id: '1', name: 'Dr. Mehboob Sayyad', role: 'Chairman & Founder', imageUrl: '/visionaries/Dr mehboob Sayyad.png', slug: 'dr-mehboob-sayyad' },
		{ id: '2', name: 'Sunil Chavan', role: 'Director & Co-Founder', imageUrl: '/visionaries/Sunil Chavan.png', slug: 'sunil-chavan' },
	];

	const bottomDirectors = [
		{ id: '3', name: 'Deshbhushan Jain', role: 'Director', imageUrl: '/visionaries/Deshbushan Jain.png', slug: 'deshbhushan-jain' },
		{ id: '5', name: 'Prakash Rathod', role: 'Director', imageUrl: '/visionaries/Prakash Rathod.png', slug: 'prakash-rathod' },
		{ id: '8', name: 'Ruma Sayyad', role: 'Director', imageUrl: '/visionaries/Ruma Sayyad.png', slug: 'ruma-sayyad' },
		{ id: '6', name: 'Sarang Chavan', role: 'Director', imageUrl: '/visionaries/Sarang Chavan.png', slug: 'sarang-chavan' },
	];

	const getLeaderAnimProps = (i) => isMobile ? {} : {
		initial: { opacity: 0, y: 16 },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: true, amount: 0.1 },
		transition: { duration: 0.3, delay: i * 0.05, ease: 'easeOut' }
	};

	return (
		<section className="py-12 bg-slate-50 relative overflow-hidden flex flex-col justify-center min-h-screen">
			{/* Dotted Grid Texture */}
			<div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0756c8 1px, transparent 0)', backgroundSize: '32px 32px' }} />
			
			{/* Ambient Glowing Orbs */}
			<div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-blue-200/20 to-[#ff6817]/5 blur-3xl opacity-60 hidden md:block" />
			<div className="absolute bottom-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-orange-200/10 to-blue-200/20 blur-3xl opacity-60 hidden md:block" />
			
			<div className="mx-auto w-full max-w-[90rem] px-4 lg:px-8 relative z-10 flex flex-col justify-center">
				{/* Section Heading - Compact & Modern */}
				<div className="mb-8 text-center">
					<div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1">
						<span className="text-[11px] font-black tracking-widest text-blue-700 uppercase">Board of Directors</span>
					</div>
					<h2 className="text-3xl font-extrabold text-slate-900 mb-2 sm:text-4xl">
						Our Leadership Team
					</h2>
					<p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
						Meet the visionary leaders shaping TSPL Group's future with decades of combined experience.
					</p>
				</div>

				{/* Top Directors Row */}
				<div className="flex flex-wrap justify-center gap-4 lg:gap-6 w-full max-w-[90rem] mx-auto mb-6">
					{topDirectors.map((leader, i) => (
						<Link
							key={leader.id}
							to={`/leader/${leader.slug}`}
							className="w-full max-w-[280px] sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(16.666%-20px)] block transition-transform duration-300 hover:scale-102"
						>
							<motion.div
								{...getLeaderAnimProps(i)}
								className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-blue-200 w-full"
							>
								<div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-200 min-h-[280px]">
									{/* Image */}
									<ProgressiveImage
										src={leader.imageUrl}
										alt={`${leader.name} - ${leader.role} of TalentCorp Solutions Private Limited (TSPL Group)`}
										title={`${leader.name} - ${leader.role}`}
										loading="eager"
										width="300"
										height="400"
										className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
									/>
									
									{/* Gradient Overlay */}
									<div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

									{/* Leadership Info Overlay */}
									<div className="absolute bottom-0 left-0 w-full p-4 md:p-5 text-left flex justify-between items-end z-10">
										<div className="min-w-0 flex-1 pr-2">
											<h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-0.5 transition-transform duration-300 group-hover:-translate-y-1 whitespace-nowrap truncate">
												{leader.name}
											</h3>
											<p className="text-[9px] sm:text-[10px] font-bold text-blue-400 uppercase tracking-wider transition-transform duration-300 group-hover:-translate-y-1 leading-tight">
												{leader.role}
											</p>
										</div>
										<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
											<ArrowRight className="h-4 w-4" />
										</div>
									</div>
								</div>
							</motion.div>
						</Link>
					))}
				</div>

				{/* Bottom Directors Row */}
				<div className="flex flex-wrap justify-center gap-4 lg:gap-6 w-full max-w-[90rem] mx-auto">
					{bottomDirectors.map((leader, i) => (
						<Link
							key={leader.id}
							to={`/leader/${leader.slug}`}
							className="w-full max-w-[280px] sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(16.666%-20px)] block transition-transform duration-300 hover:scale-102"
						>
							<motion.div
								{...getLeaderAnimProps(i + 2)}
								className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-blue-200 w-full"
							>
								<div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-200 min-h-[280px]">
									{/* Image */}
									<ProgressiveImage
										src={leader.imageUrl}
										alt={`${leader.name} - ${leader.role} of TalentCorp Solutions Private Limited (TSPL Group)`}
										title={`${leader.name} - ${leader.role}`}
										loading="eager"
										width="300"
										height="400"
										className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
									/>
									
									{/* Gradient Overlay */}
									<div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

									{/* Leadership Info Overlay */}
									<div className="absolute bottom-0 left-0 w-full p-4 md:p-5 text-left flex justify-between items-end z-10">
										<div className="min-w-0 flex-1 pr-2">
											<h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-0.5 transition-transform duration-300 group-hover:-translate-y-1 whitespace-nowrap truncate">
												{leader.name}
											</h3>
											<p className="text-[9px] sm:text-[10px] font-bold text-blue-400 uppercase tracking-wider transition-transform duration-300 group-hover:-translate-y-1 leading-tight">
												{leader.role}
											</p>
										</div>
										<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
											<ArrowRight className="h-4 w-4" />
										</div>
									</div>
								</div>
							</motion.div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}

function ManagementSection({ isMobile }) {
	const keyLeaders = [
		{
			id: '1',
			name: 'Samruddhi Chavan',
			role: 'Overall Head',
			imageUrl: '/leaders/mam.png',
			slug: 'samruddhi-chavan'
		},
		{
			id: '2',
			name: 'Kishor More',
			role: 'General Manager',
			imageUrl: '/leaders/1 mr kishore more.jpg',
			slug: 'kishor-more'
		},
		{
			id: '3',
			name: 'Mubarak Shaikh',
			role: 'General Manager, Operations',
			imageUrl: '/leaders/2 Mr. Mubarak Shaikh.jpg',
			slug: 'mubarak-shaikh'
		},
		{
			id: '4',
			name: 'Gyanendra Mishra',
			role: 'Asst. General Manager, Sourcing',
			imageUrl: '/leaders/3 mr gyanendra mishra.jpg',
			slug: 'gyanendra-mishra'
		},
		{
			id: '5',
			name: 'Vishal Ubale',
			role: 'Manager Sourcing & TPO Placement',
			imageUrl: '/leaders/4 mr vishal ubale.jpg',
			slug: 'vishal-ubale'
		},
		{
			id: '6',
			name: 'Lokesh Pardeshi',
			role: 'Finance Head',
			imageUrl: '/leaders/5 lokesh.jpg',
			slug: 'lokesh-pardeshi'
		},
		{
			id: '7',
			name: 'Purushottam Gaikwad',
			role: 'Assistant General Manager, Operations',
			imageUrl: '/leaders/7th Photo Purushottam Gaikwad (Assistant General Manager in Operation).jpeg',
			slug: 'purushottam-gaikwad'
		},
		{
			id: '8',
			name: 'Shivanand Mane',
			role: 'Regional Head, Operations',
			imageUrl: '/leaders/7 mr shivanand mane .jpg',
			slug: 'shivanand-mane'
		},
		{
			id: '9',
			name: 'Namdev Egave',
			role: 'Payroll & Compliance Head',
			imageUrl: '/leaders/namdev-egave.jpg',
			slug: 'namdev-egave'
		},
		{
			id: '10',
			name: 'Rahul Borkar',
			role: 'Recruitment Head',
			imageUrl: '/leaders/9 mr rahul borkar.jpg',
			slug: 'rahul-borkar'
		}
	];
	const getLeaderAnimProps = (i) => isMobile ? {} : {
		initial: { opacity: 0, y: 16 },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: true, amount: 0.1 },
		transition: { duration: 0.3, delay: Math.min(i * 0.04, 0.2), ease: 'easeOut' }
	};

	return (
		<section className="py-12 sm:py-24 bg-white relative overflow-hidden border-t border-b border-slate-100">
			<div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-50/20 blur-3xl hidden md:block" />
			<div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-50/20 blur-3xl hidden md:block" />
			<div className="mx-auto max-w-[96rem] px-4 lg:px-8 relative z-10">
				{/* Section Heading */}
				<div className="mb-16 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2">
						<span className="text-sm font-bold tracking-widest text-blue-700 uppercase">Management Team</span>
					</div>
					<h2 className="text-4xl font-extrabold text-slate-900 mb-4 sm:text-5xl">
						Core Management Leaders
					</h2>
					<p className="text-slate-600 max-w-2xl mx-auto text-lg">
						Our dedicated team of professionals driving operations, business development, compliance, and recruitment excellence.
					</p>
				</div>

				{/* Leaders Flex Container - Wraps into 2 rows (5 on top, 4 centered on bottom) with identical card sizes */}
				<div className="flex flex-wrap justify-center gap-4 lg:gap-6 w-full max-w-[90rem] mx-auto">
					{keyLeaders.map((leader, i) => (
						<Link
							key={leader.id}
							to={`/leader/${leader.slug}`}
							className="w-full max-w-[280px] sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(16.666%-20px)] block transition-transform duration-300 hover:scale-102"
						>
							<motion.div
								{...getLeaderAnimProps(i)}
								className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-blue-200 w-full"
							>
								<div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-200 min-h-[280px] flex items-center justify-center">
									{leader.imageUrl ? (
										<ProgressiveImage
											src={leader.imageUrl}
											alt={`${leader.name} - ${leader.role} of TalentCorp Solutions Private Limited (TSPL Group)`}
											title={`${leader.name} - ${leader.role}`}
											loading="lazy"
											width="300"
											height="400"
											className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
										/>
									) : (
										<div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-6 transition-colors duration-300 group-hover:from-blue-50/50 group-hover:to-slate-100">
											<User className="h-16 w-16 text-slate-400/80 mb-2 transition-transform duration-500 group-hover:scale-110 group-hover:text-blue-500" />
											<span className="text-[10px] font-bold text-slate-400/60 uppercase tracking-widest text-center">Photo Coming Soon</span>
										</div>
									)}
									{/* Gradient Overlay for Text Readability */}
									<div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

									{/* Leadership Info Overlay */}
									<div className="absolute bottom-0 left-0 w-full p-4 md:p-5 text-left flex justify-between items-end z-10">
										<div className="min-w-0 flex-1 pr-2">
											<h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-0.5 transition-transform duration-300 group-hover:-translate-y-1 whitespace-nowrap truncate">
												{leader.name}
											</h3>
											<p className="text-[9px] sm:text-[10px] font-bold text-orange-400 uppercase tracking-wider transition-transform duration-300 group-hover:-translate-y-1 leading-tight">
												{leader.role}
											</p>
										</div>
										<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-600 text-white opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
											<ArrowRight className="h-4 w-4" />
										</div>
									</div>
								</div>
							</motion.div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}

function AboutHero({ resolveAsset, isMobile }) {
	const aboutHeroAsset = resolveAsset(
		'about.hero',
		'/about-hero.jpg',
		'TSPL Group team'
	)

	return (
		<section className="relative flex flex-col justify-end sm:justify-center overflow-hidden min-h-[100svh] sm:min-h-[100svh] pt-28 pb-12 sm:pt-40 sm:pb-20">
			<div className="absolute inset-0">
				<ProgressiveImage src={aboutHeroAsset.url} alt={aboutHeroAsset.alt} width="1920" height="1080" className="h-full w-full object-cover object-center" />
				<div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/95 via-[#0F172A]/75 to-[#0F172A]/40 sm:bg-gradient-to-r sm:from-[#0F172A]/95 sm:via-[#0F172A]/80 sm:to-[#0F172A]/50" />
			</div>

			<div className="absolute right-0 top-20 h-64 w-64 rounded-full bg-[#2563EB]/10 blur-3xl hidden md:block" />

			<div className="relative z-10 w-full px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32">
				<div className="max-w-3xl">
					<div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">
						<span className="text-xs sm:text-sm font-semibold text-white">About TSPL Group</span>
					</div>

					<h1 className="mb-4 sm:mb-6 text-[2rem] leading-tight font-bold text-white sm:text-5xl lg:text-6xl xl:text-7xl">
						Building India&apos;s
						<span className="mt-1 block text-[#2563EB]">Future Workforce</span>
					</h1>

					<p className="mb-7 sm:mb-10 max-w-xl text-base sm:text-lg leading-relaxed text-white/80">
						A government-authorized staffing and skilling company empowering workers and transforming businesses across India.
					</p>

					<Link to="/contact-us" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold text-white shadow-xl shadow-[#F97316]/30 transition-all duration-300 active:scale-95 hover:bg-[#EA580C]">
						Our Services
						<ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
					</Link>
				</div>
			</div>
		</section>
	)
}

function OurStory({ resolveAsset, isMobile }) {
	const tsplLogoAsset = resolveAsset(
		'about.tsplLogo',
		'/tspl main logo.png',
		'TSPL logo'
	)

	const getOurStoryTextAnimProps = () => isMobile ? {} : {
		initial: { opacity: 0, y: 10 },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: true, amount: 0.2 },
		transition: { duration: 0.3, ease: 'easeOut' }
	};

	const getOurStoryH2AnimProps = () => isMobile ? {} : {
		initial: { opacity: 0, y: 16 },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: true, amount: 0.2 },
		transition: { delay: 0.08, duration: 0.35, ease: 'easeOut' }
	};

	const getOurStoryLogoAnimProps = () => isMobile ? {} : {
		initial: { opacity: 0, scale: 0.92 },
		whileInView: { opacity: 1, scale: 1 },
		viewport: { once: true, amount: 0.2 },
		transition: { delay: 0.1, duration: 0.35, ease: 'easeOut' }
	};

	const getOurStoryGridAnimProps = (delay) => isMobile ? {} : {
		initial: { opacity: 0, y: 16 },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: true, amount: 0.1 },
		transition: { delay: delay * 0.7, duration: 0.35, ease: 'easeOut' }
	};

	return (
		<section className="relative overflow-hidden bg-[#0A0A0B] py-16 sm:py-32 text-white">
			{/* Mesh Gradient Background — static, no animate-pulse to avoid GPU repaints */}
			<div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none hidden md:block">
				<div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-[#2563EB] blur-[120px]" />
				<div className="absolute top-[40%] -right-[20%] w-[60%] h-[60%] rounded-full bg-[#F97316] blur-[120px]" />
				<div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-[#8B5CF6] blur-[120px]" />
			</div>

			{/* Noise Overlay */}
			<div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIi8+PC9zdmc+')] mix-blend-overlay hidden md:block" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

				<div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
					<div className="max-w-2xl text-center md:text-left">
						<motion.p
							{...getOurStoryTextAnimProps()}
							className="mb-4 text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase"
						>
							Beyond Traditional Staffing
						</motion.p>
						<motion.h2
							{...getOurStoryH2AnimProps()}
							className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
						>
							We are the <br className="hidden md:block" />
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#F97316]">Catalyst.</span>
						</motion.h2>
					</div>
					<motion.div
						{...getOurStoryLogoAnimProps()}
						className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white shadow-2xl"
					>
						<img src={tsplLogoAsset.url} alt="TSPL Logo" className="w-20 h-20 object-contain" />
					</motion.div>
				</div>

				{/* Asymmetrical Bento Grid */}
				<div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:grid-rows-2">

					{/* The Vision Block (Spans 8 cols) */}
					<motion.div
						{...getOurStoryGridAnimProps(0.1)}
						className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-xl md:col-span-8 md:p-12"
					>
						<div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#2563EB]/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />
						<div className="relative z-10 h-full flex flex-col justify-between gap-8">
							<Target className="h-10 w-10 text-[#60A5FA]" />
							<div>
								<h3 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
									Bridging the gap between raw talent & industry demands.
								</h3>
								<p className="text-lg text-white/60 max-w-2xl">
									We don't just supply manpower; we engineer careers. Through elite programs like NAPS, NATS, and MAPS, we transform untrained individuals into specialized assets that power India's leading organizations.
								</p>
							</div>
						</div>
					</motion.div>

					{/* The Impact Stat (Spans 4 cols) */}
					<motion.div
						{...getOurStoryGridAnimProps(0.2)}
						className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#F97316] p-10 md:col-span-4"
					>
						{/* Subtle pattern overlay */}
						<div className="absolute inset-0 bg-black/10 opacity-30 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
						<div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
						<div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
							<div className="mb-2 text-6xl font-black tracking-tighter text-white sm:text-7xl md:text-8xl">40K<span className="text-[#FFE4E6]">+</span></div>
							<div className="text-sm font-bold uppercase tracking-[0.3em] text-[#FFF7ED]">Lives Elevated</div>
						</div>
					</motion.div>

					{/* Image / Graphic Block (Spans 5 cols) */}
					<motion.div
						{...getOurStoryGridAnimProps(0.3)}
						className="group relative h-80 overflow-hidden rounded-[2.5rem] bg-white md:col-span-5 md:h-auto"
					>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
						<ProgressiveImage src="/ABOUT.jpeg" alt="Workers" width="800" height="600" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
						<div className="absolute bottom-0 left-0 z-20 p-8">
							<div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-md">
								<span className="h-2 w-2 rounded-full bg-[#4ADE80] animate-pulse" />
								<span className="text-xs font-bold tracking-wider text-white uppercase">Active Pan-India</span>
							</div>
							<h3 className="text-2xl font-bold text-white sm:text-3xl">470+ Partner <br />Companies</h3>
						</div>
					</motion.div>

					{/* The Method Block (Spans 7 cols) */}
					<motion.div
						{...getOurStoryGridAnimProps(0.4)}
						className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:col-span-7 md:p-12 flex flex-col justify-center"
					>
						<div className="grid gap-6 sm:grid-cols-2">
							<div className="rounded-3xl border border-white/5 bg-white/5 p-8 transition-colors hover:bg-white/10">
								<div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB]/20">
									<Lightbulb className="h-7 w-7 text-[#60A5FA]" />
								</div>
								<h4 className="mb-3 text-2xl font-bold text-white">Real-World Skills</h4>
								<p className="text-base text-white/60 leading-relaxed">We focus entirely on practical, on-the-job training that translates directly to shop-floor success.</p>
							</div>
							<div className="rounded-3xl border border-white/5 bg-white/5 p-8 transition-colors hover:bg-white/10">
								<div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F97316]/20">
									<Building2 className="h-7 w-7 text-[#FB923C]" />
								</div>
								<h4 className="mb-3 text-2xl font-bold text-white">End-to-End Support</h4>
								<p className="text-base text-white/60 leading-relaxed">From strict compliance and payroll to welfare, we stand as an unwavering pillar for both workers and employers.</p>
							</div>
						</div>
					</motion.div>

				</div>
			</div>
		</section>
	)
}

function OurValues({ isMobile }) {
	return (
		<section className="relative overflow-hidden bg-white py-12 sm:py-20 lg:py-28">
			<div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#2563EB]/5 blur-3xl hidden md:block" />
			<div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F97316]/5 blur-3xl hidden md:block" />

			<div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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

function Achievements({ isMobile }) {
	return (
		<section className="bg-slate-50 py-12 sm:py-20 lg:py-28 relative overflow-hidden">
			{/* Decorative Background Elements */}
			<div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #0F172A 1px, transparent 0)', backgroundSize: '40px 40px' }} />
			<div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none hidden md:block" />
			<div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-orange-400/20 blur-[120px] pointer-events-none hidden md:block" />

			<div className="relative z-10 mx-auto w-full max-w-[96rem] px-4 sm:px-6 lg:px-8 flex flex-col h-full justify-center lg:justify-between gap-6 lg:gap-12">

				{/* Top Section: Header & Stats */}
				<div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-10 shrink-0 mb-12">
					<div className="max-w-xl">
						<div className="mb-2 lg:mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 backdrop-blur-md">
							<span className="text-[10px] lg:text-xs font-bold tracking-widest text-blue-700 uppercase">Our Journey</span>
						</div>
						<h2 className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-6xl tracking-tight">Our Achievements</h2>
						<p className="mt-2 lg:mt-4 text-base lg:text-lg text-slate-600">A decade of helping workers and businesses grow together.</p>
					</div>

					{/* Stats Grid */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 w-full lg:w-auto shrink-0">
						{achievements.map((item, i) => (
							<div key={item.label} className="flex flex-col justify-center rounded-2xl border border-slate-200 bg-white p-4 lg:p-5 shadow-sm transition-shadow hover:shadow-md">
								<item.icon className="mb-2 lg:mb-3 h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
								<p className="text-xl lg:text-2xl font-bold text-slate-900">{item.number}</p>
								<p className="text-[9px] lg:text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{item.label}</p>
							</div>
						))}
					</div>
				</div>

				{/* Middle Section: Interactive Alternating Timeline */}
				<div className="relative mx-auto w-full max-w-5xl py-6">
					{/* Center line for desktop, left line for mobile */}
					<div className="absolute left-4 md:left-1/2 md:-ml-px top-0 bottom-0 w-[2px] bg-slate-300/50" />

					<div className="space-y-6 md:space-y-10">
						{milestones.map((milestone, i) => {
							const isEven = i % 2 === 0;
							const getTimelineAnimProps = (isEven) => isMobile ? {} : {
								initial: { opacity: 0, x: isEven ? 30 : -30 },
								whileInView: { opacity: 1, x: 0 },
								viewport: { once: true, amount: 0.2 },
								transition: { duration: 0.35, ease: 'easeOut' }
							};
							return (
								<div key={i} className={`relative flex flex-col md:flex-row items-stretch md:items-center ${isEven ? 'md:flex-row-reverse' : ''} group`}>

									{/* Node on the line */}
									<div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full border-4 border-white bg-orange-500 z-10 shadow-lg transition-transform duration-300 group-hover:scale-150 group-hover:bg-blue-600 -translate-y-1/2 top-6 md:top-auto md:translate-y-0" />

									{/* Content Card Container */}
									<div className={`w-full min-w-0 pl-14 pr-4 md:w-1/2 md:px-12 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
										<motion.div
											{...getTimelineAnimProps(isEven)}
											className="w-full min-w-0 max-w-full p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-300 relative overflow-hidden"
										>
											{/* Decorative background glow on hover */}
											<div className={`absolute inset-0 bg-gradient-to-br from-blue-50/50 to-orange-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none`} />

											<div className="relative z-10">
												<p className="mb-2 text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">{milestone.year}</p>
												<h4 className="mb-3 text-xl md:text-2xl font-bold text-slate-900">{milestone.title}</h4>
												<p className="text-slate-600 text-sm md:text-base leading-relaxed">{milestone.description}</p>
											</div>
										</motion.div>
									</div>

									{/* Empty space for the other side on desktop */}
									<div className="hidden md:block w-1/2" />
								</div>
							);
						})}
					</div>
				</div>

				{/* Bottom Section: CTA */}
				<div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-blue-100 bg-blue-50 px-6 py-4 shadow-sm mx-auto w-full max-w-4xl shrink-0">
					<h3 className="text-base lg:text-lg font-bold text-slate-900 text-center sm:text-left">Ready to be part of our success story?</h3>
					<Link to="/contact-us" className="shrink-0 group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 lg:px-6 py-2.5 lg:py-3 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all hover:scale-105 hover:shadow-orange-500/25">
						Join Us Today
						<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Link>
				</div>
			</div>
		</section>
	)
}

export default function AboutPage() {
	useSEO({
		title: 'About - TSPL Group',
		description: 'Meet Dr. Mehboob Sayyad, Chairman and Managing Director of TalentCorp Solutions Private Limited (TSPL Group), alongside our Board of Directors.',
		keywords: 'Dr. Mehboob Sayyad, Dr. Mehboob Sayyed, Dr. Mahiboob Sayyad, Chairman, Managing Director, Sunil Chavan, Prakash Rathod, Deshbhushan Jain, TSPL Group, TalentCorp Solutions'
	});

	const pageAssets = usePageAssets()
	const resolveAsset = (key, fallbackUrl, fallbackAlt = '') => getPageAsset(pageAssets, key, fallbackUrl, fallbackAlt)
	// Initialize mobile-first (true) so Framer Motion never hides content with
	// initial: { opacity: 0 } before useEffect runs on mobile devices.
	const [isMobile, setIsMobile] = useState(() => {
		if (typeof window !== 'undefined') {
			return window.innerWidth < 768;
		}
		return true; // safe default: no animations until we know it's desktop
	});

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	return (
		<div className="min-h-screen bg-white text-slate-800">
			<script type="application/ld+json">
				{JSON.stringify({
					"@context": "https://schema.org",
					"@type": "AboutPage",
					"mainEntity": {
						"@type": "Organization",
						"name": "TalentCorp Solutions Private Limited",
						"alternateName": "TSPL Group",
						"url": "https://tsplgroup.in",
						"logo": "https://tsplgroup.in/tspl%20main%20logo.png",
						"founder": [
							{
								"@type": "Person",
								"name": "Dr. Mehboob Sayyad",
								"jobTitle": "Chairman and Managing Director",
								"description": "Dr. Mehboob Sayyad (also known as Dr. Mahiboob Sayyad or Dr. Mehboob Sayyed) is the Chairman and Managing Director of TalentCorp Solutions Private Limited (TSPL Group).",
								"image": "https://tsplgroup.in/visionaries/Dr%20mehboob%20Sayyad.png"
							},
							{
								"@type": "Person",
								"name": "Sunil Chavan",
								"jobTitle": "Director",
								"image": "https://tsplgroup.in/visionaries/Sunil%20Chavan.png"
							}
						],
						"employee": [
							{
								"@type": "Person",
								"name": "Deshbhushan Jain",
								"jobTitle": "Director",
								"image": "https://tsplgroup.in/visionaries/Deshbushan%20Jain.png"
							},
							{
								"@type": "Person",
								"name": "Prakash Rathod",
								"jobTitle": "Director",
								"image": "https://tsplgroup.in/visionaries/Prakash%20Rathod.png"
							},

							{
								"@type": "Person",
								"name": "Ruma Sayyad",
								"jobTitle": "Director",
								"image": "https://tsplgroup.in/visionaries/Ruma%20Sayyad.png"
							},
							{
								"@type": "Person",
								"name": "Sarang Chavan",
								"jobTitle": "Director",
								"image": "https://tsplgroup.in/visionaries/Sarang%20Chavan.png"
							},
							{
								"@type": "Person",
								"name": "Mr. Kishor More",
								"jobTitle": "General Manager"
							},
							{
								"@type": "Person",
								"name": "Mr. Mubarak Shaikh",
								"jobTitle": "General Manager, Operations",
								"image": "https://tsplgroup.in/leaders/2nd%20Photo%20Mr.%20Mubarak%20Shaikh%20(General%20Manager%20Overall%20Operation).jpeg"
							},
							{
								"@type": "Person",
								"name": "Mr. Gyanendra Mishra",
								"jobTitle": "Asst. General Manager, Sourcing",
								"image": "https://tsplgroup.in/leaders/3rd%20Mr.%20Gyanendra%20Mishra%20(Sourcing%20Head%20Pan%20India).jpeg"
							},
							{
								"@type": "Person",
								"name": "Mr. Vishal Ubale",
								"jobTitle": "Manager Sourcing & TPO Placement",
								"image": "https://tsplgroup.in/leaders/4th%20Photo%20Mr.Vishal%20Ubale%20(Sourcing%20Head%20&%20TPO%20Maharashtra).jpeg"
							},
							{
								"@type": "Person",
								"name": "Mr. Lokesh Pardeshi",
								"jobTitle": "Finance Head",
								"image": "https://tsplgroup.in/leaders/5th%20Photo%20%20Mr.%20Lokesh%20Pardeshi%20(Finance%20Head).jpeg"
							},
							{
								"@type": "Person",
								"name": "Mr. Shivanand Mane",
								"jobTitle": "Regional Head, Operations"
							},
							{
								"@type": "Person",
								"name": "Purushottam Gaikwad",
								"jobTitle": "Assistant General Manager, Operations"
							},
							{
								"@type": "Person",
								"name": "Mr. Namdev Egave",
								"jobTitle": "Payroll & Compliance Head"
							},
							{
								"@type": "Person",
								"name": "Mr. Rahul Borkar",
								"jobTitle": "Recruitment Head"
							}
						]
					}
				})}
			</script>
			<main>
				<AboutHero resolveAsset={resolveAsset} isMobile={isMobile} />
				<OurStory resolveAsset={resolveAsset} isMobile={isMobile} />
				<OurValues isMobile={isMobile} />
				<Achievements isMobile={isMobile} />
				<LeadershipSection isMobile={isMobile} />
				<ManagementSection isMobile={isMobile} />
				<DetailedProfileSection isMobile={isMobile} />
			</main>
			<Footer />
		</div>
	)
}
