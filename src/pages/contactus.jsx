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

      if (crmOk && sheetOk && adminOk) setSubmitStatusNote('Response sent successfully. Saved to CRM, Google Sheet, and Admin Panel.');
      else if (crmOk && sheetOk) setSubmitStatusNote('Response sent successfully. Saved to CRM and Google Sheet.');
      else if (crmOk && adminOk) setSubmitStatusNote('Response sent successfully. Saved to CRM and Admin Panel.');
      else if (sheetOk && adminOk) setSubmitStatusNote('Response sent successfully. Saved to Google Sheet and Admin Panel.');
      else if (crmOk) setSubmitStatusNote('Response sent successfully. Saved to CRM.');
      else if (sheetOk) setSubmitStatusNote('Response sent successfully. Saved to Google Sheet.');
      else if (adminOk) setSubmitStatusNote('Response sent successfully. Saved to Admin Panel.');
      else {
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

  // Use lat,lng for embed so a red pin always appears on the exact location
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${selectedOffice.lat},${selectedOffice.lng}&output=embed&z=${selectedOffice.zoom}`;
  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${selectedOffice.mapQuery}`;

  return (
    <div className="font-sans text-gray-800 bg-white antialiased">
      <style>{`
        @keyframes contactOrbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes popupTimerShrink { from { transform: scaleX(1); } to { transform: scaleX(0); } }
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
                Let's Connect<br />&amp; <span className="text-blue-500">Build the Future</span><br />Workforce
              </h1>
              <p className="text-gray-300 text-lg max-w-lg">Scale your business towards your highest potential. Our experts are ready to catalyze your growth.</p>
            </div>
            <div className="lg:justify-self-end lg:text-right">
              <div className="mb-10 flex flex-wrap gap-4 lg:justify-end">
                <Link to="/jobs" className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full shadow-lg transition-colors flex items-center gap-2">Scale Fast <ArrowRight size={18} /></Link>
                <Link to="/nats" className="px-8 py-3 bg-transparent border border-gray-400 hover:border-white text-white font-medium rounded-full transition-colors flex items-center gap-2">Explore Training <ArrowRight size={18} /></Link>
              </div>
              <div className="flex gap-12 text-white lg:justify-end">
                <div><p className="text-3xl font-bold">20+</p><p className="text-sm text-gray-400">Offices across India</p></div>
                <div><p className="text-3xl font-bold text-blue-500">24/7</p><p className="text-sm text-gray-400">Expert Support</p></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* === CONTACT FORM + INFO === */}
      <section className="max-w-7xl mx-auto py-12 px-6 relative -mt-16 z-20 sm:py-20 sm:px-8">
        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact Form */}
          <div
            className="group relative overflow-hidden bg-white p-8 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
            onMouseEnter={() => setIsFormHovered(true)}
            onMouseLeave={() => setIsFormHovered(false)}
            onFocusCapture={() => setIsFormHovered(true)}
            onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setIsFormHovered(false); }}
          >
            <AnimatePresence>
              {showPlaneAnimation && (
                <motion.div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-[3rem]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="absolute left-4 right-4 bottom-6 top-6">
                    {(flightManifest.length ? flightManifest : [{ label: 'Message', value: 'Delivered' }]).map((entry, index) => (
                      <motion.div key={`${entry.label}-${index}`} className="absolute left-0 flex max-w-[80%] items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3 py-1.5 shadow-[0_14px_30px_rgba(59,130,246,0.12)]"
                        initial={{ opacity: 0, x: -24, y: 20 + index * 40, scale: 0.98, rotate: -3 }}
                        animate={{ opacity: [0,1,1,0.65,0], x: [-24,0,56,128+index*4,214], y: [20+index*40,20+index*36,18+index*20,6-index*8,-8], scale: [0.98,1,0.95,0.68,0.25], rotate: [-3,0,3,-7,-20] }}
                        transition={{ duration: 1.9, ease: 'easeInOut', delay: index * 0.08 }}
                      >
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-700">{entry.label}</span>
                        <span className="max-w-[170px] truncate text-xs font-medium text-gray-600">{entry.value}</span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div className="absolute left-[53%] bottom-[24%] z-10 flex h-10 w-14 items-center justify-center rounded-[40%_50%_45%_48%] border border-blue-200 bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-[0_20px_60px_rgba(59,130,246,0.24)]"
                    initial={{ x: -22, y: 40, scale: 0.45, rotate: -26, opacity: 0 }}
                    animate={{ x: [-22,8,54,126,200], y: [40,4,-36,-86,-144], rotate: [-26,-8,12,24,36], scale: [0.45,1,1.03,1.05,0.94], opacity: [0,1,1,1,0] }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                  >
                    <Send size={17} className="text-blue-700" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-0 rounded-[3rem]" style={{ opacity: isFormHovered ? 1 : 0, transition: 'opacity 180ms ease' }}>
              <div className="absolute inset-0 rounded-[3rem] opacity-80" style={{ background: 'radial-gradient(circle at 18% 18%, rgba(96,165,250,0.28) 0%, transparent 58%), radial-gradient(circle at 82% 78%, rgba(251,191,36,0.26) 0%, transparent 58%)', filter: 'blur(10px)', animation: isFormHovered ? 'contactOrbit 5s linear infinite' : 'none' }} />
            </div>

            <motion.div animate={isFormFlyingAway ? { opacity: 0, y: -34, x: 58, rotate: -12, scale: 0.9, filter: 'blur(1.5px)' } : { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form className="space-y-4" onSubmit={handleContactSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input name="fullName" type="text" placeholder="John Doe" required className="w-full px-5 py-3 border border-gray-200 rounded-full outline-none transition-all duration-300 focus:border-blue-300 focus:ring-4 focus:ring-blue-200/70" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input name="email" type="email" placeholder="hello@company.com" required className="w-full px-5 py-3 border border-gray-200 rounded-full outline-none transition-all duration-300 focus:border-blue-300 focus:ring-4 focus:ring-blue-200/70" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input name="phone" type="tel" placeholder="+91 98765 43210" minLength={5} required className="w-full px-5 py-3 border border-gray-200 rounded-full outline-none transition-all duration-300 focus:border-blue-300 focus:ring-4 focus:ring-blue-200/70" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Interested In</label>
                  <select name="service" required defaultValue="" className="w-full px-5 py-3 border border-gray-200 rounded-full outline-none transition-all duration-300 focus:border-blue-300 focus:ring-4 focus:ring-blue-200/70 text-gray-500">
                    <option value="" disabled hidden>Select a Service</option>
                    {serviceOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea name="message" rows="4" placeholder="How can we help you?" minLength={10} required className="w-full px-5 py-3 border border-gray-200 rounded-[1.75rem] outline-none transition-all duration-300 focus:border-blue-300 focus:ring-4 focus:ring-blue-200/70" />
                </div>
                <label className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                  <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span><Check size={14} className="mr-1 inline text-orange-500" />I agree to receive messages from TALENTCORP SOLUTIONS PRIVATE LIMITED through WhatsApp, RCS, Email, and other channels.</span>
                </label>
                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 text-white font-medium py-3 rounded-full transition-all duration-300 mt-2 active:scale-[0.99]">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
              {submitError && (
                <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <p className="font-semibold">Submission failed</p>
                  <p className="mt-1 break-words">{submitError}</p>
                  <p className="mt-1 text-xs text-red-500">API target: {STRAPI_BASE_URL}/api/leads</p>
                </div>
              )}
            </motion.div>

            {showSuccessPopup && (
              <div className="fixed left-1/2 top-6 z-[9999] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-[2.25rem] border border-blue-100 bg-white px-6 py-5 shadow-[0_20px_60px_rgba(59,130,246,0.18)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold text-blue-700">Your message was sent successfully</p>
                    <p className="mt-1 text-sm text-gray-500">We received your message and will review it shortly.</p>
                    {submitStatusNote && <p className="mt-2 text-xs font-medium text-blue-600">{submitStatusNote}</p>}
                  </div>
                  <button type="button" onClick={() => setShowSuccessPopup(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100" aria-label="Close">×</button>
                </div>
                <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-blue-50">
                  <div className="h-full w-full origin-left rounded-full bg-gradient-to-r from-blue-300 via-orange-300 to-blue-300" style={{ animation: 'popupTimerShrink 4s linear forwards' }} onAnimationEnd={() => setShowSuccessPopup(false)} />
                </div>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="pt-8">
            <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
            <div className="space-y-8">
              <div className="group flex items-start gap-4 rounded-2xl px-3 py-2 transition-all duration-300 hover:bg-blue-50/70">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all"><Phone size={20} /></div>
                <div><p className="text-sm text-gray-500">Call Us</p><a href="tel:+917397971322" className="font-bold text-lg group-hover:text-blue-700">+91 7397971322</a><p className="text-sm text-gray-500">Mon - Fri, 9AM - 6PM</p></div>
              </div>
              <div className="group flex items-start gap-4 rounded-2xl px-3 py-2 transition-all duration-300 hover:bg-orange-50/80">
                <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all"><Mail size={20} /></div>
                <div><p className="text-sm text-gray-500">Email Us</p><a href="mailto:info@tsplgroup.in" className="font-bold text-lg group-hover:text-orange-600">info@tsplgroup.in</a><a href="mailto:hrd1@tsplgroup.in" className="font-bold text-lg group-hover:text-orange-600 block">hrd1@tsplgroup.in</a><p className="text-sm text-gray-500">We aim to reply in 24 hours</p></div>
              </div>
              <div className="group flex items-start gap-4 rounded-2xl px-3 py-2 transition-all duration-300 hover:bg-blue-50/70">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all"><MapPin size={20} /></div>
                <div><p className="text-sm text-gray-500">Visit Office</p><p className="font-bold text-lg">Head Office</p><p className="text-sm text-gray-500">Office No. 111,112,113,103 First Floor, Shree Gajanan Commercial Complex, Chakan, Pune, Maharashtra 410501</p></div>
              </div>
            </div>
            <div className="mt-10 bg-gray-50 p-6 rounded-[2.5rem] border border-gray-100">
              <p className="italic text-gray-600 text-sm mb-4">"Transformation builds workforce potential and global expansion."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full" />
                <div><p className="font-bold text-sm">TalentCorp</p><p className="text-xs text-gray-500">Industry Leader</p></div>
              </div>
            </div>
          </div>
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
              {/* Office pill strip above map */}
              <div className="flex flex-wrap gap-2 p-4 border-b border-gray-100 bg-white">
                {officeLocations.map((office) => {
                  const active = selectedOffice.city === office.city;
                  return (
                    <button
                      key={office.city}
                      onClick={() => setSelectedOffice(office)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                        active
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                      }`}
                    >
                      {office.isBangladesh ? '🌍 ' : '📍 '}
                      {office.short}
                    </button>
                  );
                })}
              </div>

              {/* Google Maps iframe — key forces reload on office change */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedOffice.city}
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
                  📌 {selectedOffice.city}
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
                    <a
                      href={googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-full transition-colors"
                    >
                      <ExternalLink size={13} /> Open in Google Maps
                    </a>
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
