import React from 'react';
import { Link } from 'react-router-dom';
import { STRAPI_BASE_URL, fetchCollection, extractMediaUrl } from '../utils/strapi';

const FALLBACK_LOGOS = [
  { name: 'Haier', src: '/haier-logo.png', logoType: 'image' },
  { name: 'Fiat', logoType: 'text' },
  { name: 'LG', logoType: 'text' },
  { name: 'Hyundai', logoType: 'text' },
  { name: 'JCB', src: '/JCB_(company)-Logo.wine.svg', logoType: 'image' },
  { name: 'TATA', logoType: 'text' },
  { name: 'Blue Star', logoType: 'text' },
  { name: 'MRF', src: '/Mrf-logo.png', logoType: 'image' },
  { name: 'Jabil', logoType: 'text' },
  { name: 'Exide', logoType: 'text' },
  { name: 'Voltas', logoType: 'text' },
  { name: 'Aptiv', logoType: 'text' },
  { name: 'JSW', logoType: 'text' },
  { name: 'Lumax', logoType: 'text' },
  { name: 'Havells', logoType: 'text' },
  { name: 'And Many More...', logoType: 'text' }
];

function withCacheBuster(url, version) {
  if (!url || !version) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${encodeURIComponent(version)}`;
}

function renderCustomLogo(logo, name) {
  if (logo.logoType === 'image') {
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

  switch (name) {
    case 'Fiat':
      return (
        <div className="flex items-center gap-1.5 select-none">
          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#8F1630] text-[6.5px] font-bold text-[#8F1630]">F</span>
          <span className="text-[#8F1630] font-serif font-black tracking-widest text-sm uppercase italic">FIAT</span>
        </div>
      );
    case 'LG':
      return (
        <div className="flex items-center gap-1.5 select-none">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C60C30] text-[9px] font-bold text-white">L</span>
          <span className="text-[#C60C30] font-sans font-black tracking-tight text-base">LG</span>
        </div>
      );
    case 'Hyundai':
      return (
        <div className="flex items-center gap-1.5 select-none">
          <span className="flex h-4 w-6 items-center justify-center rounded-full border border-[#002C5F] text-[7.5px] font-black text-[#002C5F] -skew-x-12 italic">H</span>
          <span className="text-[#002C5F] font-sans font-black italic tracking-widest text-[11px] uppercase">HYUNDAI</span>
        </div>
      );
    case 'TATA':
      return (
        <div className="flex items-center gap-1.5 select-none">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#005A9C] text-[9px] font-bold text-white">T</span>
          <span className="text-[#005A9C] font-sans font-extrabold tracking-[0.12em] text-base">TATA</span>
        </div>
      );
    case 'Blue Star':
      return (
        <div className="flex items-center gap-1 select-none">
          <span className="text-blue-600 text-sm">★</span>
          <span className="text-[#0B2C5C] font-sans font-black tracking-[0.06em] text-[10px] uppercase">BLUE STAR</span>
        </div>
      );
    case 'Jabil':
      return (
        <div className="flex items-center gap-1.5 select-none">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[#005691] font-sans font-black tracking-tight text-base">JABIL</span>
        </div>
      );
    case 'Exide':
      return (
        <div className="flex items-center gap-1 bg-[#ED1C24] px-1.5 py-0.5 rounded text-white select-none">
          <span className="font-sans font-black italic tracking-widest text-[11px] uppercase">EXIDE</span>
        </div>
      );
    case 'Voltas':
      return (
        <div className="flex items-center gap-1 select-none">
          <span className="text-[#00A499] text-xs font-bold">~</span>
          <span className="text-[#00A499] font-sans font-extrabold tracking-wide text-sm uppercase">VOLTAS</span>
        </div>
      );
    case 'Aptiv':
      return (
        <div className="flex items-center gap-1.5 select-none">
          <span className="h-3 w-0.5 bg-[#FF4F00]" />
          <span className="text-[#FF4F00] font-sans font-black tracking-tighter text-lg">APTIV</span>
        </div>
      );
    case 'JSW':
      return (
        <div className="flex items-center gap-1 select-none">
          <span className="bg-[#1F4E79] px-1 py-0.5 rounded text-white text-[7.5px] font-bold">JSW</span>
          <span className="text-[#1F4E79] font-sans font-black tracking-wider text-[11px] uppercase">Group</span>
        </div>
      );
    case 'Lumax':
      return (
        <div className="flex items-center gap-1 select-none">
          <span className="h-2 w-2 rounded-sm bg-[#D22630]" />
          <span className="text-[#D22630] font-sans font-extrabold tracking-widest text-sm uppercase">LUMAX</span>
        </div>
      );
    case 'Havells':
      return (
        <div className="flex items-center gap-1 select-none">
          <span className="text-red-600 text-xs">■</span>
          <span className="text-slate-900 font-sans font-black tracking-tighter text-base uppercase italic">HAVELLS</span>
        </div>
      );
    case 'And Many More...':
      return (
        <div className="flex items-center gap-1.5 text-[#FF8C00] font-sans font-black tracking-wide text-xs sm:text-sm animate-pulse select-none">
          <span>✨</span>
          <span>& More</span>
        </div>
      );
    default:
      return (
        <span className="text-slate-800 font-extrabold text-sm tracking-wide uppercase select-none">
          {name}
        </span>
      );
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
    if (!logos.length) return FALLBACK_LOGOS;

    const minCards = 18;
    const cycle = [...logos];
    while (cycle.length < minCards) {
      cycle.push(...logos);
    }

    const trimmedCycle = cycle.slice(0, Math.max(minCards, logos.length));
    return [trimmedCycle, trimmedCycle, trimmedCycle];
  }, [logos]);

  return (
    <section id="clients" className="relative bg-transparent px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF8C00]">Trusted by</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              450+ leading companies across India
            </h2>
            <p className="mt-3 text-base font-semibold text-slate-600">
              We partner with employers to connect skilled talent with real opportunities.
            </p>
          </div>

          <Link
            to="/client"
            className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200/80 bg-white px-6 text-sm font-bold text-slate-900 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md active:scale-95"
            aria-label="View all client companies"
          >
            View all
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] sm:rounded-full border border-white/60 bg-white/35 p-1.5 shadow-lg backdrop-blur-md">
          <div className="tspl-marquee relative w-full overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="tspl-marquee__track flex w-max items-center">
              {loop.map((group, groupIndex) => (
                <div key={`marquee-group-${groupIndex}`} className="flex items-center gap-5 pr-5">
                  {group.map((logo, index) => {
                    const name = logo.name || logo.alt;
                    return (
                      <div
                        key={`${name}-${groupIndex}-${index}`}
                        className="flex h-16 w-36 flex-none items-center justify-center rounded-[14px] sm:rounded-[20px] border border-white/80 bg-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.015)] backdrop-blur-sm px-3 transition-all duration-300 hover:scale-[1.04] hover:bg-white/95 hover:shadow-[0_8px_20px_rgba(0,0,0,0.03)] sm:h-20 sm:w-48"
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
