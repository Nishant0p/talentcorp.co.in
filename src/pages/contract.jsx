import { useEffect, useRef, useState } from 'react'
import {
	ArrowRight,
	Briefcase,
	Building,
	Building2,
	Calendar,
	CheckCircle2,
	Clock,
	Cpu,
	Factory,
	FileCheck,
	HeadphonesIcon,
	Mail,
	MapPin,
	MessageSquare,
	Package,
	Phone,
	Pill,
	Search,
	Shield,
	TrendingDown,
	TrendingUp,
	Truck,
	UserCheck,
	Users,
	Wrench,
	Zap,
	Send,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ServiceEnquirySection from '../components/ServiceEnquirySection'
import { submitLead } from '../utils/strapi'
import { getPageAsset, usePageAssets } from '../hooks/usePageAssets'

const benefits = [
	{
		icon: TrendingDown,
		title: 'Cost Savings',
		description: 'Save 25-40% on hiring, training, and HR administration costs.',
		stat: '40%',
		statLabel: 'Cost Reduction',
	},
	{
		icon: Clock,
		title: 'Fast Deployment',
		description: 'Get workers on-site within 24-72 hours of requirement confirmation.',
		stat: '24hrs',
		statLabel: 'Deployment Time',
	},
	{
		icon: Shield,
		title: 'Zero Compliance Risk',
		description: 'We handle PF, ESI, and all statutory compliance. You stay risk-free.',
		stat: '100%',
		statLabel: 'Compliance',
	},
	{
		icon: Users,
		title: 'Flexible Scaling',
		description: 'Scale your workforce up or down based on business demands.',
		stat: '10x',
		statLabel: 'Scaling Capacity',
	},
	{
		icon: FileCheck,
		title: 'Verified Workers',
		description: 'All workers are background-checked and skill-verified before deployment.',
		stat: '100%',
		statLabel: 'Verified',
	},
	{
		icon: HeadphonesIcon,
		title: 'Dedicated Support',
		description: 'Your dedicated relationship manager for all staffing  Fullfiled.',
		stat: '24/7',
		statLabel: 'Support',
	},
]

const industries = [
	{ name: 'Manufacturing', icon: Factory, workers: '5000+' },
	{ name: 'Automobile', icon: Users, workers: '3000+' },
	{ name: 'Pharma', icon: Pill, workers: '1500+' },
	{ name: 'FMCG', icon: Package, workers: '2000+' },
	{ name: 'Engineering', icon: Wrench, workers: '2500+' },
	{ name: 'Infrastructure', icon: Building, workers: '1800+' },
	{ name: 'Logistics', icon: Truck, workers: '2200+' },
	{ name: 'IT/Electronics', icon: Cpu, workers: '1200+' },
]

const processSteps = [
	{
		number: '01',
		title: 'Share Requirement',
		description: 'Tell us how many workers you need, what skills, and for how long.',
		icon: MessageSquare,
	},
	{
		number: '02',
		title: 'We Source & Screen',
		description: 'Our team finds the right candidates from our verified worker database.',
		icon: Search,
	},
	{
		number: '03',
		title: 'You Select Workers',
		description: 'Interview and select from our shortlisted candidates.',
		icon: UserCheck,
	},
	{
		number: '04',
		title: 'Workers Join',
		description: 'Onboarded workers start at your facility. We handle all compliance.',
		icon: Briefcase,
	},
]

const staffingTypes = [
	{
		id: 1,
		title: 'Short-Term Contract',
		duration: '1-6 Months',
		description: 'Perfect for project-based work, event staffing, or covering employee absences.',
		image: '/seasonal labours.jpeg',
		icon: Clock,
		color: 'blue',
		features: ['Quick deployment', 'Skilled workers', 'Flexible extension'],
	},
	{
		id: 2,
		title: 'Long-Term Contract',
		duration: '6-24 Months',
		description: 'Ideal for ongoing projects, production line staffing, or long-term business expansion.',
		image: '/skilled training tspl.jpeg',
		icon: Calendar,
		color: 'orange',
		features: ['Dedicated team', 'Lower cost', 'Consistent quality'],
	},
	{
		id: 3,
		title: 'Project-Based Staffing',
		duration: 'As per project',
		description: 'Complete team for your specific project from start to finish.',
		image: '/training tspl.jpeg',
		icon: Building2,
		color: 'green',
		features: ['Full team', 'Project management', 'Milestone based'],
	},
	{
		id: 4,
		title: 'Seasonal Staffing',
		duration: 'Peak seasons',
		description: 'Scale up quickly during busy seasons and scale down when demand drops.',
		image: 'https://images.pexels.com/photos/17396054/pexels-photo-17396054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		icon: Zap,
		color: 'purple',
		features: ['Fast scaling', 'Trained workers', 'Cost effective'],
	},
]

const explainerPoints = [
	{
		title: 'Temporary Workers',
		desc: 'Hire workers for specific time periods - days, weeks, or months',
	},
	{
		title: 'Project-Based Teams',
		desc: 'Get skilled teams for your project duration only',
	},
	{
		title: 'Seasonal Staff',
		desc: 'Scale up during peak seasons, scale down when demand drops',
	},
	{
		title: 'No HR Burden',
		desc: 'We handle payroll, compliance, and all HR administration',
	},
]

function ContractHero({ resolveAsset }) {
	const [activeWord, setActiveWord] = useState(0)
	const rotatingWords = ['Flexible', 'Reliable', 'Scalable', 'Efficient']

	useEffect(() => {
		const interval = window.setInterval(() => {
			setActiveWord((prev) => (prev + 1) % rotatingWords.length)
		}, 2500)
		return () => window.clearInterval(interval)
	}, [])

	return (
		<section className="relative min-h-screen overflow-hidden bg-white pt-24">
			<div className="absolute inset-0">
					<img src={resolveAsset('contract.hero', '/WhatsApp Image 2026-04-16 at 10.53.25 (1).jpeg').url} alt={resolveAsset('contract.hero', '/WhatsApp Image 2026-04-16 at 10.53.25 (1).jpeg', 'Contract Staffing').alt} className="h-full w-full object-cover" />
				<div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/70 to-white/55" />
				<div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-white/35" />
			</div>

			<div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-24">
				<div className="space-y-8">
					<div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2">
						<Briefcase className="h-4 w-4 text-blue-600" />
						<span className="text-sm font-semibold text-blue-700">Flexible Workforce Solutions</span>
					</div>

					<h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
						<span className="text-gray-900">Contract Staffing</span>
						<br />
						<span className="text-gray-900">That&apos;s </span>
						<span className="relative inline-block min-w-[200px]">
							{rotatingWords.map((word, index) => (
								<span
									key={word}
									className={`absolute left-0 transition-all duration-500 ${index === activeWord ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
								>
									<span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">{word}</span>
								</span>
							))}
							<span className="invisible">Flexible</span>
						</span>
					</h1>

					<p className="max-w-xl text-lg leading-relaxed text-gray-600 lg:text-xl">
						Scale your workforce up or down based on project needs.
						<span className="font-medium text-gray-900"> No long-term commitments, no HR hassles</span> - just the right people at the right time.
					</p>

					<div className="flex flex-wrap gap-6">
						{[
							{ value: '10,000+', label: 'Workers Deployed' },
							{ value: '200+', label: 'Client Companies' },
							{ value: '98%', label: 'Retention Rate' },
						].map((stat) => (
							<div key={stat.label} className="text-center">
								<p className="text-2xl font-bold text-blue-600 lg:text-3xl">{stat.value}</p>
								<p className="text-sm text-gray-500">{stat.label}</p>
							</div>
						))}
					</div>

					<div className="flex flex-wrap gap-4">
						<a href="#contract-cta" className="group inline-flex h-14 items-center rounded-xl bg-blue-600 px-8 text-lg font-semibold text-white shadow-xl shadow-blue-500/25 transition-all hover:bg-blue-700">
							Hire Contract Staff
							<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
						</a>
						<a href="#contract-cta" className="inline-flex h-14 items-center rounded-xl border-2 border-orange-400 px-8 text-lg font-semibold text-orange-600 transition-all hover:bg-orange-50">
							Get Quote
						</a>
					</div>
				</div>

				<div className="relative">
					<div className="mx-auto aspect-square max-w-lg">
						<div className="absolute inset-8 overflow-hidden rounded-3xl border border-gray-100 shadow-2xl shadow-blue-500/10">
							<img src={resolveAsset('contract.flexible', '/WhatsApp Image 2026-04-16 at 10.53.25 (1).jpeg').url} alt={resolveAsset('contract.flexible', '/WhatsApp Image 2026-04-16 at 10.53.25 (1).jpeg', 'Contract staffing team').alt} className="h-full w-full object-cover" />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function WhatIsContract({ resolveAsset }) {
	return (
		<section className="bg-slate-50 py-20 lg:py-28">
			<div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
				<div className="relative">
					<div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
						<img src={resolveAsset('contract.project', '/TSPL INDIA.jpeg').url} alt={resolveAsset('contract.project', '/TSPL INDIA.jpeg', 'Contract Staffing Explained').alt} className="h-full w-full object-cover" />
					</div>
				</div>

				<div className="space-y-8">
					<div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700">
						<span className="text-sm font-semibold">What is Contract Staffing?</span>
					</div>

					<h2 className="text-3xl font-bold leading-tight text-gray-900 lg:text-4xl">
						Workforce On-Demand
						<br />
						<span className="text-blue-600">When You Need It</span>
					</h2>

					<p className="text-lg leading-relaxed text-gray-600">
						Contract staffing means hiring workers through TSPL for a fixed period.
						You get the workforce, we handle everything else - from recruitment to payroll to compliance.
					</p>

					<div className="grid gap-4 sm:grid-cols-2">
						{explainerPoints.map((point) => (
							<div key={point.title} className="group rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:border-blue-200 hover:shadow-lg">
								<div className="flex items-start gap-3">
									<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 transition-colors group-hover:bg-blue-600">
										<CheckCircle2 className="h-4 w-4 text-blue-600 transition-colors group-hover:text-white" />
									</div>
									<div>
										<p className="font-semibold text-gray-900">{point.title}</p>
										<p className="mt-1 text-sm text-gray-500">{point.desc}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

function StaffingTypes({ staffingData }) {
	const [activeType, setActiveType] = useState(0)

	return (
		<section className="bg-white py-20 lg:py-28">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 max-w-3xl text-center mx-auto">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-orange-700">
						<span className="text-sm font-semibold">Staffing Solutions</span>
					</div>
					<h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-5xl">
						Choose Your <span className="text-blue-600">Staffing Type</span>
					</h2>
				</div>

				<div className="grid items-stretch gap-8 lg:grid-cols-2">
					<div className="space-y-4">
						{staffingData.map((type, index) => {
							const Icon = type.icon
							const isActive = activeType === index
							return (
								<button
									key={type.id}
									onClick={() => setActiveType(index)}
									className={`w-full rounded-2xl border-2 p-6 text-left transition-all duration-300 ${isActive ? 'border-blue-500 bg-blue-600 text-white shadow-xl' : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg'}`}
								>
									<div className="flex items-start gap-4">
										<div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${isActive ? 'bg-white/20' : 'bg-blue-50'}`}>
											<Icon className={`h-6 w-6 ${isActive ? 'text-white' : 'text-blue-600'}`} />
										</div>
										<div className="flex-1">
											<h3 className={`text-lg font-bold ${isActive ? 'text-white' : 'text-gray-900'}`}>{type.title}</h3>
											<p className={`mt-1 text-sm ${isActive ? 'text-white/90' : 'text-gray-500'}`}>{type.description}</p>
										</div>
									</div>
								</button>
							)
						})}
					</div>

					<div className="sticky top-28 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
						<div className="relative aspect-video">
							<img src={staffingData[activeType].image} alt={staffingData[activeType].title} className="h-full w-full object-cover" />
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
							<div className="absolute bottom-6 left-6 right-6">
								<h3 className="text-2xl font-bold text-white">{staffingData[activeType].title}</h3>
								<p className="text-white/80">{staffingData[activeType].duration}</p>
							</div>
						</div>

						<div className="p-8">
							<p className="mb-6 text-gray-600">{staffingData[activeType].description}</p>
							<div className="flex flex-wrap gap-3">
								{staffingData[activeType].features.map((feature) => (
									<span key={feature} className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
										{feature}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function ContractProcess() {
	const [activeStep, setActiveStep] = useState(0)

	useEffect(() => {
		const interval = window.setInterval(() => {
			setActiveStep((prev) => (prev + 1) % processSteps.length)
		}, 3000)
		return () => window.clearInterval(interval)
	}, [])

	return (
		<section className="overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 max-w-3xl text-center mx-auto">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700">
						<span className="text-sm font-semibold">Simple Process</span>
					</div>
					<h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-5xl">
						How <span className="text-blue-600">Contract Staffing</span> Works
					</h2>
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{processSteps.map((step, index) => {
						const Icon = step.icon
						const isActive = activeStep === index
						const isPast = index < activeStep
						return (
							<button
								key={step.number}
								onClick={() => setActiveStep(index)}
								className={`rounded-2xl border-2 p-6 text-left transition-all duration-300 ${isActive ? 'scale-105 border-blue-500 bg-blue-50 shadow-xl shadow-blue-500/10' : isPast ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg'}`}
							>
								<div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${isActive ? 'bg-blue-600' : isPast ? 'bg-green-500' : 'bg-gray-100'}`}>
									{isPast ? <CheckCircle2 className="h-7 w-7 text-white" /> : <Icon className={`h-7 w-7 ${isActive ? 'text-white' : 'text-gray-400'}`} />}
								</div>
								<p className={`mb-2 text-sm font-bold ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>Step {step.number}</p>
								<h3 className="mb-2 text-lg font-bold text-gray-900">{step.title}</h3>
								<p className="text-sm text-gray-500">{step.description}</p>
							</button>
						)
					})}
				</div>
			</div>
		</section>
	)
}

function ContractIndustries() {
	const [hoveredIndex, setHoveredIndex] = useState(null)

	return (
		<section className="overflow-hidden bg-white py-20 lg:py-28">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto mb-16 max-w-3xl text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-orange-700">
						<span className="text-sm font-semibold">Industries We Serve</span>
					</div>
					<h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-5xl">
						Contract Staff for <span className="text-blue-600">Every Industry</span>
					</h2>
				</div>

				<div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
					{industries.map((industry, index) => {
						const Icon = industry.icon
						return (
							<div
								key={industry.name}
								className={`group relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-500 lg:p-8 ${hoveredIndex === index ? 'scale-105 border-blue-500 bg-blue-600 shadow-2xl shadow-blue-500/20' : 'border-gray-100 bg-white hover:border-blue-200 hover:shadow-xl'}`}
								onMouseEnter={() => setHoveredIndex(index)}
								onMouseLeave={() => setHoveredIndex(null)}
							>
								<div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${hoveredIndex === index ? 'bg-white/20' : 'bg-blue-50'}`}>
									<Icon className={`h-7 w-7 ${hoveredIndex === index ? 'text-white' : 'text-blue-600'}`} />
								</div>
								<h3 className={`mb-1 text-lg font-bold ${hoveredIndex === index ? 'text-white' : 'text-gray-900'}`}>{industry.name}</h3>
								<p className={`text-sm ${hoveredIndex === index ? 'text-white/80' : 'text-gray-500'}`}>{industry.workers} workers deployed</p>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}

function ContractBenefits({ resolveAsset }) {
	return (
		<section className="relative overflow-hidden bg-slate-50 py-20 lg:py-28">
			<div className="absolute right-0 top-0 h-full w-1/2">
				<div className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-100 opacity-50 blur-3xl" />
				<div className="absolute bottom-1/4 right-1/3 h-48 w-48 rounded-full bg-orange-100 opacity-50 blur-3xl" />
			</div>

			<div className="relative mx-auto max-w-7xl px-6 lg:px-8">
				<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
					<div className="space-y-8">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700">
								<span className="text-sm font-semibold">Why Contract Staffing?</span>
							</div>
							<h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
								Benefits of <span className="text-blue-600">Contract Staffing</span> with TSPL
							</h2>
							<p className="text-lg text-gray-600">Focus on your core business while we handle your workforce needs.</p>
						</div>

						<div className="grid gap-4 sm:grid-cols-2">
							{benefits.map((benefit) => {
								const Icon = benefit.icon
								return (
									<div key={benefit.title} className="group rounded-xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:border-blue-200 hover:shadow-xl">
										<div className="flex items-start gap-4">
											<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 transition-colors group-hover:bg-blue-600">
												<Icon className="h-6 w-6 text-blue-600 transition-colors group-hover:text-white" />
											</div>
											<div>
												<h3 className="font-bold text-gray-900">{benefit.title}</h3>
												<p className="mt-1 text-sm text-gray-500">{benefit.description}</p>
											</div>
										</div>
										<div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
											<span className="text-2xl font-bold text-blue-600">{benefit.stat}</span>
											<span className="text-xs text-gray-400">{benefit.statLabel}</span>
										</div>
									</div>
								)
							})}
						</div>
					</div>

					<div className="relative">
						<div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
						<img src={resolveAsset('contract.scale', '/happy-excited-executive-business-team-600nw-2424450635.jpg.webp').url} alt={resolveAsset('contract.scale', '/happy-excited-executive-business-team-600nw-2424450635.jpg.webp', 'Contract Staffing Benefits').alt} className="h-full w-full object-cover" />
							<div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent" />
							<div className="absolute bottom-0 left-0 right-0 p-8 text-white">
								<p className="mb-2 text-lg font-medium">Trusted by</p>
								<p className="text-4xl font-bold">200+ Companies</p>
								<p className="mt-2 text-white/80">Across India for their staffing needs</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function ContractCTA({ resolveAsset }) {
	const [formData, setFormData] = useState({
		name: '',
		company: '',
		phone: '',
		email: '',
		workers: '',
		duration: '',
		message: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitMessage, setSubmitMessage] = useState('')
	const [submitError, setSubmitError] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()
		setIsSubmitting(true)
		setSubmitMessage('')
		setSubmitError('')

		try {
			await submitLead({
				name: formData.name.trim(),
				email: formData.email.trim(),
				phone: formData.phone.trim(),
				subject: `Contract staffing request${formData.workers ? ` - ${formData.workers}` : ''}`,
				message: [
					`Company: ${formData.company.trim() || 'Not provided'}`,
					`Workers needed: ${formData.workers || 'Not specified'}`,
					`Duration: ${formData.duration || 'Not specified'}`,
					`Details: ${formData.message.trim() || 'No additional details'}`,
				].join('\n'),
			})

			setFormData({
				name: '',
				company: '',
				phone: '',
				email: '',
				workers: '',
				duration: '',
				message: '',
			})
			setSubmitMessage('Your staffing request has been sent. Our team will reach out soon.')
		} catch (error) {
			setSubmitError(error?.message || 'Unable to submit staffing request.')
		} finally {
			setIsSubmitting(false)
		}
	}

	const workerOptions = ['1-10', '11-50', '51-100', '101-500', '500+']
	const durationOptions = ['1-3 Months', '3-6 Months', '6-12 Months', '1+ Year', 'Project Based']

	return (
		<section id="contract-cta" className="relative overflow-hidden bg-white py-20 lg:py-28">
			<div className="absolute inset-0">
				<img src={resolveAsset('contract.contactBackground', '/images/contract-hero.jpg').url} alt={resolveAsset('contract.contactBackground', '/images/contract-hero.jpg', 'Contact Background').alt} className="h-full w-full object-cover opacity-5" />
			</div>

			<div className="relative mx-auto max-w-7xl px-6 lg:px-8">
				<div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
					<div className="space-y-8 lg:col-span-2">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-orange-700">
								<span className="text-sm font-semibold">Get In Touch</span>
							</div>
							<h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
								Ready to <span className="text-blue-600">Scale Your Workforce?</span>
							</h2>
							<p className="text-lg text-gray-600">
								Tell us your staffing needs and we&apos;ll get back to you within 24 hours with a customized solution.
							</p>
						</div>

						<div className="space-y-4">
							{[
								{ icon: Phone, label: 'Call Us', value: '+91 98765 43210', sublabel: 'Mon-Sat 9am-7pm' },
								{ icon: Mail, label: 'Email Us', value: 'contract@tsplgroup.com', sublabel: 'Quick Response' },
								{ icon: MapPin, label: 'Visit Us', value: 'Mumbai, Maharashtra', sublabel: 'Head Office' },
							].map((contact) => {
								const Icon = contact.icon
								return (
									<div key={contact.label} className="group flex items-center gap-4 rounded-xl bg-slate-50 p-4 transition-colors hover:bg-blue-50">
										<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 transition-colors group-hover:bg-blue-600">
											<Icon className="h-5 w-5 text-blue-600 transition-colors group-hover:text-white" />
										</div>
										<div>
											<p className="text-sm text-gray-500">{contact.label}</p>
											<p className="font-semibold text-gray-900">{contact.value}</p>
											<p className="text-xs text-gray-400">{contact.sublabel}</p>
										</div>
									</div>
								)
							})}
						</div>
					</div>

					<div className="lg:col-span-3">
						<div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl lg:p-10">
							<h3 className="mb-2 text-2xl font-bold text-gray-900">Request Contract Staff</h3>
							<p className="mb-8 text-gray-500">Fill in your requirements and we&apos;ll create a customized staffing plan.</p>

							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid gap-4 sm:grid-cols-2">
									<input type="text" required placeholder="Your name" className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
									<input type="text" required placeholder="Company name" className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
								</div>

								<div className="grid gap-4 sm:grid-cols-2">
									<input type="tel" required placeholder="+91 98765 43210" className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
									<input type="email" required placeholder="you@company.com" className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
								</div>

								<div>
									<p className="mb-2 text-sm font-medium text-gray-700">How many workers do you need?</p>
									<div className="flex flex-wrap gap-2">
										{workerOptions.map((option) => (
											<button key={option} type="button" onClick={() => setFormData({ ...formData, workers: option })} className={`rounded-lg border-2 px-4 py-2 font-medium transition-all ${formData.workers === option ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
												{option}
											</button>
										))}
									</div>
								</div>

								<div>
									<p className="mb-2 text-sm font-medium text-gray-700">Contract Duration</p>
									<div className="flex flex-wrap gap-2">
										{durationOptions.map((option) => (
											<button key={option} type="button" onClick={() => setFormData({ ...formData, duration: option })} className={`rounded-lg border-2 px-4 py-2 font-medium transition-all ${formData.duration === option ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
												{option}
											</button>
										))}
									</div>
								</div>

								<textarea rows={3} placeholder="Describe worker type, skills needed, and location" className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />

								<button type="submit" disabled={isSubmitting} className="group flex h-14 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-lg font-semibold text-white shadow-xl shadow-blue-500/25 transition-all hover:from-blue-700 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-70">
									{isSubmitting ? 'Sending...' : 'Submit Staffing Request'}
									<Send className={`ml-2 h-5 w-5 ${isSubmitting ? 'animate-plane-send' : 'transition-transform group-hover:translate-x-1'}`} />
								</button>

								{submitMessage && <p className="pt-1 text-sm font-medium text-green-600">{submitMessage}</p>}
								{submitError && <p className="pt-1 text-sm font-medium text-red-600">{submitError}</p>}

								<div className="flex flex-wrap items-center justify-center gap-4 pt-2">
									{['Free Consultation', 'No Obligation', 'Quick Response'].map((item) => (
										<div key={item} className="flex items-center gap-1 text-sm text-gray-500">
											<CheckCircle2 className="h-4 w-4 text-green-500" />
											{item}
										</div>
									))}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default function ContractPage() {
	const pageAssets = usePageAssets()
	const resolveAsset = (key, fallbackUrl, fallbackAlt = '') => getPageAsset(pageAssets, key, fallbackUrl, fallbackAlt)
	const staffingData = staffingTypes.map((type) => {
		const keyMap = {
			1: 'contract.project',
			2: 'contract.scale',
			3: 'contract.onboard',
			4: 'contract.seasonal',
		}

		return {
			...type,
			image: resolveAsset(keyMap[type.id], type.image).url,
		}
	})

	return (
		<div className="bg-white text-[#0A0A0B]">
			<Navbar />
			<main>
				<ContractHero resolveAsset={resolveAsset} />
				<WhatIsContract resolveAsset={resolveAsset} />
				<StaffingTypes staffingData={staffingData} />
				<ContractProcess />
				<ContractIndustries />
				<ContractBenefits resolveAsset={resolveAsset} />
				<ContractCTA resolveAsset={resolveAsset} />
				<ServiceEnquirySection serviceName="CONTRACT" />
			</main>
			<Footer />
		</div>
	)
}
