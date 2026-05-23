# Viknar'off Vinnytsia — Deployment Guide

## Stack
- Frontend: React + Tailwind (Vercel/Netlify)
- Backend: FastAPI Python 3.11 (Railway)
- Database: MongoDB Atlas (free M0)
- Email: Resend

## Architecture
```
[users] → viknaroffvin.com (Vercel) → calls api.viknaroffvin.com (Railway) → MongoDB Atlas
                                                   ↓
                                                Resend (email notifications)
```

## Step-by-step deploy

### 1) MongoDB Atlas (free)
- https://www.mongodb.com/cloud/atlas → Sign Up
- Build Database → **M0 (Free)** → AWS Frankfurt (eu-central-1)
- Database Access → Add user (e.g. `viknaroff_admin` / strong password)
- Network Access → Add IP → **Allow from anywhere** (0.0.0.0/0)
- Connect → Drivers → copy connection string:
  `mongodb+srv://viknaroff_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### 2) Push code to GitHub
- In Emergent chat use "Save to Github" button (top-right) → connect GitHub → push
- Or manually: create repo `viknaroff-site` (private) and push `/app` to it

### 3) Railway — backend
- https://railway.app → Login with GitHub
- New Project → Deploy from GitHub repo → select `viknaroff-site`
- Settings:
  - Root Directory: `backend`
  - Watch Paths: `backend/**`
- Variables tab — add (copy from /app/backend/.env, replace MONGO_URL):
  ```
  MONGO_URL = mongodb+srv://...   (from Atlas, with password)
  DB_NAME = viknaroff_prod
  CORS_ORIGINS = https://viknaroffvin.com,https://www.viknaroffvin.com
  RESEND_API_KEY = re_W16gcXFn_CPkuNx1z3CbRPMdtPQmSjaiE
  SENDER_EMAIL = onboarding@resend.dev
  LEAD_NOTIFY_EMAIL = viknaroffvin@gmail.com
  ADMIN_ALLOWED_EMAILS = viknaroffvin@gmail.com
  LEADS_RATE_LIMIT_MAX = 5
  LEADS_RATE_LIMIT_WINDOW_SEC = 60
  ```
- Generate Domain → e.g. `viknaroff-backend-production.up.railway.app`
- Verify: `https://viknaroff-backend-production.up.railway.app/api/` → should return JSON

### 4) Vercel — frontend (recommended, free)
- https://vercel.com → Login with GitHub
- Add New → Project → select repo
- Framework: Create React App (auto)
- Root Directory: `frontend`
- Environment Variables:
  ```
  REACT_APP_BACKEND_URL = https://viknaroff-backend-production.up.railway.app
  ```
- Deploy → get URL `viknaroff.vercel.app`

### 5) Domain on Namecheap → Vercel
- Vercel project → Settings → Domains → Add `viknaroffvin.com` and `www.viknaroffvin.com`
- Vercel will show 2 DNS records (A and CNAME)
- In Namecheap → Domain List → Manage → **Advanced DNS**:
  - Delete default Parking records
  - Add A Record: Host=`@`, Value=`76.76.21.21`
  - Add CNAME: Host=`www`, Value=`cname.vercel-dns.com`
- Save. Wait 15-30 min. SSL is auto-provisioned by Vercel.

### 6) Update backend CORS after domain is live
- Railway → Variables → change CORS_ORIGINS if needed
- Restart backend

### 7) Test
- Open https://viknaroffvin.com → submit form
- Check email arrives on viknaroffvin@gmail.com
- Go to https://viknaroffvin.com/admin → login with Google → see lead

## Going forward
- Resend domain verification: add `viknaroffvin.com` in Resend dashboard → add DNS records to Namecheap → switch SENDER_EMAIL to `noreply@viknaroffvin.com`
- Google Search Console: verify domain via DNS TXT record (Namecheap → Advanced DNS)
- Google Business Profile: register the salon at вул. Замостянська 37

## Costs
- Domain Namecheap: ~$14.98/year (renewal)
- Railway: ~$5-8/month (Hobby tier)
- Vercel: $0
- MongoDB Atlas M0: $0
- Resend: $0 (up to 100 emails/day on free)
- Total: **~$80-100/year**
