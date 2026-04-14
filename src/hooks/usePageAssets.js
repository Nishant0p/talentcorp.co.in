import { useEffect, useMemo, useState } from 'react';
import { extractMediaUrl, fetchPageAssets } from '../utils/strapi';

export const usePageAssets = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchPageAssets();
      setAssets(data);
    };

    load();
  }, []);

  return useMemo(() => {
    const map = {};

    assets.forEach((entry) => {
      const key = entry.key || entry.name;
      if (!key) return;

      map[key] = {
        url: extractMediaUrl(entry.image),
        alt: entry.alt || '',
        linkUrl: entry.linkUrl || '',
        targetPath: entry.targetPath || '',
      };
    });

    return map;
  }, [assets]);
};

export const getPageAsset = (assetMap, key, fallbackUrl, fallbackAlt = '') => {
  const asset = assetMap?.[key];
  if (!asset?.url) {
    return { url: fallbackUrl, alt: fallbackAlt, linkUrl: '' };
  }

  return {
    url: asset.url,
    alt: asset.alt || fallbackAlt,
    linkUrl: asset.linkUrl || '',
  };
};
