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
    <footer className="bg-[#1a4a8a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <img
              src="/TSPL Logo (Sarang Sir) 1.png"
              alt="TSPL Group"
              className="h-14 w-auto object-contain mb-4"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-blue-200 text-sm leading-relaxed">
              TalentCorp Solutions Private Limited - We Deliver Talent. Connecting businesses
              with exceptional professionals across industries.
            </p>
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
                <span>TSPL Group, TalentCorp Solutions Pvt. Ltd., India</span>
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