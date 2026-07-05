<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=2E8B57&height=220&section=header&text=VIVASAYI%20AI&fontSize=45&fontColor=ffffff&animation=fadeIn"/>
</p>

<h1 align="center">🌾 VIVASAYI AI</h1>

<h3 align="center">
AI-Powered Farmer Advisory System
</h3>

<p align="center">
Helping Farmers with Intelligent Agricultural Guidance using <b>Google Gemini AI</b>
</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?logo=sqlite&logoColor=white)
![Gemini](https://img.shields.io/badge/Google-Gemini-AI-4285F4?logo=google&logoColor=white)

</p>

---

# 🌐 Live Demo

| Service | Link |
|----------|------|
| 🌾 Frontend | https://vivasayi-ai.vercel.app |
| ⚙️ Backend API | https://vivasayi-ai.onrender.com |
| 📚 Swagger Docs | https://vivasayi-ai.onrender.com/docs |

---

# 📖 About

VIVASAYI AI is a full-stack web application developed as a college mini project to provide AI-powered agricultural guidance.

The application allows farmers to ask farming-related questions in **Tamil** or **English** and receive AI-generated responses using **Google Gemini AI**.

It combines a modern React frontend with a FastAPI backend to create a responsive and user-friendly platform for agricultural assistance.

---

# ✨ Features

✅ AI-powered Farmer Advisory

✅ Google Gemini AI Integration

✅ Tamil & English Support

✅ User Registration

✅ Secure Login (JWT Authentication)

✅ Query History

✅ Delete Individual Query

✅ Clear Complete History

✅ Responsive UI

✅ Dark & Light Theme

✅ REST API using FastAPI

✅ SQLite Database

---

# 🏗️ System Architecture

```text
                 Farmer
                    │
                    ▼
          React + Vite Frontend
                    │
              REST API Calls
                    │
                    ▼
            FastAPI Backend
              │           │
              │           │
              ▼           ▼
         SQLite DB    Google Gemini AI
```

---

# 🛠 Tech Stack

| Category | Technologies |
|-----------|--------------|
| Frontend | React, Vite, TypeScript, Tailwind CSS, React Router, Framer Motion |
| Backend | Python, FastAPI, SQLAlchemy, Pydantic, Passlib, JWT |
| AI | Google Gemini API |
| Database | SQLite |
| Deployment | Vercel + Render |

---

# 📂 Project Structure

```text
VIVASAYI-AI
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   ├── runtime.txt
│   └── .env.example
│
├── docs/
│
├── public/
│
├── src/
│
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/Rithan1212/vivasayi-ai.git
cd vivasayi-ai
```

---

## Install Frontend

```bash
npm install
```

---

## Start Frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

## Start Backend

```bash
cd backend

python -m venv .venv
```

### Windows

```bash
.venv\Scripts\activate
```

### Linux / macOS

```bash
source .venv/bin/activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Run Server

```bash
uvicorn app.main:app --reload
```

Backend runs on

```
http://localhost:8000
```

Swagger API

```
http://localhost:8000/docs
```

---

# 🔗 REST API

## Authentication

| Method | Endpoint |
|----------|-----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| GET | /api/auth/me |

### Advisory

| Method | Endpoint |
|----------|-----------|
| POST | /api/advisory/ask |
| GET | /api/advisory/history |
| DELETE | /api/advisory/history/{id} |
| DELETE | /api/advisory/history |

### Health

| Method | Endpoint |
|----------|-----------|
| GET | /api/health |

---

# 📷 Screenshots

> Add screenshots here before submitting.

| Home | Dashboard |
|------|-----------|
| Screenshot | Screenshot |

| AI Chat | Login |
|---------|-------|
| Screenshot | Screenshot |

---

# 🚀 Future Scope

- 🎤 Voice-based Farmer Assistant

- 📷 Image-based Crop Disease Detection

- 🌦 Weather Forecast Integration

- 📍 GPS-based Farming Recommendation

- 🌱 Fertilizer Recommendation System

- 📈 Crop Yield Prediction

- 🔔 Notification System

- 📊 Farmer Analytics Dashboard

---

# 🌍 Deployment

| Platform | Status |
|----------|--------|
| Frontend | ✅ Vercel |
| Backend | ✅ Render |

---

# 👨‍💻 Developer

## Rithan S

**B.E Computer Science & Engineering (Artificial Intelligence & Machine Learning)**

V.S.B Engineering College

GitHub

https://github.com/Rithan1212

---

# 📄 License

This project was developed for educational purposes as a college mini project.

---

<div align="center">

## ⭐ If you like this project, give it a Star ⭐

Made with ❤️ by **Rithan S**

🌾 Empowering Farmers Through Artificial Intelligence 🌾

</div>
