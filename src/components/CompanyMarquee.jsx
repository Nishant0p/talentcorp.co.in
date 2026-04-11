import React from 'react';
import { Link } from 'react-router-dom';

const FALLBACK_LOGOS = [
  { src: '/JCB_(company)-Logo.wine.svg', alt: 'JCB' },
  { src: '/Mrf-logo.png', alt: 'MRF' },
  { src: '/haier-logo.png', alt: 'Haier' },
];

const STRAPI_BASE_URL =
  import.meta.env.VITE_STRAPI_API_URL ||
  import.meta.env.NEXT_PUBLIC_STRAPI_API_URL ||
  '';

function resolveStrapiUrl(url) {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  if (!STRAPI_BASE_URL) return url;
  return `${STRAPI_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

export default function CompanyMarquee() {
  const [logos, setLogos] = React.useState(FALLBACK_LOGOS);

  React.useEffect(() => {
    if (!STRAPI_BASE_URL) return;

    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(
          `${STRAPI_BASE_URL}/api/client-logos?populate=logo&sort=order:asc&pagination[pageSize]=100`,
          { signal: controller.signal }
        );

        if (!res.ok) return;
        const json = await res.json();
        const data = Array.isArray(json?.data) ? json.data : [];
        const mapped = data
          .map((entry) => {
            const attributes = entry?.attributes || {};
            const logoUrl = attributes?.logo?.data?.attributes?.url;
            const name = attributes?.name;
            return {
              src: resolveStrapiUrl(logoUrl),
              alt: name || 'Company logo',
            };
          })
          .filter((item) => Boolean(item.src));

        if (mapped.length) setLogos(mapped);
      } catch {
        // keep fallback logos
      }
    })();

    return () => controller.abort();
  }, []);

  const base = React.useMemo(() => {
    const repeated = Array.from({ length: 6 }, () => logos).flat();
    return repeated;
  }, [logos]);

  const loop = React.useMemo(() => [...base, ...base], [base]);

  return (
    <section id="clients" className="relative bg-white px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">Trusted by</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Companies across India
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
                  className="flex h-14 w-40 flex-none items-center justify-center px-2"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-10 w-auto max-w-full object-contain opacity-70 grayscale"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
