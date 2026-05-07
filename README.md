# Viknar'off Vinnytsia — Salon-Shop website

Готовий до запуску full-stack застосунок: React + FastAPI + MongoDB.

## ⚡ Запуск однією командою

```bash
./start.sh
```

Сайт запуститься на:
- 🌐 http://localhost:3000 — Frontend
- ⚙️ http://localhost:8001/api — Backend API
- 🗄️ mongodb://localhost:27017 — MongoDB

**Передумова:** встановлений [Docker Desktop](https://docs.docker.com/get-docker/) (Windows / macOS) або Docker Engine + Compose (Linux). Більше нічого ставити не треба — Node.js, Python, Mongo стартують у контейнерах.

### Інші команди
```bash
./start.sh stop    # зупинити
./start.sh logs    # стрімити логи
```

## 📖 Повна документація

Дивись `QUICKSTART.md` — там детальніше про:
- запуск без Docker (для розробки),
- production деплой (Vercel / Railway / VPS),
- редагування каталогу `frontend/src/data/products.js`,
- зміну контактів у `frontend/src/data/mock.js`,
- API ендпойнти.

## 📁 Структура

```
viknaroff-vinnytsia/
├── backend/         # FastAPI + MongoDB
├── frontend/        # React 19 + Tailwind + shadcn/ui
├── docker-compose.yml
├── start.sh         # 👈 запусти це
├── QUICKSTART.md    # детальна інструкція
└── README.md
```
