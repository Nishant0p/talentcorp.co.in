import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RozgaarPreloader from '../components/RozgaarPreloader'
import { rojgarYatraImages } from '../data/rojgarYatraImages'

const participatingStates = [
	'Andhra Pradesh',
	'Arunachal Pradesh',
	'Assam',
	'Bihar',
	'Chhattisgarh',
	'Goa',
	'Gujarat',
	'Haryana',
	'Himachal Pradesh',
	'Jharkhand',
	'Karnataka',
	'Kerala',
	'Madhya Pradesh',
	'Maharashtra',
	'Manipur',
	'Meghalaya',
	'Mizoram',
	'Nagaland',
	'Odisha',
	'Punjab',
	'Rajasthan',
	'Sikkim',
	'Tamil Nadu',
	'Telangana',
	'Tripura',
	'Uttar Pradesh',
	'Uttarakhand',
	'West Bengal',
]

const galleryTriples = []
for (let index = 0; index < rojgarYatraImages.length; index += 3) {
	galleryTriples.push(rojgarYatraImages.slice(index, index + 3))
}

const faqItems = [
	{
		question: 'What is Rojgar Yatra?',
		answer:
			'Rojgar Yatra is an employment and workforce development initiative that connects job seekers with career opportunities across India through recruitment drives, job fairs, campus placements, and awareness campaigns.',
	},
	{
		question: 'Who can benefit from Rojgar Yatra?',
		answer:
			'Youth, freshers, skilled workers, and blue-collar candidates can benefit. We also support companies and industries by connecting them with reliable manpower.',
	},
	{
		question: 'How does Rojgar Yatra work on ground?',
		answer:
			'Rojgar Yatra operates through 4 branded outreach vehicles that travel across rural and urban locations, run awareness campaigns, share vacancy information, and support direct candidate registration.',
	},
	{
		question: 'What activities are conducted during outreach?',
		answer:
			'Speaker announcements, wall posters and A3 banners, pocket banner distribution, direct candidate interaction, and QR-based digital registration support.',
	},
	{
		question: 'Which regions are covered?',
		answer:
			'We actively connect candidates in multiple states including Maharashtra, Madhya Pradesh, Uttar Pradesh, Odisha, West Bengal, Chhattisgarh, Bihar, Jharkhand, Andhra Pradesh, and Assam, while continuously expanding to more regions.',
	},
	{
		question: 'Why choose Rojgar Yatra?',
		answer:
			'We provide genuine opportunities, trusted industry connections, a fast hiring process, dedicated placement support, and strong rural as well as urban employment reach.',
	},
]

export default function YatraPage() {
	const [loading, setLoading] = useState(true)
	const [selectedImage, setSelectedImage] = useState('')
	const [loadedImages, setLoadedImages] = useState({})
	const [openFaqIndex, setOpenFaqIndex] = useState(0)

	useEffect(() => {
		// Fallback hide only if callback fails; keep long enough for full GSAP sequence.
		const t = setTimeout(() => setLoading(false), 7000)
		return () => clearTimeout(t)
	}, [])

	useEffect(() => {
		if (!selectedImage) return undefined

		const onEsc = (e) => {
			if (e.key === 'Escape') {
				setSelectedImage('')
			}
		}

		window.addEventListener('keydown', onEsc)
		return () => window.removeEventListener('keydown', onEsc)
	}, [selectedImage])

	const markImageLoaded = (src) => {
		setLoadedImages((current) => {
			if (current[src]) return current
			return { ...current, [src]: true }
		})
	}

	return (
		<div className="bg-white text-slate-800">
			<Navbar />
			{loading && <RozgaarPreloader onFinish={() => setLoading(false)} />}

			<main className="min-h-screen">
				<section className="mx-auto flex min-h-[100svh] max-w-7xl items-center px-6 py-16 lg:py-20">
					<div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
						<div>
							<h1 className="text-5xl font-extrabold leading-tight text-blue-900 sm:text-6xl">
								ROZGAAR <span className="text-orange-600">YATRA</span>
							</h1>
							<div className="my-5 h-2 w-32 bg-orange-500"></div>
							<p className="max-w-3xl text-lg text-gray-700">
								Connecting multiple states, bringing job opportunities directly to the youth.
								 Your journey toward a career starts here.
							</p>
							<div className="mt-6 flex flex-wrap gap-3">
								{participatingStates.map((state) => (
									<span key={state} className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-800">
										{state}
									</span>
								))}
							</div>
						</div>

						<div className="relative flex justify-center lg:justify-end">
							<div
								aria-hidden="true"
								className="pointer-events-none absolute -right-6 -top-10 h-[360px] w-[360px] rounded-full opacity-90 sm:h-[420px] sm:w-[420px] lg:h-[500px] lg:w-[500px]"
								style={{
									backgroundImage:
										'radial-gradient(circle, rgba(249,115,22,0.35) 1.6px, transparent 1.6px), radial-gradient(circle, rgba(37,99,235,0.3) 1.4px, transparent 1.4px)',
									backgroundSize: '22px 22px, 18px 18px',
									backgroundPosition: '0 0, 9px 9px',
									filter: 'blur(0.2px)',
								}}
							/>
							<div className="relative z-10 w-full max-w-[980px] overflow-hidden">
								<img
									src="/rojgaaar yatra car 2.png"
									alt="Rozgaar Yatra vehicle"
									className="w-[108%] max-w-none object-contain object-right"
									style={{ transform: 'translateX(-4%)' }}
								/>
							</div>
						</div>
					</div>
				</section>

				<section className="relative flex h-[100svh] flex-col justify-center overflow-hidden bg-slate-950 py-8">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.22),transparent_45%)]" />
					<div className="relative mb-5">
						<h2 className="px-6 text-3xl font-extrabold text-white sm:px-8 sm:text-4xl lg:px-12">Journey Highlights</h2>
						<p className="mt-3 max-w-3xl px-6 text-slate-300 sm:px-8 lg:px-12">
							Explore interactive moments from Rozgaar Yatra across regions.
						</p>
					</div>

					<div className="relative px-6 sm:px-8 lg:px-12">
						<div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/45 p-2 shadow-[0_30px_80px_rgba(2,6,23,0.45)] sm:p-3">
							<motion.div
								className="flex w-max gap-3"
								animate={{ x: ['0%', '-50%'] }}
								transition={{ duration: 320, ease: 'linear', repeat: Infinity }}
							>
								{[...galleryTriples, ...galleryTriples].map((triple, index) => {
									const primary = triple[0]
									const secondaryA = triple[1] ?? triple[0]
									const secondaryB = triple[2] ?? triple[1] ?? triple[0]

									return (
										<div key={`triple-${index}`} className="flex shrink-0 items-stretch gap-2 rounded-[20px] border border-white/10 bg-slate-950/70 p-2">
											<button
												type="button"
												className="block w-[180px] shrink-0 overflow-hidden rounded-[16px] border border-white/10 bg-slate-900/80"
												onClick={() => setSelectedImage(primary)}
											>
												<img
													src={primary}
													alt="Rozgar Yatra highlight"
													className={`h-full w-full aspect-[9/16] object-cover transition duration-700 hover:scale-[1.03] ${loadedImages[primary] ? 'opacity-100 blur-0' : 'opacity-60 blur-md scale-[1.04]'}`}
													loading="lazy"
													decoding="async"
													onLoad={() => markImageLoaded(primary)}
												/>
											</button>

											<div className="flex w-[140px] shrink-0 flex-col gap-2">
												<button
													type="button"
													className="block h-1/2 overflow-hidden rounded-[14px] border border-white/10 bg-slate-900/80"
													onClick={() => setSelectedImage(secondaryA)}
												>
													<img
														src={secondaryA}
														alt="Rozgar Yatra moment"
														className={`h-full w-full aspect-[4/3] object-cover transition duration-700 hover:scale-[1.04] ${loadedImages[secondaryA] ? 'opacity-100 blur-0' : 'opacity-60 blur-md scale-[1.03]'}`}
														loading="lazy"
														decoding="async"
														onLoad={() => markImageLoaded(secondaryA)}
													/>
												</button>
												<button
													type="button"
													className="block h-1/2 overflow-hidden rounded-[14px] border border-white/10 bg-slate-900/80"
													onClick={() => setSelectedImage(secondaryB)}
												>
													<img
														src={secondaryB}
														alt="Rozgar Yatra moment"
														className={`h-full w-full aspect-[4/3] object-cover transition duration-700 hover:scale-[1.04] ${loadedImages[secondaryB] ? 'opacity-100 blur-0' : 'opacity-60 blur-md scale-[1.03]'}`}
														loading="lazy"
														decoding="async"
														onLoad={() => markImageLoaded(secondaryB)}
													/>
												</button>
											</div>
										</div>
									)
								})}
							</motion.div>
						</div>
					</div>
				</section>

				<section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
					<div className="grid gap-6 lg:grid-cols-12">
						<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">Employment Movement</p>
							<h2 className="mt-2 text-3xl font-extrabold text-blue-900 sm:text-4xl">What Is Rojgar Yatra?</h2>
							<p className="mt-4 text-slate-700">
								Rojgar Yatra is an employment and workforce development initiative focused on connecting job seekers with the right career opportunities across India. We bridge the gap between industries and skilled manpower through recruitment drives, job fairs, campus placements, and awareness campaigns.
							</p>
							<p className="mt-3 text-slate-700">
								We work with companies, industries, training institutes, and communities to provide opportunities for youth, freshers, skilled workers, and blue-collar candidates.
							</p>
						</div>

						<div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm sm:p-8 lg:col-span-5">
							<h3 className="text-xl font-bold text-blue-900">Our Vision</h3>
							<p className="mt-3 text-slate-700">
								To become India&apos;s most trusted employment movement by empowering youth with job opportunities, skill awareness, and career guidance across every state and district.
							</p>
							<h3 className="mt-6 text-xl font-bold text-blue-900">Our Goal</h3>
							<p className="mt-3 text-slate-700">
								Build a strong employment ecosystem where deserving candidates get better futures and industries receive reliable manpower.
							</p>
						</div>

						<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-6">
							<h3 className="text-2xl font-extrabold text-slate-900">Our Mission</h3>
							<ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
								<li>Provide genuine and transparent job opportunities.</li>
								<li>Reduce unemployment among youth and skilled workers.</li>
								<li>Connect industries with the right manpower.</li>
								<li>Conduct employment drives in rural and urban areas.</li>
								<li>Create awareness about career growth and industrial opportunities.</li>
								<li>Support candidates with guidance and placement assistance.</li>
							</ul>
						</div>

						<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-6">
							<h3 className="text-2xl font-extrabold text-slate-900">What We Do</h3>
							<ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
								<li>Large-scale employment drives across industries.</li>
								<li>Campus recruitment with colleges, ITIs, diploma institutes, and training centers.</li>
								<li>Job awareness campaigns for opportunities and career options.</li>
								<li>Skill and career guidance based on industry demand.</li>
								<li>Industrial hiring support for manufacturing, automotive, logistics, and production.</li>
								<li>Rural outreach for villages and small towns.</li>
							</ul>
						</div>

						<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
							<h3 className="text-2xl font-extrabold text-blue-900">How Rojgar Yatra Works</h3>
							<p className="mt-3 text-slate-700">
								To expand employment opportunities across India, Rojgar Yatra operates through a dedicated outreach team with 4 branded vehicles covering rural and urban areas.
							</p>
							<p className="mt-3 text-slate-700">
								Each vehicle carries Rojgar Yatra branding, contact details, job information, and QR code based Google Form registration.
							</p>
							<div className="mt-5 grid gap-3 sm:grid-cols-2">
								<div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">Speaker Announcements</div>
								<div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">Wall Posters and A3 Banners</div>
								<div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">Pocket Banner Distribution</div>
								<div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">QR Registration Support</div>
							</div>
						</div>

						<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-5">
							<h3 className="text-2xl font-extrabold text-slate-900">Presence and Team</h3>
							<ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
								<li>Active in villages, towns, industrial areas, urban cities, and institutes.</li>
								<li>4 dedicated outreach vehicles.</li>
								<li>Ground marketing teams and recruitment coordinators.</li>
								<li>Candidate support and digital registration support.</li>
							</ul>
						</div>

						<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-8">
							<h3 className="text-2xl font-extrabold text-blue-900">Frequently Asked Questions</h3>
							<div className="mt-4 space-y-3">
								{faqItems.map((faq, index) => {
									const isOpen = openFaqIndex === index
									return (
										<div key={faq.question} className="overflow-hidden rounded-2xl border border-slate-200">
											<button
												type="button"
												className="flex w-full items-center justify-between bg-slate-50 px-4 py-3 text-left"
												onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
											>
												<span className="font-semibold text-slate-900">{faq.question}</span>
												<span className="ml-3 text-xl leading-none text-blue-700">{isOpen ? '-' : '+'}</span>
											</button>
											{isOpen ? <p className="px-4 py-3 text-slate-700">{faq.answer}</p> : null}
										</div>
									)
								})}
							</div>
						</div>

						<div className="rounded-3xl border border-orange-200 bg-orange-50 p-6 shadow-sm sm:p-8 lg:col-span-4">
							<h4 className="text-xl font-extrabold text-orange-700">Our Commitment</h4>
							<p className="mt-3 text-slate-700">
								Rojgar Yatra is not just a recruitment campaign. It is an employment movement focused on taking genuine opportunities directly to people through outreach, awareness, and industry collaboration.
							</p>
						</div>
					</div>
				</section>
			</main>

			{selectedImage ? (
				<div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/85 px-4 py-8" onClick={() => setSelectedImage('')}>
					<button
						type="button"
						className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xl text-white backdrop-blur"
						onClick={() => setSelectedImage('')}
					>
						x
					</button>
					<img
						src={selectedImage}
						alt="Rojgar Yatra preview"
						className="max-h-full max-w-full rounded-2xl border border-white/20 object-contain shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
						onClick={(e) => e.stopPropagation()}
					/>
				</div>
			) : null}

			<Footer />
		</div>
	)
}
