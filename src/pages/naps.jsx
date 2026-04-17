import {
    ArrowRight,
    Award,
    BadgeCheck,
    Briefcase,
    Building2,
    CheckCircle,
    CheckCircle2,
    FileCheck,
    GraduationCap,
    Mail,
    Phone,
    Shield,
    Sparkles,
    Target,
    TrendingUp,
    UserCheck,
    Users,
    Wallet,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { StaggerContainer, StaggerItem } from '../components/AnimatedContent'

const heroStats = [{ value: '15,000+', label: 'Professionals Trained' }, { value: '500+', label: 'Premium Partners' }, { value: 'Rs. 15,000+', label: 'Average Monthly Pay' }]

const aboutHighlights = [
	'12-month premium apprenticeship',
	'Monthly stipend up to Rs. 15,000',
	'Industry-recognized certification',
	'Advanced skill development',
]

const aboutFeatures = [
	{ icon: TrendingUp, title: 'Career Growth', desc: 'Fast-track advancement opportunities' },
	{ icon: Users, title: 'Expert Mentors', desc: 'Learn from industry leaders' },
	{ icon: Award, title: '90% Get Jobs', desc: 'Premium job placements' },
]

const applicantBenefits = [
	{ icon: Wallet, title: 'Rs. 15,000+/month', desc: 'Competitive monthly stipend' },
	{ icon: TrendingUp, title: 'Career Acceleration', desc: 'Fast-track growth' },
	{ icon: Award, title: '90% Placement', desc: 'Premium job offers' },
	{ icon: Target, title: 'Skill Mastery', desc: 'Advanced training' },
]

const employerBenefits = [
	{ icon: Shield, title: 'Vetted Talent', desc: 'Pre-qualified professionals' },
	{ icon: Users, title: 'Skilled Workforce', desc: 'Advanced capabilities' },
	{ icon: BadgeCheck, title: 'Tax Benefits', desc: 'Government incentives' },
	{ icon: Building2, title: 'Dedicated Support', desc: 'Full assistance' },
]

const applicantReqs = [
	'Degree/Advanced diploma holder',
	'Passed within last 5 years',
	'Age 21-35, Indian citizen',
	'Valid Aadhaar & bank account',
]

const employerReqs = [
	'Registered company/enterprise',
	'Minimum 10 employees',
	'Valid GST registration',
	'Advanced infrastructure',
]

const documents = {
	applicant: ['Aadhaar Card', 'Degree', 'Photo', 'Bank Details'],
	employer: ['Registration Cert', 'GST', 'PAN Card', 'Infrastructure Proof'],
}

const processSteps = [
	{ icon: UserCheck, title: 'Apply', desc: 'Submit your professional profile and requirements' },
	{ icon: CheckCircle, title: 'Screen', desc: 'Get shortlisted based on qualifications' },
	{ icon: Briefcase, title: 'Match', desc: 'Get matched with ideal companies' },
	{ icon: TrendingUp, title: 'Train', desc: 'Begin premium apprenticeship training' },
	{ icon: Award, title: 'Perform', desc: 'Excel with hands-on project work' },
	{ icon: CheckCircle2, title: 'Certify', desc: 'Earn recognition and secure job offers' },
]

function NAPSHero() {
	return (
		<section className="relative flex min-h-[88vh] items-center overflow-hidden bg-white">
			<div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(37,99,235,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
			<div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#2563EB]/10 blur-3xl" />
			<div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-[#F97316]/10 blur-3xl" />

			<div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
				<div className="mx-auto max-w-5xl text-center">
					<div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-5 py-2.5 backdrop-blur-sm">
						<Sparkles className="h-4 w-4 text-[#2563EB]" />
						<span className="text-sm font-semibold tracking-wide text-[#0F172A]">Premium Apprenticeship Program</span>
					</div>

					<h1 className="mb-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-[#0F172A] sm:text-6xl md:text-7xl lg:text-8xl">
						National Apprenticeship
						<span className="mt-2 block bg-gradient-to-r from-[#2563EB] to-[#F97316] bg-clip-text text-transparent">Programme Scheme</span>
					</h1>

					<p className="mx-auto mb-10 max-w-3xl text-xl font-medium leading-relaxed text-[#475569] sm:text-2xl lg:text-3xl">
						Advance your career with <span className="font-bold text-[#2563EB]">world-class industry experience</span> and <span className="font-bold text-[#F97316]">competitive compensation</span>
					</p>

					<div className="mb-14 flex flex-col justify-center gap-4 sm:flex-row">
						<Link to="/jobs" className="group inline-flex items-center rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] px-10 py-5 text-lg font-semibold text-white shadow-2xl shadow-[#2563EB]/40 transition-all duration-300 hover:scale-105">
							<Briefcase className="mr-2 h-5 w-5" />
							Apply Now
							<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
						</Link>
						<Link to="/contact-us" className="inline-flex items-center rounded-2xl border-2 border-[#2563EB] bg-white px-10 py-5 text-lg font-semibold text-[#2563EB] transition-all duration-300 hover:bg-[#2563EB] hover:text-white">
							<TrendingUp className="mr-2 h-5 w-5" />
							Learn More
						</Link>
					</div>

					<div className="flex justify-center">
						<StaggerContainer staggerDelay={0.08} className="flex flex-wrap justify-center gap-6">
							{heroStats.map((stat) => (
								<StaggerItem key={stat.label}>
									<div className="flex items-center gap-4 rounded-2xl border border-[#2563EB]/20 bg-white/80 px-8 py-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#2563EB]/50 hover:bg-white hover:shadow-md">
										<div className="text-left">
											<p className="bg-gradient-to-r from-[#2563EB] to-[#F97316] bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">{stat.value}</p>
											<p className="text-sm font-medium text-[#64748B]">{stat.label}</p>
										</div>
									</div>
								</StaggerItem>
							))}
						</StaggerContainer>
					</div>
				</div>
			</div>
		</section>
	)
}

function NAPSAbout() {
	return (
		<section className="relative bg-slate-50 py-20 lg:py-28">
			<div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='256' height='256' fill='white'/%3E%3Cpath d='M0 0h256v256H0z' fill='none'/%3E%3C/svg%3E")` }} />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="grid items-center gap-16 lg:grid-cols-2">
					<div>
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-4 py-2">
							<span className="h-2 w-2 animate-pulse rounded-full bg-[#2563EB]" />
							<span className="text-sm font-bold tracking-wide text-[#2563EB]">About NAPS</span>
						</div>

						<h2 className="mb-6 text-4xl font-bold leading-tight text-[#0F172A] lg:text-5xl">
							What is <span className="text-[#2563EB]">NAPS?</span>
						</h2>

						<p className="mb-8 text-lg leading-relaxed text-[#475569] lg:text-xl">
							An elite apprenticeship program designed for skilled professionals seeking premium career advancement with top-tier industries and competitive compensation.
						</p>

						<div className="mb-8 space-y-4">
							{aboutHighlights.map((item, i) => (
								<div key={item} className="flex items-center gap-3" style={{ animationDelay: `${i * 100}ms` }}>
									<div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2563EB]/20">
										<CheckCircle2 className="h-4 w-4 text-[#2563EB]" />
									</div>
									<span className="text-base font-medium text-[#334155]">{item}</span>
								</div>
							))}
						</div>

						<div className="inline-flex items-center gap-3 rounded-xl border border-[#BFDBFE] bg-gradient-to-r from-[#DBEAFE] to-[#EFF6FF] px-5 py-3">
							<span className="text-base font-semibold text-[#1E40AF]">Premium Apprenticeship Program</span>
						</div>
					</div>

					<div className="space-y-6">
						<div className="relative overflow-hidden rounded-3xl shadow-2xl">
							<img
								src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80"
								alt="Professionals in training"
								className="h-72 w-full object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/50 to-transparent" />
						</div>

					<StaggerContainer staggerDelay={0.1} className="grid grid-cols-3 gap-4">
								{aboutFeatures.map((feature) => (
									<StaggerItem key={feature.title}>
										<div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#2563EB]/40 hover:shadow-xl">
											<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] shadow-lg shadow-[#2563EB]/30">
												<feature.icon className="h-6 w-6 text-white" />
											</div>
											<h3 className="mb-1 text-base font-bold text-[#0F172A]">{feature.title}</h3>
											<p className="text-sm text-[#64748B]">{feature.desc}</p>
										</div>
									</StaggerItem>
								))}
					</StaggerContainer>
					</div>
				</div>
			</div>
		</section>
	)
}

function NAPSBenefits() {
	return (
		<section className="relative bg-white py-20 lg:py-28">
			<div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[#2563EB]/5 blur-3xl" />
			<div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#F97316]/5 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-4xl font-bold text-[#0F172A] lg:text-5xl">
						Why Choose <span className="bg-gradient-to-r from-[#2563EB] to-[#F97316] bg-clip-text text-transparent">NAPS?</span>
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-[#64748B]">Premium benefits for professionals and employers</p>
				</div>

				<div className="grid gap-10 lg:grid-cols-2">
					<div>
						<div className="mb-8 flex items-center gap-4">
							<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] shadow-lg shadow-[#2563EB]/30">
								<TrendingUp className="h-7 w-7 text-white" />
							</div>
							<h3 className="text-2xl font-bold text-[#0F172A]">For Professionals</h3>
						</div>
							<div className="grid grid-cols-2 gap-4">
								{applicantBenefits.map((benefit, i) => (
									<div key={benefit.title} className="group flex items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-all duration-300 hover:scale-[1.03] hover:border-[#2563EB]/40 hover:shadow-xl" style={{ animationDelay: `${i * 100}ms` }}>
										<div className="h-12 w-12 shrink-0 rounded-xl bg-[#2563EB]/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#2563EB]">
											<benefit.icon className="h-6 w-6 text-[#2563EB] transition-colors duration-300 group-hover:text-white" />
										</div>
										<div>
											<h4 className="mb-1 text-base font-bold text-[#0F172A]">{benefit.title}</h4>
											<p className="text-sm text-[#64748B]">{benefit.desc}</p>
										</div>
									</div>
								))}
							</div>
					</div>

					<div>
						<div className="mb-8 flex items-center gap-4">
							<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F97316] to-[#EA580C] shadow-lg shadow-[#F97316]/30">
								<Building2 className="h-7 w-7 text-white" />
							</div>
							<h3 className="text-2xl font-bold text-[#0F172A]">For Employers</h3>
						</div>
						<div className="grid grid-cols-2 gap-4">
							{employerBenefits.map((benefit, i) => (
								<div key={benefit.title} className="group flex items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-all duration-300 hover:scale-[1.03] hover:border-[#F97316]/40 hover:shadow-xl" style={{ animationDelay: `${i * 100}ms` }}>
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F97316]/10 transition-colors duration-300 group-hover:bg-[#F97316]">
										<benefit.icon className="h-6 w-6 text-[#F97316] transition-colors duration-300 group-hover:text-white" />
									</div>
									<div>
										<h4 className="mb-1 text-base font-bold text-[#0F172A]">{benefit.title}</h4>
										<p className="text-sm text-[#64748B]">{benefit.desc}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function NAPSEligibility() {
	return (
		<section className="relative bg-slate-50 py-16 lg:py-20">
			<div
				className="absolute inset-0 opacity-5"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='256' height='256' fill='white'/%3E%3C/svg%3E")`,
				}}
			/>

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-12 text-center animate-fade-in">
					<h2 className="mb-2 text-3xl font-bold text-[#0F172A]">
						Who Can <span className="bg-gradient-to-r from-[#2563EB] to-[#F97316] bg-clip-text text-transparent">Join?</span>
					</h2>
					<p className="text-[#64748B]">Eligibility criteria & required documents</p>
				</div>

				<div className="mb-8 grid gap-6 lg:grid-cols-2">
					<div className="animate-fade-in-up rounded-2xl border border-[#2563EB]/10 bg-gradient-to-br from-[#2563EB]/5 to-[#BFDBFE]/5 p-6 transition-transform hover:-translate-y-1">
						<div className="mb-5 flex items-center gap-3">
							<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8]">
								<TrendingUp className="h-5 w-5 text-white" />
							</div>
							<h3 className="text-lg font-bold text-[#0F172A]">Professionals</h3>
						</div>
						<ul className="space-y-2">
							{applicantReqs.map((req) => (
								<li key={req} className="flex items-center gap-2 text-sm text-[#475569]">
									<span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
									{req}
								</li>
							))}
						</ul>
					</div>

					<div className="animate-fade-in-up animation-delay-100 rounded-2xl border border-[#F97316]/10 bg-gradient-to-br from-[#F97316]/5 to-[#FED7AA]/5 p-6 transition-transform hover:-translate-y-1">
						<div className="mb-5 flex items-center gap-3">
							<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#F97316] to-[#EA580C]">
								<Building2 className="h-5 w-5 text-white" />
							</div>
							<h3 className="text-lg font-bold text-[#0F172A]">Employers</h3>
						</div>
						<ul className="space-y-2">
							{employerReqs.map((req) => (
								<li key={req} className="flex items-center gap-2 text-sm text-[#475569]">
									<span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" />
									{req}
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="animate-fade-in-up animation-delay-200 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
					<div className="mb-5 flex items-center gap-2">
						<FileCheck className="h-5 w-5 text-[#0F172A]" />
						<h3 className="font-bold text-[#0F172A]">Required Documents</h3>
					</div>
					<div className="grid gap-6 md:grid-cols-2">
						<div>
							<p className="mb-3 text-sm font-medium text-[#2563EB]">Professionals</p>
							<div className="flex flex-wrap gap-2">
								{documents.applicant.map((doc) => (
									<span
										key={doc}
										className="rounded-full border border-[#BFDBFE] bg-gradient-to-r from-[#2563EB]/10 to-[#DBEAFE] px-3 py-1.5 text-xs text-[#1E40AF] transition-colors hover:border-[#2563EB]/50"
									>
										{doc}
									</span>
								))}
							</div>
						</div>
						<div>
							<p className="mb-3 text-sm font-medium text-[#F97316]">Employers</p>
							<div className="flex flex-wrap gap-2">
								{documents.employer.map((doc) => (
									<span
										key={doc}
										className="rounded-full border border-[#FED7AA] bg-gradient-to-r from-[#F97316]/10 to-[#FED7AA] px-3 py-1.5 text-xs text-[#92400E] transition-colors hover:border-[#F97316]/50"
									>
										{doc}
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

function NAPSProcess() {
	return (
		<section className="relative overflow-hidden bg-white py-20 lg:py-28">
			<div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='256' height='256' fill='white'/%3E%3C/svg%3E")` }} />
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#2563EB]/10 opacity-40 blur-3xl" />
				<div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#F97316]/10 opacity-40 blur-3xl" />
			</div>

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center lg:mb-20">
					<div className="mb-6 inline-flex items-center rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 px-4 py-2">
						<span className="text-sm font-semibold text-[#2563EB]">Our Process</span>
					</div>
					<h2 className="mb-4 text-4xl font-bold leading-tight text-[#0F172A] lg:text-5xl">
						Your Path to <span className="bg-gradient-to-r from-[#2563EB] to-[#F97316] bg-clip-text text-transparent">Excellence</span>
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-[#64748B]">
						Follow our premium 6-step process designed to match professionals with perfect opportunities
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
					{processSteps.map((step, i) => (
						<div key={step.title} className="group relative">
							<div className="relative h-full overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm transition-all duration-500 hover:border-[#2563EB]/60 hover:shadow-xl">
								<div className="absolute inset-0 bg-gradient-to-br from-[#DBEAFE]/50 to-[#FED7AA]/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
								<div className="absolute -right-8 -top-8 text-8xl font-bold text-[#F3F4F6] transition-colors duration-500 group-hover:text-[#2563EB]/20">
									{String(i + 1).padStart(2, '0')}
								</div>

								<div className="relative z-10">
									<div className="mb-6 inline-flex">
										<div className="rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#FED7AA] p-3 transition-all duration-500 group-hover:from-[#BFDBFE] group-hover:to-[#FCA5A5]">
											<step.icon className="h-6 w-6 text-[#2563EB]" />
										</div>
									</div>

									<h3 className="mb-2 text-xl font-semibold text-[#0F172A] transition-colors group-hover:text-[#2563EB]">{step.title}</h3>
									<p className="mb-5 text-sm leading-relaxed text-[#64748B]">{step.desc}</p>

									{i < processSteps.length - 1 && (
										<div className="hidden items-center text-sm font-medium text-[#2563EB] opacity-0 transition-opacity group-hover:opacity-100 lg:flex">
											<span>Next step</span>
											<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
										</div>
									)}
								</div>
								{i < processSteps.length - 1 && (
									<div className="absolute -bottom-8 left-1/2 h-8 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#2563EB] to-transparent md:hidden" />
								)}
							</div>
						</div>
					))}
				</div>

				<div className="mt-16 text-center lg:mt-20">
					<p className="mb-6 text-[#64748B]">Ready to advance your career?</p>
						<Link to="/contact-us" className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#2563EB] to-[#F97316] px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
						Start Your Journey
						</Link>
				</div>
			</div>
		</section>
	)
}

function NAPSCTA() {
	return (
		<section className="px-8 pb-20 pt-2">
			<div className="mx-auto w-full max-w-6xl">
				<div className="flex flex-col items-center justify-between gap-10 rounded-3xl bg-gradient-to-r from-[#2d52b4] to-[#4083ff] p-8 shadow-lg md:flex-row md:p-12">
					<div className="flex-1">
						<h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">Start Your Journey Today</h2>
						<p className="mb-8 text-lg text-blue-100">Join thousands who transformed their careers through NATS.</p>

						<div className="flex flex-wrap gap-4">
							<Link to="/jobs" className="flex items-center gap-2 rounded-full bg-[#f97316] px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#ea580c]">
								<GraduationCap className="h-5 w-5" />
								Join Now
								<ArrowRight className="h-5 w-5" />
							</Link>

							<Link to="/contact-us" className="flex items-center gap-2 rounded-full border border-white/40 bg-transparent px-6 py-3 font-medium text-white transition-colors hover:bg-white/10">
								<Building2 className="h-5 w-5 text-blue-100" />
								For Employers
							</Link>
						</div>
					</div>

					<div className="w-full rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm md:w-[420px]">
						<h3 className="mb-4 font-medium text-white">Need Help?</h3>

						<div className="space-y-3">
							<a href="tel:+919876543210" className="flex items-center gap-4 rounded-xl bg-white/15 p-4 text-white no-underline transition-colors hover:bg-white/25">
								<Phone className="h-5 w-5 text-blue-100" />
								<span className="font-medium">+91 98765 43210</span>
							</a>

							<a href="mailto:support@tsplgroup.com" className="flex items-center gap-4 rounded-xl bg-white/15 p-4 text-white no-underline transition-colors hover:bg-white/25">
								<Mail className="h-5 w-5 text-blue-100" />
								<span className="font-medium">support@tsplgroup.com</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default function NapsPage() {
	return (
		<div className="min-h-screen bg-slate-50 text-slate-800">
			<Navbar />
			<main>
				<NAPSHero />
				<NAPSAbout />
				<NAPSBenefits />
				<NAPSEligibility />
				<NAPSProcess />
				<NAPSCTA />
			</main>
			<Footer />
		</div>
	)
}
