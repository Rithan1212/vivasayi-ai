# Installation Guide

This guide walks you through a complete fresh setup of **VIVASAYI AI** on a local machine.

## 1. System Requirements

| Tool | Version |
|------|---------|
| Node.js | 18 or newer |
| npm | 9 or newer |
| Python | 3.10 or newer |
| pip | latest |
| Git | any recent |

Optional but recommended: a free **Gemini API key** from <https://aistudio.google.com/app/apikey>.

## 2. Get the code

```bash
git clone https://github.com/your-user/VIVASAYI-ai.git
cd VIVASAYI-ai
```

## 3. Frontend setup

```bash
npm install
cp .env.example .env
# Edit .env — only required if you want real Gemini answers in the standalone build
npm run dev
```

The Vite dev server runs at <http://localhost:5173>.

### Production build

```bash
npm run build      # outputs a single dist/index.html
npm run preview    # serves the build locally
```

## 4. Backend setup (optional)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate         # Windows: .venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt

cp .env.example .env
# paste your GEMINI_API_KEY into backend/.env

uvicorn app.main:app --reload
```

API:    <http://localhost:8000>
Docs:   <http://localhost:8000/docs>

The first run creates a local SQLite file `backend/VIVASAYI.db`.

## 5. Verifying installation

1. Open <http://localhost:5173>.
2. Click **Get Started** and create an account (e.g. *demo@VIVASAYI.ai / 123456*).
3. You'll be redirected to **AI Chat**. Try any of the suggested prompts.
4. Visit **Dashboard** to confirm the question is saved and can be deleted.
5. Toggle dark / light mode from the top right.

## 6. Troubleshooting

| Problem | Fix |
|---------|-----|
| `npm install` fails on legacy peer deps | run `npm install --legacy-peer-deps` |
| Tailwind classes not applying | restart `npm run dev` after editing `index.css` |
| Backend `ImportError: no module named 'app'` | run uvicorn from inside `backend/` |
| Gemini returns 403 | API key is missing / invalid — re-check `.env` |
| CORS error from frontend → backend | add the frontend URL to `ALLOWED_ORIGINS` in `backend/.env` |
