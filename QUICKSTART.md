# 🚀 Viknar'off Vinnytsia — Швидкий старт

Сайт салон-магазину з повним каталогом, фільтрами, формою заявок, MongoDB та плаваючою кнопкою дзвінків.

---

## ⚡ Запуск за 1 команду (Docker)

Найшвидший спосіб — Docker Compose. Усе налаштовано.

```bash
# Встановіть Docker та Docker Compose, потім:
docker compose up -d --build
```

Сайт буде доступний на:
- 🌐 **Frontend:** http://localhost:3000
- ⚙️ **Backend API:** http://localhost:8001/api
- 🗄️ **MongoDB:** localhost:27017

Зупинити: `docker compose down`
Перебудувати після змін: `docker compose up -d --build`

> ⚠️ **Перед production-деплоєм** змініть `REACT_APP_BACKEND_URL` у `docker-compose.yml` на ваш публічний URL бекенда (напр. `https://api.viknaroffvin.com`)

---

## 🛠️ Запуск без Docker (локальна розробка)

### Передумови
- Node.js 18+ та yarn
- Python 3.11+
- MongoDB 6+ (локально або Atlas)

### 1. Backend
```bash
cd backend
cp .env.example .env
# відредагуйте .env (MONGO_URL, DB_NAME)

pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### 2. Frontend
```bash
cd frontend
cp .env.example .env
# відредагуйте REACT_APP_BACKEND_URL=http://localhost:8001

yarn install
yarn start
```

Відкриється на http://localhost:3000

---

## 🌐 Production деплой (рекомендоване)

### Варіант A — Vercel (Frontend) + Railway/Render (Backend)

**Frontend (Vercel):**
1. Залийте репозиторій на GitHub
2. На vercel.com: Import Project → виберіть `frontend` як root
3. Build Command: `yarn build` | Output: `build`
4. Env vars: `REACT_APP_BACKEND_URL` = URL вашого бекенда

**Backend (Railway):**
1. На railway.app: New Project → Deploy from GitHub → виберіть `backend`
2. Add MongoDB plugin (або підключіть MongoDB Atlas)
3. Env vars: `MONGO_URL`, `DB_NAME`, `CORS_ORIGINS`
4. Start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`

### Варіант B — VPS (1 сервер, Docker)

```bash
# На вашому сервері (Ubuntu / Debian):
git clone <your-repo>.git
cd viknaroff-vinnytsia

# Відредагуйте docker-compose.yml: REACT_APP_BACKEND_URL → https://yourdomain.com
nano docker-compose.yml

docker compose up -d --build

# Налаштуйте Nginx як reverse proxy + Let's Encrypt SSL
```

### Варіант C — Hostinger/будь-який хостинг

1. Локально: `cd frontend && yarn build`
2. Завантажте вміст папки `frontend/build/` на хостинг (через FTP/cPanel)
3. Backend деплойте окремо (Railway/Render/VPS)

---

## 📝 Що треба налаштувати

### Контактна інформація
**Файл:** `frontend/src/data/mock.js` → `SITE_CONFIG`

```js
export const SITE_CONFIG = {
  primaryPhone: "+380687239722",       // ваш номер
  email: "viknaroffvin@gmail.com",     // ваш email
  telegram: "https://t.me/+380687239722",
  viber: "viber://chat?number=%2B380687239722",
  instagram: "https://www.instagram.com/viknaroffvin",
  facebook: "https://www.facebook.com/share/...",
  address: "м. Вінниця, вул. Замостянська 37",
  // ...
};
```

### Каталог продуктів
**Файл:** `frontend/src/data/products.js`

Кожен продукт має:
```js
{
  slug: "gealan-s9000",      // URL (унікальний)
  category: "windows",        // windows | doors | sliding | additional
  name: "Gealan S 9000",
  brand: "Gealan",
  country: "Німеччина",
  soundproof: 42,             // дБ
  depth: 82.5,                // мм
  chambers: 6,
  price: 4800,                // ₴/м²
  image: "https://...",       // головне фото
  images: ["https://..."],    // галерея
  features: ["...", "..."],
  description: "...",
}
```

### Кольори
**Файл:** `frontend/src/index.css`
```css
--primary: 16 100% 56%;       /* помаранчевий #FF5722 */
--background: 36 30% 95%;     /* кремовий #f5f1ec */
```

---

## 🗂️ Структура

```
viknaroff-vinnytsia/
├── backend/
│   ├── server.py              # FastAPI: /api/leads, /api/status
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html         # Шрифти + SEO
│   ├── src/
│   │   ├── App.js             # Routes
│   │   ├── pages/             # Home, CategoryPage, ProductDetail
│   │   ├── components/        # Hero, Header, Footer, FloatingActions, ...
│   │   ├── data/
│   │   │   ├── mock.js        # 👈 Налаштування сайту
│   │   │   └── products.js    # 👈 Каталог
│   │   └── lib/api.js         # Backend клієнт
│   ├── package.json
│   ├── Dockerfile
│   ├── nginx.conf
│   └── .env.example
├── docker-compose.yml         # 👈 Запуск одною командою
└── QUICKSTART.md              # цей файл
```

---

## 🔌 API Endpoints

База: `${BACKEND_URL}/api`

| Метод | URL | Опис |
|---|---|---|
| `GET` | `/` | Health check |
| `POST` | `/leads` | Створення заявки з форми |
| `GET` | `/leads?limit=50&status=new` | Список заявок |
| `GET` | `/leads/:id` | Деталі заявки |
| `PATCH` | `/leads/:id/status?status=contacted` | Зміна статусу |

**Створення заявки (приклад):**
```bash
curl -X POST https://api.viknaroffvin.com/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Іван Петренко",
    "phone": "+380687239722",
    "city": "Вінниця",
    "service": "Замір"
  }'
```

---

## 📞 Контакти салону

- 📍 м. Вінниця, вул. Замостянська 37
- ☎️ (068) 723-97-22 — Telegram, Viber
- 📧 viknaroffvin@gmail.com
- [Instagram](https://www.instagram.com/viknaroffvin) · [Facebook](https://www.facebook.com/share/1AxmhrVBoW/)

---

## ❓ Поширені питання

**Q: Заявки не зберігаються — що робити?**
A: Перевірте, що backend запущений (`http://localhost:8001/api/`). Перевірте `MONGO_URL` у `.env`. Подивіться логи: `docker compose logs backend`

**Q: Картинки повільно вантажаться**
A: Картинки беруться з Unsplash. Для production — завантажте власні фото в `frontend/public/images/` та оновіть посилання в `products.js`.

**Q: Як змінити логотип?**
A: У `frontend/src/components/Header.jsx` та `Footer.jsx` знайдіть `VIKNAR'OFF` — це текстовий логотип. Замініть на `<img>` з вашим SVG/PNG (покладіть у `frontend/public/`).

**Q: Як вимкнути плаваючу кнопку дзвінків?**
A: У `frontend/src/pages/Home.jsx` (та `CategoryPage.jsx`, `ProductDetail.jsx`) видаліть рядок `<FloatingActions />`.

---

Made with ❤️ for Viknar'off Vinnytsia
