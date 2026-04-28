import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	ArrowRight,
	Banknote,
	Briefcase,
	Building2,
	Calendar,
	CheckCircle2,
	ChevronLeft,
	ChevronRight,
	Clock,
	Filter,
	Grid3X3,
	Heart,
	List,
	Mail,
	MapPin,
	Phone,
	Search,
	Send,
	Share2,
	TrendingUp,
	Upload,
	User,
	Users,
	X,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProgressiveImage from '../components/ProgressiveImage';
import { extractMediaUrl, fetchJobs, submitLead } from '../utils/strapi';
import { uploadResumeToGoogleDrive } from '../utils/googleSheets';
import { getPageAsset, usePageAssets } from '../hooks/usePageAssets';

const allJobs = [
	{
		id: '1',
		title: 'Welder (TIG & ARC)',
		company: 'TSPL Group',
		image: 'https://picsum.photos/seed/welder-industrial/1200/800',
		category: 'Welding',
		location: 'Maharashtra, India',
		salaryMin: 25000,
		salaryMax: 35000,
		jobType: 'full-time',
		experience: '2-5',
		skills: ['TIG Welding', 'ARC Welding', 'Blueprint Reading', 'Safety'],
		description: 'Experienced welders required for manufacturing operations with strict quality and safety standards.',
		applyBy: 'April 30, 2026',
		urgent: true,
		featured: true,
	},
	{
		id: '2',
		title: 'Electrician',
		company: 'TSPL Group',
		image: 'https://picsum.photos/seed/electrician-panel/1200/800',
		category: 'Electrical',
		location: 'Gujarat, India',
		salaryMin: 20000,
		salaryMax: 30000,
		jobType: 'full-time',
		experience: '1-2',
		skills: ['Wiring', 'Panel Board', 'Motor Repair', 'PLC Basics'],
		description: 'Electricians needed for industrial setup, panel work, and plant maintenance support.',
		applyBy: 'April 25, 2026',
		featured: true,
	},
	{
		id: '3',
		title: 'Production Supervisor',
		company: 'TSPL Group',
		image: 'https://picsum.photos/seed/production-supervisor/1200/800',
		category: 'Supervision',
		location: 'Tamil Nadu, India',
		salaryMin: 35000,
		salaryMax: 50000,
		jobType: 'full-time',
		experience: '5+',
		skills: ['Team Management', 'Production Planning', 'Quality Control'],
		description: 'Lead production teams and ensure output, quality, and process compliance on the shop floor.',
		applyBy: 'May 10, 2026',
	},
	{
		id: '4',
		title: 'CNC Machine Operator',
		company: 'TSPL Group',
		image: 'https://picsum.photos/seed/cnc-operator/1200/800',
		category: 'Machine Operation',
		location: 'Karnataka, India',
		salaryMin: 22000,
		salaryMax: 32000,
		jobType: 'contract',
		experience: '2-5',
		skills: ['Machine Setup', 'CNC Operation', 'Inspection'],
		description: 'Urgent requirement for CNC operators with setup and process-check capabilities.',
		applyBy: 'April 28, 2026',
		urgent: true,
	},
	{
		id: '5',
		title: 'Factory Helper',
		company: 'TSPL Group',
		image: 'https://picsum.photos/seed/factory-helper/1200/800',
		category: 'Helper',
		location: 'Delhi NCR, India',
		salaryMin: 12000,
		salaryMax: 18000,
		jobType: 'full-time',
		experience: 'fresher',
		skills: ['Physical Fitness', 'Teamwork', 'Basic Handling'],
		description: 'Entry-level roles available with on-the-job training and growth opportunities.',
		applyBy: 'May 15, 2026',
	},
	{
		id: '6',
		title: 'Maintenance Technician',
		company: 'TSPL Group',
		image: 'https://picsum.photos/seed/maintenance-tech/1200/800',
		category: 'Maintenance',
		location: 'Maharashtra, India',
		salaryMin: 28000,
		salaryMax: 40000,
		jobType: 'full-time',
		experience: '2-5',
		skills: ['Mechanical', 'Electrical', 'Hydraulics', 'Pneumatics'],
		description: 'Maintain plant equipment and support preventive and corrective maintenance cycles.',
		applyBy: 'May 5, 2026',
	},
];

const parseSalaryText = (salaryText) => {
	const digits = String(salaryText || '').replace(/,/g, '').match(/\d+/g) || [];
	if (digits.length >= 2) {
		return { salaryMin: Number(digits[0]), salaryMax: Number(digits[1]) };
	}
	if (digits.length === 1) {
		const amount = Number(digits[0]);
		return { salaryMin: amount, salaryMax: amount };
	}
	return { salaryMin: 15000, salaryMax: 25000 };
};

const mapApiJobToListing = (job, index, placeholderImages, fallbackImage) => {
	const { salaryMin, salaryMax } = parseSalaryText(job.salary);
	const normalizedType = String(job.type || 'full-time').toLowerCase();
	const category = String(job.category || job.jobCategory || job.type || job.title || 'General').trim();
	const location = String(job.location || 'India').trim();
	const skills = Array.isArray(job.skills) && job.skills.length ? job.skills : ['Teamwork', 'Communication'];
	const uploadedPhotoUrl = extractMediaUrl(job.photo || job.image);
	const imageMedia = job.photo || job.image || null;

	return {
		id: String(job.id),
		title: job.title || `Job ${job.id}`,
		company: job.company || 'TSPL Group',
		image: uploadedPhotoUrl || placeholderImages[index % placeholderImages.length] || fallbackImage,
		imageMedia,
		category,
		location,
		salaryMin,
		salaryMax,
		jobType: normalizedType,
		experience: job.experience || '1-2',
		skills,
		description: job.description || 'Apply now to join TSPL Group.',
		applyBy: job.applyBy || 'Open until filled',
		urgent: Boolean(job.urgent),
		featured: Boolean(job.featured),
	};
};

const jobTypeOptions = [
	{ value: 'welder', label: 'Welder' },
	{ value: 'electrician', label: 'Electrician' },
	{ value: 'helper', label: 'Helper' },
	{ value: 'supervisor', label: 'Supervisor' },
	{ value: 'technician', label: 'Technician' },
	{ value: 'fitter', label: 'Fitter' },
	{ value: 'operator', label: 'Operator' },
	{ value: 'driver', label: 'Driver' },
];

const presetLocationOptions = [
	{ value: 'maharashtra', label: 'Maharashtra' },
	{ value: 'gujarat', label: 'Gujarat' },
	{ value: 'tamil-nadu', label: 'Tamil Nadu' },
	{ value: 'karnataka', label: 'Karnataka' },
	{ value: 'delhi-ncr', label: 'Delhi NCR' },
	{ value: 'overseas', label: 'Overseas' },
];

const normalizeText = (value) => String(value || '').trim().toLowerCase();

const toOptionValue = (value) => normalizeText(value).replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const uniqueOptionsFromJobs = (jobs, key) => {
	const seen = new Map();
	jobs.forEach((job) => {
		const value = String(job[key] || '').trim();
		if (!value) return;
		const normalized = toOptionValue(value);
		if (!normalized || seen.has(normalized)) return;
		seen.set(normalized, { value: normalized, label: value });
	});
	return Array.from(seen.values()).sort((a, b) => a.label.localeCompare(b.label));
};

const salaryOptions = [
	{ value: '', label: 'Any Salary' },
	{ value: '0-15000', label: 'Up to INR 15,000' },
	{ value: '15000-25000', label: 'INR 15,000 - INR 25,000' },
	{ value: '25000-40000', label: 'INR 25,000 - INR 40,000' },
	{ value: '40000+', label: 'INR 40,000+' },
];

const experienceOptions = [
	{ value: '', label: 'Any Experience' },
	{ value: 'fresher', label: 'Fresher' },
	{ value: '1-2', label: '1-2 Years' },
	{ value: '2-5', label: '2-5 Years' },
	{ value: '5+', label: '5+ Years' },
];

function parseSalaryRange(range) {
	if (!range) return null;
	if (range.endsWith('+')) {
		return { min: Number(range.replace('+', '')), max: Number.POSITIVE_INFINITY };
	}
	const [min, max] = range.split('-').map(Number);
	return { min, max };
}

function formatSalary(min, max) {
	return `INR ${min.toLocaleString('en-IN')} - INR ${max.toLocaleString('en-IN')}`;
}

function JobsHero({ searchQuery, onSearchChange, onSearchSubmit }) {
	const words = ['Dream Job', 'New Career', 'Better Future', 'Right Opportunity'];
	const [wordIndex, setWordIndex] = useState(0);
	const [typedText, setTypedText] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const currentWord = words[wordIndex];
		let delay = isDeleting ? 60 : 110;

		if (!isDeleting && typedText === currentWord) {
			delay = 900;
		}

		if (isDeleting && typedText === '') {
			delay = 220;
		}

		const timer = window.setTimeout(() => {
			if (!isDeleting) {
				if (typedText === currentWord) {
					setIsDeleting(true);
				} else {
					setTypedText(currentWord.slice(0, typedText.length + 1));
				}
			} else if (typedText === '') {
				setIsDeleting(false);
				setWordIndex((prev) => (prev + 1) % words.length);
			} else {
				setTypedText(currentWord.slice(0, typedText.length - 1));
			}
		}, delay);

		return () => window.clearTimeout(timer);
	}, [isDeleting, typedText, wordIndex, words]);

	return (
		<section className="relative overflow-hidden bg-white pt-28 pb-14 sm:pt-32 lg:pb-20">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-blue-200/60 blur-3xl" />
				<div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-orange-200/60 blur-3xl" />
				<div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(to right, #3b82f620 1px, transparent 1px), linear-gradient(to bottom, #3b82f620 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
			</div>

			<div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
				<div className="lg:col-span-7">
					<span className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
						<Search className="h-4 w-4" />
						500+ Jobs Available
					</span>
					<h1 className="mt-5 text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
						Find Your
						<br />
						<span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{typedText}</span>
						<span className="ml-1 inline-block h-[0.9em] w-[2px] animate-pulse bg-cyan-500 align-middle" aria-hidden="true" />
					</h1>
					<p className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
						With <span className="text-orange-500">TSPL Group</span>
					</p>
					<p className="mt-5 max-w-2xl text-lg text-slate-600">
						Join 10,000+ workers who found their perfect job through us. From factory floors to overseas opportunities - your career awaits!
					</p>

					<div className="mt-6 rounded-3xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/40">
						<form
							onSubmit={(event) => {
								event.preventDefault();
								onSearchSubmit?.();
							}}
							className="flex flex-col gap-3 sm:flex-row"
						>
							<div className="relative flex-1">
								<Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
								<input
									type="text"
									value={searchQuery}
									onChange={(event) => onSearchChange(event.target.value)}
									placeholder="Search by title, category, location, skill..."
									className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
								/>
							</div>
							<button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700">
								Search Jobs
								<ArrowRight className="h-4 w-4" />
							</button>
						</form>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4 lg:col-span-5">
					{[
						{ icon: Briefcase, value: '500+', label: 'Open Positions', color: 'from-blue-500 to-blue-700' },
						{ icon: Users, value: '10K+', label: 'Workers Placed', color: 'from-green-500 to-emerald-600' },
						{ icon: Building2, value: '200+', label: 'Hiring Companies', color: 'from-cyan-500 to-blue-600' },
						{ icon: TrendingUp, value: '95%', label: 'Success Rate', color: 'from-orange-500 to-orange-600' },
					].map((item) => (
						<div key={item.label} className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100/60">
							<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-100/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							<div className={`relative inline-flex rounded-xl bg-gradient-to-br p-3 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${item.color}`}>
								<item.icon className="h-5 w-5" />
							</div>
							<p className="relative mt-4 text-3xl font-black text-slate-900 transition-colors duration-300 group-hover:text-blue-700">{item.value}</p>
							<p className="relative text-sm font-medium text-slate-600 transition-colors duration-300 group-hover:text-slate-800">{item.label}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function JobsFilters({ filters, setFilters, categoryOptions, locationOptions }) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleJobType = (value) => {
		setFilters((prev) => ({
			...prev,
			jobType: prev.jobType.includes(value) ? prev.jobType.filter((entry) => entry !== value) : [...prev.jobType, value],
		}));
	};

	const toggleCategory = (value) => {
		setFilters((prev) => ({
			...prev,
			category: prev.category.includes(value) ? prev.category.filter((entry) => entry !== value) : [...prev.category, value],
		}));
	};

	const toggleLocation = (value) => {
		setFilters((prev) => ({
			...prev,
			location: prev.location.includes(value) ? prev.location.filter((entry) => entry !== value) : [...prev.location, value],
		}));
	};

	const setSingleCategory = (value) => {
		setFilters((prev) => ({
			...prev,
			category: value ? [value] : [],
		}));
	};

	const setSingleLocation = (value) => {
		setFilters((prev) => ({
			...prev,
			location: value ? [value] : [],
		}));
	};

	const clearFilters = () => {
		setFilters({
			jobType: [],
			category: [],
			location: [],
			salary: '',
			experience: '',
		});
	};

	const activeFilterCount = filters.jobType.length + filters.category.length + filters.location.length + (filters.salary ? 1 : 0) + (filters.experience ? 1 : 0);

	return (
		<div className="sticky top-20 z-40 border-y border-slate-200/70 bg-white/80 backdrop-blur-xl">
			<div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
				<div className="mb-4 flex items-center justify-between lg:hidden">
					<button onClick={() => setIsOpen((prev) => !prev)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
						<Filter className="h-4 w-4" />
						Filters
						{activeFilterCount > 0 && <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">{activeFilterCount}</span>}
					</button>
					{activeFilterCount > 0 && (
						<button onClick={clearFilters} className="text-sm font-medium text-slate-500 underline">
							Clear all
						</button>
					)}
				</div>

				<div className={`${isOpen ? 'block' : 'hidden'} lg:hidden`}>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div>
							<h3 className="mb-3 text-sm font-bold text-slate-900">Job Type</h3>
							<div className="flex flex-wrap gap-2">
								{jobTypeOptions.map((type) => (
									<button
										key={type.value}
										onClick={() => toggleJobType(type.value)}
										className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${filters.jobType.includes(type.value) ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
									>
										{type.label}
									</button>
								))}
							</div>
						</div>

						<div>
							<h3 className="mb-3 text-sm font-bold text-slate-900">Category</h3>
							<select
								value={filters.category[0] || ''}
								onChange={(event) => setSingleCategory(event.target.value)}
								className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400"
							>
								<option value="">Any</option>
								{categoryOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>

						<div>
							<h3 className="mb-3 text-sm font-bold text-slate-900">Location</h3>
							<select
								value={filters.location[0] || ''}
								onChange={(event) => setSingleLocation(event.target.value)}
								className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400"
							>
								<option value="">India</option>
								{locationOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>

						<div>
							<h3 className="mb-3 text-sm font-bold text-slate-900">Salary</h3>
							<select
								value={filters.salary}
								onChange={(event) => setFilters((prev) => ({ ...prev, salary: event.target.value }))}
								className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400"
							>
								{salaryOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>

						<div>
							<h3 className="mb-3 text-sm font-bold text-slate-900">Experience</h3>
							<select
								value={filters.experience}
								onChange={(event) => setFilters((prev) => ({ ...prev, experience: event.target.value }))}
								className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400"
							>
								{experienceOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				<div className="hidden lg:block">
					<div className="rounded-2xl border border-white/60 bg-white/50 p-3 shadow-lg shadow-blue-100/30 backdrop-blur-xl">
						<div className="flex flex-wrap items-center gap-3">
							<div className="inline-flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 text-sm font-semibold text-slate-700">
								<Filter className="h-4 w-4 text-blue-600" />
								Filters
							</div>

							<div className="inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 px-3 py-2">
								<span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Job Type</span>
								<div className="flex flex-wrap items-center gap-2">
									{jobTypeOptions.map((type) => (
										<button
											key={type.value}
											onClick={() => toggleJobType(type.value)}
											className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${filters.jobType.includes(type.value) ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
										>
											{type.label}
										</button>
									))}
								</div>
							</div>

							<div className="inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 px-3 py-2">
								<span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Category</span>
								<select
									value={filters.category[0] || ''}
									onChange={(event) => setSingleCategory(event.target.value)}
									className="w-full bg-transparent text-sm text-slate-700 outline-none"
								>
									<option value="">Any</option>
									{categoryOptions.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</select>
							</div>

							<div className="inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 px-3 py-2">
								<span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Location</span>
								<select
									value={filters.location[0] || ''}
									onChange={(event) => setSingleLocation(event.target.value)}
									className="w-full bg-transparent text-sm text-slate-700 outline-none"
								>
									<option value="">India</option>
									{locationOptions.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</select>
							</div>

							<div className="inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 px-3 py-2">
								<span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Salary</span>
								<select
									value={filters.salary}
									onChange={(event) => setFilters((prev) => ({ ...prev, salary: event.target.value }))}
									className="w-full bg-transparent text-sm text-slate-700 outline-none"
								>
									{salaryOptions.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</select>
							</div>

							{activeFilterCount > 0 && (
								<button onClick={clearFilters} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">
									Clear
								</button>
							)}
						</div>
					</div>

					{activeFilterCount > 0 && (
						<div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
							<span className="text-sm text-slate-500">Active filters:</span>
							{filters.jobType.map((type) => (
								<span key={type} className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
									{jobTypeOptions.find((entry) => entry.value === type)?.label || type}
									<button onClick={() => toggleJobType(type)}>
										<X className="h-3 w-3" />
									</button>
								</span>
							))}
							{filters.location.map((location) => (
								<span key={location} className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
									{locationOptions.find((entry) => entry.value === location)?.label || location}
									<button onClick={() => toggleLocation(location)}>
										<X className="h-3 w-3" />
									</button>
								</span>
							))}
							{filters.category.map((category) => (
								<span key={category} className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
									{categoryOptions.find((entry) => entry.value === category)?.label || category}
									<button onClick={() => toggleCategory(category)}>
										<X className="h-3 w-3" />
									</button>
								</span>
							))}
							<button onClick={clearFilters} className="text-sm text-slate-600 underline">
								Clear all
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function JobCard({ job }) {
	const [liked, setLiked] = useState(false);
	const navigate = useNavigate();

	const typeStyles = {
		'full-time': 'bg-green-100 text-green-700',
		contract: 'bg-blue-100 text-blue-700',
		'part-time': 'bg-orange-100 text-orange-700',
	};

	return (
		<div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/50">
			{(job.urgent || job.featured) && (
				<div className="absolute left-3 top-3 z-10 flex gap-2">
					{job.urgent && <span className="rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">URGENT</span>}
					{job.featured && <span className="rounded-full bg-orange-500 px-2.5 py-1 text-xs font-bold text-white">FEATURED</span>}
				</div>
			)}

			<div className="absolute right-3 top-3 z-10 flex gap-2">
				<button onClick={() => setLiked((prev) => !prev)} className={`rounded-full p-2 shadow-md ${liked ? 'bg-red-500 text-white' : 'bg-white text-slate-600'}`}>
					<Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
				</button>
				<button className="rounded-full bg-white p-2 text-slate-600 shadow-md">
					<Share2 className="h-4 w-4" />
				</button>
			</div>

			<div className="relative h-40 overflow-hidden p-4 text-white">
				<ProgressiveImage
					media={job.imageMedia}
					src={job.image}
					alt={job.title}
					highClassName="transition-transform duration-500 group-hover:scale-110"
					loading="lazy"
					decoding="async"
					width="1200"
					height="800"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />
				<div className="relative z-[1]">
					<p className="text-xs font-semibold uppercase tracking-wide text-slate-100">{job.company}</p>
					<h3 className="mt-2 text-xl font-bold leading-tight text-white">{job.title}</h3>
					<div className="mt-3 inline-flex items-center gap-1.5 text-sm text-slate-100">
						<MapPin className="h-4 w-4" />
						{job.location}
					</div>
				</div>
			</div>

			<div className="p-5">
				<div className="mb-4 grid grid-cols-2 gap-3">
					<div className="rounded-lg bg-blue-50 p-2.5">
						<div className="flex items-center gap-2 text-sm text-slate-700">
							<Banknote className="h-4 w-4 text-blue-600" />
							<span className="font-semibold">{formatSalary(job.salaryMin, job.salaryMax)}</span>
						</div>
					</div>
					<div className="rounded-lg bg-emerald-50 p-2.5">
						<div className="flex items-center gap-2 text-sm text-slate-700">
							<Briefcase className="h-4 w-4 text-emerald-600" />
							<span className="font-semibold">{job.experience === 'fresher' ? 'Fresher' : `${job.experience} Years`}</span>
						</div>
					</div>
				</div>

				<div className="mb-4">
					<span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${typeStyles[job.jobType] || 'bg-slate-100 text-slate-700'}`}>
						<Clock className="h-3 w-3" />
						{job.jobType.replace('-', ' ')}
					</span>
				</div>

				<p className="mb-4 line-clamp-2 text-sm text-slate-600">{job.description}</p>

				<div className="mb-4 flex flex-wrap gap-1.5">
					{job.skills.slice(0, 4).map((skill) => (
						<span key={skill} className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">
							{skill}
						</span>
					))}
				</div>

				<div className="flex items-center justify-between border-t border-slate-100 pt-4">
					<div className="inline-flex items-center gap-1 text-xs text-slate-500">
						<Calendar className="h-3 w-3" />
						Apply by: {job.applyBy}
					</div>
					<button
						onClick={() => navigate(`/job/${job.id}`)}
						className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
					>
						Apply Now
						<ChevronRight className="h-4 w-4" />
					</button>
				</div>
			</div>
		</div>
	);
}

function JobsListing({ filters, searchQuery, jobs, loading }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [viewMode, setViewMode] = useState('grid');
	const jobsPerPage = 6;

	const filteredJobs = useMemo(() => {
		let filtered = [...jobs];
		const normalizedSearch = normalizeText(searchQuery);

		if (filters.jobType.length > 0) {
			filtered = filtered.filter((job) => filters.jobType.some((type) => normalizeText(job.title).includes(type) || job.skills.some((skill) => normalizeText(skill).includes(type))));
		}

		if (filters.category.length > 0) {
			filtered = filtered.filter((job) => filters.category.some((category) => toOptionValue(job.category) === category || normalizeText(job.category).includes(category)));
		}

		if (filters.location.length > 0) {
			filtered = filtered.filter((job) => {
				const locationSlug = toOptionValue(job.location);
				const locationText = normalizeText(job.location);
				return filters.location.some((selectedLocation) => {
					const selectedText = normalizeText(String(selectedLocation).replace(/-/g, ' '));
					return locationSlug.includes(selectedLocation) || locationText.includes(selectedText);
				});
			});
		}

		if (filters.salary) {
			const range = parseSalaryRange(filters.salary);
			if (range) {
				filtered = filtered.filter((job) => {
					const midpoint = (job.salaryMin + job.salaryMax) / 2;
					return midpoint >= range.min && midpoint <= range.max;
				});
			}
		}

		if (filters.experience) {
			filtered = filtered.filter((job) => job.experience === filters.experience);
		}

		if (normalizedSearch) {
			filtered = filtered.filter((job) => {
				const searchTarget = [job.title, job.company, job.category, job.location, job.jobType, job.description, ...(job.skills || [])]
					.map(normalizeText)
					.join(' ');
				return searchTarget.includes(normalizedSearch);
			});
		}

		return filtered;
	}, [filters, jobs, searchQuery]);

	useEffect(() => {
		setCurrentPage(1);
	}, [filters, searchQuery]);

	const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
	const start = (currentPage - 1) * jobsPerPage;
	const currentJobs = filteredJobs.slice(start, start + jobsPerPage);

	return (
		<section className="bg-slate-50 py-12">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h2 className="text-2xl font-bold text-slate-900">Available Jobs</h2>
						<p className="mt-1 text-slate-600">
									Showing {filteredJobs.length === 0 ? 0 : start + 1}-{Math.min(start + jobsPerPage, filteredJobs.length)} of {filteredJobs.length}
						</p>
					</div>

					<div className="flex items-center gap-3">
						<div className="flex items-center rounded-xl border border-slate-200 bg-white p-1">
							<button
								onClick={() => setViewMode('grid')}
								className={`rounded-lg p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
							>
								<Grid3X3 className="h-5 w-5" />
							</button>
							<button
								onClick={() => setViewMode('list')}
								className={`rounded-lg p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
							>
								<List className="h-5 w-5" />
							</button>
						</div>
					</div>
				</div>

				{loading ? (
					<div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
						<p className="text-slate-600">Loading jobs...</p>
					</div>
				) : filteredJobs.length > 0 ? (
					<div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
						{currentJobs.map((job) => (
							<JobCard key={job.id} job={job} />
						))}
					</div>
				) : (
					<div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
						<div className="mx-auto mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
							<Grid3X3 className="h-10 w-10 text-slate-400" />
						</div>
						<h3 className="text-xl font-semibold text-slate-900">No jobs found</h3>
						<p className="mt-1 text-slate-600">Try adjusting your filters to see more results.</p>
					</div>
				)}

				{totalPages > 1 && (
					<div className="mt-10 flex items-center justify-center gap-2">
						<button
							onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
							disabled={currentPage === 1}
							className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50"
						>
							<ChevronLeft className="h-4 w-4" />
							Previous
						</button>

						{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
							<button
								key={page}
								onClick={() => setCurrentPage(page)}
								className={`h-10 w-10 rounded-xl text-sm font-semibold ${currentPage === page ? 'bg-blue-600 text-white' : 'border border-slate-300 bg-white text-slate-700'}`}
							>
								{page}
							</button>
						))}

						<button
							onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
							disabled={currentPage === totalPages}
							className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50"
						>
							Next
							<ChevronRight className="h-4 w-4" />
						</button>
					</div>
				)}
			</div>
		</section>
	);
}

function ApplyCTA() {
	const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024;
	const ALLOWED_RESUME_EXTENSIONS = ['pdf', 'doc', 'docx'];

	const [isVisible, setIsVisible] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [resumeFile, setResumeFile] = useState(null);
	const [resumeStatusNote, setResumeStatusNote] = useState('');
	const sectionRef = useRef(null);
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		experience: '',
		jobType: '',
		message: '',
	});

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) setIsVisible(true);
			},
			{ threshold: 0.2 }
		);

		if (sectionRef.current) observer.observe(sectionRef.current);
		return () => observer.disconnect();
	}, []);

	const onResumeChange = (event) => {
		const file = event.target.files?.[0] || null;
		if (!file) {
			setResumeFile(null);
			setResumeStatusNote('');
			return;
		}

		const extension = String(file.name || '').split('.').pop()?.toLowerCase() || '';
		if (!ALLOWED_RESUME_EXTENSIONS.includes(extension)) {
			setResumeFile(null);
			setResumeStatusNote('Please upload a PDF or Word document (.pdf, .doc, .docx).');
			event.target.value = '';
			return;
		}

		if (file.size > MAX_RESUME_SIZE_BYTES) {
			setResumeFile(null);
			setResumeStatusNote('Resume file is too large. Max size is 5MB.');
			event.target.value = '';
			return;
		}

		setResumeFile(file);
		setResumeStatusNote(`Selected: ${file.name}`);
	};

	const submitForm = async (event) => {
		event.preventDefault();
		setIsSubmitting(true);
		setResumeStatusNote((prev) => (prev && !prev.startsWith('Selected:') ? prev : ''));

		try {
			let resumeLine = 'Resume: Not provided';
			if (resumeFile) {
				const uploadResult = await uploadResumeToGoogleDrive(resumeFile, {
					fullName: formData.name,
					email: formData.email,
					phone: formData.phone,
					jobType: formData.jobType,
				});

				if (uploadResult?.status === 'success' || uploadResult?.status === 'queued') {
					resumeLine = `Resume: Upload request sent (${resumeFile.name})`;
					setResumeStatusNote(uploadResult?.message || 'Resume upload request sent.');
				} else {
					resumeLine = `Resume: Upload failed (${resumeFile.name})`;
					setResumeStatusNote(uploadResult?.message || 'Resume upload failed.');
				}
			}

			await submitLead({
				name: formData.name,
				phone: formData.phone,
				email: formData.email,
				subject: `Jobs page interest${formData.jobType ? ` - ${formData.jobType}` : ''}`,
				message: `Experience: ${formData.experience || 'N/A'}\nPreferred role: ${formData.jobType || 'N/A'}\n${resumeLine}\n${formData.message || ''}`,
			});

			setIsSubmitted(true);
			setResumeFile(null);
			setResumeStatusNote('');
			setFormData({
				name: '',
				phone: '',
				email: '',
				experience: '',
				jobType: '',
				message: '',
			});
			window.setTimeout(() => setIsSubmitted(false), 3000);
		} catch (error) {
			setResumeStatusNote(error?.message || 'Submission failed. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const quickRoles = ['Welder', 'Electrician', 'Helper', 'Supervisor', 'Technician', 'Fitter', 'Driver', 'Other'];

	return (
		<section ref={sectionRef} className="relative overflow-hidden bg-white py-20">
			<div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(37,99,235,0.5) 1px, transparent 0)', backgroundSize: '28px 28px' }} />

			<div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
				<div className={`transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
					<span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
						<Send className="h-4 w-4" />
						Quick Application
					</span>
					<h2 className="mt-5 text-4xl font-black leading-tight text-slate-900 lg:text-5xl">
						Cannot find the perfect role?
					</h2>
					<p className="mt-4 text-lg text-slate-600">
						Share your details and our recruitment team will connect you with matching opportunities.
					</p>

					<div className="mt-8 space-y-4">
						<div className="flex items-center gap-4 rounded-xl bg-blue-50 p-4">
							<div className="rounded-xl bg-blue-600 p-3 text-white">
								<Phone className="h-5 w-5" />
							</div>
							<div>
								<p className="text-xs text-slate-500">Call us</p>
								<p className="text-lg font-semibold text-slate-900">+91 9561504911</p>
							</div>
						</div>
						<div className="flex items-center gap-4 rounded-xl bg-emerald-50 p-4">
							<div className="rounded-xl bg-emerald-600 p-3 text-white">
								<Mail className="h-5 w-5" />
							</div>
							<div>
								<p className="text-xs text-slate-500">Email us</p>
								<p className="text-lg font-semibold text-slate-900">info@tsplgroup.in</p>
							</div>
						</div>
						<div className="flex items-center gap-4 rounded-xl bg-orange-50 p-4">
							<div className="rounded-xl bg-orange-600 p-3 text-white">
								<MapPin className="h-5 w-5" />
							</div>
							<div>
								<p className="text-xs text-slate-500">Visit office</p>
								<p className="text-lg font-semibold text-slate-900">Mumbai, Maharashtra</p>
							</div>
						</div>
					</div>
				</div>

				<div className={`transition-all delay-150 duration-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
					<div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-200/60">
						{isSubmitted ? (
							<div className="py-12 text-center">
								<div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
									<CheckCircle2 className="h-10 w-10" />
								</div>
								<h3 className="text-2xl font-bold text-slate-900">Application Submitted</h3>
								<p className="mt-2 text-slate-600">Our team will contact you within 24 hours.</p>
							</div>
						) : (
							<form onSubmit={submitForm} className="space-y-5">
								<h3 className="text-2xl font-bold text-slate-900">Submit Your Details</h3>

								<div className="grid gap-4 sm:grid-cols-2">
									<div>
										<label className="mb-2 block text-sm font-medium text-slate-700">Full Name</label>
										<div className="relative">
											<User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
											<input
												required
												type="text"
												value={formData.name}
												onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
												className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-400"
												placeholder="Your name"
											/>
										</div>
									</div>
									<div>
										<label className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
										<div className="relative">
											<Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
											<input
												required
												type="tel"
												value={formData.phone}
												onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
												className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-400"
												placeholder="+91 XXXXX XXXXX"
											/>
										</div>
									</div>
									<div>
										<label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
										<div className="relative">
											<Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
											<input
												type="email"
												value={formData.email}
												onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
												className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-400"
												placeholder="you@example.com"
											/>
										</div>
									</div>
								</div>

								<div>
									<label className="mb-2 block text-sm font-medium text-slate-700">Preferred Job Type</label>
									<div className="flex flex-wrap gap-2">
										{quickRoles.map((role) => (
											<button
												key={role}
												type="button"
												onClick={() => setFormData((prev) => ({ ...prev, jobType: role }))}
												className={`rounded-full px-3 py-1.5 text-sm font-medium ${formData.jobType === role ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
											>
												{role}
											</button>
										))}
									</div>
								</div>

								<div>
									<label className="mb-2 block text-sm font-medium text-slate-700">Experience</label>
									<select
										value={formData.experience}
										onChange={(event) => setFormData((prev) => ({ ...prev, experience: event.target.value }))}
										className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-400"
									>
										<option value="">Select experience</option>
										<option value="fresher">Fresher</option>
										<option value="1-2">1-2 Years</option>
										<option value="2-5">2-5 Years</option>
										<option value="5+">5+ Years</option>
									</select>
								</div>

								<div>
									<label className="mb-2 block text-sm font-medium text-slate-700">Upload Resume (Optional)</label>
									<label htmlFor="jobs-resume-file" className="block cursor-pointer rounded-xl border-2 border-dashed border-slate-200 p-5 text-center transition hover:border-blue-400">
										<input
											id="jobs-resume-file"
											type="file"
											accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
											className="hidden"
											onChange={onResumeChange}
										/>
										<Upload className="mx-auto mb-2 h-7 w-7 text-slate-400" />
										<p className="text-sm text-slate-600">Click to upload resume</p>
										<p className="mt-1 text-xs text-slate-400">PDF, DOC up to 5MB</p>
									</label>
									{resumeStatusNote ? <p className="mt-2 text-xs text-slate-500">{resumeStatusNote}</p> : null}
								</div>

								<button disabled={isSubmitting} type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">
									{isSubmitting ? 'Submitting...' : 'Submit Application'}
									<Send className="h-4 w-4" />
								</button>

								<p className="text-center text-sm text-slate-500">Your data is private and secure.</p>
							</form>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

export default function JobsPage() {
	const pageAssets = usePageAssets();
	const managedPlaceholders = useMemo(
		() => [
			getPageAsset(pageAssets, 'jobs.welder', allJobs[0].image).url,
			getPageAsset(pageAssets, 'jobs.electrician', allJobs[1].image).url,
			getPageAsset(pageAssets, 'jobs.supervisor', allJobs[2].image).url,
			getPageAsset(pageAssets, 'jobs.cnc', allJobs[3].image).url,
			getPageAsset(pageAssets, 'jobs.helper', allJobs[4].image).url,
			getPageAsset(pageAssets, 'jobs.maintenance', allJobs[5].image).url,
		],
		[pageAssets]
	);
	const fallbackJobImage = getPageAsset(pageAssets, 'jobs.fallback', 'https://picsum.photos/seed/tspl-job/1200/800').url;

	const [searchQuery, setSearchQuery] = useState('');
	const [filters, setFilters] = useState({
		jobType: [],
		category: [],
		location: [],
		salary: '',
		experience: '',
	});
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadJobs = async () => {
			setLoading(true);
			const data = await fetchJobs();
			setJobs(
				data.length > 0
					? data.map((job, index) => mapApiJobToListing(job, index, managedPlaceholders, fallbackJobImage))
					: allJobs.map((job, index) => ({ ...job, image: managedPlaceholders[index % managedPlaceholders.length] || fallbackJobImage }))
			);
			setLoading(false);
		};

		loadJobs();
	}, [managedPlaceholders, fallbackJobImage]);

	const categoryOptions = useMemo(() => uniqueOptionsFromJobs(jobs, 'category'), [jobs]);
	const locationOptions = presetLocationOptions;

	const handleSearchSubmit = () => {
		const jobSection = document.getElementById('jobs-listing');
		if (jobSection) {
			jobSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	return (
		<div className="relative bg-slate-50">
			<Navbar />
			<JobsHero searchQuery={searchQuery} onSearchChange={setSearchQuery} onSearchSubmit={handleSearchSubmit} />
			<JobsFilters filters={filters} setFilters={setFilters} categoryOptions={categoryOptions} locationOptions={locationOptions} />
			<div id="jobs-listing">
				<JobsListing filters={filters} searchQuery={searchQuery} jobs={jobs} loading={loading} />
			</div>
			<ApplyCTA />

			<Footer />
		</div>
	);
}
