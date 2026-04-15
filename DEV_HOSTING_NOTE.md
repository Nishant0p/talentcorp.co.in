# Developer Hosting Note

Please deploy both apps so they are publicly accessible and not tied to localhost.

Requirements:
- Frontend must be hosted online on a free tier service.
- Backend must be hosted online on a free tier service.
- Use a custom domain or subdomain for the live site.
- The live app must not depend on `localhost` in production.
- Both frontend and backend must auto-update from GitHub when code is pushed.

Recommended setup:
- Frontend: Vercel or Netlify connected to the `main` branch.
- Backend: Render, Railway, Fly.io, or another free-tier Node hosting service connected to the backend repo.
- Domain: use Cloudflare DNS or a similar provider to point the domain to the hosted apps.

Deployment rules:
- Frontend environment variables must point to the deployed backend URL.
- Backend CORS must allow the deployed frontend domain.
- Backend API URL must be stored in the frontend environment, not hardcoded to localhost.
- Both repos should keep GitHub-based CI/CD enabled so every push to `main` redeploys automatically.

Important:
- Contact form submissions should go to the hosted backend URL, not `http://localhost:1337`.
- All production message delivery must use the deployed backend and provider credentials.
- Keep separate GitHub repositories for frontend and backend, each with its own deployment pipeline.
