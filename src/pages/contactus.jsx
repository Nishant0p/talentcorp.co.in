import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getPageAsset, usePageAssets } from '../hooks/usePageAssets';
import { STRAPI_BASE_URL, submitLead, submitToAdminBackend } from '../utils/strapi';
import useSEO from '../hooks/useSEO';
import { submitToGoogleSheet } from '../utils/googleSheets';
import {
  Phone,
  Mail,
  MapPin,
  Building,
  ArrowRight,
  Check,
  Send,
  ExternalLink,
} from 'lucide-react';

const serviceOptions = [
  { value: 'NATS', label: 'NATS' },
  { value: 'NAPS', label: 'NAPS' },
  { value: 'B.VOC', label: 'B.VOC' },
  { value: 'D.VOC', label: 'D.VOC' },
  { value: 'FLEXI ITI', label: 'FLEXI ITI' },
  { value: 'AEDP', label: 'AEDP' },
  { value: 'MAPS', label: 'MAPS' },
  { value: 'SECURITY', label: 'SECURITY' },
  { value: 'SKILLED JOB', label: 'SKILLED JOB' },
  { value: 'HOUSEKEEPING', label: 'HOUSEKEEPING' },
  { value: 'MANPOWER', label: 'MANPOWER' },
  { value: 'CONTRACT', label: 'CONTRACT' },
  { value: 'COMPLIANCE', label: 'COMPLIANCE' },
  { value: 'PAYROLL', label: 'PAYROLL' },
  { value: 'B2B', label: 'B2B' },
];

const officeLocations = [
  {
    city: 'Head Office (Pune)',
    short: 'Pune HQ',
    company: 'TalentCorp Solutions Private Limited',
    address: 'Office No. 111,112,113,103 First Floor, Shree Gajanan Commercial Complex, Chakan- Talegaon Road, Chakan Tal. Khed, Dist. Pune, Maharashtra 410501',
    calls: ['+91 7397971322'],
    emails: ['info@tsplgroup.in', 'hrd1@tsplgroup.in'],
    lat: 18.7594, lng: 73.8567, zoom: 16,
    mapQuery: 'Shree+Gajanan+Commercial+Complex+Chakan+Pune+Maharashtra+410501',
  },
  {
    city: 'Pune – Viman Nagar (Corporate)',
    short: 'Viman Nagar',
    company: 'TalentCorp Solutions Private Limited',
    address: 'Nyati Empress – Office No. A-308, Viman Nagar Road, Next to Baker Gauges India Pvt. Ltd., Clover Park, Viman Nagar, Pune, Maharashtra – 411014',
    calls: ['+91 7397971322'],
    emails: ['info@tsplgroup.in'],
    lat: 18.5645, lng: 73.9140, zoom: 16,
    mapQuery: 'Nyati+Empress+Viman+Nagar+Road+Clover+Park+Viman+Nagar+Pune+411014',
  },
  {
    city: 'Mumbai',
    short: 'Mumbai',
    company: 'TalentCorp Solutions Private Limited',
    address: 'White House, Six Floor, Office No. 605, SV Road, Opposite to Andheri Metro Station West, Mumbai, Maharashtra - 400 058, India',
    calls: ['+91 7397971322'],
    emails: ['mumbai@tsplgroup.in'],
    lat: 19.1186, lng: 72.8498, zoom: 16,
    mapQuery: 'White+House+605+SV+Road+Andheri+West+Mumbai+400058',
  },
  {
    city: 'Ranjangaon',
    short: 'Ranjangaon',
    company: 'TalentCorp Solutions Private Limited',
    address: '2nd Floor, Soham Apartment, Opposite to ICICI Bank, Ranjangaon (Pune), Maharashtra, India',
    calls: ['+91 7397971322'],
    emails: ['ranjangaon@tsplgroup.in'],
    lat: 18.7264, lng: 74.6019, zoom: 15,
    mapQuery: 'Soham+Apartment+Opposite+ICICI+Bank+Ranjangaon+Pune+Maharashtra',
  },
  {
    city: 'Osmanabad',
    short: 'Osmanabad',
    company: 'TalentCorp Solutions Private Limited',
    address: 'Office No- 2, Mahalaxmi Complex, Opposite Collector Office, Osmanabad, Maharashtra - 413501, India',
    calls: ['+91 7397971322'],
    emails: ['osmanabad@tsplgroup.in'],
    lat: 18.1770, lng: 76.0435, zoom: 15,
    mapQuery: 'Mahalaxmi+Complex+Collector+Office+Osmanabad+Maharashtra+413501',
  },
  {
    city: 'Talegaon Dabhade',
    short: 'Talegaon',
    company: 'TalentCorp Solutions Private Limited',
    address: 'office no G -1/2, City plaza, next to Bank of Maharashtra, near Railway station, Talegaon Dabhade, Talegaon Dabhade R, Maharashtra 410507',
    calls: ['+91 7397971322'],
    emails: ['info@tsplgroup.in'],
    lat: 18.7289, lng: 73.6789, zoom: 16,
    mapQuery: 'City+plaza+Bank+of+Maharashtra+Railway+station+Talegaon+Dabhade+Maharashtra+410507',
  },
  {
    city: 'Mahalunge (Pune)',
    short: 'Mahalunge',
    company: 'TalentCorp Solutions Private Limited',
    address: 'Near Apex Hospital, Chakan-Talegaon Road, Mahalunge, Taluka Khed, District Pune, Maharashtra',
    calls: ['+91 7397971322'],
    emails: ['info@tsplgroup.in'],
    lat: 18.7482, lng: 73.8035, zoom: 15,
    mapQuery: 'Near+Apex+Hospital+Chakan-Talegaon+Road+Mahalunge+Taluka+Khed+District+Pune',
  },
  {
    city: 'Nashik',
    short: 'Nashik',
    company: 'TalentCorp Solutions Private Limited',
    address: '2nd Floor, Tadake building, near Vijay Nagar Bus Stop , Vijay Nagar, CIDCO , Nashik, Maharashtra 422009.',
    calls: ['+91 8208752994'],
    emails: ['vikas.patil@tsplgroup.in'],
    lat: 19.9678, lng: 73.7667, zoom: 15,
    mapQuery: 'Tadake+building+Vijay+Nagar+Bus+Stop+CIDCO+Nashik+Maharashtra+422009',
  },
  {
    city: 'Chennai',
    short: 'Chennai',
    company: 'TalentCorp Solutions Private Limited',
    address: 'No 1/44, 2nd Floor, Vallar Complex, G.S.T Road, Signaperumal Koil, Kancheepuram District, Chennai, Tamil Nadu - 603204, India',
    calls: ['+91 9488910028'],
    emails: ['chennai@tsplgroup.in'],
    lat: 12.7194, lng: 79.9861, zoom: 15,
    mapQuery: 'Vallar+Complex+GST+Road+Signaperumal+Koil+Kancheepuram+603204',
  },
  {
    city: 'Ghaziabad',
    short: 'Ghaziabad',
    company: 'TalentUp Services (India) Private Limited',
    address: 'S-32 Shop No. 3 Gf - Dlf, Ankur Vihar Loni, Ghaziabad, Uttar Pradesh - 201102, India',
    calls: ['+91 8484035542'],
    emails: ['info@talentup.in'],
    lat: 28.7378, lng: 77.3065, zoom: 15,
    mapQuery: 'Ankur+Vihar+Loni+Ghaziabad+Uttar+Pradesh+201102',
  },
  {
    city: 'Bhubaneswar',
    short: 'Bhubaneswar',
    company: 'TalentCorp Solutions Private Limited',
    address: 'Maha Laxmi Bhawan, Jai Dev Vihar, Near Hotel MAYFAIR Lagoon, Bhubaneswar, Odisha - 751013, India',
    calls: ['+91 7397971322'],
    emails: ['bhubaneswar@tsplgroup.in'],
    lat: 20.3011, lng: 85.8193, zoom: 15,
    mapQuery: 'Jai+Dev+Vihar+Hotel+MAYFAIR+Lagoon+Bhubaneswar+Odisha+751013',
  },
  {
    city: 'Bangladesh (Chittagong)',
    short: 'Bangladesh',
    company: 'TalentCorp Solutions Private Limited',
    address: '11 no Office, Chobila Complex (2nd Floor), 8/3 Hazari Lane, Anderkilla, Kotwali, Chittagong',
    calls: ['01830086926', '01837489420'],
    emails: ['bangladesh@tsplgroup.in'],
    lat: 22.3414, lng: 91.8362, zoom: 15,
    mapQuery: 'Hazari+Lane+Anderkilla+Kotwali+Chittagong+Bangladesh',
    isBangladesh: true,
  },
];

const ContactUs = () => {
  useSEO({
    title: "Contact TSPL Group - Recruitment & Staffing Offices",
    description: "Get in touch with TSPL Group for corporate hiring packages or job placement inquiries. Pune, Mumbai, and PAN India locations.",
    keywords: "Hire Skilled Talent, Staffing Agency Contact, Pune Staffing Office, TSPL Group Office, TalentCorp Contact"
  });
  const pageAssets = usePageAssets();
  const contactHeroAsset = getPageAsset(
    pageAssets,
    'contact.hero',
    'https://v0-improve-ui-design-weld-six.vercel.app/images/contact-hero-bg.jpg',
    'Office Meeting'
  );
  const [isFormHovered, setIsFormHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showPlaneAnimation, setShowPlaneAnimation] = useState(false);
  const [isFormFlyingAway, setIsFormFlyingAway] = useState(false);
  const [flightManifest, setFlightManifest] = useState([]);
  const [submitError, setSubmitError] = useState('');
  const [submitStatusNote, setSubmitStatusNote] = useState('');
  const [selectedOffice, setSelectedOffice] = useState(officeLocations[0]);

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    setIsSubmitting(true);
    setShowSuccessPopup(false);
    setShowPlaneAnimation(true);
    setIsFormFlyingAway(false);
    setSubmitError('');
    setSubmitStatusNote('');

    const formData = new FormData(formElement);
    const normalizedData = {
      fullName: String(formData.get('fullName') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      service: String(formData.get('service') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      consent: Boolean(formData.get('consent')),
    };

    const failValidation = (message) => {
      setShowSuccessPopup(false);
      setShowPlaneAnimation(false);
      setIsFormFlyingAway(false);
      setFlightManifest([]);
      setSubmitError(message);
      setIsSubmitting(false);
    };

    if (normalizedData.phone.length < 5) { failValidation('Phone number must be at least 5 characters.'); return; }
    if (normalizedData.message.length < 10) { failValidation('Message must be at least 10 characters.'); return; }

    const leadPayload = { data: { name: normalizedData.fullName, email: normalizedData.email, phone: normalizedData.phone, subject: normalizedData.service, message: normalizedData.message, consent: normalizedData.consent } };
    const sheetsData = { fullName: normalizedData.fullName, email: normalizedData.email, phone: normalizedData.phone, service: normalizedData.service, message: normalizedData.message, consent: normalizedData.consent };
    const manifestEntries = [
      { label: 'Name', value: normalizedData.fullName },
      { label: 'Email', value: normalizedData.email },
      { label: 'Phone', value: normalizedData.phone },
      { label: 'Service', value: normalizedData.service },
      { label: 'Message', value: normalizedData.message.slice(0, 42) },
    ].filter((e) => e.value);
    setFlightManifest(manifestEntries.length ? manifestEntries : [{ label: 'Status', value: 'Sending...' }]);

    try {
      const [strapiResult, sheetResult, adminBackendResult] = await Promise.allSettled([
        submitLead(leadPayload.data),
        submitToGoogleSheet(sheetsData),
        submitToAdminBackend('contact', { name: normalizedData.fullName, email: normalizedData.email, phone: normalizedData.phone, message: normalizedData.message, metadata: { service: normalizedData.service, consent: normalizedData.consent } }),
      ]);
      const crmOk = strapiResult.status === 'fulfilled';
      const sheetOk = sheetResult.status === 'fulfilled' && (sheetResult.value.status === 'success' || sheetResult.value.status === 'skipped');
      const adminOk = adminBackendResult.status === 'fulfilled' && adminBackendResult.value.ok !== false;

      if (crmOk || sheetOk || adminOk) {
        setSubmitStatusNote('Response sent successfully.');
      } else {
        const crmError = strapiResult.status === 'rejected' ? strapiResult.reason?.message || 'CRM submission failed.' : null;
        const sheetError = sheetResult.status === 'rejected' ? sheetResult.reason?.message || 'Google Sheet submission failed.' : sheetResult.value?.message || 'Google Sheet submission failed.';
        throw new Error(`${crmError || 'CRM submission failed.'} ${sheetError || ''}`.trim());
      }

      formElement.reset();
      setFlightManifest(manifestEntries.slice(0, 5));
      setIsFormFlyingAway(true);
      setShowPlaneAnimation(true);
      setShowSuccessPopup(true);
      window.setTimeout(() => { setShowPlaneAnimation(false); setFlightManifest([]); }, 2200);
      window.setTimeout(() => setIsFormFlyingAway(false), 2500);
    } catch (error) {
      setShowSuccessPopup(false);
      setShowPlaneAnimation(false);
      setIsFormFlyingAway(false);
      setFlightManifest([]);
      setSubmitError(error?.message || 'Unable to submit contact form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Lock maps specifically to Pune Head Office
  const headOffice = officeLocations[0];
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${headOffice.lat},${headOffice.lng}&output=embed&z=${headOffice.zoom}`;
  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${headOffice.mapQuery}`;

  return (
    <div className="font-sans text-gray-800 bg-white antialiased">
      <style>{`
        @keyframes contactOrbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes popupTimerShrink { from { transform: scaleX(1); } to { transform: scaleX(0); } }
        @keyframes shimmerSlide {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-18px) scale(1.1); opacity: 1; }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .contact-input {
          width: 100%;
          padding: 14px 20px;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          color: #fff;
          font-size: 15px;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          backdrop-filter: blur(4px);
        }
        .contact-input::placeholder { color: rgba(255,255,255,0.38); }
        .contact-input:focus {
          border-color: rgba(251,146,60,0.7);
          background: rgba(255,255,255,0.1);
          box-shadow: 0 0 0 3px rgba(251,146,60,0.18), 0 0 20px rgba(251,146,60,0.1);
        }
        .contact-input option { background: #1e293b; color: #fff; }
        .contact-submit-btn {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #f97316, #ea580c, #f97316);
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
          border: none;
          border-radius: 14px;
          color: white;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.03em;
          padding: 15px 32px;
          width: 100%;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.25s ease;
          box-shadow: 0 6px 24px rgba(249,115,22,0.35);
        }
        .contact-submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 32px rgba(249,115,22,0.5);
        }
        .contact-submit-btn:active { transform: scale(0.98); }
        .contact-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; animation: none; }
        .contact-submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          background-size: 200% 100%;
          animation: shimmerSlide 2.5s infinite;
        }
        .contact-label { display: block; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 7px; }
        .info-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14);
          border-radius: 100px; padding: 8px 16px; font-size: 13px; color: rgba(255,255,255,0.75);
          transition: background 0.2s;
        }
        .info-badge:hover { background: rgba(255,255,255,0.14); }
        .info-badge-icon {
          width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          background: rgba(249,115,22,0.2); color: #fb923c; flex-shrink: 0;
        }
      `}</style>

      {/* === HERO === */}
      <header className="relative bg-gray-900 min-h-[100svh] md:min-h-[86vh] flex flex-col">
        <div className="absolute inset-0 z-0">
          <img src={contactHeroAsset.url} alt={contactHeroAsset.alt || 'Office Meeting'} className="w-full h-full object-cover object-center opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/40 to-black/65" />
        </div>
        <Navbar />
        <div className="relative z-10 flex flex-grow items-center max-w-7xl mx-auto w-full px-6 pt-28 pb-12 md:pt-10 md:pb-20">
          <div className="grid w-full items-end gap-10 lg:grid-cols-2">
            <div className="max-w-2xl pt-6 md:pt-10 lg:pt-14">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                Let's Connect<br />& <span className="text-blue-500">Build the Future</span><br />Workforce
              </h1>
              <p className="text-gray-300 text-lg max-w-lg">Scale your business towards your highest potential. Our experts are ready to catalyze your growth.</p>
            </div>

          </div>
        </div>
      </header>

      {/* === PREMIUM CONTACT FORM === */}
      <section className="relative z-20 -mt-10 sm:-mt-20 py-12 sm:py-24 px-4 sm:px-8"
        style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 55%, #0c1a2e 100%)' }}>

        {/* Decorative floating orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:'absolute', width:420, height:420, borderRadius:'50%', background:'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)', top:'-80px', right:'10%', filter:'blur(40px)' }} />
          <div style={{ position:'absolute', width:320, height:320, borderRadius:'50%', background:'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', bottom:'5%', left:'5%', filter:'blur(40px)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-14 lg:hidden">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
              style={{ background:'rgba(249,115,22,0.15)', color:'#fb923c', border:'1px solid rgba(249,115,22,0.25)' }}>
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              Start a Conversation
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base">
              Tell us what you need — our specialists will respond within 24 hours with a tailored solution.
            </p>
          </div>

          {/* Main card grid */}
          <div className="grid lg:grid-cols-[420px_1fr] gap-0 rounded-[2.5rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.6)]">

            {/* ── LEFT: Info Panel ── */}
            <div className="relative flex flex-col justify-between p-10 overflow-hidden"
              style={{ background:'linear-gradient(145deg, #1d4ed8 0%, #1e3a8a 40%, #0f2470 100%)' }}>

              {/* Decorative pattern */}
              <div className="pointer-events-none absolute inset-0">
                <div style={{ position:'absolute', width:280, height:280, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.06)', top:'-60px', right:'-80px' }} />
                <div style={{ position:'absolute', width:180, height:180, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.06)', top:'-20px', right:'-40px' }} />
                <div style={{ position:'absolute', width:200, height:200, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.06)', bottom:'80px', left:'-60px' }} />
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    position:'absolute', width:8, height:8, borderRadius:'50%',
                    background:'rgba(249,115,22,0.6)',
                    bottom: `${20 + i * 28}%`, right: `${15 + i * 8}%`,
                    animation: `floatDot ${2.4 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.4}s`
                  }} />
                ))}
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Contact Information</h3>
                <p className="text-blue-200 text-sm mb-10 leading-relaxed">We're here to help and answer any question you might have.</p>

                <div className="space-y-6">
                  <a href="tel:+917397971322" className="flex items-center gap-4 group">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110"
                      style={{ background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)' }}>
                      <Phone size={18} className="text-orange-400" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-300 mb-0.5">Phone</p>
                      <p className="text-white font-semibold text-sm group-hover:text-orange-300 transition-colors">+91 7397971322</p>
                      <p className="text-blue-300 text-xs">Mon – Fri, 9AM – 6PM</p>
                    </div>
                  </a>

                  <a href="mailto:info@tsplgroup.in" className="flex items-center gap-4 group">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110"
                      style={{ background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)' }}>
                      <Mail size={18} className="text-orange-400" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-300 mb-0.5">Email</p>
                      <p className="text-white font-semibold text-sm group-hover:text-orange-300 transition-colors">info@tsplgroup.in</p>
                      <p className="text-blue-300 text-xs">hrd1@tsplgroup.in</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)' }}>
                      <MapPin size={18} className="text-orange-400" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-300 mb-0.5">Head Office</p>
                      <p className="text-white font-semibold text-sm">Chakan, Pune</p>
                      <p className="text-blue-300 text-xs leading-relaxed">Shree Gajanan Complex, Maharashtra 410501</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="relative z-10 mt-10 pt-8 border-t border-white/10">
                <div className="grid grid-cols-2 gap-6">
                  {[['36+', 'Offices Nationwide'], ['15+', 'Years of Excellence']].map(([num, label]) => (
                    <div key={label}>
                      <p className="text-2xl font-black text-white">{num}</p>
                      <p className="text-blue-300 text-xs mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Form Panel ── */}
            <div className="relative overflow-hidden p-8 sm:p-12"
              style={{ background:'rgba(15,23,42,0.95)', backdropFilter:'blur(20px)' }}>

              <AnimatePresence>
                {showPlaneAnimation && (
                  <motion.div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="absolute left-4 right-4 bottom-6 top-6">
                      {(flightManifest.length ? flightManifest : [{ label: 'Message', value: 'Delivered' }]).map((entry, index) => (
                        <motion.div key={`${entry.label}-${index}`} className="absolute left-0 flex max-w-[80%] items-center gap-2 rounded-full border border-orange-200/30 bg-white/10 px-3 py-1.5 backdrop-blur"
                          initial={{ opacity: 0, x: -24, y: 20 + index * 40, scale: 0.98, rotate: -3 }}
                          animate={{ opacity: [0,1,1,0.65,0], x: [-24,0,56,128+index*4,214], y: [20+index*40,20+index*36,18+index*20,6-index*8,-8], scale: [0.98,1,0.95,0.68,0.25], rotate: [-3,0,3,-7,-20] }}
                          transition={{ duration: 1.9, ease: 'easeInOut', delay: index * 0.08 }}
                        >
                          <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-300">{entry.label}</span>
                          <span className="max-w-[170px] truncate text-xs font-medium text-white/70">{entry.value}</span>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div className="absolute left-[53%] bottom-[24%] z-10 flex h-10 w-14 items-center justify-center rounded-[40%_50%_45%_48%] shadow-[0_20px_60px_rgba(249,115,22,0.3)]"
                      style={{ background:'linear-gradient(135deg, rgba(249,115,22,0.9), rgba(234,88,12,0.9))', border:'1px solid rgba(249,115,22,0.4)' }}
                      initial={{ x: -22, y: 40, scale: 0.45, rotate: -26, opacity: 0 }}
                      animate={{ x: [-22,8,54,126,200], y: [40,4,-36,-86,-144], rotate: [-26,-8,12,24,36], scale: [0.45,1,1.03,1.05,0.94], opacity: [0,1,1,1,0] }}
                      transition={{ duration: 2, ease: 'easeInOut' }}
                    >
                      <Send size={17} className="text-white" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div animate={isFormFlyingAway ? { opacity: 0, y: -34, x: 58, rotate: -12, scale: 0.9, filter: 'blur(1.5px)' } : { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 0.8, ease: 'easeInOut' }}>

                <div className="mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Send us a Message</h3>
                  <p className="text-slate-400 text-sm">Fill in the details below and we'll get back to you shortly.</p>
                </div>

                <form className="space-y-5" onSubmit={handleContactSubmit}>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="contact-label">Full Name</label>
                      <input name="fullName" type="text" placeholder="John Doe" required className="contact-input" />
                    </div>
                    <div>
                      <label className="contact-label">Phone Number</label>
                      <input name="phone" type="tel" placeholder="+91 98765 43210" minLength={5} required className="contact-input" />
                    </div>
                  </div>

                  <div>
                    <label className="contact-label">Email Address</label>
                    <input name="email" type="email" placeholder="hello@company.com" required className="contact-input" />
                  </div>

                  <div>
                    <label className="contact-label">Service Interested In</label>
                    <select name="service" required defaultValue="" className="contact-input" style={{ cursor:'pointer' }}>
                      <option value="" disabled hidden>Select a service...</option>
                      {serviceOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="contact-label">Your Message</label>
                    <textarea name="message" rows="4" placeholder="Tell us how we can help you..." minLength={10} required className="contact-input" style={{ borderRadius:'14px', resize:'vertical' }} />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer" style={{ padding:'12px 16px', borderRadius:'12px', border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.04)' }}>
                    <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 rounded border-gray-600 text-orange-500 focus:ring-orange-500 focus:ring-offset-0 flex-shrink-0" style={{ accentColor:'#f97316' }} />
                    <span className="text-xs text-slate-400 leading-relaxed">
                      <Check size={12} className="inline mr-1 text-orange-400" />
                      I agree to receive communications from TalentCorp Solutions via WhatsApp, Email &amp; other channels.
                    </span>
                  </label>

                  <button type="submit" disabled={isSubmitting} className="contact-submit-btn">
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2 relative z-10">
                        <Send size={16} />
                        Send Message
                      </span>
                    )}
                  </button>
                </form>

                {submitError && (
                  <div className="mt-4 rounded-2xl px-4 py-3 text-sm" style={{ border:'1px solid rgba(239,68,68,0.3)', background:'rgba(239,68,68,0.08)', color:'#fca5a5' }}>
                    <p className="font-semibold">Submission failed</p>
                    <p className="mt-1 break-words opacity-80">{submitError}</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {showSuccessPopup && (
            <div className="fixed left-1/2 top-6 z-[9999] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-[2rem] px-6 py-5 shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
              style={{ background:'linear-gradient(135deg, #1e293b, #0f172a)', border:'1px solid rgba(249,115,22,0.3)' }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background:'rgba(249,115,22,0.2)' }}>
                    <Check size={16} className="text-orange-400" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">Message sent successfully!</p>
                    <p className="mt-0.5 text-sm text-slate-400">We'll get back to you within 24 hours.</p>
                    {submitStatusNote && <p className="mt-1 text-xs font-medium text-orange-400">{submitStatusNote}</p>}
                  </div>
                </div>
                <button type="button" onClick={() => setShowSuccessPopup(false)} className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:text-white transition-colors" style={{ background:'rgba(255,255,255,0.08)' }} aria-label="Close">×</button>
              </div>
              <div className="mt-4 h-0.5 w-full overflow-hidden rounded-full" style={{ background:'rgba(255,255,255,0.08)' }}>
                <div className="h-full w-full origin-left rounded-full" style={{ background:'linear-gradient(90deg, #f97316, #fb923c)', animation: 'popupTimerShrink 4s linear forwards' }} onAnimationEnd={() => setShowSuccessPopup(false)} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* === INTERACTIVE MAP SECTION === */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-12 px-4 sm:py-24 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-2">Our Presence</p>
            <h2 className="text-4xl font-bold mb-3">Find Us Across India</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Select any office below — the map zooms straight to that address on Google Maps.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">

            {/* LEFT — Google Map embed (updates on office select) */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-blue-100 bg-white">
              {/* Static Office Map Header */}
              <div className="flex flex-wrap gap-2 p-4 border-b border-gray-100 bg-white items-center">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded-full text-xs font-semibold shadow-sm inline-flex items-center gap-1.5">
                  📍 Head Office (Pune HQ) Map
                </span>
              </div>

              {/* Google Maps iframe */}
              <AnimatePresence mode="wait">
                <motion.div
                  key="headoffice-map"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-[480px]"
                >
                  <iframe
                    title={`Map - ${selectedOffice.city}`}
                    src={googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Footer bar with directions link */}
              <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-700 truncate max-w-[60%]">
                  📌 Head Office (Pune)
                </p>
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-full transition-colors"
                >
                  <ExternalLink size={12} /> Get Directions
                </a>
              </div>
            </div>

            {/* RIGHT — Office list + detail card */}
            <div className="flex flex-col gap-4">
              {/* Office list */}
              <div className="rounded-2xl border border-blue-100 bg-white shadow-sm overflow-hidden">
                <div className="px-4 py-3 bg-blue-600 text-white text-sm font-bold tracking-wide flex items-center gap-2">
                  <MapPin size={14} /> All Offices
                </div>
                <div className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto">
                  {officeLocations.map((office) => {
                    const isActive = selectedOffice.city === office.city;
                    return (
                      <button
                        key={office.city}
                        onClick={() => setSelectedOffice(office)}
                        className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${isActive ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                      >
                        <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-blue-600' : 'bg-gray-300'}`} />
                        <div>
                          <p className={`text-sm font-semibold ${isActive ? 'text-blue-700' : 'text-gray-700'}`}>{office.city}</p>
                          <p className="text-[11px] text-gray-400 line-clamp-1">{office.address.slice(0, 55)}…</p>
                        </div>
                        {office.isBangladesh && <span className="ml-auto shrink-0 text-[9px] bg-yellow-100 text-yellow-700 font-bold px-2 py-0.5 rounded-full">INTL</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected office card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedOffice.city}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-blue-100 bg-white shadow-md overflow-hidden"
                >
                  <div className="px-5 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <div className="flex items-center gap-2">
                      {selectedOffice.city.includes('Head Office') ? <Building size={16} /> : <MapPin size={16} />}
                      <p className="font-bold">{selectedOffice.city}</p>
                      {selectedOffice.isBangladesh && <span className="ml-auto text-[10px] bg-yellow-400 text-yellow-900 font-bold px-2 py-0.5 rounded-full">International</span>}
                    </div>
                    <p className="text-blue-200 text-xs mt-1">{selectedOffice.company}</p>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    <p className="text-sm text-gray-600 leading-relaxed">{selectedOffice.address}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <div>
                        <p className="text-[11px] font-semibold text-gray-400 uppercase mb-1">Call</p>
                        {selectedOffice.calls.map((c) => (
                          <a key={c} href={`tel:${c.replace(/\s+/g, '')}`} className="block text-blue-600 hover:text-blue-800 font-medium">{c}</a>
                        ))}
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-gray-400 uppercase mb-1">Email</p>
                        {selectedOffice.emails.map((e) => (
                          <a key={e} href={`mailto:${e}`} className="block text-orange-600 hover:text-orange-800 font-medium">{e}</a>
                        ))}
                      </div>
                    </div>
                    {selectedOffice.city.includes('Head Office') && (
                      <a
                        href={googleMapsDirectionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-full transition-colors w-fit"
                      >
                        <ExternalLink size={13} /> Open in Google Maps
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
