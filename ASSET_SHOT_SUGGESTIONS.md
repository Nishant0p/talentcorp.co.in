# TSPL Photo Shot Suggestions

This file is the practical shot brief for replacing placeholders.
For tracking IDs and status, use [ASSET_MATRIX.csv](ASSET_MATRIX.csv).

## 1) Home Page

| Section | File Location | What Photo Should Come | Shot Direction | Search Keywords |
|---|---|---|---|---|
| Hero background | src/components/HeroSection.jsx:10 | Real factory/workfloor hero with depth and activity | Wide 16:9, keep left side clean for text, natural daylight, workers with PPE | industrial manufacturing india, factory workforce wide shot |

## 2) About Page

| Section | File Location | What Photo Should Come | Shot Direction | Search Keywords |
|---|---|---|---|---|
| About hero | src/pages/about.jsx:71 | TSPL team group photo | Wide 16:9, office or training center entrance, confident posture | corporate team group india |
| Mission image | src/pages/about.jsx:141 | Training-in-action scene | Mentor + trainees, practical hands-on setup | vocational training india workshop |
| CEO portrait | src/pages/about.jsx:34 | Real CEO portrait | 1:1 or 4:5, neutral branded background, soft key light | executive portrait india |
| Director portraits | src/pages/about.jsx:41,47 | Real directors | Same lighting/background for consistency | corporate director portrait |
| Manager portraits | src/pages/about.jsx:52-54 | Real managers | Same frame style as leadership set | hr manager portrait, training manager portrait |

## 3) Security Page

| Section | File Location | What Photo Should Come | Shot Direction | Search Keywords |
|---|---|---|---|---|
| Security hero | src/pages/security.jsx:151 | Uniformed security team at industrial gate | Wide 16:9, front-facing with site context | industrial security team india |
| Guard focus | src/pages/security.jsx:236 | Security guard with radio/access control | Mid shot, active gesture, branded uniform visible | security guard radio corporate |
| Training block | src/pages/security.jsx:452 | Security training drill | Instructor + trainees, cones/formation/classroom blend | security training drill india |

## 4) Manpower Page

| Section | File Location | What Photo Should Come | Shot Direction | Search Keywords |
|---|---|---|---|---|
| Manpower hero | src/pages/manpower.jsx:39 | Mixed workforce lineup in PPE | Wide 16:9, include both men/women if possible | industrial manpower india |
| Workers card | src/pages/manpower.jsx:124 | Workers on assignment | Mid-wide 4:3, real task in progress | assembly line workers india |
| Industries served | src/pages/manpower.jsx:558 | Multi-industry visual | Composite or real warehouse/plant/logistics scene | logistics warehouse manufacturing india |

## 5) Housekeeping Page

| Section | File Location | What Photo Should Come | Shot Direction | Search Keywords |
|---|---|---|---|---|
| Housekeeping hero | src/pages/housekeeping.jsx:42 | Professional housekeeping team | Wide, clean commercial space, organized tools | facility housekeeping team india |
| Services image | src/pages/housekeeping.jsx:268 | Cleaning in action | Floor machine/glass cleaning, motion feel | commercial cleaning services |
| Staff image | src/pages/housekeeping.jsx:511 | Team portrait | Friendly team look, uniforms visible | housekeeping staff portrait |

## 6) Contract Staffing Page

| Section | File Location | What Photo Should Come | Shot Direction | Search Keywords |
|---|---|---|---|---|
| Contract hero | src/pages/contract.jsx:194 | Client + staffing rep site walk or handshake | 16:9 with site background, professional formal-casual mix | contract staffing industrial site |
| Flexible staffing | src/pages/contract.jsx:255 | Shift handover | Two teams transitioning responsibilities | shift handover workforce |
| Project staffing | src/pages/contract.jsx:124,270 | Project-based deployment visual | Supervisor with checklist/tablet + workers | project staffing manufacturing |
| Scale staffing | src/pages/contract.jsx:134,512 | Large volume onboarding/workforce | Queue/briefing orientation scene | workforce onboarding india |
| Onboarding | src/pages/contract.jsx:144 | Candidate onboarding desk | HR + candidate document flow | candidate onboarding hr |
| Seasonal staffing | src/pages/contract.jsx:154 | Peak-period workforce at warehouse/plant | Busy but organized operations visual | seasonal staffing warehouse |

## 7) B2B, Compliance, Skilled, Client Pages (high-repeat placeholders)

| Section Group | File Location | What Photo Should Come | Shot Direction | Search Keywords |
|---|---|---|---|---|
| B2B service cards | src/pages/b2b.jsx (multiple) | Client meeting, deployment, SLA monitoring | Alternate wide + close shots for variety | b2b staffing solutions india |
| Compliance cards/background | src/pages/Compliance.jsx (multiple) | Audit, payroll compliance, statutory documentation | Desk + people + files/system screens | compliance audit payroll statutory |
| Skilled role cards | src/pages/skilled.jsx (multiple) | One real photo per role (welder, electrician, CNC, fitter, plumber, supervisor) | Keep same style/grade across all cards | welder sparks, cnc operator, electrician panel |
| Client showcase cards | src/pages/client.jsx (multiple) | Real client operations and outcomes | Include branding-safe site visuals | client operations industrial staffing |

## 8) Jobs Page

| Section | File Location | What Photo Should Come | Shot Direction | Search Keywords |
|---|---|---|---|---|
| Job card images | src/pages/jobs.jsx:38-153 | Role-specific recruitment visuals | Match each category to the right trade image | welder job india, electrician job india, cnc operator job |
| Fallback image | src/pages/jobs.jsx:153 | Neutral branded recruitment visual | No random picsum image, use consistent TSPL style | recruitment workforce banner |

## 9) Contact Page

| Section | File Location | What Photo Should Come | Shot Direction | Search Keywords |
|---|---|---|---|---|
| Contact hero background | src/pages/contactus.jsx:195 | Real TSPL support/contact visual | Reception/helpdesk/team-at-work scene | customer support office india |

## 10) Shoot Quality Checklist

- Use real India context wherever possible (factory, warehouse, training center, office).
- Keep color tone consistent across pages: warm-neutral, sharp, high clarity.
- Prefer daylight or soft-key lighting; avoid harsh mixed lighting.
- Keep text-safe negative space on hero banners.
- Avoid overly staged handshake-only stock where possible.
- Capture each key scene in 2 variants: wide and medium.
- Export sizes:
  - Hero: 1920x1080 (or 2400x1350)
  - Cards: 1600x1200
  - Profile: 1200x1200
- File naming convention suggestion:
  - tspl-page-section-purpose-v1.jpg
  - Example: tspl-security-hero-team-v1.jpg

## 11) Suggested Folder Plan

If you want to store local assets before moving all to Strapi:

- public/images/about/
- public/images/security/
- public/images/manpower/
- public/images/housekeeping/
- public/images/contract/
- public/images/b2b/
- public/images/compliance/
- public/images/skilled/
- public/images/jobs/
- public/images/contact/

