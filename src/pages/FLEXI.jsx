import {
	ArrowRight,
	Award,
	Briefcase,
	Building2,
	Calendar,
	CheckCircle2,
	Clock,
	FileText,
	GraduationCap,
	MapPin,
	Mail,
	Phone,
	Play,
	TrendingUp,
	Users,
	Wallet,
	User,
	UserCheck,
	XCircle,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const benefits = [
	{
		icon: Clock,
		title: 'Study Anytime',
		description: 'Morning, evening, or weekend classes. You choose when to learn.',
		color: '#2563EB',
	},
	{
		icon: Wallet,
		title: 'Low Cost',
		description: 'Affordable fees with easy payment options. Government subsidies available.',
		color: '#22C55E',
	},
	{
		icon: Award,
		title: 'Real Certificate',
		description: 'Get NCVT/SCVT certificate recognized by all companies in India.',
		color: '#F97316',
	},
	{
		icon: Briefcase,
		title: 'Better Jobs',
		description: 'ITI certificate holders get 2-3x higher salary than unskilled workers.',
		color: '#8B5CF6',
	},
	{
		icon: Users,
		title: 'Learn From Experts',
		description: 'Trained teachers with real industry experience guide you.',
		color: '#EC4899',
	},
	{
		icon: TrendingUp,
		title: 'Career Growth',
		description: 'Start as helper, become supervisor, then manager with more training.',
		color: '#14B8A6',
	},
]

const eligibleItems = [
	'Passed 8th class or higher',
	'Age 14 years or above',
	'Indian citizen',
	'Working or not working - both can apply',
	'Want to learn a new skill',
]

const notEligibleItems = ['Below 8th class (for some trades)', 'Age below 14 years', 'Already doing full-time college']

const documents = [
	{ icon: FileText, name: 'Aadhar Card', desc: 'Original + 2 copies' },
	{ icon: GraduationCap, name: 'Marksheet', desc: '8th/10th/12th pass certificate' },
	{ icon: User, name: 'Photos', desc: '4 passport size photos' },
	{ icon: Calendar, name: 'Birth Certificate', desc: 'For age proof' },
]

const trades = ['Electrician', 'Fitter', 'Welder', 'Plumber', 'Computer Operator', 'AC Mechanic', 'Motor Mechanic', 'Carpenter', 'Turner', 'Wireman', 'Other']

const steps = [
	{
		number: '01',
		icon: FileText,
		title: 'Fill Simple Form',
		description: 'Give your name, phone number, and which skill you want to learn. Takes only 5 minutes.',
		color: '#2563EB',
	},
	{
		number: '02',
		icon: UserCheck,
		title: 'Get Verified',
		description: 'Our team will call you to verify your documents. We help if you need any document.',
		color: '#F97316',
	},
	{
		number: '03',
		icon: GraduationCap,
		title: 'Start Learning',
		description: 'Join classes at your nearest center. Learn from expert teachers with hands-on practice.',
		color: '#22C55E',
	},
	{
		number: '04',
		icon: Briefcase,
		title: 'Get Job',
		description: 'After passing exam, get your certificate and we help you find a good job.',
		color: '#8B5CF6',
	},
]

function FlexiItiHero() {
	return (
		<section className="relative min-h-[90vh] overflow-hidden bg-[#0F172A] pt-24">
			<div className="absolute inset-0">
				<img src="/happy-excited-executive-business-team-600nw-2424450635.jpg.webp" alt="FLEXI ITI training" className="h-full w-full object-cover" />
				<div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/80 to-[#0F172A]/60" />
			</div>

			<div className="absolute right-20 top-20 h-72 w-72 rounded-full bg-[#2563EB]/20 blur-3xl" />
			<div className="absolute bottom-20 left-20 h-96 w-96 rounded-full bg-[#F97316]/10 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-32">
				<div className="grid items-center gap-12 lg:grid-cols-2">
					<div className="space-y-8">
						<div className="inline-flex items-center gap-2 rounded-full border border-[#F97316]/30 bg-[#F97316]/20 px-4 py-2">
							<span className="h-2 w-2 animate-pulse rounded-full bg-[#F97316]" />
							<span className="text-sm font-bold text-[#F97316]">Government Recognized Program</span>
						</div>

						<h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
							Learn Skills
							<span className="mt-2 block text-[#2563EB]">At Your Own Pace</span>
							<span className="mt-2 block">With FLEXI ITI</span>
						</h1>

						<p className="max-w-xl text-lg leading-relaxed text-white/80 lg:text-xl">
							FLEXI ITI lets you learn job skills while working. Study when you have time. Get a real certificate. Build a better future for yourself and your family.
						</p>

						<div className="flex flex-wrap gap-4">
							{['Learn While Working', 'Government Certificate', 'Better Jobs'].map((item) => (
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
								Apply Now - It's Free
								<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
							</a>
							<button className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-white/60 hover:bg-white/10">
								<Play className="h-5 w-5" />
								Watch Video
							</button>
						</div>

						<div className="flex items-center gap-8 border-t border-white/10 pt-6">
							<div className="text-center">
								<p className="text-3xl font-bold text-white">50,000+</p>
								<p className="text-sm text-white/60">Students Trained</p>
							</div>
							<div className="h-12 w-px bg-white/20" />
							<div className="text-center">
								<p className="text-3xl font-bold text-[#2563EB]">100+</p>
								<p className="text-sm text-white/60">ITI Centers</p>
							</div>
							<div className="h-12 w-px bg-white/20" />
							<div className="text-center">
								<p className="text-3xl font-bold text-[#F97316]">95%</p>
								<p className="text-sm text-white/60">Job Placement</p>
							</div>
						</div>
					</div>

					<div className="hidden lg:block">
						<div className="relative rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
							<div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#F97316]/30 blur-2xl" />
							<h3 className="mb-6 text-2xl font-bold text-white">What is FLEXI ITI?</h3>
							<div className="space-y-4">
								{[
									{ icon: '🎯', title: 'Flexible Timing', desc: 'Study in morning, evening, or weekends' },
									{ icon: '📚', title: 'Practical Training', desc: 'Learn by doing real work with your hands' },
									{ icon: '📜', title: 'Valid Certificate', desc: 'Get government approved ITI certificate' },
									{ icon: '💼', title: 'Job Support', desc: 'We help you find good jobs after training' },
								].map((item) => (
									<div key={item.title} className="flex items-start gap-4 rounded-xl bg-white/5 p-4 transition-colors hover:bg-white/10">
										<span className="text-2xl">{item.icon}</span>
										<div>
											<h4 className="font-bold text-white">{item.title}</h4>
											<p className="text-sm text-white/70">{item.desc}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
				<div className="flex h-12 w-8 items-start justify-center rounded-full border-2 border-white/30 p-2">
					<div className="h-3 w-1.5 rounded-full bg-white/60" />
				</div>
			</div>
		</section>
	)
}

function FlexiItiBenefits() {
	return (
		<section className="relative overflow-hidden py-20 lg:py-28">
			<div className="absolute inset-0 bg-gradient-to-b from-white via-[#F8FAFC] to-white" />
			<div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#2563EB]/5 blur-3xl" />
			<div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#F97316]/5 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-4 py-2">
						<span className="text-sm font-bold text-[#2563EB]">WHY CHOOSE FLEXI ITI?</span>
					</div>
					<h2 className="mb-4 text-4xl font-bold text-[#0F172A] lg:text-5xl">Benefits That Change Your Life</h2>
					<p className="mx-auto max-w-2xl text-lg text-[#64748B]">
						FLEXI ITI is designed for people like you who want to learn skills but have work or family responsibilities.
					</p>
				</div>

				<div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{benefits.map((benefit, index) => (
						<div key={benefit.title} className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/30 hover:shadow-xl" style={{ animationDelay: `${index * 100}ms` }}>
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
						<h3 className="mb-4 text-2xl font-bold text-white lg:text-3xl">See the Difference ITI Makes</h3>
						<p className="mb-6 text-white/70">Compare your earning potential with and without ITI certification.</p>

						<div className="space-y-6">
							<div>
								<div className="mb-2 flex justify-between gap-4">
									<span className="font-medium text-white">Without ITI</span>
									<span className="text-white/60">₹8,000 - ₹12,000/month</span>
								</div>
								<div className="h-4 overflow-hidden rounded-full bg-white/10">
									<div className="h-full w-[35%] rounded-full bg-[#64748B]" />
								</div>
							</div>

							<div>
								<div className="mb-2 flex justify-between gap-4">
									<span className="font-medium text-white">With FLEXI ITI</span>
									<span className="font-bold text-[#22C55E]">₹18,000 - ₹35,000/month</span>
								</div>
								<div className="h-4 overflow-hidden rounded-full bg-white/10">
									<div className="h-full w-[85%] rounded-full bg-gradient-to-r from-[#22C55E] to-[#4ADE80]" />
								</div>
							</div>
						</div>

						<p className="mt-6 text-lg font-bold text-[#F97316]">Earn 2-3x more with ITI skills!</p>
					</div>

					<div className="relative h-64 overflow-hidden rounded-2xl lg:h-80">
						<img src="/Gemini_Generated_Image_qskougqskougqsko.png" alt="Students celebrating success" className="h-full w-full object-cover" />
						<div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent" />
					</div>
				</div>
			</div>
		</section>
	)
}

function FlexiItiEligibility() {
	return (
		<section className="relative overflow-hidden py-20 lg:py-28">
			<div className="absolute inset-0 bg-white" />
			<div className="absolute left-0 top-0 h-full w-full bg-gradient-to-br from-[#2563EB]/5 via-transparent to-[#F97316]/5" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#22C55E]/20 bg-[#22C55E]/10 px-4 py-2">
						<span className="text-sm font-bold text-[#22C55E]">WHO CAN JOIN?</span>
					</div>
					<h2 className="mb-4 text-4xl font-bold text-[#0F172A] lg:text-5xl">Check If You Are Eligible</h2>
					<p className="mx-auto max-w-2xl text-lg text-[#64748B]">FLEXI ITI is open for everyone who wants to learn. Check the simple requirements below.</p>
				</div>

				<div className="mb-16 grid gap-8 lg:grid-cols-2">
					<div className="rounded-3xl border border-[#22C55E]/20 bg-[#22C55E]/5 p-8">
						<div className="mb-6 flex items-center gap-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#22C55E]/20">
								<CheckCircle2 className="h-6 w-6 text-[#22C55E]" />
							</div>
							<h3 className="text-2xl font-bold text-[#0F172A]">You Can Join If...</h3>
						</div>

						<ul className="space-y-4">
							{eligibleItems.map((item) => (
								<li key={item} className="flex items-start gap-3">
									<CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#22C55E]" />
									<span className="text-lg text-[#0F172A]">{item}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="rounded-3xl border border-[#EF4444]/20 bg-[#EF4444]/5 p-8">
						<div className="mb-6 flex items-center gap-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EF4444]/20">
								<XCircle className="h-6 w-6 text-[#EF4444]" />
							</div>
							<h3 className="text-2xl font-bold text-[#0F172A]">Cannot Join If...</h3>
						</div>

						<ul className="space-y-4">
							{notEligibleItems.map((item) => (
								<li key={item} className="flex items-start gap-3">
									<XCircle className="mt-0.5 h-6 w-6 shrink-0 text-[#EF4444]" />
									<span className="text-lg text-[#0F172A]">{item}</span>
								</li>
							))}
						</ul>

						<div className="mt-6 rounded-xl border border-[#F97316]/30 bg-white p-4">
							<p className="text-sm text-[#64748B]">
								<span className="font-bold text-[#F97316]">Note:</span> If you are below 8th pass, some trades like Electrician still accept you. Contact us to know more.
							</p>
						</div>
					</div>
				</div>

				<div className="rounded-3xl bg-[#0F172A] p-8 lg:p-12">
					<h3 className="mb-8 text-center text-2xl font-bold text-white lg:text-3xl">Documents You Need</h3>
					<p className="mx-auto mb-10 max-w-2xl text-center text-white/70">Keep these documents ready before applying. We will help you if any document is missing.</p>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{documents.map((doc) => (
							<div key={doc.name} className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm transition-colors hover:bg-white/15">
								<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#2563EB]/20">
									<doc.icon className="h-7 w-7 text-[#2563EB]" />
								</div>
								<h4 className="mb-1 text-lg font-bold text-white">{doc.name}</h4>
								<p className="text-sm text-white/60">{doc.desc}</p>
							</div>
						))}
					</div>

					<div className="mt-10 text-center">
						<p className="mb-4 text-white/70">Don't have all documents? No problem!</p>
						<a href="#enquiry" className="inline-flex items-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 font-bold text-white transition-colors hover:bg-[#EA580C]">
							Talk to Our Team
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}

function FlexiItiProcess() {
	return (
		<section className="relative overflow-hidden bg-[#F8FAFC] py-20 lg:py-28">
			<div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #2563EB 1px, transparent 0)', backgroundSize: '40px 40px' }} />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F97316]/20 bg-[#F97316]/10 px-4 py-2">
						<span className="text-sm font-bold text-[#F97316]">SIMPLE PROCESS</span>
					</div>
					<h2 className="mb-4 text-4xl font-bold text-[#0F172A] lg:text-5xl">4 Easy Steps to Start</h2>
					<p className="mx-auto max-w-2xl text-lg text-[#64748B]">Joining FLEXI ITI is very easy. Follow these simple steps and start learning today.</p>
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
									<div className="absolute top-1/2 -right-4 hidden -translate-y-1/2 lg:block">
										<ArrowRight className="h-8 w-8 text-[#2563EB]" />
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div className="mt-20">
					<h3 className="mb-8 text-center text-2xl font-bold text-[#0F172A]">Popular Trades You Can Learn</h3>
					<div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
						{[
							{ name: 'Electrician', icon: '⚡' },
							{ name: 'Fitter', icon: '🔧' },
							{ name: 'Welder', icon: '🔥' },
							{ name: 'Plumber', icon: '🚿' },
							{ name: 'Computer', icon: '💻' },
							{ name: 'AC Mechanic', icon: '❄️' },
							{ name: 'Motor Mechanic', icon: '🚗' },
							{ name: 'Carpenter', icon: '🪚' },
							{ name: 'Painter', icon: '🎨' },
							{ name: 'Turner', icon: '⚙️' },
							{ name: 'Machinist', icon: '🏭' },
							{ name: 'Wireman', icon: '🔌' },
						].map((trade) => (
							<div key={trade.name} className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/40 hover:shadow-md">
								<span className="mb-2 text-3xl transition-transform group-hover:scale-125">{trade.icon}</span>
								<span className="text-center text-sm font-medium text-[#0F172A]">{trade.name}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

function FlexiItiEnquiry() {
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

export default function FlexiItiPage() {
	return (
		<div className="min-h-screen bg-white text-slate-800">
			<Navbar />
			<main>
				<FlexiItiHero />
				<FlexiItiBenefits />
				<FlexiItiProcess />
				<FlexiItiEligibility />
				<FlexiItiEnquiry />
			</main>
			<Footer />
		</div>
	)
}
