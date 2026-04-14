export const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_API_URL || 'https://backend.tsplgroup.co.in';

export const resolveStrapiUrl = (url) => {
  if (!url) return '';
  if (typeof url !== 'string') return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('/')) return `${STRAPI_BASE_URL}${url}`;
  return `${STRAPI_BASE_URL}/uploads/${url}`;
};

export const normalizeStrapiEntry = (entry) => {
  if (!entry) return null;
  const attributes = entry.attributes || entry;
  return {
    id: entry.id ?? attributes.id,
    documentId: entry.documentId ?? attributes.documentId,
    ...attributes,
  };
};

export const normalizeStrapiCollection = (data) => {
  if (!Array.isArray(data)) return [];
  return data.map(normalizeStrapiEntry).filter(Boolean);
};

export const extractMediaUrl = (media) => {
  if (!media) return '';

  const node = media?.data?.attributes || media?.data || media;
  const optimizedCandidate =
    node?.formats?.large?.url ||
    node?.formats?.medium?.url ||
    node?.formats?.small?.url ||
    node?.formats?.thumbnail?.url;

  const candidate = optimizedCandidate || node?.url || media?.url || media;
  return resolveStrapiUrl(candidate);
};

const fetchJson = async (path) => {
  const response = await fetch(`${STRAPI_BASE_URL}${path}`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Request failed: ${path}`);
  }
  return response.json();
};

const getPluralFallbackPath = (path) => {
  const [pathname, queryString = ''] = path.split('?');
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return path;

  const lastSegment = segments[segments.length - 1];
  if (lastSegment.endsWith('s')) return path;

  segments[segments.length - 1] = `${lastSegment}s`;
  const fallbackPath = `/${segments.join('/')}`;
  return queryString ? `${fallbackPath}?${queryString}` : fallbackPath;
};

export const fetchCollection = async (path) => {
  try {
    const payload = await fetchJson(path);
    return normalizeStrapiCollection(payload?.data || []);
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    return [];
  }
};

export const fetchSingleType = async (path) => {
  try {
    const payload = await fetchJson(path);
    const data = payload?.data;
    if (Array.isArray(data)) {
      return normalizeStrapiEntry(data[0] || null);
    }
    return normalizeStrapiEntry(data || payload || null);
  } catch (error) {
    if (String(error?.message || '').includes(path)) {
      try {
        const fallbackPath = getPluralFallbackPath(path);
        const payload = await fetchJson(fallbackPath);
        const data = payload?.data;
        if (Array.isArray(data)) {
          return normalizeStrapiEntry(data[0] || null);
        }
        return normalizeStrapiEntry(data || payload || null);
      } catch (fallbackError) {
        console.error(`Error fetching ${path}:`, fallbackError);
        return null;
      }
    }
    console.error(`Error fetching ${path}:`, error);
    return null;
  }
};

export const fetchJobs = async () => fetchCollection('/api/jobs?sort=createdAt:desc&pagination[pageSize]=50');
export const fetchNews = async () => fetchCollection('/api/news-events?sort=order:asc,date:desc&pagination[pageSize]=100&populate=image');
export const fetchPageAssets = async () =>
  fetchCollection('/api/page-assets?sort=order:asc,name:asc&pagination[pageSize]=300&populate=image');
export const fetchStrengths = async () => fetchCollection('/api/strengths?sort=order:asc&pagination[pageSize]=10&populate=image');
export const fetchHeroSection = async () => fetchSingleType('/api/hero-section?populate=backgroundImage');
export const fetchHomeStats = async () => fetchCollection('/api/home-stats?sort=order:asc&pagination[pageSize]=20');
export const fetchHomeHighlights = async () => fetchCollection('/api/home-highlights?sort=order:asc&pagination[pageSize]=20');
export const fetchWorkforceCards = async () => fetchCollection('/api/workforce-cards?sort=order:asc&pagination[pageSize]=20&populate=image');
export const fetchFaqItems = async () => fetchCollection('/api/faq-items?sort=order:asc&pagination[pageSize]=50');
export const fetchTestimonials = async () => fetchCollection('/api/testimonials?filters[reviewType][$ne]=company&sort=order:asc&pagination[pageSize]=50&populate=image');
export const fetchFooterSettings = async () => fetchSingleType('/api/footer-setting?populate=logo');

export const createJob = async (jobData) => {
  try {
    const response = await fetch(`${STRAPI_BASE_URL}/api/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: jobData }),
    });
    if (!response.ok) throw new Error('Failed to create job');
    return await response.json();
  } catch (error) {
    console.error('Error creating job:', error);
    return null;
  }
};

export const createNewsEvent = async (eventData) => {
  try {
    const response = await fetch(`${STRAPI_BASE_URL}/api/news-events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: eventData }),
    });
    if (!response.ok) throw new Error('Failed to create news/event');
    return await response.json();
  } catch (error) {
    console.error('Error creating news/event:', error);
    return null;
  }
};

export const submitLead = async (leadData) => {
  const normalizedPayload = {
    ...leadData,
    phone: leadData?.phone || leadData?.mobile || '',
  };
  delete normalizedPayload.mobile;

  const response = await fetch(`${STRAPI_BASE_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: normalizedPayload }),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Submit failed (${response.status}): ${responseText || 'no response body'}`);
  }

  return response.json();
};

export const submitApplicant = async ({ jobId, name, mobile, email }) => {
  const response = await fetch(`${STRAPI_BASE_URL}/api/applicants`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: {
        job: Number(jobId),
        name,
        mobile,
        email,
      },
    }),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Applicant submit failed (${response.status}): ${responseText || 'no response body'}`);
  }

  return response.json();
};

export const getApplicantsExportUrl = (jobId, clearAfterDownload = false) => {
  const params = new URLSearchParams();
  if (jobId !== undefined && jobId !== null && jobId !== '') {
    params.set('jobId', String(jobId));
  }
  if (clearAfterDownload) {
    params.set('clearAfterDownload', 'true');
  }

  const query = params.toString();
  return `${STRAPI_BASE_URL}/api/applicants/export${query ? `?${query}` : ''}`;
};

