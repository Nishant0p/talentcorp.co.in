import { Briefcase, Building2, CheckCircle2, GraduationCap, Handshake, Laptop, Stethoscope, Wrench } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ServiceEnquirySection from '../components/ServiceEnquirySection'
import { getPageAsset, usePageAssets } from '../hooks/usePageAssets'

const keyPoints = [
	'AEDP aligns with NEP and UGC.',
	'Apprenticeship stipend continues through every year.',
	'Classroom learning blends with field experience.',
	'Builds job-ready skills through industry exposure.',
]

const benefits = [
	'Gain real-world experience while completing your degree.',
	'Develop practical skills under skilled mentors.',
	'Build industry connections early in your career.',
	'Stay aligned with employer requirements and current job roles.',
	'Improve employability through hands-on training plus academics.',
]

const industries = [
	{
		icon: Stethoscope,
		title: 'Healthcare',
		description: 'Nursing, medical assisting, and allied healthcare pathways.',
	},
	{
		icon: Laptop,
		title: 'Information Technology',
		description: 'Programming, cybersecurity, and digital operations roles.',
	},
	{
		icon: Wrench,
		title: 'Manufacturing',
		description: 'Welding, machining, and production support functions.',
	},
	{
		icon: Building2,
		title: 'Construction',
		description: 'Carpentry, electrical work, and core trade disciplines.',
	},
]

function AedpHero({ resolveAsset }) {
	const heroAsset = resolveAsset('aedp.hero', '/happy-excited-executive-business-team-600nw-2424450635.jpg.webp', 'AEDP students in practical learning')

	return (
		<section className="relative min-h-[100svh] overflow-hidden bg-[#0F172A] pt-16">
			<div className="absolute inset-0">
				<img src={heroAsset.url} alt={heroAsset.alt} className="h-full w-full object-cover" />
				<div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/80 to-[#0F172A]/70" />
			</div>

			<div className="absolute -left-16 top-20 h-72 w-72 rounded-full bg-[#2563EB]/25 blur-3xl" />
			<div className="absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-[#F97316]/20 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
				<div className="max-w-5xl space-y-6">
					<div className="inline-flex items-center gap-2 rounded-full border border-[#F97316]/30 bg-[#F97316]/20 px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F97316]/30 hover:shadow-lg hover:shadow-[#F97316]/20">
						<GraduationCap className="h-5 w-5 text-[#F97316]" />
						<span className="text-sm font-bold text-[#F97316]">APPRENTICESHIP EMBEDDED DEGREE PROGRAM</span>
					</div>

					<h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
						Earn Your Degree
						<span className="mt-2 block text-[#2563EB]">With Apprenticeship Experience</span>
					</h1>

					<p className="max-w-3xl text-lg leading-relaxed text-white/80 lg:text-xl">
						An apprenticeship embedded degree program combines a traditional academic degree with practical on-the-job training. It helps students build strong theory,
						strong skills, and strong career readiness at the same time.
					</p>

					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
						{keyPoints.map((item) => (
							<div key={item} className="group flex h-full min-h-[144px] items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/35 hover:bg-white/20 hover:shadow-lg hover:shadow-black/20">
								<CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#22C55E] transition-transform duration-300 group-hover:scale-110" />
								<p className="text-sm leading-relaxed text-white/90">{item}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

function AedpOverview() {
	return (
		<section className="relative overflow-hidden bg-white py-20 lg:py-28">
			<div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#2563EB]/5 blur-3xl" />
			<div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#F97316]/5 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="grid gap-12 lg:grid-cols-2">
					<div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/30 hover:shadow-xl">
						<h2 className="text-3xl font-bold text-[#0F172A] lg:text-4xl">What Is an Apprenticeship?</h2>
						<p className="leading-relaxed text-[#475569]">
							An apprenticeship is a training model where students learn directly under skilled professionals. It can include classroom instruction, on-the-job training,
							or a combination of both. Depending on the field, apprenticeship durations are usually between 1 to 3 years.
						</p>
						<div className="rounded-2xl border border-[#2563EB]/20 bg-[#2563EB]/5 p-5 transition-all duration-300 hover:border-[#2563EB]/40 hover:bg-[#2563EB]/10">
							<p className="font-semibold text-[#1E3A8A]">In AEDP, this apprenticeship is integrated into your degree journey from the first year itself.</p>
						</div>
					</div>

					<div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/30 hover:shadow-xl">
						<h2 className="text-3xl font-bold text-[#0F172A] lg:text-4xl">What Is AEDP?</h2>
						<p className="leading-relaxed text-[#475569]">
							An apprenticeship embedded degree program combines academic coursework and practical apprenticeship in one structured model. Students split time between
							learning concepts and applying them in real work settings.
						</p>
						<div className="space-y-3">
							{[
								'Aligned with New Education Policy direction and UGC guidelines.',
								'Improves confidence through practical work from early semesters.',
								'Creates a direct pathway from education to employment.',
							].map((point) => (
								<div key={point} className="group flex items-start gap-3">
									<CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#2563EB] transition-transform duration-300 group-hover:scale-110" />
									<p className="text-[#475569]">{point}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function AedpBenefits() {
	return (
		<section className="relative overflow-hidden bg-[#F8FAFC] py-20 lg:py-28">
			<div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #CBD5E1 1px, transparent 0)', backgroundSize: '36px 36px' }} />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-14 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-4 py-2">
						<Handshake className="h-4 w-4 text-[#2563EB]" />
						<span className="text-sm font-bold text-[#2563EB]">WHY STUDENTS CHOOSE AEDP</span>
					</div>
					<h2 className="text-4xl font-bold text-[#0F172A] lg:text-5xl">Benefits of Apprenticeship Embedded Degree Programs</h2>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					{benefits.map((benefit) => (
						<div key={benefit} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/30 hover:shadow-lg">
							<div className="flex items-start gap-3">
								<Briefcase className="mt-0.5 h-5 w-5 shrink-0 text-[#F97316] transition-transform duration-300 group-hover:scale-110" />
								<p className="leading-relaxed text-[#334155]">{benefit}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

function AedpIndustrySection() {
	return (
		<section className="relative overflow-hidden bg-[#0F172A] py-20 lg:py-28">
			<div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-[#2563EB]/20 blur-3xl" />
			<div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[#F97316]/20 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-14 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
						<span className="text-sm font-bold text-white">INDUSTRY OPPORTUNITIES</span>
					</div>
					<h2 className="text-4xl font-bold text-white lg:text-5xl">Industries Offering AEDP Pathways</h2>
					<p className="mx-auto mt-4 max-w-3xl text-lg text-white/75">
						Apprenticeship embedded degree programs are available across multiple sectors based on specialization and career goals.
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{industries.map((industry, index) => (
						<div key={industry.title} className="group rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#60A5FA]/40 hover:bg-white/15 hover:shadow-lg hover:shadow-[#2563EB]/20" style={{ animationDelay: `${index * 100}ms` }}>
							<div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]/25 transition-all duration-300 group-hover:bg-[#2563EB]/40">
								<industry.icon className="h-6 w-6 text-[#60A5FA]" />
							</div>
							<h3 className="mb-2 text-xl font-bold text-white">{industry.title}</h3>
							<p className="text-sm leading-relaxed text-white/75">{industry.description}</p>
						</div>
					))}
				</div>

				<div className="mt-14 rounded-2xl border border-[#F97316]/30 bg-[#F97316]/10 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-[#F97316]/15 hover:shadow-lg hover:shadow-[#F97316]/20">
					<p className="text-lg font-semibold text-white">AEDP gives you a well-rounded education model designed for better career outcomes.</p>
				</div>
			</div>
		</section>
	)
}

export default function AedpPage() {
	const pageAssets = usePageAssets()
	const resolveAsset = (key, fallbackUrl, fallbackAlt = '') => getPageAsset(pageAssets, key, fallbackUrl, fallbackAlt)

	return (
		<div className="bg-white text-[#0F172A]">
			<Navbar />
			<AedpHero resolveAsset={resolveAsset} />
			<AedpOverview />
			<AedpBenefits />
			<AedpIndustrySection />
			<ServiceEnquirySection serviceName="AEDP" />
			<Footer />
		</div>
	)
}
