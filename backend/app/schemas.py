"""Pydantic schemas — request & response validation."""
from datetime import datetime
from typing import List, Literal, Optional

from pydantic import BaseModel, EmailStr, Field


# ---------- Auth ----------
class RegisterRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=6, max_length=200)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1)


class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


# ---------- Advisory ----------
class AskRequest(BaseModel):
    question: str = Field(min_length=2, max_length=800)
    language: Literal["en", "ta"] = "en"


class AdvisoryAnswer(BaseModel):
    problem: str
    reason: str
    solution: str
    precautions: List[str] = []
    language: Literal["en", "ta"]


class QueryOut(BaseModel):
    id: str
    question: str
    language: str
    answer: AdvisoryAnswer
    created_at: datetime


# ---------- Generic ----------
class MessageResponse(BaseModel):
    message: str
    detail: Optional[str] = None
