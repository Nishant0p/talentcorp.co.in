import { useState } from 'react'
import {
	Phone,
	Mail,
	MapPin,
	Shield,
	Clock,
	CheckCircle,
	Send,
	Users,
	Award,
	Building2,
	Factory,
	Home,
	Calendar,
	ShoppingBag,
	Warehouse,
	GraduationCap,
	Building,
	Eye,
	BadgeCheck,
	Star,
	Search,
	FileCheck,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { submitLead } from '../utils/strapi'
import { getPageAsset, usePageAssets } from '../hooks/usePageAssets'

const placeTypes = [
	'Office Building',
	'Factory / Plant',
	'Residential Society',
	'Event / Function',
	'Retail Store / Mall',
	'Warehouse / Godown',
	'School / College',
	'Hospital / Clinic',
	'Construction Site',
	'Other',
]

const guardCounts = ['1-5 Guards', '6-10 Guards', '11-20 Guards', '21-50 Guards', '50+ Guards']

const processSteps = [
	{
		number: '01',
		icon: Phone,
		title: 'Call or Fill Form',
		desc: 'Tell us how many guards you need and for what place',
		color: 'bg-[#2563EB]',
	},
	{
		number: '02',
		icon: Search,
		title: 'We Find Guards',
		desc: 'We select best guards matching your requirement',
		color: 'bg-[#F97316]',
	},
	{
		number: '03',
		icon: FileCheck,
		title: 'Verification Done',
		desc: 'Guards complete police verification and training',
		color: 'bg-[#2563EB]',
	},
	{
		number: '04',
		icon: Shield,
		title: 'Guards Report',
		desc: 'Trained guards arrive at your location in proper uniform',
		color: 'bg-[#F97316]',
	},
]

const securityTypes = [
	{
		icon: Building2,
		title: 'Office Security',
		desc: 'Guards for corporate offices, IT parks, and business centers',
		color: 'from-[#2563EB]/10 to-[#2563EB]/5',
	},
	{
		icon: Factory,
		title: 'Factory Security',
		desc: 'Protection for manufacturing plants and industrial areas',
		color: 'from-[#F97316]/10 to-[#F97316]/5',
	},
	{
		icon: Home,
		title: 'Residential Security',
		desc: 'Guards for apartments, societies, and individual homes',
		color: 'from-[#2563EB]/10 to-[#2563EB]/5',
	},
	{
		icon: Calendar,
		title: 'Event Security',
		desc: 'Security for weddings, parties, concerts, and functions',
		color: 'from-[#F97316]/10 to-[#F97316]/5',
	},
	{
		icon: ShoppingBag,
		title: 'Retail Security',
		desc: 'Guards for shops, malls, and showrooms',
		color: 'from-[#2563EB]/10 to-[#2563EB]/5',
	},
	{
		icon: Warehouse,
		title: 'Warehouse Security',
		desc: 'Protection for godowns and storage facilities',
		color: 'from-[#F97316]/10 to-[#F97316]/5',
	},
	{
		icon: GraduationCap,
		title: 'School Security',
		desc: 'Safety for schools, colleges, and coaching centers',
		color: 'from-[#2563EB]/10 to-[#2563EB]/5',
	},
	{
		icon: Building,
		title: 'Hospital Security',
		desc: 'Guards for hospitals, clinics, and healthcare centers',
		color: 'from-[#F97316]/10 to-[#F97316]/5',
	},
]

const featureCards = [
	{ icon: Shield, title: 'Full Protection', desc: 'Guards watch your place day and night to keep everyone safe' },
	{ icon: Eye, title: 'Always Alert', desc: 'Our guards stay attentive on duty and monitor every area carefully' },
	{ icon: Clock, title: '24/7 Service', desc: 'We provide guards any time you need, including night shifts' },
	{ icon: Users, title: 'Trained Team', desc: 'All our guards complete practical security training before deployment' },
	{ icon: BadgeCheck, title: 'Verified Guards', desc: 'We conduct background checks and police verification for every guard' },
	{ icon: Phone, title: 'Quick Response', desc: 'Call us anytime and our operations team responds quickly' },
]

const reasons = [
	{ title: 'Police Verified Guards', desc: 'Every guard goes through proper police verification before joining', highlight: true },
	{ title: 'Proper Uniform', desc: 'All guards wear clean, professional uniform while on duty' },
	{ title: 'Training Certificate', desc: 'Guards complete security training and get proper certificate' },
	{ title: 'Supervisor Visit', desc: 'Our supervisor visits regularly to check guard performance' },
	{ title: 'Quick Replacement', desc: 'If guard is absent, we send replacement within few hours' },
	{ title: '24/7 Control Room', desc: 'Our control room is always active to handle any emergency' },
	{ title: 'Insurance Coverage', desc: 'All guards are covered under proper insurance policy' },
	{ title: 'Monthly Reports', desc: 'We give you monthly report of guard attendance and work' },
]

function SecurityHero({ resolveAsset }) {
	return (
		<section className="relative flex min-h-[90vh] items-center overflow-hidden">
			<div className="absolute inset-0">
				<img src={resolveAsset('security.hero', '/images/security-hero.jpg').url} alt={resolveAsset('security.hero', '/images/security-hero.jpg', 'Professional security team').alt} className="h-full w-full object-cover" />
				<div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-[#0F172A]/70" />
			</div>

			<div className="absolute inset-0 opacity-5">
				{[...Array(6)].map((_, i) => (
					<Shield
						key={i}
						className="absolute h-32 w-32 animate-pulse text-white"
						style={{
							left: `${15 + i * 15}%`,
							top: `${20 + (i % 3) * 25}%`,
							animationDelay: `${i * 0.5}s`,
						}}
					/>
				))}
			</div>

			<div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8">
				<div className="max-w-3xl">
					<div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/40 bg-[#2563EB]/20 px-4 py-2 animate-fade-in">
						<Shield className="h-5 w-5 text-[#2563EB]" />
						<span className="text-sm font-bold text-[#2563EB]">TRUSTED SECURITY PARTNER</span>
					</div>

					<h1 className="hero-text-reveal mb-6 text-5xl font-bold leading-[1.1] text-white animate-fade-in sm:text-6xl lg:text-7xl">
						Protect What
						<span className="mt-2 block text-[#2563EB]">Matters Most</span>
					</h1>

					<p className="hero-text-reveal-delay mb-10 max-w-2xl text-xl leading-relaxed text-white/80 animate-fade-in-up animation-delay-100">
						We provide trained, verified security guards for offices, factories, events, and homes. Your safety is our top priority.
					</p>

					<div className="mb-10 flex flex-wrap gap-4 animate-fade-in-up animation-delay-200">
						{[
							{ icon: CheckCircle, text: 'Background Verified' },
							{ icon: Award, text: 'Trained Guards' },
							{ icon: Users, text: '24/7 Availability' },
						].map((item, i) => (
							<div key={i} className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
								<item.icon className="h-5 w-5 text-[#F97316]" />
								<span className="font-medium text-white">{item.text}</span>
							</div>
						))}
					</div>

					<div className="flex flex-col gap-4 animate-fade-in-up animation-delay-300 sm:flex-row">
						<a href="#enquiry" className="inline-flex items-center justify-center rounded-xl bg-[#F97316] px-8 py-4 text-lg font-bold text-white shadow-xl shadow-[#F97316]/30 transition-all duration-300 hover:scale-105 hover:bg-[#EA580C] hover:shadow-2xl">
							Get Security Now
						</a>
						<a href="tel:+919876543210" className="inline-flex items-center justify-center rounded-xl border-2 border-white/40 px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-white/10">
							Call: +91 98765 43210
						</a>
					</div>
				</div>

				<div className="mt-16 grid grid-cols-2 gap-6 animate-fade-in-up animation-delay-400 md:grid-cols-4">
					{[
						{ number: '15,000+', label: 'Guards Deployed' },
						{ number: '500+', label: 'Happy Clients' },
						{ number: '20+', label: 'Cities Covered' },
						{ number: '99%', label: 'Client Retention' },
					].map((stat) => (
						<div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
							<p className="text-3xl font-bold text-[#F97316] lg:text-4xl">{stat.number}</p>
							<p className="mt-1 text-white/70">{stat.label}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

function WhatWeProvide({ resolveAsset }) {
	return (
		<section className="relative overflow-hidden bg-white py-20 lg:py-28">
			<div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#2563EB]/5 blur-3xl" />
			<div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#F97316]/5 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="grid items-center gap-16 lg:grid-cols-2">
					<div className="relative animate-fade-in">
						<div className="relative overflow-hidden rounded-3xl shadow-2xl">
							<img src={resolveAsset('security.guard', '/images/security-guard.jpg').url} alt={resolveAsset('security.guard', '/images/security-guard.jpg', 'Professional security guard').alt} className="h-[500px] w-full object-cover" />
							<div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent" />
						</div>

						<div className="absolute -bottom-8 -right-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl animate-fade-in-up animation-delay-200">
							<div className="flex items-center gap-4">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2563EB]/10">
									<Shield className="h-8 w-8 text-[#2563EB]" />
								</div>
								<div>
									<p className="text-3xl font-bold text-[#0F172A]">10+ Years</p>
									<p className="text-[#64748B]">Keeping India Safe</p>
								</div>
							</div>
						</div>

						<div className="absolute -left-6 -top-6 flex h-20 w-20 rotate-12 items-center justify-center rounded-2xl bg-[#F97316] shadow-xl">
							<Shield className="h-10 w-10 -rotate-12 text-white" />
						</div>
					</div>

					<div className="space-y-8">
						<div className="animate-fade-in">
							<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-4 py-2">
								<span className="text-sm font-bold text-[#2563EB]">WHAT WE PROVIDE</span>
							</div>
							<h2 className="mb-4 text-4xl font-bold text-[#0F172A] lg:text-5xl">
								Complete Security
								<span className="block text-[#2563EB]">For Your Peace of Mind</span>
							</h2>
							<p className="text-lg leading-relaxed text-[#64748B]">
								We provide trained security guards for offices, factories, homes, and events. Every deployment is managed with clear SOPs and verified staff.
							</p>
						</div>

						<div className="grid gap-6 sm:grid-cols-2">
							{featureCards.map((feature, i) => (
								<div key={feature.title} className="group rounded-xl border border-slate-100 bg-slate-50 p-5 transition-all duration-300 hover:border-[#2563EB] hover:bg-[#2563EB] animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
									<feature.icon className="mb-3 h-8 w-8 text-[#2563EB] transition-colors group-hover:text-white" />
									<h3 className="text-lg font-bold text-[#0F172A] transition-colors group-hover:text-white">{feature.title}</h3>
									<p className="mt-1 text-sm text-[#64748B] transition-colors group-hover:text-white/80">{feature.desc}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function SecurityTypes() {
	return (
		<section className="relative overflow-hidden bg-[#0F172A] py-20 lg:py-28">
			<div className="absolute inset-0">
				<div className="absolute left-1/4 top-0 h-96 w-96 animate-pulse rounded-full bg-[#2563EB]/10 blur-3xl" />
				<div className="absolute bottom-0 right-1/4 h-80 w-80 animate-pulse rounded-full bg-[#F97316]/10 blur-3xl" style={{ animationDelay: '1s' }} />
			</div>

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center animate-fade-in">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
						<span className="text-sm font-bold text-white">WHERE WE WORK</span>
					</div>
					<h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">Security For Every Place</h2>
					<p className="mx-auto max-w-2xl text-lg text-white/70">We provide guards for all types of places, big or small, with flexible shift coverage.</p>
				</div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{securityTypes.map((type, i) => (
						<div
							key={type.title}
							className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#2563EB]/50 hover:bg-white/10 animate-fade-in-up"
							style={{ animationDelay: `${i * 100}ms` }}
						>
							<div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${type.color} transition-transform group-hover:scale-110`}>
								<type.icon className="h-7 w-7 text-white" />
							</div>
							<h3 className="mb-2 text-xl font-bold text-white">{type.title}</h3>
							<p className="text-sm leading-relaxed text-white/60">{type.desc}</p>
							<div className="absolute bottom-0 left-0 h-1 w-0 rounded-b-2xl bg-gradient-to-r from-[#2563EB] to-[#F97316] transition-all duration-300 group-hover:w-full" />
						</div>
					))}
				</div>

				<div className="mt-16 text-center animate-fade-in-up animation-delay-500">
					<p className="mb-4 text-white/70">Need security for a different place?</p>
					<a href="#enquiry" className="inline-flex items-center justify-center rounded-xl bg-[#F97316] px-8 py-4 text-lg font-bold text-white shadow-xl shadow-[#F97316]/30 transition-all duration-300 hover:scale-105 hover:bg-[#EA580C]">
						Tell Us Your Need
					</a>
				</div>
			</div>
		</section>
	)
}

function OurProcess() {
	return (
		<section className="relative overflow-hidden bg-white py-20 lg:py-28">
			<div
				className="absolute inset-0 opacity-50"
				style={{
					backgroundImage: 'radial-gradient(circle at 2px 2px, #E2E8F0 1px, transparent 0)',
					backgroundSize: '32px 32px',
				}}
			/>

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center animate-fade-in">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-4 py-2">
						<span className="text-sm font-bold text-[#2563EB]">SIMPLE PROCESS</span>
					</div>
					<h2 className="mb-4 text-4xl font-bold text-[#0F172A] lg:text-5xl">How To Get Security Guards</h2>
					<p className="mx-auto max-w-2xl text-lg text-[#64748B]">Getting security guards from us is simple and transparent in just 4 steps.</p>
				</div>

				<div className="relative">
					<div className="absolute left-0 right-0 top-1/2 hidden h-1 -translate-y-1/2 bg-gradient-to-r from-[#2563EB] via-[#F97316] to-[#2563EB] lg:block" />
					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
						{processSteps.map((step, i) => (
							<div key={step.number} className="relative animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
								<div className="group relative rounded-2xl border border-slate-100 bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
									<div className={`absolute -top-4 left-6 rounded-full px-3 py-1 text-sm font-bold text-white shadow-lg ${step.color}`}>
										Step {step.number}
									</div>
									<div className={`mb-5 mt-4 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg transition-transform group-hover:scale-110 ${step.color}`}>
										<step.icon className="h-8 w-8 text-white" />
									</div>
									<h3 className="mb-2 text-xl font-bold text-[#0F172A]">{step.title}</h3>
									<p className="leading-relaxed text-[#64748B]">{step.desc}</p>
								</div>

								{i < processSteps.length - 1 && (
									<div className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#2563EB] bg-white lg:flex">
										<svg className="h-4 w-4 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
										</svg>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div className="mt-16 text-center animate-fade-in-up animation-delay-500">
					<div className="inline-flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:flex-row">
						<p className="text-lg text-[#0F172A]">
							<span className="font-bold">Ready to get started?</span> Call us now or fill the form below
						</p>
						<a href="tel:+919876543210" className="inline-flex items-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#EA580C]">
							<Phone className="h-5 w-5" />
							Call Now
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}

function WhyChooseUs({ resolveAsset }) {
	const [openReasonIndex, setOpenReasonIndex] = useState(0)

	return (
		<section className="relative overflow-hidden bg-slate-50 py-20 lg:py-28">
			<div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#2563EB]/5 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="grid items-center gap-16 lg:grid-cols-2">
					<div className="space-y-8">
						<div className="animate-fade-in">
							<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-4 py-2">
								<Star className="h-4 w-4 text-[#F97316]" />
								<span className="text-sm font-bold text-[#2563EB]">WHY CHOOSE US</span>
							</div>
							<h2 className="mb-4 text-4xl font-bold text-[#0F172A] lg:text-5xl">
								Why People Trust
								<span className="block text-[#2563EB]">TSPL Security</span>
							</h2>
							<p className="text-lg leading-relaxed text-[#64748B]">We are not just a security company, we are your safety partner. Here is why 500+ companies trust us.</p>
						</div>

						<div className="space-y-4">
							{reasons.map((reason, i) => (
								<button
									key={reason.title}
									type="button"
									onClick={() => setOpenReasonIndex((current) => (current === i ? -1 : i))}
									aria-expanded={openReasonIndex === i}
									className={`w-full rounded-xl p-4 text-left transition-all duration-300 animate-fade-in-up ${
										openReasonIndex === i
											? 'bg-[#2563EB] text-white shadow-xl shadow-[#2563EB]/30'
											: reason.highlight
												? 'border border-[#2563EB]/20 bg-[#2563EB]/5 hover:border-[#2563EB]/40'
												: 'border border-slate-200 bg-white hover:bg-slate-100'
									}`}
									style={{ animationDelay: `${i * 50}ms` }}
								>
									<div className="flex items-start gap-4">
										<CheckCircle className={`mt-0.5 h-6 w-6 shrink-0 ${openReasonIndex === i ? 'text-white' : 'text-[#2563EB]'}`} />
										<div className="flex-1">
											<div className="flex items-center gap-4">
												<h3 className={`font-bold ${openReasonIndex === i ? 'text-white' : 'text-[#0F172A]'}`}>{reason.title}</h3>
											</div>
											<div className={`grid transition-all duration-300 ${openReasonIndex === i ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-60'}`}>
												<p className={`overflow-hidden text-sm ${openReasonIndex === i ? 'text-white/90' : 'text-[#64748B]'}`}>{reason.desc}</p>
											</div>
										</div>
									</div>
								</button>
							))}
						</div>
					</div>

					<div className="relative animate-fade-in-right">
						<div className="relative overflow-hidden rounded-3xl shadow-2xl">
							<img src={resolveAsset('security.training', '/images/security-training.jpg').url} alt={resolveAsset('security.training', '/images/security-training.jpg', 'Security guard training').alt} className="h-[600px] w-full object-cover" />
							<div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent" />

							<div className="absolute bottom-0 left-0 right-0 p-8">
								<div className="rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur-sm">
									<div className="mb-4 flex items-center gap-4">
										<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F97316]">
											<Shield className="h-6 w-6 text-white" />
										</div>
										<div>
											<p className="font-bold text-[#0F172A]">Trained &amp; Certified</p>
											<p className="text-sm text-[#64748B]">All guards complete training</p>
										</div>
									</div>
									<div className="flex gap-2">
										{[1, 2, 3, 4, 5].map((star) => (
											<Star key={star} className="h-5 w-5 fill-[#F97316] text-[#F97316]" />
										))}
										<span className="ml-2 text-sm text-[#64748B]">4.9/5 Rating</span>
									</div>
								</div>
							</div>
						</div>

						<div className="absolute -right-6 -top-6 rounded-2xl bg-[#F97316] p-4 text-white shadow-xl animate-bounce-slow">
							<p className="text-2xl font-bold">500+</p>
							<p className="text-sm">Happy Clients</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function SecurityEnquiry() {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		company: '',
		placeType: '',
		guardCount: '',
		city: '',
		message: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitMessage, setSubmitMessage] = useState('')
	const [submitError, setSubmitError] = useState('')

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
				subject: `Security enquiry${formData.placeType ? ` - ${formData.placeType}` : ''}`,
				message: [
					`Company: ${formData.company.trim() || 'Not provided'}`,
					`Place type: ${formData.placeType || 'Not specified'}`,
					`Guard count: ${formData.guardCount || 'Not specified'}`,
					`City: ${formData.city.trim() || 'Not specified'}`,
					`Details: ${formData.message.trim() || 'No additional details'}`,
				].join('\n'),
			})

			setFormData({
				name: '',
				phone: '',
				email: '',
				company: '',
				placeType: '',
				guardCount: '',
				city: '',
				message: '',
			})
			setSubmitMessage('Your security enquiry has been sent. Our team will contact you soon.')
		} catch (error) {
			setSubmitError(error?.message || 'Unable to submit security enquiry.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section id="enquiry" className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
			<div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[#2563EB]/5 blur-3xl" />
			<div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#F97316]/5 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center animate-fade-in">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F97316]/20 bg-[#F97316]/10 px-4 py-2">
						<Shield className="h-4 w-4 text-[#F97316]" />
						<span className="text-sm font-bold text-[#F97316]">GET SECURITY NOW</span>
					</div>
					<h2 className="mb-4 text-4xl font-bold text-[#0F172A] lg:text-5xl">
						Need Security Guards?
						<span className="block text-[#2563EB]">Tell Us Your Requirement</span>
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-[#64748B]">Fill this form and our team will call you within 2 hours.</p>
				</div>

				<div className="grid gap-12 lg:grid-cols-3">
					<div className="animate-fade-in-up lg:col-span-2">
						<form onSubmit={handleSubmit} className="rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl">
							<div className="grid gap-6 sm:grid-cols-2">
								<div>
									<label className="mb-2 block text-sm font-bold text-[#0F172A]">Your Name *</label>
									<input type="text" required placeholder="Enter your full name" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
								</div>
								<div>
									<label className="mb-2 block text-sm font-bold text-[#0F172A]">Phone Number *</label>
									<input type="tel" required placeholder="Enter your phone number" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20" value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} />
								</div>
								<div>
									<label className="mb-2 block text-sm font-bold text-[#0F172A]">Email Address</label>
									<input type="email" required placeholder="Enter your email" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} />
								</div>
								<div>
									<label className="mb-2 block text-sm font-bold text-[#0F172A]">Company / Organization</label>
									<input type="text" placeholder="Enter company name" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20" value={formData.company} onChange={(event) => setFormData({ ...formData, company: event.target.value })} />
								</div>
								<div>
									<label className="mb-2 block text-sm font-bold text-[#0F172A]">Type of Place *</label>
									<select required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition-all focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20" value={formData.placeType} onChange={(event) => setFormData({ ...formData, placeType: event.target.value })}>
										<option value="">Select place type</option>
										{placeTypes.map((type) => (
											<option key={type} value={type}>
												{type}
											</option>
										))}
									</select>
								</div>
								<div>
									<label className="mb-2 block text-sm font-bold text-[#0F172A]">How Many Guards? *</label>
									<select required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition-all focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20" value={formData.guardCount} onChange={(event) => setFormData({ ...formData, guardCount: event.target.value })}>
										<option value="">Select number of guards</option>
										{guardCounts.map((count) => (
											<option key={count} value={count}>
												{count}
											</option>
										))}
									</select>
								</div>
								<div className="sm:col-span-2">
									<label className="mb-2 block text-sm font-bold text-[#0F172A]">City / Location *</label>
									<input type="text" required placeholder="Enter your city or location" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20" value={formData.city} onChange={(event) => setFormData({ ...formData, city: event.target.value })} />
								</div>
								<div className="sm:col-span-2">
									<label className="mb-2 block text-sm font-bold text-[#0F172A]">Additional Details</label>
									<textarea rows={4} placeholder="Tell us more about your security needs..." className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20" value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} />
								</div>
							</div>

							<button type="submit" disabled={isSubmitting} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F97316] px-8 py-4 text-lg font-bold text-white shadow-xl shadow-[#F97316]/30 transition-all duration-300 hover:scale-[1.02] hover:bg-[#EA580C] hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70">
								{isSubmitting ? 'Sending...' : 'Send Enquiry'}
								<Send className={`h-5 w-5 ${isSubmitting ? 'animate-plane-send' : ''}`} />
							</button>
							{submitMessage && <p className="mt-3 text-sm font-medium text-green-600">{submitMessage}</p>}
							{submitError && <p className="mt-3 text-sm font-medium text-red-600">{submitError}</p>}
						</form>
					</div>

					<div className="space-y-6 animate-fade-in-right">
						<div className="rounded-3xl bg-[#0F172A] p-8 text-white">
							<h3 className="mb-6 text-xl font-bold">Quick Contact</h3>

							<div className="space-y-6">
								<a href="tel:+919876543210" className="group flex items-start gap-4">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] transition-colors group-hover:bg-[#F97316]">
										<Phone className="h-5 w-5" />
									</div>
									<div>
										<p className="text-sm text-white/70">Call Us</p>
										<p className="text-lg font-bold">+91 98765 43210</p>
									</div>
								</a>

								<a href="mailto:security@tsplgroup.com" className="group flex items-start gap-4">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] transition-colors group-hover:bg-[#F97316]">
										<Mail className="h-5 w-5" />
									</div>
									<div>
										<p className="text-sm text-white/70">Email Us</p>
										<p className="font-bold">security@tsplgroup.com</p>
									</div>
								</a>

								<div className="flex items-start gap-4">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]">
										<MapPin className="h-5 w-5" />
									</div>
									<div>
										<p className="text-sm text-white/70">Head Office</p>
										<p className="font-bold">Gurugram, Haryana</p>
									</div>
								</div>
							</div>
						</div>

						<div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl">
							<h3 className="mb-4 text-lg font-bold text-[#0F172A]">When You Enquire</h3>
							<div className="space-y-3">
								{['Free consultation call', 'Site visit if needed', 'Custom security plan', 'Best price guarantee'].map((item) => (
									<div key={item} className="flex items-center gap-3">
										<CheckCircle className="h-5 w-5 text-[#2563EB]" />
										<span className="text-[#64748B]">{item}</span>
									</div>
								))}
							</div>
						</div>

						<div className="rounded-3xl bg-[#2563EB] p-6 text-white">
							<div className="flex items-center gap-4">
								<div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
									<Clock className="h-7 w-7" />
								</div>
								<div>
									<p className="text-white/80">Response Time</p>
									<p className="text-2xl font-bold">Within 2 Hours</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default function SecurityPage() {
	const pageAssets = usePageAssets()
	const resolveAsset = (key, fallbackUrl, fallbackAlt = '') => getPageAsset(pageAssets, key, fallbackUrl, fallbackAlt)

	return (
		<div className="bg-white text-[#0F172A]">
			<Navbar />
			<SecurityHero resolveAsset={resolveAsset} />
			<WhatWeProvide resolveAsset={resolveAsset} />
			<SecurityTypes />
			<OurProcess />
			<WhyChooseUs resolveAsset={resolveAsset} />
			<SecurityEnquiry />
			<Footer />
		</div>
	)
}
