# VIKNAR'OFF Vinnytsia Salon-Shop — PRD

## Original Problem Statement
Pixel-perfect aesthetic clone of https://viknaroff.ua/ adapted for the Vinnytsia salon-shop branch.
- Branding: only "VIKNAR'OFF" (drop "Файні вікна від").
- Replace "Офіційний дилер" → "Салон магазин".
- Include the entire product catalog from the source site.
- Add more aesthetic UI elements than the original.
- Phone: (068) 723-97-22 (also Viber/Telegram).

## Stack
- Frontend: React 19 + React Router + Tailwind + shadcn/ui (Onest font).
- Backend: FastAPI + Motor + MongoDB.
- Deployment ready: Dockerfile, docker-compose.yml, nginx.conf.

## Architecture
```
/app
├── backend/server.py            # FastAPI, /api/leads CRUD
├── frontend/src
│   ├── components               # Hero, ProductCategories, WindowsTabs, DoorsAndExtras, FAQAndPartners, FloatingActions, SmartImage, Header, Footer, FormModal
│   ├── pages                    # Home, CategoryPage (/catalog/:slug), ProductDetail (/product/:slug)
│   ├── data/products.js         # 41 products with viknaroff.ua images per product
│   └── data/mock.js             # Hero slides, window tabs, door types, FAQ, gallery
└── memory/PRD.md
```

## Implementation Status (as of 2026-02-07)
- ✅ Multi-page routing, filtering, mobile drawer
- ✅ FastAPI `/api/leads` (POST/GET) with MongoDB
- ✅ SmartImage with blur placeholder + lazy load
- ✅ Floating call/Telegram/Viber buttons
- ✅ Onest font, brand-aligned typography
- ✅ Docker / nginx / docker-compose configs
- ✅ Catalog: 19 windows, 11 doors, 2 sliding, 10 additional (42 total)
- ✅ **All product images sourced directly from viknaroff.ua/wp-content/uploads — every product has a distinct, authentic photo (Gealan profiles, balcony doors, entry doors, sliding terraces, accessories) — no Unsplash placeholders.**
- ✅ /catalog/windows and /catalog/doors load correctly (previous crash bug fixed)
- ✅ Backend tests: 9/9 pytest passing in `/app/backend/tests/test_leads_api.py`

## Backlog / Roadmap
- P1 — Add "Гарантія" / "Сертифікати" page with PDF certificates
- P1 — Online price calculator (window dimensions → estimate)
- P2 — Gallery section (real installation photos)
- P2 — Blog / Articles section as on original site
- P2 — Multi-language switcher (UA/RU)
- P3 — Backend admin UI for leads dashboard

## Test Credentials
None — public site, no auth.
