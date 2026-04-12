import { BadgeIndianRupee, Building2, CalendarClock, CheckCircle2, Factory, Handshake, ShieldCheck, Users, Wrench } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const benefits = [
	'Offers financial support of Rs. 3500 per month per apprentice.',
	'No statutory applicability under this scheme model.',
	'Apprenticeship quota range: 2.5% to 25%.',
	'Eligible candidates: 10th, 12th, ITI, Diploma, BE, BTech, any graduate, any post graduate.',
	'Scheme period is 12 months.',
	'Improves availability of industry-ready skilled manpower familiar with company culture.',
	'Reduces recruitment and hiring process expenditure.',
	'Apprentices cannot participate in union activities during apprenticeship period.',
	'Apprenticeship stipend and related apprentice expenses can be booked under CSR as per policy.',
]

const sectors = [
	{
		icon: Factory,
		title: 'Manufacturing',
		description: 'Production units and plant operations can engage apprentices across roles.',
	},
	{
		icon: Building2,
		title: 'Service Sector',
		description: 'Service-led businesses can train youth while building talent pipelines.',
	},
	{
		icon: Wrench,
		title: 'Repair Sector',
		description: 'Technical repair and maintenance units can onboard and train apprentices.',
	},
]

function MapsHero() {
	return (
		<section className="relative overflow-hidden bg-[#0F172A] pt-24">
			<div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#172554] to-[#1E3A8A]" />
			<div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-[#2563EB]/25 blur-3xl" />
			<div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#F97316]/20 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
				<div className="grid items-center gap-12 lg:grid-cols-2">
					<div className="space-y-8">
						<div className="inline-flex items-center gap-2 rounded-full border border-[#F97316]/30 bg-[#F97316]/20 px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F97316]/30 hover:shadow-lg hover:shadow-[#F97316]/20">
							<ShieldCheck className="h-5 w-5 text-[#F97316]" />
							<span className="text-sm font-bold text-[#F97316]">MAHARASHTRA APPRENTICESHIP PROMOTION SCHEME</span>
						</div>

						<h1 className="hero-text-reveal text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
							MAPS Scheme
							<span className="mt-2 block text-[#60A5FA]">Build Skilled Workforce Faster</span>
						</h1>

						<p className="hero-text-reveal-delay text-lg leading-relaxed text-white/80 lg:text-xl">
							The Apprenticeship Promotion Scheme was launched by the Government of Maharashtra on 03 June 2021 to promote apprenticeships and create strong skill
							development opportunities for students and unemployed youth.
						</p>

						<div className="grid gap-4 sm:grid-cols-2">
							{[
								'Existing EPP scheme has been converted into MAPS scheme.',
								'MAPS portal rollout is expected this month.',
								'Financial assistance available for establishments engaging apprentices.',
								'Training cost reimbursement includes apprentice stipend support.',
							].map((point) => (
								<div key={point} className="group flex items-start gap-3 rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/35 hover:bg-white/20 hover:shadow-lg hover:shadow-black/20">
									<CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#22C55E] transition-transform duration-300 group-hover:scale-110" />
									<p className="text-sm text-white/90">{point}</p>
								</div>
							))}
						</div>
					</div>

					<div className="group mx-auto w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#60A5FA]/40 hover:bg-white/15 hover:shadow-2xl hover:shadow-[#2563EB]/20">
						<img
							src="https://images.prismic.io/tspl/d578a606-9734-47db-a73f-965d0ceab1c0_Seal_of_Maharashtra.svg.png?auto=compress,format&w=640"
							alt="Seal of Maharashtra"
							className="mx-auto h-52 w-52 object-contain transition-transform duration-500 group-hover:scale-105"
						/>
						<div className="mt-6 rounded-2xl border border-[#60A5FA]/30 bg-[#1D4ED8]/20 p-5 text-center transition-all duration-300 group-hover:bg-[#1D4ED8]/30">
							<p className="text-lg font-bold text-white">Government of Maharashtra Initiative</p>
							<p className="mt-1 text-sm text-white/75">Focused on employability and practical skilling through apprenticeship.</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function MapsProgramDetails() {
	return (
		<section className="relative overflow-hidden bg-white py-20 lg:py-28">
			<div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#2563EB]/5 blur-3xl" />
			<div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#F97316]/5 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-14 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-4 py-2">
						<CalendarClock className="h-4 w-4 text-[#2563EB]" />
						<span className="text-sm font-bold text-[#2563EB]">SCHEME STRUCTURE</span>
					</div>
					<h2 className="text-4xl font-bold text-[#0F172A] lg:text-5xl">How MAPS Supports Employers and Youth</h2>
				</div>

				<div className="grid gap-8 lg:grid-cols-3">
					<div className="group rounded-3xl border border-slate-200 bg-slate-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#F97316]/30 hover:shadow-xl">
						<BadgeIndianRupee className="mb-4 h-9 w-9 text-[#F97316]" />
						<h3 className="mb-2 text-2xl font-bold text-[#0F172A]">Financial Incentive</h3>
						<p className="leading-relaxed text-[#475569]">The scheme reimburses training costs and supports stipend structure to encourage wider apprenticeship adoption.</p>
					</div>

					<div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/30 hover:shadow-xl">
						<Users className="mb-4 h-9 w-9 text-[#2563EB]" />
						<h3 className="mb-2 text-2xl font-bold text-[#0F172A]">Youth Skill Development</h3>
						<p className="leading-relaxed text-[#475569]">Students and unemployed youth gain practical exposure and improve employability through structured apprenticeship training.</p>
					</div>

					<div className="group rounded-3xl border border-slate-200 bg-slate-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#22C55E]/30 hover:shadow-xl">
						<Handshake className="mb-4 h-9 w-9 text-[#22C55E]" />
						<h3 className="mb-2 text-2xl font-bold text-[#0F172A]">Industry Alignment</h3>
						<p className="leading-relaxed text-[#475569]">Apprenticeship roles are designed around real workplace needs so organizations can develop role-ready talent internally.</p>
					</div>
				</div>

				<div className="mt-8 grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 lg:grid-cols-3">
					{sectors.map((sector) => (
						<div key={sector.title} className="group rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/30 hover:bg-white hover:shadow-md">
							<div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563EB]/10">
								<sector.icon className="h-5 w-5 text-[#2563EB] transition-transform duration-300 group-hover:scale-110" />
							</div>
							<h4 className="mb-1 text-lg font-bold text-[#0F172A]">{sector.title}</h4>
							<p className="text-sm text-[#64748B]">{sector.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

function MapsBenefits() {
	return (
		<section className="relative overflow-hidden bg-[#F8FAFC] py-20 lg:py-28">
			<div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #94A3B8 1px, transparent 0)', backgroundSize: '34px 34px' }} />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-14 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F97316]/20 bg-[#F97316]/10 px-4 py-2">
						<span className="text-sm font-bold text-[#F97316]">BENEFITS OF MAPS</span>
					</div>
					<h2 className="text-4xl font-bold text-[#0F172A] lg:text-5xl">Key Benefits for Employers</h2>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					{benefits.map((item) => (
						<div key={item} className="group rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2563EB]/30 hover:shadow-md">
							<div className="flex items-start gap-3">
								<CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#2563EB] transition-transform duration-300 group-hover:scale-110" />
								<p className="text-[#334155]">{item}</p>
							</div>
						</div>
					))}
				</div>

				<div className="mt-10 rounded-2xl border border-[#2563EB]/20 bg-[#2563EB]/5 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-[#2563EB]/10 hover:shadow-lg hover:shadow-[#2563EB]/10">
					<p className="text-lg font-semibold text-[#1E3A8A]">MAPS helps organizations scale apprenticeships while building a future-ready workforce in Maharashtra.</p>
				</div>
			</div>
		</section>
	)
}

export default function MapsPage() {
	return (
		<div className="bg-white text-[#0F172A]">
			<Navbar />
			<MapsHero />
			<MapsProgramDetails />
			<MapsBenefits />
			<Footer />
		</div>
	)
}
