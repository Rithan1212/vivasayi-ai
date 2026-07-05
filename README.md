# 🌾 VIVASAYI AI

<div align="center">

### 🤖 AI-Powered Farmer Advisory System

Helping farmers with intelligent agricultural guidance using **Google Gemini AI**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?logo=sqlite)
![Gemini](https://img.shields.io/badge/Google-Gemini_AI-4285F4?logo=google)

🌐 **Live Website:** https://vivasayi-ai.vercel.app

⚙️ **Backend API:** https://vivasayi-ai.onrender.com

📚 **API Docs:** https://vivasayi-ai.onrender.com/docs

</div>

---

# 📖 About

**VIVASAYI AI** is an AI-powered farmer advisory web application developed as a college mini project.

The application enables farmers to ask agriculture-related questions in **Tamil** or **English** and receive AI-generated guidance powered by **Google Gemini AI**.

The goal of this project is to make farming knowledge more accessible through Artificial Intelligence using a modern and responsive web application.

---

# ✨ Features

- 🤖 AI-powered farming assistance
- 🌾 Agriculture advisory using Google Gemini AI
- 🌐 Tamil & English language support
- 👤 User Registration
- 🔐 Secure Login using JWT Authentication
- 📜 Query History
- 🗑 Delete Individual History
- 🗑 Clear Complete History
- 🌙 Dark Mode / Light Mode
- 📱 Responsive Design
- ⚡ REST API using FastAPI
- 💾 SQLite Database

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Framer Motion
- Lucide Icons

---

## Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication
- Passlib
- Uvicorn

---

## Artificial Intelligence

- Google Gemini API

---

## Database

- SQLite

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

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Rithan1212/vivasayi-ai.git
```

```bash
cd vivasayi-ai
```

---

# Install Frontend

```bash
npm install
```

---

# Run Frontend

```bash
npm run dev
```

Application runs at

```
http://localhost:5173
```

---

# Run Backend

```bash
cd backend
```

Create Virtual Environment

```bash
python -m venv .venv
```

Activate

Windows

```bash
.venv\Scripts\activate
```

Linux / macOS

```bash
source .venv/bin/activate
```

Install Packages

```bash
pip install -r requirements.txt
```

Run Server

```bash
uvicorn app.main:app --reload
```

Backend runs at

```
http://localhost:8000
```

Swagger Documentation

```
http://localhost:8000/docs
```

---

# 🔗 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |
| GET | `/api/auth/me` |

---

## Advisory

| Method | Endpoint |
|---------|----------|
| POST | `/api/advisory/ask` |
| GET | `/api/advisory/history` |
| DELETE | `/api/advisory/history/{id}` |
| DELETE | `/api/advisory/history` |

---

## Health Check

| Method | Endpoint |
|---------|----------|
| GET | `/api/health` |

---

# 🌍 Deployment

## Frontend

**Vercel**

https://vivasayi-ai.vercel.app

---

## Backend

**Render**

https://vivasayi-ai.onrender.com

---

# 🚀 Future Improvements

- 🎤 Voice-based Farmer Assistant
- 📸 Plant Disease Detection using Images
- 🌦 Weather Forecast Integration
- 📍 GPS-based Farming Suggestions
- 🌱 Fertilizer Recommendation
- 📈 Crop Yield Prediction
- 🔔 Push Notifications
- 🌾 Multi-language Support
- 📊 Farmer Dashboard & Analytics

---

# 👨‍💻 Developer

## Rithan S

**B.E Computer Science & Engineering (Artificial Intelligence & Machine Learning)**

V.S.B Engineering College

GitHub

https://github.com/Rithan1212

---

# 📄 License

This project is developed for educational purposes as part of a college mini project.

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a Star ⭐

Made with ❤️ using React, FastAPI & Google Gemini AI

🌾 **Empowering Farmers through Artificial Intelligence**

</div>
