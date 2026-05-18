import React, { useEffect, useRef, useState } from 'react'
import { MessageSquare, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { fetchJobs } from '../utils/strapi'

// Simple local KB key used in localStorage
const KB_KEY = 'tspl_chatbot_kb_v1'

const defaultKB = [
  { id: 1, q: 'company overview', a: "TSPL Group (est. 2011) is a leading Indian HR and workforce solutions provider. We work with 450+ clients, have deployed 40,000+ trainees nationwide, and are government-authorized TPAs for NAPS and NATS.", redirect: '/about' },
  { id: 2, q: 'sectors served', a: 'Manufacturing; Automobile; Electronics; IT & ITeS/BPO; Pharmaceuticals; Chemicals; Banking; Healthcare; Retail; BFSI; Logistics; E-Commerce; Construction; Food & Beverages; Renewable Energy; Mining; Steel; Power & Energy; Electric Vehicles; Apparel & Textiles.', redirect: '/about' },
  { id: 3, q: 'services offered', a: 'We offer NAPS, NATS/BOAT, MAPS, WILP/WISE, D.Voc/B.Voc/M.Voc, AEDP, Contract Staffing, FTC, Statutory Compliance & Payroll, Security & Housekeeping, Skill Training, Manpower Planning.', redirect: '/about' },
  { id: 4, q: 'awards and recognition', a: 'TSPL holds distinctions like World Book of Records, regional NATS rankings, honorary doctorates, national awards, and MOUs with government ministries.', redirect: '/about' },
  { id: 5, q: 'key clients', a: 'Representative clients: Haier, Blue Star, MRF, FIAT, Jabil, Voltas, Hyundai, LG, JCB, JSW — with multi-year manpower engagements.', redirect: '/client' },

  // NAPS
  { id: 10, q: 'naps', a: 'NAPS (National Apprenticeship Promotion Scheme) launched in 2016 encourages apprenticeships via DBT incentives and portal-based registration. DBT examples: ₹1,500/month is commonly referenced for certain apprentice categories. Quotas: 2.5%–15% (Maharashtra up to 25%).', redirect: '/naps' },
  { id: 11, q: 'naps savings', a: 'Example savings: 1,000 NAPS trainees × ₹1,500 = ₹15,00,000/month → ₹1.8 Crores/year in DBT benefits for employers.', redirect: '/naps' },

  // NATS
  { id: 20, q: 'nats', a: 'NATS/BOAT is the Board of Apprenticeship Training route (1–3 years) providing Government Certificates. DBT examples: Diploma ~ ₹4,000/month; BE/BTech ~ ₹4,500/month.', redirect: '/nats' },
  { id: 21, q: 'nats savings', a: 'Example savings: 1,000 NATS trainees × ₹4,500 = ₹45,00,000/month → ₹5.4 Crores/year.', redirect: '/nats' },

  // MAPS
  { id: 30, q: 'maps', a: 'MAPS (Maharashtra Apprenticeship Promotion Scheme) launched June 2021 supports apprentices in Maharashtra; example DBT: ₹3,500/month per apprentice and integration with NAPS.', redirect: '/maps' },

  // Vocational & WILP
  { id: 40, q: 'wilp', a: 'WILP/WISE programs combine work and study, often enabling statutory exemptions and CSR booking; designed for learn-and-earn vocational upskilling.', redirect: '/pages' },
  { id: 41, q: 'dvoc bvoc mvoc', a: 'D.Voc (2–3 years), B.Voc (3 years), and M.Voc programs focus on practical vocational skills and industry-aligned education.', redirect: '/about' },

  // Recruitment & capacity
  { id: 50, q: 'hiring capacity', a: 'TSPL deploys dedicated sourcing teams and recruiters across regions — capacities scale to thousands of hires per month depending on program and region. See About for details.', redirect: '/about' },
  { id: 51, q: 'hiring speed', a: 'Recruitment speed examples: up to 25 students in 1 day; up to 100 in 3 days; up to 1,000 in ~1 month depending on role.', redirect: '/about' },

  // Financial
  { id: 60, q: 'financial savings', a: 'Organizations can book apprenticeship stipends and trainee expenses under CSR; statutory savings (PF/ESIC/Bonus/Gratuity avoidance) further reduce hiring costs.', redirect: '/about' },

  // Jobs & contact
  { id: 70, q: 'jobs', a: 'View all job openings at /jobs. Click a listing to open the job detail and Apply Now to apply.', redirect: '/jobs' },
  { id: 71, q: 'job', a: 'To apply, open the job detail page and click Apply Now. Browse all openings at /jobs.', redirect: '/jobs' },
  { id: 72, q: 'contact', a: 'For enquiries, use the Contact page to find phone numbers and an enquiry form.', redirect: '/contact-us' },
]

function loadKB() {
  try {
    const raw = localStorage.getItem(KB_KEY)
    if (!raw) return defaultKB
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return defaultKB
    // Merge defaultKB entries if missing (by lowercased question)
    const map = new Map(parsed.map((e) => [String(e.q || '').toLowerCase(), e]))
    defaultKB.forEach((d) => {
      const key = String(d.q || '').toLowerCase()
      if (!map.has(key)) map.set(key, d)
    })
    return Array.from(map.values())
  } catch (e) {
    return defaultKB
  }
}

function saveKB(kb) {
  try {
    localStorage.setItem(KB_KEY, JSON.stringify(kb))
  } catch (e) {
    // ignore
  }
}

export default function ChatBot() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [kb, setKb] = useState(() => loadKB())
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  
  const listRef = useRef(null)

  useEffect(() => {
    saveKB(kb)
  }, [kb])

  useEffect(() => {
    if (open) {
      // greeting
      setMessages((m) => [...m, { from: 'bot', text: 'Hi — ask me about NAPS, NATS, jobs, or click a suggested action.' }])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, open])

  const handleSend = () => {
    if (!input.trim()) return
    const text = input.trim()
    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    setTimeout(() => respond(text), 250)
  }

  const respond = (text) => {
    const normalized = text.toLowerCase()
    // simple match: find KB entry where all words of short query are included
    const match = kb.find((entry) => {
      const q = entry.q.toLowerCase()
      return q.split(/\s+/).every((w) => normalized.includes(w)) || normalized.includes(q)
    })

    if (match) {
      // If the match redirects to jobs, fetch and include sample listings
      if (match.redirect === '/jobs') {
        setMessages((m) => [...m, { from: 'bot', text: match.a }])
        fetchJobs().then((jobs) => {
          const short = (jobs || []).slice(0, 5).map((j) => ({ id: j.id, title: j.title || j.documentId || `Job ${j.id}`, company: j.company || j.employer || '', location: j.location || '' }))
          setMessages((m) => [...m, { from: 'bot', text: `Showing ${short.length} recent jobs:`, jobs: short }])
        }).catch(() => {
          setMessages((m) => [...m, { from: 'bot', text: 'Unable to fetch jobs right now. Please try again.' }])
        })
        return
      }
      setMessages((m) => [...m, { from: 'bot', text: match.a, redirect: match.redirect }])
      return
    }

    // fallback: try keyword matching
    const keyword = kb.find((entry) => normalized.includes(entry.q.toLowerCase().split(' ')[0]))
    if (keyword) {
      if (keyword.redirect === '/jobs') {
        setMessages((m) => [...m, { from: 'bot', text: keyword.a }])
        fetchJobs().then((jobs) => {
          const short = (jobs || []).slice(0, 5).map((j) => ({ id: j.id, title: j.title || j.documentId || `Job ${j.id}`, company: j.company || j.employer || '', location: j.location || '' }))
          setMessages((m) => [...m, { from: 'bot', text: `Showing ${short.length} recent jobs:`, jobs: short }])
        }).catch(() => {
          setMessages((m) => [...m, { from: 'bot', text: 'Unable to fetch jobs right now. Please try again.' }])
        })
        return
      }
      setMessages((m) => [...m, { from: 'bot', text: keyword.a, redirect: keyword.redirect }])
      return
    }

    setMessages((m) => [...m, { from: 'bot', text: "Sorry, I don't know that yet." }])
  }

  const handleRedirect = (url) => {
    if (!url) return
    navigate(url)
    setOpen(false)
  }

  // Training is disabled in this build (KB is seeded and merges on load).

  return (
    <div>
      <div className={`fixed left-4 bottom-8 z-50 flex flex-col items-start gap-3 ${open ? 'w-[320px]' : ''}`}>
        {open && (
          <div className="w-[320px] max-h-[60vh] min-h-[120px] overflow-hidden rounded-xl bg-white shadow-xl border border-slate-200">
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <strong>TSPL Assistant</strong>
              </div>
              <div className="flex items-center gap-2">
                <button aria-label="Close" onClick={() => setOpen(false)} className="p-1 text-slate-500 hover:text-slate-800"><X className="w-4 h-4" /></button>
              </div>
            </div>

            <div ref={listRef} className="px-3 py-2 overflow-auto max-h-[38vh] space-y-2">
              {messages.map((m, i) => (
                <div key={i} className={m.from === 'bot' ? 'text-left' : 'text-right'}>
                  <div className={`inline-block ${m.from === 'bot' ? 'bg-slate-100 text-slate-900' : 'bg-blue-600 text-white'} px-3 py-2 rounded-xl max-w-[88%]`}>{m.text}</div>
                  {m.redirect && m.from === 'bot' && (
                    <div className="mt-1">
                      <button onClick={() => handleRedirect(m.redirect)} className="text-blue-600 text-sm underline">Go to {m.redirect}</button>
                    </div>
                  )}

                  {/* Render jobs list if present */}
                  {m.jobs && Array.isArray(m.jobs) && (
                    <div className="mt-2 space-y-2">
                      {m.jobs.map((job) => (
                        <div key={job.id} className="rounded-lg border border-slate-200 bg-white p-2">
                          <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              <div className="text-sm font-bold text-slate-900 truncate">{job.title}</div>
                              <div className="text-xs text-slate-600 truncate">{job.company} • {job.location}</div>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => handleRedirect(`/job/${job.id}`)} className="text-xs rounded-md bg-blue-600 text-white px-2 py-1">View</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="px-3 py-2 border-t border-slate-100">
              <div className="flex gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask me something..." className="flex-1 rounded-md border px-2 py-1" />
                <button onClick={handleSend} className="px-3 py-1 rounded-md bg-blue-600 text-white">Send</button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Open chat"
          className="rounded-full bg-blue-600 text-white p-3 shadow-xl border border-white/10 hover:bg-blue-700 focus:outline-none"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}