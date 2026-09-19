import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { Jimp } from 'jimp';

const STRAPI_BASE = 'https://backend.tsplgroup.in';
const SITE_BASE = 'https://tsplgroup.in';

const stripHtml = (val) => {
  if (!val) return '';
  return String(val).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

const fetchJson = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
};

const resolveRawStrapiUrl = (imgObj) => {
  if (!imgObj) return null;
  const url = imgObj.formats?.medium?.url || imgObj.formats?.small?.url || imgObj.url;
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${STRAPI_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
};

async function main() {
  const distDir = path.resolve('dist');
  const indexHtmlPath = path.join(distDir, 'index.html');
  const socialDir = path.join(distDir, 'social-preview');

  if (!fs.existsSync(indexHtmlPath)) {
    console.warn('[prerender] dist/index.html not found, skipping prerender.');
    return;
  }

  fs.mkdirSync(socialDir, { recursive: true });
  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  console.log('[prerender] Fetching news and events from Strapi...');
  let newsList = [];
  try {
    const res = await fetchJson(`${STRAPI_BASE}/api/news-events?sort=order:asc,date:desc&pagination[pageSize]=100&populate=image`);
    newsList = res.data || [];
  } catch (err) {
    console.error('[prerender] Failed to fetch news from Strapi:', err.message);
    return;
  }

  console.log(`[prerender] Processing & optimizing social preview cards for ${newsList.length} items...`);

  let count = 0;
  for (const item of newsList) {
    const title = item.title || 'News & Events';
    const cleanDesc = stripHtml(item.description || item.title || '');
    const desc = cleanDesc.length > 160 ? cleanDesc.slice(0, 160) + '...' : cleanDesc;
    const rawUrl = resolveRawStrapiUrl(item.image);

    let finalImageUrl = `${SITE_BASE}/tspl%20main%20logo.png`;
    let imageBuffer = null;

    if (rawUrl) {
      try {
        const jimpImage = await Jimp.read(rawUrl);
        // WhatsApp & Facebook optimal aspect ratio (1.91:1) at 1200x630
        jimpImage.cover({ w: 1200, h: 630 });
        imageBuffer = await jimpImage.getBuffer('image/jpeg', { quality: 80 });
      } catch (err) {
        console.warn(`[prerender] Failed to optimize image for item ${item.id}:`, err.message);
      }
    }

    const identifiers = [item.id, item.documentId].filter(Boolean);

    for (const id of identifiers) {
      if (imageBuffer) {
        const fileName = `${id}.jpg`;
        fs.writeFileSync(path.join(socialDir, fileName), imageBuffer);
        finalImageUrl = `${SITE_BASE}/social-preview/${fileName}`;
      } else if (rawUrl) {
        finalImageUrl = rawUrl;
      }

      const pageUrl = `${SITE_BASE}/news-events/${id}`;

      let customHtml = baseHtml;

      // Replace title
      customHtml = customHtml.replace(/<title>.*?<\/title>/i, `<title>${title} | TSPL Group</title>`);

      // Replace description
      customHtml = customHtml.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${desc.replace(/"/g, '&quot;')}" />`);

      // Replace OG Title
      if (customHtml.includes('property="og:title"')) {
        customHtml = customHtml.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${title.replace(/"/g, '&quot;')} | TSPL Group" />`);
      }

      // Replace OG Description
      if (customHtml.includes('property="og:description"')) {
        customHtml = customHtml.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${desc.replace(/"/g, '&quot;')}" />`);
      }

      // Replace OG Image with WhatsApp-compliant meta specifications
      const ogImageTags = `
    <meta property="og:image" content="${finalImageUrl}" />
    <meta property="og:image:secure_url" content="${finalImageUrl}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:type" content="article" />`;

      if (customHtml.includes('property="og:image"')) {
        customHtml = customHtml.replace(/<meta property="og:image" content=".*?" \/>/i, ogImageTags.trim());
      }

      // Replace OG URL
      if (customHtml.includes('property="og:url"')) {
        customHtml = customHtml.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${pageUrl}" />`);
      }

      // Replace Twitter Tags
      if (customHtml.includes('name="twitter:title"')) {
        customHtml = customHtml.replace(
          /<meta name="twitter:title" content=".*?" \/>/i,
          `<meta name="twitter:title" content="${title.replace(/"/g, '&quot;')} | TSPL Group" />\n    <meta name="twitter:description" content="${desc.replace(/"/g, '&quot;')}" />\n    <meta name="twitter:image" content="${finalImageUrl}" />`
        );
      }

      const targetDir = path.join(distDir, 'news-events', String(id));
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, 'index.html'), customHtml, 'utf8');
      count++;
    }
  }

  console.log(`[prerender] Successfully generated ${count} WhatsApp & social-ready preview pages!`);
}

main();
