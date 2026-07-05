# 🌱 VIVASAYI AI

An AI-powered farmer advisory web application that helps farmers get instant agricultural guidance using Google's Gemini AI.

Users can ask farming-related questions in **Tamil or English**, and the system provides structured AI-generated responses to help with crop management, pest control, soil health, and farming practices.

---

## 🚀 Live Demo

### 🌐 Frontend
https://vivasayi-ai.vercel.app

### ⚙️ Backend API
https://vivasayi-ai.onrender.com

### 📚 API Documentation
https://vivasayi-ai.onrender.com/docs

---

# 📖 Project Overview

VIVASAYI AI is a full-stack web application developed as a college mini project.

The application combines a modern React frontend with a FastAPI backend and Google's Gemini AI to provide farming advice through a simple and user-friendly interface.

The objective of the project is to make agricultural information easily accessible to farmers using Artificial Intelligence.

---

# ✨ Features

- 🌾 AI-powered farming advisory
- 🤖 Google Gemini AI integration
- 🌐 Supports Tamil and English queries
- 👤 User Registration & Login
- 🔐 JWT Authentication
- 📜 Query History
- 📱 Responsive Design
- 🌙 Dark & Light Theme
- ⚡ FastAPI REST API
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

---

## Backend

- FastAPI
- Python
- SQLAlchemy
- Pydantic
- JWT Authentication
- Passlib

---

## AI

- Google Gemini API

---

## Database

- SQLite

---

# 📂 Project Structure

```
VIVASAYI-AI
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.ts
│
├── backend
│   ├── app
│   ├── requirements.txt
│   ├── .env.example
│   └── main.py
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Rithan1212/vivasayi-ai.git
```

```
cd vivasayi-ai
```

---

# Frontend

```
cd frontend
```

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```

---

# Backend

```
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

---

# API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| GET | /api/auth/me |

---

## Advisory

| Method | Endpoint |
|---------|----------|
| POST | /api/advisory/ask |
| GET | /api/advisory/history |
| DELETE | /api/advisory/history/{id} |
| DELETE | /api/advisory/history |

---

## Health

| Method | Endpoint |
|---------|----------|
| GET | /api/health |

---

# Deployment

## Frontend

Hosted on **Vercel**

https://vivasayi-ai.vercel.app

---

## Backend

Hosted on **Render**

https://vivasayi-ai.onrender.com

---

# Future Improvements

- 🌱 Voice-based farmer interaction
- 📷 Crop disease detection using images
- 🌦 Weather-based farming recommendations
- 📍 Location-specific advisory
- 🌾 Fertilizer recommendation system
- 📈 Crop yield prediction
- 🔔 Notification system
- 📊 Farmer analytics dashboard

---

# Author

**Rithan S**

B.E Computer Science and Engineering (Artificial Intelligence & Machine Learning)

V.S.B Engineering College

GitHub:
https://github.com/Rithan1212

---

# License

This project is developed for educational purposes as a college mini project.

---

## ⭐ Support

If you like this project,

⭐ Star the repository on GitHub.

It helps others discover the project and motivates future development.

---

Made with ❤️ for Farmers 🌾
