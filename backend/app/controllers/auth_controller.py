"""Authentication business logic."""
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from .. import models, schemas
from ..utils import security


def register_user(db: Session, payload: schemas.RegisterRequest) -> schemas.TokenResponse:
    existing = db.query(models.User).filter(models.User.email == payload.email.lower()).first()
    if existing:
        raise HTTPException(status.HTTP_409_CONFLICT, "An account with that email already exists.")

    user = models.User(
        name=payload.name.strip(),
        email=payload.email.lower(),
        password_hash=security.hash_password(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = security.create_access_token(subject=user.id, extra={"email": user.email})
    return schemas.TokenResponse(access_token=token, user=schemas.UserOut.model_validate(user))


def login_user(db: Session, payload: schemas.LoginRequest) -> schemas.TokenResponse:
    user = db.query(models.User).filter(models.User.email == payload.email.lower()).first()
    if not user or not security.verify_password(payload.password, user.password_hash):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid email or password.")
    token = security.create_access_token(subject=user.id, extra={"email": user.email})
    return schemas.TokenResponse(access_token=token, user=schemas.UserOut.model_validate(user))
