"""Advisory (ask + history) business logic."""
import json

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from .. import models, schemas
from ..services.gemini_service import ask_advisor
from ..utils.logger import get_logger

logger = get_logger("VIVASAYI.advisory")


def ask(db: Session, user: models.User, payload: schemas.AskRequest) -> schemas.QueryOut:
    try:
        answer = ask_advisor(payload.question, payload.language)
    except RuntimeError as e:
        raise HTTPException(status.HTTP_503_SERVICE_UNAVAILABLE, str(e))
    except Exception as e:
        logger.exception("Advisor error: %s", e)
        raise HTTPException(status.HTTP_502_BAD_GATEWAY, "AI service is currently unavailable.")

    row = models.Query(
        user_id=user.id,
        question=payload.question.strip(),
        language=payload.language,
        answer_json=answer.model_dump_json(),
    )
    db.add(row)
    db.commit()
    db.refresh(row)

    return schemas.QueryOut(
        id=row.id,
        question=row.question,
        language=row.language,
        answer=answer,
        created_at=row.created_at,
    )


def list_history(db: Session, user: models.User) -> list[schemas.QueryOut]:
    rows = (
        db.query(models.Query)
        .filter(models.Query.user_id == user.id)
        .order_by(models.Query.created_at.desc())
        .all()
    )
    return [
        schemas.QueryOut(
            id=r.id,
            question=r.question,
            language=r.language,
            answer=schemas.AdvisoryAnswer(**json.loads(r.answer_json)),
            created_at=r.created_at,
        )
        for r in rows
    ]


def delete_query(db: Session, user: models.User, query_id: str) -> None:
    row = (
        db.query(models.Query)
        .filter(models.Query.id == query_id, models.Query.user_id == user.id)
        .first()
    )
    if not row:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Query not found.")
    db.delete(row)
    db.commit()


def clear_history(db: Session, user: models.User) -> int:
    deleted = (
        db.query(models.Query).filter(models.Query.user_id == user.id).delete(synchronize_session=False)
    )
    db.commit()
    return deleted
