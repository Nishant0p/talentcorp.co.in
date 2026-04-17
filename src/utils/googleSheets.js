/**
 * Submit form data to Google Sheets via Apps Script Web App
 * @param {Object} formData - The form data to submit
 * @param {string} formData.fullName - Full name
 * @param {string} formData.email - Email address
 * @param {string} formData.phone - Phone number
 * @param {string} formData.service - Service interested in
 * @param {string} formData.message - Message
 * @param {boolean} formData.consent - Consent checkbox
 * @returns {Promise<Object>} - Response from the sheet
 */
export const submitToGoogleSheet = async (formData) => {
  const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL?.trim();
  const submittedAt = new Date().toISOString();
  
  if (!GOOGLE_SHEETS_URL) {
    console.warn('Google Sheets URL not configured. Skipping sheet submission.');
    return {
      status: 'error',
      message: 'Google Sheets URL not configured',
      submittedAt,
    };
  }

  const payload = {
    fullName: String(formData.fullName || ''),
    email: String(formData.email || ''),
    phone: String(formData.phone || ''),
    service: String(formData.service || ''),
    message: String(formData.message || ''),
    consent: String(Boolean(formData.consent)),
    source: 'website',
  };

  const formEncodedBody = new URLSearchParams(payload).toString();

  const submitViaBeacon = () => {
    if (typeof navigator === 'undefined' || typeof navigator.sendBeacon !== 'function') {
      return false;
    }
    const blob = new Blob([formEncodedBody], {
      type: 'application/x-www-form-urlencoded;charset=UTF-8',
    });
    return navigator.sendBeacon(GOOGLE_SHEETS_URL, blob);
  };

  const submitFormEncoded = async () => {
    await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      body: formEncodedBody,
      // Keep request "simple" so browser sends it in no-cors mode.
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      mode: 'no-cors', // Important: Google Apps Script requires this
      keepalive: true,
    });
  };

  try {
    if (submitViaBeacon()) {
      return {
        status: 'success',
        message: 'Data queued for Google Sheets',
        submittedAt,
      };
    }
    await submitFormEncoded();
    return {
      status: 'success',
      message: 'Data sent to Google Sheets',
      submittedAt,
    };
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);

    if (typeof document !== 'undefined') {
      try {
        await submitViaHiddenForm(GOOGLE_SHEETS_URL, payload);
        return {
          status: 'success',
          message: 'Data sent to Google Sheets (iframe fallback)',
          submittedAt,
        };
      } catch (iframeError) {
        console.error('Iframe fallback failed:', iframeError);
      }
    }

    // Retry once with plain text JSON payload as fallback for restrictive environments.
    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        body: JSON.stringify({ ...formData, source: 'website-fallback' }),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        mode: 'no-cors',
        keepalive: true,
      });

      return {
        status: 'success',
        message: 'Data sent to Google Sheets (fallback payload)',
        submittedAt,
      };
    } catch (fallbackError) {
      // Don't throw - let the main form submission continue
      // This prevents Google Sheets errors from breaking the main form submission
      return {
        status: 'error',
        message: fallbackError.message || error.message,
        submittedAt,
      };
    }
  }
};

const submitViaHiddenForm = (url, payload) => {
  return new Promise((resolve, reject) => {
    try {
      const frameName = `gs-sheet-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const iframe = document.createElement('iframe');
      iframe.name = frameName;
      iframe.style.display = 'none';

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = url;
      form.target = frameName;
      form.style.display = 'none';

      Object.entries(payload).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value ?? '');
        form.appendChild(input);
      });

      let done = false;
      const cleanup = () => {
        if (form.parentNode) form.parentNode.removeChild(form);
        if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
      };

      const finish = () => {
        if (done) return;
        done = true;
        cleanup();
        resolve();
      };

      const fail = (error) => {
        if (done) return;
        done = true;
        cleanup();
        reject(error || new Error('Hidden form submission failed'));
      };

      const timeoutId = window.setTimeout(finish, 1500);

      iframe.onload = () => {
        window.clearTimeout(timeoutId);
        finish();
      };
      iframe.onerror = () => {
        window.clearTimeout(timeoutId);
        fail(new Error('Iframe load error while submitting to Google Sheets'));
      };

      document.body.appendChild(iframe);
      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      reject(error);
    }
  });
};
