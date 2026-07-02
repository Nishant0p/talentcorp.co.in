import React, { useEffect, useRef, useState } from 'react'
import { 
  MessageSquare, 
  X, 
  Send, 
  Calculator, 
  HelpCircle, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Phone, 
  ArrowRight, 
  Bot, 
  User,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Building2,
  ShieldAlert
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { fetchJobs, fetchNews, extractMediaUrl } from '../utils/strapi'

const KB_KEY = 'tspl_chatbot_kb_v4'

// Comprehensive Knowledge Base with equal split for B2B and Job Seekers (Employees/Candidates)
const defaultKB = [
  // 1. Job Seeker & Candidate Specifics
  { id: 100, q: 'job seeker fee', a: "TSPL Group strictly charges 100% ZERO FEES from job seekers! All job registrations, interviews, training modules, and company placements are completely free of cost. Do not pay any money to fake agents or brokers claiming to represent TSPL.", redirect: '/jobs' },
  { id: 101, q: 'is there any fee', a: "No! TSPL does not charge any charges or fees from candidates at any stage. Our skilling, placement, and training initiatives are completely free for students. If anyone asks for money in our name, report it to info@tsplgroup.in.", redirect: '/contact-us' },
  { id: 102, q: 'documents required', a: "To apply, please carry these original and photocopy documents: 1. Aadhaar Card, 2. PAN Card, 3. Education Marksheets (10th/12th/ITI/Diploma/Degree), 4. Passport size photos, 5. Bank Passbook or cancelled cheque for stipend credit.", redirect: '/jobs' },
  { id: 103, q: 'learn and earn benefits', a: "TSPL's 'Learn & Earn' (B.Voc/D.Voc) program is designed for students to pursue higher college degrees while gaining real-world factory experience. You receive: 1. A monthly stipend of ₹11,000 to ₹16,000, 2. Subsidized canteen & company bus facility, 3. Subsidized hostel stay, 4. Free study materials & uniforms, 5. UGC-recognized B.Voc Degree or D.Voc Diploma.", redirect: '/bvoc' },
  { id: 104, q: 'candidate facilities hostel canteen', a: "Most of our industrial client placements (like Pune, Mumbai, Gujarat, Bangalore) offer trainees subsidized sharing hostel accommodation, safety uniforms, safety shoes, subsidized hot meals/canteen, and free bus transport from rooms to the plant.", redirect: '/about' },
  { id: 105, q: 'monthly stipend amount', a: "Stipends range from ₹9,000 to ₹18,000+ per month depending on your qualification: School passouts earn approx. ₹9,000-₹11,000; ITI/Diploma holders earn ₹12,000-₹16,000; Engineering graduates earn ₹14,000-₹18,000+ under NATS rules.", redirect: '/jobs' },
  { id: 106, q: 'candidate age limit', a: "For apprenticeship schemes (NAPS & NATS), candidates must be at least 18 years old. The upper age limit generally ranges up to 30 years for core technical production roles.", redirect: '/jobs' },
  { id: 107, q: 'apprentice benefits certificate', a: "By doing a NAPS/NATS apprenticeship through TSPL, you get: 1. Monthly stipend in your bank, 2. Hands-on training in global companies (Haier, Hyundai, LG), 3. A government-certified 'Certificate of Proficiency' which counts as 1 full year of valid industry experience.", redirect: '/nats' },

  // 2. General & Corporate Overview
  { id: 1, q: 'company overview', a: "TSPL Group (est. 2011) is a premier Indian HR & workforce solutions provider. Operating across 25+ states with 450+ corporate clients, we have deployed over 40,000 trainees nationwide. We are government-authorized Third-Party Aggregators (TPA) specialized in scalable apprenticeship programs.", redirect: '/about' },
  { id: 2, q: 'who is tspl', a: "TSPL Group stands for Talent & Skill Providers Limited. We are a pioneer in skilling, staffing, vocational education, and compliance management, bridging the gap between industry manpower needs and youth employability.", redirect: '/about' },
  { id: 3, q: 'establishment year', a: "TSPL Group was established in 2011. For over 15 years, we have served the Indian industrial and corporate landscape with high-performance workforce solutions.", redirect: '/about' },
  { id: 4, q: 'sectors served', a: "TSPL serves over 20 core sectors: Manufacturing, Automobile, Electronics, IT & ITeS, BPO, Pharmaceuticals, Chemicals, Banking, Healthcare, Retail, BFSI, Logistics, E-Commerce, Construction, Food & Beverages, Renewable Energy, Electric Vehicles, and Apparel & Textiles.", redirect: '/about' },
  { id: 5, q: 'services offered', a: "We offer comprehensive B2B workforce services: NAPS & NATS/BOAT implementation, MAPS (Maharashtra Scheme), Flexi Staffing (FTC), B.Voc/D.Voc vocational paths, statutory payroll & compliance audits, security, housekeeping, and custom skill centers.", redirect: '/about' },
  { id: 6, q: 'key clients', a: "Our premium client roster includes global giants like Haier, LG Electronics, Blue Star, MRF, FIAT, Jabil Circuit, Voltas, Hyundai Motors, JCB India, and JSW Steel.", redirect: '/client' },
  { id: 7, q: 'office locations', a: "Our corporate headquarters is in Chakan, Pune, Maharashtra (India's premier automobile hub). We also have operational regional offices and skilling centers spanning major industrial zones across 25+ states.", redirect: '/contact-us' },
  { id: 8, q: 'corporate capacity', a: "TSPL manages a live database of over 50,000 candidates, supports 40,000+ active trainees, and maintains a recruitment capability of deploying up to 1,000+ candidates in under 30 days for major industrial projects.", redirect: '/about' },

  // 3. NAPS & NATS & MAPS Schemes
  { id: 10, q: 'naps rules', a: "NAPS was launched in August 2016 by the Government of India. It mandates that establishments with 30+ employees must engage apprentices representing 2.5% to 15% of their total workforce strength.", redirect: '/naps' },
  { id: 11, q: 'naps dbt benefits', a: "Under NAPS, the government provides Direct Benefit Transfer (DBT) reimbursing 25% of the prescribed stipend, up to a maximum capping of ₹1,500 per month per apprentice.", redirect: '/naps' },
  { id: 12, q: 'naps eligibility candidates', a: "Candidates must be at least 15 years old, have completed 5th class or above, and possess an ITI, Diploma, Graduate degree, or completed a certified PMKVY skill course.", redirect: '/naps' },
  { id: 13, q: 'naps company eligibility', a: "Any employer with an active EPF/ESIC registration, PAN, and a minimum workforce of 4 employees can register under NAPS. Engaging apprentices is mandatory for organizations with 30+ employees.", redirect: '/naps' },
  { id: 20, q: 'nats rules', a: "NATS is governed by the Board of Apprenticeship Training (BOAT) under the Ministry of Education. It focuses on Engineering graduates, Diploma holders, and General Stream graduates (BA, B.Sc, B.Com) for 1-year structured training.", redirect: '/nats' },
  { id: 21, q: 'nats dbt benefits', a: "NATS provides direct stipend DBT support. Prescribed stipend amounts are split 50:50 between the employer and the government. Maximum government DBT reimbursement is ₹4,500/month for Graduate Apprentices and ₹4,000/month for Diploma Apprentices.", redirect: '/nats' },
  { id: 30, q: 'maps rules', a: "MAPS was launched by the Government of Maharashtra in June 2021. It aims to train 10 lakh apprentices in 5 years. It increases the mandatory apprentice quota in Maharashtra up to 25% of workforce.", redirect: '/maps' },
  { id: 31, q: 'maps dbt benefits', a: "Under MAPS, the Maharashtra state government provides a premium DBT stipend reimbursement of up to ₹3,500 per month per apprentice directly to the employer.", redirect: '/maps' },

  // 4. Vocational Education (B.Voc, D.Voc, M.Voc) & WILP
  { id: 40, q: 'dvoc program', a: "D.Voc (Diploma of Vocation) is a 3-year practical, work-integrated vocational diploma program recognized by AICTE/UGC, emphasizing direct industrial training (70% practical, 30% theory).", redirect: '/dvoc' },
  { id: 41, q: 'bvoc program', a: "B.Voc (Bachelor of Vocation) is a 3-year UGC-approved undergraduate degree focusing on skill development. It has multiple entry/exit points (Diploma at Year 1, Advanced Diploma at Year 2, Degree at Year 3).", redirect: '/bvoc' },
  { id: 42, q: 'mvoc program', a: "M.Voc (Master of Vocation) is a 2-year postgraduate professional vocational degree designed to foster high-level technical leadership, R&D skills, and management capabilities.", redirect: '/mvoc' },

  // 5. Contact, Jobs & Actions
  { id: 60, q: 'contact support', a: "Contact TSPL Group support at +91 73979 71322 or email info@tsplgroup.in. You can also visit our Chakan headquarters or submit an enquiry on our Contact page.", redirect: '/contact-us' },
  { id: 61, q: 'open job listings', a: "We have active job openings across Manufacturing, Auto-assembly, Electronics, and Logistics. Check out our job portal to view requirements, pay packages, and apply directly.", redirect: '/jobs' },
  { id: 62, q: 'how to apply', a: "Browse active roles at /jobs. Select any job listing, read the criteria, and click the 'Apply Now' button to fill out the application form instantly.", redirect: '/jobs' }
];

function loadKB() {
  try {
    const raw = localStorage.getItem(KB_KEY)
    if (!raw) return defaultKB
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return defaultKB
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

// Keywords mapping for Dynamic Context Synthesis
const synthesisKeywords = [
  { keys: ['fee', 'charge', 'money', 'free'], weight: 5, snippet: '⚠️ TSPL charges 100% ZERO FEES from candidates. Job placements, training, registration, and forms are fully FREE. Beware of fraud agents asking for payment!', redirect: '/jobs' },
  { keys: ['naps', 'national apprenticeship'], weight: 5, snippet: 'NAPS offers 25% stipend DBT support up to ₹1,500/month, mandates a 2.5% to 15% workforce quota, and provides full PF/ESIC statutory exemptions.', redirect: '/naps' },
  { keys: ['nats', 'boat', 'degree', 'diploma'], weight: 5, snippet: 'NATS caters to graduate engineers and diploma holders, offering 50% stipend DBT support up to ₹4,500/month for grads and ₹4,000/month for diplomas over a 12-month training period.', redirect: '/nats' },
  { keys: ['maps', 'maharashtra'], weight: 5, snippet: 'Maharashtra MAPS provides state DBT support up to ₹3,500/month per apprentice, integrating with central NAPS to cover Maharashtra residents aged 16-35.', redirect: '/maps' },
  { keys: ['bvoc', 'dvoc', 'mvoc', 'vocational'], weight: 4, snippet: 'Vocational degree paths like B.Voc (3 years) and D.Voc (2-3 years) feature work-integrated learn-and-earn structures, qualifying fully for CSR skilling spends and PF/ESIC exceptions.', redirect: '/bvoc' },
  { keys: ['savings', 'financial', 'pf', 'esic'], weight: 4, snippet: 'Apprenticeship engagements yield high financial savings: trainees are exempt from EPF (12%), ESIC (3.25%), Bonus (8.33%), and Gratuity (4.81%), saving up to 25-30% on employee CTC.', redirect: '/about' },
  { keys: ['client', 'haier', 'lg', 'hyundai'], weight: 3, snippet: 'TSPL manages robust, long-term manpower partnerships with leading conglomerates like Haier, LG Electronics, Voltas, Blue Star, FIAT, and JCB India.', redirect: '/client' },
  { keys: ['jobs', 'apply', 'hiring'], weight: 3, snippet: 'Active openings are available at /jobs. You can submit your candidate profile to get placed immediately under NAPS or B.Voc corporate learn-and-earn roles.', redirect: '/jobs' }
];

export default function ChatBot() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [kb, setKb] = useState(() => loadKB())
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  
  // Interactive Flows: 'idle', 'waiting_for_trainees', 'waiting_for_qualification'
  const [flowState, setFlowState] = useState('idle')

  // Hide chat button on mobile while scrolling
  const [scrollHidden, setScrollHidden] = useState(false)
  const scrollTimerRef = useRef(null)
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (open) return // don't hide when chat is open
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollHidden(true)
          clearTimeout(scrollTimerRef.current)
          scrollTimerRef.current = setTimeout(() => setScrollHidden(false), 1000)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(scrollTimerRef.current)
    }
  }, [open])
  
  const listRef = useRef(null)

  useEffect(() => {
    saveKB(kb)
  }, [kb])

  useEffect(() => {
    if (open && messages.length === 0) {
      // Welcome Greeting
      setMessages([
        { 
          from: 'bot', 
          text: "Welcome to TSPL's Smart Advisory! 👋 I'm here to guide both corporate partners looking for apprenticeship savings and job seekers seeking free career placements under NAPS, NATS, and B.Voc degrees.",
          suggestions: [
            { text: '👔 Find Career Path (Job Seeker)', value: 'TRIGGER_CAREER_FINDER' },
            { text: '📊 Calculate DBT Spends (B2B)', value: 'CALC_SAVINGS' },
            { text: '💼 Free Job Placements Check', value: 'Is there any fee for job seekers?' },
            { text: '🎓 B.Voc Learn-and-Earn Info', value: 'What are B.Voc and D.Voc learn and earn benefits?' },
            { text: '📰 Latest Skilling News', value: 'Fetch latest updates highlight' }
          ]
        }
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, open])

  const handleSuggestion = (val) => {
    if (val === 'CALC_SAVINGS') {
      triggerCalculatorFlow()
      return
    }
    if (val === 'TRIGGER_CAREER_FINDER') {
      triggerCareerFinder()
      return
    }
    setMessages((m) => [...m, { from: 'user', text: val }])
    setTimeout(() => respond(val), 250)
  }

  // Interactive B2B Calculator Flow
  const triggerCalculatorFlow = () => {
    setFlowState('waiting_for_trainees')
    setMessages((m) => [
      ...m,
      { from: 'user', text: '📊 Calculate DBT & Statutory Savings' },
      { 
        from: 'bot', 
        text: "Let's run a custom financial benefit calculation! Select or type the number of trainees/apprentices you wish to hire under NAPS/NATS:",
        calcChips: [50, 100, 250, 500, 1000]
      }
    ])
  }

  const handleCalcSelect = (count) => {
    setFlowState('idle')
    const trainees = parseInt(count, 10)
    if (isNaN(trainees) || trainees <= 0) {
      setMessages((m) => [
        ...m,
        { from: 'bot', text: 'Please enter a valid positive number of trainees.' }
      ])
      return
    }

    const napsDbtMonthly = trainees * 1500
    const natsDbtMonthly = trainees * 4000 
    const statutoryMonthly = trainees * 4200 
    
    const totalNapsMonthly = napsDbtMonthly + statutoryMonthly
    const totalNapsAnnual = totalNapsMonthly * 12

    const totalNatsMonthly = natsDbtMonthly + statutoryMonthly
    const totalNatsAnnual = totalNatsMonthly * 12

    const formatRupee = (num) => {
      if (num >= 10000000) {
        return `₹ ${(num / 10000000).toFixed(2)} Crores`
      }
      if (num >= 100000) {
        return `₹ ${(num / 100000).toFixed(2)} Lakhs`
      }
      return `₹ ${num.toLocaleString('en-IN')}`
    }

    setMessages((m) => [
      ...m,
      { from: 'user', text: `${trainees} Trainees` },
      {
        from: 'bot',
        text: `Here is the comprehensive TSPL Financial Savings Report for engaging ${trainees} Trainees:`,
        receipt: {
          trainees,
          napsDbt: formatRupee(napsDbtMonthly),
          natsDbt: formatRupee(natsDbtMonthly),
          statutory: formatRupee(statutoryMonthly),
          totalMonthly: formatRupee(totalNapsMonthly),
          totalAnnual: formatRupee(totalNapsAnnual),
          totalNatsAnnual: formatRupee(totalNatsAnnual)
        }
      }
    ])
  }

  // Interactive Job Seeker Career Finder Flow
  const triggerCareerFinder = () => {
    setFlowState('waiting_for_qualification')
    setMessages((m) => [
      ...m,
      { from: 'user', text: '👔 Find Career & Placement Path' },
      {
        from: 'bot',
        text: "Let's find the best free industrial skilling and job track for you! Select your highest completed educational qualification below:",
        qualificationChips: [
          { text: '10th / 12th Pass', value: '10th_12th' },
          { text: 'ITI Passed', value: 'iti' },
          { text: 'Diploma Holder', value: 'diploma' },
          { text: 'General Graduate (BSc/BCom/BA)', value: 'general_grad' },
          { text: 'BE / BTech Graduate', value: 'be_btech' }
        ]
      }
    ])
  }

  const handleQualificationSelect = (qualKey) => {
    setFlowState('idle')
    let text = ''
    let redirect = '/jobs'
    let careerHeading = ''

    switch(qualKey) {
      case '10th_12th':
        careerHeading = '10th & 12th Career Path: D.Voc Learn & Earn'
        text = "We recommend the **D.Voc (Diploma of Vocation) Learn-and-Earn program**! You will be placed at major automobile plants in Pune, Aurangabad, or Gujarat. \n\n*   **Monthly Stipend**: ₹11,500 to ₹13,000 per month. \n*   **Facilities**: Subsidized hostel accommodation, bus transport, and subsidized canteen meals. \n*   **Education**: Attend academic classes on weekends to earn an official, AICTE-approved diploma. \n\n🔒 **100% Free Placement**: TSPL never charges any placement fees!"
        redirect = '/dvoc'
        break
      case 'iti':
        careerHeading = 'ITI Career Path: NAPS Apprenticeship'
        text = "We recommend the **NAPS Apprenticeship placement**! Technical trade candidates (Fitter, Turner, Machinist, Welder, Electrician) get placed at world-class companies like JCB India, Haier, or FIAT. \n\n*   **Monthly Stipend**: ₹12,500 to ₹15,000 per month. \n*   **Benefits**: Free safety uniforms, safety shoes, medical coverage, and subsidized canteen meals. \n*   **Certification**: Get an official National Apprenticeship Certificate, highly recognized for government and railway job eligibility."
        redirect = '/naps'
        break
      case 'diploma':
        careerHeading = 'Diploma Career Path: NATS Trainee or B.Voc Degree'
        text = "We recommend the **NATS Apprenticeship or B.Voc degree path**! Get placed as a Diploma Apprentice (DME, DEE, DENT, DCO) in state-of-the-art electronics manufacturing plants (Jabil, LG Electronics). \n\n*   **Monthly Stipend**: ₹14,000 to ₹16,500 per month. \n*   **Hostel & transport**: Substidized rooms, bus transport, and canteens are fully arranged. \n*   **Career**: Option to earn a UGC-approved B.Voc Degree while working full-time, giving you direct growth routes into Senior Associate Engineer roles."
        redirect = '/bvoc'
        break
      case 'general_grad':
        careerHeading = 'Graduate Career Path: NATS General Stream Program'
        text = "We recommend the **NATS General Stream placement**! If you hold a BA, B.Sc, B.Com, or BBA, you get mapped into office administration, corporate logistics, supply chain hubs, or premium banking operations as an apprentice. \n\n*   **Monthly Stipend**: ₹12,000 to ₹14,500 per month. \n*   **Certificate**: Earn a Government BOAT Certificate of Proficiency, validating 1 full year of professional corporate experience."
        redirect = '/nats'
        break
      case 'be_btech':
        careerHeading = 'Engineering Career Path: NATS Graduate Engineer Trainee'
        text = "We recommend the **NATS Graduate Engineer Apprentice Program**! Get placed as a Graduate Apprentice (Mechanical, Electronics, Electrical, CS) in major engineering and automotive conglomerates. \n\n*   **Monthly Stipend**: ₹15,000 to ₹18,000+ per month. \n*   **Experience**: Full hands-on industrial R&D, production assembly lines, or design. This counts as a formal 1-year valid corporate experience check for leading MNCs."
        redirect = '/nats'
        break
      default:
        text = "Search active listings directly on our job board and apply for free!"
        redirect = '/jobs'
    }

    setMessages((m) => [
      ...m,
      {
        from: 'bot',
        text: `Based on your qualification, here is your customized career roadmap:`,
        careerReport: {
          heading: careerHeading,
          details: text,
          redirect
        }
      }
    ])
  }

  const handleSend = () => {
    if (!input.trim()) return
    const text = input.trim()
    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')

    if (flowState === 'waiting_for_trainees') {
      handleCalcSelect(text)
      return
    }

    if (flowState === 'waiting_for_qualification') {
      // Find approximate matching key
      const lower = text.toLowerCase()
      if (lower.includes('10') || lower.includes('12') || lower.includes('school')) {
        handleQualificationSelect('10th_12th')
      } else if (lower.includes('iti')) {
        handleQualificationSelect('iti')
      } else if (lower.includes('diploma')) {
        handleQualificationSelect('diploma')
      } else if (lower.includes('engineer') || lower.includes('tech') || lower.includes('be')) {
        handleQualificationSelect('be_btech')
      } else {
        handleQualificationSelect('general_grad')
      }
      return
    }

    // Check if user is asking about jobs/fees/savings to trigger interactive flows
    const lower = text.toLowerCase()
    if (lower.includes('job') || lower.includes('hiring') || lower.includes('apply') || lower.includes('qualification') || lower.includes('career')) {
      if (lower.includes('fee') || lower.includes('charge') || lower.includes('free')) {
        // let regular flow handle fee warning
      } else {
        triggerCareerFinder()
        return
      }
    }

    if (lower.includes('calc') || lower.includes('saving') || lower.includes('calculator') || lower.includes('fee')) {
      if (lower.includes('seeker') || lower.includes('student') || lower.includes('charge for job')) {
        // direct response
      } else {
        triggerCalculatorFlow()
        return
      }
    }

    setTimeout(() => respond(text), 250)
  }

  const respond = (text) => {
    const normalized = text.toLowerCase()

    // 0. CHECK IF ASKING FOR LATEST UPDATES / NEWS (FETCH FROM BACKEND)
    if (normalized.includes('news') || normalized.includes('update') || normalized.includes('highlight') || normalized.includes('announcement')) {
      setMessages((m) => [...m, { from: 'bot', text: 'Fetching the latest updates and highlights directly from the TSPL newsroom...' }])
      
      fetchNews().then((newsItems) => {
        const shortNews = (newsItems || []).slice(0, 3).map((item) => {
          const imageUrl = item.image ? extractMediaUrl(item.image) : '';
          return {
            id: item.documentId || item.id,
            title: item.title || 'TSPL Announcement',
            date: item.date || '',
            description: item.description || item.content || 'Click below to read details of this central update.',
            image: imageUrl
          };
        });

        if (shortNews.length === 0) {
          setMessages((m) => [
            ...m, 
            { 
              from: 'bot', 
              text: 'No active news items were found in the database. Please visit our main news and announcements board for full history.',
              redirect: '/news-events' 
            }
          ]);
        } else {
          setMessages((m) => [
            ...m, 
            { 
              from: 'bot', 
              text: `Successfully resolved ${shortNews.length} active updates from the Strapi backend CMS:`, 
              news: shortNews,
              redirect: '/news-events' 
            }
          ]);
        }
      }).catch(() => {
        setMessages((m) => [
          ...m, 
          { 
            from: 'bot', 
            text: 'We encountered a connection check while reaching the news server. You can view all announcements directly on our board.',
            redirect: '/news-events' 
          }
        ]);
      });
      return;
    }

    // 0.1 CHECK IF ASKING FOR JOBS (FETCH FROM BACKEND)
    if (normalized.includes('job') || normalized.includes('hiring') || normalized.includes('opening') || normalized.includes('vacancy')) {
      setMessages((m) => [...m, { from: 'bot', text: 'Retrieving live recommended job vacancies from TSPLskilling database...' }])
      
      fetchJobs().then((jobs) => {
        const short = (jobs || []).slice(0, 4).map((j) => ({ 
          id: j.documentId || j.id, 
          title: j.title || j.documentId || `Job ${j.id}`, 
          company: j.company || j.employer || 'TSPL Client Partner', 
          location: j.location || 'India' 
        }));

        if (short.length === 0) {
          setMessages((m) => [
            ...m,
            { 
              from: 'bot', 
              text: 'All our current placements are undergoing final compliance approval. Please visit our central job portal to apply.',
              redirect: '/jobs'
            }
          ]);
        } else {
          setMessages((m) => [
            ...m,
            { 
              from: 'bot', 
              text: `Here are ${short.length} active placements retrieved from the backend:`, 
              jobs: short,
              redirect: '/jobs'
            }
          ]);
        }
      }).catch(() => {
        setMessages((m) => [
          ...m,
          { 
            from: 'bot', 
            text: 'Unable to reach the placements API. You can view and apply for all active listings directly on our job board.',
            redirect: '/jobs'
          }
        ]);
      });
      return;
    }

    // 1. NLP Semantic Keyword Matcher
    let bestMatch = null
    let highestScore = 0

    kb.forEach((entry) => {
      const q = entry.q.toLowerCase()
      let score = 0
      
      if (normalized.includes(q) || q.includes(normalized)) {
        score += 15
      }

      const queryWords = normalized.split(/[^a-zA-Z0-9]+/)
      const kbWords = q.split(/[^a-zA-Z0-9]+/)

      kbWords.forEach((kw) => {
        if (queryWords.includes(kw)) score += 3
      })

      if (score > highestScore) {
        highestScore = score
        bestMatch = entry
      }
    })

    if (bestMatch && highestScore >= 6) {
      setMessages((m) => [...m, { from: 'bot', text: bestMatch.a, redirect: bestMatch.redirect }])
      return
    }

    // 2. Dynamic Context Synthesis Engine
    const activeSnippets = []
    let synthesisScore = 0
    let synthesizedRedirect = '/about'

    synthesisKeywords.forEach((item) => {
      const matchedKey = item.keys.find(k => normalized.includes(k))
      if (matchedKey) {
        activeSnippets.push(item.snippet)
        synthesisScore += item.weight
        synthesizedRedirect = item.redirect || synthesizedRedirect
      }
    })

    if (synthesisScore >= 3) {
      const synthesizedText = `Here is a custom skilling advisory compiled from TSPL's AI Knowledge Base: \n\n${activeSnippets.join(' \n\n')}\n\nFor custom implementation guidelines, please click the redirect link below to view the official guidelines page.`
      setMessages((m) => [
        ...m, 
        { 
          from: 'bot', 
          text: synthesizedText,
          redirect: synthesizedRedirect,
          suggestions: [
            { text: '👔 Find Career Path', value: 'TRIGGER_CAREER_FINDER' },
            { text: '📞 Contact Support', value: 'contact support' }
          ]
        }
      ])
      return
    }

    // 3. Conversational Fallback (Always redirect everything asked to appropriate sections)
    setMessages((m) => [
      ...m, 
      { 
        from: 'bot', 
        text: "I couldn't locate a exact text matches in the manual, but I've linked our central contact page so you can consult a TSPL statutory compliance officer immediately.",
        redirect: '/contact-us',
        suggestions: [
          { text: '👔 Find Career Path', value: 'TRIGGER_CAREER_FINDER' },
          { text: '🎓 B.Voc Learn-and-Earn Info', value: 'What are B.Voc and D.Voc learn and earn benefits?' },
          { text: '📊 Launch savings calculator', value: 'CALC_SAVINGS' }
        ]
      }
    ])
  }

  const handleRedirect = (url) => {
    if (!url) return
    navigate(url)
    setOpen(false)
  }

  return (
    <div>
      <div className={`fixed right-6 bottom-8 z-50 flex flex-col items-end gap-4 transition-all duration-500 ${open ? 'w-[360px] sm:w-[400px]' : ''} ${scrollHidden && !open ? 'translate-y-24 opacity-0 pointer-events-none sm:translate-y-0 sm:opacity-100 sm:pointer-events-auto' : ''}`}>
        
        {/* Chat Drawer container */}
        {open && (
          <div className="w-[340px] sm:w-[380px] max-h-[75vh] min-h-[300px] overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white/95 shadow-2xl backdrop-blur-md flex flex-col justify-between animate-in slide-in-from-bottom duration-300">
            
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-[#0f2a4d] to-[#1a4f87] text-white">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 shrink-0">
                  <Bot className="w-5 h-5 text-orange-400" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-[#0f2a4d] animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black tracking-wide">TSPL Compliance AI</span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1">
                    Live Advisory
                  </span>
                </div>
              </div>
              <button 
                aria-label="Close Advisory" 
                onClick={() => setOpen(false)} 
                className="p-1.5 rounded-xl bg-white/5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Feed */}
            <div 
              ref={listRef} 
              className="flex-1 px-5 py-4 overflow-y-auto max-h-[42vh] space-y-4 bg-slate-50/50 scrollbar-thin"
              style={{ scrollbarWidth: 'thin' }}
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.from === 'bot' ? 'items-start' : 'items-end'}`}>
                  
                  {/* Avatar wrapper */}
                  <div className={`flex items-end gap-2 max-w-[90%] ${m.from === 'bot' ? 'flex-row' : 'flex-row-reverse'}`}>
                    {m.from === 'bot' ? (
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0f2a4d] text-white border border-[#1a4f87]/20 shadow-sm shrink-0">
                        <Bot className="h-3.5 w-3.5 text-orange-400" />
                      </div>
                    ) : (
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500 text-white shadow-sm shrink-0">
                        <User className="h-3.5 w-3.5 text-white" />
                      </div>
                    )}
                    
                    {/* Message content box */}
                    <div className={`rounded-[1.4rem] px-4 py-3 text-xs leading-relaxed font-medium shadow-sm border ${
                      m.from === 'bot' 
                        ? 'bg-white border-slate-100 text-slate-800 rounded-bl-sm' 
                        : 'bg-gradient-to-r from-[#0f2a4d] to-[#1a4f87] border-blue-900/10 text-white rounded-br-sm'
                    }`}>
                      {String(m.text || '').split('\n\n').map((para, pIdx) => (
                        <p key={pIdx} className={pIdx > 0 ? 'mt-2' : ''}>
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Render Custom Career Path Report Card */}
                  {m.careerReport && (
                    <div className="mt-3 pl-9 w-full max-w-[95%] relative z-10">
                      <div className="rounded-3xl border border-orange-100 bg-orange-50/50 p-4 shadow-md backdrop-blur-sm relative overflow-hidden">
                        
                        <div className="absolute right-[-1rem] top-[-1rem] opacity-5">
                          <Sparkles className="h-16 w-16 text-orange-900" />
                        </div>

                        {/* Top anti-fraud advisory tag */}
                        <div className="mb-3 flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-[8.5px] font-black uppercase tracking-wider text-[#FF8C00] border border-orange-200/50 w-fit">
                          <ShieldAlert className="h-3 w-3" />
                          100% Free Placement Guarantee
                        </div>

                        <h4 className="text-[12px] font-black text-[#0f2a4d] mb-2.5 flex items-center gap-1.5">
                          <CheckCircle2 className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                          {m.careerReport.heading}
                        </h4>

                        {/* Splitting details */}
                        <div className="space-y-2 text-[11px] font-semibold text-slate-600 leading-relaxed">
                          {m.careerReport.details.split('\n\n').map((para, pIdx) => (
                            <p key={pIdx}>{para}</p>
                          ))}
                        </div>

                        <button
                          onClick={() => handleRedirect(m.careerReport.redirect)}
                          className="mt-4.5 w-full flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 hover:from-orange-600 hover:to-orange-700 transition-colors shadow-lg shadow-orange-500/15 cursor-pointer"
                        >
                          Explore & Apply for Free
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Render Jobs List Option */}
                  {m.jobs && Array.isArray(m.jobs) && (
                    <div className="mt-3 pl-9 w-full max-w-[90%] space-y-2 relative z-10">
                      {/* Job Seeker Alert Badge */}
                      <div className="flex items-center gap-1.5 rounded-2xl bg-emerald-50 border border-emerald-100/50 px-3.5 py-2 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span className="text-[9px] font-black uppercase tracking-wider text-emerald-700">
                          100% Free Placements • No Fee Charged
                        </span>
                      </div>
                      
                      {m.jobs.map((job) => (
                        <div key={job.id} className="rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm hover:border-[#1a4f87]/20 transition-all">
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <div className="text-[12px] font-black text-[#0f2a4d] truncate">{job.title}</div>
                              <div className="text-[10px] text-slate-500 font-bold truncate mt-0.5">{job.company} • {job.location}</div>
                            </div>
                            <button 
                              onClick={() => handleRedirect(`/job/${job.id}`)} 
                              className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider rounded-xl bg-orange-500 text-white px-3 py-1.5 hover:bg-orange-600 transition-colors shrink-0 shadow-md shadow-orange-500/15 cursor-pointer"
                            >
                              View
                              <ArrowRight className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Render News Highlights Option */}
                  {m.news && Array.isArray(m.news) && (
                    <div className="mt-3 pl-9 w-full max-w-[92%] space-y-3.5 relative z-10">
                      {m.news.map((item) => (
                        <div key={item.id} className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm hover:border-[#1a4f87]/20 transition-all flex flex-col">
                          {item.image && (
                            <img src={item.image} alt={item.title} className="h-24 w-full object-cover" />
                          )}
                          <div className="p-3">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-[8px] font-black uppercase tracking-widest text-[#FF8C00] bg-orange-50 px-2 py-0.5 rounded-md">
                                Announcement
                              </span>
                              {item.date && (
                                <span className="text-[8px] text-slate-400 font-bold">{item.date}</span>
                              )}
                            </div>
                            <h4 className="text-[11px] font-black text-[#0f2a4d] leading-snug line-clamp-2 mb-1">
                              {item.title}
                            </h4>
                            <p className="text-[10px] text-slate-500 leading-normal line-clamp-2 mb-2">
                              {item.description}
                            </p>
                            <button 
                              onClick={() => handleRedirect(`/news-events/${item.id}`)} 
                              className="w-full flex items-center justify-center gap-1 text-[9px] font-black uppercase tracking-widest rounded-xl bg-gradient-to-r from-[#0f2a4d] to-[#1a4f87] text-white py-2 hover:bg-blue-900 transition-colors shadow-sm cursor-pointer"
                            >
                              Read Full Update
                              <ExternalLink className="h-2.5 w-2.5 text-white" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Render Calculator chips input */}
                  {m.calcChips && (
                    <div className="mt-3 pl-9 w-full flex flex-wrap gap-2 relative z-10">
                      {m.calcChips.map((chipVal) => (
                        <button
                          key={chipVal}
                          onClick={() => handleCalcSelect(chipVal)}
                          className="rounded-xl border border-[#1a4f87]/10 bg-[#1a4f87]/5 px-3 py-2 text-[11px] font-bold text-[#0f2a4d] hover:bg-[#0f2a4d] hover:text-white transition-all shadow-sm"
                        >
                          {chipVal} Trainees
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Render Calculator qualification chips input */}
                  {m.qualificationChips && (
                    <div className="mt-3 pl-9 w-full flex flex-wrap gap-2.5 relative z-10">
                      {m.qualificationChips.map((chip) => (
                        <button
                          key={chip.value}
                          onClick={() => handleQualificationSelect(chip.value)}
                          className="rounded-full border border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50 px-3.5 py-2 text-[10.5px] font-black text-slate-700 transition-all flex items-center gap-1 shadow-sm"
                        >
                          {chip.text}
                          <ChevronRight className="h-3 w-3 text-orange-500" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Render Calculator receipt visual card */}
                  {m.receipt && (
                    <div className="mt-3 pl-9 w-full max-w-[95%] relative z-10">
                      <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-4 shadow-md backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute right-[-1.5rem] top-[-1.5rem] opacity-5">
                          <Calculator className="h-20 w-20 text-emerald-900" />
                        </div>

                        <div className="flex items-center gap-2 border-b border-emerald-100/50 pb-2.5 mb-3">
                          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                          <span className="text-[11px] font-black uppercase tracking-widest text-emerald-800">
                            TSPL Savings Receipt
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-500 font-bold">Apprentices Deployed</span>
                            <span className="text-slate-900 font-black">{m.receipt.trainees} trainees</span>
                          </div>
                          
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-500 font-bold">Est. NAPS DBT returns</span>
                            <span className="text-emerald-700 font-black">{m.receipt.napsDbt} / mo</span>
                          </div>

                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-500 font-bold">Or NATS DBT returns</span>
                            <span className="text-blue-700 font-black">{m.receipt.natsDbt} / mo</span>
                          </div>

                          <div className="flex justify-between text-[11px] border-b border-slate-100 pb-2">
                            <span className="text-slate-500 font-bold">Statutory PF/ESIC avoided</span>
                            <span className="text-emerald-700 font-black">{m.receipt.statutory} / mo</span>
                          </div>

                          <div className="flex justify-between text-[11px] pt-1">
                            <span className="text-slate-700 font-black">Total Monthly Saving</span>
                            <span className="text-emerald-700 font-black">{m.receipt.totalMonthly}</span>
                          </div>

                          <div className="flex justify-between text-[11px] pt-1 border-t border-emerald-200/50 mt-1">
                            <span className="text-slate-900 font-black uppercase tracking-wide">NAPS Annualized Savings</span>
                            <span className="text-[#FF8C00] text-sm font-black">{m.receipt.totalAnnual}</span>
                          </div>

                          <div className="flex justify-between text-[11px] pt-0.5">
                            <span className="text-slate-900 font-black uppercase tracking-wide">NATS Annualized Savings</span>
                            <span className="text-blue-700 text-sm font-black">{m.receipt.totalNatsAnnual}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRedirect('/contact-us')}
                          className="mt-4 w-full flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-2.5 hover:from-emerald-700 hover:to-emerald-800 transition-colors shadow-lg shadow-emerald-700/10 cursor-pointer"
                        >
                          Claim Financial Benefit
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Bot deep redirect buttons (ALWAYS REDIRECTS EVERYTHING) */}
                  {m.redirect && (
                    <div className="mt-2.5 pl-9 w-full">
                      <button 
                        onClick={() => handleRedirect(m.redirect)} 
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black uppercase tracking-wider text-[10px] py-2.5 px-4 shadow-md shadow-orange-500/25 active:scale-98 transition-all shrink-0 cursor-pointer"
                      >
                        Explore Program Details
                        <ArrowRight className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  )}

                  {/* Suggestion prompt chips */}
                  {m.suggestions && (
                    <div className="mt-3 pl-9 w-full flex flex-wrap gap-2 relative z-10">
                      {m.suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestion(s.value)}
                          className="rounded-full border border-slate-200 bg-white hover:border-[#FF8C00]/30 hover:bg-orange-50 px-3 py-1.5 text-[10px] font-black tracking-wide text-slate-700 transition-all flex items-center gap-1 shadow-sm"
                        >
                          {s.text}
                          <ChevronRight className="h-2.5 w-2.5 text-[#FF8C00]" />
                        </button>
                      ))}
                    </div>
                  )}

                </div>
              ))}
            </div>

            {/* Prompt Quick Action Carousel Overlay */}
            <div className="px-4 py-2 border-t border-slate-100 bg-white overflow-x-auto flex gap-2 scrollbar-none select-none">
              <button 
                onClick={triggerCareerFinder}
                className="shrink-0 flex items-center gap-1 rounded-full bg-orange-50 hover:bg-orange-100 border border-orange-100 px-3 py-1.5 text-[10px] font-black text-[#FF8C00] transition-colors"
              >
                <FileText className="h-3 w-3" />
                Find Career Path
              </button>
              <button 
                onClick={triggerCalculatorFlow}
                className="shrink-0 flex items-center gap-1 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-100 px-3 py-1.5 text-[10px] font-black text-[#1a4f87] transition-colors"
              >
                <Calculator className="h-3 w-3" />
                Corporate DBT Calculator
              </button>
              <button 
                onClick={() => handleSuggestion('Is there any fee for job seekers?')}
                className="shrink-0 flex items-center gap-1 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 px-3 py-1.5 text-[10px] font-black text-emerald-700 transition-colors"
              >
                <ShieldAlert className="h-3 w-3" />
                No-Fee Placements
              </button>
              <button 
                onClick={() => handleSuggestion('Fetch latest updates highlight')}
                className="shrink-0 flex items-center gap-1 rounded-full bg-orange-50 hover:bg-orange-100 border border-orange-100 px-3 py-1.5 text-[10px] font-black text-[#FF8C00] transition-colors"
              >
                <Sparkles className="h-3 w-3" />
                Latest updates
              </button>
            </div>

            {/* Input Bar */}
            <div className="px-5 py-3 border-t border-slate-100 bg-white rounded-b-[2rem]">
              <div className="flex gap-2">
                <input 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
                  placeholder={flowState === 'waiting_for_trainees' ? "Type trainee number..." : flowState === 'waiting_for_qualification' ? "Type qualification (e.g. ITI)..." : "Ask about jobs, stipend, or NAPS..."} 
                  className="flex-1 rounded-2xl border border-slate-200/80 px-4 py-2 text-xs font-semibold focus:outline-none focus:border-[#1a4f87] focus:ring-1 focus:ring-[#1a4f87] bg-slate-50/50" 
                />
                <button 
                  onClick={handleSend} 
                  className="p-2.5 rounded-2xl bg-gradient-to-r from-[#0f2a4d] to-[#1a4f87] hover:from-[#1a4f87] hover:to-[#0f2a4d] text-white transition-all shadow-md shadow-blue-900/10"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Live Chat Bubble Trigger Button */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Open Live Advisory Chatbot"
          className="group relative rounded-full bg-gradient-to-br from-[#0f2a4d] to-[#1a4f87] text-white p-4 shadow-2xl hover:scale-105 transition-transform duration-300 ring-4 ring-white border border-[#1a4f87]/30 flex items-center justify-center shrink-0 cursor-pointer"
        >
          {/* Active pulse aura when closed */}
          {!open && (
            <span className="absolute inset-0 rounded-full border border-orange-400/40 opacity-40 scale-125 animate-ping pointer-events-none" />
          )}
          
          {open ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <MessageSquare className="w-5 h-5 text-orange-400 group-hover:rotate-6 transition-transform" />
          )}
        </button>
      </div>
    </div>
  )
}