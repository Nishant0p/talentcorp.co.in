import {
	ArrowRight,
	Briefcase,
	Building2,
	CheckCircle2,
	Clock,
	Factory,
	FileText,
	GraduationCap,
	MapPin,
	Mail,
	Phone,
	ShieldCheck,
	TrendingUp,
	Users,
	Wallet,
	UserCheck,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const programmeFeatures = [
	'UGC Scheme - Skill Development',
	'National Skills Qualification Framework (NSQF)',
	'Undergraduate Degree Recognition',
	'Industry-Aligned Job Roles',
	'Multiple Exit Options',
]

const employerBenefits = [
	{
		icon: Wallet,
		title: 'Reduction of Recruitment Cost',
		description: 'Build a ready workforce in-house and reduce hiring overhead for entry-level roles.',
		color: '#2563EB',
	},
	{
		icon: ShieldCheck,
		title: 'Reduction of Compliance Cost',
		description: 'One stop solution for all national compliance with no statutory deductions.',
		color: '#22C55E',
	},
	{
		icon: TrendingUp,
		title: 'Increase Productivity',
		description: 'Improve competence and efficiency of your organization by training candidates directly.',
		color: '#F97316',
	},
	{
		icon: Users,
		title: 'Control Absenteeism & Attrition',
		description: 'Train candidates in your work culture from day one for better workforce stability.',
		color: '#0EA5E9',
	},
	{
		icon: Briefcase,
		title: 'No Legal Hiring Obligation',
		description: 'Train according to your requirement with complete flexibility to hire or release.',
		color: '#EC4899',
	},
	{
		icon: Building2,
		title: 'CSR & Nation Building Value',
		description: 'Contribute to skilled manpower development and equal opportunity for underprivileged sectors.',
		color: '#8B5CF6',
	},
]

const programmeHighlights = [
	'Undergraduate Degree with NSQF Alignment',
	'2-year training duration under Flexi MoU-CTS',
	'Job roles and NOSs incorporated in curriculum',
	'Consolidated stipend payment model',
	'Certificate awarded upon successful completion',
]

const employerModelPoints = [
	'Employer must have established infrastructure, robust training facilities, and trained faculty.',
	'Trainees are considered student trainees up to completion of training tenure.',
	'No statutory deductions like EPF, ESIC, Bonus, Gratuity applicable during training.',
	'This is not an employment contract or labor contract during the training model.',
	'Industry can onboard candidates in age group 18 to 40 years.',
	'Industry can onboard candidates with qualification range from 8th to 12th standard.',
	'Training duration is 2 years with certificate upon completion.',
	'Opportunity to develop skilled manpower according to specific industry requirements.',
]

const steps = [
	{
		number: '01',
		icon: Building2,
		title: 'Industry Enrolment',
		description: 'Employer partner enrols with infrastructure details, training facilities, and faculty credentials.',
		color: '#2563EB',
	},
	{
		number: '02',
		icon: UserCheck,
		title: 'Candidate Selection',
		description: 'Eligible candidates (18-40 years, 8th-12th qualification) are screened and mapped to roles.',
		color: '#F97316',
	},
	{
		number: '03',
		icon: Factory,
		title: 'Skill Development & Training',
		description: 'Candidates participate in structured training with job-specific skills and practical industry exposure.',
		color: '#22C55E',
	},
	{
		number: '04',
		icon: GraduationCap,
		title: 'Certification & Deployment',
		description: 'After 2-year tenure, candidates receive degree certificate and can be absorbed as industry-ready talent.',
		color: '#8B5CF6',
	},
]

function BvocHero() {
	return (
		<section className="relative min-h-[90vh] overflow-hidden bg-[#0F172A] pt-24">
			<div className="absolute inset-0">
				<img
					src="https://images.prismic.io/tspl/7b91575d-3a91-4512-9c7b-8ae013dbcf9f_UGC_India_Logo.png?auto=compress,format&w=640"
					alt="B. Voc programme"
					className="h-full w-full object-contain bg-white"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/85 to-[#0F172A]/70" />
			</div>

			<div className="absolute right-20 top-20 h-72 w-72 rounded-full bg-[#2563EB]/20 blur-3xl" />
			<div className="absolute bottom-20 left-20 h-96 w-96 rounded-full bg-[#F97316]/10 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-32">
				<div className="grid items-center gap-12 lg:grid-cols-2">
					<div className="space-y-8">
						<div className="inline-flex items-center gap-2 rounded-full border border-[#F97316]/30 bg-[#F97316]/20 px-4 py-2">
							<span className="h-2 w-2 animate-pulse rounded-full bg-[#F97316]" />
							<span className="text-sm font-bold text-[#F97316]">UGC SCHEME | NSQF FRAMEWORK</span>
						</div>

						<h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
							Bachelor in Vocational Studies
							<span className="mt-2 block text-[#2563EB]">(B. Voc)</span>
							<span className="mt-2 block">UGC Skill Development Degree</span>
						</h1>

						<p className="max-w-xl text-lg leading-relaxed text-white/80 lg:text-xl">
							B. Voc is an undergraduate degree programme focused on practical skill development and industry-aligned learning. The UGC scheme combines traditional academic education with specific job roles and NSQF standards for enhanced employment potential.
						</p>

						<div className="flex flex-wrap gap-4">
							{['Undergraduate Degree', 'NSQF Aligned', 'Industry-Focused'].map((item) => (
								<div key={item} className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
									<CheckCircle2 className="h-5 w-5 text-[#22C55E]" />
									<span className="font-medium text-white">{item}</span>
								</div>
							))}
						</div>

						<div className="flex flex-col gap-4 pt-4 sm:flex-row">
							<a
								href="#enquiry"
								className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F97316] px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-[#F97316]/30 transition-all duration-300 hover:scale-105 hover:bg-[#EA580C]"
							>
								Enquire for B. Voc
								<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
							</a>
						</div>

						<div className="flex items-center gap-8 border-t border-white/10 pt-6">
							<div className="text-center">
								<p className="text-3xl font-bold text-white">2 Years</p>
								<p className="text-sm text-white/60">Training Duration</p>
							</div>
							<div className="h-12 w-px bg-white/20" />
							<div className="text-center">
								<p className="text-3xl font-bold text-[#2563EB]">18-40</p>
								<p className="text-sm text-white/60">Age Group</p>
							</div>
							<div className="h-12 w-px bg-white/20" />
							<div className="text-center">
								<p className="text-3xl font-bold text-[#F97316]">Level 5+</p>
								<p className="text-sm text-white/60">NSQF Certified</p>
							</div>
						</div>
					</div>

					<div className="hidden lg:block">
					<div className="relative rounded-3xl border border-white/20 bg-white/10 p-12 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-white/40 hover:bg-white/20 cursor-pointer group">
						<div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#F97316]/30 blur-2xl transition-all duration-300 group-hover:h-32 group-hover:w-32" />
						<h3 className="mb-6 text-2xl font-bold text-white transition-colors group-hover:text-[#F97316]">Key Programme Features</h3>
						<div className="grid grid-cols-2 gap-3">
							{programmeFeatures.map((item) => (
								<div key={item} className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white/90 transition-all duration-200 hover:bg-white/20 hover:text-white">
										{item}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function BvocBenefits() {
	return (
		<section className="relative overflow-hidden py-20 lg:py-28">
			<div className="absolute inset-0 bg-gradient-to-b from-white via-[#F8FAFC] to-white" />
			<div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#2563EB]/5 blur-3xl" />
			<div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#F97316]/5 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-4 py-2">
						<span className="text-sm font-bold text-[#2563EB]">AN EMPLOYER SKILL MODEL</span>
					</div>
					<h2 className="mb-4 text-4xl font-bold text-[#0F172A] lg:text-5xl">Why Industry Partners Choose B. Voc</h2>
					<p className="mx-auto max-w-3xl text-lg text-[#64748B]">
						The UGC B. Voc scheme enables industry partners with robust infrastructure to conduct in-house skilling and build undergraduate-level, NSQF-aligned manpower while contributing to national skill development.
					</p>
				</div>

				<div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{employerBenefits.map((benefit, index) => (
						<div
							key={benefit.title}
							className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/30 hover:shadow-xl"
							style={{ animationDelay: `${index * 100}ms` }}
						>
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2563EB]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
							<div className="relative z-10">
								<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110" style={{ backgroundColor: `${benefit.color}15` }}>
									<benefit.icon className="h-7 w-7" style={{ color: benefit.color }} />
								</div>
								<h3 className="mb-2 text-xl font-bold text-[#0F172A]">{benefit.title}</h3>
								<p className="leading-relaxed text-[#64748B]">{benefit.description}</p>
							</div>
							<div className="absolute bottom-0 left-0 h-1 w-0 rounded-b-2xl transition-all duration-300 group-hover:w-full" style={{ backgroundColor: benefit.color }} />
						</div>
					))}
				</div>

				<div className="grid gap-8 rounded-3xl bg-[#0F172A] p-8 lg:grid-cols-2 lg:p-12">
					<div>
						<h3 className="mb-4 text-2xl font-bold text-white lg:text-3xl">Programme Highlights</h3>
						<p className="mb-6 text-white/70">Structured to deliver practical outcomes for students and measurable value for employers.</p>

						<ul className="space-y-4">
							{programmeHighlights.map((item) => (
								<li key={item} className="flex items-start gap-3">
									<CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#22C55E]" />
									<span className="text-white/90">{item}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="relative h-64 overflow-hidden rounded-2xl border border-white/10 bg-white p-8 lg:h-auto">
						<img
							src="https://images.prismic.io/tspl/7b91575d-3a91-4512-9c7b-8ae013dbcf9f_UGC_India_Logo.png?auto=compress,format&w=640"
							alt="UGC India logo"
							className="mx-auto mb-6 h-24 w-auto object-contain"
						/>
						<p className="text-center text-sm leading-relaxed text-[#334155]">
							B. Voc combines practical skill development with academic recognition under the UGC framework for holistic employment potential.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

function BvocProcess() {
	return (
		<section className="relative overflow-hidden bg-[#F8FAFC] py-20 lg:py-28">
			<div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #2563EB 1px, transparent 0)', backgroundSize: '40px 40px' }} />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F97316]/20 bg-[#F97316]/10 px-4 py-2">
						<span className="text-sm font-bold text-[#F97316]">IMPLEMENTATION FLOW</span>
					</div>
					<h2 className="mb-4 text-4xl font-bold text-[#0F172A] lg:text-5xl">4 Steps to Build Skilled Manpower</h2>
					<p className="mx-auto max-w-2xl text-lg text-[#64748B]">A practical model for industries to train, assess, and deploy high-potential candidates with UGC degree recognition.</p>
				</div>

				<div className="relative">
					<div className="absolute left-0 right-0 top-1/2 hidden h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#2563EB] via-[#F97316] to-[#22C55E] lg:block" />
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
						{steps.map((step, index) => (
							<div key={step.number} className="relative">
								<div className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/30 hover:shadow-xl">
									<div className="absolute -top-5 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg" style={{ backgroundColor: step.color }}>
										{step.number}
									</div>
									<div className="mx-auto mb-4 mt-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110" style={{ backgroundColor: `${step.color}15` }}>
										<step.icon className="h-8 w-8" style={{ color: step.color }} />
									</div>
									<h3 className="mb-2 text-center text-xl font-bold text-[#0F172A]">{step.title}</h3>
									<p className="text-center text-sm leading-relaxed text-[#64748B]">{step.description}</p>
								</div>
								{index < steps.length - 1 && (
									<div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 lg:block">
										<ArrowRight className="h-8 w-8 text-[#2563EB]" />
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

function BvocEligibility() {
	return (
		<section className="relative overflow-hidden py-20 lg:py-28">
			<div className="absolute inset-0 bg-white" />
			<div className="absolute left-0 top-0 h-full w-full bg-gradient-to-br from-[#2563EB]/5 via-transparent to-[#F97316]/5" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#22C55E]/20 bg-[#22C55E]/10 px-4 py-2">
						<span className="text-sm font-bold text-[#22C55E]">POLICY FRAMEWORK</span>
					</div>
					<h2 className="mb-4 text-4xl font-bold text-[#0F172A] lg:text-5xl">Key Terms Under the Model</h2>
					<p className="mx-auto max-w-2xl text-lg text-[#64748B]">Important conditions for participating industries and trainees in the B. Voc model.</p>
				</div>

				<div className="grid gap-8 lg:grid-cols-2">
					<div className="rounded-3xl border border-[#22C55E]/20 bg-[#22C55E]/5 p-8">
						<div className="mb-6 flex items-center gap-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#22C55E]/20">
								<CheckCircle2 className="h-6 w-6 text-[#22C55E]" />
							</div>
							<h3 className="text-2xl font-bold text-[#0F172A]">Candidate Eligibility</h3>
						</div>

						<ul className="space-y-4">
							{[
								'Age between 18 and 40 years',
								'Minimum qualification: 8th to 12th standard',
								'Treated as student trainee during training tenure',
								'Certificate awarded upon successful completion',
								'Recognition as undergraduate degree holder post-certification',
							].map((item) => (
								<li key={item} className="flex items-start gap-3">
									<CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#22C55E]" />
									<span className="text-lg text-[#0F172A]">{item}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="rounded-3xl border border-[#2563EB]/20 bg-[#2563EB]/5 p-8">
						<div className="mb-6 flex items-center gap-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB]/20">
								<FileText className="h-6 w-6 text-[#2563EB]" />
							</div>
							<h3 className="text-2xl font-bold text-[#0F172A]">Employer Compliance</h3>
						</div>

						<ul className="space-y-4">
							{employerModelPoints.map((item) => (
								<li key={item} className="flex items-start gap-3">
									<CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#2563EB]" />
									<span className="text-[#0F172A]">{item}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}

function BvocEnquiry() {
	return (
		<section className="px-8 pb-20 pt-2">
			<div className="mx-auto w-full max-w-6xl">
				<div className="flex flex-col items-center justify-between gap-10 rounded-3xl bg-gradient-to-r from-[#2d52b4] to-[#4083ff] p-8 shadow-lg md:flex-row md:p-12">
					<div className="flex-1">
						<h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">Start Your Journey Today</h2>
						<p className="mb-8 text-lg text-blue-100">Join thousands who transformed their careers through NATS.</p>

						<div className="flex flex-wrap gap-4">
							<button className="flex items-center gap-2 rounded-full bg-[#f97316] px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#ea580c]">
								<GraduationCap className="h-5 w-5" />
								Join Now
								<ArrowRight className="h-5 w-5" />
							</button>

							<button className="flex items-center gap-2 rounded-full border border-white/40 bg-transparent px-6 py-3 font-medium text-white transition-colors hover:bg-white/10">
								<Building2 className="h-5 w-5 text-blue-100" />
								For Employers
							</button>
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

export default function BvocPage() {
	return (
		<div className="min-h-screen bg-white text-slate-800">
			<Navbar />
			<main>
				<BvocHero />
				<BvocBenefits />
				<BvocProcess />
				<BvocEligibility />
				<BvocEnquiry />
			</main>
			<Footer />
		</div>
	)
}
