# Viknar'off Vinnytsia — PRD

## Project
Лендінг + каталог вікон/дверей/розсувних/алюм./додаткових товарів. React + FastAPI + MongoDB.

## Implemented (2026-01)
- Видалено позицію Decco 71 з products.js (каталог вікон)
- Оновлено іконки в секції "Все для завершення проєкту" (DoorsAndExtras.jsx) — кожна іконка відповідає опису товару:
  - Антимоскітні сітки → Bug
  - Підвіконня → PanelTop
  - Відливи → CloudRain
  - Склопакети → Layers3
  - Фурнітура → Cog
  - HPL панелі → PanelsTopLeft
  - Захисні ролети → ShieldCheck
  - Ламінація → Palette
- Бекенд: виправлено `datetime.utcnow()` → `datetime.now(timezone.utc)`, переміщено ініціалізацію `logger` ДО routes (потенційний race у `create_lead`), виправлено typo slug `sklopackety`→`sklopakety` у ICON_MAP.

## Verified
- GET /api/ → 200 OK
- POST /api/leads → 201, заявка зберігається в MongoDB
- Frontend: каталог `/catalog/windows` показує 7 продуктів (без Decco 71); секція `#additional` рендерить нові іконки

## Backlog
- REACT_APP_BACKEND_URL = localhost:8001 у фронт .env — потрібен зовнішній preview URL для деплою
- Адмін-панель для лідів (PATCH /api/leads/{id}/status вже є — можна підключити UI)
