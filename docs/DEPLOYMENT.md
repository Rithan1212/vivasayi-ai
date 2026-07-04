# Deployment Guide

## Architecture

```
┌────────────────────┐         HTTPS         ┌──────────────────────┐
│  Vercel (Frontend) │  ───────────────────▶ │  Render (FastAPI)    │
│  React + Vite      │                       │  Uvicorn + SQLAlchemy│
└────────────────────┘                       └────────┬─────────────┘
                                                      │ Gemini API
                                                      ▼
                                              ┌──────────────────┐
                                              │  Google Gemini   │
                                              └──────────────────┘
```

---

## Deploy the Frontend on Vercel

1. Push the repository to GitHub / GitLab.
2. Go to <https://vercel.com> → **Add New → Project** → import the repo.
3. **Framework Preset**: Vite. Build command: `npm run build`. Output dir: `dist`.
4. (Optional) **Environment Variables**
   - `VITE_GEMINI_API_KEY` — only set this for the standalone client-only mode. Prefer leaving it empty and using the backend.
5. Click **Deploy**. Vercel will give you a `https://your-app.vercel.app` URL.

### Pointing the frontend at the Render backend

In `src/services/geminiService.ts`, replace the body of `askGemini` with:

```ts
const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/advisory/ask`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  body: JSON.stringify({ question, language }),
});
```

and add `VITE_API_BASE=https://your-render-url.onrender.com` to Vercel envs.

---

## Deploy the Backend on Render

1. <https://render.com> → **New → Web Service**.
2. Connect repo. **Root directory**: `backend/`. Runtime: **Python 3.11**.
3. **Build Command**
   ```bash
   pip install -r requirements.txt
   ```
4. **Start Command**
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```
5. **Environment Variables**
   - `GEMINI_API_KEY` — your Google API key
   - `JWT_SECRET` — generate one with `openssl rand -hex 32`
   - `ALLOWED_ORIGINS` — `https://your-vercel-app.vercel.app`
   - `DATABASE_URL` — for production switch to Postgres, e.g.
     `postgresql+psycopg2://user:pass@host:5432/VIVASAYI`
6. Click **Create Web Service**.

Render gives free SQLite ephemeral storage. For production prefer **Render Postgres** or **Supabase**.

---

## Optional: Firebase Firestore

Both `models.py` (ORM) and the controllers are thin enough to swap with a Firestore adapter. Create `backend/app/services/firestore_repo.py` mirroring `auth_controller` + `advisory_controller` against Firestore collections (`users`, `queries`), then point the router dependencies at the new repo.

---

## Production Checklist

- ✅ Set a strong `JWT_SECRET`
- ✅ Lock CORS to your real frontend domain
- ✅ Move from SQLite → Postgres
- ✅ Enable HTTPS (Render and Vercel do this automatically)
- ✅ Add rate-limiting (e.g. `slowapi`) to `/api/advisory/ask`
- ✅ Monitor logs via Render's dashboard
- ✅ Rotate `GEMINI_API_KEY` if leaked
