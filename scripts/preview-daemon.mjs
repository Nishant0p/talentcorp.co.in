import http from 'node:http';
import { prerenderNewsMeta } from './prerender-news-meta.mjs';

const PORT = process.env.PORT || 4040;
const SYNC_INTERVAL_MS = (parseInt(process.env.SYNC_INTERVAL_MINUTES, 10) || 5) * 60 * 1000;

let isRunning = false;
let pendingRun = false;

async function triggerPrerender(reason = 'manual') {
  if (isRunning) {
    console.log(`[daemon] Prerender already in progress. Queued next run (reason: ${reason}).`);
    pendingRun = true;
    return;
  }

  isRunning = true;
  console.log(`[daemon] Starting prerender run (triggered by: ${reason})...`);

  try {
    const count = await prerenderNewsMeta();
    console.log(`[daemon] Prerender completed successfully (${count} pages).`);
  } catch (err) {
    console.error(`[daemon] Prerender failed:`, err);
  } finally {
    isRunning = false;
    if (pendingRun) {
      pendingRun = false;
      setTimeout(() => triggerPrerender('queued-pending'), 2000);
    }
  }
}

// HTTP server to receive Strapi Webhooks or manual trigger calls
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', uptime: process.uptime(), isRunning }));
    return;
  }

  if (url.pathname === '/webhook' || url.pathname === '/api/rebuild' || url.pathname === '/api/sync') {
    // Respond immediately so Strapi webhook doesn't timeout
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'accepted', message: 'Prerender generation triggered' }));

    // Trigger prerender with 1-second debounce
    setTimeout(() => {
      triggerPrerender(`webhook ${req.method} ${url.pathname}`);
    }, 1000);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[daemon] TSPL OpenGraph Preview Daemon listening on http://0.0.0.0:${PORT}`);
  console.log(`[daemon] Webhook URL: http://<server-ip-or-domain>:${PORT}/webhook`);
  console.log(`[daemon] Automatic sync interval: every ${SYNC_INTERVAL_MS / 60000} minutes`);

  // Initial run on startup
  triggerPrerender('daemon-startup');

  // Background recurring sync
  setInterval(() => {
    triggerPrerender('interval-timer');
  }, SYNC_INTERVAL_MS);
});
