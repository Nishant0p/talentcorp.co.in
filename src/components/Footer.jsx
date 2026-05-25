import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Eye, Building } from 'lucide-react';
import { fetchFooterSettings, extractMediaUrl } from '../utils/strapi';

const fallbackFooter = {
  description: 'TalentCorp Solutions Private Limited - We Deliver Talent. Connecting businesses with exceptional professionals across industries.',
  address: 'Head Office, Office No. 111,112,113,103 First Floor, Shree Gajanan Commercial Complex, Chakan- Talegaon Road, Chakan Tal. Khed, Dist. Pune, Maharashtra 410501',
  phone: '+91 7397926734 , +91 7397971322',
  email: 'info@tsplgroup.in',
  facebook: 'https://www.facebook.com/p/TSPL-GROUP-61574171348189/',
  twitter: '#',
  linkedin: 'https://www.linkedin.com/company/tsplgroup',
  instagram: 'https://www.instagram.com/tspl_group_',
};

const officesByState = {
  'Maharashtra': [
    {
      city: 'Pune (Head Office)',
      company: 'TalentCorp Solutions Private Limited',
      address: 'Office No. 111,112,113,103 First Floor, Shree Gajanan Commercial Complex, Chakan- Talegaon Road, Chakan Tal. Khed, Dist. Pune, Maharashtra 410501',
      phone: '+91 7397971322',
      email: 'info@tsplgroup.in'
    },
    {
      city: 'Mumbai',
      company: 'TalentCorp Solutions Private Limited',
      address: 'White House, Six Floor, Office No. 605, SV Road, Opposite to Andheri Metro Station West, Mumbai, Maharashtra - 400 058, India',
      phone: '+91 7397971322',
      email: 'mumbai@tsplgroup.in'
    },
    {
      city: 'Ranjangaon',
      company: 'TalentCorp Solutions Private Limited',
      address: '2nd Floor, Soham Apartment, Opposite to ICICI Bank, Ranjangaon (Pune), Maharashtra, India',
      phone: '+91 7397971322',
      email: 'ranjangaon@tsplgroup.in'
    },
    {
      city: 'Osmanabad',
      company: 'TalentCorp Solutions Private Limited',
      address: 'Office No- 2, Mahalaxmi Complex, Opposite Collector Office, Osmanabad, Maharashtra - 413501, India',
      phone: '+91 7397971322',
      email: 'osmanabad@tsplgroup.in'
    }
  ],
  'Tamil Nadu': [
    {
      city: 'Chennai',
      company: 'TalentCorp Solutions Private Limited',
      address: 'No 1/44, 2nd Floor, Vallar Complex, G.S.T Road, Signaperumal Koil, Kancheepuram District, Chennai, Tamil Nadu - 603204, India',
      phone: '+91 9488910028',
      email: 'chennai@tsplgroup.in'
    }
  ],
  'Odisha': [
    {
      city: 'Bhubaneswar',
      company: 'TalentCorp Solutions Private Limited',
      address: 'Maha Laxmi Bhawan, Jai Dev Vihar, Near Hotel MAYFAIR Lagoon, Bhubaneswar, Odisha - 751013, India',
      phone: '+91 7397971322',
      email: 'bhubaneswar@tsplgroup.in'
    }
  ],
  'Uttar Pradesh': [
    {
      city: 'Ghaziabad',
      company: 'TalentUp Services (India) Private Limited',
      address: 'S-32 Shop No. 3 Gf - Dlf, Ankur Vihar Loni, Ghaziabad, Uttar Pradesh - 201102, India',
      phone: '+91 8484035542',
      email: 'info@talentup.in'
    }
  ],
  'International': [
    {
      city: 'Bangladesh (Chittagong)',
      company: 'TalentCorp Solutions Private Limited',
      address: '11 no Office, Chobila Complex (2nd Floor), 8/3 Hazari Lane, Anderkilla, Kotwali, Chittagong',
      phone: '01830086926',
      email: 'bangladesh@tsplgroup.in'
    }
  ]
};

export default function Footer() {
  const [viewCount, setViewCount] = useState(0);
  const [footer, setFooter] = useState(fallbackFooter);
  const [selectedState, setSelectedState] = useState('Maharashtra');

  useEffect(() => {
    const storageKey = 'tspl_view_count';
    const existingCount = Number(localStorage.getItem(storageKey) || '0');
    const nextCount = Number.isNaN(existingCount) ? 1 : existingCount + 1;
    localStorage.setItem(storageKey, String(nextCount));
    setViewCount(nextCount);
  }, []);

  useEffect(() => {
    const loadFooter = async () => {
      const data = await fetchFooterSettings();
      if (!data) return;
      setFooter({
        ...fallbackFooter,
        description: data.description || fallbackFooter.description,
        address: data.address || fallbackFooter.address,
        phone: data.phone || fallbackFooter.phone,
        email: data.email || fallbackFooter.email,
        facebook: data.facebook || fallbackFooter.facebook,
        twitter: data.twitter || fallbackFooter.twitter,
        linkedin: data.linkedin || fallbackFooter.linkedin,
        instagram: data.instagram || fallbackFooter.instagram,
        logo: data.logo ? extractMediaUrl(data.logo) : undefined,
      });
    };

    loadFooter();
  }, []);

  return (
    <footer className="relative left-1/2 right-1/2 w-screen max-w-none -translate-x-1/2 bg-[#1a4a8a] text-white overflow-hidden">
      {/* Background Textures */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Slanting line pattern overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 16px)',
          }}
        />

        {/* Corner dot-fade textures */}
        <div
          className="absolute -left-32 -top-24 h-80 w-80 rounded-full opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,140,0,0.2) 1.1px, transparent 1.1px), radial-gradient(circle at center, rgba(255,140,0,0.12) 0%, rgba(255,140,0,0.04) 50%, transparent 74%)',
            backgroundSize: '14px 14px, 100% 100%',
          }}
        />
        <div
          className="absolute -right-32 -bottom-24 h-80 w-80 rounded-full opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(100,200,255,0.18) 1.1px, transparent 1.1px), radial-gradient(circle at center, rgba(100,200,255,0.1) 0%, rgba(100,200,255,0.03) 50%, transparent 74%)',
            backgroundSize: '14px 14px, 100% 100%',
          }}
        />
      </div>

      <div className="relative z-10 w-full px-6 py-12 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="max-md:text-center">
            <img
              src={footer.logo || '/tspl main logo.png'}
              alt="TSPL Group"
              className="mb-4 h-14 w-auto object-contain max-md:mx-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              {footer.description}
            </p>
            {/* Social media links with view counts */}
            <div className="flex flex-wrap items-start gap-3 max-md:justify-center">
              {[
                {
                  key: 'facebook',
                  label: 'Facebook',
                  color: '#1877f2',
                  baseViews: 38400,
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  ),
                },
                {
                  key: 'twitter',
                  label: 'Twitter / X',
                  color: '#000000',
                  baseViews: 31600,
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                    </svg>
                  ),
                },
                {
                  key: 'linkedin',
                  label: 'LinkedIn',
                  color: '#0a66c2',
                  baseViews: 52800,
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  ),
                },
                {
                  key: 'instagram',
                  label: 'Instagram',
                  color: '#e1306c',
                  baseViews: 45200,
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  ),
                },
              ]
                .filter(({ key }) => footer[key] && footer[key] !== '#')
                .map(({ key, label, color, baseViews, icon }) => {
                  const stored = Number(localStorage.getItem(`tspl_social_${key}`) || '0');
                  const count = stored || baseViews + viewCount;
                  localStorage.setItem(`tspl_social_${key}`, String(count));
                  const display = count >= 1000
                    ? `${(count / 1000).toFixed(1)}K`
                    : count.toLocaleString();
                  return (
                    <a
                      key={key}
                      href={footer[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex flex-col items-center gap-1 group"
                    >
                      <div
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-800/60 text-blue-200 transition-all duration-300 group-hover:scale-110 group-hover:text-white"
                        style={{ '--hover-bg': color }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = color}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = ''}
                      >
                        {icon}
                      </div>
                      <span className="text-[10px] font-bold text-blue-300 group-hover:text-white transition-colors tracking-wide">
                        {display} <span className="font-normal opacity-70">views</span>
                      </span>
                    </a>
                  );
                })}
            </div>

          </div>

          <div className="max-md:text-center">
            <h3 className="text-[#f07a1a] font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 max-md:flex max-md:flex-col max-md:items-center">
              {[
                { href: '/#services', label: 'Services' },
                { href: '/about', label: 'About' },
                { href: '/jobs', label: 'Jobs' },
                { href: '/client', label: 'Clients' },
                { href: '/achievements', label: 'Achievements' },
                { href: '/news-events', label: 'News & Events' },
                { href: '/terms-and-conditions', label: 'Terms & Conditions' },
                { href: '/privacy-policy', label: 'Privacy Policy' },
              ].map((link) => (
                <li key={link.href}>
                  {link.href.startsWith('/') && !link.href.includes('#') ? (
                    <Link
                      to={link.href}
                      className="text-blue-200 hover:text-[#f07a1a] text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-blue-200 hover:text-[#f07a1a] text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="max-md:text-center flex flex-col justify-between">
            <div>
              <h3 className="text-[#f07a1a] font-semibold text-lg mb-4 text-left max-md:text-center">Our Offices</h3>
              
              {/* Ultra-compact state switcher pills */}
              <div className="flex flex-wrap gap-1.5 mb-4 justify-start max-md:justify-center">
                {Object.keys(officesByState).map((state) => {
                  const abbreviationMap = {
                    'Maharashtra': 'MH',
                    'Tamil Nadu': 'TN',
                    'Odisha': 'OD',
                    'Uttar Pradesh': 'UP',
                    'International': 'INT'
                  };
                  const label = abbreviationMap[state] || state;
                  return (
                    <button
                      key={state}
                      onClick={() => setSelectedState(state)}
                      className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.96] ${
                        selectedState === state
                          ? 'bg-[#f07a1a] text-white shadow-md shadow-[#f07a1a]/20 scale-105'
                          : 'bg-blue-800/40 text-blue-200 hover:bg-blue-800/70 hover:text-white'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Compact selected state details */}
              <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-transparent">
                {officesByState[selectedState].map((office) => (
                  <div 
                    key={office.city} 
                    className="border-l-2 border-blue-500/30 pl-3 py-0.5 text-left transition-colors duration-300 hover:border-[#f07a1a]"
                  >
                    <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                      {office.city.includes('Head Office') ? <Building size={12} className="text-[#f07a1a]" /> : <MapPin size={12} className="text-[#f07a1a]" />}
                      {office.city}
                    </h4>
                    <p className="text-blue-300 text-[11px] mt-1 leading-relaxed">
                      {office.address}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-blue-200">
                      <a href={`tel:${office.phone.split(',')[0].replace(/\s+/g, '')}`} className="hover:text-white transition-colors flex items-center gap-1">
                        <Phone size={10} className="text-[#f07a1a] shrink-0" /> {office.phone}
                      </a>
                      <a href={`mailto:${office.email}`} className="hover:text-white transition-colors flex items-center gap-1 truncate max-w-[180px]">
                        <Mail size={10} className="text-[#f07a1a] shrink-0" /> {office.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-blue-700 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-blue-300 text-sm">
            Copyright {new Date().getFullYear()} TalentCorp Solutions Private Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-blue-300">
            <Eye size={16} className="text-[#f07a1a]" />
            <span>Views: {viewCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}