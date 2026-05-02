import React from 'react';
import { Link } from 'react-router-dom';
import { STRAPI_BASE_URL, fetchCollection, extractMediaUrl } from '../utils/strapi';

const FALLBACK_LOGOS = [
  { src: '/JCB_(company)-Logo.wine.svg', alt: 'JCB' },
  { src: '/Mrf-logo.png', alt: 'MRF' },
  { src: '/haier-logo.png', alt: 'Haier' },
];

function withCacheBuster(url, version) {
  if (!url || !version) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${encodeURIComponent(version)}`;
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

        if (mapped.length) {
          const merged = [...mapped, ...FALLBACK_LOGOS].filter(
            (logo, index, array) =>
              array.findIndex((candidate) => candidate.src === logo.src) === index
          );

          setLogos(merged);
        }
      } catch {
        // keep fallback logos
      }
    })();

    return () => controller.abort();
  }, []);

  const loop = React.useMemo(() => {
    if (!logos.length) return FALLBACK_LOGOS;

    // Keep one marquee cycle reasonably sized, then duplicate it once for seamless looping.
    const minCards = 12;
    const cycle = [...logos];
    while (cycle.length < minCards) {
      cycle.push(...logos);
    }

    const trimmedCycle = cycle.slice(0, Math.max(minCards, logos.length));
    return [...trimmedCycle, ...trimmedCycle];
  }, [logos]);

  return (
    <section id="clients" className="relative bg-white px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">Trusted by</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              450+ leading companies across India
            </h2>
            <p className="mt-3 text-base font-medium text-slate-600">
              We partner with employers to connect skilled talent with real opportunities.
            </p>
          </div>

          <Link
            to="/client"
            className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-bold text-slate-900 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
            aria-label="View all client companies"
          >
            View all
          </Link>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl bg-white">
          <div className="tspl-marquee relative w-full overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="tspl-marquee__track flex w-max items-center gap-8 pr-8">
              {loop.map((logo, index) => (
                <div
                  key={`${logo.alt}-${index}`}
                  className="flex h-24 w-44 flex-none flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white/90 px-3"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-9 w-auto max-w-full object-contain"
                    loading="eager"
                    decoding="async"
                    width="160"
                    height="56"
                    draggable={false}
                  />
                  <p className="mt-2 text-xs font-bold uppercase tracking-wide text-slate-700">{logo.alt}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Partner</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
