# 🌾 VIVASAYI AI – Smart Farmer Advisory System

<p align="center">
  <strong>An AI-powered agricultural advisory platform that helps farmers receive instant, structured farming guidance in Tamil and English using Google Gemini AI.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%2019-blue" alt="React">
  <img src="https://img.shields.io/badge/Backend-FastAPI-009688" alt="FastAPI">
  <img src="https://img.shields.io/badge/AI-Google%20Gemini-orange" alt="Gemini">
  <img src="https://img.shields.io/badge/Database-SQLite-lightgrey" alt="SQLite">
</p>

---

## 📖 Overview

Vivasayi AI is an intelligent farming assistant that provides expert agricultural recommendations using Google's Gemini AI. Farmers can ask questions related to crops, pests, diseases, irrigation, fertilizers, soil health, or weather conditions in either Tamil or English and receive well-structured responses.

Each advisory is organized into:

* ✅ Problem Identification
* 🔍 Possible Cause
* 🌱 Recommended Solution
* ⚠️ Precautions & Best Practices

The application is designed with a modern, responsive interface and a scalable backend architecture, making it suitable as both an academic project and a foundation for real-world agricultural advisory platforms.

---

# ✨ Features

### 🤖 AI-Powered Advisory

* Google Gemini integration
* Intelligent farming recommendations
* Context-aware responses

### 🌐 Bilingual Support

* English
* Tamil (தமிழ்)

### 🔐 Secure Authentication

* User Registration
* Login & Logout
* JWT Authentication
* Password Hashing (bcrypt)

### 📊 Personal Dashboard

* Question history
* Search previous advisories
* Delete individual records
* Clear complete history

### 🌙 Modern User Experience

* Dark & Light Theme
* Fully Responsive Design
* Glassmorphism UI
* Smooth Animations
* Mobile Friendly

### 🛡 Robust Backend

* FastAPI REST APIs
* SQLAlchemy ORM
* Structured Error Handling
* Request Validation
* Modular Architecture

---

# 🏗 Architecture

```
                User
                  │
                  ▼
        React + Vite Frontend
                  │
          REST API Requests
                  │
                  ▼
           FastAPI Backend
                  │
     ┌────────────┴────────────┐
     │                         │
Google Gemini API        SQLite Database
     │                         │
     └────────────┬────────────┘
                  │
          Structured AI Response
```

---

# 🛠 Technology Stack

| Category          | Technology              |
| ----------------- | ----------------------- |
| Frontend          | React 19                |
| Build Tool        | Vite                    |
| Language          | TypeScript              |
| Styling           | Tailwind CSS 4          |
| Animation         | Framer Motion           |
| Icons             | Lucide React            |
| Backend           | FastAPI                 |
| ORM               | SQLAlchemy              |
| Validation        | Pydantic v2             |
| Authentication    | JWT                     |
| Password Security | bcrypt                  |
| AI Model          | Google Gemini 2.0 Flash |
| Database          | SQLite                  |
| Deployment        | Vercel + Render         |

---

# 📂 Project Structure

```
krishimitra-ai/

│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── main.py
│   │
│   └── requirements.txt
│
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

* Node.js 18+
* Python 3.10+
* Git
* Google Gemini API Key

---

## Clone the Repository

```bash
git clone https://github.com/Rithan1212/vivasayi ai.git

cd vivasayi
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will run at

```
http://localhost:5173
```

---

# Backend Setup

```bash
cd backend

python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the server

```bash
uvicorn app.main:app --reload
```

Backend will run at

```
http://localhost:8000
```

Swagger Documentation

```
http://localhost:8000/docs
```

# API Endpoints

## Authentication

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | `/auth/register` | Register user |
| POST   | `/auth/login`    | Login         |
| GET    | `/auth/me`       | Current user  |

---

## AI Advisory

| Method | Endpoint        | Description               |
| ------ | --------------- | ------------------------- |
| POST   | `/advisory`     | Generate farming advisory |
| GET    | `/history`      | Retrieve user history     |
| DELETE | `/history/{id}` | Delete history item       |

---

# AI Response Format

Example response:

```
Problem
Leaf Spot Disease

Reason
Caused by fungal infection due to excessive moisture.

Solution
Use copper fungicide and avoid overhead irrigation.

Precautions

• Improve drainage

• Remove infected leaves

• Monitor crop regularly
```

---

# Highlights

* AI-powered farming assistant
* Production-style architecture
* JWT Authentication
* Modular FastAPI backend
* Responsive React frontend
* Clean folder organization
* TypeScript support
* Modern UI with Tailwind CSS
* Dark Mode
* Mobile Friendly
* Bilingual Support
* Local history management

---

# Future Enhancements

* Voice-based interaction
* Image-based crop disease detection
* Live weather integration
* Crop recommendation engine
* Market price prediction
* Multi-language support
* Push notifications
* Offline mode
* GPS-based recommendations
* Farmer community portal

---

# Testing

Frontend

```bash
npm run lint
```

Backend

```bash
pytest
```

---

# Deployment

## Frontend

* Vercel
* Netlify

## Backend

* Render
* Railway
* Azure App Service

---

# Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# License

This project was developed for educational purposes as part of a college mini project.

---

# Acknowledgements

* Google Gemini AI
* FastAPI
* React
* Tailwind CSS
* SQLAlchemy
* Vite
* Framer Motion

---

<p align="center">
Made with ❤️ for Farmers
</p>
