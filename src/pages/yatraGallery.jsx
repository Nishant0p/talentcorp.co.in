import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getYatraGalleryCard } from '../data/yatraGalleryData'

export default function YatraGalleryPage() {
const { slug } = useParams()
const card = getYatraGalleryCard(slug)

if (!card) {
return <Navigate to="/yatra" replace />
}

const images = card.images.map((imagePath) => encodeURI(imagePath))
const heroImage = images[0]

return (
<div className="bg-slate-950 text-white">
<Navbar />
<main className="relative overflow-hidden pt-28">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.22),transparent_40%)]" />
<div className="relative mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
<div className="mb-8 flex flex-wrap items-center justify-between gap-4">
<div>
<p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-400">Rojgar Yatra Image Gallery</p>
<h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">{card.title}</h1>
<p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
{card.description}
</p>
</div>
<Link
to="/yatra"
className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
>
<ArrowLeft className="h-4 w-4" />
Back to Services
</Link>
</div>

<div className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr]">
<div className="rounded-[32px] border border-white/10 bg-black/25 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-md">
<div className="flex min-h-[60vh] items-center justify-center overflow-hidden rounded-[28px] bg-slate-900">
<img
src={heroImage}
alt={card.title}
className="h-full w-full object-contain p-4 sm:p-6"
/>
</div>
</div>

<div className="flex flex-col justify-between rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-8">
<div>
<p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-400">{card.folderName}</p>
<h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">{card.subtitle}</h2>
<p className="mt-4 leading-relaxed text-slate-300">
All images from this folder are shown below.
</p>
</div>

<div className="mt-8 rounded-[24px] border border-white/10 bg-slate-950/60 p-4">
<p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-400">Image Count</p>
<p className="mt-2 text-2xl font-black text-white">{images.length}</p>
<a
href={heroImage}
target="_blank"
rel="noreferrer"
className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-300 transition hover:text-orange-200"
>
Open hero image file
<ExternalLink className="h-4 w-4" />
</a>
</div>
</div>
</div>

<div className="mt-10">
<div className="mb-5 flex items-center justify-between gap-4">
<div>
<h2 className="text-2xl font-black sm:text-3xl">All Images</h2>
<p className="mt-2 text-sm text-slate-300">Tap any image to open the file in a new tab.</p>
</div>
</div>

<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
{images.map((src, index) => (
<a
key={`${card.slug}-${index}`}
href={src}
target="_blank"
rel="noreferrer"
className="group overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/70 shadow-lg transition-transform duration-300 hover:-translate-y-1"
>
<div className="aspect-[4/3] overflow-hidden bg-slate-900">
<img
src={src}
alt={`${card.title} ${index + 1}`}
className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
loading="lazy"
/>
</div>
<div className="flex items-center justify-between gap-3 px-4 py-3 text-sm text-slate-200">
<span className="font-medium">Image {index + 1}</span>
<ExternalLink className="h-4 w-4 text-orange-300" />
</div>
</a>
))}
</div>
</div>
</div>
</main>
<Footer />
</div>
)
}
