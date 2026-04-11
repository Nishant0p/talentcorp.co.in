# TSPL Bridge Setup

This workspace includes a frontend service layer and backend hook to connect hosted frontend applications with Strapi.

## Frontend (hosted separately)

1. Copy `tspl-frontend/.env.local.example` to `tspl-frontend/.env.local`.
2. Set your deployed Strapi URL:

```
NEXT_PUBLIC_STRAPI_API_URL=https://api.tspl.com
```

3. Use `fetchPublishedJobs` and `applyForJob` from `tspl-frontend/utils/strapi.js`.
4. Use `useJobApplication` from `tspl-frontend/hooks/useJobApplication.js`.

## Backend CORS for split hosting

1. Copy `tspl-backend/.env.example` to `tspl-backend/.env`.
2. Set frontend origin settings in backend env:

```
FRONTEND_URL=https://tspl.brandboosters.host
FRONTEND_URLS=http://localhost:3000,https://tspl.brandboosters.host
```

3. Ensure your Strapi CORS middleware is loaded from `tspl-backend/config/middlewares.js`.

## RCS automation after applicant create

- Lifecycle: `tspl-backend/src/api/applicant/content-types/applicant/lifecycles.js`
- Service: `tspl-backend/src/api/rcs/services/rcs.js`

When a new applicant is created, Strapi resolves the linked job and its `rcsTemplateCode`, then sends RCS via WabaSMSBox.

## Contact Us bridge

- Lifecycle: `tspl-backend/src/api/lead/content-types/lead/lifecycles.js`
- Reused RCS service: `tspl-backend/src/api/rcs/services/rcs.js`

When a new lead is created in Strapi, the lifecycle automatically triggers a thank-you notification using `CONTACT_TEMPLATE_CODE`.

## Waba API bridge endpoints (through Strapi)

- `POST /api/waba/sms/send`
- `POST /api/waba/upload-file` (form-data key: `file`)
- `POST /api/waba/bulk-push`
- `GET /api/waba/templates/sms`
- `POST /api/waba/rcs/send`
- `POST /api/waba/rcs/template-json`

## Applicant Excel export endpoint

- `GET /api/applicants/export?jobId=1`

Files:

- Controller: `tspl-backend/src/api/applicant/controllers/applicant-export.js`
- Route: `tspl-backend/src/api/applicant/routes/applicant-export.js`

Files:

- Service: `tspl-backend/src/api/waba/services/waba.js`
- Controller: `tspl-backend/src/api/waba/controllers/waba.js`
- Routes: `tspl-backend/src/api/waba/routes/waba.js`

## Required packages

Install these in the correct project folders:

- Frontend: `qs`
- Backend: `axios`, `exceljs`, `form-data`
