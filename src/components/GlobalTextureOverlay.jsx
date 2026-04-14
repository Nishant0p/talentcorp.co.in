import React from 'react';
import { STRAPI_BASE_URL, fetchSingleType, extractMediaUrl } from '../utils/strapi';

const DEFAULT_TEXTURE_URL =
  '/images-10.jpeg';

export default function GlobalTextureOverlay() {
  const [textureUrl, setTextureUrl] = React.useState(DEFAULT_TEXTURE_URL);
  const [enabled, setEnabled] = React.useState(true);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    let idleId;
    let timeoutId;

    const schedule = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => setIsReady(true), { timeout: 1500 });
      } else {
        timeoutId = window.setTimeout(() => setIsReady(true), 800);
      }
    };

    if (document.readyState === 'complete') {
      schedule();
    } else {
      window.addEventListener('load', schedule, { once: true });
    }

    return () => {
      window.removeEventListener('load', schedule);
      if (typeof idleId === 'number' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (typeof timeoutId === 'number') {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  React.useEffect(() => {
    if (!isReady) return;
    if (!STRAPI_BASE_URL) return;

    const controller = new AbortController();

    (async () => {
      try {
        const data = await fetchSingleType('/api/site-texture?populate=texture');
        const attrs = data;
        if (typeof attrs?.enabled === 'boolean') setEnabled(attrs.enabled);

        const resolved = extractMediaUrl(attrs?.texture);
        if (resolved) {
          setTextureUrl(resolved);
        }
      } catch {
        // ignore, keep defaults
      }
    })();

    return () => controller.abort();
  }, [isReady]);

  if (!enabled || !isReady) return null;

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
