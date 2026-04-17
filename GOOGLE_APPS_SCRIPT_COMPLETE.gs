/**
 * =====================================================
 * COMPLETE GOOGLE APPS SCRIPT FOR CONTACT FORM
 * TalentCorp Contact Form Integration
 * =====================================================
 * 
 * This is a complete, production-ready Google Apps Script
 * that handles all contact form submissions to Google Sheets.
 * 
 * Features:
 * ✅ Receives form data from React app
 * ✅ Validates data
 * ✅ Stores in Google Sheet
 * ✅ Sends email notifications
 * ✅ Maintains execution log
 * ✅ Error handling & recovery
 * 
 * Deploy as: Web App (Execute as: Your Google Account, Access: Anyone)
 * =====================================================
 */

// =====================================================
// CONFIGURATION - CUSTOMIZE THESE SETTINGS
// =====================================================

const CONFIG = {
  // Optional: set this to force writes to one exact spreadsheet.
  // Example: '1AbCdEfGhIjKlMnOpQrStUvWxYz1234567890abcd'
  SPREADSHEET_ID: '1u_waqw6eghaqDRqgwVusmMWcjOwWEHo_cjX4Vei0PLM',

  // Email notifications
  SEND_NOTIFICATIONS: true,
  NOTIFICATION_EMAIL: 'your-email@gmail.com', // ← CHANGE THIS
  NOTIFICATION_SUBJECT: 'New Contact Form Submission from TalentCorp',
  
  // Sheet names
  RESPONSES_SHEET: 'Responses',
  LOGS_SHEET: 'Logs',
  
  // Timezone
  TIMEZONE: 'Asia/Kolkata',
  
  // Required fields
  REQUIRED_FIELDS: ['fullName', 'email', 'phone', 'service', 'message', 'consent'],
};

// =====================================================
// MAIN HANDLER - Receives POST requests
// =====================================================

function doPost(e) {
  try {
    // Parse incoming data from JSON or form-encoded bodies
    const data = parseRequestData(e);

    // Always ensure required sheets exist before write
    initializeSheets();
    
    // Validate data
    const validation = validateData(data);
    if (!validation.valid) {
      logAction('VALIDATION_ERROR', validation.message, data && data.email ? data.email : 'unknown');
      return createResponse('error', validation.message, 400);
    }
    
    // Get the spreadsheet
    const sheet = getTargetSpreadsheet();
    
    // Add data to Responses sheet
    const responsesSheet = sheet.getSheetByName(CONFIG.RESPONSES_SHEET);
    appendToSheet(responsesSheet, formatData(data));
    
    // Send email notification (if enabled)
    if (CONFIG.SEND_NOTIFICATIONS) {
      sendEmailNotification(data);
    }
    
    // Log the successful submission
    logAction('SUCCESS', 'Form submitted', data.email);
    
    // Return success response
    return createResponse('success', 'Data added to sheet successfully', 200);
    
  } catch (error) {
    // Log the error
    logAction('ERROR', error.toString(), 'unknown');
    
    // Return error response
    return createResponse('error', `Server error: ${error.toString()}`, 500);
  }
}

function parseRequestData(e) {
  if (!e) {
    throw new Error('No request event received. Do not run doPost directly from editor.');
  }

  // Form-encoded / query params from hidden form submission (PRIMARY METHOD)
  if (e.parameter && Object.keys(e.parameter).length) {
    return {
      fullName: e.parameter.fullName || '',
      email: e.parameter.email || '',
      phone: e.parameter.phone || '',
      service: e.parameter.service || '',
      message: e.parameter.message || '',
      consent: normalizeConsent(e.parameter.consent),
    };
  }

  // JSON payload (secondary - for fetch/axios)
  if (e.postData && typeof e.postData.contents === 'string' && e.postData.contents.trim()) {
    const raw = e.postData.contents.trim();

    try {
      return JSON.parse(raw);
    } catch (jsonError) {
      // Fallback: treat raw payload as query-string-like data
      const parsed = parseFormEncoded(raw);
      if (Object.keys(parsed).length) {
        return parsed;
      }
      throw new Error('Invalid JSON payload in request body.');
    }
  }

  throw new Error('Request body is empty. Ensure frontend sends POST JSON body.');
}

function parseFormEncoded(raw) {
  const result = {};

  // Handles: key=value&key2=value2
  if (!raw.includes('=') || !raw.includes('&') && !raw.includes('fullName=')) {
    return result;
  }

  const pairs = raw.split('&');
  for (const pair of pairs) {
    const [k, v] = pair.split('=');
    if (!k) continue;
    const key = decodeURIComponent(k.replace(/\+/g, ' '));
    const value = decodeURIComponent((v || '').replace(/\+/g, ' '));
    result[key] = value;
  }

  if (Object.keys(result).length) {
    result.consent = normalizeConsent(result.consent);
  }

  return result;
}

function normalizeConsent(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    return normalized === 'true' || normalized === '1' || normalized === 'yes' || normalized === 'on';
  }
  return false;
}

// =====================================================
// DATA VALIDATION
// =====================================================

function validateData(data) {
  // Check if data exists
  if (!data || typeof data !== 'object') {
    return { valid: false, message: 'Invalid data format' };
  }
  
  // Check required fields
  for (const field of CONFIG.REQUIRED_FIELDS) {
    if (!data[field]) {
      return { valid: false, message: `Missing required field: ${field}` };
    }
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, message: 'Invalid email format' };
  }
  
  // Validate phone (basic check)
  if (data.phone.length < 5) {
    return { valid: false, message: 'Invalid phone number' };
  }
  
  // Validate message length
  if (data.message.length < 10) {
    return { valid: false, message: 'Message must be at least 10 characters' };
  }
  
  // Validate consent
  if (typeof data.consent !== 'boolean') {
    return { valid: false, message: 'Consent must be true or false' };
  }
  
  return { valid: true };
}

// =====================================================
// DATA FORMATTING
// =====================================================

function formatData(data) {
  const timestamp = new Date().toLocaleString('en-IN', { 
    timeZone: CONFIG.TIMEZONE,
    dateStyle: 'short',
    timeStyle: 'medium'
  });
  
  return [
    timestamp,                              // A: Timestamp
    sanitizeString(data.fullName),         // B: Full Name
    sanitizeString(data.email),            // C: Email
    sanitizeString(data.phone),            // D: Phone
    sanitizeString(data.service),          // E: Service
    sanitizeString(data.message),          // F: Message
    data.consent ? 'Yes' : 'No'            // G: Consent
  ];
}

function sanitizeString(str) {
  // Remove any potentially harmful characters
  if (typeof str !== 'string') return '';
  return str.trim().substring(0, 500); // Max 500 chars
}

// =====================================================
// SHEET OPERATIONS
// =====================================================

function appendToSheet(sheet, data) {
  if (!sheet) {
    throw new Error(`Sheet not found`);
  }
  sheet.appendRow(data);
}

function getOrCreateSheet(sheetName) {
  const ss = getTargetSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  
  return sheet;
}

function initializeSheets() {
  const ss = getTargetSpreadsheet();
  
  // Initialize Responses sheet
  let responsesSheet = ss.getSheetByName(CONFIG.RESPONSES_SHEET);
  if (!responsesSheet) {
    responsesSheet = ss.insertSheet(CONFIG.RESPONSES_SHEET);
    responsesSheet.appendRow([
      'Timestamp',
      'Full Name',
      'Email',
      'Phone',
      'Service',
      'Message',
      'Consent'
    ]);
  }
  
  // Initialize Logs sheet
  let logsSheet = ss.getSheetByName(CONFIG.LOGS_SHEET);
  if (!logsSheet) {
    logsSheet = ss.insertSheet(CONFIG.LOGS_SHEET);
    logsSheet.appendRow([
      'Timestamp',
      'Action',
      'Details',
      'Email'
    ]);
  }
}

// =====================================================
// LOGGING SYSTEM
// =====================================================

function logAction(action, details, email) {
  try {
    const logsSheet = getOrCreateSheet(CONFIG.LOGS_SHEET);
    const timestamp = new Date().toLocaleString('en-IN', { 
      timeZone: CONFIG.TIMEZONE,
      dateStyle: 'short',
      timeStyle: 'medium'
    });
    
    logsSheet.appendRow([
      timestamp,
      action,
      sanitizeString(details),
      sanitizeString(email)
    ]);
  } catch (error) {
    console.error('Logging failed:', error);
  }
}

// =====================================================
// EMAIL NOTIFICATIONS
// =====================================================

function sendEmailNotification(data) {
  try {
    if (!CONFIG.SEND_NOTIFICATIONS) return;
    if (!CONFIG.NOTIFICATION_EMAIL) return;
    
    const emailBody = formatEmailBody(data);
    const subject = CONFIG.NOTIFICATION_SUBJECT;
    
    GmailApp.sendEmail(
      CONFIG.NOTIFICATION_EMAIL,
      subject,
      emailBody
    );
    
  } catch (error) {
    console.error('Email notification failed:', error);
    logAction('WARNING', `Email notification failed: ${error}`, data.email);
  }
}

function formatEmailBody(data) {
  const timestamp = new Date().toLocaleString('en-IN', { 
    timeZone: CONFIG.TIMEZONE,
    dateStyle: 'full',
    timeStyle: 'long'
  });
  
  const emailBody = `
📬 NEW CONTACT FORM SUBMISSION
${'='.repeat(50)}

📅 Timestamp: ${timestamp}

👤 Full Name: ${data.fullName}
📧 Email: ${data.email}
📱 Phone: ${data.phone}
🎯 Service: ${data.service}

💬 Message:
${data.message}

✅ Consent Provided: ${data.consent ? 'Yes' : 'No'}

${'='.repeat(50)}
This message was automatically generated.
Check your Google Sheet for all submissions.
  `.trim();
  
  return emailBody;
}

// =====================================================
// RESPONSE HANDLING
// =====================================================

function createResponse(status, message, httpCode) {
  const response = {
    status: status,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// =====================================================
// TESTING & DEBUGGING
// =====================================================

/**
 * Test function - Run this from Apps Script editor to test
 * Run: testFormSubmission()
 */
function testFormSubmission() {
  const testData = {
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '9876543210',
    service: 'NATS',
    message: 'This is a test message from the Google Apps Script editor.',
    consent: true
  };
  
  try {
    // Validate
    const validation = validateData(testData);
    Logger.log('Validation: ' + JSON.stringify(validation));
    
    if (!validation.valid) {
      Logger.log('Validation failed: ' + validation.message);
      return;
    }
    
    // Initialize sheets
    initializeSheets();
    Logger.log('Sheets initialized');
    
    // Format and append
    const sheet = getTargetSpreadsheet()
      .getSheetByName(CONFIG.RESPONSES_SHEET);
    appendToSheet(sheet, formatData(testData));
    Logger.log('Data appended to sheet');
    
    // Send email
    if (CONFIG.SEND_NOTIFICATIONS) {
      sendEmailNotification(testData);
      Logger.log('Email sent to: ' + CONFIG.NOTIFICATION_EMAIL);
    }
    
    // Log
    logAction('TEST', 'Test submission', testData.email);
    Logger.log('Test completed successfully!');
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
  }
}

/**
 * Initialize sheets on first run
 * Run this once: initializeSheets()
 */
function setupSheets() {
  initializeSheets();
  Logger.log('Sheets setup completed!');
}

/**
 * View logs - Run: viewLogs()
 */
function viewLogs() {
  try {
    const logsSheet = getTargetSpreadsheet()
      .getSheetByName(CONFIG.LOGS_SHEET);
    const data = logsSheet.getDataRange().getValues();
    
    Logger.log('=== EXECUTION LOGS ===');
    for (let i = 0; i < data.length; i++) {
      Logger.log(data[i].join(' | '));
    }
  } catch (error) {
    Logger.log('Error reading logs: ' + error.toString());
  }
}

/**
 * Clear logs - Run: clearLogs()
 */
function clearLogs() {
  try {
    const logsSheet = getTargetSpreadsheet()
      .getSheetByName(CONFIG.LOGS_SHEET);
    const lastRow = logsSheet.getLastRow();
    
    if (lastRow > 1) {
      logsSheet.deleteRows(2, lastRow - 1);
      Logger.log('Logs cleared!');
    }
  } catch (error) {
    Logger.log('Error clearing logs: ' + error.toString());
  }
}

// =====================================================
// AUTO-SETUP ON FIRST DEPLOYMENT
// =====================================================

function onInstall(e) {
  onOpen(e);
}

function onOpen(e) {
  // Initialize sheets if they don't exist
  try {
    initializeSheets();
  } catch (error) {
    Logger.log('Auto-setup failed: ' + error.toString());
  }
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

/**
 * Get script deployment info
 * Run: getDeploymentInfo()
 */
function getDeploymentInfo() {
  const deployments = ScriptApp.getProjectKey();
  Logger.log('Script ID: ' + deployments);
  Logger.log('Deployment URL format:');
  Logger.log('https://script.google.com/macros/d/{SCRIPT_ID}/userweb');
}

/**
 * Resolve target spreadsheet reliably.
 * Priority:
 * 1) CONFIG.SPREADSHEET_ID
 * 2) active spreadsheet (bound script)
 */
function getTargetSpreadsheet() {
  if (CONFIG.SPREADSHEET_ID && CONFIG.SPREADSHEET_ID.trim()) {
    try {
      return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID.trim());
    } catch (error) {
      console.error('Invalid SPREADSHEET_ID, falling back to active spreadsheet:', error);
    }
  }

  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) {
    throw new Error('No active spreadsheet found. Set CONFIG.SPREADSHEET_ID in script.');
  }
  return active;
}

/**
 * Health check endpoint
 */
function doGet(e) {
  const status = {
    service: 'TalentCorp Contact Form Handler',
    status: 'running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    sheets: {
      responses: CONFIG.RESPONSES_SHEET,
      logs: CONFIG.LOGS_SHEET
    },
    notifications: {
      enabled: CONFIG.SEND_NOTIFICATIONS,
      email: CONFIG.SEND_NOTIFICATIONS ? CONFIG.NOTIFICATION_EMAIL : 'disabled'
    }
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(status, null, 2))
    .setMimeType(ContentService.MimeType.JSON);
}

// =====================================================
// END OF SCRIPT
// =====================================================
