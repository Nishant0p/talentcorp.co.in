import { useEffect } from 'react';

export default function useSEO({ title, description, keywords, image, url }) {
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

    if (image) {
      setMetaProperty('og:image', image);
      setMetaName('twitter:image', image);
    }

    if (url) {
      setMetaProperty('og:url', url);
    } else if (typeof window !== 'undefined') {
      setMetaProperty('og:url', window.location.href);
    }
  }, [title, description, keywords, image, url]);
}

function setMetaName(name, content) {
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setMetaProperty(property, content) {
  let element = document.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}
