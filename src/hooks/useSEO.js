import { useEffect } from 'react';

const ensureAbsoluteUrl = (rawUrl) => {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const trimmed = rawUrl.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://tsplgroup.in';
  return `${origin}${trimmed.startsWith('/') ? '' : '/'}${trimmed}`;
};

export default function useSEO({ title, description, keywords, image, url, type = 'website' }) {
  useEffect(() => {
    if (title) {
      document.title = title;
      setMetaProperty('og:title', title);
      setMetaName('twitter:title', title);
    }
    
    if (description) {
      setMetaName('description', description);
      setMetaProperty('og:description', description);
      setMetaName('twitter:description', description);
    }

    if (keywords) {
      setMetaName('keywords', keywords);
    }

    setMetaProperty('og:type', type);
    setMetaName('twitter:card', 'summary_large_image');

    if (image) {
      const absoluteImage = ensureAbsoluteUrl(image);
      setMetaProperty('og:image', absoluteImage);
      setMetaProperty('og:image:secure_url', absoluteImage);
      setMetaProperty('og:image:alt', title || 'TSPL News & Events');
      setMetaName('twitter:image', absoluteImage);
    }

    const currentUrl = url ? ensureAbsoluteUrl(url) : (typeof window !== 'undefined' ? window.location.href : 'https://tsplgroup.in');
    setMetaProperty('og:url', currentUrl);
    setMetaName('twitter:url', currentUrl);
  }, [title, description, keywords, image, url, type]);
}

function setMetaName(name, content) {
  if (!content) return;
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setMetaProperty(property, content) {
  if (!content) return;
  let element = document.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}
