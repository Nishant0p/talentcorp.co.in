import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
	ChevronLeft,
	ChevronRight,
	Mail,
	Phone,
	Users
} from 'lucide-react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useSEO from '../hooks/useSEO'

const leaderProfiles = {
	'dr-mehboob-sayyad': {
		name: 'Dr. Mehboob Sayyad',
		role: 'Chairman & Founder',
		category: 'Visionary',
		imageUrl: '/visionaries/Dr mehboob Sayyad.png',
		bio: 'Dr. Mehboob Sayyad is a visionary business leader, educationist, and pioneer in the Indian vocational training and human resource ecosystem. Over the last decade, he has built TSPL Group from a local operations agency into one of India’s premier government-authorized Third-Party Aggregators (TPA) for NAPS and NATS programs, earning a place in the prestigious World Book of Records (London).',
		longBio: 'With honorary doctorates and global awards representing his excellence in skill building across Sri Lanka, Thailand, Dubai, and India, Dr. Sayyad has established landmark MoUs with the Ministry of Skill Development, Employment & Entrepreneurship (Govt. of Maharashtra) to support youth skilling. He is also the author of the upcoming definitive book on industrial training, "Apprenticeship Act 1961", launched under high-level government presence in Goa.',
		expertise: ['Strategic HR Planning', 'Apprenticeship Act Consultation', 'Government Liaison', 'Policy Implementation', 'Vocational Education Models'],
		achievements: [
			'World Book of Records holder (London & Delhi) for scale in candidate training.',
			'1st Rank TPA in Western Region and 1st Rank TPA for NATS Mumbai (2023-24).',
			'Honorary Doctorates for international leadership and social development.',
			'Executed strategic MoUs with state ministries to boost regional youth placements.'
		],
		email: 'chairman@tsplgroup.in',
		phone: '+91 95615 04911',
		location: 'Pune, India'
	},
	'sunil-chavan': {
		name: 'Sunil Chavan',
		role: 'Director & Co-Founder',
		category: 'Visionary',
		imageUrl: '/visionaries/Sunil Chavan.png',
		bio: 'Sunil Chavan is the co-founder and Director of TSPL Group. With deep expertise in operational scalability and organizational growth, he directs the business development and corporate relationship frameworks for our major industrial accounts.',
		longBio: 'Mr. Chavan has been instrumental in managing large-scale candidate placements for top manufacturing and automobile brands including Haier, JCB, and Blue Star. His structural approach to staffing, team alignment, and client retention has consistently achieved a 98%+ satisfaction benchmark throughout his tenure.',
		expertise: ['Operations Management', 'Industrial Relations', 'Key Account Management', 'Scaling Staffing Programs', 'Resource Deployment'],
		achievements: [
			'Led the deployment of over 15,000+ technical candidates.',
			'Secured long-term partnerships with Fortune 500 electronics & automotive brands.',
			'Spearheaded regional expansion programs covering 20+ cities in India.'
		],
		email: 'sunil.chavan@tsplgroup.in',
		phone: '+91 95615 04911',
		location: 'Pune, India'
	},
	'deshbhushan-jain': {
		name: 'Deshbhushan Jain',
		role: 'Director',
		category: 'Director',
		imageUrl: '/visionaries/Deshbushan Jain.png',
		bio: 'Deshbhushan Jain is a seasoned Director at TSPL Group, advising on regulatory frameworks, strategic financial alignment, and corporate governance.',
		longBio: 'With a background in financial planning and governance, Mr. Jain plays an essential advisory role in ensuring TSPL Group aligns with government guidelines, labor regulations, and corporate compliance standards.',
		expertise: ['Financial Governance', 'Risk Management', 'Regulatory Compliance', 'Corporate Strategy'],
		achievements: [
			'Over 10+ years of advisory experience in regulatory corporate compliance.',
			'Structured corporate governance strategies for scale-up operations.'
		],
		email: 'info@tsplgroup.in',
		phone: '+91 95615 04911',
		location: 'Pune, India'
	},
	'prakash-rathod': {
		name: 'Prakash Rathod',
		role: 'Director',
		category: 'Director',
		imageUrl: '/visionaries/Prakash Rathod.png',
		bio: 'Prakash Rathod is a Director at TSPL Group, leading our infrastructure and logistics alignment across central and western India.',
		longBio: 'Mr. Rathod manages operational resources, logistical infrastructures, and field deployments to support massive candidate movements during regional recruitment drives.',
		expertise: ['Logistics Coordination', 'Field Operations', 'Infrastructure Alignment', 'Vendor Management'],
		achievements: [
			'Managed field logistics for high-volume recruitment drives covering 5,000+ candidates.',
			'Enhanced operational resource distribution across western regions.'
		],
		email: 'info@tsplgroup.in',
		phone: '+91 95615 04911',
		location: 'Pune, India'
	},
	'ruma-sayyad': {
		name: 'Ruma Sayyad',
		role: 'Director',
		category: 'Director',
		imageUrl: '/visionaries/Ruma Sayyad.png',
		bio: 'Ruma Sayyad is a Director at TSPL Group, championing women empowerment programs, vocational diversity, and corporate social responsibility (CSR) initiatives.',
		longBio: 'Mrs. Sayyad has led the creation of special women-led training cohorts, ensuring gender diversity and equal employment opportunities. Her initiatives link CSR programs directly to skill development.',
		expertise: ['CSR Alignment', 'Diversity & Inclusion', 'Vocational Skill Seminars', 'Public Relations'],
		achievements: [
			'Launched dedicated skill training batches for women candidates.',
			'Managed CSR partnerships with national brands for community skilling.'
		],
		email: 'info@tsplgroup.in',
		phone: '+91 95615 04911',
		location: 'Pune, India'
	},
	'sarang-chavan': {
		name: 'Sarang Chavan',
		role: 'Director',
		category: 'Director',
		imageUrl: '/visionaries/Sarang Chavan.png',
		bio: 'Sarang Chavan is a Director at TSPL Group, overseeing brand communication, technology integrations, and digital platforms.',
		longBio: 'Mr. Sarang focuses on technological enhancements, candidate tracking databases, and operational digitization to speed up response times for candidate deployments.',
		expertise: ['Brand Strategy', 'Technology Integration', 'Data Operations', 'System Optimization'],
		achievements: [
			'Digitized the candidate verification and deployment pipeline.',
			'Headed the deployment of CRM integrations for partner corporate portals.'
		],
		email: 'info@tsplgroup.in',
		phone: '+91 95615 04911',
		location: 'Pune, India'
	},
	'kishor-more': {
		name: 'Mr. Kishor More',
		role: 'General Manager - Business Development',
		category: 'Leader',
		imageUrl: '/leaders/1 mr kishore more.jpg',
		bio: 'Mr. Kishor More leads the Business Development department at TSPL Group, managing client acquisition, strategic growth proposals, and partnerships.',
		longBio: 'With extensive industry knowledge, Mr. More has secured partnerships with top automotive, production, and manufacturing companies in India, ensuring robust options for our candidate pool.',
		expertise: ['Business Development', 'Client Acquisition', 'Partnership Development', 'Market Intelligence'],
		achievements: [
			'Acquired over 80+ new corporate clients for apprenticeship structures.',
			'Expanded regional market presence into emerging manufacturing hubs.'
		],
		email: 'kishor.more@tsplgroup.in',
		phone: '+91 95615 04911',
		location: 'Pune, India'
	},
	'mubarak-shaikh': {
		name: 'Mr. Mubarak Shaikh',
		role: 'General Manager Overall Operation',
		category: 'Leader',
		imageUrl: '/leaders/2 Mr. Mubarak Shaikh.jpg',
		bio: 'Mr. Mubarak Shaikh is the General Manager of Operations, ensuring day-to-day coordination, execution, and quality control of placements.',
		longBio: 'Mr. Shaikh manages operational departments, site supervisors, and candidate coordination to guarantee high placement retention and smooth candidate transition.',
		expertise: ['Operations Leadership', 'Performance Monitoring', 'Resource Allocation', 'Conflict Resolution'],
		achievements: [
			'Achieved a 95% placement retention rate across major operations.',
			'Supervised the deployment of candidate operations in multi-state locations.'
		],
		email: 'mubarak@tsplgroup.in',
		phone: '+91 95615 04911',
		location: 'Pune, India'
	},
	'gyanendra-mishra': {
		name: 'Mr. Gyanendra Mishra',
		role: 'Sourcing Head Pan India',
		category: 'Leader',
		imageUrl: '/leaders/3 mr gyanendra mishra.jpg',
		bio: 'Mr. Gyanendra Mishra leads sourcing operations across all states in India, organizing large-scale mobilization programs.',
		longBio: 'Mr. Mishra manages our massive network of regional recruiters, local agents, and college tie-ups to deliver high-volume sourcing requests within short deadlines.',
		expertise: ['Sourcing Operations', 'National Mobilization', 'Recruitment Logistics', 'Outreach Networks'],
		achievements: [
			'Managed the sourcing of over 10,000+ candidates in a single year.',
			'Established active recruitment networks across 15+ states.'
		],
		email: 'sourcing@tsplgroup.in',
		phone: '+91 95615 04911',
		location: 'Pune, India'
	},
	'vishal-ubale': {
		name: 'Mr. Vishal Ubale',
		role: 'Sourcing Head & TPO Maharashtra',
		category: 'Leader',
		imageUrl: '/leaders/4 mr vishal ubale.jpg',
		bio: 'Mr. Vishal Ubale serves as Sourcing Head and Training & Placement Officer for Maharashtra, guiding local youth into manufacturing sectors.',
		longBio: 'Mr. Ubale specializes in connecting Maharashtra’s ITI/polytechnic students with active industrial opportunities, utilizing close links with colleges and local training departments.',
		expertise: ['Regional Sourcing', 'College Placement Coordination', 'Student Counseling', 'TPO Management'],
		achievements: [
			'Placed over 4,500+ trainees across Maharashtra.',
			'Coordinated large-scale job fairs in partnership with local authorities.'
		],
		email: 'vishal.u@tsplgroup.in',
		phone: '+91 95615 04911',
		location: 'Maharashtra, India'
	},
	'lokesh-pardeshi': {
		name: 'Mr. Lokesh Pardeshi',
		role: 'Finance Head',
		category: 'Leader',
		imageUrl: '/leaders/5 lokesh.jpg',
		bio: 'Mr. Lokesh Pardeshi heads the finance and account management departments of TSPL Group, ensuring precise budgeting and transactions.',
		longBio: 'Mr. Pardeshi oversees payroll funding, statutory payout clearances, and budget reporting, ensuring financial compliance and seamless transaction services.',
		expertise: ['Corporate Finance', 'Budget Control', 'Accounting Systems', 'Payroll Financial Clearance'],
		achievements: [
			'Optimized financial workflows to guarantee on-time monthly salary disbursals.',
			'Spearheaded audits with zero reporting errors.'
		],
		email: 'finance@tsplgroup.in',
		phone: '+91 95615 04911',
		location: 'Pune, India'
	},
	'purushottam-gaikwad': {
		name: 'Purushottam Gaikwad',
		role: 'Assistant General Manager in Operation',
		category: 'Leader',
		imageUrl: '/leaders/6 mr purshotam gaikwad.jpg',
		bio: 'Purushottam Gaikwad is the Assistant General Manager in Operations, helping run our largest regional candidate programs.',
		longBio: 'Mr. Gaikwad acts as the direct link between general management and site operations, maintaining clean workplace metrics, student discipline, and safety standards.',
		expertise: ['Operational Support', 'Site Management', 'Safety Controls', 'Staff Alignment'],
		achievements: [
			'Successfully launched 12+ large site deployment projects.',
			'Reduced regional onboarding cycle times by 20%.'
		],
		email: 'purushottam@tsplgroup.in',
		phone: '+91 95615 04911',
		location: 'Pune, India'
	},
	'shivanand-mane': {
		name: 'Mr. Shivanand Mane',
		role: 'Regional Head',
		category: 'Leader',
		imageUrl: '/leaders/7 mr shivanand mane .jpg',
		bio: 'Mr. Shivanand Mane is the Regional Head, supervising operations, client relations, and logistics in eastern and southern zones.',
		longBio: 'Mr. Mane coordinates regional offices, local mobilization programs, and client feedback cycles, maintaining stable service quality across distant zones.',
		expertise: ['Regional Management', 'Local Outreach', 'Client Relations', 'Logistics Operations'],
		achievements: [
			'Supervised the opening of 3 new regional branch offices.',
			'Expanded local trainee recruitment in eastern sectors.'
		],
		email: 'mane.s@tsplgroup.in',
		phone: '+91 95615 04911',
		location: 'Pune, India'
	},
	'namdev-egave': {
		name: 'Mr. Namdev Egave',
		role: 'Payroll & Compliance Head',
		category: 'Leader',
		imageUrl: '/leaders/8 Mr Namdev Egave.jpg',
		bio: 'Mr. Namdev Egave leads payroll operations and regulatory compliance, ensuring correct statutory deductions.',
		longBio: 'Mr. Egave monitors PF, ESI, and other labor-related filings. Under his oversight, TSPL maintains a clean record with government compliance departments.',
		expertise: ['Labor Laws', 'Payroll Compliance', 'Statutory Filings', 'PF & ESI Management'],
		achievements: [
			'Managed monthly payroll compliance for 25,000+ active candidates.',
			'Achieved audit approvals with zero compliance penalties.'
		],
		email: 'compliance@tsplgroup.in',
		phone: '+91 95615 04911',
		location: 'Pune, India'
	},
	'rahul-borkar': {
		name: 'Mr. Rahul Borkar',
		role: 'Recruitment Head',
		category: 'Leader',
		imageUrl: '/leaders/9 mr rahul borkar.jpg',
		bio: 'Mr. Rahul Borkar is the Recruitment Head of TSPL Group, managing recruitment targets and selection procedures.',
		longBio: 'Mr. Borkar oversees digital databases, job listings, interview cycles, and candidate selections, matching qualified profiles with corporate needs.',
		expertise: ['Talent Sourcing', 'Selection Standards', 'Interviews & Onboarding', 'Recruiting Pipelines'],
		achievements: [
			'Shortened placement cycle times to support 48-hour hiring goals.',
			'Integrated digital ATS systems to track candidate applications.'
		],
		email: 'recruitment@tsplgroup.in',
		phone: '+91 95615 04911',
		location: 'Pune, India'
	},
	'samruddhi-chavan': {
		name: 'Miss. Samruddhi Chavan',
		role: 'OverAll Head',
		category: 'Leader',
		imageUrl: '/leaders/samruddhi.jpeg',
		bio: 'Miss. Samruddhi Chavan leads recruitment initiatives and candidate coordination at TSPL Group.',
		longBio: 'Miss. Samruddhi Chavan manages talent acquisition, applicant screening, and candidate relationship pipelines to fulfill corporate manpower requirements efficiently.',
		expertise: ['Recruitment Operations', 'Talent Sourcing', 'Candidate Coordination', 'Placement Management'],
		achievements: [
			'Spearheaded recruitment drives across multiple regional operational zones.',
			'Enhanced candidate placement efficiency for client partners.'
		],
		email: 'samruddhi@tsplgroup.in',
		phone: '+91 95615 04911',
		location: 'Pune, India'
	}
}

export default function LeaderProfilePage() {
	const { slug } = useParams()
	const navigate = useNavigate()
	const profile = leaderProfiles[slug]

	const leadersContainerRef = useRef(null)

	const [scrollProgress, setScrollProgress] = useState({
		left: 0,
		width: 25
	})

	useEffect(() => {
		if (!profile) {
			navigate('/about', { replace: true })
		}
	}, [profile, navigate])

	useSEO({
		title: profile
			? `${profile.name} - ${profile.role} | TSPL Group`
			: 'Leader Profile | TSPL Group',

		description: profile
			? `${profile.name} serves as ${profile.role} at TSPL Group. Read their professional biography, career milestones, and expertise.`
			: 'TSPL Group leadership profiles.',

		keywords: profile
			? `${profile.name}, ${profile.role}, TSPL Group Leader, Biography, HR Industry Expert`
			: 'TSPL Group, Leadership, Director Biography'
	})

	const updateScrollProgress = useCallback(() => {
		const container = leadersContainerRef.current

		if (!container) return

		const maximumScroll =
			container.scrollWidth - container.clientWidth

		const visiblePercentage =
			container.scrollWidth > 0
				? (container.clientWidth / container.scrollWidth) * 100
				: 100

		const indicatorWidth = Math.max(
			Math.min(visiblePercentage, 100),
			20
		)

		const currentProgress =
			maximumScroll > 0
				? container.scrollLeft / maximumScroll
				: 0

		const indicatorLeft =
			currentProgress * (100 - indicatorWidth)

		setScrollProgress({
			left: indicatorLeft,
			width: indicatorWidth
		})
	}, [])

	useEffect(() => {
		const frame = requestAnimationFrame(updateScrollProgress)

		window.addEventListener('resize', updateScrollProgress)

		return () => {
			cancelAnimationFrame(frame)
			window.removeEventListener(
				'resize',
				updateScrollProgress
			)
		}
	}, [updateScrollProgress, slug])

	if (!profile) {
		return null
	}

	const otherLeaders = Object.entries(leaderProfiles).filter(
		([key]) => key !== slug
	)

	const scrollLeaders = direction => {
		const container = leadersContainerRef.current

		if (!container) return

		container.scrollBy({
			left:
				direction *
				Math.max(container.clientWidth * 0.75, 300),
			behavior: 'smooth'
		})
	}

	const schemaData = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: profile.name,
		jobTitle: profile.role,
		worksFor: {
			'@type': 'Organization',
			name: 'TalentCorp Solutions Private Limited (TSPL Group)',
			url: 'https://tsplgroup.in'
		},
		description: profile.bio,
		image: `https://tsplgroup.in${profile.imageUrl}`,
		telephone: profile.phone,
		email: profile.email,
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Pune',
			addressRegion: 'Maharashtra',
			addressCountry: 'India'
		}
	}

	return (
		<div className="min-h-screen bg-[#f8f9fc] font-sans text-[#12213f]">
			<Navbar />

			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(schemaData)
				}}
			/>

			<main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pt-28">
				<div className="mx-auto w-full max-w-[1440px]">
					{/* Back button */}
					<Link
						to="/about"
						className="mb-7 inline-flex items-center gap-2 text-base font-bold text-[#075dcb] transition-colors hover:text-[#ff6717] sm:text-lg"
					>
						<ChevronLeft
							className="h-6 w-6"
							strokeWidth={2.8}
						/>

						<span>Back to About Us</span>
					</Link>

					{/* Main profile card */}
					<section className="relative isolate overflow-hidden rounded-[24px] bg-white shadow-[0_18px_55px_rgba(18,42,84,0.14)]">
						{/* Orange diagonal border */}
						<div
							className="pointer-events-none absolute inset-y-0 left-0 hidden w-[44.7%] bg-[#ff6a18] lg:block"
							style={{
								clipPath:
									'polygon(0 0, 100% 0, 87% 100%, 0 100%)'
							}}
						/>

						{/* Blue diagonal panel */}
						<div
							className="pointer-events-none absolute inset-y-0 left-0 hidden w-[43.5%] bg-gradient-to-br from-[#0753bc] via-[#0969dc] to-[#0055bd] lg:block"
							style={{
								clipPath:
									'polygon(0 0, 100% 0, 87% 100%, 0 100%)'
							}}
						/>

						{/* Mobile blue background */}
						<div className="pointer-events-none absolute inset-x-0 top-0 h-[430px] bg-gradient-to-br from-[#0753bc] via-[#0969dc] to-[#0055bd] lg:hidden" />

						{/* Left decorative dots */}
						<div className="pointer-events-none absolute left-7 top-[160px] hidden grid-cols-3 gap-5 opacity-45 lg:grid">
							{Array.from({ length: 12 }).map(
								(_, index) => (
									<span
										key={index}
										className="h-1.5 w-1.5 rounded-full bg-[#83bdff]"
									/>
								)
							)}
						</div>

						{/* Top-right decorative dots */}
						<div className="pointer-events-none absolute right-10 top-12 hidden grid-cols-7 gap-4 opacity-60 sm:grid">
							{Array.from({ length: 35 }).map(
								(_, index) => (
									<span
										key={index}
										className="h-1.5 w-1.5 rounded-full bg-[#ffc09d]"
									/>
								)
							)}
						</div>

						{/* Right curved decoration */}
						<div className="pointer-events-none absolute -bottom-[290px] -right-[210px] hidden h-[620px] w-[620px] rounded-full border-[64px] border-[#fff0e9] lg:block" />

						<div className="pointer-events-none absolute -bottom-[320px] -right-[265px] hidden h-[620px] w-[620px] rounded-full border-[84px] border-[#fbe0d4]/60 lg:block" />

						<div className="pointer-events-none absolute -bottom-[238px] -right-[230px] hidden h-[410px] w-[410px] rounded-full bg-gradient-to-br from-[#1675ef] to-[#0052bd] lg:block" />

						<div className="relative grid min-h-[540px] lg:grid-cols-[43%_57%]">
							{/* Profile image */}
							<div className="flex items-center justify-center px-6 pb-8 pt-10 sm:px-10 lg:px-12 lg:py-12 xl:px-20">
								<figure className="relative m-0 aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-[23px] border-2 border-white bg-[#1972e8]/30 shadow-[0_22px_42px_rgba(0,36,105,0.28)]">
									<div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-white/5 to-[#002d87]/5" />

									<img
										src={profile.imageUrl}
										alt={`${profile.name} - ${profile.role} at TSPL Group`}
										title={`${profile.name} - ${profile.role}`}
										className={`h-full w-full object-cover object-top ${slug === 'ruma-sayyad'
											? 'scale-110 origin-top'
											: ''
											}`}
									/>

									<figcaption className="sr-only">
										{profile.name} - {profile.role} at
										TSPL Group
									</figcaption>
								</figure>
							</div>

							{/* Profile information */}
							<div className="relative z-20 flex items-center bg-white px-7 py-11 sm:px-12 lg:bg-transparent lg:px-16 lg:py-14 xl:px-24">
								<div className="w-full max-w-[680px]">
									<div className="mb-6 flex h-[62px] w-[62px] items-center justify-center rounded-full bg-gradient-to-br from-[#ff8a26] to-[#ff5b0b] shadow-[0_10px_24px_rgba(255,104,19,0.28)]">
										<Users
											className="h-8 w-8 text-white"
											strokeWidth={2.4}
										/>
									</div>

									<h1 className="text-[34px] font-black leading-[1.08] tracking-[-0.035em] text-[#09245d] sm:text-[42px] lg:text-[46px] xl:text-[50px]">
										{profile.name}
									</h1>

									<p className="mt-3 text-lg font-extrabold uppercase tracking-[0.04em] text-[#ff6817] sm:text-[22px]">
										{profile.role}
									</p>

									<div className="mt-5 h-1 w-16 rounded-full bg-[#ff6817]" />

									<p className="mt-7 max-w-[650px] text-base leading-7 text-[#263752] sm:text-[18px] sm:leading-8">
										{profile.bio}
									</p>

									<div className="mt-8 flex flex-col gap-4 text-sm font-medium text-[#273752] sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 sm:text-base">
										<a
											href={`mailto:${profile.email}`}
											className="inline-flex min-w-0 items-center gap-3 transition-colors hover:text-[#075dcb]"
										>
											<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1764ce] text-white shadow-md">
												<Mail
													className="h-[18px] w-[18px]"
													strokeWidth={2.4}
												/>
											</span>

											<span className="break-all sm:break-normal">
												{profile.email}
											</span>
										</a>

										<span className="hidden h-7 w-px bg-[#ff6b18] sm:block" />

										<a
											href={`tel:${profile.phone.replace(
												/[^\d+]/g,
												''
											)}`}
											className="inline-flex items-center gap-3 transition-colors hover:text-[#075dcb]"
										>
											<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1764ce] text-white shadow-md">
												<Phone
													className="h-[18px] w-[18px]"
													strokeWidth={2.4}
												/>
											</span>

											<span>{profile.phone}</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Other team leaders */}
					<section className="mt-8 overflow-hidden rounded-[24px] bg-gradient-to-r from-[#06357f] via-[#0749a3] to-[#0756c8] px-4 py-6 shadow-[0_18px_55px_rgba(8,50,122,0.24)] sm:px-7 sm:py-7 lg:px-12">
						<div className="mb-6 flex items-center gap-4">
							<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ff8a26] to-[#ff5b0b] shadow-lg">
								<Users
									className="h-7 w-7 text-white"
									strokeWidth={2.4}
								/>
							</div>

							<div>
								<h2 className="text-[23px] font-black text-white sm:text-[28px]">
									Other Team Leaders
								</h2>

								<div className="mt-2 h-1 w-12 rounded-full bg-[#ff6817]" />
							</div>
						</div>

						<div className="relative">
							{/* Left arrow */}
							<button
								type="button"
								onClick={() => scrollLeaders(-1)}
								aria-label="Show previous team leaders"
								className="absolute -left-1 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#ff6b18] text-white shadow-lg transition-all hover:scale-105 hover:bg-[#ff7b2d] sm:-left-5"
							>
								<ChevronLeft
									className="h-7 w-7"
									strokeWidth={2.8}
								/>
							</button>

							{/* Leaders carousel */}
							<div
								ref={leadersContainerRef}
								onScroll={updateScrollProgress}
								className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-12 pb-4 sm:px-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
							>
								{otherLeaders.map(([key, item]) => (
									<Link
										key={key}
										to={`/leader/${key}`}
										className="group flex min-h-[136px] w-[285px] shrink-0 snap-start items-center gap-4 rounded-[20px] border border-white/15 bg-white/[0.07] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.12] sm:w-[325px]"
									>
										<div className="h-[82px] w-[82px] shrink-0 overflow-hidden rounded-[14px] bg-white p-1 shadow-lg">
											<img
												src={item.imageUrl}
												alt={`${item.name} - ${item.role}`}
												className="h-full w-full rounded-[10px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
											/>
										</div>

										<div className="min-w-0">
											<h3 className="line-clamp-2 text-[17px] font-extrabold leading-6 text-white">
												{item.name}
											</h3>

											<p className="mt-1 line-clamp-2 text-[13px] font-bold uppercase leading-5 tracking-[0.02em] text-[#ff751f]">
												{item.role}
											</p>

											<div className="mt-2 h-[3px] w-9 rounded-full bg-[#ff6817]" />
										</div>
									</Link>
								))}
							</div>

							{/* Right arrow */}
							<button
								type="button"
								onClick={() => scrollLeaders(1)}
								aria-label="Show next team leaders"
								className="absolute -right-1 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#ff6b18] text-white shadow-lg transition-all hover:scale-105 hover:bg-[#ff7b2d] sm:-right-5"
							>
								<ChevronRight
									className="h-7 w-7"
									strokeWidth={2.8}
								/>
							</button>
						</div>

						{/* Scroll progress bar */}
						<div className="mx-12 mt-2 h-3 overflow-hidden rounded-full border-2 border-white/80 bg-white/90 sm:mx-14">
							<div
								className="h-full rounded-full bg-[#ff6817] transition-[width,left] duration-200"
								style={{
									position: 'relative',
									left: `${scrollProgress.left}%`,
									width: `${scrollProgress.width}%`
								}}
							/>
						</div>
					</section>
				</div>
			</main>

			<Footer />
		</div>
	)
}
