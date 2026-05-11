## Project
Viknar'off Vinnytsia — Landing site for windows/doors company.
Stack: FastAPI + MongoDB + React.
This session: finish & verify the backend (lead reception + admin transfer/management).

## Status (2026-05)
### Backend - server.py (FastAPI)
Endpoints:
- GET  /api/                       — health
- POST /api/leads                  — public, create lead + email notify via Resend
- POST /api/auth/session           — exchange Emergent OAuth session_id → cookie + token
- GET  /api/auth/me                — current user
- POST /api/auth/logout            — clear session
- GET  /api/admin/leads            — list with filters (q, status, date_from, date_to), pagination
- PATCH /api/admin/leads/{id}/status?status=...  — new|contacted|converted|rejected
- DELETE /api/admin/leads/{id}     — delete lead
- GET  /api/admin/leads/export.csv — streaming CSV export (utf-8, BOM-friendly headers)
- GET  /api/admin/stats            — counts per status

Auth: cookie OR `Authorization: Bearer <session_token>` (cookie set on /auth/session).
Admin gate via ADMIN_ALLOWED_EMAILS env (set to viknaroffvin@gmail.com).
Email: Resend configured. RESEND_API_KEY in backend/.env. SENDER_EMAIL=onboarding@resend.dev (domain not yet verified).
  Note: with onboarding@resend.dev sender, Resend allows delivery only to API-key owner's account (viknaroffvin@gmail.com).

### Fixes this session
- /app/backend/.env: added RESEND_API_KEY, SENDER_EMAIL, LEAD_NOTIFY_EMAIL, ADMIN_ALLOWED_EMAILS
- /app/frontend/src/pages/AdminLeads.jsx: handleExport now calls existing `adminExportCsv()` (was calling undefined `adminExportCsvUrl()`)
- Installed `resend==2.30.0`

### Manual verified (curl)
- POST /api/leads → 201, MongoDB row + Resend email IDs returned in logs
- Validation 422 for short fields
- GET /api/admin/leads 401 w/o auth, 403 for non-admin email
- Stats, filter q/status, PATCH status, DELETE, CSV export — all 200 OK
- External REACT_APP_BACKEND_URL POST /api/leads — 201

## Backlog
- Verify production domain in Resend (so SENDER_EMAIL can become noreply@domain) — instructions provided to user
- Admin panel UI was already in place; only export handler bug fixed
