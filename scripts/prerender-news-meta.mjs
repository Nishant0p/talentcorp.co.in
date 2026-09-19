import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

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

const resolveMedia = (imgObj) => {
  if (!imgObj) return `${SITE_BASE}/tspl%20main%20logo.png`;
  const url = imgObj.formats?.large?.url || imgObj.formats?.medium?.url || imgObj.url;
  if (!url) return `${SITE_BASE}/tspl%20main%20logo.png`;
  if (url.startsWith('http')) return url;
  return `${STRAPI_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
};

async function main() {
  const distDir = path.resolve('dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.warn('[prerender] dist/index.html not found, skipping prerender.');
    return;
  }

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

  console.log(`[prerender] Generating social meta previews for ${newsList.length} news items...`);

  let count = 0;
  for (const item of newsList) {
    const title = item.title || 'News & Events';
    const cleanDesc = stripHtml(item.description || item.title || '');
    const desc = cleanDesc.length > 160 ? cleanDesc.slice(0, 160) + '...' : cleanDesc;
    const imageUrl = resolveMedia(item.image);

    const identifiers = [item.id, item.documentId].filter(Boolean);

    for (const id of identifiers) {
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

      // Replace OG Image
      if (customHtml.includes('property="og:image"')) {
        customHtml = customHtml.replace(/<meta property="og:image" content=".*?" \/>/i, `<meta property="og:image" content="${imageUrl}" />\n    <meta property="og:image:secure_url" content="${imageUrl}" />\n    <meta property="og:type" content="article" />`);
      }

      // Replace OG URL
      if (customHtml.includes('property="og:url"')) {
        customHtml = customHtml.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${pageUrl}" />`);
      }

      // Replace Twitter Tags
      if (customHtml.includes('name="twitter:title"')) {
        customHtml = customHtml.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${title.replace(/"/g, '&quot;')} | TSPL Group" />\n    <meta name="twitter:description" content="${desc.replace(/"/g, '&quot;')}" />\n    <meta name="twitter:image" content="${imageUrl}" />`);
      }

      const targetDir = path.join(distDir, 'news-events', String(id));
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, 'index.html'), customHtml, 'utf8');
      count++;
    }
  }

  console.log(`[prerender] Successfully generated ${count} news detail social preview pages!`);
}

main();
