import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
	ChevronLeft,
	ChevronRight,
	Users,
	ArrowRight
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
		bio: `Dr. Mehboob Sayyad is the Founder and Chairman of TSPL Group and a renowned leader in India's skilling, apprenticeship, and workforce development ecosystem. With decades of experience in education, employment generation, and industry-academia collaboration, he has successfully built TSPL Group into one of India's trusted staffing and apprenticeship management organizations. Under his leadership, TSPL has empowered thousands of candidates through NAPS, NATS, BOAT, and MAPS programs while supporting industries with skilled workforce solutions.

A recipient of multiple national and international awards, Dr. Sayyad is widely recognized for his contribution to skill development and employment generation. He has recently authored and published a book on the Apprentices Act, 1961, reflecting his deep expertise and commitment to strengthening apprenticeship awareness and implementation across India. His visionary leadership continues to drive innovation, growth, and social impact through TSPL Group.`,
		longBio: 'With honorary doctorates and global awards representing his excellence in skill building across Sri Lanka, Thailand, Dubai, and India, Dr. Sayyad has established landmark MoUs with the Ministry of Skill Development, Employment & Entrepreneurship (Govt. of Maharashtra) to support youth skilling. He is also the author of the upcoming definitive book on industrial training, "Apprenticeship Act 1961", launched under high-level government presence in Goa.',
		expertise: ['Strategic HR Planning', 'Apprenticeship Act Consultation', 'Government Liaison', 'Policy Implementation', 'Vocational Education Models'],
		achievements: [
			'World Book of Records holder (London & Delhi) for scale in candidate training.',
			'1st Rank TPA in Western Region and 1st Rank TPA for NATS Mumbai (2023-24).',
			'Honorary Doctorates for international leadership and social development.',
			'Executed strategic MoUs with state ministries to boost regional youth placements.'
		],
		location: 'Pune, India'
	},
	'sunil-chavan': {
		name: 'Sunil Chavan',
		role: 'Director & Co-Founder',
		category: 'Visionary',
		imageUrl: '/visionaries/Sunil Chavan.png',
		bio: `Sunil Chavan is the Co-Founder and Director of TSPL Group, playing a pivotal role in the organization's growth and operational excellence since its inception. He has been instrumental in establishing strong client relationships and developing workforce solutions that cater to diverse industry sectors including manufacturing, logistics, healthcare, retail, and engineering.

With extensive experience in manpower management, staffing operations, and apprenticeship implementation, he has helped TSPL build a reputation for reliability and service quality. His practical leadership approach, combined with a strong understanding of industry requirements, continues to strengthen TSPL's position as a trusted workforce solutions partner across India.`,
		longBio: 'Mr. Chavan has been instrumental in managing large-scale candidate placements for top manufacturing and automobile brands including Haier, JCB, and Blue Star. His structural approach to staffing, team alignment, and client retention has consistently achieved a 98%+ satisfaction benchmark throughout his tenure.',
		expertise: ['Operations Management', 'Industrial Relations', 'Key Account Management', 'Scaling Staffing Programs', 'Resource Deployment'],
		achievements: [
			'Led the deployment of over 15,000+ technical candidates.',
			'Secured long-term partnerships with Fortune 500 electronics & automotive brands.',
			'Spearheaded regional expansion programs covering 20+ cities in India.'
		],
		location: 'Pune, India'
	},
	'deshbhushan-jain': {
		name: 'Deshbhushan Jain',
		role: 'Director',
		category: 'Director',
		imageUrl: '/visionaries/Deshbushan Jain.png',
		bio: `Deshbhushan Jain serves as Director at TSPL Group and leads operations and business development activities across the Talegaon region. He oversees workforce deployment, client relationship management, staffing operations, and regional business expansion initiatives for various industrial and manufacturing clients.

His strong operational expertise and commitment to service excellence have helped strengthen TSPL's presence in the region. Through effective leadership and strategic planning, he continues to drive operational efficiency, client satisfaction, and sustainable business growth. His focus on operational excellence and client-centric solutions continues to drive business growth and workforce development across the region.`,
		longBio: 'With a background in financial planning and governance, Mr. Jain plays an essential advisory role in ensuring TSPL Group aligns with government guidelines, labor regulations, and corporate compliance standards.',
		expertise: ['Financial Governance', 'Risk Management', 'Regulatory Compliance', 'Corporate Strategy'],
		achievements: [
			'Over 10+ years of advisory experience in regulatory corporate compliance.',
			'Structured corporate governance strategies for scale-up operations.'
		],
		location: 'Pune, India'
	},
	'prakash-rathod': {
		name: 'Prakash Rathod',
		role: 'Director',
		category: 'Director',
		imageUrl: '/visionaries/Prakash Rathod.png',
		bio: `Prakash Rathod is a Director at TSPL Group and leads business operations across the Ahilyanagar (Ahmednagar) Region, managing workforce solutions, client relationships, and business development activities for the organization. He works closely with major manufacturing, engineering, automotive, and industrial organizations to deliver effective staffing, recruitment, and apprenticeship solutions.

With extensive experience in workforce management, industrial staffing, and apprenticeship implementation, he has played a significant role in strengthening TSPL's presence among leading industrial clients in the region. His focus on operational excellence, client engagement, and workforce development continues to drive business growth while ensuring high-quality service delivery and long-term partnerships across the Ahilyanagar zone.`,
		longBio: 'Mr. Rathod manages operational resources, logistical infrastructures, and field deployments to support massive candidate movements during regional recruitment drives.',
		expertise: ['Logistics Coordination', 'Field Operations', 'Infrastructure Alignment', 'Vendor Management'],
		achievements: [
			'Managed field logistics for high-volume recruitment drives covering 5,000+ candidates.',
			'Enhanced operational resource distribution across western regions.'
		],
		location: 'Pune, India'
	},
	'ruma-sayyad': {
		name: 'Ruma Sayyad',
		role: 'Director',
		category: 'Director',
		imageUrl: '/visionaries/Ruma Sayyad.png',
		bio: `Ruma Sayyad serves as Director at TSPL Group and contributes to the organization's governance, culture, and long-term development initiatives. She supports the company's commitment to ethical business practices, employee engagement, and organizational values.

Her guidance helps strengthen TSPL's people-centric approach while ensuring alignment with the company's mission and vision. Through her contribution to organizational development, she continues to support the sustainable growth and stability of the organization.`,
		longBio: 'Mrs. Sayyad has led the creation of special women-led training cohorts, ensuring gender diversity and equal employment opportunities. Her initiatives link CSR programs directly to skill development.',
		expertise: ['CSR Alignment', 'Diversity & Inclusion', 'Vocational Skill Seminars', 'Public Relations'],
		achievements: [
			'Launched dedicated skill training batches for women candidates.',
			'Managed CSR partnerships with national brands for community skilling.'
		],
		location: 'Pune, India'
	},
	'sarang-chavan': {
		name: 'Sarang Chavan',
		role: 'Director',
		category: 'Director',
		imageUrl: '/visionaries/Sarang Chavan.png',
		bio: `Sarang Chavan is a Director at TSPL Group and a dynamic leader driving the organization's growth through technology, innovation, business strategy, and workforce solutions. With extensive experience across Information Technology, Recruitment, Operations, Compliance, Marketing, Branding, and Business Development, he brings a unique 360-degree leadership perspective that supports both organizational growth and client success.

He plays a key role in shaping TSPL's long-term vision by leading strategic initiatives, strengthening business partnerships, and driving operational excellence across multiple functions. His expertise extends beyond technology into talent acquisition, workforce management, regulatory compliance, and organizational development, enabling TSPL Group to deliver integrated workforce solutions across India.

Passionate about innovation and digital transformation, Sarang has been instrumental in implementing technology-driven systems, recruitment automation, process improvements, and branding initiatives that enhance efficiency, transparency, and client satisfaction. He actively collaborates with industry partners, educational institutions, and corporate organizations to expand opportunities for both businesses and job seekers.

Under his leadership, TSPL Group continues to strengthen its position as a trusted partner for Staffing, Recruitment, Apprenticeship Management (NAPS/NATS/BOAT/MAPS), Payroll, Compliance, and Workforce Development services. His vision remains focused on empowering talent, fostering innovation, and creating sustainable growth opportunities that deliver long-term value to clients, candidates, and stakeholders.`,
		longBio: 'Mr. Sarang focuses on technological enhancements, candidate tracking databases, and operational digitization to speed up response times for candidate deployments.',
		expertise: ['Brand Strategy', 'Technology Integration', 'Data Operations', 'System Optimization'],
		achievements: [
			'Digitized the candidate verification and deployment pipeline.',
			'Headed the deployment of CRM integrations for partner corporate portals.'
		],
		location: 'Pune, India'
	},
	'kishor-more': {
		name: 'Kishor More',
		role: 'General Manager',
		category: 'Leader',
		imageUrl: '/leaders/1 mr kishore more.jpg',
		bio: `Kishor More serves as the General Manager at TSPL Group and plays a key role in driving the organization's growth strategy. He leads client acquisition, strategic partnerships, and business expansion initiatives across staffing, recruitment, apprenticeship, and workforce management services.

His strong understanding of market dynamics and customer requirements has helped TSPL establish long-term partnerships with leading organizations across various industries. Through his leadership and relationship-building capabilities, he continues to contribute significantly to the company's expansion and market leadership position.`,
		longBio: 'With extensive industry knowledge, Mr. More has secured partnerships with top automotive, production, and manufacturing companies in India, ensuring robust options for our candidate pool.',
		expertise: ['Business Development', 'Client Acquisition', 'Partnership Development', 'Market Intelligence'],
		achievements: [
			'Acquired over 80+ new corporate clients for apprenticeship structures.',
			'Expanded regional market presence into emerging manufacturing hubs.'
		],
		location: 'Pune, India'
	},
	'mubarak-shaikh': {
		name: 'Mubarak Shaikh',
		role: 'General Manager, Operations',
		category: 'Leader',
		imageUrl: '/leaders/2 Mr. Mubarak Shaikh.jpg',
		bio: `Mubarak Shaikh serves as the General Manager, Operations at TSPL Group, leading operational excellence across multiple branches and business verticals. He is responsible for ensuring seamless execution of staffing, apprenticeship, payroll, and workforce management services while maintaining high standards of service delivery.

His expertise in operational planning, team management, process optimization, and client servicing plays a crucial role in driving efficiency throughout the organization. His leadership ensures smooth coordination between clients, candidates, and internal teams across India.`,
		longBio: 'Mr. Shaikh manages operational departments, site supervisors, and candidate coordination to guarantee high placement retention and smooth candidate transition.',
		expertise: ['Operations Leadership', 'Performance Monitoring', 'Resource Allocation', 'Conflict Resolution'],
		achievements: [
			'Achieved a 95% placement retention rate across major operations.',
			'Supervised the deployment of candidate operations in multi-state locations.'
		],
		location: 'Pune, India'
	},
	'gyanendra-mishra': {
		name: 'Gyanendra Mishra',
		role: 'Asst. General Manager, Sourcing',
		category: 'Leader',
		imageUrl: '/leaders/3 mr gyanendra mishra.jpg',
		bio: `Gyanendra Mishra serves as Asst. General Manager, Sourcing at TSPL Group. He is responsible for developing nationwide talent acquisition strategies, managing sourcing teams, and ensuring timely fulfillment of workforce requirements across multiple industries and locations.

With extensive experience in recruitment planning, bulk hiring, candidate sourcing, and workforce deployment, he has successfully built strong talent pipelines across India. His expertise enables TSPL to deliver quality manpower solutions and support large-scale recruitment projects efficiently.`,
		longBio: 'Mr. Mishra manages our massive network of regional recruiters, local agents, and college tie-ups to deliver high-volume sourcing requests within short deadlines.',
		expertise: ['Sourcing Operations', 'National Mobilization', 'Recruitment Logistics', 'Outreach Networks'],
		achievements: [
			'Managed the sourcing of over 10,000+ candidates in a single year.',
			'Established active recruitment networks across 15+ states.'
		],
		location: 'Pune, India'
	},
	'vishal-ubale': {
		name: 'Vishal Ubale',
		role: 'Manager Sourcing & TPO Placement',
		category: 'Leader',
		imageUrl: '/leaders/4 mr vishal ubale.jpg',
		bio: `Vishal Ubale serves as Manager Sourcing & TPO Placement at TSPL Group, acting as a key bridge between educational institutions, training centers, and industry partners. He is responsible for conducting campus drives, strengthening placement networks, and creating employment opportunities for students and job seekers.

His extensive engagement with colleges, ITIs, universities, and skill development institutes has strengthened TSPL's talent acquisition ecosystem. Through his dedication to candidate development and industry collaboration, he continues to support workforce readiness and employment generation initiatives.`,
		longBio: 'Mr. Ubale specializes in connecting Maharashtra’s ITI/polytechnic students with active industrial opportunities, utilizing close links with colleges and local training departments.',
		expertise: ['Regional Sourcing', 'College Placement Coordination', 'Student Counseling', 'TPO Management'],
		achievements: [
			'Placed over 4,500+ trainees across Maharashtra.',
			'Coordinated large-scale job fairs in partnership with local authorities.'
		],
		location: 'Pune, India'
	},
	'lokesh-pardeshi': {
		name: 'Lokesh Pardeshi',
		role: 'Finance Head',
		category: 'Leader',
		imageUrl: '/leaders/5 lokesh.jpg',
		bio: `Lokesh Pardeshi serves as the Finance Head at TSPL Group and is responsible for managing the organization's financial planning, budgeting, reporting, and compliance functions. He plays a critical role in maintaining financial stability, transparency, and operational discipline across all business activities.

His expertise in financial governance, cost management, and regulatory compliance supports the organization's long-term growth objectives. His strategic financial oversight helps TSPL maintain a strong foundation while expanding its workforce solutions and business operations nationwide.`,
		longBio: 'Mr. Pardeshi oversees payroll funding, statutory payout clearances, and budget reporting, ensuring financial compliance and seamless transaction services.',
		expertise: ['Corporate Finance', 'Budget Control', 'Accounting Systems', 'Payroll Financial Clearance'],
		achievements: [
			'Optimized financial workflows to guarantee on-time monthly salary disbursals.',
			'Spearheaded audits with zero reporting errors.'
		],
		location: 'Pune, India'
	},
	'purushottam-gaikwad': {
		name: 'Purushottam Gaikwad',
		role: 'Assistant General Manager, Operations',
		category: 'Leader',
		imageUrl: '/leaders/6 mr purshotam gaikwad.jpg',
		bio: `Purushottam Gaikwad serves as Assistant General Manager, Operations at TSPL Group, supporting workforce deployment, client servicing, and operational management activities. He works closely with regional teams and corporate clients to ensure smooth execution of staffing and apprenticeship programs.

His strong operational expertise and problem-solving capabilities help maintain high levels of service quality and client satisfaction. Through his hands-on leadership approach, he contributes significantly to operational efficiency and business continuity across the organization.`,
		longBio: 'Mr. Gaikwad acts as the direct link between general management and site operations, maintaining clean workplace metrics, student discipline, and safety standards.',
		expertise: ['Operational Support', 'Site Management', 'Safety Controls', 'Staff Alignment'],
		achievements: [
			'Successfully launched 12+ large site deployment projects.',
			'Reduced regional onboarding cycle times by 20%.'
		],
		location: 'Pune, India'
	},
	'shivanand-mane': {
		name: 'Shivanand Mane',
		role: 'Regional Head, Operations',
		category: 'Leader',
		imageUrl: '/leaders/7 mr shivanand mane .jpg',
		bio: `Shivanand Mane serves as Regional Head, Operations at TSPL Group and is responsible for overseeing workforce management, client servicing, and operational performance within his region. He ensures effective implementation of staffing, recruitment, apprenticeship, and workforce management projects while maintaining strong relationships with clients and stakeholders.

His deep understanding of regional industry requirements enables him to deliver customized workforce solutions that meet client expectations. Through his leadership, TSPL continues to strengthen its regional presence and operational excellence across diverse industries.`,
		longBio: 'Mr. Mane coordinates regional offices, local mobilization programs, and client feedback cycles, maintaining stable service quality across distant zones.',
		expertise: ['Regional Management', 'Local Outreach', 'Client Relations', 'Logistics Operations'],
		achievements: [
			'Supervised the opening of 3 new regional branch offices.',
			'Expanded local trainee recruitment in eastern sectors.'
		],
		location: 'Pune, India'
	},
	'namdev-egave': {
		name: 'Namdev Egave',
		role: 'Payroll & Compliance Head',
		category: 'Leader',
		imageUrl: '/leaders/namdev-egave.jpg',
		bio: `Namdev Egave leads the Payroll & Compliance function at TSPL Group and is responsible for ensuring complete adherence to statutory regulations, labor laws, and payroll management processes. He oversees payroll operations for a large workforce while maintaining accuracy, transparency, and compliance across all business activities.

His expertise in labor legislation, PF, ESIC, statutory audits, and compliance management helps safeguard the interests of both clients and employees. His dedication to regulatory excellence has contributed significantly to TSPL's reputation as a trusted workforce and apprenticeship solutions provider.`,
		longBio: 'Mr. Egave monitors PF, ESI, and other labor-related filings. Under his oversight, TSPL maintains a clean record with government compliance departments.',
		expertise: ['Labor Laws', 'Payroll Compliance', 'Statutory Filings', 'PF & ESI Management'],
		achievements: [
			'Managed monthly payroll compliance for 25,000+ active candidates.',
			'Achieved audit approvals with zero compliance penalties.'
		],
		location: 'Pune, India'
	},
	'rahul-borkar': {
		name: 'Rahul Borkar',
		role: 'Recruitment Head',
		category: 'Leader',
		imageUrl: '/leaders/9 mr rahul borkar.jpg',
		bio: `Rahul Borkar serves as the Recruitment Head at TSPL Group, leading talent acquisition and workforce hiring strategies across multiple industries. He is responsible for managing end-to-end recruitment operations, bulk hiring projects, and candidate engagement initiatives to fulfill diverse client requirements.

With extensive experience in sourcing, screening, and workforce planning, he has successfully built strong recruitment networks that support large-scale hiring across India. His commitment to quality recruitment and timely delivery enables TSPL to provide exceptional staffing solutions while helping organizations build high-performing teams.`,
		longBio: 'Mr. Borkar oversees digital databases, job listings, interview cycles, and candidate selections, matching qualified profiles with corporate needs.',
		expertise: ['Talent Sourcing', 'Selection Standards', 'Interviews & Onboarding', 'Recruiting Pipelines'],
		achievements: [
			'Shortened placement cycle times to support 48-hour hiring goals.',
			'Integrated digital ATS systems to track candidate applications.'
		],
		location: 'Pune, India'
	},
	'samruddhi-chavan': {
		name: 'Samruddhi Chavan',
		role: 'Overall Head',
		category: 'Leader',
		imageUrl: '/leaders/mam.png',
		bio: `Samruddhi Chavan serves as a key leader, playing a pivotal role in driving organizational growth, operational excellence, and strategic business initiatives. She works closely with the leadership team to translate the company's vision into actionable strategies while ensuring seamless coordination across departments and business functions.

With expertise in operations management, workforce development, client engagement, and process optimization, she is responsible for strengthening organizational performance and fostering a culture of collaboration, accountability, and continuous improvement. Her leadership focuses on aligning business objectives with operational efficiency, enabling sustainable growth and long-term success.

Samruddhi actively contributes to strategic planning, team development, stakeholder relationship management, and operational governance. She is committed to building high-performing teams, enhancing service delivery standards, and implementing innovative solutions that improve productivity and business outcomes. Her ability to balance people management with operational execution makes her a key contributor to TSPL Group's continued expansion and success.`,
		longBio: 'Miss. Samruddhi Chavan manages talent acquisition, applicant screening, and candidate relationship pipelines to fulfill corporate manpower requirements efficiently.',
		expertise: ['Recruitment Operations', 'Talent Sourcing', 'Candidate Coordination', 'Placement Management'],
		achievements: [
			'Spearheaded recruitment drives across multiple regional operational zones.',
			'Enhanced candidate placement efficiency for client partners.'
		],
		location: 'Pune, India'
	}
}

export default function LeaderProfilePage() {
	const { slug } = useParams()
	const navigate = useNavigate()
	const profile = leaderProfiles[slug]

	const [isExpanded, setIsExpanded] = useState(false)

	useEffect(() => {
		setIsExpanded(false)
	}, [slug])

	const paragraphs = profile ? profile.bio.split('\n\n') : []
	const hasMultipleParagraphs = paragraphs.length > 1
	const displayedBio = isExpanded ? profile?.bio : paragraphs[0]

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
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Pune',
			addressRegion: 'Maharashtra',
			addressCountry: 'India'
		}
	}

	return (
		<div className="min-h-screen bg-[#f8f9fc] font-sans text-[#12213f] relative overflow-hidden">
			{/* Dotted Grid Background Texture */}
			<div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0756c8 1px, transparent 0)', backgroundSize: '36px 36px' }} />

			{/* Soft Background Blur Orbs */}
			<div className="pointer-events-none absolute -left-64 -top-64 h-[600px] w-[600px] rounded-full bg-blue-200/10 blur-3xl" />
			<div className="pointer-events-none absolute -right-64 bottom-0 h-[600px] w-[600px] rounded-full bg-orange-200/10 blur-3xl" />

			<Navbar />

			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(schemaData)
				}}
			/>

			<main className="relative z-10 px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pt-28">
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

									<p className="mt-7 max-w-[650px] text-base leading-7 text-[#263752] sm:text-[18px] sm:leading-8 whitespace-pre-line">
										{displayedBio}
									</p>

									{hasMultipleParagraphs && (
										<button
											type="button"
											onClick={() => setIsExpanded(!isExpanded)}
											className="mt-4 inline-flex items-center gap-1.5 text-base font-extrabold text-[#ff6817] hover:text-[#e05307] transition-colors focus:outline-none cursor-pointer"
										>
											<span>{isExpanded ? 'Read Less' : 'Read More'}</span>
											<ChevronRight className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
										</button>
									)}
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

										<div className="min-w-0 flex-1">
											<h3 className="line-clamp-2 text-[17px] font-extrabold leading-6 text-white">
												{item.name}
											</h3>

											<p className="mt-1 line-clamp-2 text-[13px] font-bold uppercase leading-5 tracking-[0.02em] text-[#ff751f]">
												{item.role}
											</p>

											<div className="mt-2 h-[3px] w-9 rounded-full bg-[#ff6817]" />
										</div>

										<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
											<ArrowRight className="h-4 w-4" />
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
