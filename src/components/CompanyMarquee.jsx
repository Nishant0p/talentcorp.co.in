import React from 'react';
import { Link } from 'react-router-dom';
import { STRAPI_BASE_URL, fetchCollection, extractMediaUrl } from '../utils/strapi';

const FALLBACK_LOGOS = [
  { name: 'Haier', logoType: 'text' },
  { name: 'LG', logoType: 'text' },
  { name: 'Hyundai', logoType: 'text' },
  { name: 'TATA AUTOCOMP', logoType: 'text' },
  { name: 'FIAT', logoType: 'text' },
  { name: 'BLUE STAR', logoType: 'text' },
  { name: 'MRF', logoType: 'text' },
  { name: 'JABIL', logoType: 'text' },
  { name: 'VOLTAS', logoType: 'text' },
  { name: 'HAVELLS', logoType: 'text' },
  { name: 'FORCE MOTORS', logoType: 'text' },
  { name: 'ITC LIMITED', logoType: 'text' },
  { name: 'EXIDE', logoType: 'text' },
  { name: 'JSW', logoType: 'text' },
  { name: 'MAHINDRA CIE AUTOMOTIVE', logoType: 'text' },
  { name: 'FORBES MARSHALL', logoType: 'text' },
  { name: 'CARRIER MIDEA INDIA', logoType: 'text' },
  { name: 'BRITANNIA', logoType: 'text' },
  { name: 'SEOYON E-HWA', logoType: 'text' },
  { name: 'GKN', logoType: 'text' },
  { name: 'KALYANI', logoType: 'text' },
  { name: 'EATON', logoType: 'text' },
  { name: 'GEDIA', logoType: 'text' },
  { name: 'ENDURANCE', logoType: 'text' },
  { name: 'TOPBAND', logoType: 'text' },
  { name: 'THERMAX', logoType: 'text' },
  { name: 'SANSERA', logoType: 'text' }
];

function withCacheBuster(url, version) {
  if (!url || !version) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${encodeURIComponent(version)}`;
}

function renderCustomLogo(logo, name) {
  const key = (name || '').trim().toUpperCase();

  // If logo has a custom pre-styled render
  switch (key) {
    case 'HAIER':
      return (
        <div className="flex items-center gap-1 select-none">
          <span className="text-[#005A9C] font-sans font-black tracking-widest text-[16px] uppercase">Haier</span>
        </div>
      );
    case 'LG':
      return (
        <div className="flex items-center gap-2 select-none">
          <div className="relative flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#A50034]">
            <span className="absolute left-[3.5px] top-[2px] text-[10px] font-black text-white font-sans leading-none">L</span>
            <span className="absolute right-[4px] bottom-[3px] text-[8px] font-black text-white font-sans leading-none">G</span>
            <div className="absolute top-[6px] left-[6px] h-1.5 w-1.5 rounded-full border border-white/60 bg-white" />
          </div>
          <span className="text-[#A50034] font-sans font-black tracking-tight text-[15px]">LG</span>
        </div>
      );
    case 'HYUNDAI':
      return (
        <div className="flex items-center gap-1.5 select-none">
          <span className="flex h-5 w-7 items-center justify-center rounded-full border border-[#002C5F] text-[9px] font-black text-[#002C5F] -skew-x-12 italic">H</span>
          <span className="text-[#002C5F] font-sans font-black italic tracking-widest text-[11px] uppercase">HYUNDAI</span>
        </div>
      );
    case 'TATA AUTOCOMP':
    case 'TATA':
      return (
        <div className="flex flex-col items-center justify-center leading-none select-none">
          <div className="flex items-center gap-1">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#005A9C] text-[9px] font-bold text-white">T</span>
            <span className="text-[#005A9C] font-sans font-extrabold tracking-[0.12em] text-[14px]">TATA</span>
          </div>
          <span className="text-slate-500 font-sans font-bold tracking-[0.15em] text-[7px] mt-0.5 uppercase">AUTOCOMP</span>
        </div>
      );
    case 'FIAT':
      return (
        <div className="flex items-center gap-1.5 select-none">
          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#8F1630] text-[6.5px] font-bold text-[#8F1630]">F</span>
          <span className="text-[#8F1630] font-serif font-black tracking-widest text-[13px] uppercase italic">FIAT</span>
        </div>
      );
    case 'BLUE STAR':
      return (
        <div className="flex items-center gap-1 select-none">
          <span className="text-[#0A56A3] text-sm">★</span>
          <span className="text-[#0B2C5C] font-sans font-black tracking-[0.06em] text-[12px] uppercase">BLUE STAR</span>
        </div>
      );
    case 'MRF':
      return (
        <div className="flex items-center select-none skew-x-[-12deg]">
          <span className="text-[#D22630] font-sans font-black tracking-tighter text-lg leading-none">M</span>
          <span className="text-[#D22630] font-sans font-black tracking-tighter text-lg leading-none">R</span>
          <span className="text-[#D22630] font-sans font-black tracking-tighter text-lg leading-none">F</span>
        </div>
      );
    case 'JABIL':
      return (
        <div className="flex items-center gap-1.5 select-none">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[#005691] font-sans font-black tracking-tight text-[15px]">JABIL</span>
        </div>
      );
    case 'VOLTAS':
      return (
        <div className="flex flex-col items-center leading-none select-none">
          <span className="text-[#00A499] font-sans font-black tracking-wide text-[13px] uppercase">VOLTAS</span>
          <div className="h-[2px] w-8 bg-[#00A499] mt-0.5 rounded-full" />
        </div>
      );
    case 'HAVELLS':
      return (
        <div className="flex items-center gap-1 select-none">
          <div className="h-3 w-3 bg-[#E31E24]" />
          <span className="text-slate-900 font-sans font-black tracking-tighter text-[13px] uppercase italic">HAVELLS</span>
        </div>
      );
    case 'FORCE MOTORS':
      return (
        <div className="flex items-center gap-1.5 select-none">
          <div className="w-4.5 h-4.5 border border-[#FF6B00] rounded-sm flex items-center justify-center">
            <span className="text-[#FF6B00] text-[8px] font-black">F</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[#FF6B00] font-sans font-black tracking-tighter text-[11px] uppercase">FORCE</span>
            <span className="text-slate-700 font-sans font-bold tracking-[0.1em] text-[7px] uppercase">MOTORS</span>
          </div>
        </div>
      );
    case 'ITC LIMITED':
    case 'ITC':
      return (
        <div className="flex flex-col items-center leading-none select-none">
          <span className="text-[#007A3E] font-serif font-black tracking-widest text-[13px] uppercase">I T C</span>
          <span className="text-amber-500 font-sans font-bold tracking-[0.2em] text-[6.5px] mt-0.5 uppercase">LIMITED</span>
        </div>
      );
    case 'EXIDE':
      return (
        <div className="flex items-center gap-1 bg-[#ED1C24] px-2 py-0.5 rounded text-white select-none shadow-[0_2px_4px_rgba(237,28,36,0.15)]">
          <span className="font-sans font-black italic tracking-widest text-[11px] uppercase">EXIDE</span>
        </div>
      );
    case 'JSW':
      return (
        <div className="flex items-center gap-1 select-none">
          <span className="bg-[#1F4E79] px-1.5 py-0.5 rounded text-white text-[8px] font-bold">JSW</span>
          <span className="text-[#1F4E79] font-sans font-black tracking-wider text-[11px] uppercase">Group</span>
        </div>
      );
    case 'MAHINDRA CIE AUTOMOTIVE':
    case 'MAHINDRA CIE':
      return (
        <div className="flex flex-col items-start leading-none select-none">
          <span className="text-[#E31837] font-sans font-black tracking-tighter text-[12px] uppercase">Mahindra</span>
          <span className="text-slate-700 font-sans font-extrabold tracking-[0.08em] text-[7.5px] mt-0.5">CIE AUTOMOTIVE</span>
        </div>
      );
    case 'FORBES MARSHALL':
      return (
        <div className="flex items-center gap-1.5 select-none">
          <div className="grid grid-cols-2 gap-[2px]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1A4F87]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#1A4F87]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[#1A4F87] font-sans font-black tracking-tight text-[10px] uppercase">FORBES</span>
            <span className="text-slate-600 font-sans font-extrabold tracking-[0.08em] text-[8.5px] uppercase">MARSHALL</span>
          </div>
        </div>
      );
    case 'CARRIER MIDEA INDIA':
    case 'CARRIER MIDEA':
      return (
        <div className="flex flex-col items-center leading-none select-none">
          <div className="flex items-center gap-0.5">
            <span className="text-[#005596] font-sans font-black tracking-tighter text-[11px] uppercase">Carrier</span>
            <span className="text-[#F18825] font-sans font-bold text-[11px] tracking-tight">Midea</span>
          </div>
          <span className="text-slate-400 font-sans font-extrabold tracking-[0.15em] text-[6px] mt-0.5 uppercase">India</span>
        </div>
      );
    case 'BRITANNIA':
      return (
        <div className="flex flex-col items-center leading-none select-none">
          <span className="text-[#D22630] font-serif font-black tracking-wide text-xs uppercase italic">BRITANNIA</span>
          <div className="w-10 h-[1.5px] bg-[#007A3E] mt-0.5" />
        </div>
      );
    case 'SEOYON E-HWA':
      return (
        <div className="flex items-center gap-1 select-none">
          <span className="text-[#0A2240] font-sans font-black tracking-tighter text-[9.5px] uppercase">SEOYON</span>
          <span className="text-cyan-500 font-sans font-bold text-[9.5px]">E-HWA</span>
        </div>
      );
    case 'GKN':
      return (
        <div className="flex items-center gap-1 select-none bg-[#005596] px-2.5 py-0.5 rounded shadow-sm text-white">
          <span className="font-sans font-black tracking-widest text-[11px] uppercase">GKN</span>
        </div>
      );
    case 'KALYANI':
      return (
        <div className="flex items-center gap-1.5 select-none">
          <div className="w-1.5 h-3.5 bg-amber-500 rounded-sm" />
          <span className="text-slate-900 font-sans font-black tracking-[0.1em] text-[11px] uppercase">KALYANI</span>
        </div>
      );
    case 'EATON':
      return (
        <div className="flex items-center gap-1 select-none">
          <span className="text-[#005EB8] font-sans font-black italic tracking-tighter text-[14px]">EATON</span>
          <div className="h-2 w-2 rounded-full bg-lime-500" />
        </div>
      );
    case 'GEDIA':
      return (
        <div className="flex flex-col items-center select-none leading-none">
          <span className="text-[#102B4C] font-sans font-black tracking-[0.15em] text-[12px] uppercase">GEDIA</span>
          <span className="text-[#FF8C00] text-[5.5px] tracking-[0.2em] font-extrabold uppercase mt-0.5">Automotive</span>
        </div>
      );
    case 'ENDURANCE':
      return (
        <div className="flex flex-col items-center select-none leading-none">
          <span className="text-slate-900 font-sans font-black tracking-widest text-xs uppercase italic skew-x-[-8deg]">ENDURANCE</span>
          <div className="w-12 h-[2px] bg-[#E31E24] mt-0.5 rounded-full" />
        </div>
      );
    case 'TOPBAND':
      return (
        <div className="flex items-center gap-0.5 select-none">
          <span className="text-[#FF6B00] font-sans font-black text-sm uppercase">Top</span>
          <span className="text-[#1A4F87] font-sans font-black text-sm uppercase">band</span>
        </div>
      );
    case 'THERMAX':
      return (
        <div className="flex items-center gap-1 select-none">
          <span className="text-[#E31E24] font-sans font-black tracking-widest text-[12px] uppercase">THERMAX</span>
        </div>
      );
    case 'SANSERA':
      return (
        <div className="flex flex-col items-center select-none leading-none border border-slate-200 px-2 py-0.5 rounded-md bg-white shadow-sm">
          <span className="text-slate-900 font-sans font-black tracking-widest text-[9.5px] uppercase">SANSERA</span>
        </div>
      );
    default:
      break;
  }

  // If has custom image fallback
  if (logo.logoType === 'image' && logo.src) {
    return (
      <img
        src={logo.src}
        alt={name}
        className="block max-h-8 max-w-[6.5rem] object-contain sm:max-h-10 sm:max-w-[8.5rem] filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
        loading="eager"
        decoding="async"
        width="110"
        height="35"
        draggable={false}
      />
    );
  }

  return (
    <span className="text-slate-800 font-extrabold text-sm tracking-wide uppercase select-none">
      {name}
    </span>
  );
}

function getHoverClasses(name) {
  const key = (name || '').trim().toUpperCase();
  switch (key) {
    case 'HAIER':
      return 'hover:shadow-[0_8px_24px_rgba(0,90,156,0.18)] hover:border-[#005A9C]/40';
    case 'LG':
      return 'hover:shadow-[0_8px_24px_rgba(165,0,52,0.18)] hover:border-[#A50034]/40';
    case 'HYUNDAI':
      return 'hover:shadow-[0_8px_24px_rgba(0,44,95,0.18)] hover:border-[#002C5F]/40';
    case 'TATA AUTOCOMP':
    case 'TATA':
      return 'hover:shadow-[0_8px_24px_rgba(0,90,156,0.18)] hover:border-[#005A9C]/40';
    case 'FIAT':
      return 'hover:shadow-[0_8px_24px_rgba(143,22,48,0.18)] hover:border-[#8F1630]/40';
    case 'BLUE STAR':
      return 'hover:shadow-[0_8px_24px_rgba(11,44,92,0.18)] hover:border-[#0B2C5C]/40';
    case 'MRF':
      return 'hover:shadow-[0_8px_24px_rgba(210,38,48,0.18)] hover:border-[#D22630]/40';
    case 'JABIL':
      return 'hover:shadow-[0_8px_24px_rgba(16,185,129,0.18)] hover:border-emerald-500/45';
    case 'VOLTAS':
      return 'hover:shadow-[0_8px_24px_rgba(0,164,153,0.18)] hover:border-[#00A499]/40';
    case 'HAVELLS':
      return 'hover:shadow-[0_8px_24px_rgba(227,30,36,0.18)] hover:border-[#E31E24]/40';
    case 'FORCE MOTORS':
      return 'hover:shadow-[0_8px_24px_rgba(255,107,0,0.18)] hover:border-[#FF6B00]/40';
    case 'ITC LIMITED':
    case 'ITC':
      return 'hover:shadow-[0_8px_24px_rgba(0,122,62,0.18)] hover:border-[#007A3E]/40';
    case 'EXIDE':
      return 'hover:shadow-[0_8px_24px_rgba(237,28,36,0.18)] hover:border-[#ED1C24]/40';
    case 'JSW':
      return 'hover:shadow-[0_8px_24px_rgba(31,78,121,0.18)] hover:border-[#1F4E79]/40';
    case 'MAHINDRA CIE AUTOMOTIVE':
    case 'MAHINDRA CIE':
      return 'hover:shadow-[0_8px_24px_rgba(227,24,55,0.18)] hover:border-[#E31837]/40';
    case 'FORBES MARSHALL':
      return 'hover:shadow-[0_8px_24px_rgba(26,79,135,0.18)] hover:border-[#1A4F87]/40';
    case 'CARRIER MIDEA INDIA':
    case 'CARRIER MIDEA':
      return 'hover:shadow-[0_8px_24px_rgba(241,136,37,0.18)] hover:border-[#F18825]/40';
    case 'BRITANNIA':
      return 'hover:shadow-[0_8px_24px_rgba(210,38,48,0.18)] hover:border-[#D22630]/40';
    case 'SEOYON E-HWA':
      return 'hover:shadow-[0_8px_24px_rgba(10,34,64,0.18)] hover:border-[#0A2240]/40';
    case 'GKN':
      return 'hover:shadow-[0_8px_24px_rgba(0,85,150,0.18)] hover:border-[#005596]/40';
    case 'KALYANI':
      return 'hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:border-slate-800/40';
    case 'EATON':
      return 'hover:shadow-[0_8px_24px_rgba(0,94,184,0.18)] hover:border-[#005EB8]/40';
    case 'GEDIA':
      return 'hover:shadow-[0_8px_24px_rgba(16,43,76,0.18)] hover:border-[#102B4C]/40';
    case 'ENDURANCE':
      return 'hover:shadow-[0_8px_24px_rgba(227,30,36,0.18)] hover:border-[#E31E24]/40';
    case 'TOPBAND':
      return 'hover:shadow-[0_8px_24px_rgba(255,107,0,0.18)] hover:border-[#FF6B00]/40';
    case 'THERMAX':
      return 'hover:shadow-[0_8px_24px_rgba(227,30,36,0.18)] hover:border-[#E31E24]/40';
    case 'SANSERA':
      return 'hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:border-slate-300/45';
    default:
      return 'hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-slate-300';
  }
}

export default function CompanyMarquee() {
  const [logos, setLogos] = React.useState(FALLBACK_LOGOS);

  React.useEffect(() => {
    if (!STRAPI_BASE_URL) return;

    const controller = new AbortController();

    (async () => {
      try {
        const data = await fetchCollection('/api/client-logos?populate=logo&sort=order:asc&pagination[pageSize]=100');
        const mapped = data
          .map((entry) => {
            const logoUrl = extractMediaUrl(entry.logo);
            const name = entry.name;
            const version = entry.updatedAt || entry.logo?.updatedAt || entry.documentId || entry.id;
            return {
              src: withCacheBuster(logoUrl, version),
              alt: name || 'Company logo',
            };
          })
          .filter((item) => Boolean(item.src));

        if (mapped.length > 0) {
          const backendLogos = mapped.map((item) => ({
            name: item.alt,
            src: item.src,
            logoType: 'image'
          }));
          setLogos(backendLogos);
        }
      } catch {
        // keep fallback logos
      }
    })();

    return () => controller.abort();
  }, []);

  const loop = React.useMemo(() => {
    if (!logos.length) return [];
    const minCards = 18;
    const cycle = [...logos];
    while (cycle.length < minCards) {
      cycle.push(...logos);
    }
    const trimmed = cycle.slice(0, Math.max(minCards, logos.length));
    return [trimmed, trimmed, trimmed];
  }, [logos]);

  return (
    <section 
      id="clients" 
      className="relative bg-transparent px-4 py-20 text-slate-900 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(rgba(15, 42, 77, 0.08) 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-800 border border-orange-100/50">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-600 animate-pulse" />
              Trusted Partner Network
            </span>
            <h2 className="mt-3.5 text-3xl font-extrabold tracking-tight text-[#0f2a4d] sm:text-4xl">
              Connecting Talent with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0f2a4d] via-[#1a4f87] to-orange-700">
                450+ Industry Leaders
              </span>
            </h2>
            <p className="mt-3 text-base font-semibold text-slate-500">
              We partner with India's leading corporate groups and manufacturing giants to provide genuine, skill-driven career opportunities.
            </p>
          </div>

          <Link
            to="/client"
            className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200/80 bg-white px-6 text-sm font-bold text-slate-900 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md active:scale-95 hover:border-slate-300"
            aria-label="View all client companies"
          >
            View all partners
          </Link>
        </div>

        {/* Single Row Clean Marquee Container */}
        <div className="mt-14 overflow-hidden py-2">
          
          <div className="tspl-marquee group relative w-full overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="tspl-marquee__track flex w-max items-center group-hover:[animation-play-state:paused] transition-all">
              {loop.map((group, groupIndex) => (
                <div key={`marquee-group-${groupIndex}`} className="flex items-center gap-5 pr-5">
                  {group.map((logo, index) => {
                    const name = logo.name || logo.alt;
                    const customHover = getHoverClasses(name);
                    return (
                      <div
                        key={`${name}-${groupIndex}-${index}`}
                        className={`flex h-16 w-36 flex-none items-center justify-center rounded-[16px] sm:rounded-[20px] border border-slate-200/40 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.015)] px-3 transition-all duration-300 hover:scale-105 hover:z-10 sm:h-20 sm:w-48 ${customHover}`}
                      >
                        {renderCustomLogo(logo, name)}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
