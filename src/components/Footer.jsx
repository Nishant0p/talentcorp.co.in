import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Eye } from 'lucide-react';

export default function Footer() {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const storageKey = 'tspl_view_count';
    const existingCount = Number(localStorage.getItem(storageKey) || '0');
    const nextCount = Number.isNaN(existingCount) ? 1 : existingCount + 1;
    localStorage.setItem(storageKey, String(nextCount));
    setViewCount(nextCount);
  }, []);

  return (
    <footer className="relative bg-[#1a4a8a] text-white overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <img
              src="/TSPL Logo (Sarang Sir) 1.png"
              alt="TSPL Group"
              className="h-14 w-auto object-contain mb-4"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              TalentCorp Solutions Private Limited - We Deliver Talent. Connecting businesses
              with exceptional professionals across industries.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-800/60 text-blue-200 hover:bg-[#f07a1a] hover:text-white transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-800/60 text-blue-200 hover:bg-[#f07a1a] hover:text-white transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-800/60 text-blue-200 hover:bg-[#f07a1a] hover:text-white transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-800/60 text-blue-200 hover:bg-[#f07a1a] hover:text-white transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[#f07a1a] font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '#services', label: 'Services' },
                { href: '#about', label: 'About' },
                { href: '#jobs', label: 'Jobs' },
                { href: '#clients', label: 'Clients' },
                { href: '#achievements', label: 'Achievements' },
                { href: '#news-events', label: 'News & Events' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-blue-200 hover:text-[#f07a1a] text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#f07a1a] font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-blue-200 text-sm">
                <MapPin size={16} className="mt-0.5 text-[#f07a1a] flex-shrink-0" />
                <span>Head Office, Office No. 111,112,113,103 First Floor, Shree Gajanan Commercial Complex, Chakan- Talegaon Road, Chakan Tal. Khed, Dist. Pune, Maharashtra 410501</span>
              </li>
              <li className="flex items-center gap-3 text-blue-200 text-sm">
                <Phone size={16} className="text-[#f07a1a] flex-shrink-0" />
                <span>+91 7397926734 , +91 8624817374</span>
              </li>
              <li className="flex items-center gap-3 text-blue-200 text-sm">
                <Mail size={16} className="text-[#f07a1a] flex-shrink-0" />
                <span>info@tsplgroup.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
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