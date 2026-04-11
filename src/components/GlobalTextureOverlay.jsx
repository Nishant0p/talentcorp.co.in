import React from 'react';

const STRAPI_BASE_URL =
  import.meta.env.VITE_STRAPI_API_URL ||
  import.meta.env.NEXT_PUBLIC_STRAPI_API_URL ||
  '';

const DEFAULT_TEXTURE_URL =
  'https://assets-news.housing.com/news/wp-content/uploads/2023/09/07214637/Top-10-manufacturing-companies-in-Coimbatore-f.jpg';

function resolveStrapiUrl(url) {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  if (!STRAPI_BASE_URL) return url;
  return `${STRAPI_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

export default function GlobalTextureOverlay() {
  const [textureUrl, setTextureUrl] = React.useState(DEFAULT_TEXTURE_URL);
  const [enabled, setEnabled] = React.useState(true);

  React.useEffect(() => {
    if (!STRAPI_BASE_URL) return;

    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(`${STRAPI_BASE_URL}/api/site-texture?populate=texture`, {
          signal: controller.signal,
        });
        if (!res.ok) return;
        const json = await res.json();

        const attrs = json?.data?.attributes;
        if (typeof attrs?.enabled === 'boolean') setEnabled(attrs.enabled);

        const url = attrs?.texture?.data?.attributes?.url;
        const resolved = resolveStrapiUrl(url);
        if (resolved) {
          setTextureUrl(resolved);
        }
      } catch {
        // ignore, keep defaults
      }
    })();

    return () => controller.abort();
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[15]">
      {textureUrl ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${textureUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.1,
            mixBlendMode: 'normal',
            filter: 'grayscale(1) blur(2px) contrast(0.6) brightness(1.35) saturate(0)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0, transparent 82svh, rgba(0,0,0,0.92) 96svh, rgba(0,0,0,1) 100svh)',
            maskImage:
              'linear-gradient(to bottom, transparent 0, transparent 82svh, rgba(0,0,0,0.92) 96svh, rgba(0,0,0,1) 100svh)',
          }}
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
