import { useEffect, useRef, useState } from 'react'
import {
	AlertTriangle,
	ArrowRight,
	ArrowUpRight,
	Building2,
	CheckCircle2,
	ClipboardList,
	Clock,
	FileCheck,
	FileText,
	Factory,
	Gavel,
	HeartPulse,
	Mail,
	MapPin,
	Phone,
	Scale,
	Search,
	Shield,
	ShieldX,
	TrendingDown,
	Users,
	Wallet,
	Send,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { submitLead } from '../utils/strapi'

const heroStats = [
	{ value: '100%', label: 'Compliance Rate' },
	{ value: '500+', label: 'Companies Protected' },
	{ value: '50K+', label: 'Workers Covered' },
	{ value: '0', label: 'Penalty Cases' },
]

const services = [
	{
		id: 'pf',
		title: 'PF Registration & Compliance',
		titleHindi: 'पीएफ पंजीकरण और अनुपालन',
		description: 'Complete Provident Fund management including registration, monthly challans, annual returns, and employee transfers.',
		icon: Building2,
		image: '/Gemini_Generated_Image_qskougqskougqsko.png',
		features: ['New PF Code Registration', 'Monthly ECR Filing', 'KYC Updates', 'Transfer Claims'],
		color: 'blue',
	},
	{
		id: 'esi',
		title: 'ESI Registration & Management',
		titleHindi: 'ईएसआई पंजीकरण और प्रबंधन',
		description: 'Employee State Insurance handling from registration to claims. Healthcare benefits for your workforce made easy.',
		icon: HeartPulse,
		image: '/happy-excited-executive-business-team-600nw-2424450635.jpg.webp',
		features: ['ESI Code Registration', 'Contribution Filing', 'Medical Claims', 'Accident Benefits'],
		color: 'green',
	},
	{
		id: 'wages',
		title: 'Minimum Wages Compliance',
		titleHindi: 'न्यूनतम वेतन अनुपालन',
		description: 'Stay updated with state-wise minimum wage notifications. We ensure your payroll meets all legal requirements.',
		icon: Wallet,
		image: '/Gemini_Generated_Image_qskougqskougqsko.png',
		features: ['Wage Calculations', 'State Updates', 'VDA Adjustments', 'Bonus Compliance'],
		color: 'orange',
	},
	{
		id: 'factory',
		title: 'Factory Act Compliance',
		titleHindi: 'फैक्ट्री अधिनियम अनुपालन',
		description: 'Complete Factory Act requirements - licenses, safety audits, register maintenance, and inspector coordination.',
		icon: Factory,
		image: '/happy-excited-executive-business-team-600nw-2424450635.jpg.webp',
		features: ['License Renewal', 'Safety Compliance', 'Register Maintenance', 'Audit Support'],
		color: 'purple',
	},
	{
		id: 'labor',
		title: 'Labor Law Compliance',
		titleHindi: 'श्रम कानून अनुपालन',
		description: 'Comprehensive labor law compliance covering Contract Labor Act, CLRA, Shops Act, and other applicable regulations.',
		icon: FileText,
		image: '/Gemini_Generated_Image_qskougqskougqsko.png',
		features: ['License Procurement', 'Returns Filing', 'Record Keeping', 'Legal Advisory'],
		color: 'cyan',
	},
	{
		id: 'contractor',
		title: 'Contractor Compliance',
		titleHindi: 'ठेकेदार अनुपालन',
		description: 'Principal employer compliance for contract workers. License management, register maintenance, and audit readiness.',
		icon: Users,
		image: '/happy-excited-executive-business-team-600nw-2424450635.jpg.webp',
		features: ['CLRA License', 'Worker Records', 'Wage Verification', 'Principal-Contractor Liaison'],
		color: 'pink',
	},
]

const lawCategories = [
	{
		title: 'Social Security Laws',
		titleHindi: 'सामाजिक सुरक्षा कानून',
		laws: [
			'Employees Provident Fund Act (EPF)',
			'Employees State Insurance Act (ESI)',
			'Employees Compensation Act',
			'Gratuity Act',
			'Maternity Benefit Act',
		],
	},
	{
		title: 'Wage & Salary Laws',
		titleHindi: 'वेतन और मजदूरी कानून',
		laws: [
			'Minimum Wages Act',
			'Payment of Wages Act',
			'Payment of Bonus Act',
			'Equal Remuneration Act',
			'Code on Wages, 2019',
		],
	},
	{
		title: 'Employment Laws',
		titleHindi: 'रोजगार कानून',
		laws: [
			'Industrial Employment Act',
			'Contract Labour Act (CLRA)',
			'Inter-State Migrant Workers Act',
			'Child Labour Prohibition Act',
			'Employment Exchange Act',
		],
	},
	{
		title: 'Factory & Safety Laws',
		titleHindi: 'फैक्ट्री और सुरक्षा कानून',
		laws: [
			'Factories Act, 1948',
			'Building Workers Act',
			'Shops & Establishments Act',
			'Occupational Safety Code',
			'Fire Safety Regulations',
		],
	},
]

const processSteps = [
	{
		number: '01',
		icon: ClipboardList,
		title: 'Share Your Details',
		titleHindi: 'अपनी जानकारी दें',
		description: 'Tell us about your business, number of employees, and current compliance status. We will understand your needs.',
		color: 'blue',
	},
	{
		number: '02',
		icon: Search,
		title: 'Free Compliance Audit',
		titleHindi: 'मुफ्त अनुपालन ऑडिट',
		description: 'Our experts conduct a thorough audit of your existing compliance status and identify gaps and risks.',
		color: 'cyan',
	},
	{
		number: '03',
		icon: FileCheck,
		title: 'Implementation',
		titleHindi: 'कार्यान्वयन',
		description: 'We handle all registrations, filings, and documentation. You get regular updates on progress.',
		color: 'green',
	},
	{
		number: '04',
		icon: Shield,
		title: 'Ongoing Protection',
		titleHindi: 'निरंतर सुरक्षा',
		description: 'Monthly compliance management, timely filings, and proactive alerts keep you always protected.',
		color: 'orange',
	},
]

const riskCards = [
	{
		icon: AlertTriangle,
		title: 'Heavy Penalties',
		titleHindi: 'भारी जुर्माना',
		amount: '₹1 Lakh+',
		description: 'Non-compliance can result in penalties up to ₹1 lakh per violation under various labor laws.',
		color: 'red',
	},
	{
		icon: Gavel,
		title: 'Legal Action',
		titleHindi: 'कानूनी कार्रवाई',
		amount: '3+ Years',
		description: 'Serious violations can lead to imprisonment of company directors and responsible persons.',
		color: 'orange',
	},
	{
		icon: ShieldX,
		title: 'License Cancellation',
		titleHindi: 'लाइसेंस रद्द',
		amount: 'Business Risk',
		description: 'Repeated violations can result in cancellation of factory license and business permits.',
		color: 'yellow',
	},
	{
		icon: TrendingDown,
		title: 'Reputation Damage',
		titleHindi: 'प्रतिष्ठा को नुकसान',
		amount: 'Long-term',
		description: 'Compliance issues can damage your brand reputation and affect client relationships.',
		color: 'purple',
	},
	{
		icon: Scale,
		title: 'Worker Disputes',
		titleHindi: 'कर्मचारी विवाद',
		amount: 'Costly',
		description: 'Non-compliance often leads to worker disputes, strikes, and labor court cases.',
		color: 'blue',
	},
	{
		icon: Clock,
		title: 'Audit Failures',
		titleHindi: 'ऑडिट में विफलता',
		amount: 'Client Loss',
		description: 'Many corporates conduct compliance audits. Failing them means losing business opportunities.',
		color: 'cyan',
	},
]

const contactMethods = [
	{
		icon: Phone,
		label: 'Call Us',
		value: '+91 98765 43210',
		href: 'tel:+919876543210',
	},
	{
		icon: Mail,
		label: 'Email Us',
		value: 'compliance@tsplgroup.com',
		href: 'mailto:compliance@tsplgroup.com',
	},
	{
		icon: MapPin,
		label: 'Visit Us',
		value: 'Mumbai, Maharashtra',
		href: '#',
	},
]

const guarantees = [
	'Free Initial Consultation',
	'No Hidden Charges',
	'100% Compliance Guarantee',
	'Dedicated Account Manager',
]

const serviceColorMap = {
	blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'shadow-blue-500/20' },
	green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', glow: 'shadow-green-500/20' },
	orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', glow: 'shadow-orange-500/20' },
	purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-purple-500/20' },
	cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
	pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400', glow: 'shadow-pink-500/20' },
}

const processColorMap = {
	blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', gradient: 'from-blue-500 to-blue-600' },
	cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', gradient: 'from-cyan-500 to-cyan-600' },
	green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', gradient: 'from-green-500 to-green-600' },
	orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', gradient: 'from-orange-500 to-orange-600' },
}

const riskColorMap = {
	red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', glow: 'group-hover:shadow-red-500/20' },
	orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', glow: 'group-hover:shadow-orange-500/20' },
	yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', glow: 'group-hover:shadow-yellow-500/20' },
	purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'group-hover:shadow-purple-500/20' },
	blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'group-hover:shadow-blue-500/20' },
	cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'group-hover:shadow-cyan-500/20' },
}

function ComplianceHero() {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		setIsVisible(true)
	}, [])

	return (
		<section className="relative min-h-screen overflow-hidden bg-white pt-24">
			<div className="absolute inset-0">
				<img src="/Gemini_Generated_Image_qskougqskougqsko.png" alt="Compliance Background" className="h-full w-full object-cover" />
				<div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70" />
				<div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white" />
			</div>

			<div className="absolute inset-0 opacity-5">
				<div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(37, 99, 235, 0.5) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
			</div>

			<div className="absolute top-32 left-[10%] hidden lg:block animate-float-slow">
				<div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-white shadow-xl shadow-blue-500/10"><Scale className="h-8 w-8 text-blue-600" /></div>
			</div>
			<div className="absolute top-48 right-[15%] hidden lg:block animate-float-medium">
				<div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-green-100 bg-white shadow-xl shadow-green-500/10"><FileCheck className="h-7 w-7 text-green-600" /></div>
			</div>
			<div className="absolute bottom-48 left-[20%] hidden lg:block animate-float-fast">
				<div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-100 bg-white shadow-xl shadow-orange-500/10"><Building2 className="h-6 w-6 text-orange-600" /></div>
			</div>

			<div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
				<div className="grid items-center gap-16 lg:grid-cols-2">
					<div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
						<div className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 shadow-lg shadow-blue-500/25">
							<Shield className="h-4 w-4 text-white" />
							<span className="text-sm font-medium text-white">Legal Protection Partner</span>
						</div>

						<h1 className="hero-text-reveal text-5xl font-bold leading-tight lg:text-7xl">
							<span className="text-gray-900">Stay</span>
							<br />
							<span className="relative">
								<span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 bg-clip-text text-transparent">Compliant</span>
							</span>
							<br />
							<span className="text-gray-900">Stay Protected</span>
						</h1>

						<p className="hero-text-reveal-delay max-w-lg text-xl leading-relaxed text-gray-600">
							Complete statutory compliance management for your business.
							<span className="font-medium text-gray-900"> PF, ESI, Labor Laws, Factory Act</span> - we handle everything so you can focus on growth.
						</p>


						<div className="flex flex-wrap gap-4 pt-4">
							<button className="group h-14 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 text-lg font-semibold text-white shadow-xl shadow-blue-500/30 transition-all hover:from-blue-700 hover:to-blue-800">
								Get Compliance Audit
								<ArrowRight className="ml-2 inline h-5 w-5 transition-transform group-hover:translate-x-1" />
							</button>
							<button className="h-14 rounded-xl border border-gray-300 bg-white/80 px-8 text-lg text-gray-700 backdrop-blur-sm transition-all hover:border-gray-400 hover:bg-gray-50">Learn More</button>
						</div>

						<div className="flex items-center gap-6 pt-4">
							{['PF Registered', 'ESI Approved', 'ISO Certified'].map((badge) => (
								<div key={badge} className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-sm">
									<CheckCircle2 className="h-5 w-5 text-green-600" />
									<span className="text-sm font-medium text-gray-700">{badge}</span>
								</div>
							))}
						</div>
					</div>

					<div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
						<div className="relative mx-auto flex aspect-square max-w-lg items-center justify-center">
							<div className="relative">
								<div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-blue-100 bg-white shadow-2xl shadow-blue-500/20">
									<Shield className="h-16 w-16 text-blue-600" />
								</div>
								<div className="absolute -inset-4 -z-10 rounded-[2rem] bg-blue-500/10 blur-2xl" />
							</div>

							<div className="absolute -left-4 top-1/4 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl shadow-gray-200/50 backdrop-blur-xl lg:-left-8 animate-float-slow">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100"><CheckCircle2 className="h-5 w-5 text-green-600" /></div>
									<div><p className="text-sm font-semibold text-gray-900">PF Challan Filed</p><p className="text-xs text-gray-500">Just now</p></div>
								</div>
							</div>

							<div className="absolute -right-4 bottom-1/3 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl shadow-gray-200/50 backdrop-blur-xl animate-float-medium">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100"><Shield className="h-5 w-5 text-blue-600" /></div>
									<div><p className="text-sm font-semibold text-gray-900">100% Compliant</p><p className="text-xs text-gray-500">All checks passed</p></div>
								</div>
							</div>

							<div className="absolute left-1/4 -bottom-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl shadow-gray-200/50 backdrop-blur-xl animate-float-fast">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100"><FileCheck className="h-5 w-5 text-orange-600" /></div>
									<div><p className="text-sm font-semibold text-gray-900">ESI Updated</p><p className="text-xs text-gray-500">2 mins ago</p></div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={`mt-20 grid grid-cols-2 gap-6 md:grid-cols-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
					{heroStats.map((stat) => (
						<div key={stat.label} className="group relative rounded-2xl border border-gray-200 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10">
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
							<p className="relative bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent lg:text-5xl">{stat.value}</p>
							<p className="relative mt-2 text-gray-600">{stat.label}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

function WhyCompliance() {
	const [isVisible, setIsVisible] = useState(false)
	const sectionRef = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setIsVisible(true)
		}, { threshold: 0.1 })

		if (sectionRef.current) observer.observe(sectionRef.current)
		return () => observer.disconnect()
	}, [])

	return (
		<section ref={sectionRef} className="bg-gradient-to-b from-[#0a0a0a] to-[#111111] py-24">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2">
						<AlertTriangle className="h-4 w-4 text-red-400" />
						<span className="text-sm font-medium text-red-300">Risk Alert</span>
					</div>
					<h2 className="mb-6 text-4xl font-bold text-white lg:text-5xl">What Happens Without <span className="text-red-400">Compliance?</span></h2>
					<p className="mx-auto max-w-2xl text-lg text-gray-400">Don&apos;t let non-compliance cost your business. These are the real risks companies face.</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{riskCards.map((risk, index) => {
						const Icon = risk.icon
						const colors = riskColorMap[risk.color]

						return (
							<div
								key={risk.title}
								className={`group relative rounded-2xl border border-gray-800 bg-gray-900/50 p-6 transition-all duration-500 hover:border-gray-700 hover:shadow-xl ${colors.glow} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
								style={{ transitionDelay: `${index * 100}ms` }}
							>
								<div className={`absolute left-6 right-6 top-0 h-1 rounded-b-full ${colors.bg}`} />
								<div className="flex items-start gap-4">
									<div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${colors.bg} ${colors.border}`}><Icon className={`h-7 w-7 ${colors.text}`} /></div>
									<div className="flex-1">
										<p className={`mb-1 text-2xl font-bold ${colors.text}`}>{risk.amount}</p>
										<h3 className="text-lg font-semibold text-white">{risk.title}</h3>
									</div>
								</div>
								<p className="mt-4 text-sm leading-relaxed text-gray-400">{risk.description}</p>
								<div className={`absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 rounded-full transition-transform duration-500 group-hover:scale-x-100 ${colors.bg}`} />
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}

function ComplianceServices() {
	const [activeService, setActiveService] = useState(0)
	const [isVisible, setIsVisible] = useState(false)
	const sectionRef = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setIsVisible(true)
		}, { threshold: 0.1 })

		if (sectionRef.current) observer.observe(sectionRef.current)
		return () => observer.disconnect()
	}, [])

	const currentService = services[activeService]
	const colors = serviceColorMap[currentService.color]

	return (
		<section ref={sectionRef} className="bg-[#0a0a0a] py-24">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
					<p className="mb-4 font-medium text-blue-400">Our Services</p>
					<h2 className="mb-6 text-4xl font-bold text-white lg:text-5xl">Complete Compliance Solutions</h2>
					<p className="mx-auto max-w-2xl text-lg text-gray-400">From PF to Factory Act - we cover all statutory requirements so you never face penalties.</p>
				</div>

				<div className="grid items-start gap-12 lg:grid-cols-2">
					<div className={`space-y-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
						{services.map((service, index) => {
							const Icon = service.icon
							const sColors = serviceColorMap[service.color]
							const isActive = activeService === index

							return (
								<button
									key={service.id}
									onClick={() => setActiveService(index)}
									className={`group w-full rounded-2xl border p-6 text-left transition-all duration-300 ${isActive ? `${sColors.bg} ${sColors.border} shadow-lg ${sColors.glow}` : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'}`}
								>
									<div className="flex items-start gap-4">
										<div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isActive ? sColors.bg : 'bg-gray-800'}`}>
											<Icon className={`h-6 w-6 ${isActive ? sColors.text : 'text-gray-500'}`} />
										</div>
										<div className="flex-1">
											<div className="flex items-center justify-between">
												<h3 className={`font-semibold ${isActive ? 'text-white' : 'text-gray-300'}`}>{service.title}</h3>
												<ArrowUpRight className={`h-5 w-5 transition-all ${isActive ? `${sColors.text} rotate-0` : '-rotate-45 text-gray-600'}`} />
											</div>
										</div>
									</div>
								</button>
							)
						})}
					</div>

					<div className={`transition-all duration-700 delay-300 lg:sticky lg:top-32 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
						<div className={`relative overflow-hidden rounded-3xl border ${colors.border} ${colors.glow} shadow-2xl`}>
							<div className="relative h-64 overflow-hidden">
								<img src={currentService.image} alt={currentService.title} className="h-full w-full object-cover transition-all duration-500" />
								<div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
								<div className={`absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border ${colors.bg} ${colors.border}`}><span className={`text-xl font-bold ${colors.text}`}>{activeService + 1}</span></div>
							</div>

							<div className="bg-gray-900 p-8">
								<div className="mb-4 flex items-center gap-3">
									<currentService.icon className={`h-6 w-6 ${colors.text}`} />
									<h3 className="text-2xl font-bold text-white">{currentService.title}</h3>
								</div>
								<p className="mb-6 text-gray-400">{currentService.description}</p>
								<div className="grid grid-cols-2 gap-3">
									{currentService.features.map((feature) => (
										<div key={feature} className={`rounded-xl border p-3 ${colors.bg} ${colors.border}`}>
											<p className={`text-sm font-medium ${colors.text}`}>{feature}</p>
										</div>
									))}
								</div>
								<button className={`mt-6 w-full rounded-xl border py-4 font-semibold transition-all ${colors.bg} ${colors.border} ${colors.text} ${colors.glow} hover:shadow-lg`}>Get Started with {currentService.title.split(' ')[0]}</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function LawsCovered() {
	const [isVisible, setIsVisible] = useState(false)
	const sectionRef = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setIsVisible(true)
		}, { threshold: 0.1 })

		if (sectionRef.current) observer.observe(sectionRef.current)
		return () => observer.disconnect()
	}, [])

	return (
		<section ref={sectionRef} className="bg-gradient-to-b from-gray-50 to-white py-24">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
					<p className="mb-4 font-medium text-blue-600">Comprehensive Coverage / व्यापक कवरेज</p>
					<h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">Laws We Handle</h2>
					<p className="mx-auto max-w-2xl text-lg text-gray-600">Complete statutory compliance across all major Indian labor laws and regulations.</p>
				</div>

				<div className="grid gap-8 md:grid-cols-2">
					{lawCategories.map((category, categoryIndex) => (
						<div
							key={category.title}
							className={`group relative rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
							style={{ transitionDelay: `${categoryIndex * 100}ms` }}
						>
							<div className="absolute -left-4 -top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-lg font-bold text-white shadow-lg">{categoryIndex + 1}</div>
							<div className="mb-6 pl-4">
								<h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">{category.title}</h3>
							</div>

							<ul className="space-y-3">
								{category.laws.map((law, lawIndex) => (
									<li key={law} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 transition-all duration-300 group-hover:bg-blue-50/50" style={{ transitionDelay: `${lawIndex * 50}ms` }}>
										<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100"><CheckCircle2 className="h-4 w-4 text-green-600" /></div>
										<span className="text-sm font-medium text-gray-700">{law}</span>
									</li>
								))}
							</ul>
							<div className="absolute bottom-0 right-0 h-24 w-24 rounded-br-3xl rounded-tl-full bg-gradient-to-tl from-blue-100/50 to-transparent" />
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

function ComplianceProcess() {
	const [isVisible, setIsVisible] = useState(false)
	const [activeStep, setActiveStep] = useState(0)
	const sectionRef = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setIsVisible(true)
		}, { threshold: 0.1 })

		if (sectionRef.current) observer.observe(sectionRef.current)
		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		if (!isVisible) return undefined
		const interval = window.setInterval(() => {
			setActiveStep((prev) => (prev + 1) % processSteps.length)
		}, 4000)

		return () => window.clearInterval(interval)
	}, [isVisible])

	return (
		<section ref={sectionRef} className="bg-white py-24">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
					<p className="mb-4 font-medium text-blue-600">How It Works / यह कैसे काम करता है</p>
					<h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">Simple 4-Step Process</h2>
					<p className="mx-auto max-w-2xl text-lg text-gray-600">Getting compliant is easier than you think. We handle the complexity.</p>
				</div>

				<div className="relative">
					<div className="absolute left-0 right-0 top-24 hidden h-1 bg-gray-200 lg:block">
						<div className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 via-green-500 to-orange-500 transition-all duration-500" style={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }} />
					</div>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
						{processSteps.map((step, index) => {
							const Icon = step.icon
							const colors = processColorMap[step.color]
							const isActive = activeStep === index
							const isPast = index < activeStep

							return (
								<div
									key={step.number}
									onClick={() => setActiveStep(index)}
									className={`relative cursor-pointer transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
									style={{ transitionDelay: `${index * 150}ms` }}
								>
									<div className={`relative rounded-2xl border-2 p-6 transition-all duration-300 ${isActive ? `${colors.border} ${colors.bg} shadow-xl` : isPast ? 'border-gray-200 bg-gray-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
										<div className={`absolute -top-4 left-6 flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${isActive || isPast ? `bg-gradient-to-r ${colors.gradient} text-white shadow-lg` : 'bg-gray-200 text-gray-500'}`}>{step.number}</div>
										<div className={`mb-4 mt-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 ${isActive ? `${colors.bg} border ${colors.border}` : 'bg-gray-100'}`}>
											<Icon className={`h-8 w-8 ${isActive ? colors.text : 'text-gray-400'}`} />
										</div>
										<h3 className={`mb-1 text-xl font-bold ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>{step.title}</h3>
										<p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
										{isActive && <div className={`absolute bottom-0 left-6 right-6 h-1 rounded-t-full bg-gradient-to-r ${colors.gradient}`} />}
									</div>
									{index < processSteps.length - 1 && (
										<div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:flex">
											<ArrowRight className={`h-6 w-6 transition-colors ${isPast ? colors.text : 'text-gray-300'}`} />
										</div>
									)}
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}

function ComplianceCTA() {
	const [isVisible, setIsVisible] = useState(false)
	const [formData, setFormData] = useState({ name: '', company: '', phone: '', email: '', employees: '', message: '' })
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitMessage, setSubmitMessage] = useState('')
	const [submitError, setSubmitError] = useState('')
	const sectionRef = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setIsVisible(true)
		}, { threshold: 0.1 })

		if (sectionRef.current) observer.observe(sectionRef.current)
		return () => observer.disconnect()
	}, [])

	const handleSubmit = async (event) => {
		event.preventDefault()
		setIsSubmitting(true)
		setSubmitError('')
		setSubmitMessage('')

		try {
			await submitLead({
				name: formData.name.trim(),
				email: formData.email.trim(),
				phone: formData.phone.trim(),
				subject: `Compliance audit request${formData.employees ? ` - ${formData.employees}` : ''}`,
				message: [
					`Company: ${formData.company.trim() || 'Not provided'}`,
					`Employees: ${formData.employees || 'Not specified'}`,
					`Message: ${formData.message.trim() || 'No additional details'}`,
				].join('\n'),
			})

			setFormData({ name: '', company: '', phone: '', email: '', employees: '', message: '' })
			setSubmitMessage('Your compliance audit request has been sent. We will reach out within 24 hours.')
		} catch (error) {
			setSubmitError(error?.message || 'Unable to submit compliance request.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section ref={sectionRef} className="relative overflow-hidden bg-[#0a0a0a] py-24">
			<div className="absolute inset-0">
				<div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
				<div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
			</div>

			<div className="relative mx-auto max-w-7xl px-6 lg:px-8">
				<div className="grid items-center gap-16 lg:grid-cols-2">
					<div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2">
							<Shield className="h-4 w-4 text-blue-400" />
							<span className="text-sm font-medium text-blue-300">Get Protected Today</span>
						</div>

						<h2 className="mb-6 text-4xl font-bold text-white lg:text-5xl">Ready to Become <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">100% Compliant?</span></h2>
						<p className="mb-8 text-xl text-gray-400">Don&apos;t wait for a government notice. Get your free compliance audit today and secure your business.</p>
						<p className="mb-8 border-l-2 border-blue-500/50 pl-4 italic text-gray-500">आज ही मुफ्त अनुपालन ऑडिट प्राप्त करें और अपने व्यवसाय को सुरक्षित करें</p>

						<div className="mb-10 grid grid-cols-2 gap-4">
							{guarantees.map((guarantee) => (
								<div key={guarantee} className="flex items-center gap-3">
									<CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
									<span className="text-sm text-gray-300">{guarantee}</span>
								</div>
							))}
						</div>

						<div className="space-y-4">
							{contactMethods.map((method) => {
								const Icon = method.icon
								return (
									<a key={method.label} href={method.href} className="group flex items-center gap-4 rounded-2xl border border-gray-800 bg-gray-900/50 p-4 transition-all hover:border-blue-500/50">
										<div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 transition-colors group-hover:bg-blue-500/20">
											<Icon className="h-5 w-5 text-blue-400" />
										</div>
										<div>
											<p className="text-sm text-gray-500">{method.label}</p>
											<p className="font-medium text-white">{method.value}</p>
										</div>
										<ArrowRight className="ml-auto h-5 w-5 text-gray-600 transition-all group-hover:translate-x-1 group-hover:text-blue-400" />
									</a>
								)
							})}
						</div>
					</div>

					<div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
						<div className="relative rounded-3xl border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-900/50 p-8">
							<div className="mb-8 text-center">
								<h3 className="mb-2 text-2xl font-bold text-white">Request Free Audit</h3>
								<p className="text-gray-400">Fill the form and our team will contact you within 24 hours.</p>
							</div>

							<form onSubmit={handleSubmit} className="space-y-5">
								<div className="grid gap-5 md:grid-cols-2">
									<div>
										<label className="mb-2 block text-sm text-gray-400">Your Name *</label>
										<input type="text" required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Enter your name" />
									</div>
									<div>
										<label className="mb-2 block text-sm text-gray-400">Company Name *</label>
										<input type="text" required value={formData.company} onChange={(event) => setFormData({ ...formData, company: event.target.value })} className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Company name" />
									</div>
								</div>

								<div className="grid gap-5 md:grid-cols-2">
									<div>
										<label className="mb-2 block text-sm text-gray-400">Phone Number *</label>
										<input type="tel" required value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="+91 98765 43210" />
									</div>
									<div>
										<label className="mb-2 block text-sm text-gray-400">Email Address</label>
										<input type="email" required value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="email@company.com" />
									</div>
								</div>

								<div>
									<label className="mb-2 block text-sm text-gray-400">Number of Employees *</label>
									<select required value={formData.employees} onChange={(event) => setFormData({ ...formData, employees: event.target.value })} className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-white transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
										<option value="">Select employee count</option>
										<option value="1-20">1-20 employees</option>
										<option value="21-50">21-50 employees</option>
										<option value="51-100">51-100 employees</option>
										<option value="101-500">101-500 employees</option>
										<option value="500+">500+ employees</option>
									</select>
								</div>

								<div>
									<label className="mb-2 block text-sm text-gray-400">Message (Optional)</label>
									<textarea rows={3} value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} className="w-full resize-none rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Tell us about your compliance needs..." />
								</div>

								<button type="submit" disabled={isSubmitting} className="group h-14 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-lg font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-500 hover:to-cyan-500 disabled:cursor-not-allowed disabled:opacity-70">
									{isSubmitting ? 'Sending...' : 'Get Free Compliance Audit'}
									<Send className={`ml-2 inline h-5 w-5 ${isSubmitting ? 'animate-plane-send' : 'transition-transform group-hover:translate-x-1'}`} />
								</button>
								{submitMessage && <p className="mt-3 text-sm font-medium text-green-400">{submitMessage}</p>}
								{submitError && <p className="mt-3 text-sm font-medium text-red-400">{submitError}</p>}
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default function CompliancePage() {
	return (
		<div className="min-h-screen bg-white text-slate-800">
			<Navbar />
			<main>
				<ComplianceHero />
				<WhyCompliance />
				<ComplianceServices />
				<LawsCovered />
				<ComplianceProcess />
				<ComplianceCTA />
			</main>
			<Footer />

			<style>{`
				@keyframes float-slow {
					0%, 100% { transform: translateY(0px); }
					50% { transform: translateY(-15px); }
				}
				@keyframes float-medium {
					0%, 100% { transform: translateY(0px); }
					50% { transform: translateY(-10px); }
				}
				@keyframes float-fast {
					0%, 100% { transform: translateY(0px); }
					50% { transform: translateY(-8px); }
				}
				.animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
				.animate-float-medium { animation: float-medium 4s ease-in-out infinite; }
				.animate-float-fast { animation: float-fast 3s ease-in-out infinite; }
			`}</style>
		</div>
	)
}
