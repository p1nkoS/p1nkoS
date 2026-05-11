## Project
Viknar'off Vinnytsia — Landing site for windows/doors company.
Stack: FastAPI + MongoDB + React. Site is in development; will go live after backend hardening.

## Backend endpoints (all under /api)
Public:
- GET  /                       — health
- POST /leads                  — create lead, validation, **rate-limited (5/60s per IP)**, fire-and-forget Resend email
Auth:
- POST /auth/session           — exchange Emergent OAuth session_id → cookie + token (cleans up expired/duplicate sessions on login)
- GET  /auth/me                — current user
- POST /auth/logout            — clear session
Admin (gated by ADMIN_ALLOWED_EMAILS):
- GET    /admin/leads          — filters: q, status, date_from, date_to; pagination; 400 on bad date
- PATCH  /admin/leads/{id}/status?status=new|contacted|converted|rejected
- DELETE /admin/leads/{id}
- GET    /admin/leads/export.csv  — UTF-8 CSV streaming
- GET    /admin/stats          — counts by status

## Env (backend/.env)
- MONGO_URL, DB_NAME — Mongo
- RESEND_API_KEY, SENDER_EMAIL=onboarding@resend.dev, LEAD_NOTIFY_EMAIL=viknaroffvin@gmail.com
- ADMIN_ALLOWED_EMAILS=viknaroffvin@gmail.com
- CORS_ORIGINS — comma-separated; `*` or empty falls back to localhost. **For prod**, set e.g. `CORS_ORIGINS="https://viknaroff.com,https://www.viknaroff.com"`. Preview emergentagent.com always allowed via regex.
- LEADS_RATE_LIMIT_MAX=5, LEADS_RATE_LIMIT_WINDOW_SEC=60 — tune as needed

## Implemented (2026-05)
- Email-сповіщення про заявки через Resend
- Адмін-панель (Emergent Google OAuth + allowlist), CRUD по заявкам, фільтри, CSV-експорт
- Fixes: CSV button bug; date 500→400; session dedup; env-driven CORS; per-IP rate limit on /api/leads

## Verified (testing agent)
- 32/32 backend tests passed (health, lead create+validation, auth, admin CRUD, filters, CSV, stats)

## Before going live (production checklist)
- Verify Resend domain (so SENDER_EMAIL can be `noreply@viknaroff.com` and emails reach any recipient, not only API-key owner)
- Set `CORS_ORIGINS` to production domain(s)
- Consider tightening rate limit if traffic dictates
- Add Mongo indexes on `leads.created_at` and `leads.id` for large datasets (currently fine)
