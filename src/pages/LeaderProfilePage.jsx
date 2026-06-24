import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Award, Briefcase, Calendar, CheckCircle2, ChevronLeft, Mail, MapPin, Phone, Shield, Sparkles, Star, Trophy, Users } from 'lucide-react'
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
	'vikas-patil': {
		name: 'Vikas Patil',
		role: 'Director',
		category: 'Director',
		imageUrl: '/visionaries/Vikas Patil.png',
		bio: 'Vikas Patil is an executive Director at TSPL Group, overseeing partner integrations, educational alliances, and community-level candidate mobilization.',
		longBio: 'Mr. Patil focuses on strengthening alliances with educational institutes, ITIs, and polytechnics to streamline candidate discovery. His outreach initiatives bridge local talent with industrial centers.',
		expertise: ['Community Mobilization', 'Institute Relations', 'Outreach Operations', 'Skill Alliances'],
		achievements: [
			'Established sourcing networks with over 150+ colleges and training institutes.',
			'Pioneered community recruitment campaigns in tier-2 and tier-3 cities.'
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
		imageUrl: '/leaders/ 8 Mr Namdev Egave.jpg',
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
	}
}

export default function LeaderProfilePage() {
	const { slug } = useParams()
	const navigate = useNavigate()
	const profile = leaderProfiles[slug]

	useEffect(() => {
		if (!profile) {
			navigate('/about')
		}
	}, [profile, navigate])

	useSEO({
		title: profile ? `${profile.name} - ${profile.role} | TSPL Group` : 'Leader Profile | TSPL Group',
		description: profile ? `${profile.name} serves as ${profile.role} at TSPL Group. Read their professional biography, career milestones, and expertise.` : 'TSPL Group leadership profiles.',
		keywords: profile ? `${profile.name}, ${profile.role}, TSPL Group Leader, Biography, HR Industry Expert` : 'TSPL Group, Leadership, Director Biography'
	})

	if (!profile) {
		return null
	}

	// Schema.org Person Structured Data
	const schemaData = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'name': profile.name,
		'jobTitle': profile.role,
		'worksFor': {
			'@type': 'Organization',
			'name': 'TalentCorp Solutions Private Limited (TSPL Group)',
			'url': 'https://talentcorp.co.in'
		},
		'description': profile.bio,
		'image': `https://talentcorp.co.in${profile.imageUrl}`,
		'telephone': profile.phone,
		'email': profile.email,
		'address': {
			'@type': 'PostalAddress',
			'addressLocality': 'Pune',
			'addressRegion': 'Maharashtra',
			'addressCountry': 'India'
		}
	}

	return (
		<div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
			<Navbar />

			{/* SEO Structured Data */}
			<script type="application/ld+json">
				{JSON.stringify(schemaData)}
			</script>

			<main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-5xl">
					
					{/* Back Link */}
					<Link to="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 mb-8 transition-colors">
						<ChevronLeft className="h-4 w-4" /> Back to About Us
					</Link>

					{/* Profile Header Grid */}
					<div className="grid gap-8 md:grid-cols-12 items-start bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
						
						{/* Background decorative glows */}
						<div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-blue-100/30 blur-3xl pointer-events-none" />
						<div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-orange-100/20 blur-3xl pointer-events-none" />

						{/* Photo Column */}
						<div className="md:col-span-4 flex flex-col items-center">
							<div className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 shadow-md">
								<img 
									src={profile.imageUrl} 
									alt={`${profile.name} - ${profile.role} of TSPL Group`}
									title={`${profile.name} - ${profile.role}`}
									className="h-full w-full object-cover object-top"
								/>
							</div>
							
							{/* Category Tag */}
							<div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200">
								<Sparkles className="h-3 w-3" /> {profile.category}
							</div>
						</div>

						{/* Identity Info Column */}
						<div className="md:col-span-8 space-y-6 text-left relative z-10">
							<div>
								<h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
									{profile.name}
								</h1>
								<p className="text-lg font-bold text-blue-600 mt-1 uppercase tracking-wider">
									{profile.role}
								</p>
							</div>

							<p className="text-slate-700 leading-relaxed text-lg font-medium">
								{profile.bio}
							</p>

							<p className="text-slate-600 leading-relaxed">
								{profile.longBio}
							</p>

							{/* Contact Cards */}
							<div className="grid gap-4 sm:grid-cols-2 pt-4">
								<div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors">
									<Mail className="h-5 w-5 text-blue-600 shrink-0" />
									<div className="min-w-0">
										<p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Email Address</p>
										<a href={`mailto:${profile.email}`} className="text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors block truncate">{profile.email}</a>
									</div>
								</div>
								<div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors">
									<MapPin className="h-5 w-5 text-orange-500 shrink-0" />
									<div>
										<p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Location</p>
										<p className="text-sm font-bold text-slate-800">{profile.location}</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Expertise & Achievements Section */}
					<div className="grid gap-8 md:grid-cols-2 mt-8">
						
						{/* Expertise Card */}
						<div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg text-left">
							<h2 className="text-2xl font-black text-slate-950 mb-6 flex items-center gap-2">
								<Briefcase className="h-6 w-6 text-blue-600" /> Key Areas of Expertise
							</h2>
							<div className="flex flex-wrap gap-2.5">
								{profile.expertise.map((item) => (
									<span key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
										{item}
									</span>
								))}
							</div>
						</div>

						{/* Achievements Card */}
						<div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg text-left">
							<h2 className="text-2xl font-black text-slate-950 mb-6 flex items-center gap-2">
								<Trophy className="h-6 w-6 text-orange-500" /> Career Milestones
							</h2>
							<ul className="space-y-4">
								{profile.achievements.map((item, idx) => (
									<li key={idx} className="flex gap-3 items-start text-slate-600">
										<CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
										<span className="text-sm font-medium leading-relaxed">{item}</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Navigation / Other Leaders carousel-style list */}
					<div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl mt-8 text-left">
						<h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
							<Users className="h-5 w-5 text-orange-500" /> Other Team Leaders
						</h2>
						<div className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar">
							{Object.entries(leaderProfiles)
								.filter(([key]) => key !== slug)
								.map(([key, item]) => (
									<Link 
										key={key} 
										to={`/leader/${key}`}
										className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 shrink-0 w-64 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
									>
										<div className="h-12 w-12 rounded-lg overflow-hidden bg-slate-800 shrink-0">
											<img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105" />
										</div>
										<div className="min-w-0">
											<h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
											<p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate">{item.role}</p>
										</div>
									</Link>
								))}
						</div>
					</div>

				</div>
			</main>
			
			<Footer />
		</div>
	)
}
