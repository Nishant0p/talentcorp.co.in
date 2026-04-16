# Strapi Integration Setup Guide

This document outlines the Strapi collections that need to be created to manage Jobs, News/Events, and Strengths from the CMS.

## Required Strapi Collections

### 1. **Jobs** (Collection Type)

**API Endpoint:** `/api/jobs`

**Fields:**
- `title` (String, required) - Job title
- `company` (String, required) - Company name
- `location` (String, required) - Job location
- `salary` (String, required) - Salary range (e.g., "₹18,000 - ₹25,000")
- `type` (Enumeration, required) - Job type: `Full-time`, `Apprenticeship`, `Contract`, `Part-time`
- `urgent` (Boolean) - Mark if urgent (shown with orange badge)
- `description` (Text) - Full job description
- `requirements` (Text) - Required qualifications
- `publishedAt` (Date) - Publication date

**Example JSON (for bulk import):**
```json
{
  "data": {
    "title": "Production Operator",
    "company": "Tata Motors",
    "location": "Pune, Maharashtra",
    "salary": "₹18,000 - ₹25,000",
    "type": "Full-time",
    "urgent": true,
    "description": "Looking for experienced production operators...",
    "requirements": "5 years experience required"
  }
}
```

---

### 2. **News Events** (Collection Type)

**API Endpoint:** `/api/news-events`

**Fields:**
- `title` (String, required) - News/Event title
- `date` (Date, required) - Event/news date (formatted as: "March 28, 2026")
- `tag` (Enumeration, required) - `News`, `Event`, `Updates`
- `description` (Text, required) - Short description
- `image` (Media, required) - Featured image
- `content` (Rich Text) - Full article content
- `link` (String) - External link (optional)
- `publishedAt` (Date) - Publication date

**Example JSON:**
```json
{
  "data": {
    "title": "National Apprenticeship Mela 2026",
    "date": "2026-03-28",
    "tag": "Event",
    "description": "Join us in Mumbai for the largest hiring drive of the year...",
    "content": "Full event details here..."
  }
}
```

---

### 3. **Strengths** (Collection Type)

**API Endpoint:** `/api/strengths`

**Fields:**
- `title` (String, required) - Strength title
- `stat` (String, required) - Key statistic (e.g., "40,000+")
- `sub` (String, required) - Statistic subtitle (e.g., "Workers")
- `description` (Text, required) - Full description
- `image` (Media, required) - Background image for hover state
- `color` (String) - Tailwind color class (e.g., "bg-orange-600", "bg-blue-600")
- `order` (Integer) - Display order (1-6)

**Example JSON:**
```json
{
  "data": {
    "title": "Skilled Workforce",
    "stat": "40,000+",
    "sub": "Workers",
    "description": "Access to 40,000+ trained and certified workers...",
    "color": "bg-orange-600",
    "order": 1
  }
}
```

---

## Frontend Implementation

The frontend automatically fetches data from these endpoints:

### Files Modified:
- `src/utils/strapi.js` - Utility functions for Strapi API calls
- `src/components/JobBoard.jsx` - Fetches jobs list
- `src/components/NewsSection.jsx` - Fetches news/events
- `src/components/StrengthsAccordion.jsx` - Fetches strengths

### Key Functions:
```javascript
// Fetch jobs
fetchJobs() → GET /api/jobs

// Fetch news/events
fetchNews() → GET /api/news-events

// Fetch strengths
fetchStrengths() → GET /api/strengths

// Create new job (for admin panel)
createJob(jobData) → POST /api/jobs

// Create news/event (for admin panel)
createNewsEvent(eventData) → POST /api/news-events
```

---

## Fallback Data

If Strapi is unavailable, the frontend will display fallback/demo data:
- 6 sample jobs
- 3 sample news items
- 6 sample strengths

---

## Strapi Configuration

### API Routes to Make Public:
Enable public access for read-only endpoints:
- `/api/jobs` (find, findOne)
- `/api/news-events` (find, findOne)
- `/api/strengths` (find, findOne)
- `/api/client-logos` (find, findOne) - Already configured
- `/api/site-texture` (find) - Already configured

### Environment Variable:
```
VITE_STRAPI_API_URL=https://backend.tsplgroup.co.in
```

---

## Deployment Steps

1. **Create Collections in Strapi Admin Panel**
   - Navigate to Content-Type Builder
   - Create each collection type with fields as specified above

2. **Add Sample Data**
   - Use Strapi admin UI or API to add initial jobs, news, and strengths

3. **Configure API Permissions**
   - Make read endpoints public for all three collections
   - Keep create/update/delete restricted to authenticated users

4. **Deploy Frontend**
   - Frontend will automatically fetch from Strapi on page load
   - Falls back to demo data if Strapi is unavailable

---

## Future Enhancements

- Admin dashboard to create/edit jobs, news, and strengths
- Bulk import CSV functionality
- Advanced filtering and sorting
- Search indexing
- Image optimization pipeline
