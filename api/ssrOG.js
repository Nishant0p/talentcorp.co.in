export default async function handler(req, res) {
  const { newsId } = req.query;

  // 1. Fetch news data from Strapi API
  let title = "TSPL Group - News & Events";
  let description = "Read the latest news and updates from TSPL Group.";
  let imageUrl = "https://tsplgroup.in/tspl%20main%20logo.png";

  try {
    const apiRes = await fetch('https://backend.tsplgroup.in/api/news-events?sort=order:asc,date:desc&pagination[pageSize]=100&populate=image');
    if (apiRes.ok) {
      const responseData = await apiRes.json();
      const data = responseData.data || [];
      const newsItem = data.find(item => String(item.documentId || item.id) === String(newsId));
      if (newsItem) {
        title = newsItem.title || title;
        
        // Strip HTML from description
        const rawDesc = newsItem.description || '';
        const cleanDesc = rawDesc.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        description = cleanDesc.length > 200 ? cleanDesc.slice(0, 200) + '...' : cleanDesc;

        // Extract media URL
        if (newsItem.image) {
          const imgAttr = newsItem.image.formats || newsItem.image;
          const formats = imgAttr.formats || {};
          const imgUrl = formats.large?.url || formats.medium?.url || formats.small?.url || imgAttr.url || '';
          if (imgUrl) {
            if (imgUrl.startsWith('http')) {
              imageUrl = imgUrl;
            } else {
              imageUrl = `https://backend.tsplgroup.in${imgUrl}`;
            }
          }
        }
      }
    }
  } catch (err) {
    console.error('Error fetching news metadata:', err);
  }

  // 2. Fetch the production-built index.html from the current host
  let html = '';
  try {
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'tsplgroup.in';
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const indexUrl = `${protocol}://${host}/index.html`;
    const indexRes = await fetch(indexUrl);
    if (indexRes.ok) {
      html = await indexRes.text();
    } else {
      throw new Error(`Failed to fetch index.html: ${indexRes.status}`);
    }
  } catch (err) {
    console.error('Error fetching base index.html:', err);
    // Fallback html structure
    html = `<!DOCTYPE html><html><head><title>${title}</title><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta name="description" content="${description}"/><meta property="og:title" content="${title}"/><meta property="og:description" content="${description}"/><meta property="og:image" content="${imageUrl}"/><meta property="og:url" content="https://tsplgroup.in/news-events/${newsId}"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${title}"/><meta name="twitter:description" content="${description}"/><meta name="twitter:image" content="${imageUrl}"/></head><body><div id="root"></div></body></html>`;
  }

  // 3. Inject the Open Graph tags into the HTML
  if (html) {
    html = html
      .replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`)
      .replace(/<meta property="og:title" content="[^"]*"/i, `<meta property="og:title" content="${title}"`)
      .replace(/<meta property="og:description" content="[^"]*"/i, `<meta property="og:description" content="${description}"`)
      .replace(/<meta property="og:image" content="[^"]*"/i, `<meta property="og:image" content="${imageUrl}"`)
      .replace(/<meta property="og:url" content="[^"]*"/i, `<meta property="og:url" content="https://tsplgroup.in/news-events/${newsId}"`)
      .replace(/<meta name="description" content="[^"]*"/i, `<meta name="description" content="${description}"`)
      .replace(/<meta name="twitter:title" content="[^"]*"/i, `<meta name="twitter:title" content="${title}"`)
      .replace(/<meta name="twitter:description" content="[^"]*"/i, `<meta name="twitter:description" content="${description}"`)
      .replace(/<meta name="twitter:image" content="[^"]*"/i, `<meta name="twitter:image" content="${imageUrl}"`);
  }

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
