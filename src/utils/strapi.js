export const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_API_URL || 'https://backend.tsplgroup.in';
import { submitToGoogleSheet } from './googleSheets';

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
  const variants = extractMediaVariants(media);
  const isSmallViewport = typeof window !== 'undefined' && window.innerWidth <= 768;

  if (isSmallViewport) {
    return variants.medium || variants.small || variants.thumbnail || variants.large || variants.original || '';
  }

  return variants.large || variants.medium || variants.small || variants.original || variants.thumbnail || '';
};

export const extractMediaVariants = (media) => {
  if (!media) {
    return {
      thumbnail: '',
      small: '',
      medium: '',
      large: '',
      original: '',
      low: '',
      high: '',
    };
  }

  if (typeof media === 'string') {
    const url = resolveStrapiUrl(media);
    return {
      thumbnail: url,
      small: url,
      medium: url,
      large: url,
      original: url,
      low: url,
      high: url,
    };
  }

  const node = media?.data?.attributes || media?.data || media;
  const formats = node?.formats || {};

  const thumbnail = resolveStrapiUrl(formats?.thumbnail?.url || '');
  const small = resolveStrapiUrl(formats?.small?.url || '');
  const medium = resolveStrapiUrl(formats?.medium?.url || '');
  const large = resolveStrapiUrl(formats?.large?.url || '');
  const original = resolveStrapiUrl(node?.url || media?.url || '');

  const low = thumbnail || small || medium || large || original;
  const high = large || medium || small || original || thumbnail;

  return {
    thumbnail,
    small,
    medium,
    large,
    original,
    low,
    high,
  };
};

const fetchJson = async (path) => {
  const response = await fetch(`${STRAPI_BASE_URL}${path}`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Request failed: ${path}`);
  }
  return response.json();
};

let jobsCache = null;
let jobsCacheAt = 0;
const JOBS_CACHE_TTL_MS = 60 * 1000;

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

export const fetchJobs = async ({ force = false } = {}) => {
  const now = Date.now();
  if (!force && jobsCache && now - jobsCacheAt < JOBS_CACHE_TTL_MS) {
    return jobsCache;
  }

  const jobs = await fetchCollection(
    '/api/jobs?filters[publishedAt][$notNull]=true&sort=createdAt:asc,id:asc&pagination[pageSize]=50&populate=*'
  );

  jobsCache = jobs;
  jobsCacheAt = now;
  return jobs;
};
export const fetchNews = async () => fetchCollection('/api/news-events?sort=order:asc,date:desc&pagination[pageSize]=100&populate=image');
export const fetchPageAssets = async () =>
  fetchCollection('/api/page-assets?sort=order:asc,name:asc&pagination[pageSize]=300&populate=image');
export const fetchStrengths = async () => fetchCollection('/api/strengths?sort=order:asc&pagination[pageSize]=10&populate=image');
export const fetchHeroSection = async () => fetchSingleType('/api/hero-section?populate=backgroundImage');
export const fetchHomeStats = async () => fetchCollection('/api/home-stats?sort=order:asc&pagination[pageSize]=20');
export const fetchHomeHighlights = async () => fetchCollection('/api/home-highlights?sort=order:asc&pagination[pageSize]=20');
export const fetchWorkforceCards = async () =>
  fetchCollection('/api/workforce-cards?filters[publishedAt][$notNull]=true&sort=order:asc&pagination[pageSize]=20&populate=image');
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

  const googleSheetsPayload = {
    fullName: normalizedPayload?.name || '',
    email: normalizedPayload?.email || '',
    phone: normalizedPayload?.phone || '',
    service: normalizedPayload?.subject || normalizedPayload?.service || 'Service enquiry',
    message: normalizedPayload?.message || '',
    consent: true,
  };

  const googleSubmitPromise = submitToGoogleSheet(googleSheetsPayload).catch((error) => {
    console.warn('Google Sheets lead sync failed:', error);
    return null;
  });

  const response = await fetch(`${STRAPI_BASE_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: normalizedPayload }),
  });

  if (!response.ok) {
    await googleSubmitPromise;
    const responseText = await response.text();
    throw new Error(`Submit failed (${response.status}): ${responseText || 'no response body'}`);
  }

  const result = await response.json();
  await googleSubmitPromise;
  return result;
};

export const submitApplicant = async ({ jobId, name, mobile, email, pageName = '', cvFile = null, googleSheetsPayload: googleSheetsPayloadOverride, skipGoogleSheet = false }) => {
  const googleSheetsPayload = {
    fullName: name || '',
    email: email || '',
    phone: mobile || '',
    service: 'Job application',
    message: `Job ID: ${String(jobId || '')}`,
    consent: true,
    ...(googleSheetsPayloadOverride || {}),
  };

  const googleSubmitPromise = skipGoogleSheet
    ? Promise.resolve(null)
    : submitToGoogleSheet(googleSheetsPayload).catch((error) => {
      console.warn('Google Sheets applicant sync failed:', error);
      return null;
    });

  // Upload CV to Google Drive if file is provided
  let cvUploadPromise = Promise.resolve(null);
  if (cvFile) {
    cvUploadPromise = uploadCvToGoogleDrive(cvFile, name, pageName, email, mobile).catch((error) => {
      console.warn('CV upload to Google Drive failed:', error);
      return null;
    });
  }

  const response = await fetch(`${STRAPI_BASE_URL}/api/applicants`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: {
        job: Number(jobId),
        name,
        mobile,
        email,
        pageName,
      },
    }),
  });

  if (!response.ok) {
    await Promise.all([googleSubmitPromise, cvUploadPromise]);
    const responseText = await response.text();
    throw new Error(`Applicant submit failed (${response.status}): ${responseText || 'no response body'}`);
  }

  const result = await response.json();
  await Promise.all([googleSubmitPromise, cvUploadPromise]);
  return result;
};

export const uploadCvToGoogleDrive = async (cvFile, applicantName, jobTitle, applicantEmail = '', applicantMobile = '') => {
  try {
    const GOOGLE_APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || '';
    
    if (!GOOGLE_APPS_SCRIPT_URL) {
      console.warn('Google Apps Script URL not configured. CV will not be uploaded to Google Drive.');
      return null;
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async () => {
        try {
          // Extract base64 from data URL
          const base64Data = reader.result.split(',')[1];

          const payload = {
            action: 'uploadResume',
            fileContentBase64: base64Data,
            fileName: `${applicantName}_CV_${Date.now()}`,
            mimeType: cvFile.type || 'application/pdf',
            fileSize: cvFile.size,
            fullName: applicantName,
            email: applicantEmail,
            phone: applicantMobile,
            jobType: jobTitle,
            source: 'website',
          };

          const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            const result = await response.json();
            console.log('CV uploaded successfully:', result);
            resolve(result);
          } else {
            reject(new Error(`Upload failed: ${response.statusText}`));
          }
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('File read failed'));
      reader.readAsDataURL(cvFile);
    });
  } catch (error) {
    console.error('Error uploading CV:', error);
    throw error;
  }
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

