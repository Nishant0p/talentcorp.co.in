# Frontend Integration with New Admin Backend

## Summary of Changes

The frontend has been updated to send form submissions to the new admin backend (`https://api.tsplgroup.in`) in addition to the existing Strapi integration and Google Sheets.

## Updated Components

### 1. **Utility Function** - `src/utils/strapi.js`
- **New export:** `ADMIN_BACKEND_URL` - Base URL for the new backend
- **New function:** `submitToAdminBackend(type, formData, files)` - Submits form data to the new backend
  - Parameters:
    - `type`: 'contact' | 'service' | 'job'
    - `formData`: Object with `name`, `email`, `phone`, `message`, and optional `metadata`
    - `files`: Object with optional `pdf` and `cv` file objects (for job applications)

### 2. **Contact Form** - `src/pages/contactus.jsx`
- Imports `submitToAdminBackend` from utils
- Now sends contact form data to three destinations:
  1. Strapi CRM (`/api/leads`)
  2. Google Sheets
  3. **New:** Admin Backend (type: 'contact')
- Shows status message indicating which systems received the submission

### 3. **Service Enquiry Section** - `src/components/ServiceEnquirySection.jsx`
- Imports `submitToAdminBackend` from utils
- Now sends service enquiry data to two destinations:
  1. Strapi CRM (`/api/leads`)
  2. **New:** Admin Backend (type: 'service')
- Metadata includes service name, company, city, and source

### 4. **Job Application** - `src/pages/JobDetailPage.jsx`
- Imports `submitToAdminBackend` from utils
- Now sends job application data to three destinations:
  1. Strapi CRM (`/api/applicants`)
  2. Google Sheets
  3. **New:** Admin Backend (type: 'job') with CV file upload
- Metadata includes jobId, jobTitle, company, location, salary, and jobType

## Environment Configuration

### Frontend `.env` Setup
```
VITE_STRAPI_API_URL=https://backend.tsplgroup.in
VITE_ADMIN_BACKEND_URL=https://api.tsplgroup.in
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercopy
```

### Backend CORS Configuration
The new backend (`tspl-admin-backend/index.js`) includes CORS support for:
- `http://localhost:3000` (local dev)
- `http://localhost:5173` (Vite dev)
- `https://tsplgroup.in`
- `https://www.tsplgroup.in`
- `https://talentcorp.co.in`
- `https://www.talentcorp.co.in`
- `https://admin.tsplgroup.in`

**Note:** To add more domains, edit the `allowedOrigins` array in `tspl-admin-backend/index.js`.

## Data Flow

### Contact Form Submission
```
Frontend Contact Form
    ↓
├─→ POST /api/leads (Strapi)
├─→ Google Sheets API
└─→ POST /api/forms/submit (Admin Backend, type='contact')
```

### Service Enquiry Submission
```
Frontend Service Enquiry Form
    ↓
├─→ POST /api/leads (Strapi)
└─→ POST /api/forms/submit (Admin Backend, type='service')
```

### Job Application Submission
```
Frontend Job Application Form
    ↓
├─→ POST /api/applicants (Strapi) + Google Drive CV upload
├─→ Google Sheets API
└─→ POST /api/forms/submit (Admin Backend, type='job' with CV file)
```

## Payload Examples

### Contact Form Payload (to Admin Backend)
```json
{
  "type": "contact",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 XXXXXXXXXX",
  "message": "I would like to inquire about...",
  "metadata": {
    "service": "NATS",
    "consent": true
  }
}
```

### Service Enquiry Payload (to Admin Backend)
```json
{
  "type": "service",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+91 XXXXXXXXXX",
  "message": "Need housekeeping service",
  "metadata": {
    "service": "HOUSEKEEPING",
    "company": "ABC Corp",
    "city": "Pune",
    "source": "ServiceEnquirySection"
  }
}
```

### Job Application Payload (to Admin Backend)
```
FormData with fields:
- type: "job"
- name: "Applicant Name"
- email: "applicant@example.com"
- phone: "+91 XXXXXXXXXX"
- message: ""
- metadata: JSON string containing jobId, jobTitle, company, location, salary, jobType
- cv: [file object]
```

## Deployment Steps

1. **Update frontend env:**
   ```bash
   # In project root
   cp .env.example .env
   # Edit .env to set VITE_ADMIN_BACKEND_URL to your VPS domain
   ```

2. **Build and deploy frontend:**
   ```bash
   npm run build
   # Deploy dist/ folder to your hosting
   ```

3. **Deploy backend (see tspl-admin-backend/README.md):**
   ```bash
   cd tspl-admin-backend
   npm install
   npm run start
   # Or use PM2/systemd (see deployment options)
   ```

4. **Configure DNS:**
   - Point `api.tsplgroup.in` to your VPS backend
   - Update CORS origins in `tspl-admin-backend/index.js` if using different domain names

## Error Handling

- If the admin backend is unreachable, the form submission will still succeed as long as Strapi or Google Sheets is available
- A warning is logged to console if admin backend submission fails
- Frontend shows which systems successfully received the data

## Testing

To test locally:
```bash
# Terminal 1: Start frontend dev server
cd /path/to/frontend
npm run dev

# Terminal 2: Start backend (ensure PostgreSQL is running)
cd tspl-admin-backend
npm run dev
```

Frontend will be at `http://localhost:5173`
Backend will be at `http://localhost:4000`

Then test by submitting a contact/service/job form and checking:
1. Backend logs
2. Admin panel at `/api/forms/list/contacts` (or services/jobs)
