# API Documentation

Base URL (local): `http://localhost:8000`
Interactive Swagger: `http://localhost:8000/docs`

All `application/json`. Protected routes require:

```
Authorization: Bearer <JWT>
```

---

## Auth

### `POST /api/auth/register`

**Body**
```json
{
  "name": "Ravi Kumar",
  "email": "ravi@example.com",
  "password": "secret123"
}
```

**201 Response**
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": "9f4...",
    "name": "Ravi Kumar",
    "email": "ravi@example.com",
    "created_at": "2025-01-01T12:00:00"
  }
}
```

Errors: `409` if email already registered.

### `POST /api/auth/login`

Same body shape, returns the same response. `401` on invalid credentials.

### `GET /api/auth/me`
Returns the current user.

---

## Advisory

### `POST /api/advisory/ask`

**Body**
```json
{
  "question": "My tomato leaves are yellow.",
  "language": "en"
}
```

`language` is `"en"` or `"ta"`.

**Response**
```json
{
  "id": "0b2...",
  "question": "My tomato leaves are yellow.",
  "language": "en",
  "answer": {
    "problem": "Yellowing of tomato leaves (chlorosis).",
    "reason": "Most common causes are nitrogen deficiency …",
    "solution": "1) Inspect soil moisture … 2) Apply manure …",
    "precautions": ["Water early in the morning", "..."],
    "language": "en"
  },
  "created_at": "2025-01-01T12:00:00"
}
```

Errors:
- `422` validation (question too long/short, invalid language)
- `502` if Gemini API is unreachable
- `503` if `GEMINI_API_KEY` not configured on the server

### `GET /api/advisory/history`
Returns an array of `QueryOut` sorted newest-first.

### `DELETE /api/advisory/history/{id}`
Deletes a single record. `404` if not owned by current user.

### `DELETE /api/advisory/history`
Clears all history for the current user. Returns the count removed.

---

## Meta

### `GET /api/health`
```json
{ "status": "ok" }
```
