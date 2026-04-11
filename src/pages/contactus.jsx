import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  ArrowRight,
  Check,
  Send
} from 'lucide-react';

const STRAPI_BASE_URL =
  import.meta.env.VITE_STRAPI_API_URL ||
  import.meta.env.NEXT_PUBLIC_STRAPI_API_URL ||
  'http://localhost:1337';

const ContactUs = () => {
  const [isFormHovered, setIsFormHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showPlaneAnimation, setShowPlaneAnimation] = useState(false);
  const [isFormFlyingAway, setIsFormFlyingAway] = useState(false);
  const [flightManifest, setFlightManifest] = useState([]);
  const [submitError, setSubmitError] = useState('');

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    setIsSubmitting(true);
    setShowSuccessPopup(false);
    setShowPlaneAnimation(false);
    setSubmitError('');

    const formData = new FormData(formElement);
    const leadPayload = {
      data: {
        name: formData.get('fullName') || '',
        email: formData.get('email') || '',
        phone: formData.get('phone') || '',
        subject: formData.get('service') || '',
        message: formData.get('message') || '',
        consent: Boolean(formData.get('consent')),
      },
    };

    const manifestEntries = [
      { label: 'Name', value: String(formData.get('fullName') || '').trim() },
      { label: 'Email', value: String(formData.get('email') || '').trim() },
      { label: 'Phone', value: String(formData.get('phone') || '').trim() },
      { label: 'Service', value: String(formData.get('service') || '').trim() },
      {
        label: 'Message',
        value: String(formData.get('message') || '').trim().slice(0, 42),
      },
    ].filter((entry) => entry.value);

    try {
      const response = await fetch(`${STRAPI_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadPayload),
      });

      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(`Submit failed (${response.status}): ${responseText || 'no response body'}`);
      }

      formElement.reset();
      setFlightManifest(manifestEntries.slice(0, 5));
      setIsFormFlyingAway(true);
      setShowPlaneAnimation(true);
      setShowSuccessPopup(true);
      window.setTimeout(() => {
        setShowPlaneAnimation(false);
        setFlightManifest([]);
      }, 2200);
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

  return (
    <div className="font-sans text-gray-800 bg-white antialiased">
      <style>{`
        @keyframes contactOrbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes popupTimerShrink { from { transform: scaleX(1); } to { transform: scaleX(0); } }
      `}</style>
      
      {/* === HEADER & HERO SECTION === */}
      <header className="relative bg-gray-900 min-h-screen flex flex-col">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://v0-improve-ui-design-weld-six.vercel.app/images/contact-hero-bg.jpg" 
            alt="Office Meeting" 
            className="w-full h-full object-cover object-center opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/40 to-black/65"></div>
        </div>

        <Navbar />

        {/* Hero Content */}
        <div className="relative z-10 flex-grow flex items-center max-w-7xl mx-auto w-full px-8 pt-12 pb-24">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Let's Connect<br/>& <span className="text-blue-500">Build the Future</span><br/>Workforce
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              Scale your business towards your highest potential. Our experts are ready to catalyze your growth. With TSPL Group, your business is our mission.
            </p>
            <div className="flex gap-4 mb-12">
              <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full shadow-lg transition-colors flex items-center gap-2">
                Scale Fast <ArrowRight size={18} />
              </button>
              <button className="px-8 py-3 bg-transparent border border-gray-400 hover:border-white text-white font-medium rounded-full transition-colors flex items-center gap-2">
                Explore Training <ArrowRight size={18} />
              </button>
            </div>
            <div className="flex gap-12 text-white">
              <div>
                <p className="text-3xl font-bold">20+</p>
                <p className="text-sm text-gray-400">Offices across India</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-500">24/7</p>
                <p className="text-sm text-gray-400">Expert Support</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* === CONTACT SECTION === */}
      <section className="max-w-7xl mx-auto py-20 px-8 relative -mt-16 z-20">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div
            className="group relative overflow-hidden bg-white p-8 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
            onMouseEnter={() => setIsFormHovered(true)}
            onMouseLeave={() => setIsFormHovered(false)}
            onFocusCapture={() => setIsFormHovered(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsFormHovered(false);
              }
            }}
          >
            <AnimatePresence>
              {showPlaneAnimation && (
                <motion.div
                  className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-[3rem]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="absolute left-4 right-4 bottom-6 top-6">
                    {(flightManifest.length ? flightManifest : [{ label: 'Message', value: 'Delivered' }]).map((entry, index) => (
                      <motion.div
                        key={`${entry.label}-${index}`}
                        className="absolute left-0 flex max-w-[80%] items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3 py-1.5 shadow-[0_14px_30px_rgba(59,130,246,0.12)]"
                        initial={{
                          opacity: 0,
                          x: -24,
                          y: 20 + index * 40,
                          scale: 0.98,
                          rotate: -3,
                        }}
                        animate={{
                          opacity: [0, 1, 1, 0.65, 0],
                          x: [-24, 0, 56, 128 + index * 4, 214],
                          y: [20 + index * 40, 20 + index * 36, 18 + index * 20, 6 - index * 8, -8],
                          scale: [0.98, 1, 0.95, 0.68, 0.25],
                          rotate: [-3, 0, 3, -7, -20],
                        }}
                        transition={{
                          duration: 1.9,
                          ease: 'easeInOut',
                          delay: index * 0.08,
                        }}
                      >
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                          {entry.label}
                        </span>
                        <span className="max-w-[170px] truncate text-xs font-medium text-gray-600">{entry.value}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="absolute left-8 bottom-10 flex h-14 w-20 items-end justify-between"
                    initial={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
                    animate={{
                      opacity: [0.95, 1, 0.75, 0],
                      scale: [1, 0.9, 0.58, 0.2],
                      x: ['0%', '10%', '18%', '24%'],
                      y: ['0%', '-4%', '-8%', '-10%'],
                      rotate: [0, -4, -10, -16],
                    }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                  >
                    <motion.span
                      className="h-12 w-4 rounded-full bg-blue-200"
                      animate={{ height: [48, 34, 14, 0] }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                    />
                    <motion.span
                      className="h-10 w-4 rounded-full bg-blue-300"
                      animate={{ height: [40, 30, 12, 0] }}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.06 }}
                    />
                    <motion.span
                      className="h-8 w-4 rounded-full bg-orange-300"
                      animate={{ height: [32, 24, 10, 0] }}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.12 }}
                    />
                  </motion.div>

                  <motion.div
                    className="absolute left-[53%] bottom-[24%] z-10 flex h-10 w-14 items-center justify-center rounded-[40%_50%_45%_48%] border border-blue-200 bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-[0_20px_60px_rgba(59,130,246,0.24)]"
                    initial={{ x: -22, y: 40, scale: 0.45, rotate: -26, opacity: 0 }}
                    animate={{
                      x: [-22, 8, 54, 126, 200],
                      y: [40, 4, -36, -86, -144],
                      rotate: [-26, -8, 12, 24, 36],
                      scale: [0.45, 1, 1.03, 1.05, 0.94],
                      opacity: [0, 1, 1, 1, 0],
                    }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                  >
                    <Send size={17} className="text-blue-700" />
                  </motion.div>

                  <motion.div
                    className="absolute left-[56%] bottom-[26%] h-[2px] w-24 origin-left rounded-full bg-gradient-to-r from-blue-400 via-orange-300 to-transparent"
                    initial={{ opacity: 0, scaleX: 0.2 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      scaleX: [0.2, 0.95, 1.25, 1.5],
                      x: ['0%', '24%', '78%', '150%'],
                      y: ['0%', '-10%', '-28%', '-60%'],
                    }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <div
              className="pointer-events-none absolute inset-0 rounded-[3rem]"
              style={{
                opacity: isFormHovered ? 1 : 0,
                transition: 'opacity 180ms ease',
              }}
            >
              <div
                className="absolute inset-0 rounded-[3rem] opacity-80"
                style={{
                  background:
                    'radial-gradient(circle at 18% 18%, rgba(96,165,250,0.28) 0%, rgba(96,165,250,0.16) 14%, rgba(96,165,250,0.05) 30%, transparent 58%), radial-gradient(circle at 82% 78%, rgba(251,191,36,0.26) 0%, rgba(251,191,36,0.14) 14%, rgba(251,191,36,0.05) 30%, transparent 58%)',
                  filter: 'blur(10px)',
                  animation: isFormHovered ? 'contactOrbit 5s linear infinite' : 'none',
                }}
              />
              <div
                className="absolute inset-[10px] rounded-[2.5rem] opacity-70"
                style={{
                  background:
                    'radial-gradient(circle at 25% 75%, rgba(96,165,250,0.22) 0%, rgba(96,165,250,0.11) 14%, rgba(96,165,250,0.03) 32%, transparent 60%), radial-gradient(circle at 76% 24%, rgba(251,191,36,0.2) 0%, rgba(251,191,36,0.1) 14%, rgba(251,191,36,0.03) 32%, transparent 60%)',
                  filter: 'blur(14px)',
                  animation: isFormHovered ? 'contactOrbit 7s linear infinite reverse' : 'none',
                  animationDelay: '220ms',
                }}
              />
            </div>
            <motion.div
              animate={
                isFormFlyingAway
                  ? {
                      opacity: 0,
                      y: -34,
                      x: 58,
                      rotate: -12,
                      scale: 0.9,
                      filter: 'blur(1.5px)',
                    }
                  : {
                      opacity: 1,
                      y: 0,
                      x: 0,
                      rotate: 0,
                      scale: 1,
                      filter: 'blur(0px)',
                    }
              }
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
            <form className="space-y-4" onSubmit={handleContactSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input name="fullName" type="text" placeholder="John Doe" required className="w-full px-5 py-3 border border-gray-200 rounded-full outline-none transition-all duration-300 focus:border-blue-300 focus:ring-4 focus:ring-blue-200/70 focus:shadow-[0_0_0_1px_rgba(147,197,253,0.28)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input name="email" type="email" placeholder="hello@company.com" required className="w-full px-5 py-3 border border-gray-200 rounded-full outline-none transition-all duration-300 focus:border-blue-300 focus:ring-4 focus:ring-blue-200/70 focus:shadow-[0_0_0_1px_rgba(147,197,253,0.28)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input name="phone" type="tel" placeholder="+91 98765 43210" required className="w-full px-5 py-3 border border-gray-200 rounded-full outline-none transition-all duration-300 focus:border-blue-300 focus:ring-4 focus:ring-blue-200/70 focus:shadow-[0_0_0_1px_rgba(147,197,253,0.28)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Interested In</label>
                <select name="service" required defaultValue="" className="w-full px-5 py-3 border border-gray-200 rounded-full outline-none transition-all duration-300 focus:border-blue-300 focus:ring-4 focus:ring-blue-200/70 focus:shadow-[0_0_0_1px_rgba(147,197,253,0.28)] text-gray-500">
                  <option value="" disabled hidden>Select a Service</option>
                  <option>NATS PROGRAM</option>
                  <option>NAPS PROGRAM</option>
                  <option>FLEXI ITI PROGRAM</option>
                  <option>TRANING & DEVELOPMENT</option>
                  <option>STAFF SOLUTIONS</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea name="message" rows="4" placeholder="How can we help you?" required className="w-full px-5 py-3 border border-gray-200 rounded-[1.75rem] outline-none transition-all duration-300 focus:border-blue-300 focus:ring-4 focus:ring-blue-200/70 focus:shadow-[0_0_0_1px_rgba(147,197,253,0.28)]"></textarea>
              </div>
              <label className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>
                  <Check size={14} className="mr-1 inline text-orange-500" />
                  I agree to receive messages from TALENTCORP SOLUTIONS PRIVATE LIMITED and its representatives through WhatsApp, RCS, Email, and other communication channels.
                </span>
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
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSuccessPopup(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-700"
                    aria-label="Close success popup"
                  >
                    ×
                  </button>
                </div>
                <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-blue-50">
                  <div
                    className="h-full w-full origin-left rounded-full bg-gradient-to-r from-blue-300 via-orange-300 to-blue-300"
                    style={{ animation: 'popupTimerShrink 4s linear forwards' }}
                    onAnimationEnd={() => setShowSuccessPopup(false)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="pt-8">
            <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
            <div className="space-y-8">
              <div className="group flex items-start gap-4 rounded-2xl px-3 py-2 transition-all duration-300 hover:bg-blue-50/70 hover:shadow-sm">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Call Us</p>
                  <a href="tel:+917397926734" className="font-bold text-lg transition-colors group-hover:text-blue-700">+91 7397926734</a>
                  <a href="tel:+918624817374" className="font-bold text-lg transition-colors group-hover:text-blue-700 block">+91 8624817374</a>
                  <p className="text-sm text-gray-500">Mon - Fri, 9AM - 6PM</p>
                </div>
              </div>
              <div className="group flex items-start gap-4 rounded-2xl px-3 py-2 transition-all duration-300 hover:bg-orange-50/80 hover:shadow-sm">
                <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white group-hover:scale-105">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Us</p>
                  <a href="mailto:info@tsplgroup.in" className="font-bold text-lg transition-colors group-hover:text-orange-600">info@tsplgroup.in</a>
                  <p className="text-sm text-gray-500">We aim to reply in 24 hours</p>
                </div>
              </div>
              <div className="group flex items-start gap-4 rounded-2xl px-3 py-2 transition-all duration-300 hover:bg-blue-50/70 hover:shadow-sm">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Visit Office</p>
                  <p className="font-bold text-lg transition-colors group-hover:text-blue-700">Head Office</p>
                  <p className="text-sm text-gray-500">Office No. 111,112,113,103 First Floor, Shree Gajanan Commercial Complex, Chakan- Talegaon Road, Chakan Tal. Khed, Dist. Pune, Maharashtra 410501</p>
                </div>
              </div>
            </div>

            {/* Testimonial Block */}
            <div className="mt-10 bg-gray-50 p-6 rounded-[2.5rem] border border-gray-100">
              <p className="italic text-gray-600 text-sm mb-4">"Transformation builds workforce potential and global expansion."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
                <div>
                  <p className="font-bold text-sm">TalentCorp</p>
                  <p className="text-xs text-gray-500">Industry Leader</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SERVICES SECTION === */}
      <section className="bg-blue-50/50 py-20 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <p className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-2">Our Services</p>
          <h2 className="text-3xl font-bold mb-2">Explore Your Growth Path</h2>
          <p className="text-gray-500 mb-12">Choose the solutions that best fit your business needs</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cards Array to Map Over */}
            {[
              {
                title: "Hiring",
                desc: "End-to-end staffing solutions tailored for your business needs.",
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Training",
                desc: "Upskill your workforce with our customized training modules.",
                image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Partnerships",
                desc: "Explore strategic alliances to manage business complexities.",
                image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Support",
                desc: "Need a helping hand? We offer immediate operational support.",
                image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
              },
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-[2.25rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                <div className="h-40 bg-gray-100 flex items-center justify-center p-4">
                  <img 
                    src={service.image}
                    alt={service.title} 
                    className="h-full w-full rounded-2xl object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-2">{service.title}</h4>
                  <p className="text-sm text-gray-500">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === LOCATIONS SECTION === */}
      <section className="max-w-7xl mx-auto py-24 px-8 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-2">Our Presence</p>
          <h2 className="text-4xl font-bold mb-4">Find us in India's<br/>Growth Hubs</h2>
          <p className="text-gray-500 mb-8 max-w-md">Our headquarters is strategically located in the heart of Gurugram's tech corridor. With regional offices across key economic zones in 20+ states.</p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 rounded-full border border-gray-100 bg-white px-6 py-4">
              <div className="w-10 h-10 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center">
                <Building size={18} />
              </div>
              <div>
                  <p className="font-bold">Head Office</p>
                  <p className="text-sm text-gray-500">Office No. 111,112,113,103 First Floor, Shree Gajanan Commercial Complex</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-full border border-gray-100 bg-white px-6 py-4">
              <div className="w-10 h-10 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
                <MapPin size={18} />
              </div>
              <div>
                  <p className="font-bold">Chakan Office</p>
                  <p className="text-sm text-gray-500">Chakan- Talegaon Road, Chakan Tal. Khed, Dist. Pune, Maharashtra 410501</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-full border border-gray-100 bg-white px-6 py-4">
              <div className="w-10 h-10 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center">
                <MapPin size={18} />
              </div>
              <div>
                  <p className="font-bold">Pune, Maharashtra</p>
                  <p className="text-sm text-gray-500">410501</p>
              </div>
            </div>
          </div>
        </div>
        {/* Map */}
        <div className="overflow-hidden rounded-[3rem] border border-gray-200 bg-gray-100 shadow-[0_18px_50px_rgba(15,42,77,0.10)]">
          <img
            src="/map-transparent.png"
            alt="TSPL Group office map"
            className="h-96 w-full object-contain bg-white"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;